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
    const promiseArray = messages.map(message => messageService.create(message));
    return Promise.all(promiseArray);
}

export async function populate() {
    const users = await makeUsers();
    await makeContacts([
        { firstId: users[0].id, secondId: users[1].id },
        { firstId: users[0].id, secondId: users[2].id },
    ]);
    const contacts = await contactService.findAll();
    await makeConversations([contacts[0], contacts[3]]);
    const conversations = await conversationService.findAll();
    const mockMessages: Message[] = messageContents.map(({ content }, index) => ({
        authorId: users[index].id,
        conversationId: conversations[index % 2].id,
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