export class ParsingError extends Error {
    public readonly status: number = 400;
    public readonly description: string;

    constructor(message: string) {
        super(message);
        this.description = `${this.constructor.name}: ${this.message}`;
    }
}