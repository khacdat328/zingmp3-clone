import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as getSongs from "~/ApiService/songApi"
const initState = {
	status: "idle",
	audioID: '',
	playlist: [],
	isPlaying: false,
}

const songSlice = createSlice({
	name: "songs",
	initialState: initState,
	reducers: {
		setSongToPlay: (state, action) => {
			state.audioID = action.payload
			state.isPlaying = true
		},
		setPlayStatus: (state, action) => {
			state.isPlaying = action.payload
		},
		setPlaylist: (state,action) => {
			state.playlist = action.payload
		}
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(getSong.pending, (state, action) => {
	// 			state.status = "Loading"
	// 		})
	// 		.addCase(getSong.fulfilled, (state, action) => {
	// 			state.newRelease = action.payload
	// 			state.status = "idle"
	// 		})
	// },
})

export default songSlice

// export const getSong = createAsyncThunk(
// 	"songs/getNewReleaseSong",
// 	async () => {
// 		const newReleaseSongs = await getSongs.NewRelease(12)
// 		return newReleaseSongs
// 	}
// )
