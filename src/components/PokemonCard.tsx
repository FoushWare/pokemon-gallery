// pokemon card component to display the pokemon data
// name and image description pokemon type and pokemon abilities

import React from 'react'
import { Card, Col, Row } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import Meta from 'antd/es/card/Meta'

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


	// get the pokemon abilities with english language
	const { isLoading: isLoadingAbilities, error: errorAbilities, data: dataAbilities }: any = useQuery(
		`${pokemon.name} abilities`,
		() =>
			fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.name}`).then(
				(res) => res.json()
			),
		{
			enabled: !isLoading && !error,
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
				// ant design card to display the pokemon data
				<Card
					style={{ width: 300 }}
					cover={
						<div
							style={{
								background: '#EBF5F0'
							}}
						>
							<img
								alt="example"
								src={data.sprites.front_default}

							/>
						</div>

					}

				>
					<Meta
						title={<Link to={`/pokemon/${data.name}`}> {data.name} </Link>}
						description={
							<>
								<p>
									{
										// display abilities with english language limit characters to 100
										dataAbilities
											? dataAbilities.flavor_text_entries
												.filter((item: any) => item.language.name === 'en')
												.map((item: any) => item.flavor_text)
												.join(' ')
												.slice(0, 100)
											: ''
									}
								</p>
							</>
						}
					/>


				</Card>
			)
			}

		</>

	)
}


