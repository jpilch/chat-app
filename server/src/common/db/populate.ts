import users from "./_data/user.json";
import messageContents from "./_data/message.json";
import { authService } from "../../auth/services";
import { contactService } from "../../contact/services/contactService";
import { Contact, ContactIdDb } from "../../contact/types";
import { conversationService } from "../../conversation/services";
import { Message } from "../../message/types";
import { messageService } from "../../message/services";

function makeUsers() {
    const promiseArray = users.map(user => authService.register(user));
    return Promise.all(promiseArray);
}

function makeContacts(ids: Array<Contact>) {
    const promiseArray = ids.map(pair => contactService.create(pair));
    return Promise.all(promiseArray);
}

function makeConversations(contacts: Array<ContactIdDb>) {
    const promiseArray = contacts.map(contact => conversationService.create(contact));
    return Promise.all(promiseArray);
}

function makeMessages(messages: Message[]) {
    /* simulate 1 sec timeouts between messages */
    const promiseArray = messages.map((message, index) => new Promise(resolve => setTimeout(async () => {
        const created = await messageService.create(message);
        resolve(created);
    }, (index + 1) * 1000)));
    return Promise.all(promiseArray);
}
export async function populate() {
    const users = await makeUsers();
    await makeContacts([
        { firstId: users[0].id, secondId: users[1].id },
    ]);
    const contacts = await contactService.findAll();
    await makeConversations([contacts[0]]);
    const conversations = await conversationService.findAll();
    const mockMessages: Message[] = messageContents.map(({ content }, index) => ({
        authorId: users[index % 2].id,
        conversationId: conversations[0].id,
        content,
    }));
    await makeMessages(mockMessages);
    const messages = await messageService.findAll();
    console.log({ users });
    console.log({ contacts });
    console.log({ conversations });
    console.log({ messages });
}

populate();