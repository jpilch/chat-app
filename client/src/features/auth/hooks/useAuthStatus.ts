import { useAppSelector } from "../../app/hooks";

import { selectUsername, selectToken } from "../state/authSlice";

export function useAuthStatus(): boolean {
    const token = useAppSelector(selectToken);
    const username = useAppSelector(selectUsername);

    return (token != null && username != null);
}