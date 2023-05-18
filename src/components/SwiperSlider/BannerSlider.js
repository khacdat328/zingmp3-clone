import { useEffect, useState, useRef, memo } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import BannerItem from "./Slider Item/BannerItemSlider"

// import required modules
import { Navigation, Autoplay } from "swiper"
import ArtisItemSlider from "./Slider Item/ArtistItemSlider"
import SliderNavigation from "./SliderNavigation"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import LivestreamRadio from "../LivestreamRadio/LivestreamRadio"

const BannerSlider = ({
	data,
	isBanner,
	isLivestream,
	className,
	slidesPerView = 3,
	isNavigation = false,
	seeAllSlide = false,
	speed = 400,
	...props
}) => {
	const [buttonState, setButtonState] = useState({
		inActive: false,
		disabled: true,
	})
	return (
		<div className={className}>
			<Swiper
				loop={true}
				slidesPerView={slidesPerView}
				speed={speed}
				modules={[Navigation, Autoplay]}
				onSlideChange={(swiper) => {
					if (swiper.realIndex === 0)
						setButtonState({ inActive: false, disabled: true })
					else if (swiper.realIndex === 6)
						setButtonState({ inActive: true, disabled: false })
					else setButtonState({ inActive: false, disabled: false })
				}}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				className="mySwiper relative"
				{...props}>
				<>
					{data.items.map((item, index) => {
						return (
							<SwiperSlide key={index} className="px-[15px]">
								{isBanner ? (
									<BannerItem data={{ item }} />
								) : isLivestream ? (
									<LivestreamRadio data={item} />
								) : (
									<ArtisItemSlider data={item} ranking={index} />
								)}
							</SwiperSlide>
						)
					})}
					{seeAllSlide && (
						<SwiperSlide className="px-[15px] !h-auto">
							<a
								href="/"
								className="flex justify-center items-center h-full w-full rounded-[4px] bg-alpha cursor-pointer">
								<span className="text-purplePrimary text-sm uppercase font-bold">
									Xem tất cả
								</span>
							</a>
						</SwiperSlide>
					)}
				</>
				{isNavigation && (
					<div>
						<SliderNavigation
							disabled={buttonState.disabled}
							icon={faAngleLeft}
							className="w-[38px] h-[38px] left-0 "
						/>
						<SliderNavigation
							inActive={buttonState.inActive}
							icon={faAngleRight}
							nextSlide={true}
							className=" w-[38px] h-[38px] right-0"
						/>
					</div>
				)}
			</Swiper>
		</div>
	)
}
export default memo(BannerSlider)
