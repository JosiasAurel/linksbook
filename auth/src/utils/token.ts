import jwt from "jsonwebtoken";

import { ms } from "./ms";

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

function verifyToken(token: string): any {
    const verifiedToken: any = jwt.verify(token, SECRET, {
        issuer: "linksbook-v2-ww"
    });

    const validity: string = validateToken(token);

    if (validity === "valid") {
        return verifiedToken;
    }
    else {
        return "unknown"
    }

}

// Validate token
/*  
    We validate token by taking the difference between issuing date and expiring date
    Then we get the timespan of expiresIn (30 days) in milliseconds.
    If the difference above is greater or equals the value of 30d in ms
    Then the token is valid... Same applies to issuer having to be linksbook-v2-ww

*/
function validateToken(token: string): string {
    const validatedToken: any = jwt.verify(token, SECRET, {
        issuer: "linksbook-v2-ww"
    });

    const timeSpan: number = parseInt(`${ms("30d", {})}`) / 1000;
    console.log(timeSpan);
    let diff: number = validatedToken.exp - validatedToken.iat;
    
    if (validatedToken) {
        if (diff < timeSpan) {
            return "valid";
        }
        else {
            return "invalid";
        }
    } 
    else {
        return "invalid";
    }
}

let token = createAuthToken({email: "josias@josiasw.dev", userID: "23434"});
console.log(token);
verifyToken(token);
validateToken(token);