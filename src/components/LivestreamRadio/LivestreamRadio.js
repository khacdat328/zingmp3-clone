import { LiveTag } from "../Icon/Icon"

function LivestreamRadio({ data }) {
	const { program, host } = data
	return (
		<div>
			<div className="relative">
				<figure className="rounded-full overflow-hidden">
					<img className="w-full" src={program.thumbnail} alt="" />
				</figure>
				<figure className="absolute top-[85%] left-[85%] -translate-x-[60%] -translate-y-[60%] z-10 w-[36%] rounded-full overflow-hidden border-2 border-solid border-layout-bg">
					<img className="" src={host.thumbnail} alt="" />
				</figure>
				<LiveTag
					className={
						"absolute left-1/2 -bottom-2 -translate-x-1/2 translate-y-1/2F"
					}
				/>
			</div>
			<div className="mt-5 text-center">
				<h3 className="text-white text-base">{host.name}</h3>
				<h3 className="text-secondary text-xs">{`${data.activeUsers} đang nghe`}</h3>
			</div>
		</div>
	)
}

export default LivestreamRadio
