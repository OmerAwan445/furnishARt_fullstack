import { getEnv } from "@src/utils/getEnv";
import { formatTimeInWordsWithUnit } from "@src/utils/formatTimeInWordsWithUnit";
import { generateCryptoTokenAndEncryptData, isTokenResendEligible } from "./cryptoVerificationTokenSvs";
import { AppError } from "@src/errors/AppError";
import EmailService from "./mailSvs";
import { saveTokenToDbIfExistUpdate } from "@src/models/UserTokenModel";
import { EncryptedDataInToken } from "@src/Types";

/**
 * Sends a forget password email, generates a crypto token with encrypted userId in it and
 * saves token to DB if the resend time limit has not been exceeded.
 * @param {string} email The email address of the user.
 * @param {number} userId The ID of the user.
 * @return { object } An object containing a message, error flag, and status code.
 */
const sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded = async (
    email: string,
    userId: number,
) => {
  const tokenType = "PASSWORD_RESET";
  const token_resend_time = getEnv('RESEND_FORGET_PASS_EMAIL_TIME');

  const _isTokenResendEligible = await isTokenResendEligible(userId, tokenType, token_resend_time);
  const formatedResendTime = formatTimeInWordsWithUnit(token_resend_time);
  if (!_isTokenResendEligible) {
    return {
      msg: `Forget Password Email already sent. Try again after ${formatedResendTime}`,
      error: true,
      statusCode: 409,
    };
  }
  const token = generateCryptoTokenAndEncryptData<EncryptedDataInToken>({ userId });
  if (!token) throw new AppError("Token generation failed", 500);
  const msg = await EmailService.sendForgotPasswordEmail(email, token);
  await saveTokenToDbIfExistUpdate(token, userId, tokenType);
  return { token: encodeURIComponent(token), msg, error: false, statusCode: 200 };
};


export { sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded };
