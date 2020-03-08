import axios from 'axios';

export default axios.create({
	baseURL: 'https://images-api.nasa.gov',
	timeout: 2500
});