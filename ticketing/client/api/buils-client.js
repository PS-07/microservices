import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // We are on the server
        return axios.create({
            baseURL: 'http://172.17.0.4',
            headers: req.headers
        });
    }
    else {
        return axios.create({
            baseURL: '/'
        });
    }
};