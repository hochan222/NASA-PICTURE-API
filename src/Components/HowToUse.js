import React from 'react';

const HowToUse = props => {
	return (
		<React.Fragment>
			<div className="alert alert-primary" role="alert">
  				<h6>A simple NASA picture search—check it out!</h6>
				<p style={{textAlign: "center"}}>How To Search</p>
				<p style={{textAlign: "center"}}>=============: Search Example :=============</p>
				<p>> New york</p>
				<p>> center: GSFC</p>
				<p>> photographer: James Bilbrey, Joe Kuner</p>
				<p>> star, center: GSFC, year_start: 1999</p>
				<p>Search Keywords: ( center, description, description_508, keywords, locations, media_type, nasa_id, page, photographer, secondary_creator, title, year_start, year_end )</p>
				<p>** Be sure to add :(colon) after the Search Keyword **</p>
			</div>
		</React.Fragment>
	);
}

export default HowToUse;