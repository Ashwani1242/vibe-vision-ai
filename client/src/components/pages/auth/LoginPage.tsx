
import { Link, useNavigate } from "react-router-dom";
import Eye from "../../../icons/Eye";
import Google from "../../../icons/Google";
import PrimaryButton from "../../utils/PrimaryButton";
import Arrow from "../../../icons/Arrow";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { webData } from "../../../data/db";

import { BASE_URL } from '../../../../config.ts'

type LoginInfo = {
  email: string;
  password: string;
};

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: ''
  });
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
    setIsError(false);
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      setIsError(true);
      return;
    }

    const url = `${BASE_URL}/auth/login`

    axios.post(url, loginInfo)
      .then((res) => {
        setIsError(false)
        setLoginInfo({
          email: '',
          password: ''
        })

        // console.log(res.data)

        // const { success, message, jwtToken, name, email } = res.data;
        const { jwtToken, name, email } = res.data;

        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('loggedInUserEmail', email);

        navigate('/gallery')
      })
      .catch((err) => {
        console.log(err)
        alert('Unexpected Error, Try Again Later')
        setIsError(false)
      })
  }

  return (
    <div className="h-full w-full rounded-3xl relative bg-neutral-900 md:p-4 flex gap-x-4 items-center justify-center">
      <div className="flex-1 max-w-[600px] z-40 mt-20 xl:mt-4 h-full w-full rounded-xl p-10 md:p-20 absolute xl:relative xl:flex flex-col justify-center">
        <div className="text-3xl md:text-5xl uppercas font-bold bg-gradient-to-br from-pink-500 via-purple-400 to-blue-300 bg-clip-text text-transparent pb-2 md:pb-6">
          Welcome Back!
        </div>
        <div className="flex w-full text-sm">
          <span className="block font-medium text-gray-600 dark:text-gray-200">
            Don't have an account?
          </span>
          <Link to={'/auth/signup'} className="hover:brightness-90 pl-1 text-blue-300 cursor-pointer hover:text-blue-400 transition-all duration-500 hover:-translate-y-[2px]">
            Sign Up
          </Link>
        </div>
        <form onSubmit={e => handleLogin(e)} action="login" className="gap-y-4 md:gap-y-6 flex flex-col pt-8 md:pt-12">
          {isError ? <span className="text-red-300">All fields are required!</span> : ''}
          <div className="rounded-sm bg-neutral-950 h-12 md:h-14 p-[1px] text-neutral-200 focus-within:text-neutral-900 transition-all duration-500 focus-within:bg-white">
            <input
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-full p-4 outline-none bg-transparent"
              type="email"
              name="email"
              autoComplete="email"
              value={loginInfo.email}
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
              value={loginInfo.password}
            />
            <Eye />
          </div>

          <div className="flex gap-x-4 text-sm items-center">
            <input
              type="checkbox"
              className="w-5 h-5"
            />
            <label> Remember Me </label>
          </div>

          <button type="submit">
            <PrimaryButton
              label="Login"
              customClass="h-10 md:h-12 flex justify-center items-center m-1"
            />
          </button>
        </form>
        
        <div className="flex items-center justify-between w-full my-4 md:my-8">
          <span className="h-[0.5px] border-b border-gray-500 w-full mx-2"></span>
          <span className="text-xs text-center text-gray-500 text-nowrap dark:text-gray-400">
            or login with
          </span>
          <span className="h-[0.5px] border-b border-gray-500 w-full mx-2"></span>
        </div>

        <div className="w-full">
          <div className="hover:brightness-110 flex items-center justify-center text-gray-400 transition-all duration-500 transform border border-gray-400 rounded-sm hover:bg-gray-200 hover:text-black">
            <Google />
            <span className="pr-4 pl-2 py-3 font-bold text-center">
              Google
            </span>
          </div>
        </div>
      </div>

      <div className="h-full w-full rounded-xl md:flex-1 relative">
        <Link to={'/'} className="absolute top-2 md:top-4 left-4 md:left-8 z-50"><Arrow title="Back to Homepage" customClass="w-6 sm:w-8 md:w-10" /></Link>
        <div
          style={{ backgroundImage: `url(${webData.top[1].imageUrl})` }}
          className="flex-1 h-full w-full rounded-xl bg-no-repeat bg-cover bg-center filter brightness-[.4] xl:brightness-[.6]"
        ></div>
        {/* <div className="absolute top-0 left-0 w-20 h-32 bg-neutral-900"></div> */}
      </div>
    </div>
  );
}

export default LoginPage;
