import { Button } from "antd"

// PaginationButton interface
interface PaginationButton {
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	total: number
}
// prevnext btn 
const PaginationButtons: React.FC<PaginationButton> = ({ page, setPage, total }) => {
	return (
		<div className="prevnextbtn">
			<Button
				size='large'
				onClick={() =>
					setPage((old: number) => (old === 0 ? old : old - 6))
				}

				disabled={page === 0}
				style={{
					margin: '0px 10px',
					// if the button is not disabled then show the color else show the grey color
					background: page === 0 ? 'grey' : '#EF5350',
					color: 'white',
					// when hover over the button show the pointer cursor and when it's disabled show the not allowed cursor
					cursor: page === 0 ? 'not-allowed' : 'pointer',
					// make text uppercase
					textTransform: 'uppercase',
					padding: '0px 2rem',

				}}
			>
				Previous
			</Button>
			<Button
				size='large'
				onClick={() =>
					setPage((old: any) => (old + 6 > total ? old : old + 6))
				}
				disabled={page + 6 > total}

				style={{
					margin: '0px 10px',
					// if the button is not disabled then show the color else show the grey color
					background: page + 6 > total ? 'grey' : '#EF5350',
					color: 'white',
					// when hover over the button show the pointer cursor and when it's disabled show the not allowed cursor
					cursor: page + 6 > total ? 'not-allowed' : 'pointer',
					textTransform: 'uppercase',
					padding: '0px 2rem',

				}}
			>
				Next
			</Button>
		</div>
	)

}
export default PaginationButtons;