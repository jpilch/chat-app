import { User } from "./user";
import { UserInDb } from "./userInDb";

export interface IAuthService {
    registerUser: (user: User) => Promise<UserInDb>;
}