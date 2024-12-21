import AuthController from "@src/controllers/auth_controller";
import { validateRequestSchema } from "@src/middlewares/validate-request-schema";
import { validatePasswordMatch } from "@src/middlewares/validatePasswordMatch";
import { forgetPasswordSchema, loginSchema, resetPasswordSchema, signupSchema,
  sendVerificationEmailSchema, verifyEmailTokenSchema } from "@src/validations/AuthValidationSchemas";
import { Router as expressRouters } from "express";
import { checkSchema } from "express-validator";

const authRoutes = expressRouters();
const controller = new AuthController();

authRoutes.route('/signup').post(checkSchema(signupSchema, ['body']), validateRequestSchema,
    validatePasswordMatch, controller.createCustomerAndSendVerification);

authRoutes.route('/login').post(checkSchema(loginSchema, ['body']), validateRequestSchema, controller.authenticateUser);

authRoutes.route('/send-verification-email').
    post(checkSchema(sendVerificationEmailSchema, ['body']), validateRequestSchema, controller.sendVerificationEmail);

authRoutes.route('/resend-verification-email').
    post(checkSchema(sendVerificationEmailSchema, ['body']), validateRequestSchema, controller.sendVerificationEmail);

authRoutes.route('/verify-email').
    get(checkSchema(verifyEmailTokenSchema, ['query']), validateRequestSchema, controller.verifyEmailVerificationToken);

// forget-password routes
authRoutes.route('/forget-password').
    post(checkSchema(forgetPasswordSchema, ['body']), validateRequestSchema, controller.forgetPassword);

authRoutes.route('/verify-forget-password').
    get(checkSchema(verifyEmailTokenSchema, ['query']), validateRequestSchema, controller.verifyForgetPasswordToken);

authRoutes.route('/reset-password').
    post(checkSchema(resetPasswordSchema, ['body']), validateRequestSchema,
        validatePasswordMatch, controller.resetPassword);

export default authRoutes;
