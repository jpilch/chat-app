import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectUsername } from "./authSlice";

export const useLoginRequired = () => {
    const username = useAppSelector(selectUsername);
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate("/sign-up");
        }
    }, [username]);
};