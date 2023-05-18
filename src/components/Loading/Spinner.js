import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Spinner() {
	return (
		<div className="flex w-full justify-center text-white text-3xl">
			<FontAwesomeIcon icon={faSpinner}  className="fa-spin"/>
		</div>
	)
}

export default Spinner
