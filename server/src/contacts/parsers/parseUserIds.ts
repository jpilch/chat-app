import { ParsingError } from "../../common/errors";
import { isNumber } from "../../common/utils";

type UserIds = { firstId: number, secondId: number };

export function parseId(id: unknown): number {
    if (!id || !isNumber(id)) {
        throw new ParsingError("Incorrect or missing id");
    }
    return id;
}

export function parseContactIds({ firstId, secondId }: UserIds) {
    return {
        firstId: parseId(firstId),
        secondId: parseId(secondId)
    }
}