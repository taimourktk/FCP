const cookieParser = (cookie) => {
    let cookiesArr = cookie.split(';');
    let cookies = {};

    cookiesArr.forEach(cookie => {
        let kv = cookie.split('=');
        cookies[kv[0].trim()] = kv[1];
    })

    return cookies;

}

export default cookieParser;