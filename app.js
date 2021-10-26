const Oyster = require("./app/Oyster.js");
const { STATIONS_AND_ZONES } = require("./app/constants/index");

/**
 * demonstrate a user loading a card with £30,
 * and taking the following trips, and then viewing the balance.
 */
let OysterCard = new Oyster();

// user loading a card with £30
OysterCard.setCredit(30);

// Tube Holborn to Earl’s Court
OysterCard.enterStation(STATIONS_AND_ZONES.Holborn);
OysterCard.setNewTrip(STATIONS_AND_ZONES.EarlsCourt);
OysterCard.leaveStation();

// 328 bus from Earl’s Court to Chelsea
OysterCard.setNewTripOnBus();

// Tube Earl’s court to Hammersmith
OysterCard.enterStation(STATIONS_AND_ZONES.EarlsCourt);
OysterCard.setNewTrip(STATIONS_AND_ZONES.Hammersmith);
OysterCard.leaveStation();

// viewing the balance.
const balance = OysterCard.getCredit();
console.log("Credit Balance: £", balance);
