import axios from 'axios';

const service = axios.create({
    baseURL: "http://localhost:5000/auth",
    withCredentials: true
});

export default service;

//SIGNUP
function signup(username, password, campus, course) {
    return service.post('/signup', {username, password, campus, course})
    .then(response => response.data)
}
export {signup}

