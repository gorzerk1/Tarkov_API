import React from 'react';
import './signIn.scss';

function SignIn() {
  return (
    <div className="SignIn">
      <div className='SignIn__Container'>
        <div className="SignIn__Container--Title">Sign In With</div>
        <div className='SignIn__ButtonBox'>
          <button className="SignIn__ButtonBox--Facebook">
            <img src="../../facebook.png" alt="" />
            <div className="SignIn__ButtonBox--Facebook__content">Facebook</div>
          </button>
          <button className="SignIn__ButtonBox--Google">
            <img src="../../google.png" alt="" />
            <div className="SignIn__ButtonBox--Google__content">Google</div>
          </button>
        </div>
        <form action="" className='SignIn__Form'>
          <div className='SignIn__Form__InputBox'>
            <input type="text" id="username" className='SignIn__Form__InputBox--input' autocomplete="off" required />
            <label for="username" className='SignIn__Form__InputBox--Label'>
              <span className='SignIn__Form__InputBox--Label--name'>Username</span>
            </label>
          </div>
          <div className='SignIn__Form__InputBox'>
            <input type="password" id="password" className='SignIn__Form__InputBox--input' autocomplete="off" required />
            <label for="password" className='SignIn__Form__InputBox--Label'>
              <div className='SignIn__Form__InputBox--Label--name'>Password</div>
            </label>
          </div>
        </form>
        <div className='SignIn__SubmitButton'>
          <button className="SignIn__SubmitButton--button">Sign In</button>
        </div>
        <div className='SignIn__SignUp'>Not a member? <a>Sign up now</a></div>
      </div>
    </div>
  );
}

export default SignIn;
