import jwt from 'jsonwebtoken';
import { getEnv } from '@utils/getEnv';
import { JwtUser } from '@src/Types';
import { AppError } from '@src/errors/AppError';

class JwtSvs {
  private static accessTokenSecret: string = getEnv('JWT').access_token_secret;
  private static accessTokenExpiry: string = getEnv('JWT').access_token_expiry;

  public static async generateAccessToken(user: JwtUser): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const accessToken = jwt.sign({ user }, this.accessTokenSecret, { expiresIn: this.accessTokenExpiry });
        resolve(accessToken);
      } catch (error: any) {
        console.log('Error in generating token:', error.message);
        reject(new Error('Error in generating token: ' + error.message));
      }
    });
  }

  public static async verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = jwt.verify(token, this.accessTokenSecret);

      if (!decodedToken || typeof decodedToken !== 'object' || !('user' in decodedToken)) {
        throw new AppError('Invalid token', 401);
      }

      return decodedToken;
    } catch (error: any) {
      throw new AppError("Invalid Token", 401);
    }
  }
}

export default JwtSvs;
