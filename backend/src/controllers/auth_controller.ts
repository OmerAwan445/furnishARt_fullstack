import { LoginRequestBody, ResetPasswordRequestBody, SignupRequestBody } from '@src/Types';
import { AppError } from '@src/errors/AppError';
import { checkEmailUniqueAndCreateUser, findUserByEmail, findUserById, makeUserVerifiedAndDeleteToken, updatePasswordAndDeleteToken } from '@src/models/UserModel'; // eslint-disable-line
import { comparePassword, hashPassword } from '@src/services/auth/bcryptPasswordSvs';
import { checkTokenValidityAndExtractData } from '@src/services/auth/cryptoVerificationTokenSvs'; // eslint-disable-line
import { sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded } from '@src/services/auth/forgetPasswordSvs';
import { generateAccessToken } from '@src/services/auth/jwtServices';
import EmailService from '@src/services/auth/mailSvs';
import { sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded } from '@src/services/auth/verificationEmailSvs';
import ApiResponse from '@src/utils/ApiResponse';
import { catchAsyncError } from '@src/utils/catchAsyncError';
import { Request } from 'express';

const SignupUser = catchAsyncError(async (req: Request<object, object, SignupRequestBody>, res) => {
  const { first_name, last_name, email, password } = req.body;

  const user = await checkEmailUniqueAndCreateUser(first_name, last_name, email, password);
  // Send verification email and save token
  const { msg } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded(user.email, user.id);

  return res.send(ApiResponse.success({ ...user }, 'User created successfully & ' + msg, 201));
});

const LoginUser = catchAsyncError(async (req: Request<object, object, LoginRequestBody>, res, next ) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  // Check if user exists && password is correct
  if (!user || !(await comparePassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 404));
  }

  if (!user.is_verified) {
    const { msg } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded(user.email, user.id);
    return res.status(401).send(ApiResponse.error('User Email is not verified & ' + msg, 401, { userId: user.id }));
  }

  const { password:_, ...userWithoutPassword } = user; // eslint-disable-line
  const accessToken = await generateAccessToken({ id: user.id, email:
     user.email, name: user.first_name + user.last_name });

  return res.send(
      ApiResponse.success({ accessToken, ...userWithoutPassword }, "User logged in successfully", 200));
});


const SendVerificationEmail = catchAsyncError(async (req: Request<object, object, { userId: number }>, res, next) => {
  const { userId } = req.body;
  const user = await findUserById(userId);
  if (!user || user.is_verified) {
    return next(new AppError("No User Found Or User is Already Verified", 404));
  }
  const userEmail = user.email;
  const { token, msg, error, statusCode } = await sendVerificationEmailAndSaveTokenIfResendTimeLimitNotExceeded(
      userEmail, userId);
  if (error) return next(new AppError(msg, statusCode));
  return res.send(ApiResponse.success(process.env.NODE_ENV === "production" ? { } : { token }, msg, statusCode));
});


const VerifyEmailVerificationToken = catchAsyncError(async (req: Request<any, any, any, { token?: string }>,
    res, next) => {
  const token = req.query.token as string;
  // 1. check if token is valid from db and is not expired
  const { data, isValidToken, errorMsg } = await checkTokenValidityAndExtractData(token, "EMAIL_VERIFICATION"); //eslint-disable-line
  if (!isValidToken || !data) return next(new AppError(errorMsg as string, 401));

  // 2. make user verified and Delete the token from the Db
  const user = await makeUserVerifiedAndDeleteToken(data.userId);
  const accessToken = await generateAccessToken({ id: user.id, email:
    user.email, name: user.first_name + user.last_name });

  res.send(ApiResponse.success({ ...user, accessToken }, "User verified successfully", 200));
});


const ForgetPassword = catchAsyncError(async (req: Request<object, object, { email: string }>, res, next) => {
  const { email } = req.body;

  // 1. find user by email
  const user = await findUserByEmail(email);
  if (!user) return next(new AppError("User not found", 404));

  // 2. generate a token and send email with token
  const { token, msg, error, statusCode } = await sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded(
      user.email, user.id);
  // 3. save token to db with expiry date
  if (error) return next(new AppError(msg, statusCode)); // token already sent
  return res.send(ApiResponse.success(process.env.NODE_ENV === "production" ? { } : { token }, msg, statusCode));
});


const VerifyForgetPasswordToken = catchAsyncError(async (req: Request<any, any, any, { token?: string }>,
    res, next) => {
  const { token } = req.query;

  // check if token is valid from db and is not expired
  const { data, isValidToken, errorMsg } = await checkTokenValidityAndExtractData(token as string, "PASSWORD_RESET");
  if (!isValidToken || !data) return next(new AppError(errorMsg as string, 401));

  return res.send(ApiResponse.success(process.env.NODE_ENV === "production" ?
  { } : { ...data }, "Token Verified Successfully"));
});

const ResetPassword = catchAsyncError(async (req: Request<any, any, ResetPasswordRequestBody>,
    res, next) => {
  const { token, password } = req.body;

  // 1. check if token is valid from db and is not expired
  const { data, isValidToken, errorMsg } = await checkTokenValidityAndExtractData(token, "PASSWORD_RESET");
  if (!isValidToken || !data) return next(new AppError(errorMsg as string, 401));

  // 2. update the password and delete the token from the db
  const { email } = await updatePasswordAndDeleteToken(data.userId, await hashPassword(password));
  // 3. send email to user that password has been changed
  await EmailService.sendResetPasswordEmail(email);
  return res.send(ApiResponse.success({}, "Password changed successfully"));
});


export {
  ForgetPassword,
  LoginUser, ResetPassword, SendVerificationEmail,
  SignupUser,
  VerifyEmailVerificationToken,
  VerifyForgetPasswordToken,
};

