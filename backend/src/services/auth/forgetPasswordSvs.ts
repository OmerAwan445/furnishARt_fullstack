import { getEnv } from "@src/utils/getEnv";
import { formatTimeInWordsWithUnit } from "@src/utils/formatTimeInWordsWithUnit";
import CryptoTokenSvs from "./cryptoTokenSvs";
import { AppError } from "@src/errors/AppError";
import EmailSvs from "./mailSvs";
import { saveTokenToDbIfExistUpdate } from "@src/models/CustomerTokenModel";
import { EncryptedDataInToken } from "@src/Types";

const sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded = async (
    email: string,
    customer_id: number,
) => {
  const tokenType = "PASSWORD_RESET";
  const token_resend_time = getEnv('RESEND_FORGET_PASS_EMAIL_TIME');

  const _isTokenResendEligible = await CryptoTokenSvs.isTokenResendEligible(customer_id, tokenType, token_resend_time);
  const formatedResendTime = formatTimeInWordsWithUnit(token_resend_time);
  if (!_isTokenResendEligible) {
    return {
      msg: `Forget Password Email already sent. Try again after ${formatedResendTime}`,
      error: true,
      statusCode: 409,
    };
  }
  const token = CryptoTokenSvs.generateCryptoTokenAndEncryptData<EncryptedDataInToken>({ customer_id });
  if (!token) throw new AppError("Token generation failed", 500);
  const encodedToken = encodeURIComponent(token);
  const msg = await EmailSvs.sendForgotPasswordEmail(email, encodedToken);
  await saveTokenToDbIfExistUpdate(token, customer_id, tokenType);
  return { token, msg, error: false, statusCode: 200 };
};


export { sendForgetPassEmailAndSaveTokenIfResendTimeLimitNotExceeded };
