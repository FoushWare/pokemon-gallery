// pokemon main view
import { Card } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import PokemonCard from './PokemonCard'

function MainView() {

	// hook for page
	const [page, setPage] = useState(0)


	// useQuery to fetch data from the API https://pokeapi.co/ and display it paginated in rows of pokemon cards
	// and use ant design to style the cards and pagination
	// pagination with next and previous button

	// react query with pagination each step is 6 items with next and previous
	const { isLoading, error, data }: any = useQuery(
		['pokemon', page],
		() =>
			fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page}&limit=6`).then(
				(res) => res.json()
			),
		{
			keepPreviousData: true,
		}
	)



	return (
		<>
			{isLoading ? (
				// show skeleton card while loading
				<Card loading={true} style={{ width: 300 }} />
			) : error ? (
				<div>Error: {error.message}</div>
			) : (
				// ant desgin pagination to display the pokemon data
				<>
					<div>
						{data.results.map((pokemon: any) => (
							<PokemonCard key={pokemon.name} pokemon={pokemon} />
						))}
					</div>
					<div>
						<button
							onClick={() => setPage((old: any) => Math.max(old - 6, 0))}
							disabled={page === 0}
						>
							Previous
						</button>
						<span>{page / 6 + 1}</span>
						<button
							onClick={() =>
								setPage((old: any) => (old + 6 > 100 ? old : old + 6))
							}
							disabled={page + 6 > 100}
						>
							Next
						</button>
					</div>

				</>




			)}
		</>
	)
}

export default MainView

