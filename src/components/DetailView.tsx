import { Avatar, Badge, Button, Card, Tabs, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import type { TabsProps } from 'antd';


export default function DetailView() {
	// get pokemon pokemonId from the params of the url
	const pokemonId = useParams<{ pokemonId: string }>().pokemonId;
	const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

	const onChange = (key: string) => {
		console.log(key);
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: `Stats`,
			children: `Content of Tab Pane 1`,


		},
		{
			key: '2',
			label: `Moves`,
			children: `Content of Tab Pane 2`,
		},
		{
			key: '3',
			label: `Abilities`,
			children: `Content of Tab Pane 3`,
		},
	];




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
