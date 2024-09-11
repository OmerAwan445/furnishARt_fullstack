import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

async function getSessionServerSide(){
    return await getServerSession(authOptions);

}

export { getSessionServerSide };