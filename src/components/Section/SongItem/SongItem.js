import { memo, useContext, useEffect, useRef, useState, Fragment } from "react"
import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tippy from "@tippyjs/react/headless"
import { followCursor } from "tippy.js"
import * as SongInfor from "~/ApiService/InforSong"
import Image from "~/components/Image"
import Popper from "~/components/Popper"
import SongMenu from "./SongMenu"
import { getDateFormat } from "~/Feature/GlobalFeature"
import { MainProvider } from "~/Layout/MainLayout"
import { Link } from "react-router-dom"

function SongItem({ data }) {
	const { divRef } = useContext(MainProvider)
	const [songInfor, setSongInfor] = useState([])
	const [active, setActive] = useState(false)
	const tooltip = useRef(null)

	const renderOption = ({ props }) => {
		return (
			<Popper>
				<SongMenu data={data} detailData={songInfor} />
			</Popper>
		)
	}
	const options = { day: "numeric", month: "numeric"}
	const releaseDate = getDateFormat(data.releaseDate, options)
	const toggleActive = () => setActive(!active)
	const hideTooltip = () => {
		if (tooltip.current._tippy.popperInstance) {
			tooltip.current._tippy.hide()
			setActive(false)
		}
	}

	useEffect(() => {
		const parentdiv = divRef.current
		parentdiv.addEventListener("scroll", hideTooltip)
		return () => parentdiv.removeEventListener("scroll", hideTooltip)
	}, [])

	useEffect(() => {
		const fetchSongInfor = async () => {
			const fetchData = await SongInfor.getSongInfor(data.encodeId)
			setSongInfor(fetchData)
		}
		fetchSongInfor()
	}, [data.encodeId])	

	return (
		<div className="group w-1/3 px-3.5">
			<div
				className={`group flex items-center p-2.5 rounded-[4px] group-hover:bg-alpha ${
					active && `bg-alpha`
				}`}>
				<div className="flex flex-auto mr-2.5 overflow-hidden">
					<div className="relative shrink-0 rounded-[4px] overflow-hidden mr-2.5">
						<figure className="w-[60px] h-auto bg-white">
							<Image className="w-[60px]" src={data.thumbnailM} alt="" />
						</figure>
						<div
							className={`absolute top-0 left-0 w-full h-full  group-hover:visible bg-[#00000080] ${
								active ? `visible` : `invisible`
							}`}></div>
						<div
							className={`absolute top-0 left-0 w-full h-full flex items-center justify-center group-hover:visible bg-[#00000080] ${
								active ? `visible` : `invisible`
							}`}>
							<button className="w-full h-full">
								<FontAwesomeIcon icon={faPlay} className="text-white" />
							</button>
						</div>
					</div>
					<div className="flex flex-col flex-grow	 overflow-hidden">
						<div className="flex leading-[1.3]">
							<span className="text-[14px] font-medium text-primary overflow-hidden whitespace-nowrap text-ellipsis">
								{data.title}
							</span>
						</div>
						<h3 className="text-[12px] text-secondary mt-[3px] overflow-hidden whitespace-nowrap text-ellipsis">
							{data.artists.map((artist, index) => (
								<Fragment key={index}>
									{index ? ", " : ""}
									<Link
										key={index}
										href="#"
										className="hover:text-link-hover hover:underline">
										{artist.name}
									</Link>
								</Fragment>
							))}
						</h3>
						<div className="text-[12px] text-secondary mt-[3px]">
							<span>{releaseDate}</span>
						</div>
					</div>
				</div>

				<div className="">
					<Tippy
						trigger="click"
						interactive
						render={renderOption}
						onCreate={(instance) => (tooltip.current = instance)}
						placement="right"
						followCursor="initial"
						onHide={() => setActive(false)}
						plugins={[followCursor]}
						appendTo={document.getElementById("portal")}>
						<button
							ref={tooltip}
							onClick={toggleActive}
							className="hidden group-hover:block py-[7px] px-2.5 rounded-full hover:bg-alpha">
							<span className=" px-0.5 text-primary">
								<FontAwesomeIcon icon={faEllipsis} />
							</span>
						</button>
					</Tippy>
				</div>
			</div>
		</div>
	)
}

export default memo(SongItem)
