import { createSelector } from "@reduxjs/toolkit"
export const HomeDataSelector = (state) => state.homepage
// export const HomeSlider = (state) => {
// 	const sliderItem = state.homepage.homeData.filter(
// 		(item) => item.sectionType === "banner" && item.viewType === "slider"
// 	)
// 	return sliderItem[0]
// }

// export const HomeDataSelector = createSelector(HomeSlider, (slider) => {
// 	return {
// 		slider: slider,
// 	}
// })
