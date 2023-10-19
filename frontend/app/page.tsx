/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Logo from "./utils/assets/Logo";
import Image from "next/image";
import heroImage from "../public/assets/hero_image.jpg";
import { useEffect, useState } from "react";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col justify-between gap-10 md:flex-row p-10 lg:px-40">
        <HeroIntro />
        <HeroImage />
      </div>
      <div className="bg-[#0e1614] py-10">
        <p className="text-center text-softWhite text-xl md:text-2xl font-open">
          Your journey on{" "}
          <span className="text-accent font-ubuntu-500">fitTrakr</span> starts
          now
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-between p-10 lg:px-40">
          <div className="hover:bg-black/60 text-white rounded-md border border-accent/10 basis-full p-4">
            <p>
              Transform your personal fitness journey into an opportunity for{" "}
              <span className="text-accent font-ubuntu-500">connecting</span>{" "}
              with like-minded people from anywhere accross the globe.
            </p>
          </div>
          <div className="hover:bg-black/60 text-white rounded-md border border-accent/10 basis-full p-4">
            <p>
              Record your journey. You will always be able to look back and see
              the <span className="text-accent font-ubuntu-500">progress</span>{" "}
              made along the way, with pictures or status updates.
            </p>
          </div>
          <div className="hover:bg-black/60 text-white rounded-md border border-accent/10 basis-full p-4">
            <p>
              Be a direct part of a motivating community and engage with fitness
              lovers by commenting and liking posts. Become an{" "}
              <span className="text-accent font-ubuntu-500">inspiration</span>{" "}
              for others today!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const HeroImage = () => {
  return (
    <div className="relative">
      <Image
        src={heroImage}
        alt="man in black shorts and black shoes carrying black dumbbell"
        className="rounded-3xl max-w-[500px] w-full"
        height={800}
      />
      <div className="absolute top-[10%] left-[20%] bg-black/90 text-accent border border-accent/10 py-2 px-8 text-xl font-ubuntu-500 rounded-2xl hover:bg-black hover:cursor-pointer">
        Track
      </div>
      <div className="absolute top-[50%] left-[60%] bg-black/90 text-accent border border-accent/10 py-2 px-8 text-xl font-ubuntu-500 rounded-2xl hover:bg-black hover:cursor-pointer">
        Share
      </div>
      <div className="absolute top-[70%] left-[35%] bg-black/90 text-accent border border-accent/10 py-2 px-8 text-xl font-ubuntu-500 rounded-2xl hover:bg-black hover:cursor-pointer">
        Motivate
      </div>
    </div>
  );
};

const HeroIntro = () => {
  return (
    <div className="flex flex-col items-start md:w-1/2">
      <Logo />
      <div className="text-2xl md:text-4xl lg:text-6xl font-ubuntu-500 text-white mt-10">
        Track your fitness milestones.
      </div>
      <div className="text-2xl md:text-4xl lg:text-6xl font-ubuntu-500 text-white">
        Inspire the world.
      </div>
      <p className="text-softWhite text-xl w-3/4 mt-6">
        Connect with other fitness enthusiasts, share and track your workouts,
        keep getting stronger and more motivated together.
      </p>
      <a
        className="text-black bg-accent py-2 px-8 text-2xl font-ubuntu-500 rounded-2xl mt-6 hover:bg-secondary"
        href="/signup"
      >
        Get started
      </a>
      <div className="text-softWhite mt-2">
        Already have an account?{" "}
        <a className="text-accent hover:text-secondary" href="/login">
          Sign in.
        </a>
      </div>
    </div>
  );
};

const Footer = () => {
  const [year, setYear] = useState(Number);
  useEffect(() => {
    let newDate = new Date();
    setYear(newDate.getFullYear());
  }, []);
  return (
    <footer className="py-2 md:px-20">
      <p className="text-center">
        {" "}
        © {year}. Made with 🧡 by{" "}
        <a
          href="https://github.com/JanaIsCoding"
          className="hover:text-secondary"
        >
          JanaIsCoding
        </a>
        .
      </p>
    </footer>
  );
};

export default Home;
