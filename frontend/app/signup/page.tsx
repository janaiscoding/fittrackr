"use client";

import { SyntheticEvent, useState } from "react";
import { signupAPI } from "../utils/api/endpoints";
import FormGroup from "../components/FormGroup";
import { useRouter } from "next/navigation";
const SignUp = () => {
  //required
  const [firstName, setFirst] = useState<string>("");
  const [lastName, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfirmed] = useState<string>("");
  // errors
  const [errors, setErrors] = useState<string[]>([]);

  //
  const router = useRouter();
  const handleSignup = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, confPassword);
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confPassword,
      }),
    };
    await fetch(signupAPI, opts)
      .then((res) => res.json())
      .then((data) => {
        // need to handle all errors

        console.log(data);
        //if successful, redirect to login -- COMPLETE
        if (data.message && data.message.includes("success")) {
          console.log("success");
          router.push("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>create a new account</p>
      <form onSubmit={(e) => handleSignup(e)}>
        <FormGroup
          labelName="First Name*"
          type="string"
          placeholder="John"
          onChangeSet={setFirst}
        />
        <FormGroup
          labelName="Last Name*"
          type="string"
          placeholder="Doe"
          onChangeSet={setLast}
        />
        <FormGroup
          labelName="Email*"
          type="email"
          placeholder="test.mail@mail.com"
          onChangeSet={setEmail}
        />
        <FormGroup
          labelName="Password*"
          type="password"
          placeholder=" "
          onChangeSet={setPassword}
        />
        <FormGroup
          labelName="Confirm Password*"
          type="password"
          placeholder=" "
          onChangeSet={setConfirmed}
        />
        <button className="btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
