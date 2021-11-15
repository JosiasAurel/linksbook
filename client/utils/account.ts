
const SERVER_URI: string = process.env.NEXT_PUBLIC_SERVER_URI;

async function completeAccountCreation(name, email, userId): Promise<void> {
    const reqBody = { name, email, userId };
    const fetchRes = await fetch(`${SERVER_URI}/complete-account`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    });

    const result = await fetchRes.json();

    console.log(result);
}

export { completeAccountCreation };