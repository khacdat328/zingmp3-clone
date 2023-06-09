import { Fragment, memo, useContext, useEffect, useRef, useState } from "react"
import Image from "~/components/Image/Image"
import { faHeart, faWindowRestore } from "@fortawesome/free-regular-svg-icons"
import { faEllipsis, faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { RiPlayListFill } from "react-icons/ri"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import * as songApi from "~/ApiService/songApi"
import { PlayerSelector } from "~/redux/selector/playerSelector"
import songSlice from "~/redux/slice/playerSlice"
import AudioController from "./Controller/AudioController"
import VolumeController from "./VolumeController"
import { sidebarStateProvider } from "../PlayerContent"
// import { MainProvider } from "~/Layout/MainLayout"

function PlayerBar({ audioData }) {
	const {
		showRightSidebar: isShowSidebar,
		setShowRightSidebar: setShowSidebar,
	} = useContext(sidebarStateProvider)
	const audioRef = useRef()
	const dispatch = useDispatch()
	const playerSelector = useSelector(PlayerSelector)
	const { audioID, isPlaying } = playerSelector
	const [songInfor, setSongInfor] = useState()
	const [audioSrc, setAudioSrc] = useState()
	const [isLoadSong, setLoadSong] = useState(true)

	const fetchSongData = async () => {
		setLoadSong(true)
		const audioRes = await songApi.getSong(audioID)
		const songInforRes = await songApi.getSongInfor(audioID)
		if (songInforRes.err === 0) setSongInfor(songInforRes.data)
		if (songInforRes.err === 0 && audioRes.err === 0) {
			setAudioSrc(audioRes.data["128"])
		}
		setLoadSong(false)
	}
	useEffect(() => {
		fetchSongData()
	}, [audioID])

	useEffect(() => {
		let audioData = window.localStorage.getItem("localAudioData")
		if (audioData) {
			dispatch(
				songSlice.actions.setSongToPlay(JSON.parse(audioData).audioID)
			)
			dispatch(songSlice.actions.setPlaylist(JSON.parse(audioData).playlist))
		}
	}, [])

	const playOnUpdate = async () => {
		await audioRef.current.play()
	}

	useEffect(() => {
		audioRef.current.pause()
		audioRef.current.load()
		if (isPlaying) playOnUpdate()
	}, [audioSrc])

	return (
		<>
			<audio ref={audioRef} src={audioSrc}></audio>
			<div className="fixed bottom-0 left-0 right-0 z-20 cursor-pointer flex items-center h-[90px] min-w-3xl px-5 bg-player-bg border-t-[1px] border-alpha">
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
				<AudioController
					isLoadSong={isLoadSong}
					isPlaying={isPlaying}
					audioRef={audioRef}
					playerSelector={playerSelector}
					songInfor={songInfor}
				/>

				<div className="relative flex justify-end w-[30%]">
					<button className="cursor-not-allowed p-[3px] mx-0.5 text-secondary leading-none rounded-full hover:bg-alpha font-normal">
						<FontAwesomeIcon
							icon={faMicrophone}
							className="p-[5px] text-sm"
						/>
					</button>

					<button className="cursor-not-allowed p-[3px] mx-0.5 text-secondary leading-none rounded-full hover:bg-alpha font-normal">
						<FontAwesomeIcon
							icon={faWindowRestore}
							className="p-[5px] text-sm flip"
						/>
					</button>

					<VolumeController audioRef={audioRef} />

					<div>
						<div className="h-8 w-[1px] bg-alpha mx-5"></div>
					</div>
					<div className="flex items-center">
						<button
							onClick={() => setShowSidebar(!isShowSidebar)}
							className={`h-[30px] px-[5px] border-[1px] rounded border-transparent  text-primary text-base leading-[30px] ${
								isShowSidebar ? `bg-purplePrimary` : ` bg-alpha`
							} `}>
							<RiPlayListFill />
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(PlayerBar)
