import axios from "axios";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (e) {
      toast.error(
        `Something went wrong... Try again. Error details: ${e.message}`
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", { name, number });
      toast.success(`Contact "${name}" added.`);
      return response.data;
    } catch (e) {
      toast.error(
        `Something went wrong... Try again. Error details: ${e.message}`
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      toast.error(`Contact "${response.data.name}" deleted.`);
      return response.data;
    } catch (e) {
      toast.error(
        `Something went wrong... Try again. Error details: ${e.message}`
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const editContact = createAsyncThunk(
  "contacts/editContact",
  async (contact, thunkAPI) => {
    const { id, name, number } = contact;
    try {
      const response = await axios.put(`/contacts/${id}`, { name, number });
      toast.success(`Contact "${name}" updated.`);
      return response.data;
    } catch (e) {
      toast.error(
        `Something went wrong... Try again. Error details: ${e.message}`
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const searchContact = createAsyncThunk(
  "contacts/searchContacts",
  async (searchTerm, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts?search=${searchTerm}`);
      return response.data;
    } catch (e) {
      toast.error(
        `Something went wrong... Check your request. Error details: ${e.message}`
      );
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export { fetchContacts, addContact, deleteContact, editContact, searchContact };
