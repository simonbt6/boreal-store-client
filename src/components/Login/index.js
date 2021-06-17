import 'react-bootstrap';
import React, { Component, useState } from 'react';
import './Login.css';
import propTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { Alert } from 'react-bootstrap';
import bootstrap from 'bootstrap';

async function loginUser(credentials){
    return fetch('http://149.28.37.80/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                email: credentials.email,
                password: credentials.password + ""
            }
        })
    })
        .then(data => data.json());
}

async function registerUser(credentials){
    console.log(credentials);
    return fetch('http://149.28.37.80/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user":{
                "firstname": credentials.rFirstname,
                "lastname": credentials.rLastname,
                "email": credentials.rEmail,
                "password": CryptoJS.SHA3(credentials.rPassword)+""
            }
        })
    });
}

export default function Login({setToken}){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [rFirstname, rSetFirstname] = useState();
    const [rLastname, rSetLastname] = useState();
    const [rEmail, rSetEmail] = useState();
    const [rPassword, rSetPassword] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        if(token.error !== undefined){
            return document.getElementById('register-popup').style.display = 'block';
        }
        setToken(token);
    }

    const register = async (e) => {
        e.preventDefault();
        const response = await registerUser({
            rFirstname,
            rLastname,
            rEmail,
            rPassword 
        });
        if(response.status == 200){
            //document.getElementById('register-popup').style.display = 'block';
            window.location.href = '/';
            
        };
    }
    return (
        <div className="background-blue">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"/>
            <div id="register-popup" className="popup">
                <Alert variant="success" role="alert" >
                    You successfuly registered. Please now login to proceed.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </Alert>
            </div>
            <div id="login-popup" className="popup">
                <Alert variant="danger" >
                    Wrong username or password.
                    <p><a href="#">Lost your username or password?</a></p> 
                </Alert>
            </div>
            <div className="container">
                
                <div className="head-title">
                    <h1>BOREAL</h1>
                    <p>Find the deal you are looking for.</p>
                </div>
                <Router>
                    
                    <Switch>
                        <Route path="/register">
                            <div className="register-wrapper">
                                <form onSubmit={register}>
                                    <label>
                                        <p>Firstname</p>
                                        <input className="formInput" type="text" onChange={e => rSetFirstname(e.target.value)} required/>
                                    </label>
                                    <br/>
                                    <label>
                                        <p>Lastname</p>
                                        <input className="formInput" type="text" onChange={e => rSetLastname(e.target.value)} required/>
                                    </label>
                                    <br/>
                                    <label>
                                        <p>Email</p>
                                        <input className="formInput" type="text" onChange={e =>rSetEmail(e.target.value)} required/>
                                    </label>
                                    <br/>
                                    <label>
                                        <p>Password</p>
                                        <input className="formInput" type="password" onChange={e =>rSetPassword(e.target.value) + ""} required/>
                                    </label>
                                    <div className="submitContainer">
                                        <button className="btn submitBtn">Register</button>
                                        <hr/>
                                        <Link to="/">Already have an account?</Link>
                                    </div>
                                </form>
                            </div>
                        </Route>
                        <Route path="*">
                            <div className="login-wrapper">
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        <p>Email</p>
                                        <input className="formInput" type="text" onChange={e => setEmail(e.target.value)} required/>
                                    </label>
                                    <br/>
                                    <label>
                                        <p>Password</p>
                                        <input className="formInput" type="password" autoComplete="None" onChange={e => setPassword(e.target.value)} required/>
                                    </label>
                                    <div className="submitContainer">
                                        <button className="btn submitBtn" type="submit">Login</button>
                                        <hr/>
                                        <Link to="/register">Don't have an account yet?</Link>
                                    </div>
                                </form>
                            </div>
                        </Route>
                    </Switch>
                    
                    
                </Router>
                
            </div>
            
        </div>
    );
}

Login.propTypes = {
    setToken: propTypes.func.isRequired
};