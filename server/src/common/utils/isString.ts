export function isString(text: unknown): text is string {
    return typeof text === "string";
}