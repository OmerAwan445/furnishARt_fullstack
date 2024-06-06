import AuthController from "@src/controllers/auth_controller";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import { validatePasswordMatch } from "@src/middlewares/validatePasswordMatch";
import { forgetPasswordSchema, loginSchema, resetPasswordSchema, signupSchema,
  sendVerificationEmailSchema, verifyEmailTokenSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouters } from "express";
import { checkSchema } from "express-validator";

const authRoutes = expressRouters();

authRoutes.route('/signup').post(checkSchema(signupSchema, ['body']), validateRequestSchema,
    validatePasswordMatch, AuthController.createCustomerAndSendVerification);

authRoutes.route('/login').post(checkSchema(loginSchema, ['body']), validateRequestSchema, AuthController.authenticateCustomer);

authRoutes.route('/send-verification-email').
    post(checkSchema(sendVerificationEmailSchema, ['body']), validateRequestSchema, AuthController.sendVerificationEmail);

authRoutes.route('/resend-verification-email').
    post(checkSchema(sendVerificationEmailSchema, ['body']), validateRequestSchema, AuthController.sendVerificationEmail);

authRoutes.route('/verify-email').
    get(checkSchema(verifyEmailTokenSchema, ['query']), validateRequestSchema, AuthController.verifyEmailVerificationToken);

// forget-password routes
authRoutes.route('/forget-password').
    post(checkSchema(forgetPasswordSchema, ['body']), validateRequestSchema, AuthController.forgetPassword);

authRoutes.route('/verify-forget-password').
    get(checkSchema(verifyEmailTokenSchema, ['query']), validateRequestSchema, AuthController.verifyForgetPasswordToken);

authRoutes.route('/reset-password').
    post(checkSchema(resetPasswordSchema, ['body']), validateRequestSchema,
        validatePasswordMatch, AuthController.resetPassword);

export default authRoutes;
