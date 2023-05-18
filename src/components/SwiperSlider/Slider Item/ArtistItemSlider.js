import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "../../Image/Image"
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons"
import ListItem from "../../List/Songs/SongListItem"
import { Fragment } from "react"
import { Link } from "react-router-dom"
import { getDateFormat } from "~/Feature/GlobalFeature"

function ArtisItemSlider({ data, ranking }) {
	const options = { day: "numeric", month: "numeric" }
	const releaseDate = getDateFormat(data.releaseDate, options).replace(
		"/",
		"."
	)
	return (
		<div className="p-[5px] rounded-[4px] bg-alpha">
			<div className="p-2.5 flex">
				<div className="group relative mr-2.5 rounded-md shrink-0 overflow-hidden">
					<figure className="w-[120px] h-[120px]  group-hover:scale-110 duration-700">
						<Image src={data.thumbnailM} />
					</figure>
					<div className="absolute top-0 left-0 w-full h-full invisible group-hover:visible bg-[#00000080]" />
					<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center invisible group-hover:visible bg-[#00000080]">
						<div className="flex flex-row justify-evenly items-center w-full">
							<button className="w-full h-full">
								<FontAwesomeIcon
									icon={faCirclePlay}
									className="text-white w-[45px] h-auto "
								/>
							</button>
						</div>
					</div>
				</div>

				<div className="flex flex-1 flex-col justify-between overflow-hidden">
					<div>
						<div>
							<span className="text-primary text-base text-ellipsis leading-[1.38] line-clamp-2 font-bold overflow-hidden">
								{data.title}
							</span>
						</div>
						<h3 className="text-[12px] text-secondary mt-[3px] overflow-hidden whitespace-normal line-clamp-2 text-ellipsis">
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
					</div>

					<div className="relative leading-none">
						<span className="font-[Roboto] text-[40px]  font-black text-transparent text-stroke ">
							{"#"}
							{ranking + 1}
						</span>
						<span className="absolute right-0 bottom-0  text-secondary text-sm leading-[1.8]">
							{releaseDate + ".2023"}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ArtisItemSlider
