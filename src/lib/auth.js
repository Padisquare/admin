const isAuthenticated = (request) => {
  if (request.cookies.get('token')) {
    return true;
  } 
  return false;
}

export default isAuthenticated;