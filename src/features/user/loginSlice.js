import { createSlice } from '@reduxjs/toolkit'


export const LoginSlice = createSlice({
    name : 'LoginData',
    initialState : {
        User : null
    },
    reducers : {
        LoginUserData : (state , action) => {
            state.User = action.payload;
             console.log(action.payload);
             
        }
    }
})

export const {LoginUserData} = LoginSlice.actions

export default LoginSlice.reducer;