import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";

const REPLAY_EXT = /\.slp$/;

/**
 * Walk through the filesystem from the start path and perform
 * some function with any replay file ending with .slp.
 *
 * @param startPath Path to parent directory with .slp replay files and child replay directories
 * @param callback Callback function to be called with each [[SlippiGame]] game
 * @param recursive Whether the function will recursively walk through subdirectories
 */
export function withGamesFromDir(
  startPath: string,
  callback: (game: SlippiGame) => void,
  recursive: boolean = false
): void {
  const absStartPath = path.resolve(startPath);
  const files = fs.readdirSync(absStartPath);

  files.map(f => {
    const absFilePath = path.join(absStartPath, f);

    if (recursive && fs.statSync(absFilePath).isDirectory())
      withGamesFromDir(absFilePath, callback, recursive);
    else if (REPLAY_EXT.test(absFilePath))
      callback(new SlippiGame(absFilePath));
  });
}

/**
 * Walk through the filesystem from the start path and perform some
 * function asynchronously with any replay file ending with .slp.
 *
 * @param startPath Path to parent directory with .slp replay files and child replay directories
 * @param callback Callback function to be called asynchronously with each [[SlippiGame]] game
 * @param recursive Whether the function will recursively walk through subdirectories
 */
export function withGamesFromDirAsync(
  startPath: string,
  callback: (game: SlippiGame) => void,
  recursive: boolean = false
): void {
  const absStartPath = path.resolve(startPath);

  fs.readdir(absStartPath, (err, files) => {
    files.map(f => {
      const absFilePath = path.join(absStartPath, f);
      if (recursive && fs.statSync(absFilePath).isDirectory())
        withGamesFromDirAsync(absFilePath, callback, recursive);
      else if (REPLAY_EXT.test(absFilePath))
        callback(new SlippiGame(absFilePath));
    });
  });
}

/**
 * Gather all the replays at the start path into an array
 *
 * @param startPath Path to parent directory with .slp replay files and child replay directories
 * @param recursive Whether the function will recursively walk through subdirectories
 */
export function getGamesFromDir(
  startPath: string,
  recursive: boolean = false
): SlippiGame[] {
  const found = [];
  withGamesFromDir(
    startPath,
    (game: SlippiGame) => found.push(game),
    recursive
  );
  return found;
}
