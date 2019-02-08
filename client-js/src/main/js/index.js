const {StreamNumbersRequest} = require('./proteus/service_pb');
const {StreamNumbersResponse} = require('./proteus/service_pb');
const {NumberServiceClient} = require('./proteus/service_rsocket_pb');
const {Proteus} = require('proteus-js-client');

/** Helpers **/

// For generating variable identities in order to easily tell if messages are coming from this application instance or another
const alphabet = [
    "Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November",
    "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-Ray", "Yankee", "Zulu"
];

const numbers = [
    "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function generateName(){
    return alphabet[getRandomInt(25)] + '-' + numbers[getRandomInt(9)] + '-' + numbers[getRandomInt(9)] + '-' + numbers[getRandomInt(9)];
}


function addMessage(message) {
    var ul = document.getElementById('messages');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if(ul.childElementCount >= 10){
        ul.removeChild(ul.childNodes[0]);
    }
    ul.appendChild(li);
}

function main() {
  const url = __WS_URL__;

  const sessionId = generateName();

  // This Proteus object acts as our gateway to both send messages to services and to register services that we support
  const proteusGateway = Proteus.create({
      setup: {
          group: 'proteus.kafkaDemo.browserClient',
          destination: sessionId,
          accessKey: 9007199254740991,
          accessToken: 'kTBDVtfRBO4tHOnZzSyY5ym2kfY=',
      },
      transport: {
          url,
      },
  });

  // Connect to Netifi Proteus Platform
  const conn = proteusGateway.group("proteus.kafkaDemo.numberService");

  // Create Client to Communicate with the NumberService
  const client = new NumberServiceClient(conn);

  // Create Request to NumberService
  const requestAllNumbers = new StreamNumbersRequest();
  requestAllNumbers.setType(2)

  client.streamNumbers(requestAllNumbers).subscribe({
    onNext: response => {
        console.log("Pong received: " + JSON.stringify(response));
        allNumbers("Number Service responded with: " + response)
        _subscription.request(1);
    },
    onError: error => {
        logFunction("Number Service responded with error: " + error);
    },
    onSubscribe: subscription => {
        _subscription = subscription;
        _subscription.request(1);
    }
  }, 15000)

  // Create Request to NumberService
  const requestPositiveNumbers = new StreamNumbersRequest();
  requestPositiveNumbers.setType(4)

  client.streamNumbers(requestPositiveNumbers).subscribe({
      onNext: response => {
          console.log("Pong received: " + JSON.stringify(response));
          positiveNumbers("Number Service responded with: " + response)
          _subscription1.request(4);
      },
      onError: error => {
          logFunction("Number Service responded with error: " + error);
      },
      onSubscribe: subscription => {
          _subscription1 = subscription;
          _subscription1.request(1);
      }
    }, 15000)

    // Create Request to NumberService
    const requestNegativeNumbers = new StreamNumbersRequest();
    requestNegativeNumbers.setType(3)

    client.streamNumbers(requestNegativeNumbers).subscribe({
        onNext: response => {
            console.log("Pong received: " + JSON.stringify(response));
            negativeNumbers("Number Service responded with: " + response)
            _subscription2.request(1);
        },
        onError: error => {
            logFunction("Number Service responded with error: " + error);
        },
        onSubscribe: subscription => {
            _subscription2 = subscription;
            _subscription2.request(1);
        }
      }, 15000)
}

function allNumbers(message) {
    var ul = document.getElementById('allNumbers');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if(ul.childElementCount >= 10){
        ul.removeChild(ul.childNodes[0]);
    }
    ul.appendChild(li);
}

function positiveNumbers(message) {
    var ul = document.getElementById('positiveNumbers');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if(ul.childElementCount >= 10){
        ul.removeChild(ul.childNodes[0]);
    }
    ul.appendChild(li);
}

function negativeNumbers(message) {
    var ul = document.getElementById('negativeNumbers');
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(message));
    if(ul.childElementCount >= 10){
        ul.removeChild(ul.childNodes[0]);
    }
    ul.appendChild(li);
}


main();