import React from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp, getApp } from 'firebase/app';
import {
	getFunctions,
	httpsCallable,
	connectFunctionsEmulator,
} from 'firebase/functions';

const firebaseConfig = {
	apiKey: 'AIzaSyBSPRXDQYR4eRRQHHKKJab62taIxh5LVtA',
	authDomain: 'readbest-9b54d.firebaseapp.com',
	databaseURL: 'https://readbest-9b54d-default-rtdb.firebaseio.com',
	projectId: 'readbest-9b54d',
	storageBucket: 'readbest-9b54d.appspot.com',
	messagingSenderId: '443033354296',
	appId: '1:443033354296:web:07acdb75b5a74ad3bd66cd',
	measurementId: 'G-83QWE7E8SN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app.name);

function Main() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload. edit
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button onClick={test}>test</button>
			</header>
		</div>
	);
}

function test() {
	const functions = getFunctions(getApp());
	connectFunctionsEmulator(functions, 'localhost', 5001);

	const readable = httpsCallable(functions, 'readable');
	readable({ text: window.location.pathname }).then((result) => {
		// Read result of the Cloud Function.
		/** @type {any} */
		const data = result.data;
		console.log('data: ', data);
	});
}

export default Main;
