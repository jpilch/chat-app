import md5 from "md5";

import { ContactIdDb } from "../../contacts/types";

export function getConversationHash({ userId, contactId }: Partial<ContactIdDb>) {
    /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
    return userId! > contactId!
        ? md5(`${contactId}-${userId}`)
        : md5(`${userId}-${contactId}`);
}