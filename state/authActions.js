import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import Constants from "expo-constants";
const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:5000`;

const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, username, password }, thunkAPI) => {
        console.log(email, username, password, uri);
        try {
            const config = {
                headers: {
                    "content-type": "application/json"
                }
            }

            const res = await axios.post(
                `${uri}/api/user/register`,
                { email, username, password },
                config
            );

            console.log("res: ", res.data);
        } catch (error) {
            if (error.response && error.response.data.message){
                console.log(error.response.data.message);
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            else{
                console.log(error);
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            const { data } = await axios.post(
                '/api/user/login',
                { email, password },
                config
            )

            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

export { registerUser, userLogin }