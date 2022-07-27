import React from 'react';

function Hero({ url }) {
	const appendElemEventAttr = {};
	if (!url) {
		appendElemEventAttr.onMouseOver = function () {
			const elem = document.querySelector('.hero__domain__actual');
			elem?.classList.add('highlight');
		};
		appendElemEventAttr.onMouseOut = function () {
			const elem = document.querySelector('.hero__domain__actual');
			elem?.classList.remove('highlight');
		};
	}

	return (
		<div className={`hero ${url ? 'hero--url' : 'hero--nourl'}`}>
			<div className="hero__container">
				<div className="hero__domain" title="Click to see a sample">
					<a
						href="https://read.best/https://n.pr/3J4EpSn"
						target="_blank"
						rel="noreferrer"
						className="hero__domain__actual"
					>
						<span className="hero__domain__actual--host">read.best</span>
						<span className="hero__domain__actual--path">
							/https://n.pr/3J4EpSn
						</span>
					</a>
				</div>
				<div className="hero__title">
					The <span>best</span> way to <span>read</span> online <span>!</span>
				</div>
				<div className="loading-indicator">
					<span>Loading</span>
					<span>{url}</span>
				</div>
				<div className="hero__subtitle">
					Simply{' '}
					<span {...appendElemEventAttr} title="Try clicking the link above">
						append
					</span>{' '}
					any web link to this domain to get the best reading experience.
				</div>
			</div>
		</div>
	);
}

export default Hero;
