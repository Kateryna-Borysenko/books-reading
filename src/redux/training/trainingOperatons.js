import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBookToTrainingApi } from '../../utils/bookReadApi';

export const addBookToTraining = createAsyncThunk('training/post/:id', async (id, thunkApi) => {
    try {
        const book = addBookToTrainingApi(id);
        return book;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const getTrainingList = createAsyncThunk('training/get/:id', async (id, thunkApi) => {
    try {
        const trainingBooks = await axios.post('/training/id');
        // data.set(data.id);
        return trainingBooks;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const deleteTrainingBook = createAsyncThunk('training/delete/:id', async (id, thunkApi) => {
    try {
        await axios.post('/training/id');
        // data.set(data.id);
        return id;
    } catch (error) {
        return thunkApi.rejectWithValue(error.message);
    }
});

// export const deleteTrainingBook = createAsyncThunk('training/delete/:id', async (id, thunkApi) => {
//     try {
//         await axios.post('/training/id');
//         // data.set(data.id);
//         return id;
//     } catch (error) {
//         return thunkApi.rejectWithValue(error.message);
//     }
// });