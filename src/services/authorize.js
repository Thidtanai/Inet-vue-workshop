export const authenticate = (response, next) => {
  if (window !== "undefined") {
    localStorage.setItem("Token", response.token);
    localStorage.setItem("Id", response.id);
    localStorage.setItem("Username", response.username);
    localStorage.setItem("Role", response.role);
  }
  next();
};

export const logout = (next) => {
  if (window !== "undefined") {
    localStorage.clear();
  }
  next();
};
