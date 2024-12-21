
import ResetPasswordForm from "@/components/AuthForms/ResetPasswordForm";
import AuthSvs from "@/services/Auth";
import { Alert, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { token?: string };
}) {
  let isTokenValid = false;
  let token = searchParams?.token;
  if (token) {
    try {
       /* Cy1VrOIRmlQsvTw0+/Q3qiZ3kF6NakOHgKei/fatgPzhGUeCkqveIm88SZftdpHQ */
      // this type of token is missing '+' in searchparams find a way to fix it
       // token = encodeURIComponent(token);
      await AuthSvs.verifyForgetPasswordToken(token);
      isTokenValid = true;
    } catch (error: any) {
      isTokenValid = false;
    }
  }

  return (
    <Container>
      <br/>
      {(isTokenValid && token) ? (
        <ResetPasswordForm token={token} />
      ) : (
        <>
        <Alert sx={{ alignItems: "center" }} severity="error">
          <Typography variant="h6" component="div">
            Invalid or expired token. Try Resetting Password again.
          </Typography>{" "}
        </Alert>
          <Link className="flex mt-3 justify-center " href="/forget-password">
          <Button variant="outlined" color="info">
            Request New Password Reset
          </Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default ResetPasswordPage;
