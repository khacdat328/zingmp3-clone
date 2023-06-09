import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as getSongs from "~/ApiService/songApi"
const initState = {
	status: "idle",
	audioID: '',
	playlist: [],
	isPlaying: false,
}

const playerSlice = createSlice({
	name: "songs",
	initialState: initState,
	reducers: {
		setSongToPlay: (state, action) => {
			state.audioID = action.payload
			// state.isPlaying = true
		},
		setPlayStatus: (state, action) => {
			state.isPlaying = action.payload
		},
		setPlaylist: (state,action) => {
			state.playlist = action.payload
		}
	},

})

export default playerSlice
