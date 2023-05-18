import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as HomeData from "~/ApiService/HomeData"
const initState = {
	status: false,
	homeData: [],
}

const HomeDataSlice = createSlice({
	name: "home",
	initialState: initState,
	// reducers: {
	// 	setAlbums: (state, action) => {
	// 		state.Albums = action.payload
	// 	},
	// },
	extraReducers: (builder) => {
		builder.addCase(getHomeData.fulfilled, (state, action) => {
			state.homeData = action.payload
			state.status = true
		})
	},
})

export default HomeDataSlice

export const getHomeData = createAsyncThunk("home/getHomeData", async () => {
	const res = await HomeData.getHomeData()
	const resObject = res.data.items.reduce((accumulator, item, index) => {
		if (item.sectionType.includes("-"))
			item.sectionType = item.sectionType.replace("-", "_")
		const key = accumulator[item.sectionType]
			? `${item.sectionType}_${item.sectionId}`
			// ? item.title
			: item.sectionType
		accumulator[key] = item
		return accumulator
	}, {})
	return resObject
})
