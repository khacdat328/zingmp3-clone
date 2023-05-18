import PlaylistItem from "./PlaylistItem"

const PlaylistBanner = ({ data = [] , hasArtistList = false}) => {
	return (
		<div className="flex w-auto flex-wrap -mx-3.5">
			{data
				.map((item, index) => (
					<PlaylistItem
						key={index}
						data={item}
						hasArtistList={hasArtistList}
					/>
				))
				.filter((item, index) => index < 5)}
		</div>
	)
}

export default PlaylistBanner
