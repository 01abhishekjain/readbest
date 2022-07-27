import React, { useEffect, useState } from 'react';

// styles
import './styles/reset.css';
import './styles/App.css';
import './styles/hero.css';

// component
import Hero from './components/hero';

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
	let url = window.location.pathname;
	if (url[0] === '/') url = url.substring(1);

	const [article, setArticle] = useState<Article>();

	useEffect(() => {
		const isValidUrl = utils.isValidHttpUrl(url);
		if (isValidUrl) {
			fetchReadableArticle(url).then((article) => {
				if (!article) return;
				setArticle(article);
				document.title = article.title;
				utils.setFavicon(document, article.faviconUrl);
			});
		}
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
		return <Hero url={utils.isValidHttpUrl(url) && url} />;
	}
}

async function fetchReadableArticle(url: String): Promise<Article> {
	const functions = getFunctions(getApp());
	if (window.location.hostname === 'localhost') {
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
