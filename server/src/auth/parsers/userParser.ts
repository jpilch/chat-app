import { ParsingError } from "../../common/errors";
import { User } from "../types";
import { isString } from "../../common/utils";

export function parseEmail(email: unknown): string {
    /* pattern taken somewhere from SO */
    if (!email || !isString(email) || !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        throw new ParsingError("Incorrect or missing email", 400);
    }
    return email;
}

export function parseUsername(username: unknown): string {
    if (!username || !isString(username)) {
        throw new ParsingError("Incorrect or missing username", 400);
    }
    return username;
}

export function parsePassword(password: unknown): string {
    if (!password || !isString(password)) {
        throw new ParsingError("Incorrect or missing password", 400);
    }
    return password;
}

export type UserFields = { email: unknown, username: unknown, password: unknown };

export function parseUser({ email, username, password }: UserFields): User {
    return {
        email: parseEmail(email),
        username: parseUsername(username),
        password: parsePassword(password)
    }
}

export default parseUser;