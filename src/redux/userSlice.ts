import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "../config/request";
import { User } from "../lib/types";
import { z } from "zod";
import { userSchema } from "../lib/validations/userSchema";
import { RootState } from "./store";

interface UseUser {
    data: User[] | null;
    isLoading: boolean;
    error: string | null;
}

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
    const response = await apiRequest.get("/users");

    const data: User[] = response.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        address: {
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
            geo: {
                lat: user.address.geo.lat,
                lng: user.address.geo.lng
            }
        },
        company: {
            name: user.company.name,
            catchPhrase: user.company.catchPhrase,
            bs: user.company.bs
        },
    } satisfies User));

    return data;
});

export const filterUsers = (state: RootState, query: string) => {

    const queryLower = query.toLowerCase()
    return state?.user?.data?.filter((user) =>
        user.name.toLowerCase().includes(queryLower) ||
        user.email.toLowerCase().includes(queryLower)
    ) as User[];
}

const initialState: UseUser = {
    data: null,
    isLoading: true,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<z.infer<typeof userSchema>>) => {
            const generateId = state.data ? state.data.length + 1 : 1;
            if (state.data) {
                state.data.push({ ...action.payload, id: generateId });
            }
        },
        editUser: (state, action: PayloadAction<z.infer<typeof userSchema> & { id: number }>) => {
            if (state.data) {
                const userIndex = state.data.findIndex((user) => user.id === action.payload.id);
                state.data[userIndex] = { ...action.payload };
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            if (state.data) {
                state.data = state.data.filter((user) => user.id !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch users';
        })
    }
});


export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;