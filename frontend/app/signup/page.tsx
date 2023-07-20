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

  const [validFirst, setValidFirst] = useState<boolean | undefined>(undefined);
  const [validLast, setValidLast] = useState<boolean | undefined>(undefined);
  const [validEmail, setEmailValid] = useState<boolean | undefined>(undefined);
  const [validPW, setValidPW] = useState<boolean | null>(null);
  const [validConf, setValidConf] = useState<boolean | null>(null);

  const [errors, setErrors] = useState<{ msg: string }[]>([]);

  const emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const pwPattern = new RegExp(/^.{8,}$/g);
  const namePattern = new RegExp(/.{2,}/g);

  const router = useRouter();
  const handleSignup = async (e: SyntheticEvent) => {
    e.preventDefault();
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
        console.log(data);
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
    <div className="home-image min-h-screen">
      <div className="overlay min-h-screen py-8 flex flex-col">
        <h1 className="font-bold text-4xl text-green text-center">
          Welcome to <span>urjourney.</span>
        </h1>
        <form
          className="px-8 text-white flex flex-col gap-2 mt-4"
          onSubmit={(e) => handleSignup(e)}
        >
          <label className="flex flex-col">
            <span className="self-start text-green">First Name</span>
            <input
              required
              type="text"
              className={validFirst ? "valid" : "invalid"}
              onChange={(e) => {
                setFirst(e.target.value);
                setValidFirst(namePattern.test(e.target.value));
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="self-start text-green">Last Name</span>
            <input
              required
              type="text"
              className={validLast ? "valid" : ""}
              onChange={(e) => {
                setLast(e.target.value);
                setValidLast(namePattern.test(e.target.value));
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="self-start text-green">Email </span>
            <input
              required
              type="email"
              className={`text-white h-10 px-4 ${
                validEmail ? "valid" : "invalid"
              }`}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailValid(emailPattern.test(e.target.value));
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="self-start text-green">
              Password{" "}
              {!validPW && (
                <span className="text-xs">minimum 8 characters</span>
              )}
            </span>
            <input
              required
              type="password"
              className={`${validPW ? "valid" : "invalid"}`}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidPW(pwPattern.test(e.target.value));
              }}
            />
          </label>
          <label className="flex flex-col">
            <span className="self-start text-green">Confirm Password</span>
            <input
              required
              type="password"
              className={validConf ? "valid" : "invalid"}
              onChange={(e) => {
                setConfirmed(e.target.value);
                setValidConf(password === e.target.value);
              }}
            />
          </label>
          {errors &&
            errors.map((err, i) => (
              <p key={i} className="text-red">
                {err.msg}
              </p>
            ))}
          <button
            type="submit"
            className="text-2xl text-center text-black bg-green rounded-2xl font-medium py-2 w-full"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-grey mt-2">
          Already have an account?{" "}
          <span className="text-green font-bold">
            {" "}
            <a href="/login">Sign in</a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
