import React from 'react';
import './signUp.scss';
import RightArrow from './right_arrow.svg';

function SignUp() {
  return (
    <div className="SignUp">
      <div className='SignUp__Container'>
        <div className='SignUp__Container--Title'>Sign Up</div>
        <form action="" className='SignUp__Form'>
          <div className='SignUp__Form__InputBox'>
            <input type="text" id="username" className='SignUp__Form__InputBox--input' autocomplete="off" required />
            <label for="mail" className='SignUp__Form__InputBox--Label'>
              <span className='SignUp__Form__InputBox--Label--name'>Email</span>
            </label>
          </div>
          <div className='SignUp__Form__InputBox'>
            <input type="password" id="password" className='SignUp__Form__InputBox--input' autocomplete="off" required />
            <label for="username" className='SignUp__Form__InputBox--Label'>
              <div className='SignUp__Form__InputBox--Label--name'>Username</div>
            </label>
          </div>
          <div className='SignUp__Form__InputBox'>
            <input type="password" id="password" className='SignUp__Form__InputBox--input' autocomplete="off" required />
            <label for="password" className='SignUp__Form__InputBox--Label'>
              <div className='SignUp__Form__InputBox--Label--name'>Password</div>
            </label>
          </div>
          <div className='SignUp__Form__InputBox'>
            <input type="password" id="password" className='SignUp__Form__InputBox--input' autocomplete="off" required />
            <label for="re-password" className='SignUp__Form__InputBox--Label'>
              <div className='SignUp__Form__InputBox--Label--name'>Repeat Password</div>
            </label>
          </div>
          <button className='SignUp__Form--SignUp'>Sign Up</button>
        </form>
        <div className='SignUp__Container__SignIn'>
          <button className='SignUp__Container__SignIn--Button'>Sign In</button>
          <img src={RightArrow} alt="" className='SignUp__Container__SignIn--RightArrow'/>
        </div>
        </div>
      </div>
  );
}

export default SignUp; 