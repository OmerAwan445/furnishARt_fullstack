import { EncryptedDataInToken } from "@src/Types";
import { findCustomerToken } from "@src/models/CustomerTokenModel";
import { getEnv } from "@src/utils/getEnv";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { tokenType } from '@prisma/client';

class CryptoTokenSvs {
  private static algorithm = 'aes-256-cbc';
  private static secret_key = getEnv("VerificationTokenSecret").substring(0, 16);
  private static key = createHash('sha512').update(this.secret_key).digest('hex').substring(0, 32);

  public static generateCryptoTokenAndEncryptData<T>(data: T): string {
    const serializedData = JSON.stringify(data);
    const iv = randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    const encryptedData = cipher.update(serializedData, "utf8", "hex") + cipher.final("hex");
    const token = iv.toString("hex") + encryptedData;

    return Buffer.from(token, "hex").toString("base64");
  }

  public static extractDataFromCryptoToken<T>(cryptoToken: string): T | null {
    try {
      const buffer = Buffer.from(cryptoToken, 'base64');
      const iv = buffer.subarray(0, 16);
      const encryptedData = buffer.subarray(16);

      const decipher = createDecipheriv(this.algorithm, this.key, iv);
      decipher.setAutoPadding(true);

      let decryptedData = decipher.update(encryptedData);
      decryptedData = Buffer.concat([decryptedData, decipher.final()]);

      return JSON.parse(decryptedData.toString('utf8')) as T;
    } catch (error) {
      console.error('Error extracting data from crypto token:', error);
      return null;
    }
  }

  public static async isTokenResendEligible(customer_id: number, tokenType: tokenType, RESEND_TIME: number) {
    const existingToken = await findCustomerToken(customer_id, tokenType);
    if (!existingToken) return true;

    const currentTime = new Date();
    const tokenTime = existingToken.updated_at;
    const timeDifference = currentTime.getTime() - tokenTime.getTime();

    return timeDifference > (RESEND_TIME * 1000);
  }

  public static async checkTokenValidityAndExtractData(
      token: string,
      tokenType: tokenType,
  ): Promise<{ data: EncryptedDataInToken | null, isValidToken: boolean, errorMsg: string | null }> {
    const data = this.extractDataFromCryptoToken<EncryptedDataInToken>(token);
    if (!data || !data.customer_id) {
      return { data: null, isValidToken: false, errorMsg: "Invalid token" };
    }

    const userToken = await findCustomerToken(data.customer_id, tokenType);
    if (!userToken || userToken.token !== token || userToken.expiry.getTime() < Date.now()) {
      return { data: null, isValidToken: false, errorMsg: "Token is invalid or expired" };
    }

    return { data, isValidToken: true, errorMsg: null };
  }
}

export default CryptoTokenSvs;
