import React, { Component } from 'react';
import HowToUse from './Components/HowToUse';
import GetPresenter from './Components/GetComponent';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
    	<React.Fragment>
			<div className="container-fluid">
				<h3 style={{textAlign: "center"}}>NASA 사진 검색 어플리케이션</h3>
			</div>
			<HowToUse/>
			<GetPresenter/>
		</React.Fragment>
    );
  }
}

export default App;
