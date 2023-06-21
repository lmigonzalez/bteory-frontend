import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bteory</title>
        <meta name="description" content="Luis Miguel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className=" flex w-full items-center justify-between border-b-2 border-my_grey px-2 pb-3 pt-3">
        <h1 className="ml-4 inline-block text-xl md:text-3xl">Quiz</h1>
        <div className="flex items-center gap-4 text-sm  md:gap-7 md:text-base">
          <Link href={"/home"}>Home</Link>
          <Link href={""} className=" hidden text-black opacity-50 md:block">
            {" "}
            Purchase Subscription
          </Link>
          <select
            name="lang"
            id="lang"
            className="rounded-sm bg-my_grey p-1 px-2 text-white"
          >
            <option value="english">English</option>
          </select>
          <SignedIn>
            {/* Mount the UserButton component */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            {/* Signed out users get sign in button */}
            <SignInButton afterSignInUrl="/home">
              <span className=" cursor-pointer rounded-sm bg-my_green p-1 px-4 text-white">
                Login
              </span>
            </SignInButton>
          </SignedOut>
        </div>
      </header>
      <main className="max-w-6xl min-h-full">
        
        <div className="flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center justify-between gap-14 pr-4 pt-4 sm:flex-row md:items-start">
            <div className="flex flex-col text-xs md:text-base">
              <h1 className="ml-6 self-start text-3xl font-bold text-[#146C94DE] md:text-5xl">
                {" "}
                Unlock the Road
              </h1>
              <h2 className="ml-10 self-start text-xl font-semibold text-[#146C94DE] md:text-3xl">
                Achieve success with us
              </h2>

              <span className=" ml-6 mt-10 self-start border-l-[1px] border-[#1a120b85] pl-2">
                Master theory test and become a skilled driver with ease.
              </span>
              <span className=" ml-6 mt-4 self-start border-l-[1px] border-[#1a120b85] pl-2">
                Join thousands of satisfied learners and pass your theory test
                confidently.
              </span>
              <span className=" ml-6 mt-4 self-start border-l-[1px] border-[#1a120b85] pl-2">
                Empower yourself with knowledge and conquer the driving theory
                test.
              </span>

              <article className=" mb-50 relative ml-4 mt-8 flex flex-col gap-2 self-center rounded-md bg-[#146C94] px-4 py-2 text-[10px] text-white shadow-md shadow-[#146C94]  md:text-base">
                {" "}
                <span className=" self-end font-medium">Unlimited access</span>
                <strong className="text-base md:px-5 md:text-2xl">
                  99 KR ONLY PER MOUNTH
                </strong>
                <span className=" self-start font-medium">
                  No bindings, cancel anytime*
                </span>
                <span className=" absolute bottom-[-1.5rem] left-1/3 rounded-b-md  bg-[#1B9C85] px-2 py-1 shadow-md shadow-[#1B9C85] md:bottom-[-2rem]">
                  Purchase Subscription
                </span>
              </article>
            </div>
            <Image
              src={"/siora-photography-ZslFOaqzERU-unsplash.jpg"}
              alt={"picture"}
              width={1200}
              height={1200}
              className="w-2/3 rounded-md sm:w-1/3"
            />
          </div>
        </div>
      </main>
      <footer className=" w-full flex justify-center items-center gap-2 bg-my_black px-4 py-8 text-sm text-white  mt-auto">
        © 2023 BTeori. All rights reserved. |
        <Link href={""}>Privacy Policy</Link> |
        <Link href={""}>Terms of Service</Link>|
        <Link href={""}>Contact Us</Link>
      </footer>
    </>
  );
};

export default Home;
