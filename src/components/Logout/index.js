import React from 'react';
import Dashboard from '../Dashboard';

export default function Logout(){
    window.localStorage.clear();
    return <Dashboard />;
}