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
};

export default utils;
