import { configureStore } from "@reduxjs/toolkit"
import HomeDataSlice from "./slice/HomeDataSlice"
import songSlice from "./slice/playerSlice"
export const store = configureStore({
	reducer: {
		homepage: HomeDataSlice.reducer,
		player: songSlice.reducer
	},
})
