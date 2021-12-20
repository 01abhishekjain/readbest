import * as functions from "firebase-functions";

const axios = require('axios').default;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import { Readability } from '@mozilla/readability';

import domUtils from './dom_utils';


export const readable = functions.https.onCall((data, context) => {
  functions.logger.info(data, { structuredData: true });
  functions.logger.info(context, { structuredData: true });

  const url = decodeURIComponent("https://en.wikipedia.org/wiki/Portrait_of_a_Lady_on_Fire");

  axios(url)
    .then(async (response: { body: any; }) => {
      const rawHtml = response.body;
      const dirtyDom = new JSDOM(rawHtml);
      const dirtyDocument = dirtyDom.window.document;

      const reader = new Readability(dirtyDocument, {
        keepClasses: false,
        disableJSONLD: true,
      });
      let parsed = reader.parse();

      let content = parsed?.content;
      const cleanDom = new JSDOM(content);
      const cleanDocument = cleanDom.window.document;

      domUtils.domUtils.setNewTabForLinks(cleanDocument);
      domUtils.domUtils.setHostForAnchorLinks(cleanDocument);
      domUtils.domUtils.setImageCaptionIdentifiers(cleanDocument);

      return parsed;
    })
    .catch((err: any) => {
      console.log(err);
    });

  // return { "request_dataxyz": data };
});
