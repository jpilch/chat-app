import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { USER_AUTH_DATA } from "../../common/config";
import { localStorageRemove } from "../../common/utils";
import { ChatSocket } from "../socket";
import { IChatService } from "../types";

export function useChatService(): IChatService {
    const instance = ChatSocket.getInstance();
    const socket = instance.getSocket();

    const navigate = useNavigate();

    function registerHandlers() {
        socket.on("connect_error", (err) => {
            console.log({ err });
            localStorageRemove(USER_AUTH_DATA);
            navigate("/");
        })
    }

    function connect() {
        registerHandlers();
        instance.connect();
    }

    function disconnect() {
        instance.disconnect();
    }

    return {
        connect, disconnect, registerHandlers
    }
}