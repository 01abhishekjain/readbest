import React, { useEffect, useState } from 'react';
import './reset.css';
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
	const url = window.location.pathname;
	const [article, setArticle] = useState<Article>();

	useEffect(() => {
		fetchReadableArticle(url).then((article) => {
			setArticle(article);
		});
	}, [url]);

	/* <div
			/> */

	return (
		<div>
			<div className="article-container">
				<h1 className="title">{article?.title}</h1>
				{article?.byline ? (
					<p className="author">
						By <span className="author-name">{article?.byline}</span>
					</p>
				) : (
					''
				)}
				<div
					dangerouslySetInnerHTML={{
						__html: article?.content || 'xxx could not fetch readable article',
					}}
				/>
			</div>
		</div>
	);
}

async function fetchReadableArticle(url: String): Promise<Article> {
	const functions = getFunctions(getApp());
	// connectFunctionsEmulator(functions, 'localhost', 5001);

	const readable = httpsCallable<{}, Article>(functions, 'readable');
	const result = await readable({ text: url });
	const article = result.data;
	console.log(article);
	return article;
}

interface Article {
	byline: string;
	content: string;
	excerpt: string;
	siteName: string;
	textContent: string;
	title: string;
}

export default Main;
