import { getFormData } from "@rezact/rezact/formHelper";

export const userState: any = {
  $isLoggedIn: false,
  $userName: "",
  $email: "",
};

export function logIn(ev) {
  ev.preventDefault();
  const userData = getFormData(ev.target);
  userState.$isLoggedIn = true;
  userState.$userName = userData.username;
  userState.$email = userData.email;
}

export function logOut() {
  userState.$isLoggedIn = false;
  userState.$userName = "";
  userState.$email = "";
}
