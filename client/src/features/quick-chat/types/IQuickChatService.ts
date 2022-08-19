export interface IQuickChatService {
    registerListeners: () => void;
    clearListeners: () => void;
    sendMessage: (message: string) => void;
    getRoomId: () => string;
}