export class AuthenticationError extends Error {
    public readonly status: number = 403;
    public readonly description: string;

    constructor(message: string) {
        super(message);
        this.description = `${this.constructor.name}: ${this.message}`;
    }
}