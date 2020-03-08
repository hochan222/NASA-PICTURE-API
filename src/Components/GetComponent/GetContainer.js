import React from 'react';
import Error from '../Lib/Error';
import axios from '../../Api/axios';
import Spinner from '../Lib/Spinner';
import GetQueries from './GetQueries';
import GetPrePresenter from './GetPrePresenter';

class GetContainer extends React.Component {
	state = { 
		NasaData: [], 
		loading: true, 
		totalHits: 0, 
		message: "", 
		searchState: {
			text: 'star',
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
		} 
	};

	componentDidMount() {
		const _this = this;
		let message = "";
		
		this.setState({ loading: true }, () => {
			new Promise(function (resolve, reject) {
				const response = axios.get('/search', {
					params: {
						q: _this.state.searchState.text
					}
				});
				if (response) {
					resolve(response);	
				}
				reject(new Error("Request is failed"));
			})
			.then(function (res) {
				_this.setState({ 
					loading: false, 
					NasaData: res.data.collection.items, 
					totalHits: res.data.collection.metadata.total_hits, 
					message: "" 
				});
			})
			.catch(function (err) {
				if (err.response) {
					switch (err.response.status) {
						case 400:
							message = "The request was unacceptable, often due to missing a required parameter.";
							break;
						case 404:
							message = "The requested resource doesn’t exist.";
							break;
						case 500:
						case 502:
						case 503:
						case 504:
							message = "Server Errors";
							break;
						default:
							message = "Call developers to Check axios status error";
					}
				} else if (err.request) {
					message = "App Error";
				} else {
					message = "Unknown Error";
				}
				_this.setState({ 
					loading: true, 
					NasaData: null, 
					totalHits: 0, 
					message: message 
				});
			})
		})
	}

	onSearchSubmit = async searchState => {
		const _this = this;
		let message = "";

		this.setState({ searchState: searchState });
		this.setState({ loading: true }, () => {
			axios
				.get('/search', {
					params: {
						q: searchState.text,
						center: searchState.center,
						description: searchState.description,
						description_508: searchState.description_508,
						keywords: searchState.keywords,
						locations: searchState.locations,
						media_type: searchState.media_type,
						nasa_id: searchState.nasa_id,
						page: searchState.page,
						photographer: searchState.photographer,
						secondary_creator: searchState.secondary_creator,
						title: searchState.title,
						year_start: searchState.year_start,
						year_end: searchState.year_end
					}
				})
				.then(function (res) {
					_this.setState({ 
						loading: false, 
						NasaData: res.data.collection.items, 
						totalHits: res.data.collection.metadata.total_hits, 
						message: "" 
					});
				})
				.catch(function (err) {
					if (err.response) {
						switch (err.response.status) {
							case 400:
								message = "The request was unacceptable, often due to missing a required parameter.";
								break;
							case 404:
								message = "The requested resource doesn’t exist.";
								break;
							case 500:
							case 502:
							case 503:
							case 504:
								message = "Server Errors";
								break;
							default:
								message = "Call developers to Check axios status error";
						}
					} else if (err.request) {
						message = "App Error";
					} else {
						message = "Unknown Error";
					}
					_this.setState({ 
						loading: true, 
						NasaData: null, 
						totalHits: 0, 
						message: message 
					});
				})
		})
	}
	
	render() {
		let componentStatus;
		
		if (this.state.message) {
			componentStatus = <Error message={ this.state.message }/>;
		} else if (this.state.loading) {
			componentStatus = <Spinner/>;
		} else {
			componentStatus = <GetPrePresenter 
								  NasaData= { this.state.NasaData } 
								  searchState={ this.state.searchState }
							  />;
		}
		return (
			<React.Fragment>
				<GetQueries onSubmit={this.onSearchSubmit}/>
				<div className="container">
					{ 
						this.state.loading ? 
						"" : 
						<h6>
							Total Posts: { 
								this.state.totalHits 
							}
						</h6> 
					}
					<div className="justify-content-md-center row  row-cols-md-3 row-cols-xl-4">
						{ componentStatus }
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default GetContainer;