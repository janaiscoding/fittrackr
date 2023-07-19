"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { signupAPI } from "../utils/api/endpoints";
import FormGroup from "../components/FormGroup";
import { useRouter } from "next/navigation";
import { getJwtToken, removeJwtToken } from "../utils/auth_handler";

const SignUp = () => {
  const [firstName, setFirst] = useState<string>("");
  const [lastName, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfirmed] = useState<string>("");

  const [errors, setErrors] = useState<{ msg: string }[]>([]);

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
        conf_password: confPassword,
      }),
    };
    await fetch(signupAPI, opts)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // express-validator errors -- COMPLETE
        if (data.errors) {
          setErrors(data.errors);
        }
        // success or DB error -- COMPLETE
        if (data.message) {
          if (data.message.includes("success")) {
            router.push("/login");
          } else {
            setErrors([{ msg: data.message }]);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = getJwtToken();
    // When manually pathing to /signup
    if (token) {
      // Cleanup token so /login redirect is successful
      removeJwtToken();
    }
  }, []);

  return (
    <div>
      <p>create a new account</p>
      {errors && errors.map((err, i) => <p key={i}>{err.msg}</p>)}
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
