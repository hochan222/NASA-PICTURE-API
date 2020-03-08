import React from 'react';
import './GetPresenterCss.css';

const GetPresenter = props => {
	return (
		<React.Fragment>
			<div className="card">
				{ 
					props.NasaData.links ? 
					<img 
						className="card-img-top" 
						src={props.NasaData.links[0].href} 
						alt="Preparing"
					/> : 
					"No image"
				}
				<div className="card-body">
					<h5 className="card-title">
						{
							props.NasaData.data[0].title ?
							JSON.stringify(props.NasaData.data[0].title).slice(1,-1) :
							"Unknown"
						}
					</h5>
					<h6>
						{
							props.NasaData.data[0].date_created ?
							JSON.stringify(props.NasaData.data[0].date_created).slice(1, 11) :
							"Unknown"
						}
					</h6>
					<div className="card-text">
						{
							props.NasaData.data[0].description ?
							JSON.stringify(props.NasaData.data[0].description.slice(0,200)+"...") :
							"Unknown"
						}
					</div>
					<a 
						href="."
						className="btn btn-dark btn-sm disabled" 
						tabIndex="-1" 
						role="button" 
						aria-disabled="true"
					>
						center: {
							props.NasaData.data[0].center ?
							JSON.stringify(props.NasaData.data[0].center) :
							"Unknown"
						}
					</a>
					<a 
						href="."
						className="btn btn-dark btn-sm disabled" 
						tabIndex="-1" 
						role="button" 
						aria-disabled="true"
					>
						photographer: {
							props.NasaData.data[0].photographer ?
							JSON.stringify(props.NasaData.data[0].photographer) :
							"Unknown"
						}
					</a>
				</div>
			</div>
		</React.Fragment>
	);
}

export default GetPresenter;