import { parseId } from "../../common/parsers";

type UserIds = { firstId: number, secondId: number };

export function parseContactIds({ firstId, secondId }: UserIds) {
    return {
        firstId: parseId(firstId),
        secondId: parseId(secondId)
    }
}