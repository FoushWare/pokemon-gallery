// pokemon card component to display the pokemon data
// name and image description pokemon type and pokemon abilities

import React from 'react'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

interface PokemonCardProps {
	pokemon: any
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
	// pokemon return data from the API is name and url
	// we need to fetch the pokemon data from the url
	// and display the pokemon name, image, type and abilities

	// use the pokemon url to fetch the pokemon data from the API
	const { isLoading, error, data }: any = useQuery(pokemon.name, () =>
		fetch(pokemon.url).then(res => res.json())
	)



	return (
		<>
			{isLoading ? (
				// show skeleton card while loading
				<Card loading={true} style={{ width: 300 }} />

			) : error ? (
				<div>Error: {error.message}</div>
			) : (
				// ant design card to display the pokemon data
				<Card
					style={{ width: 300 }}
					cover={
						<img
							alt="example"
							src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
						/>
					}
				>
				</Card>
			)}

		</>

	)
}


