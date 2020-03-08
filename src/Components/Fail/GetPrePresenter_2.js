import React, { useState, useEffect, useReducer } from 'react';
import axios from '../../Api/axios';
import GetPresenter from './GetPresenter';

const reducer = (state, action) => {
	switch (typeof(action)) {
		case 'undefined':
			return ({...state, page: 1});
		case 'number':
			return ({...state, page: state.page + 1});
		default:
			throw new Error(`${action}`);
	}
}

const nasaReducer = (state, action) => {
	return (action);
}

const listReducer = (state, action) => {
	return ([...state, ...action]);
}

const GetPrePresenter = props => {
	const [listCount, setListCount] = useState(6);
	const [isFetching, setIsFetching] = useState(false);
	const [nasaData, setNasaData] = useReducer(nasaReducer, props.NasaData);
	const [listItems, setListItems] = useReducer(listReducer, nasaData.slice(0, 6));
	const [searchState, setSearchState] = useReducer(reducer, props.searchState);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	useEffect(() => {
		if (!isFetching && listItems.length !== 100) return ;
		fetchMoreListItems();
	}, [isFetching]);
	
	useEffect(
		async () => {
			try {
				const res = await axios
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
					});
				setNasaData(res.data.collection.items);
			} catch (e) {
				setNasaData([]);
			}
		},
		[searchState.page]
	);
	
	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop + 1 <= document.documentElement.offsetHeight)
			return ;
		setIsFetching(true);
	}
	
	function fetchMoreListItems() {
		if (listItems.length % 100 === 0)
		{
			if (searchState.page === undefined)
				setSearchState(searchState.page);
			setSearchState(searchState.page);
			setListCount(0);
			// nextNasaData(searchState);
		}
		console.log(listItems.length);
		setListCount(listCount + 6);
		setListItems(nasaData.slice(listCount, listCount + 6));
		setIsFetching(false);
	}
	
	// async function nextNasaData (searchState) {
	// 	let message = "";
	// 	axios
	// 		.get('/search', {
	// 			params: {
	// 				q: searchState.text,
	// 				center: searchState.center,
	// 				description: searchState.description,
	// 				description_508: searchState.description_508,
	// 				keywords: searchState.keywords,
	// 				locations: searchState.locations,
	// 				media_type: searchState.media_type,
	// 				nasa_id: searchState.nasa_id,
	// 				page: searchState.page,
	// 				photographer: searchState.photographer,
	// 				secondary_creator: searchState.secondary_creator,
	// 				title: searchState.title,
	// 				year_start: searchState.year_start,
	// 				year_end: searchState.year_end
	// 			}
	// 		})
	// 		.then(function (res) {
	// 			if(res.data.collection.items[0].href === nasaData[0].href)
	// 				return ;
	// 			console.log(res.data.collection.items);
	// 			message="";
	// 		})
	// 		.catch(function (err) {
	// 			if (err.response) {
	// 				switch (err.response.status) {
	// 					case 400:
	// 						message = "The request was unacceptable, often due to missing a required parameter.";
	// 						break;
	// 					case 404:
	// 						message = "The requested resource doesn’t exist.";
	// 						break;
	// 					case 500:
	// 					case 502:
	// 					case 503:
	// 					case 504:
	// 						message = "Server Errors";
	// 						break;
	// 					default:
	// 						message = "Call developers to Check axios status error";
	// 				}
	// 			} else if (err.request) {
	// 				message = "App Error";
	// 			} else {
	// 				message = "Unknown Error";
	// 			}
	// 			console.log(err);
	// 			console.log(message);
	// 			setNasaData([]);
	// 		})
	// }
	
	return (
		<React.Fragment>
			{listItems.map((data) => 
				<GetPresenter 
					key={data.data[0].nasa_id}
					NasaData={data}
				/>
			)}
		</React.Fragment>
	);
}

export default GetPrePresenter;