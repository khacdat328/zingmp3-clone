import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSwiper } from "swiper/react"

function SliderNavigation({
	nextSlide = false,
	icon,
	className,
	inActive = false,
	disabled = false,
}) { 
	const swiper = useSwiper()
	const handleNextslide = () => {
		nextSlide ? swiper.slideNext() : swiper.slidePrev()
	}
	return (
		<button
			onClick={handleNextslide}
			disabled={disabled}
			className={`absolute  z-10 top-1/2 -translate-y-1/2 rounded-full bg-white ${
				(inActive || disabled) && `opacity-10`
			}  ${className}`}>
			<FontAwesomeIcon icon={icon} />
		</button>
	)
}

export default SliderNavigation
