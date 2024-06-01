import { EncryptedDataInToken } from "@src/Types";
import { findUserToken } from "@src/models/UserTokenModel";
import { getEnv } from "@src/utils/getEnv";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { tokenType } from '@prisma/client';

const algorithm = 'aes-256-cbc'; // Use AES 256-bit encryption
const secret_key = getEnv("VerificationTokenSecret").substring(0, 16);
const key = createHash('sha512').update(secret_key).digest('hex').substring(0, 32);

function generateCryptoTokenAndEncryptData<T>(data: T) {
  const serializedData = JSON.stringify(data);
  const iv = randomBytes(16); // Generate a random 16-byte IV
  const cipher = createCipheriv(algorithm, key, iv);
  const encryptedData = cipher.update(serializedData, "utf8", "hex") + cipher.final("hex");
  const token = iv.toString("hex") + encryptedData;

  return Buffer.from(token, "hex").toString("base64");
}

function extractDataFromCryptoToken<T>(cryptoToken: string): T | null {
  try {
    const buffer = Buffer.from(cryptoToken, 'base64');
    const iv = buffer.subarray(0, 16); // Extract the IV from the buffer
    const encryptedData = buffer.subarray(16); // Extract the encrypted data

    const decipher = createDecipheriv(algorithm, key, iv);
    decipher.setAutoPadding(true); // Enable auto-padding (PKCS#7)

    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    return JSON.parse(decryptedData.toString('utf8')) as T;
  } catch (error) {
    console.error('Error extracting data from crypto token:', error);
    return null;
  }
}

// function to check if Previous Token Updated Time is Less Than Token Resend Time
async function isTokenResendEligible(userId: number, tokenType: tokenType, RESEND_TIME: number) {
  const existingToken = await findUserToken(userId, tokenType);
  if (!existingToken || !existingToken.updated_at) return true;

  // Calculate the time difference in milliseconds
  const currentTime = new Date();
  const tokenTime = existingToken.updated_at;
  const timeDifference = currentTime.getTime() - tokenTime.getTime();

  return timeDifference > (RESEND_TIME * 1000);
}

const checkTokenValidityAndExtractData = async (token: string, tokenType: tokenType): Promise<{
  data: EncryptedDataInToken | null, isValidToken: boolean, errorMsg: string | null }> => {
  const data = extractDataFromCryptoToken<EncryptedDataInToken>(token);
  if (!data || !data.userId) {
    return { data: null, isValidToken: false, errorMsg: "Invalid token" };
  }

  const userToken = await findUserToken(data.userId, tokenType);
  if (!userToken || userToken.token !== token || userToken.expiry.getTime() < Date.now()) {
    return { data: null, isValidToken: false, errorMsg: "Token is invalid or expired" };
  }

  return { data, isValidToken: true, errorMsg: null };
};

export { extractDataFromCryptoToken,
  generateCryptoTokenAndEncryptData,
  checkTokenValidityAndExtractData,
  isTokenResendEligible };

