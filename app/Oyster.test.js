const { STATIONS_AND_ZONES } = require("./constants/index");
const Oyster = require("./Oyster");

describe("Oyster Card Problem Test Cases", () => {
  let OysterCard = new Oyster();

  test("should return 2.5 (£) for anywhere in zone 1", () => {
    expect(OysterCard.getFareByZone(1, true)).toBe(2.5);
  });

  test("should return 2 (£) for any one zone outside zone 1", () => {
    expect(OysterCard.getFareByZone(1, false)).toBe(2);
  });

  test("should return 3 (£) for two zones including zone 1", () => {
    expect(OysterCard.getFareByZone(2, true)).toBe(3);
  });

  test("should return 2.25 (£) for any two zones excluding zone 1", () => {
    expect(OysterCard.getFareByZone(2, false)).toBe(2.25);
  });

  test("should return 3.2 (£) for any three zones", () => {
    expect(OysterCard.getFareByZone(3, true)).toBe(3.2);
  });

  test("should return 0 (£) for invalid credit type", () => {
    expect(OysterCard.setCredit("")).toBe(0);
  });

  test("should return 30 (£) for valid credit", () => {
    expect(OysterCard.setCredit(30)).toBe(30);
  });

  test("should return 0 (£) for insufficient credit", () => {
    expect(OysterCard.setCredit(-30)).toBe(0);
  });

  test("should charge maximum fare 3.20 (£) if the user doesn't swipe out", () => {
    let OysterCard = new Oyster(30);
    OysterCard.setNewTrip(STATIONS_AND_ZONES.EarlsCourt);
    OysterCard.leaveStation();
    expect(OysterCard.getCredit()).toBe(26.8);
  });
});
