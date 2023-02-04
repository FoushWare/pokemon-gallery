import React, { useEffect, useRef, useState } from 'react'

import { AutoComplete, Input } from 'antd'
import { useQuery } from 'react-query';
import { SearchOutlined } from '@ant-design/icons';

export default function Header() {

	// get all pokemons names from the api  one time
	const { isLoading, error, data }: any = useQuery(
		['pokemons']
		, () =>
			fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`).then(
				(res) => res.json()
			),
		{
			keepPreviousData: true,
		}
	)





	const [value, setValue] = useState('');
	const [options, setOptions] = useState<{ value: string }[]>([
	]);


	// bind the options to the search bar from the api  when data is loaded 
	useEffect(() => {
		if (data) {
			setOptions(data.results.map((pokemon: any) => ({
				value:
					// link to the detail view
					<a href={`pokemon/${pokemon.name}`}>{pokemon.name}</a>
			})))
		}
	}
		, [data])




	const onSearch = (searchText: string) => {
		// if the search text is empty, then return the original options
		if (!searchText) {
			setOptions(data.results.map((pokemon: any) => ({ value: pokemon.name })))


		}
		else {
			// if the search text is not empty, then filter the options
			setOptions(options.filter((option) => option.value.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
		}
		// if the is not search match, then return array with no match
		if (options.length === 0) {
			setOptions([{ value: 'No match' }]);
		}

	};

	const onSelect = (data: string) => {
		console.log('onSelect', data);
	};

	const onChange = (data: string) => {
		setValue(data);
	};


	return (

		// navbar with logo and title and search bar 
		<>
			<nav className='navbar'>
				<div className='container'>
					<div className="nav-wrapper">
						{/* logo */}
						<div className="navbar-brand">
							<img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
							<h6>Pokemon gallery</h6>
						</div>
						{/* no list */}
						{/* make the search small and in the right  */}
						<div className="search">
							<AutoComplete
								value={value}
								options={options}
								// make autocomplate full width in small screen
								style={{
									width: '100%', textAlign: 'left',
									background: '#e3756f',
									color: '#eda4a0'

								}}
								onSelect={onSelect}
								onChange={onChange}
								onSearch={onSearch}

							>
								<Input.Search placeholder="Search ..."
								/>
							</AutoComplete>


						</div>

					</div>
				</div>
			</nav>
		</>




	)
}
