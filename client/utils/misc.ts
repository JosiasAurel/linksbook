
function setCredentials(name: string, email: string, accessToken: string) {

    // setting credentials
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    return;
}

export { setCredentials };