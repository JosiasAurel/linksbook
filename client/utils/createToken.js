

function createJWT(name, email, id) {
    let tokenBody = {
        name,
        email,
        id
    };

    let tokenHeader = {
        expiryDate: new Date().getUTCDate()
    }

    let newToken = btoa(`${tokenHeader}.${tokenBody}`);
    return newToken;
}

module.exports = { createJWT };