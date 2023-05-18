import { faCirclePlay, faHeart } from "@fortawesome/free-regular-svg-icons"
import {
	faBackwardFast,
	faBackwardStep,
	faEllipsis,
	faForwardFast,
	faForwardStep,
	faPlay,
	faRepeat,
	faShuffle,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tippy from "@tippyjs/react"
import Image from "~/components/Image/Image"
import Popper from "~/components/Popper/Popper"
import SongMenu from "~/components/Section/SongItem/SongMenu/SongMenu"

function PlayerBar({ current }) {
	const renderOption = ({ props }) => {
		return <Popper>{/* <SongMenu /> */}</Popper>
	}
	return (
		<div className="">
			<div className="cursor-pointer flex items-center h-[90px] min-w-3xl px-5 bg-player-bg border-t-[1px] border-alpha">
				<div className="relative flex w-[30%]">
					<div className="flex items-center w-full ">
						<div className="mr-2.5">
							<figure className="w-16 h-16 bg-white rounded-md overflow-hidden">
								<Image src="" />
							</figure>
						</div>
						<div className="max-w-[155px] flex-auto">
							<div className="w-full whitespace-nowrap overflow-hidden text-primary text-sm leading-[1.36]">
								<span className="pr-2.5 ">
									<a href="">Song name Lorem ipsum dolor sit amet.</a>
								</span>
							</div>
							<h3 className="mt-[1px] text-secondary text-xs">
								<a href="">Artist name</a>
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
								<Tippy
									trigger="click"
									interactive
									render={renderOption}
									placement="right"
									followCursor="initial"
									appendTo={document.getElementById("portal")}>
									<button className="p-[3px] mx-0.5 text-sm leading-none text-primary rounded-full hover:bg-alpha ">
										<FontAwesomeIcon
											icon={faEllipsis}
											className="text-base leading-none p-[5px] "
										/>
									</button>
								</Tippy>
							</div>
						</div>
					</div>
				</div>
				{/* PLAYER */}
				<div className="flex flex-col flex-grow max-w-[40vw] bg-alpha">
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
							<button className="cursor-pointer py-[7px] px-3.5 text-primary leading-none font-normal">
								<FontAwesomeIcon
									icon={faCirclePlay}
									className="text-4xl"
								/>
							</button>
							<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
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
					<div className="flex w-full mb-[5px]">
						<span className="min-w-[45px] text-xs leading-normal text-right text-secondary font-medium mr-2.5">
							99:99
						</span>
						<div className="flex-1 flex items-center  h-4">
							<div className="relative w-full h-[3px] rounded bg-alpha overflow-hidden">
								<div className="absolute h-[3px] bg-primary left-0 top-0 bottom-0 right-3"></div>
							</div>
						</div>
						<span className="min-w-[45px] text-xs leading-normal text-left text-primary font-medium ml-2.5">
							99:99
						</span>
					</div>
				</div>
				<div className="relative flex justify-end w-[30%] bg-red-500">
					<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
						<FontAwesomeIcon
							icon={faShuffle}
							className="p-[5px] text-lg "
						/>
					</button>
					<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
						<FontAwesomeIcon
							icon={faShuffle}
							className="p-[5px] text-lg "
						/>
					</button>
					<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
						<FontAwesomeIcon
							icon={faShuffle}
							className="p-[5px] text-lg "
						/>
					</button>
					<div className="flex">
						<button className="cursor-pointer p-[3px] mx-2 text-primary text-sm leading-none rounded-full hover:bg-alpha font-normal">
							<FontAwesomeIcon
								icon={faShuffle}
								className="p-[5px] text-lg "
							/>
						</button>

						<div className="relative">

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlayerBar
