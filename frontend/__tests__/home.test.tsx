import { getByRole, getByTestId, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import IntroCard from "@/app/components/intro_card/IntroCard";
import SignUp from "@/app/signup/page";

describe("Home", () => {
  it("Renders the logo", () => {
    render(<Home />);
    expect(
      getByTestId(document.documentElement, "svg-element")
    ).toBeInTheDocument();
  });

  it("Intro card /signup and /login links are correct", async () => {
    render(<IntroCard />);
    expect(
      getByTestId(document.documentElement, "get-started").getAttribute("href")
    ).toBe("/signup");
    expect(
      getByTestId(document.documentElement, "sign-in").getAttribute("href")
    ).toBe("/login");
  });
});

