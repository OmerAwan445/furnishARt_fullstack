import jwt from 'jsonwebtoken';
import { getEnv } from '@utils/getEnv';
import { JwtUser } from '@src/Types';
import { AppError } from '@src/errors/AppError';

async function generateAccessToken(user:JwtUser):Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const { access_token_secret, access_token_expiry } = getEnv('JWT');
      const accessToken = jwt.sign({ user }, access_token_secret, { expiresIn: access_token_expiry });

      resolve(accessToken);
    } catch (error:any) {
      console.log('Error in generating token:', error.message);
      reject(new Error('Error in generating token: ' + error.message ));
    }
  });
}

async function verifyToken(token:string) {
  try {
    const decodedToken = jwt.verify(token, getEnv('JWT')?.access_token_secret);

    if (!decodedToken || typeof decodedToken !== 'object' || !('user' in decodedToken)) {
      throw new AppError('Invalid token', 401);
    }

    return decodedToken;
  } catch (error:any) {
    throw new AppError("Invalid Token", 401);
  }
}

export { generateAccessToken, verifyToken };
