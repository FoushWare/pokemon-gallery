// and Design
import { Button, Card, Col, Row } from 'antd'
import React, { useState } from 'react'
// react query
import { useQuery } from 'react-query'
// pokemon card component
import PokemonCard from './PokemonCard/PokemonCard'
import PaginationButton from './PaginationButtons/PaginationButtons'

function MainView() {
	// hook for page number to fetch data from the API with react query and pagination 
	const [page, setPage] = useState(0)

	// ====================== Start react query ======================  fetch paginated pokemon //

	/*** react query with pagination 
	 **  each step is 6 items with next and previous buttons
	****/
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

	// ====================== end react query ======================  fetch paginated pokemon //


	return (
		<div className='container'>
			{isLoading ? (
				// grid of chard skeleton loading ⏳
				<div className='loading'>
					<Row>
						{/* loop for 6 cards loading skelton */}
						{[...Array(6)].map((item, index) => (
							<Col xs={24} sm={24} md={12} lg={8} xl={8}
								style={{ padding: '10px', display: 'flex', justifyContent: 'center' }}
								key={index}
							>
								<Card
									key={index}
									style={{ width: 300, height: 300 }}
									loading
								/>
							</Col>
						))}
					</Row>
				</div>
				// Error  ❌
			) : error ? (
				<div>Error: {error.message}</div>
			) : (
				<>
					{/* 3 cards in each row  🟢 */}
					<Row >
						{data.results.map((pokemon: any) => (
							<Col xs={24} sm={24} md={12} lg={8} xl={8}
								style={{ padding: '10px' }}
								key={pokemon.name}
							>
								<PokemonCard key={pokemon.name} pokemon={pokemon} />
							</Col>
						))}
					</Row>


					{/* pagination buttons */}
					<PaginationButton
						page={page}
						setPage={setPage}
						total={Number(100)}
						isLoading={isLoading}
					/>


				</>




			)}
		</div>
	)
}

export default MainView

