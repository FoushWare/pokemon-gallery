import { Avatar, Badge, Button, Card, Space, Tabs, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import type { TabsProps } from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { Typography, Divider } from 'antd';
import useItems from './useItems';


export default function DetailView() {
	// get pokemon pokemonId from the params of the url
	const { pokemonId } = useParams<{ pokemonId: string }>();
	const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

	// get items from the custom hook
	const { items, data } = useItems(pokemonId);

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
					className='back-button'
				>
					{/* less than sign */}
					<span className='less-than-sign' > &lt; </span> Back
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
											color: '#fff',
											fontSize: '0.8rem',
											fontWeight: 'bold',
											margin: '0px 5px',
											borderRadius: '5px',
											textTransform: 'capitalize'
										}}


									/>

								))}
							</>
						}
					/>
					{/* second section of the card */}
					{/* tab title */}
					<Tabs defaultActiveKey="1" items={items} />

				</Card>

			</div>

		</>
	)
}
