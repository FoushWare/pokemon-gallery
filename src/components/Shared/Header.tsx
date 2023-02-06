import React, { useEffect, useState } from 'react'

import { AutoComplete, Input } from 'antd'
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {

	const navigator = useNavigate();

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
	const [options, setOptions] = useState<{ value: string, key: string }[]>([
	]);


	// bind the options to the search bar from the api  when data is loaded 
	useEffect(() => {
		if (data) {
			setOptions(data.results.map((pokemon: any, index: number) => ({
				key: pokemon.name,
				value: pokemon.name


			})))
		}
	}
		, [data])




	const onSearch = (searchText: string) => {
		// if the search text is empty, then return the original options
		if (!searchText) {
			setOptions(data.results.map((pokemon: any) => ({ value: pokemon.name, key: pokemon.name })))
		}
		else {
			// if the search text is not empty, then filter the options
			setOptions(options.filter((option) => option.value.toLowerCase().indexOf(searchText.toLowerCase()) > -1));
		}
		// if the is not search match, then return array with no match
		if (options.length === 0) {
			setOptions([{ value: 'No match', key: 'no match' }]);
		}

	};

	//  onselect function to navigate to the detail view
	const onSelect = (value: string) => {
		console.log('lol', value)
		// navigate to the detail view
		navigator(`/pokemon/${value}`)
	}
	// onChange function to update the value of the search bar
	// const onChange = (value: string) => {
	// 	setValue(value)
	// }




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
								// onChange={onChange}
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
