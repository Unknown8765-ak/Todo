import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import taskSlice from "../features/task/taskSlice"

const store = configureStore({
    reducer : {
        auth : authSlice,
        tasks : taskSlice,
    }
})

export default store