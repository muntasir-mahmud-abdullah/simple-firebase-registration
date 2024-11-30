import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../../firebase/firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {
    const [success,setSuccess] = useState(false);
    const [loginError,setLoginError] = useState('');
    const emailRef = useRef();
    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);
        setLoginError('');
        setSuccess(false);
        signInWithEmailAndPassword(auth,email,password)
        .then((result)=> {
            console.log(result.user);
            if(result.user.emailVerified){
                setSuccess(true);
            }
            else{
                setLoginError('your email is not verified')
            }
        })
        .catch(error=> {
            console.log("Error:",error.message);
            setLoginError(error.message);

        })
    }
    const handleforgetpassword = () => {
        console.log('get me email address',emailRef.current.value)
        const email = emailRef.current.value;
        if(!email){
            console.log('enter a valid email')
        }
        else{
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('password reset email sent')
            })
        }
    }
    return (
        <div className="card bg-base-100 w-full mx-auto my-4 max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSignIn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input ref={emailRef} type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
            <label onClick={handleforgetpassword} className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        {
            success && <h2 className='text-green-600'>log in is successful!</h2>
        }
        {
            loginError && <p className='text-red-500'>{loginError}</p>
        }
        {
            <p>New to this website ? please <Link to={'/SignUp'}>Sign Up</Link> </p>
        }
      </div>
    );
};

export default Login;