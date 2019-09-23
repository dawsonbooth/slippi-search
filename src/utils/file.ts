import path from "path";
import fs from "fs";
import SlippiGame from 'slp-parser-js';

export function withGamesFromDir(startPath: string, callback: Function) {
  const filter = /\.slp$/;
  if (!fs.existsSync(startPath))
    throw new Error(`Path '${startPath}' does not exist`);

  for (var f of fs.readdirSync(startPath)) {
    const fullPath = path.join(startPath, f);
    const game = new SlippiGame(fullPath);

    if (filter.test(fullPath)) callback(game);
  }
}

export function getGamesFromDir(startPath: string) {
  const found = new Array<SlippiGame>();
  withGamesFromDir(startPath, (game: SlippiGame) => found.push(game));
  return found;
}