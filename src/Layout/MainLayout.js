import LeftSidebar from "./components/LeftSidebar"
import Header from "./components/Header"
// import PlayerBar from "./components/PlayerBar"
import { useRef, useState, useMemo, useEffect, createContext } from "react"
import _ from "lodash"
// import RightSidebar from "./components/RightSidebar/RightSidebar"
import PlayerContent from "./components/PlayerContent/PlayerContent"
export const MainProvider = createContext()

function MainLayout({ children }) {
	const divRef = useRef()
	console.log("render")
	return (
		<MainProvider.Provider value={{ divRef }}>
			<div>
				<div className="bg-[var(--layout-bg)] w-full flex ">
					<LeftSidebar />

					<div
						ref={divRef}
						className={`flex-1 h-[var(--main-height)] overflow-y-scroll `}>
						<Header />
						<div className="w-full px-[60px]">
							<div className="w-full 2xl:max-w-[1450px] mx-auto">
								{children}
							</div>
						</div>
					</div>
				</div>
				<PlayerContent />
			</div>
		</MainProvider.Provider>
	)
}

export default MainLayout
