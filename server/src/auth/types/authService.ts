import { LoginCredentials } from "./loginCredentials";
import { User } from "./user";
import { UserInDb } from "./userInDb";

export interface IAuthService {
    register: (user: User) => Promise<UserInDb>;
    login: (credentials: LoginCredentials) => Promise<string>;
}