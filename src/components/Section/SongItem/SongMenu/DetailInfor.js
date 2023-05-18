function DetailInfor({ label, children }) {
	return (
		<div>
			<div>
				<h3 className="text-secondary text-xs leading-[18px] uppercase">
					{label}
				</h3>
				<div className="text-primary text-sm leading-[21px]">
					{children}
				</div>
			</div>
		</div>
	)
}

export default DetailInfor
