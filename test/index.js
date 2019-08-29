import { getGamesFromDir } from "../src";

test("read games from dir", () => {
  const games = getGamesFromDir(__dirname);
  expect(games.length).toBe(10);
});
