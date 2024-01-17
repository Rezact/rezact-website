import { logIn, logOut, userState } from "src/lib/userState";
import { Btn } from "./Buttons";

export function UserState() {
  const { $isLoggedIn } = userState;

  return (
    <div class="m-4 rounded-lg bg-slate-300 p-8 drop-shadow-2xl">
      {$isLoggedIn ? <UserProfile /> : <LoginForm />}
    </div>
  );
}

function UserProfile() {
  const { $userName, $email } = userState;

  return (
    <div>
      <p>
        Welcome, {$userName} {$email}
      </p>
      <Btn onClick={logOut}>Logout</Btn>
    </div>
  );
}

function LoginForm() {
  const cls = "rounded p-2 m-2";
  return (
    <form onSubmit={logIn} class="flex flex-col">
      <input type="text" name="username" placeholder="User Name" class={cls} />
      <input type="text" name="email" placeholder="Email" class={cls} />
      <Btn type="submit" class="m-2" size="xl">
        Login
      </Btn>
    </form>
  );
}
