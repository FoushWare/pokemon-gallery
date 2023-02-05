import { Avatar, Badge, Button, Card, Space, Tabs, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import type { TabsProps } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { Typography, Divider } from 'antd';


export default function DetailView() {
	// get pokemon pokemonId from the params of the url
	const pokemonId = useParams<{ pokemonId: string }>().pokemonId;
	const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
	const { Text } = Typography;

	const onChange = (key: string) => {
		console.log(key);
	};

	// const items: TabsProps['items'] = [
	// 	{
	// 		key: '1',
	// 		label: `Stats`,
	// 		children: `Content of Tab Pane 1`,


	// 	},
	// 	{
	// 		key: '2',
	// 		label: `Moves`,
	// 		children: `Content of Tab Pane 2`,
	// 	},
	// 	{
	// 		key: '3',
	// 		label: `Abilities`,
	// 		children: `Content of Tab Pane 3`,
	// 	},
	// ];




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
								<table key={stat.stat.name} style={{
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





	return (
		<>
			{/*pokemon profile view   */}

			{/* back button to the main view  */}

			<div className='container'>
				<Button
					type="primary"
					onClick={() => {
						window.history.back();
					}}
					size="large"
					style={{ background: '#ef5350', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100px', height: '40px', borderRadius: '5px' }}
				>
					{/* less than sign */}
					<span style={{
						fontSize: '1rem',
						paddingRight: '8px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'

					}} > &lt; </span> Back
				</Button>
				{/* pokemon profile view  */}

				{/* large card with two sections */}
				{/* first section is avatar,title,description */}
				{/* section section is tab title */}

				<Card
					style={{ width: '100%', marginTop: '60px' }}
					activeTabKey={activeTabKey1}
				>
					{/* first section of the card */}
					{/* avatar,title,description */}
					<Meta
						avatar={
							<Avatar
								src={data?.sprites.front_default}
								alt={data?.name}
								size={200}
							/>

						}
						title={<h1>{data?.name} </h1>}
						description={
							// badge for pokemon type
							<>
								{data?.types.map((type: any) => (

									// large badge for pokemon type
									<Badge
										key={type.type.name}
										count={type.type.name}
										style={{
											backgroundColor: '#52c41a',
											fontWeight: 'bold',
											marginRight: '10px',
											padding: '15px 12px',
											fontSize: '1rem',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									/>

								))}
							</>
						}
					/>
					{/* second section of the card */}
					{/* tab title */}
					<Tabs defaultActiveKey="1" items={items} onChange={onChange} />

				</Card>

			</div>

		</>
	)
}
