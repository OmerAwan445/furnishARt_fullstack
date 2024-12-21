import { LoginRequestBody, ResetPasswordRequestBody, SignupRequestBody } from '@src/Types';
import { AppError } from '@src/errors/AppError';
import { checkEmailUniqueAndCreateCustomer, findUserByEmail, findUserById, makeUserVerifiedAndDeleteTokenen, updatePasswordAndDeleteToken } from '@src/models/CustomerModel'; // eslint-disable-line
import BcryptSvs from '@src/services/auth/bcryptSvs';
import CryptoTokenSvs from '@src/services/auth/cryptoTokenSvs'; // eslint-disable-line
import { sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded } from '@src/services/auth/forgetPasswordSvs';
import JwtSvs from '@src/services/auth/jwtSvs';
import EmailSvs from '@src/services/auth/mailSvs';
import { sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded } from '@src/services/auth/verificationEmailSvs';
import ApiResponse from '@src/utils/ApiResponse';
import { ResponseMessages } from '@src/utils/ResponseMessages';
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

    return res.send(ApiResponse.success({ ...customer }, ResponseMessages.USER_CREATED_SUCCESSFULLY + ' & ' + msg, 201));
  });

  // LOGIN controller:
  authenticateUser = catchAsyncError(async (req: Request<object, object, LoginRequestBody>, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    // if customer exists && password is correct
    if (!user || !(await BcryptSvs.comparePassword(password, user.password))) {
      throw new AppError(ResponseMessages.INVALID_EMAIL_OR_PASSWORD, 404);
    }
    // if Customer is not verified then don't send access_token
    if (!user.is_verified) {
      const { msg } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded(user.email, user.id);
      return res.status(403).send(ApiResponse.error(ResponseMessages.USER_EMAIL_NOT_VERIFIED + ' & ' +
        msg, 403, { customer_id: user.id }));
    }

    const { password: _, ...customerWithoutPassword } = user; // eslint-disable-line
    // generate access_token
    const accessToken = await JwtSvs.generateAccessToken(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.first_name + ' ' + user.last_name,
          role: user.role,
        },
    );

    return res.send(ApiResponse.success({ accessToken, ...customerWithoutPassword },
        ResponseMessages.USER_LOGGED_IN_SUCCESSFULLY, 200));
  });

  sendVerificationEmail = catchAsyncError(async (req: Request<object, object, { customer_id: number }>, res) => {
    const { customer_id } = req.body;
    const customer = await findUserById(customer_id);

    if (!customer || customer.is_verified) {
      throw new AppError(ResponseMessages.NO_USER_FOUND_OR_ALREADY_VERIFIED, 404);
    }

    const { token, msg, error, statusCode } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded( customer.email, customer_id );

    if (error) throw new AppError(msg, statusCode);
    return res.send(ApiResponse.success((isDevEnvironment ? { token } : {}), msg, statusCode));
  });

  verifyEmailVerificationToken = catchAsyncError(async (req: Request<any, any, any, { token?: string }>, res) => {
    const token = req.query.token as string;
    console.log(token, "token");
    // 1. check if token is valid from db and is not expired
    const { data, isValidToken, errorMsg } = await CryptoTokenSvs.checkTokenValidityAndExtractData(token, "EMAIL_VERIFICATION");
    if (!isValidToken || !data) throw new AppError(errorMsg as string, 401);
    // 2. make user verified and Delete the token from the Db
    const user = await makeUserVerifiedAndDeleteTokenen(data.customer_id);
    const accessToken = await JwtSvs.generateAccessToken({ username: user.username,
      id: user.id, email: user.email, name: user.first_name + user.last_name,
      role: user.role,
    });

    res.send(ApiResponse.success({ ...user, accessToken }, ResponseMessages.USER_VERIFIED_SUCCESSFULLY, 200));
  });

  forgetPassword = catchAsyncError(async (req: Request<object, object, { email: string }>, res) => {
    const { email } = req.body;
    // 1. find customer by email
    const customer = await findUserByEmail(email);
    if (!customer) throw new AppError(ResponseMessages.USER_NOT_FOUND, 404);
    // 2. generate a token and send email with token
    const { token, msg, error, statusCode } = await sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded(
        customer.email,
        customer.id,
    );
    // 3. save token to db with expiry date
    if (error) throw new AppError(msg, statusCode); // token already sent
    return res.send(ApiResponse.success((isDevEnvironment ? { token } : {}), msg, statusCode));
  });

  verifyForgetPasswordToken = catchAsyncError(async (req: Request<any, any, any, { token?: string }>, res) => {
    const { token } = req.query;

    // check if token is valid from db and is not expired
    const { data, isValidToken, errorMsg } = await CryptoTokenSvs.checkTokenValidityAndExtractData(token as string, "PASSWORD_RESET");
    if (!isValidToken || !data) throw new AppError(errorMsg as string, 401);
    return res.send(ApiResponse.success((isDevEnvironment ? { ...data } : {}), ResponseMessages.TOKEN_VERIFIED_SUCCESSFULLY));
  });

  resetPassword = catchAsyncError(async (req: Request<any, any, ResetPasswordRequestBody>, res) => {
    const { token, password } = req.body;
    // 1. check if token is valid from db and is not expired
    const { data, isValidToken, errorMsg } = await CryptoTokenSvs.checkTokenValidityAndExtractData(token, "PASSWORD_RESET");
    if (!isValidToken || !data) throw new AppError(errorMsg as string, 401);

    // 2. update the password and delete the token from the db
    const { email } = await updatePasswordAndDeleteToken(data.customer_id, await BcryptSvs.hashPassword(password));

    // 3. send email to user that password has been changed
    await EmailSvs.sendResetPasswordEmail(email);
    return res.send(ApiResponse.success({}, ResponseMessages.PASSWORD_CHANGED_SUCCESSFULLY));
  });
}

export default AuthController;

