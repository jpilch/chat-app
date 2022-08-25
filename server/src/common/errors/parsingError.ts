export class ParsingError extends Error {
    status: number = 400;
    message: string;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.message = message;
    }
}