import { auth } from "../App";
import { createUserWithEmailAndPassword } from "firebase/auth";

//signup
export function signUpAuth() {
  const signUpForm = document.querySelector("#signup-form");
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = signUpForm["email"].value;
    const password = signUpForm["password"].value;

    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log(cred);
    });
  });
}
