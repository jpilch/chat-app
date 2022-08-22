export interface IQuickChatService {
    registerListeners: () => void;
    clearListeners: () => void;
    sendMessage: (message: string) => void;
    setUserTyping: () => void;
    getRoomId: () => string;
    getUsername: () => string;
}