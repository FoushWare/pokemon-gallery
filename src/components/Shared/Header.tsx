import { useNavigate } from "react-router-dom"
import PokemonSearch from "./PokemonSearch";

/**
 * 
 * @returns component with navbar and search bar
 */
export default function Header() {
	const navigator = useNavigate();
	return (
		// navbar with logo and title and search bar 
		<>
			<nav className='navbar'>
				<div className='container'>
					<div className="nav-wrapper">
						{/* logo */}
						<div className="navbar-brand"
							onClick={() => { navigator('/') }}
						>
							<img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
							<h6>Pokemon gallery</h6>
						</div>
						{/* make the search small and in the right  */}
						<div className="search">
							<PokemonSearch />
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
