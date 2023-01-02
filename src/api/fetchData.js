import axios from "axios";

export const fetchData = () => {
    return axios
        .get('http://demo7919674.mockable.io')
        .then(res => res.data)
        .catch(error => console.error(error.message))
        ;
};