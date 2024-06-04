import JwtSvs from "@src/services/auth/jwtSvs";
import { catchAsyncError } from "@src/utils/catchAsyncError";

const verifyLogin = catchAsyncError(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken ?? req.headers['authorization']?.split('Bearer ')[1];
  const tokenVerification = await JwtSvs.verifyToken(accessToken);

  req.user = tokenVerification.user;
  next();
});

export default verifyLogin;
