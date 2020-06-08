import * as functions from 'firebase-functions';
import {recommend} from './barista';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const coffeeBarista = functions.https.onRequest((request, response) => {
  let brewType;
  if(request.query.brewType){
    brewType = String(request.query.brewType);
  }
 response.send(recommend(brewType));
});
