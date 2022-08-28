import { socket } from "../socket";

import { useMemo } from "react";

export const useQuickChatSocket = () => useMemo(() => socket, []);