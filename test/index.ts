import { utils } from "../src";

test("read games from dir", () => {
  const games = utils.getGamesFromDir(__dirname);
  expect(games.length).toBe(10);
});

test("throw error on invalid path", () => {
  try {
    utils.getGamesFromDir(null);
  } catch (err) {
    expect(err.message).toBe(`Path '${null}' does not exist`);
  }
});
