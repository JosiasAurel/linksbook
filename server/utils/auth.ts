import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/user";

interface UserInfoRes {
  name: string;
  email: string;
  id: string;
}

async function authenticateUser(token: string): Promise<UserInfoRes> {
  const userInfo = verifyToken(token);

  const user = await getUserByEmail(userInfo.email);

  return user;
}

function verifyToken(token: string): any {
  const result = jwt.verify(token, "SECRET");
  return result;
}

export { authenticateUser };
