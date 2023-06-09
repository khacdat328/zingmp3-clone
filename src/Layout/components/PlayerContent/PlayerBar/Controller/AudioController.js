import { useState } from "react"
import AudioControlButton from "./AudioControlButton"
import ProgressBar from "./ProgressBar"

function AudioController({
	isLoadSong,
	isPlaying,
	audioRef,
	playerSelector,
	songInfor,
}) {
	const [currTime, setCurrTime] = useState(0)
	return (
		<div className="flex flex-col flex-grow max-w-[40vw]">
			<AudioControlButton
				isLoading={isLoadSong}
				audioRef={audioRef}
				playerSelector={playerSelector}
                changeCurrTime= {setCurrTime}
			/>
			<ProgressBar
				audioRef={audioRef}
				songInfor={songInfor}
				isPlaying={isPlaying}
                currTime={currTime}
                changeCurrTime = {setCurrTime} 
			/>
		</div>
	)
}

export default AudioController
