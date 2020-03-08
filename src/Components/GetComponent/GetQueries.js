import React from 'react';

class GetQueries extends React.Component {
	state = { text: '' };

	onFormSubmit = e => {
		let searchState = { 
			text: undefined, 
			center: undefined, 
			description: undefined, 
			description_508: undefined, 
			keywords: undefined,
			location: undefined,
			media_type: undefined,
			nasa_id: undefined,
			page: undefined,
			photographer: undefined,
			secondary_creator: undefined,
			title: undefined,
			year_start: undefined,
			year_end: undefined
		};
		
		e.preventDefault();
		this.state.text.split(',').map(data => {
			data = data.trim();
			if (/^center:/.exec(data)) {
				searchState.center = data.split(':')[1].trim();
			} else if (/^description:/.exec(data)) {
				searchState.description = data.split(':')[1].trim();
			} else if (/^description_508:/.exec(data)) {
				searchState.description_508 = data.split(':')[1].trim();
			} else if (/^keywords:/.exec(data)) {
				searchState.keywords = data.split(':')[1].trim();
			} else if (/^location:/.exec(data)) {
				searchState.location = data.split(':')[1].trim();
			} else if (/^media_type:/.exec(data)) {
				searchState.media_type = data.split(':')[1].trim();
			} else if (/^nasa_id:/.exec(data)) {
				searchState.nasa_id = data.split(':')[1].trim();
			} else if (/^page:/.exec(data)) {
				searchState.page = data.split(':')[1].trim();
			} else if (/^photographer:/.exec(data)) {
				searchState.photographer = data.split(':')[1].trim();
			} else if (/^secondary_creator:/.exec(data)) {
				searchState.secondary_creator = data.split(':')[1].trim();
			} else if (/^title:/.exec(data)) {
				searchState.title = data.split(':')[1].trim();
			} else if (/^year_start:/.exec(data)) {
				searchState.year_start = data.split(':')[1].trim();
			} else if (/^year_end:/.exec(data)) {
				searchState.year_end = data.split(':')[1].trim();
			} else {
				searchState.text = data;
			}
			return (0);
		}) 
		this.props.onSubmit(searchState);
	}
	
	render(){
		return (
			<React.Fragment>
				<form onSubmit={this.onFormSubmit}>
					<div className="form-group mx-sm-3 mb-2">
						<input
							type="text"
							className="form-control"
							value={this.state.text}
							onChange={(e) => {
								this.setState({
									text: e.target.value
								})
							}}
						/>
						<br/>
						<button type="submit" className="btn btn-primary btn-block">검색</button>
					</div>
				</form>
			</React.Fragment>
		)
	};
}

export default GetQueries;