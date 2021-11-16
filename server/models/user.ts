import { deta } from "./index";

const users = deta.Base("users");

async function getUserByEmail(email: string): Promise<any> {
  const users__: any = await (await users.fetch({ email })).items;
  const user = users__[0];

  return user;
}

export { getUserByEmail };
