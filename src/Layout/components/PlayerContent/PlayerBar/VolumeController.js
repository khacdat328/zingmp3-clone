import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo, useEffect, useState } from "react"

function VolumeController({ audioRef }) {
	const [audioVolume, setAudioVolume] = useState({
		currVolume: 60,
		prevVolume: 60,
	})
	useEffect(() => {
		audioRef.current.volume = audioVolume.currVolume / 100
	}, [audioVolume, audioRef])
	const handleChangeVolume = (e) => {
		setAudioVolume((prev) => ({
			currVolume: e.target.value,
			prevVolume: prev.currVolume,
		}))
	}
	const handleToggleVolume = () => {
		if (audioRef.current.volume === 0) {
			setAudioVolume((prev) => ({
				currVolume: prev.prevVolume,
				prevVolume: 0,
			}))
		} else {
			setAudioVolume((prev) => ({
				currVolume: 0,
				prevVolume: prev.currVolume,
			}))
		}
	}
	return (
		<div className="flex items-center">
			<button
				onClick={handleToggleVolume}
				className="cursor-pointer p-[3px] mx-0.5 text-primary leading-none rounded-full hover:bg-alpha font-normal">
				{audioVolume.currVolume === 0 ? (
					<FontAwesomeIcon
						icon={faVolumeMute}
						className="p-[5px] text-sm"
					/>
				) : (
					<FontAwesomeIcon
						icon={faVolumeHigh}
						className="p-[5px] text-sm"
					/>
				)}
			</button>

			<div className="relative flex-1 flex items-center h-4 group">
				<input
					type="range"
					className={`cursor-pointer w-full appearance-none bg-alpha
                    h-[3px] rounded slider-thumb:appearance-none slider-thumb:hidden slider-thumb:w-2 slider-thumb:h-2 slider-thumb:rounded-full slider-thumb:bg-white
                    group-hover:slider-thumb:block`}
					value={audioVolume.currVolume}
					onChange={handleChangeVolume}
					min={0}
					max={100}
				/>
				<div
					className={`absolute rounded top-1/2 left-0 -translate-y-1/2 h-[3px] bg-primary`}
					style={{ right: `${100 - audioVolume.currVolume}%` }}></div>
			</div>
		</div>
	)
}

export default memo(VolumeController)
