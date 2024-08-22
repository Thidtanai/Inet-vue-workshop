export const authenticate = (response, next) => {
  if (window !== "undefined") {
    localStorage.setItem("Token", response.token);
    localStorage.setItem("Id", response.id);
    localStorage.setItem("Username", response.username);
    localStorage.setItem("Role", response.role);
  }
  next();
};

export const getToken = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("Token")) {
      return localStorage.getItem("Token");
    } else {
      return false;
    }
  }
};

export const getRole = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("Role")) {
      return localStorage.getItem("Role");
    } else {
      return false;
    }
  }
};

export const logout = (next) => {
  if (window !== "undefined") {
    localStorage.clear();
  }
  next();
};
