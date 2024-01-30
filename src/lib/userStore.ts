export const userStore: any = {
  $isLoggedIn: false,
  $userName: "",
  $email: "",
};

export function logIn(data) {
  userStore.$isLoggedIn = true;
  userStore.$userName = data.username;
  userStore.$email = data.email;
}

export function logOut() {
  userStore.$isLoggedIn = false;
  userStore.$userName = "";
  userStore.$email = "";
}
