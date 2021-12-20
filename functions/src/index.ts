import * as functions from "firebase-functions";

// deps
import axiosImport = require("axios")
const axios = axiosImport.default;

import jsdom = require("jsdom");
const {JSDOM} = jsdom;

import {Readability} from "@mozilla/readability";

// own
import domUtils from "./dom_utils";


export const readable = functions.https.onCall((data, context) => {
  functions.logger.info(data, {structuredData: true});
  functions.logger.info(context, {structuredData: true});

  const url = decodeURIComponent("https://www.gsmarena.com/popular_ridehailing_app_bolt_gets_petal_maps_integration-news-52369.php");

  return axios(url)
      .then(async (response: { data: string; }) => {
        const rawHtml = response.data;
        const dirtyDom = new JSDOM(rawHtml);
        const dirtyDocument = dirtyDom.window.document;

        const reader = new Readability(dirtyDocument, {
          keepClasses: false,
          disableJSONLD: true,
        });
        const parsed = reader.parse();

        const content = parsed?.content;
        const cleanDom = new JSDOM(content);
        const cleanDocument = cleanDom.window.document;

        domUtils.domUtils.setNewTabForLinks(cleanDocument);
        domUtils.domUtils.setHostForAnchorLinks(cleanDocument);
        domUtils.domUtils.setImageCaptionIdentifiers(cleanDocument);

        return parsed;
      })
      .catch((err: Error) => {
        console.log(err);
      });

  // return { "request_dataxyz": data };
});
