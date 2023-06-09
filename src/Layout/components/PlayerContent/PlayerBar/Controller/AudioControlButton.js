import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCirclePlay,
	faPauseCircle,
} from "@fortawesome/free-regular-svg-icons"
import {
	faBackwardFast,
	faBackwardStep,
	faForwardStep,
	faPause,
	faPlay,
	faRepeat,
	faShuffle,
	faSpinner,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import songSlice from "~/redux/slice/playerSlice"
function AudioControlButton({
	isLoading,
	audioRef,
	playerSelector,
	changeCurrTime,
}) {
	const dispatch = useDispatch()
	const { audioID, isPlaying, playlist } = playerSelector
	const currentIndex = playlist.findIndex((id) => id.encodeId === audioID)

	const handleTogglePlayAudio = () => {
		if (audioRef.current.paused) {
			audioRef.current.play()
			dispatch(songSlice.actions.setPlayStatus(true))
		} else {
			audioRef.current.pause()
			dispatch(songSlice.actions.setPlayStatus(false))
		}
	}
	const playOnUpdate = async () => {
		await audioRef.current.play()
	}
	const onPrev = () => {
		audioRef.current.pause()
		audioRef.current.load()
		if (currentIndex === 0 || audioRef.current.currentTime > 4) {
			dispatch(songSlice.actions.setPlayStatus(false))
			changeCurrTime(0)
			audioRef.current.load()
			if (isPlaying) playOnUpdate()
			dispatch(songSlice.actions.setPlayStatus(true))
		} else {
			dispatch(songSlice.actions.setPlayStatus(false))
			dispatch(
				songSlice.actions.setSongToPlay(playlist[currentIndex - 1].encodeId)
			)
			dispatch(songSlice.actions.setPlayStatus(true))
		}
	}
	const onNext = () => {
		audioRef.current.pause()
		audioRef.current.load()
		dispatch(songSlice.actions.setPlayStatus(false))
		dispatch(
			songSlice.actions.setSongToPlay(playlist[currentIndex + 1].encodeId)
		)
		dispatch(songSlice.actions.setPlayStatus(true))
	}
	return (
		<div className="flex justify-center">
			<div className="flex items-center">
				<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
					<FontAwesomeIcon icon={faShuffle} className="p-[5px] text-lg " />
				</button>

				<button
					className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal"
					onClick={onPrev}>
					<FontAwesomeIcon
						icon={faBackwardStep}
						className="p-[5px] text-lg "
					/>
				</button>

				<button
					className="cursor-pointer mx-[7px]  text-primary leading-none font-normal"
					onClick={handleTogglePlayAudio}>
					<div className="flex items-center justify-center h-10 w-10 m-[5px] rounded-full border-[1px]">
						<FontAwesomeIcon
							icon={isLoading ? faSpinner : isPlaying ? faPause : faPlay}
							className={`text-xl ${isLoading && "fa-spin"}`}
						/>
					</div>
				</button>

				<button
					className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal"
					onClick={onNext}>
					<FontAwesomeIcon
						icon={faForwardStep}
						className="p-[5px] text-lg "
					/>
				</button>

				<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
					<FontAwesomeIcon icon={faRepeat} className="p-[5px] text-lg " />
				</button>
			</div>
		</div>
	)
}

export default AudioControlButton
