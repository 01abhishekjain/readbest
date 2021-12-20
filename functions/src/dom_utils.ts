const domUtils = {
	setNewTabForLinks(document: Document) {
		document
			.querySelectorAll<HTMLAnchorElement>('a:not([href^="#"])')
			.forEach((link) => link.target = '_blank');
	},
	setHostForAnchorLinks(document: Document) {
		document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
			link.href = 'about:srcdoc' + link.hash;
		});
	},
	setImageCaptionIdentifiers(document: Document) {
		document.querySelectorAll<HTMLImageElement>('img').forEach((img) => {

			if (img.parentElement) {
				img.parentElement.id = 'image-container';
				if (img.parentElement.nextSibling instanceof HTMLElement) img.parentElement.nextSibling.id = 'image-caption';
			}
		});
	},
};

export default { domUtils };

// (method) NodeListOf<Element>.forEach(callbackfn: (value: Element, key: number, parent: NodeListOf<Element>) => void, thisArg?: any): void
// 