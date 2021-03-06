import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/user";

config();

interface UserInfoRes {
  name: string;
  email: string;
  id: string;
}

async function authenticateUser(token: string): Promise<UserInfoRes> {
  const userInfo = verifyToken(token);
  // console.log("user info")
  // console.log(userInfo)

  const user = await getUserByEmail(userInfo.email);

  return user;
}

function verifyToken(token: string): any {
  const result = jwt.verify(token, `${process.env.SECRET}`);
  // console.log(result);
  return result;
}


export { authenticateUser };
