import { AutoComplete, Input } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const PokemonSearch: React.FC = () => {
	const [value, setValue] = useState('');
	const [options, setOptions] = useState<{ value: string, key: string }[]>([]);

	const { isLoading, error, data }: any = useQuery(
		['pokemons'],
		() =>
			fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`).then(
				(res) => res.json()
			),
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (data) {
			setOptions(
				data.results.map((pokemon: any, index: number) => ({
					key: pokemon.name,
					value: pokemon.name,
				}))
			);
		}
	}, [data]);

	const onSearch = (searchText: string) => {
		if (searchText === '') {
			setOptions(
				data.results.map((pokemon: any, index: number) => ({
					key: pokemon.name,
					value: pokemon.name,
				}))
			);
		} else {
			setOptions(
				data.results
					.map((pokemon: any, index: number) => ({
						key: pokemon.name,
						value: pokemon.name,
					}))
					.filter((pokemon: any) => pokemon.key.includes(searchText))
			);
		}
		if (options.length === 0) {
			setOptions([
				{
					key: 'No Result',
					value: 'No Result',
				},
			]);
		}
	};

	const onSelect = (data: any) => {
		setValue(data);
	};

	return (
		<AutoComplete
			options={options}
			style={{
				width: '100%',
			}}
			onSearch={onSearch}
			onSelect={onSelect}
			value={value}
		>
			<Input.Search size='large' placeholder='Search...' />
		</AutoComplete>
	);
};

export default PokemonSearch;