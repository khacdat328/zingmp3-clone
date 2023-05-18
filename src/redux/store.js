import { configureStore } from "@reduxjs/toolkit"
import HomeDataSlice from "./slice/HomeDataSlice"

export const store = configureStore({
	reducer: {
		homepage: HomeDataSlice.reducer,

	},
})
