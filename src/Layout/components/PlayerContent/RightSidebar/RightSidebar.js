import { memo, useContext, useRef } from "react"
import { shallowEqual, useSelector } from "react-redux"
import SongItem from "~/components/Section/SongItem/SongItem"
import { sidebarStateProvider } from "../PlayerContent"


function RightSidebar() {
	const tracklistRef = useRef()
	const { showRightSidebar: isShowSidebar } = useContext(sidebarStateProvider)
	const audioID = useSelector((state) => state.player.audioID, shallowEqual)
	const playlist = useSelector((state) => state.player.playlist, shallowEqual)
	return (
		<div
			className={`fixed top-0 bottom-[90px] z-10 w-[330px] shadow-right-sidebar bg-right-sidebar
		${isShowSidebar ? `right-0` : `right-[-330px]`}
		transition-all duration-700
		`}>
			<div className="relative flex flex-col h-[var(--main-height)]">
				<div>Header right sidebar</div>
				<div
					ref={tracklistRef}
					className="flex flex-col px-2 pb-[15px] overflow-auto">
					{playlist &&
						playlist.map((track, index) => (
							<SongItem
								key={index}
								data={track}
								parentRef={tracklistRef}
								audioID={audioID}
								playlist={playlist}
								largeThumbnail={false}
								className={"w-full"}
							/>
						))}
				</div>
			</div>
		</div>
	)
}

export default memo(RightSidebar)
