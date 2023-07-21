"use client";
import { getByRole, getByTestId, render } from "@testing-library/react";

import SignUp from "@/app/signup/page";

describe("Signup", () => {
  it("Renders the sign up form", () => {
    render(<SignUp />);
  });
});
