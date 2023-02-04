import React, { useRef } from 'react'

import SearchBar, { SearchBarRef } from 'antd-mobile/es/components/search-bar'


// install ant design mobile 
// npm install antd-mobile --save

export default function Header() {
	const searchRef = useRef<SearchBarRef>(null)

	return (

		// navbar with logo and title and search bar 
		<nav className='navbar'>
			<div className='container'>
				<div className="nav-wrapper">
					{/* logo */}
					<div className="navbar-brand">
						<img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
						<h6>Pokemon gallery</h6>
					</div>
					{/* no list */}
					{/* make the search small and in the right  */}
					<div className="search">
						<SearchBar
							ref={searchRef}
							placeholder="Search ..."
							onSearch={val => {
								console.log('search', val)
							}}
							onFocus={() => {
								console.log('focus')
							}}
							onBlur={() => {
								console.log('blur')
							}}
							onCancel={() => {
								console.log('cancel')
							}}

						/>
					</div>

				</div>
			</div>
		</nav>





	)
}
