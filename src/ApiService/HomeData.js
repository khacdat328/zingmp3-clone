import * as request from "~/utils/httpRequest"

export const getHomeData = async () => {
	try {
		const res = await request.get("/home")
		return res
	} catch (e) {
		console.log(e)
	}
}
