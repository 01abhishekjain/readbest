const domUtils = {
  setNewTabForLinks(document: Document): void {
    document
        .querySelectorAll<HTMLAnchorElement>("a:not([href^=\"#\"])")
        .forEach((link) => link.target = "_blank");
  },
  setHostForAnchorLinks(document: Document):void {
    const pattern = "a[href^=\"#\"]";
    document.querySelectorAll<HTMLAnchorElement>(pattern).forEach((link) => {
      link.href = "about:srcdoc" + link.hash;
    });
  },
  setImageCaptionIdentifiers(document: Document): void {
    document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (img.parentElement) {
        img.parentElement.id = "image-container";
        if (img.parentElement.nextSibling) {
          (img.parentElement.nextSibling as HTMLElement).id = "image-caption";
        }
      }
    });
  },
  convertRelToAbs(document: Document, origin: string): void {
    document.title = "xxx";
    document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (img.src.startsWith("/")) {
        img.setAttribute("src", origin + img.src);
      }
    });
  },
};

export default {domUtils};
