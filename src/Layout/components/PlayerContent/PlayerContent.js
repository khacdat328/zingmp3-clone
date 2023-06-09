import { createContext, useState } from "react"
import PlayerBar from "./PlayerBar/PlayerBar"
import RightSidebar from "./RightSidebar/RightSidebar"
export const sidebarStateProvider = createContext()
function PlayerContent() {
	const [showRightSidebar, setShowRightSidebar] = useState(false)

	return (
		<sidebarStateProvider.Provider
			value={{ showRightSidebar, setShowRightSidebar }}>
			<PlayerBar/>
			<RightSidebar />
		</sidebarStateProvider.Provider>
	)
}

export default PlayerContent
