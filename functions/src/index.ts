import * as functions from "firebase-functions";

// deps
import axiosImport = require("axios")
const axios = axiosImport.default;

import jsdom = require("jsdom");
const {JSDOM} = jsdom;

import {Readability} from "@mozilla/readability";

import domUtils from "./dom_utils";

export const readable = functions.https.onCall((data, context) => {
  const url = new URL(data.text);
  functions.logger.info("Requested: "+url.toString());

  return axios(url.toString())
      .then(async (response: { data: string; }) => {
        functions.logger.info("Url got!");
        const rawHtml = response.data;
        const dirtyDom = new JSDOM(rawHtml, {url: url.toString()});
        const dirtyDocument = dirtyDom.window.document;

        const reader = new Readability(dirtyDocument);
        const parsed = reader.parse();

        const content = parsed?.content;
        const cleanDom = new JSDOM(content);
        const cleanDocument = cleanDom.window.document;

        domUtils.domUtils.setNewTabForLinks(cleanDocument);
        domUtils.domUtils.setImageCaptionIdentifiers(cleanDocument);
        domUtils.domUtils.setHostForAnchorLinks(cleanDocument);
        const faviconUrl = domUtils.domUtils.getFavicon(dirtyDocument);

        if (parsed) {
          parsed.content = cleanDom.serialize();
        }

        return {...parsed, faviconUrl};
      })
      .catch((err: Error) => {
        functions.logger.info("Some error while getting url");
        console.log(err);
      });
});
