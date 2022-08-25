import { User } from "../types";

function isString(text: unknown): text is string {
    return typeof text === 'string';
}

function parseEmail(email: unknown): string {
    /* pattern taken somewhere from SO */
    if (!email || !isString(email) || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        throw new Error("Incorrect or missing email");
    }
    return email;
}

function parseUsername(username: unknown): string {
    if (!username || !isString(username)) {
        throw new Error("Incorrect or missing username");
    }
    return username;
}

function parsePassword(password: unknown): string {
    if (!password || !isString(password)) {
        throw new Error("Incorrect or missing password");
    }
    return password;
}

type Fields = { email: unknown, username: unknown, password: unknown };

export function parseUser({ email, username, password }: Fields): User {
    return {
        email: parseEmail(email),
        username: parseUsername(username),
        password: parsePassword(password)
    }
}

export default parseUser;