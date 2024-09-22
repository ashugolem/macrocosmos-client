import { jwtDecode } from 'jwt-decode';

const Decode = () => {
    const authToken = localStorage.getItem('token');

    if (authToken) {
        try {
            const decoded = jwtDecode(authToken);
            return decoded;
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    }
    return null;
};

export default Decode;
