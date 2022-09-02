export interface IChatService {
    registerHandlers: () => void;
    connect: () => void;
    disconnect: () => void;
}