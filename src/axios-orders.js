import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://mycrm-187a2.firebaseio.com/'
})

export default instance;