import * as request from "~/utils/httpRequest"

export const getSongInfor = async (sid) => {
	try {
		const res = await request.get("/infosong", {
			params: {
				id: sid,
			},
		})
		return res.data
	} catch (e) {
		return e
	}
}
