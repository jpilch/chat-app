import { createSlice } from "@reduxjs/toolkit";

import { Contact } from "../types";

type ContactState = {
    contacts: Contact[]
}

const initialState: ContactState = {
    contacts: []
}

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {

    }
})

export default contactSlice.reducer;