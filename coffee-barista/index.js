// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const {
  dialogflow,
  SimpleResponse,
  BasicCard,
  Image,
  Table,
  List,
} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({debug: true});
const coffeeSteps = function(brewingtype){
  let steps;
  switch (brewingtype) {
    case 'drip':
      steps = `
      1. Heat fresh water to 200° F. \n
      2. Measure 25 grams of freshly roasted coffee beans.\n
      3. Prepare the filter & Grind. \n
      4. Fold down the seam of the paper filter and place it into the pour over cone so it lies flat. \n
      5. Bloom. Discard the hot water and place the V60 and carafe on your scale. \n
      6. Pour`;
      break;
    case 'french':
      steps = `
      1. Heat fresh water to 200° F. \n
      2. Measure 25 grams of freshly roasted coffee beans.\n
      3. Prepare the filter & Grind. \n
      4. Fold down the seam of the paper filter and place it into the pour over cone so it lies flat. \n
      5. Bloom. Discard the hot water and place the V60 and carafe on your scale. \n
      6. Pour`;
      break;
    case 'machine':
      steps = `
      1. Heat fresh water to 200° F. \n
      2. Place the pot on a dry, flat surface. Hold the handle firmly, then pull out the plunger.\n
      3. Add a heaping tablespoon (7-8 grams) of coffee to the pot per 200 ml (6.7 oz) of water. \n
      4. Pour hot water—not quite boiling—into the pot, and gently stir. \n
      5. Carefully reinsert the plunger into the pot,
      stopping just above the water and ground coffee (do not plunge yet),
      and let stand for 3-4 minutes. \n
      6. Pour`;
      break;
    default:
      steps="brewingtype not found";
  }
  return steps;
};

const coffeeLogo = function(brewingtype){
  let logo;
  switch (brewingtype) {
    case 'drip':
      logo = 'https://humblebee.coffee/wp-content/uploads/2016/06/pour-over-20160621-05.svg';
    break;
    case 'french':
      logo = 'https://logopond.com/logos/39b4e759b45e825c042c0bc232e70b8e.png';
    break;
    case 'machine':
      logo = 'https://humblebee.coffee/wp-content/uploads/2016/06/batch-brew-20160620-02-02.svg';
    break;
    default:
      logo="brewingtype not found";
  }
  return logo;
  };

app.intent('coffee-barista', (conv, {brewringtype}) => {
  conv.ask(`Wow !! ${brewringtype} is my  favorite way to brew !!`);
  conv.ask(`${brewringtype} is an excellent choice fellow human !!`);
  conv.ask(`${brewringtype} is the most popular choice in Europe`);
   conv.close(new BasicCard({
    text: coffeeSteps(`${brewringtype}`),
    title: `Following are the steps for brewing ${brewringtype} style : `,
      image: new Image({
      url: coffeeLogo(`${brewringtype}`),
      alt: 'Image alternate text',
    }),
    display: 'CROPPED',
  }));

});


app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`);
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
