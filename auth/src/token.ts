import jwt from "jsonwebtoken";

const SECRET: string = "yolo";

interface AuthTokenCredentials {
    email: string
    userID: string
}

function createAuthToken({email, userID}: AuthTokenCredentials): string {
    // create new token
    const newToken: string = jwt.sign({email, userID}, SECRET, {
        expiresIn: "30d",
        issuer: "linksbook-v2-ww"
    });

    return newToken;

}
