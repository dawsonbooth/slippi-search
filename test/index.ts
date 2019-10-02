import { utils } from "../src";
import SlippiGame, {
  animations,
  characters,
  moves,
  stages
} from "slp-parser-js";

test("read games from dir", () => {
  const games = utils.getGamesFromDir("slp");
  expect(games.length).toBe(10);

  utils.withGamesFromDir("slp", game => {
    expect(game.getSettings().stageId >= 0).toBe(true);
  });
});

test("throw error on invalid path", () => {
  try {
    utils.getGamesFromDir(null);
  } catch (err) {
    expect(err.message).toBe(`Path '${null}' does not exist`);
  }
});

test("check isValidGame - stageId", () => {
  const criteria = {
    stageId: new Set([stages.STAGE_FD, stages.STAGE_DREAM_LAND])
  };
  const games = utils.getGamesFromDir("slp");
  const real = [false, true, true, true, false, true, true, false, false, true];
  for (let i = 0; i < games.length; i++) {
    expect(utils.isValidGame(games[i], criteria)).toBe(real[i]);
  }
});

// test("check isValidGame - players", () => {
//   const criteria = {
//     players: // TODO
//   };
//   const games = utils.getGamesFromDir("slp");
//   const real = [false, true, true, true, false, true, true, false, false, true];
//   for (var i = 0; i < games.length; i++) {
//     expect(utils.isValidGame(games[i], criteria)).toBe(real[i]);
//   }
// });

test("check isValidGame - isTeams", () => {
  const criteria = {
    isTeams: new Set([true])
  };
  const games = utils.getGamesFromDir("slp");
  for (let i = 0; i < games.length; i++) {
    expect(utils.isValidGame(games[i], criteria)).toBe(
      games[i].getSettings().isTeams
    );
  }
});

test("check isValidGame - isPAL", () => {
  const criteria = {
    isPAL: new Set([true])
  };
  const games = utils.getGamesFromDir("slp");
  for (let i = 0; i < games.length; i++) {
    expect(utils.isValidGame(games[i], criteria)).toBe(
      games[i].getSettings().isPAL || false
    );
  }
});
