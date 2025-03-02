// https://react-hot-toast.com/
import React, { useRef } from "react";
import InputBox from "./InputBox";
import googleIcon from "../assets/google.png";
import { data, Link } from "react-router-dom";
import AnimationWrapper from "./AnimationWrapper";
import { toast } from "react-hot-toast";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const UseAuthForm = ({ type }) => {
  const authForm = useRef();

  const userAuthThroughServer = async (serverRoute, formData) => {
    await axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth${serverRoute}`,
        formData
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authForm.current || !(authForm.current instanceof HTMLFormElement)) {
      console.error("Form reference is invalid");
      return;
    }

    let serverRoute = type === "sign-in" ? "/sign-in" : "/sign-up";

    let form = new FormData(authForm.current);
    let formData = { personal_info: Object.fromEntries(form.entries()) };
    let { fullname, email, password } = formData.personal_info;

    if (fullname && fullname.length < 3) {
      return toast.error("Fullname must be at least 3 letters long");
    }

    if (!email.length) {
      return toast.error("Email is required");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase letter"
      );
    }

    userAuthThroughServer(serverRoute, formData);
  };

  return (
    <>
      <AnimationWrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
          <form ref={authForm} className="w-[80%] max-w-[400px]" id="formElement">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
              {type === "sign-in" ? "Welcome back" : "Join us today"}
            </h1>
            {type !== "sign-in" ? (
              <InputBox
                name="fullname"
                type="text"
                placeholder="Full Name"
                icon="fi-rr-user"
              />
            ) : (
              ""
            )}
            <InputBox
              name="email"
              type="email"
              placeholder="Email"
              icon="fi-rr-envelope"
            />
            <InputBox
              name="password"
              type="password"
              placeholder="Password"
              icon="fi-rr-key"
            />

            <button
              className="btn-dark center mt-14"
              type="submit"
              onClick={handleSubmit}
            >
              {type.replace("-", " ")}
            </button>

            <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
              <hr className="w-1/2 border-black" />
              <p>or</p>
              <hr className="w-1/2 border-black" />
            </div>
            <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
              <img src={googleIcon} alt="google" className="w-5" />
              continue with google
            </button>

            {type === "sign-in" ? (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Don&apos;t have an account ?
                <Link
                  to="/signup"
                  className="underline text-black text-xl ml-1"
                >
                  Join us today
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-dark-grey text-xl text-center">
                Already a member ?
                <Link
                  to="/signin"
                  className="underline text-black text-xl ml-1"
                >
                  Sign in here.
                </Link>
              </p>
            )}
          </form>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default UseAuthForm;
