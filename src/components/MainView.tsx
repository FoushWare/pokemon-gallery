// pokemon main view
import { Button, Card, Col, Row } from 'antd'
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
					{/* 3 cards in each row   */}
					<Row >
						{data.results.map((pokemon: any) => (
							<Col xs={24} sm={24} md={12} lg={8} xl={8}

								style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}
							>
								<PokemonCard key={pokemon.name} pokemon={pokemon} />
							</Col>
						))}
					</Row>



					<div style={{ margin: '20px' }}>
						<Button
							size='large'
							onClick={() => setPage((old: any) => Math.max(old - 6, 0))}
							disabled={page === 0}
							style={{
								margin: '0px 10px',
								// if the button is not disabled then show the color else show the grey color
								background: page === 0 ? 'grey' : '#EF5350',
								color: 'white',
								// when hover over the button show the pointer cursor and when it's disabled show the not allowed cursor
								cursor: page === 0 ? 'not-allowed' : 'pointer',
								// make text uppercase
								textTransform: 'uppercase',
								padding: '0px 2rem',

							}}
						>
							Previous
						</Button>
						<Button
							size='large'
							onClick={() =>
								setPage((old: any) => (old + 6 > 100 ? old : old + 6))
							}
							disabled={page + 6 > 100}

							style={{
								margin: '0px 10px',
								// if the button is not disabled then show the color else show the grey color
								background: page + 6 > 100 ? 'grey' : '#EF5350',
								color: 'white',
								// when hover over the button show the pointer cursor and when it's disabled show the not allowed cursor
								cursor: page + 6 > 100 ? 'not-allowed' : 'pointer',
								textTransform: 'uppercase',
								padding: '0px 2rem',

							}}
						>
							Next
						</Button>
					</div>

				</>




			)}
		</>
	)
}

export default MainView

