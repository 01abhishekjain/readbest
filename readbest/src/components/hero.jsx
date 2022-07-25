function Hero() {
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
					The <span>best</span> way to <span>read</span> the web <span>!</span>
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

export default Hero;
