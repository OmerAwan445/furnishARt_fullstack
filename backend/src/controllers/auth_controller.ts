import { LoginRequestBody, ResetPasswordRequestBody, SignupRequestBody } from '@src/Types';
import { AppError } from '@src/errors/AppError';
import { checkEmailUniqueAndCreateCustomer, findCustomerByEmail, findCustomerById, makeCustomerVerifiedAndDeleteToken, updatePasswordAndDeleteToken } from '@src/models/CustomerModel'; // eslint-disable-line
import BcryptSvs from '@src/services/auth/bcryptSvs';
import CryptoTokenSvs from '@src/services/auth/cryptoTokenSvs'; // eslint-disable-line
import { sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded } from '@src/services/auth/forgetPasswordSvs';
import JwtSvs from '@src/services/auth/jwtSvs';
import EmailSvs from '@src/services/auth/mailSvs';
import { sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded } from '@src/services/auth/verificationEmailSvs';
import ApiResponse from '@src/utils/ApiResponse';
import { catchAsyncError } from '@src/utils/catchAsyncError';
import { isDevEnvironment } from '@src/utils/common/isDevEnvironment';
import { Request } from 'express';

class AuthController {
  // SIGNUP controller:
  createCustomerAndSendVerification = catchAsyncError(async (req: Request<object, object, SignupRequestBody>, res) => {
    const { first_name, last_name, email, address, username, password } = req.body;

    const customer = await checkEmailUniqueAndCreateCustomer(first_name, last_name, email, password, username, address);
    // Send verification email and save token
    const { msg } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded(customer.email, customer.id);

    return res.send(ApiResponse.success({ ...customer }, 'User created successfully & ' + msg, 201));
  });

  // LOGIN controller:
  authenticateCustomer = catchAsyncError(async (req: Request<object, object, LoginRequestBody>, res, next) => {
    const { email, password } = req.body;

    const customer = await findCustomerByEmail(email);

    // if customer exists && password is correct
    if (!customer || !(await BcryptSvs.comparePassword(password, customer.password))) {
      return next(new AppError("Invalid email or password", 404));
    }
    // if Customer is not verified then don't send access_token
    if (!customer.is_verified) {
      const { msg } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded(customer.email, customer.id);
      return res.status(403).send(ApiResponse.error('User Email is not verified & ' +
        msg, 403, { customer_id: customer.id }));
    }

    const { password: _, ...customerWithoutPassword } = customer; // eslint-disable-line
    // generate access_token
    const accessToken = await JwtSvs.generateAccessToken(
        {
          id: customer.id,
          username: customer.username,
          email: customer.email,
          name: customer.first_name + ' ' + customer.last_name,
        },
    );

    return res.send(ApiResponse.success({ accessToken, ...customerWithoutPassword },
        "User logged in successfully", 200));
  });

  sendVerificationEmail = catchAsyncError(async (req: Request<object, object, { customer_id: number }>, res, next) => {
    const { customer_id } = req.body;
    const customer = await findCustomerById(customer_id);

    if (!customer || customer.is_verified) {
      return next(new AppError("No User Found Or User is Already Verified", 404));
    }

    const { token, msg, error, statusCode } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded( customer.email, customer_id );

    if (error) return next(new AppError(msg, statusCode));
    return res.send(ApiResponse.success((isDevEnvironment ? { token } : {}), msg, statusCode));
  });

  verifyEmailVerificationToken = catchAsyncError(async (req: Request<any, any, any, { token?: string }>, res, next) => {
    const token = req.query.token as string;
    console.log(token, "token");
    // 1. check if token is valid from db and is not expired
    const { data, isValidToken, errorMsg } = await CryptoTokenSvs.checkTokenValidityAndExtractData(token, "EMAIL_VERIFICATION");
    if (!isValidToken || !data) return next(new AppError(errorMsg as string, 401));
    // 2. make user verified and Delete the token from the Db
    const user = await makeCustomerVerifiedAndDeleteToken(data.customer_id);
    const accessToken = await JwtSvs.generateAccessToken({ username: user.username,
      id: user.id, email: user.email, name: user.first_name + user.last_name });

    res.send(ApiResponse.success({ ...user, accessToken }, "User verified successfully", 200));
  });

  forgetPassword = catchAsyncError(async (req: Request<object, object, { email: string }>, res, next) => {
    const { email } = req.body;
    // 1. find customer by email
    const customer = await findCustomerByEmail(email);
    if (!customer) return next(new AppError("User not found", 404));
    // 2. generate a token and send email with token
    const { token, msg, error, statusCode } = await sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded(
        customer.email,
        customer.id,
    );
    // 3. save token to db with expiry date
    if (error) return next(new AppError(msg, statusCode)); // token already sent
    return res.send(ApiResponse.success((isDevEnvironment ? { token } : {}), msg, statusCode));
  });

  verifyForgetPasswordToken = catchAsyncError(async (req: Request<any, any, any, { token?: string }>, res, next) => {
    const { token } = req.query;
    console.log(token, "token received");

    // check if token is valid from db and is not expired
    const { data, isValidToken, errorMsg } = await CryptoTokenSvs.checkTokenValidityAndExtractData(token as string, "PASSWORD_RESET");
    if (!isValidToken || !data) return next(new AppError(errorMsg as string, 401));
    return res.send(ApiResponse.success((isDevEnvironment ? { ...data } : {}), "Token Verified Successfully"));
  });

  resetPassword = catchAsyncError(async (req: Request<any, any, ResetPasswordRequestBody>, res, next) => {
    const { token, password } = req.body;
    // 1. check if token is valid from db and is not expired
    const { data, isValidToken, errorMsg } = await CryptoTokenSvs.checkTokenValidityAndExtractData(token, "PASSWORD_RESET");
    if (!isValidToken || !data) return next(new AppError(errorMsg as string, 401));

    // 2. update the password and delete the token from the db
    const { email } = await updatePasswordAndDeleteToken(data.customer_id, await BcryptSvs.hashPassword(password));

    // 3. send email to user that password has been changed
    await EmailSvs.sendResetPasswordEmail(email);
    return res.send(ApiResponse.success({}, "Password changed successfully"));
  });
}

export default AuthController;

