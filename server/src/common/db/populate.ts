import users from "./_data/user.json";
import { authService } from "../../auth/services";
import { PrismaClient } from "@prisma/client";
import { contactService } from "../../contact/services/contactService";
import { Contact, ContactIdDb } from "../../contact/types";
import { conversationService } from "../../conversation/services";

const prisma = new PrismaClient();

async function clearAll() {
    await prisma.user.deleteMany();
    await prisma.userContacts.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.message.deleteMany();
}

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

// function makeMessages()

export async function populate() {
    await clearAll();
    const users = await makeUsers();
    await makeContacts([
        { firstId: users[0].id, secondId: users[1].id },
        { firstId: users[0].id, secondId: users[2].id },
    ]);
    const contacts = await contactService.findAll();
    await makeConversations([contacts[0], contacts[3]]);
    const conversations = await conversationService.findAll();
    console.log({ users });
    console.log({ contacts });
    console.log({ conversations });
}

populate();