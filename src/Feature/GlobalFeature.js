export const getDateFormat = (dt, options) => {
	const date = new Date(dt)
	return date.toLocaleDateString("vi-VN",options)
}
