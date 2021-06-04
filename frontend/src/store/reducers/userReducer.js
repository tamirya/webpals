export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case "Is user logged in":
      return localStorage.getItem("user") &&
        localStorage.getItem("access_token")
        ? true
        : false;
    default:
      return state;
  }
};

export const isAdmin = (state = false, action) => {
  switch (action.type) {
    case "Is user admin":
      if (
        localStorage.getItem("user") &&
        localStorage.getItem("access_token")
      ) {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("user:", user);
        if (user && user.role_name === "student") {
          return false;
        } else if (user && user.role_name === "admin") {
          return true;
        }
      }
      return state;
    default:
      return state;
  }
};
