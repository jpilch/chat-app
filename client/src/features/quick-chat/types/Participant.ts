export interface Participant {
    username: string;
    isTyping: boolean;
    timeoutId: number | null;
}