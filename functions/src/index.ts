import * as functions from "firebase-functions";
// import * as cors from "cors";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.set("Access-Control-Allow-Origin", "*");
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const addMessage = functions.https.onCall((data, context) => {
  functions.logger.info(data, {structuredData: true});
  functions.logger.info(context, {structuredData: true});
  return {"request_data": data};
});

// export const fetchArticle = functions.https.onRequest((req, res) => {
//   const options = {
//     origin: "https://read.best",
//   };
//   cors(options)(req, res, () => {
//     res.status(200).send({});
//   });
// });
