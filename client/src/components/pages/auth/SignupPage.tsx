
import { Link, useNavigate } from "react-router-dom";
import Eye from "../../../icons/Eye";
import Google from "../../../icons/Google";
import PrimaryButton from "../../utils/PrimaryButton";
import Arrow from "../../../icons/Arrow";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { webData } from "../../../data/db";

import { BASE_URL } from '../../../../config.ts'

type SignupInfo = {
  name: string;
  email: string;
  password: string;
};

function SignupPage() {
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    name: '',
    email: '',
    password: ''
  })
  const [isError, setIsError] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })

    console.log(signupInfo)
    setIsError(false);
  }

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      setIsError(true);
      return;
    }

    const url = `${BASE_URL}/auth/signup`

    axios.post(url, signupInfo)
      .then(() => {
        setIsError(false)
        setSignupInfo({
          name: '',
          email: '',
          password: ''
        })
        navigate('/auth/login')
      })
      .catch((err) => {
        console.log(err)
        alert('Unexpected Error, Try Again Later')
        setIsError(false)
      })
  }

  return (
    <div className="h-full w-full rounded-3xl relative bg-neutral-900 p-4 flex gap-x-4 items-center justify-center">

      <div className="h-full w-full rounded-xl flex-1 relative">
        <Link to={'/'} className="absolute top-2 md:top-4 left-4 md:left-8 z-50"><Arrow title="Back to Homepage" customClass="w-6 sm:w-8 md:w-10" /></Link>
        <div
          style={{ backgroundImage: `url(${webData.top[0].imageUrl})` }}
          className="flex-1 h-full w-full rounded-xl bg-no-repeat bg-cover bg-center filter brightness-[.4] xl:brightness-[.6]"
        ></div>
        {/* <div className="absolute top-0 left-0 w-20 h-32 bg-neutral-900"></div> */}
      </div>

      <div className="flex-1 max-w-[600px] z-40 mt-20 xl:mt-4 h-full w-full rounded-xl p-10 md:p-20 absolute xl:relative xl:flex flex-col justify-center">
        <div className="text-3xl md:text-5xl uppercas font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent pb-2 md:pb-6">
          Create an account
        </div>
        <div className="flex w-full text-sm">
          <span className="block font-medium text-gray-600 dark:text-gray-200">
            Already have an account?
          </span>
          <Link to={'/auth/login'} className="hover:brightness-90 pl-1 text-blue-300 cursor-pointer hover:text-blue-400 transition-all duration-500 hover:-translate-y-[2px]">
            login
          </Link>
        </div>


        <form onSubmit={e => handleSignup(e)} action="login" className="gap-y-4 md:gap-y-6 flex flex-col pt-8 md:pt-12">
          {isError ? <span className="text-red-300">All fields are required!</span> : ''}
          <div className="rounded-sm bg-neutral-950 h-12 md:h-14 p-[1px] text-neutral-200 focus-within:text-neutral-900 transition-all duration-500 focus-within:bg-white">
            <input
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full h-full p-4 outline-none bg-transparent"
              type="text"
              name="name"
              autoComplete="name"
              value={signupInfo.name}
            />
          </div>
          <div className="rounded-sm bg-neutral-950 h-12 md:h-14 p-[1px] text-neutral-200 focus-within:text-neutral-900 transition-all duration-500 focus-within:bg-white">
            <input
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-full p-4 outline-none bg-transparent"
              type="email"
              name="email"
              autoComplete="email"
              value={signupInfo.email}
            />
          </div>
          <div className="rounded-sm bg-neutral-950 h-12 md:h-14 p-[1px] text-neutral-200 focus-within:text-neutral-900 transition-all duration-500 focus-within:bg-white flex justify-center items-center pr-4 gap-x-4">
            <input
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-full p-4 outline-none bg-transparent"
              type="password"
              name="password"
              autoComplete="password"
              value={signupInfo.password}
            />
            <Eye />
          </div>

          <div className="flex gap-x-4 text-sm items-center">
            <input type="checkbox" className="w-5 h-5" />
            <div className="flex w-full text-sm">
              <span className="block font-medium text-gray-600 dark:text-gray-200">
                I agree to the
              </span>
              <div className="hover:brightness-90 pl-1 text-blue-300 cursor-pointer hover:text-blue-400 transition-all duration-500 hover:-translate-y-[2px]">
                Terms & Conditions
              </div>
            </div>
          </div>

          <button type="submit">
            <PrimaryButton
              label="Create Account"
              customClass="h-10 md:h-12 flex justify-center items-center m-1"
            />
          </button>
        </form>
        
        <div className="flex items-center justify-between w-full my-4 md:my-8">
          <span className="h-[0.5px] border-b border-gray-500 w-full mx-2"></span>
          <span className="text-xs text-center text-gray-500 text-nowrap dark:text-gray-400">
            or register with
          </span>
          <span className="h-[0.5px] border-b border-gray-500 w-full mx-2"></span>
        </div>

        <div className="w-full">
          <div className="hover:brightness-110 flex items-center justify-center text-gray-400 transition-all duration-500 transform border border-gray-400 rounded-sm hover:bg-gray-200 hover:text-black">
            <Google />
            <span className="pr-4 pl-2 py-3 font-bold text-center">Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
