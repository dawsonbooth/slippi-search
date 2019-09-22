import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";
import _ from "lodash";

export function gamesFromDir(startPath: string, callback: Function) {
  const filter = /\.slp$/;
  if (!fs.existsSync(startPath))
    throw new Error(`Path '${startPath}' does not exist`);

  fs.readdirSync(startPath).forEach(function(f) {
    const fullPath = path.join(startPath, f);
    const game = new SlippiGame(fullPath);

    if (filter.test(fullPath)) callback(game);
  });
}

export function getGamesFromDir(startPath: string) {
  const found = new Array<SlippiGame>();
  gamesFromDir(startPath, (game: SlippiGame) => found.push(game));
  return found;
}

export function getSortedFrames(game: SlippiGame) {
  const frames = game.getFrames();
  return _.orderBy(frames, "frame");
}

export function isValidGame(
  game: SlippiGame,
  criteria: GameCriteriaType
): boolean {
  const gameSettings = game.getSettings()!;
  if (criteria.stageId && !criteria.stageId.has(gameSettings.stageId))
    return false;
  return true;
}

export function isValidFrame(
  frame: FrameEntryType,
  criteria: FrameCriteriaType
) {
  return true;
}

export function searchGames(
  games: Iterable<SlippiGame>,
  criteria: GameCriteriaType,
  callback: Function
) {
  for (const game of games) {
    if (isValidGame(game, criteria)) {
      callback(game);
    }
  }
}

export function searchFrames(
  frames: Iterable<FrameEntryType>,
  criteria: FrameCriteriaType,
  callback: Function
) {
  for (const frame of frames) {
    if (isValidFrame(frame, criteria)) {
      callback(frame);
    }
  }
}

export function getMatchingGames(
  games: Iterable<SlippiGame>,
  criteria: GameCriteriaType
) {
  const found = new Array<SlippiGame>();
  searchGames(games, criteria, (game: SlippiGame) => found.push(game));
  return found;
}

export function getMatchingFrames(
  frames: Array<FrameEntryType>,
  criteria: FrameCriteriaType
) {
  const found = new Array<FrameEntryType>();
  searchFrames(frames, criteria, (frame: FrameEntryType) => found.push(frame));
  return found;
}
