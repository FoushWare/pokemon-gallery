// React 
import React from 'react';
// ant design
import { Button, Result } from 'antd';

/**
 *  when the user tries to access a page that does not exist, this component is rendered
 * @returns 		404 page
 */
const NotFoundPage: React.FC = () => (
	<Result
		status="404"
		title="404"
		subTitle="Sorry, the page you visited does not exist."
		extra={<Button type="primary"
			onClick={
				// Go back to the home page 
				() => {
					window.location.href = '/pokemon-gallery/'
				}
			}

		>Back Home</Button>}
	/>
);

export default NotFoundPage;