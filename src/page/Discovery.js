import { memo, useEffect, useState } from "react"
import Section from "~/components/Section"
import BannerSlider from "~/components/SwiperSlider/BannerSlider"
import NewRelease from "~/components/Section/Section Content"
import PlaylistBanner from "~/components/List/Playlists/PlaylistBanner"

import { useSelector, useDispatch } from "react-redux"
import { HomeDataSelector } from "~/redux/selector/homeSelector"
import { getHomeData } from "~/redux/slice/HomeDataSlice"
import Spinner from "~/components/Loading/Spinner"
import Banner from "~/components/Banner"

// NOTE: test data
function Discovery() {
	const dispatch = useDispatch()
	const { status, homeData } = useSelector(HomeDataSelector)
	const {
		banner,
		new_release,
		playlist: chillPlaylist,
		playlist_hEditorTheme2: weekEndPlaylist,
		playlist_hArtistTheme: trendingArtist,
		newReleaseChart,
		weekChart,
		playlist_h100: top100Playlist,
		playlist_hAlbum: albumHot,
		livestream,
	} = homeData

	useEffect(() => {
		dispatch(getHomeData())
	}, [])
	return (
		<>
			{!status ? (
				<Spinner />
			) : (
				<div className="">
					<BannerSlider
						isBanner={true}
						data={banner}
						slidesPerGroup={1}
						className="pt-8 -mx-3.5"
					/>

					<Section title={new_release.title} seeAll={false}>
						<NewRelease data={new_release} />
					</Section>

					<Section title={chillPlaylist.title} seeAll={false}>
						<PlaylistBanner data={chillPlaylist.items} />
					</Section>

					<Section title={weekEndPlaylist.title}>
						<PlaylistBanner data={weekEndPlaylist.items} />
					</Section>

					<Section>
						<PlaylistBanner data={trendingArtist.items} />
					</Section>

					<Section title={newReleaseChart.title}>
						<BannerSlider
							speed={200}
							isBanner={false}
							isNavigation={true}
							slidesPerGroup={3}
							data={newReleaseChart}
							seeAllSlide={true}
							className="-mx-3.5"
						/>
					</Section>

					<Section title={weekChart.title} className="mt-7 pt-10 -mb-7">
						<Banner data={weekChart.items} />
					</Section>

					<Section title={top100Playlist.title}>
						<PlaylistBanner
							data={top100Playlist.items}
							hasArtistList={true}
						/>
					</Section>

					<Section title={albumHot.title}>
						<PlaylistBanner data={albumHot.items} hasArtistList={true} />
					</Section>

					<Section title={livestream.title}>
						<BannerSlider
							data={livestream}
							isLivestream={true}
							slidesPerGroup={3}
							slidesPerView={7}
							isNavigation={true}
						/>
					</Section>
				</div>
			)}
		</>
	)
}
export default memo(Discovery)
