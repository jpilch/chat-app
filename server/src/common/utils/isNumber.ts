export function isNumber(number: unknown): number is number {
    return typeof number === "number";
}