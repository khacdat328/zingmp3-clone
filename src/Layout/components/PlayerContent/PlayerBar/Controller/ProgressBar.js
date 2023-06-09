import { useState, useEffect, useRef } from "react"
import moment from "moment"
let audioProgress
function ProgressBar({ audioRef, songInfor, isPlaying , currTime, changeCurrTime}) {
	const progressRef = useRef()
	const barContainerRef = useRef()
	useEffect(() => {
		if (songInfor && isPlaying) {
			audioProgress = setInterval(() => {
				var currentProgress = Math.round(
					100 - (audioRef.current.currentTime / songInfor.duration) * 100
				)
				progressRef.current.style.cssText = `right: ${currentProgress}%`
				changeCurrTime(audioRef.current.currentTime)
			}, 200)
		} else {
			audioProgress && clearInterval(audioProgress)
		}
		return () => clearInterval(audioProgress)
	}, [songInfor, isPlaying])

	useEffect(() => {
		changeCurrTime(0)
	}, [songInfor])
	const handleClickProgressBar = (e) => {
		const { left, width } = barContainerRef.current.getBoundingClientRect()
		const percent = (e.clientX - left) / width
		const timeOnClick = Math.round(percent * songInfor.duration)
		audioRef.current.currentTime = timeOnClick
		var currentProgress = Math.round(
			100 - (audioRef.current.currentTime / songInfor.duration) * 100
		)
		progressRef.current.style.cssText = `right: ${currentProgress}%`
		changeCurrTime(audioRef.current.currentTime)
	}
	return (
		<div className="flex w-full mb-[5px]">
			<span className="min-w-[45px] text-xs leading-normal text-right text-secondary font-medium mr-2.5">
				{moment(currTime * 1000).format("mm:ss")}
			</span>
			<div className="relative flex-1 flex items-center h-4">
				<div
					ref={barContainerRef}
					className="relative w-full h-[3px] rounded bg-alpha overflow-hidden group hover:h-[5px]"
					onClick={handleClickProgressBar}>
					<div
						ref={progressRef}
						className="absolute  bg-primary left-0 top-0 bottom-0"></div>
				</div>
			</div>
			<span className="min-w-[45px] text-xs leading-normal text-left text-primary font-medium ml-2.5">
				{songInfor
					? moment(songInfor.duration * 1000).format("mm:ss")
					: `00:00`}
			</span>
		</div>
	)
}

export default ProgressBar
