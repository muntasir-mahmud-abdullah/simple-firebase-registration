import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    console.log(email, password, name, photo, terms);
    if (!terms) {
      setErrorMessage("please accept our terms & conditions");
      return;
    }
    setErrorMessage("");
    setSuccess(false);
    if (password.length < 6) {
      setErrorMessage("password should be at least 6 character");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "password have to be at least one upper, one lower, one special"
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email verification done");
        });
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => console.log("error:", error));
      })
      .catch((error) => {
        console.log("error message", error.message);
        setErrorMessage(error.message);
      });
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        console.log("user profile updated");
      })
      .catch((error) => console.log("error:", error));
  };
  return (
    <div className="card bg-base-100 mx-auto my-4 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold">Sign Up now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="photo URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute top-12 right-2"
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-start">
            <input type="checkbox" name="terms" className="checkbox" />
            <span className="label-text ml-2">
              Accept our terms and conditions
            </span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {errorMessage && (
        <>
          <p className="text-3xl text-red-700">{errorMessage}</p>
        </>
      )}
      {success && <p className="text-green-500">Sign Up is Successfull!</p>}
      {
        <p>
          Already have an account ? please <Link to={"/login"}>Log in</Link>{" "}
        </p>
      }
    </div>
  );
};

export default SignUp;
