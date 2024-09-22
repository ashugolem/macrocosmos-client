const initialValue = {
    isLoggedIn: false,
    username: '',
    role: '',
    loading: false
};


const setLog = (state = initialValue, action) => {
    switch (action.type) {
        case "LOGGEDIN": {
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        }
        case "USERNAME": {
            return {
                ...state,
                username: action.payload,
            };
        }
        case "ROLE": {
            return {
                ...state,
                role: action.payload,
            };
        }
        case "LOADING": {
            return {
                ...state,
                loading: action.payload,
            };
        }

        default: return state;
    }
}

export default setLog; 