import { Fragment } from "react"
import DetailInfor from "./DetailInfor"

function SongDetail({ data }) {
	return (
		<div className="w-[230px] py-2.5 bg-primaryBg">
			<div className="p-[15px]">
				<DetailInfor label="Nghệ sĩ">
					{data.artists &&
						data.artists.map((content, index) => (
							<Fragment key={index}>
								{index ? ", " : ""}
								<a
									key={index}
									href="/"
									className=" hover:text-link-hover">
									{content.name}
								</a>
							</Fragment>
						))}
				</DetailInfor>

				{data.album && (
					<DetailInfor label="Album">
						<a href="/" className=" hover:text-link-hover">
							{data.album.title}
						</a>
					</DetailInfor>
				)}
				{data.composers && (
					<DetailInfor label="Sáng tác">
						{data.composers.map((content, index) => (
							<Fragment key={index}>
								{index ? ", " : ""}
								<a
									key={index}
									href="/"
									className=" hover:text-link-hover">
									{content.name}
								</a>
							</Fragment>
						))}
					</DetailInfor>
				)}
				{data.genres && (
					<DetailInfor label="Thể loại">
						{data.genres.map((content, index) => (
							<Fragment key={index}>
								{index ? ", " : ""}
								<a
									key={index}
									href="/"
									className=" hover:text-link-hover">
									{content.name}
								</a>
							</Fragment>
						))}
					</DetailInfor>
				)}
				{data.distributor && (
					<DetailInfor label="Cung cấp bởi">
						<p href="/">{data.distributor}</p>
					</DetailInfor>
				)}
			</div>
		</div>
	)
}

export default SongDetail
