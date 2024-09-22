export const setLoggedIn = (isLoggedIn) => {
    return {
        type: "LOGGEDIN",
        payload: isLoggedIn
    }
}

export const setRole = (role) => {
    return {
        type: "ROLE",
        payload: role
    }
}

export const setUserName = (username) => {
    return {
        type: "USERNAME",
        payload: username
    }
}
export const setLoading = (loading) => {
    return {
        type: "LOADING",
        payload: loading
    }
}