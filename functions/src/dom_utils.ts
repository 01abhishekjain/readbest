const domUtils = {
  setNewTabForLinks(document: Document): void {
    document
        .querySelectorAll<HTMLAnchorElement>("a:not([href^=\"#\"])")
        .forEach((link) => link.target = "_blank");
  },
  setHostForAnchorLinks(document: Document):void {
    const pattern = "a[href^=\"#\"]";
    document.querySelectorAll<HTMLAnchorElement>(pattern).forEach((link) => {
      link.href = link.hash;
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
    document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      if (img.src.startsWith("/")) {
        img.setAttribute("src", origin + img.src);
      }
    });
  },
  getFavicon(document: Document): string {
    const nodeList = document.getElementsByTagName("link");
    const node = Array.from(nodeList).find(
        (node) => {
          const identifiers = ["shortcut icon", "icon"];
          const rel = node.getAttribute("rel");
          return rel && identifiers.includes(rel);
        });

    return node?.getAttribute("href") || "";
  },
};

export default {domUtils};
