function Banner({ data }) {
	return (
		<div className="flex w-auto flex-wrap -mx-3.5">
			{data.map((item, index) => (
				<div key={index} className="w-1/3 px-3.5 mb-7 ">
					<figure>
						<img
							className="rounded overflow-hidden"
							src={item.banner}
							alt={item.banner}
						/>
					</figure>
				</div>
			))}
		</div>
	)
}

export default Banner
