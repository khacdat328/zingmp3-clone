export default function BannerItem({ data }) {
	const { item } = data;
	return (
		<div className="">
			<a href="#">
				<img
					src={item.banner}
					alt={item.encodeId}
					className="h-full w-full object-cover object-center rounded-lg max-h-[240px]"
				/>
			</a>
		</div>
	);
}
