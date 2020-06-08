import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  const value = request.query.name;
  const msg:string = "Hello from Prakash Wagle Bitch! : ".concat(String(value).toUpperCase());
 response.send(msg);
});
