const IntroCard = () => {
  return (
    <div className="w-11/12 py-6 px-3 mb-4 flex flex-col items-center justify-center bg-black2 rounded-3xl">
      <h1 className="text-3xl text-white text-center font-bold">
        Track your fitness milestones.
      </h1>
      <h1 className="text-3xl text-white text-center font-bold">
        Inspire the world.
      </h1>
      <h5 className="text-grey text-center text-sm py-2">
        Connect with other fitness lovers and keep getting stronger together
      </h5>

      <a
        className="text-2xl text-center text-black bg-green rounded-2xl font-medium py-2 w-full mt-5"
        href="/signup"
        data-testid="get-started"
      >
        Get started
      </a>
      <p className="text-center text-grey mt-2">
        Already have an account?{" "}
        <a href="/login" className="text-green font-bold" data-testid="sign-in">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default IntroCard;
