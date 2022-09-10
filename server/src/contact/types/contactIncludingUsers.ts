import { UserInDb } from "../../auth/types";

export type ContactIncludingUsers = {
    id: number,
    user: Partial<UserInDb>,
    contact: Partial<UserInDb>
}