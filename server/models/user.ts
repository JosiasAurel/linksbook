import { deta } from "./index";

const db = deta.Base("users");

async function saveUser(userId: string, email: string, name: string): Promise<any> {
    
    const users = await (await db.fetch({userId})).items;
    if (users.length === 0) {
        try {
                const newUser = await db.put({
                    name,
                    email,
                    userId
                }, userId);

                return "Success";
        } catch(error: any) {
            return "Failed";
        }

    } else {
        return "ExistingUser";
    }
}

export { saveUser };