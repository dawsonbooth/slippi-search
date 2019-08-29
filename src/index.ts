import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";
import _ from "lodash";

export function gamesFromDir(startPath: string, callback: Function) {
  const filter = /\.slp$/;
  if (!fs.existsSync(startPath))
    throw new Error(`Path '${startPath}' does not exist`);

  const files = fs.readdirSync(startPath);

  for (let i = 0; i < files.length; i += 1) {
    const fullPath = path.join(startPath, files[i]);
    const game = new SlippiGame(fullPath);

    if (filter.test(fullPath)) callback(game);
  }
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

function isValidGame(game: SlippiGame, criteria: GameCriteriaType): boolean {
  const gameSettings = game.getSettings()!;
  if (criteria.stageIds && !criteria.stageIds.has(gameSettings.stageId))
    return false;
  return true;
}

function isValidFrame(frame: FrameEntryType, criteria: FrameCriteriaType) {
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

export function getGames(
  games: Iterable<SlippiGame>,
  criteria: GameCriteriaType
) {
  const found = new Set();
  searchGames(games, criteria, (game: SlippiGame) => found.add(game));
  return found;
}

export function getFrames(game: SlippiGame, criteria: FrameCriteriaType) {
  const frames = getSortedFrames(game);
  const found = new Set();
  searchFrames(frames, criteria, (frame: FrameEntryType) => found.add(frame));
  return found;
}
