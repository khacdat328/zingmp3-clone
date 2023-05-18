import { useEffect, useState } from "react"
import SongItem from "../SongItem"

const activeButton = "bg-[var(--purple-primary)] border-transparent"
function NewRelease({ data }) {
	const SongNational = (e) => {
		const National_map = {
			all: data.items.all,
			vPop: data.items.vPop,
			others: data.items.others,
		}
		return National_map[e]
	}
	const [isActived, setActive] = useState("all")
	const [songNation, setSongNation] = useState(data.items.all)
	const handleActive = (e) => {
		if (isActived !== e.target.id) setActive(e.target.id)
	}
	useEffect(() => {
		setSongNation(SongNational(isActived))
	}, [isActived])
	return (
		<div>
			<div className="flex justify-start mb-4">
				<button
					id="all"
					onClick={handleActive}
					className={`mr-4 py-1 px-6 border-[1px] border-[var(--border-primary)] text-xs text-primary font-normal rounded-full 
                    ${isActived === "all" && activeButton} `}>
					TẤT CẢ
				</button>

				<button
					id="vPop"
					onClick={handleActive}
					className={`mr-4 py-1 px-6 border-[1px] border-[var(--border-primary)] text-xs text-primary font-normal rounded-full 
                    ${isActived === "vPop" && activeButton}`}>
					VIỆT NAM
				</button>

				<button
					id="others"
					onClick={handleActive}
					className={`mr-4 py-1 px-6 border-[1px] border-[var(--border-primary)] text-xs text-primary font-normal rounded-full 
                    ${isActived === "others" && activeButton}`}>
					QUỐC TẾ
				</button>
			</div>
			<div className="flex flex-wrap w-auto -mx-3.5 ">
				{songNation &&
					songNation
						.map((item, index) => <SongItem key={index} data={item} />)
						.filter((item, index) => index < 12)}
			</div>
		</div>
	)
}

export default NewRelease
