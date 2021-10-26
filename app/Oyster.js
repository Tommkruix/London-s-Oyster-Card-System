const {
  ANYWHERE_IN_ZONE_ONE_FARE,
  ANY_ONE_ZONE_OUTSIDE_ZONE_ONE_FARE,
  ANY_TWO_ZONES_INCLUDING_ZONE_ONE_FARE,
  ANY_TWO_ZONES_EXCLUDING_ZONE_ONE_FARE,
  ANY_BUS_JOURNEY_FARE,
  MAX_POSSIBLE_OR_ALL_THREE_ZONES_FARE,
} = require("./constants/index");

class Oyster {
  constructor(credit = 0) {
    this.credit = credit;
    this.fare = 0;
    this.station = [];
  }

  enterStation(station) {
    if (typeof station === "object") {
      this.station.push(station);
      this.fare = MAX_POSSIBLE_OR_ALL_THREE_ZONES_FARE;
      this.setDebit();
    } else {
      console.log("No Station with this name.");
    }
  }

  getTotalFare() {
    if (this.station.length === 2) {
      this.setCredit(MAX_POSSIBLE_OR_ALL_THREE_ZONES_FARE);

      let crossedZones = this.getCrossedZones(this.station[0], this.station[1]);
      let isZoneOneCrossed = this.shouldCrossedZoneOne(
        this.station[0],
        this.station[1]
      );
      let cost = this.getFareByZone(crossedZones, isZoneOneCrossed);
      this.fare = cost;
    } else {
      this.fare = MAX_POSSIBLE_OR_ALL_THREE_ZONES_FARE;
    }
  }

  getCrossedZones(from, to) {
    let minVisitedZones = 10;
    from.forEach(function (fromZone, _index, _array) {
      to.forEach(function (toZone, _index, _array) {
        let zonesVisited = Math.abs(fromZone - toZone) + 1;
        if (zonesVisited < minVisitedZones) {
          minVisitedZones = zonesVisited;
        }
        if (minVisitedZones == 1) {
          return;
        }
      });
    });
    return minVisitedZones;
  }

  getFareByZone(crossedZone, isZoneOneCrossed) {
    if (crossedZone === 1 && isZoneOneCrossed) return ANYWHERE_IN_ZONE_ONE_FARE;
    if (crossedZone === 1 && !isZoneOneCrossed)
      return ANY_ONE_ZONE_OUTSIDE_ZONE_ONE_FARE;
    if (crossedZone === 2 && isZoneOneCrossed)
      return ANY_TWO_ZONES_INCLUDING_ZONE_ONE_FARE;
    if (crossedZone === 2 && !isZoneOneCrossed)
      return ANY_TWO_ZONES_EXCLUDING_ZONE_ONE_FARE;
    if (crossedZone === 3) return MAX_POSSIBLE_OR_ALL_THREE_ZONES_FARE;

    return MAX_POSSIBLE_OR_ALL_THREE_ZONES_FARE;
  }

  getCredit() {
    return this.credit;
  }

  isZoneOneCrossed(from, to) {
    return (
      (from.length == 1 && this.search(1, from)) ||
      (to.length == 1 && this.search(1, to))
    );
  }

  leaveStation() {
    this.getTotalFare();
    this.setDebit();
  }

  setCredit(amount) {
    if (typeof amount === "number") return (this.credit += amount);

    return 0;
  }

  setDebit() {
    this.credit >= this.fare
      ? (this.credit -= this.fare)
      : console.log("You are out of credit.");
  }

  search(params, array) {
    let length = array.length;
    for (let i = 0; i < length; i++) if (array[i] === params) return true;

    return false;
  }

  shouldCrossedZoneOne(from, to) {
    return (
      (from.length === 1 && this.search(1, from)) ||
      (to.length === 1 && this.search(1, to))
    );
  }

  setNewTrip(finalStation) {
    this.station.push(finalStation);
  }

  setNewTripOnBus() {
    this.fare = ANY_BUS_JOURNEY_FARE;
    this.setDebit();
  }
}

module.exports = Oyster;
