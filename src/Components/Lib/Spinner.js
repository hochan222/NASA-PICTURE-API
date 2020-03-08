import React from 'react';

class Spinner extends React.Component {
	render () {
		return (
			<React.Fragment>
				<div className="d-flex justify-content-center">
					<div className="spinner-grow text-primary" role="status">
					  <span className="sr-only">Loading...</span>
					</div>
				</div>
			</React.Fragment>
		)
	};
}

export default Spinner;