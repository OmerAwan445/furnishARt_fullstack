import SetNewPasswordForm from "@/components/ForgotPasswordPage/SetNewPasswordForm";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function ForgotPasswordPage() {
  const cookiesStore = cookies();
  const cookiesUser_id = cookiesStore.get('user_id')?.value;
 let parsedCookieUser_id;
  if(cookiesUser_id) {
  parsedCookieUser_id = JSON.parse(cookiesUser_id);
}
  if(!parsedCookieUser_id) {
   return redirect('/forgot-password')
  }
  return (
   <SetNewPasswordForm user_id={parsedCookieUser_id} />
  );
}

export default ForgotPasswordPage;