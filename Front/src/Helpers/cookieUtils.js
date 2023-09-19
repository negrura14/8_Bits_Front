export function userDataFromCookie(cookieString) {
  
  const cookies = cookieString.split(';');
    let userData = null;
  
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'miCookie') {
        userData = JSON.parse(decodeURIComponent(value));
        break;
      }
    }
  
    return userData;
  }