import { signupAPI } from "@/app/api/endpoints";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const SignUpForm = () => {
  const [firstName, setFirst] = useState<string>("");
  const [lastName, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [birthday, setBirthday] = useState<any>();
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
        // birthday,
      }),
    };
    if (password === confPassword) {
      await fetch(signupAPI, opts)
        .then((res) => res.json())
        .then((data) => {
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
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      setErrors([{ msg: "Passwords do not match." }]);
    }
  };

  return (
    <form
      className="px-8 text-white flex flex-col gap-2 mt-4"
      onSubmit={(e) => handleSignup(e)}
    >
      <label className="flex flex-col">
        <span className="self-start text-green">First Name</span>
        <input
          required
          type="text"
          className={validFirst ? "valid" : ""}
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
          className={`text-white h-10 px-4 ${validEmail ? "valid" : "invalid"}`}
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
            <span className="text-xs text-red">minimum 8 characters</span>
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
        <span className="self-start text-green">
          Confirm Password{" "}
          {password === confPassword ? (
            " "
          ) : (
            <span className="text-xs text-red">passwords must match</span>
          )}
        </span>

        <input
          required
          type="password"
          autoComplete="new-password"
          className={validConf ? "valid" : "invalid"}
          onChange={(e) => {
            setConfirmed(e.target.value);
            setValidConf(password === e.target.value);
          }}
        />
      </label>
      {/* <label className="flex flex-col">
          <span className="self-start text-green">Birthday</span>
          <input type="date" onChange={(e) => setBirthday(e.target.value)} />
        </label> */}
      {errors &&
        errors.map((err, i) => (
          <p key={i} className="text-red">
            {err.msg}
          </p>
        ))}
      <button
        type="submit"
        className="text-2xl text-center text-black bg-green rounded-2xl font-medium py-2 mt-6 w-full"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
