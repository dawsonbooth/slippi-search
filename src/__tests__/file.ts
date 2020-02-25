import { getGamesFromDir, withGamesFromDir, withGamesFromDirAsync } from "..";
import path = require("path");

const REPLAY_DIR = "./slp";
console.log(path.isAbsolute(REPLAY_DIR));

test("[FUNCTION] getGamesFromDir", () => {
  let games = getGamesFromDir(REPLAY_DIR);
  expect(games.length).toBe(10);
  games = getGamesFromDir(REPLAY_DIR, true);
  expect(games.length).toBe(40);
});

test("[FUNCTION] withGamesFromDir", () => {
  let num = 0;
  withGamesFromDir(REPLAY_DIR, game => {
    expect(game.getSettings().stageId >= 0).toBe(true);
    num++;
  });
  expect(num).toBe(10);

  num = 0;
  withGamesFromDir(path.resolve(REPLAY_DIR), game => {
    expect(game.getSettings().stageId >= 0).toBe(true);
    num++;
  });
  expect(num).toBe(10);
});

test("[FUNCTION] withGamesFromDirAsync", () => {
  let num = 0;
  withGamesFromDirAsync(REPLAY_DIR, game => {
    expect(game.getSettings().stageId >= 0).toBe(true);
    num++;
  });
  expect(num).toBe(0);
});
