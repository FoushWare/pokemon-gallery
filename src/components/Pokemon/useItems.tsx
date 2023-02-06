import { Avatar, Badge, Button, Card, Space, Spin, Tabs, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import type { TabsProps } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { Typography, Divider } from 'antd';

// custom Hook for fetching data from API with react query and pagination
// and return the data and the loading state

import { useQuery } from "react-query";


// create a custom hook for fetching data from API with react query and pagination

/**
 * 
 * @param pokemonId  pokemon id from the url
 * @returns  pokemon data and navigation tabs for stats, moves and abilities
 */
const useItems = (pokemonId: string | undefined) => {

	const { Text } = Typography;
	// single pokemon profile  view
	const { data, isLoading, isError } = useQuery(
		['pokemon', pokemonId],
		() => fetchPokemon(pokemonId),
		{
			enabled: !!pokemonId,
		}
	);


	const fetchPokemon = async (pokemonId: string | undefined) => {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
		return res.json();
	};


	const [items, setItems] = useState<TabsProps['items']>([]);

	React.useEffect(() => {
		if (data) {
			// tabs are stats, moves, abilities
			const items: TabsProps['items'] = [
				{
					key: '1',
					label: `Stats`,
					children: (
						<>
							{/* td key and value */}

							{data?.stats.map((stat: any) => (
								<table key={stat.stat.name}
									style={{
										width: '100%',
										// no spacing between the table cells
										borderSpacing: '0px',
										// no spacing between the table cells
										borderCollapse: 'collapse',



									}}>
									<tbody>
										<tr>
											<td style={{ width: '200px', borderRight: '2px solid #000000' }}>
												<Text strong>{stat.stat.name}</Text>
											</td>
											<td>
												<Text strong style={{ padding: '0px 10px' }}>{stat.base_stat}</Text>
											</td>
										</tr>
									</tbody>
								</table>
							))}

						</>
					),
				},
				{
					key: '2',
					label: `Moves`,
					children: (
						<>
							{data?.moves.map((move: any) => (
								// table for moves
								<table key={move.move.name} style={{
									width: '100%',
									// no spacing between the table cells
									borderSpacing: '0px',
									// no spacing between the table cells
									borderCollapse: 'collapse',
								}}>
									<tbody>
										<tr>
											<td style={{ width: '200px', borderRight: '2px solid #000000' }}>
												<Text strong>{move.move.name}</Text>
											</td>
											<td>
												<Text strong style={{ padding: '0px 10px' }}>{move.version_group_details[0].level_learned_at}</Text>
											</td>
										</tr>
									</tbody>
								</table>

							))}
						</>
					),
				},
				{
					key: '3',
					label: `Abilities`,
					children: (
						<>
							{data?.abilities.map((ability: any) => (
								// table for abilities
								<table key={ability.ability.name} style={{
									width: '100%',
									// no spacing between the table cells
									borderSpacing: '0px',
									// no spacing between the table cells
									borderCollapse: 'collapse',
								}}>
									<tbody>
										<tr>
											<td style={{ width: '200px', borderRight: '2px solid #000000' }}>
												<Text strong>{ability.ability.name}</Text>
											</td>
											<td>
												<Text strong style={{ padding: '0px 10px' }}>{ability.is_hidden ? 'Hidden' : 'Not Hidden'}</Text>
											</td>
										</tr>
									</tbody>
								</table>


							))}
						</>
					),
				},
			];


			setItems(items);
		}
	}, [data]);

	// return the items
	return { data, items }


}
export default useItems

