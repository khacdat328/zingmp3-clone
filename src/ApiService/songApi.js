import * as request from "~/utils/httpRequest"

export const getSong = async (sid) => {
	try {
		const res = await request.get("/song", {
			params: { id: sid },
		})
		return res
	} catch (e) {
		return e
	}
}

export const getSongInfor = async (sid) => {
	try {
		const res = await request.get("/infosong", {
			params: {
				id: sid,
			},
		})
		return res
	} catch (e) {
		return e
	}
}

