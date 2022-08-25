import { LoginCredentials } from "../types";
import { parsePassword, parseUsername } from "./userParser";

export type LoginCredentialFields = { username: unknown, password: unknown };

export function parseLoginCredentials({ username, password }: LoginCredentialFields): LoginCredentials {
    return {
        username: parseUsername(username),
        password: parsePassword(password)
    };
};