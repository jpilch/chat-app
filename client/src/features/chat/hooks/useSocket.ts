import { useMemo } from "react";

import { socket } from "../socket";

export const useSocket = () => {
    return useMemo(() => socket, []);
};