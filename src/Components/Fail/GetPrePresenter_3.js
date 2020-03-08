import React, { useState, useEffect, useReducer } from 'react';
import axios from '../../Api/axios';
import GetPresenter from './GetPresenter';

import PropTypes from 'prop-types';

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
	console.log(1, [...state, ...action]);
	return ([...state, ...action]);
}

const listReducer = (state, action) => {
	return ([...state, ...action]);
}

const GetPrePresenter = props => {
	const [listCount, setListCount] = useState(6);
	const [isFetching, setIsFetching] = useState(false);
	const [nasaData, setNasaData] = useReducer(nasaReducer, props.NasaData);
	const [searchState, setSearchState] = useReducer(reducer, props.searchState);
	const [listItems, setListItems] = useReducer(listReducer, nasaData.slice(0, 5));

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);
	
	useEffect(() => {
		if (searchState.page === undefined)
			setSearchState(searchState.page);
		if (listItems.length % 100 === 0)
			setSearchState(searchState.page);
		if (!isFetching && listItems.length !== 100) return ;
		fetchMoreListItems();
	}, [isFetching]);
	
	useEffect(() => {
		let message = '';
		async function fetchData() {
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
				console.log(searchState.page)
				setNasaData(res.data.collection.items);
				console.log(nasaData);
			} catch (err) {
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
				console.log(message);
				setNasaData([]);
			}
		}
		fetchData();
	}, [searchState.page]);
	
	function handleScroll() {
		if (window.innerHeight + document.documentElement.scrollTop + 1 <= document.documentElement.offsetHeight)
			return ;
		setIsFetching(true);
	}
	
	function fetchMoreListItems() {
		if (listItems.length % 100 === 0)
			setSearchState(searchState.page);
		console.log(listItems.length);
		setListCount(listCount + 5);
		setListItems(nasaData.slice(listCount, listCount + 5));
		setIsFetching(false);
	}
	return (
		<React.Fragment>
			{listItems.map((data, i) => 
				<GetPresenter 
					key={data.data[0].nasa_id}
					NasaData={data}
				/>
			)}
		</React.Fragment>
	);
}

GetPrePresenter.propTypes = {
	NasaData: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        data: PropTypes.array,
		links: PropTypes.array
    })).isRequired,
	searchState: PropTypes.shape({
        text: PropTypes.string,
		center: PropTypes.string, 
		description: PropTypes.string, 
		description_508: PropTypes.string, 
		keywords: PropTypes.string,
		location: PropTypes.string,
		media_type: PropTypes.string,
		nasa_id: PropTypes.string,
		page: PropTypes.string,
		photographer: PropTypes.string,
		secondary_creator: PropTypes.string,
		title: PropTypes.string,
		year_start: PropTypes.string,
		year_end: PropTypes.string
    }).isRequired
}

export default GetPrePresenter;