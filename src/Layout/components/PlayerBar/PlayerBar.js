import { Fragment, useEffect, useRef, useState } from "react"
import moment from "moment/moment"
import {
	faCirclePlay,
	faHeart,
	faPauseCircle,
	faWindowRestore,
} from "@fortawesome/free-regular-svg-icons"
import {
	faBackwardFast,
	faBackwardStep,
	faEllipsis,
	faForwardFast,
	faForwardStep,
	faMicrophone,
	faPlay,
	faRepeat,
	faShuffle,
	faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons"
import { RiPlayListFill } from "react-icons/ri"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import Image from "~/components/Image/Image"
import * as songApi from "~/ApiService/songApi"
import { PlayerSelector } from "~/redux/selector/playerSelector"
import songSlice from "~/redux/slice/songSlice"
import ProgressBar from "./ProgressBar"

function PlayerBar({ current }) {
	const audioRef = useRef()
	const dispatch = useDispatch()
	const { audioID, playlist, isPlaying } = useSelector(PlayerSelector)
	const [songInfor, setSongInfor] = useState()
	const [audioSrc, setAudioSrc] = useState()
	const fetchSongData = async () => {
		const audioRes = await songApi.getSong(audioID)
		const songInforRes = await songApi.getSongInfor(audioID)
		if (songInforRes.err === 0) setSongInfor(songInforRes.data)
		if (audioRes.err === 0) {
			setAudioSrc(audioRes.data["128"])
		}
	}
	useEffect(() => {
		fetchSongData()
	}, [audioID])

	const onNext = async () => {
		const currentIndex = playlist.findIndex((id) => id.encodeId === audioID)
		await dispatch(
			songSlice.actions.setSongToPlay(playlist[currentIndex + 1].encodeId)
		)
		dispatch(songSlice.actions.setPlayStatus(true))
	}

	const playOnUpdate = async () => {
		await audioRef.current.play()
	}

	useEffect(() => {
		audioRef.current.pause()
		audioRef.current.load()
		if (isPlaying) playOnUpdate()
	}, [audioSrc])

	//Toggle play button
	const handleTogglePlayAudio = () => {
		if (audioRef.current.paused) {
			audioRef.current.play()
			dispatch(songSlice.actions.setPlayStatus(true))
		} else {
			audioRef.current.pause()
			dispatch(songSlice.actions.setPlayStatus(false))
		}
	}
	return (
		<>
			<audio ref={audioRef} src={audioSrc}></audio>
			<div className="">
				<div className="cursor-pointer flex items-center h-[90px] min-w-3xl px-5 bg-player-bg border-t-[1px] border-alpha">
					<div className="relative flex w-[30%]">
						<div className="flex items-center w-full ">
							<div className="mr-2.5">
								<figure className="w-16 h-16 bg-white rounded-md overflow-hidden">
									<Image
										src={songInfor?.thumbnailM}
										alt={songInfor?.alias}
									/>
								</figure>
							</div>
							<div className="max-w-[155px] flex-auto">
								<div className="w-full whitespace-nowrap overflow-hidden text-primary text-sm leading-[1.36]">
									<span className="pr-2.5 ">
										<a href="">{songInfor?.title}</a>
									</span>
								</div>
								<h3 className="mt-[1px] text-secondary text-xs">
									{songInfor?.artists.map((artist, index) => (
										<Fragment key={index}>
											{index ? ", " : ""}
											<a href="">{artist.name}</a>
										</Fragment>
									))}
								</h3>
							</div>
							<div className="flex items-center">
								<div>
									<button className="p-[3px] mx-0.5 text-sm leading-none text-primary rounded-full hover:bg-alpha ">
										<FontAwesomeIcon
											icon={faHeart}
											className="text-base leading-none p-[5px] "
										/>
									</button>
								</div>
								<div>
									<button className="p-[3px] mx-0.5 text-sm leading-none text-primary rounded-full hover:bg-alpha ">
										<FontAwesomeIcon
											icon={faEllipsis}
											className="text-base leading-none p-[5px] "
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* PLAYER */}
					<div className="flex flex-col flex-grow max-w-[40vw]">
						<div className="flex justify-center">
							<div className="flex items-center">
								<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
									<FontAwesomeIcon
										icon={faShuffle}
										className="p-[5px] text-lg "
									/>
								</button>

								<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
									<FontAwesomeIcon
										icon={faBackwardStep}
										className="p-[5px] text-lg "
									/>
								</button>

								<button
									className="cursor-pointer py-[7px] px-3.5 text-primary leading-none font-normal"
									onClick={handleTogglePlayAudio}>
									<FontAwesomeIcon
										icon={isPlaying ? faPauseCircle : faCirclePlay}
										className="text-4xl"
									/>
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
									<FontAwesomeIcon
										icon={faRepeat}
										className="p-[5px] text-lg "
									/>
								</button>
							</div>
						</div>
						<ProgressBar
							audioRef={audioRef}
							songInfor={songInfor}
							isPlaying={isPlaying}
						/>
					</div>

					<div className="relative flex justify-end w-[30%]">
						<button className="cursor-pointer p-[3px] mx-0.5 text-primary leading-none rounded-full hover:bg-alpha font-normal">
							<FontAwesomeIcon
								icon={faMicrophone}
								className="p-[5px] text-sm"
							/>
						</button>
						<button className="cursor-pointer p-[3px] mx-0.5 text-primary leading-none rounded-full hover:bg-alpha font-normal">
							<FontAwesomeIcon
								icon={faWindowRestore}
								className="p-[5px] text-sm flip"
							/>
						</button>
						<div className="flex items-center">
							<button className="cursor-pointer p-[3px] mx-0.5 text-primary leading-none rounded-full hover:bg-alpha font-normal">
								<FontAwesomeIcon
									icon={faVolumeHigh}
									className="p-[5px] text-sm"
								/>
							</button>

							<div className="flex-1 flex items-center h-4">
								<div className="relative w-[70px] h-[3px] rounded bg-alpha overflow-hidden">
									<div className="absolute h-[3px] bg-primary left-0 top-0 bottom-0 right-3"></div>
								</div>
							</div>
						</div>
						<div>
							<div className="h-8 w-[1px] bg-alpha mx-5"></div>
						</div>
						<div className="flex items-center">
							<button className=" h-[30px] px-[5px] border-[1px] rounded border-transparent  text-primary text-base leading-[30px] bg-alpha">
								<RiPlayListFill />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PlayerBar
