import { ForgetPassword, LoginUser, ResetPassword, SendVerificationEmail, SignupUser,
  VerifyEmailVerificationToken, VerifyForgetPasswordToken } from "@src/controllers/auth_controller";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import { validatePasswordMatch } from "@src/middlewares/validatePasswordMatch";
import { forgetPasswordSchema, loginSchema, resetPasswordSchema, signupSchema,
  verifyEmailSchema, verifyEmailTokenSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouters } from "express";
import { checkSchema } from "express-validator";

const authRoutes = expressRouters();

authRoutes.route('/signup').post(checkSchema(signupSchema, ['body']), validateRequestSchema,
    validatePasswordMatch, SignupUser);

authRoutes.route('/login').post(checkSchema(loginSchema, ['body']), validateRequestSchema, LoginUser);

authRoutes.route('/send-verification-email').
    post(checkSchema(verifyEmailSchema, ['body']), validateRequestSchema, SendVerificationEmail);

authRoutes.route('/resend-verification-email').
    post(checkSchema(verifyEmailSchema, ['body']), validateRequestSchema, SendVerificationEmail);

authRoutes.route('/verify-email').
    post(checkSchema(verifyEmailTokenSchema, ['query']), validateRequestSchema, VerifyEmailVerificationToken);

// forget-password routes
authRoutes.route('/forget-password').
    post(checkSchema(forgetPasswordSchema, ['body']), validateRequestSchema, ForgetPassword);

authRoutes.route('/verify-forget-password').
    post(checkSchema(verifyEmailTokenSchema, ['query']), validateRequestSchema, VerifyForgetPasswordToken);

authRoutes.route('/reset-password').
    post(checkSchema(resetPasswordSchema, ['body']), validateRequestSchema,
        validatePasswordMatch, ResetPassword);

export default authRoutes;
