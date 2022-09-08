import { ParsingError } from "../errors";
import { isNumber } from "../utils";

export function parseId(id: unknown): number {
    if (!id || !isNumber(id)) {
        throw new ParsingError("Incorrect or missing id");
    }
    return id;
}