import { authOptions } from "@/utils/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const  data = await getServerSession(authOptions);
  return (
    <div  className="w-full bg-red-500"> {JSON.stringify(data)} </div>
  );
}