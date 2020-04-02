
/**
 * @desc sets a cookie for to a desired value
 * @param string name - name of the cookie
 * @param value - whatever value you wish for the cookie to store
 * @param int hours - number of hours before the cookie expires
*/
function setCookie(name, value, hours) {
    var expires;
    console.log("cookie updated: " + name + "  " + value);
    //console.log(name + "    " + value)
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

/**
 * @desc gets the value from a desired cookie
 * @param string name - name of the cookie to get the value from
 * @return value of the desired cookie
*/
function getCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

/**
 * @desc deletes a specified cookie
 * @param string name - name of the cookie to be deleted
*/
function eraseCookie(name) {
    setCookie(name, "", -1);
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    var val = JSON.parse(jsonPayload)
    return val.name;
};