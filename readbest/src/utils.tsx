const utils = {
	setFavicon(document: Document, url: string) {
		var link = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement('link');
			link.setAttribute('rel', 'icon');
			document.getElementsByTagName('head')[0].appendChild(link);
		}
		link.setAttribute('href', url);
	},
	isValidHttpUrl(str: string) {
		let url: URL;

		try {
			url = new URL(str);
		} catch (_) {
			return false;
		}

		return url.protocol === 'http:' || url.protocol === 'https:';
	},
};

export default utils;
