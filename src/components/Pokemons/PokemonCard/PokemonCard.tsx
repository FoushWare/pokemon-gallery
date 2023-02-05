
// ant design
import { Badge, Card, Skeleton, } from 'antd'
import Meta from 'antd/es/card/Meta'
// react router
import { useNavigate } from 'react-router-dom'
// react query
import { useQuery } from 'react-query'

/**
 * 
 * @param pokemon
 * @returns Component: pokemon card component to display the pokemon data
** name and image description pokemon type and pokemon abilities
 */
export default function PokemonCard({ pokemon }: any) {
	// navigator to the pokemon detail view
	const navigate = useNavigate();


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
								background: '#EBF5F0',
								textAlign: 'center',
							}}
						>
							<img
								alt="example"
								src={data.sprites.front_default}

							/>
						</div>

					}
					// when click on the card redirect to the pokemon details page
					onClick={() => {
						navigate(`/pokemon/${pokemon.name}`)
					}}
					// when hover on the card show cursor pointer
					hoverable




				>
					<Meta
						title={data.name}
						description={
							<>
								<p>
									{
										// display abilities with english language limit characters to 100
										!isLoadingAbilities && !errorAbilities ?
											dataAbilities.flavor_text_entries.filter((item: any) => item.language.name === 'en')[0].flavor_text.slice(0, 100) + '...'
											: 'default description text'
									}
								</p>
							</>
						}
					/>
					<Badge
						count={data.types[0].type.name}
						size="default"
						style={{
							// background color based on the pokemon type
							backgroundColor: data.types[0].type.name === 'grass' ? '#7CFC00' : data.types[0].type.name === 'fire' ? '#FF4500' : data.types[0].type.name === 'water' ? '#00BFFF' : data.types[0].type.name === 'bug' ? '#F0E68C' : data.types[0].type.name === 'normal' ? '#F5F5DC' : data.types[0].type.name === 'poison' ? '#EE82EE' : data.types[0].type.name === 'electric' ? '#FFFF00' : data.types[0].type.name === 'ground' ? '#D2B48C' : data.types[0].type.name === 'fairy' ? '#FFB6C1' : data.types[0].type.name === 'fighting' ? '#B22222' : data.types[0].type.name === 'psychic' ? '#FF1493' : data.types[0].type.name === 'rock' ? '#BDB76B' : data.types[0].type.name === 'ghost' ? '#4B0082' : data.types[0].type.name === 'ice' ? '#00FFFF' : data.types[0].type.name === 'dragon' ? '#FFD700' : data.types[0].type.name === 'dark' ? '#A9A9A9' : data.types[0].type.name === 'steel' ? '#D3D3D3' : data.types[0].type.name === 'flying' ? '#87CEEB' : '#fff',
							color: '#fff',
							marginTop: 10,
							width: '100%',
							textAlign: 'center',

						}}
					/>


				</Card>
			)
			}

		</>

	)
}


