import * as request from "~/utils/httpRequest"

export const NewRelease = async (sid) => {
	try {
		const res = await request.get("/songs", {
			params: { id: sid },
		})
		return res
	} catch (e) {
		return e
	}
}
