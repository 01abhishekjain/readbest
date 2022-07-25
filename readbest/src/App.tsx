import React, { useEffect, useState } from 'react';
import './reset.css';
import './App.css';
import './hero.css';

import { initializeApp, getApp } from 'firebase/app';
import {
	getFunctions,
	httpsCallable,
	connectFunctionsEmulator,
} from 'firebase/functions';

import utils from './utils';

// Initialize Firebase
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
const app = initializeApp(firebaseConfig);
console.log(app.name);

function Main() {
	const url = window.location.pathname;
	const [article, setArticle] = useState<Article>();

	useEffect(() => {
		fetchReadableArticle(url).then((article) => {
			setArticle(article);
			document.title = article.title;
			utils.setFavicon(document, article.faviconUrl);
		});
	}, [url]);

	if (article) {
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
							__html: article?.content || 'Loading page...',
						}}
					/>
				</div>
			</div>
		);
	} else {
		return (
			<div className="hero">
				<div className="hero__container">
					<div className="hero__domain">
						<span className="hero__domain--fake">/https://n.pr/3J4EpSn</span>
						<a
							href="https://read.best/https://n.pr/3J4EpSn"
							target="_blank"
							rel="noreferrer"
							className="hero__domain--host"
						>
							read.best
						</a>
						<a
							href="https://read.best/https://n.pr/3J4EpSn"
							target="_blank"
							rel="noreferrer"
							className="hero__domain--path"
						>
							/https://n.pr/3J4EpSn
						</a>
					</div>
					<div className="hero__title">
						The <span>best</span> way to <span>read</span> the web{' '}
						<span>!</span>
					</div>
					<div className="hero__subtitle">
						Simply{' '}
						<span
							onMouseOver={function () {
								const elem = document.querySelector('.hero__domain');
								elem?.classList.add('link');
							}}
							onMouseOut={function () {
								const elem = document.querySelector('.hero__domain');
								elem?.classList.remove('link');
							}}
						>
							prepend
						</span>{' '}
						this domain to any web link to get the best reading experience.
					</div>
				</div>
			</div>
		);
	}
}

async function fetchReadableArticle(url: String): Promise<Article> {
	const functions = getFunctions(getApp());
	if (window.location.host === 'localhost') {
		connectFunctionsEmulator(functions, 'localhost', 5001);
	}

	const readable = httpsCallable<{}, Article>(functions, 'readable');
	const result = await readable({ text: url });
	return result.data;
}
interface Article {
	byline: string;
	content: string;
	excerpt: string;
	siteName: string;
	textContent: string;
	title: string;
	faviconUrl: string;
}

export default Main;
