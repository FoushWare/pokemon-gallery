import React from 'react'

export default function DetailView() {
	// get the pokemon id from the url
	const pokemonId = window.location.pathname.split('/')[3]



	return (
		<>
			<h1>Detail View</h1>
			<p>
				{pokemonId}
			</p>


		</>
	)
}
