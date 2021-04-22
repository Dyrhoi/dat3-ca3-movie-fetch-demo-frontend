const getInfo = (token) => {
    return parseJwt(token)
}

const hasRole = (user, role) => {
    return user != null ? user.roles.split(",").includes(role) : false
}

function parseJwt(token) {
    if (token == null) {
        return null;
    }
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export { getInfo, hasRole };