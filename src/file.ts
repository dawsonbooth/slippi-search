import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";

const REPLAY_EXT = /\.slp$/;

export function withGamesFromDir(
    startPath: string,
    callback: (game: SlippiGame) => void,
    recursive?: boolean
) {
    try {
        const absStartPath = path.resolve(startPath);
        const files = fs.readdirSync(absStartPath);

        files.map(f => {
            const absFilePath = path.join(absStartPath, f);

            if (recursive && fs.statSync(absFilePath).isDirectory())
                withGamesFromDir(absFilePath, callback, recursive);
            else if (REPLAY_EXT.test(absFilePath))
                callback(new SlippiGame(absFilePath));
        });
    } catch (err) {
        throw new Error(`Path '${startPath}' does not exist`);
    }
}

export function withGamesFromDirAsync(
    startPath: string,
    callback: (game: SlippiGame) => void,
    recursive?: boolean
) {
    try {
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
    } catch (err) {
        throw new Error(`Path '${startPath}' does not exist`);
    }
}

export function getGamesFromDir(startPath: string, recursive?: boolean) {
    const found = new Array<SlippiGame>();
    withGamesFromDir(
        startPath,
        (game: SlippiGame) => found.push(game),
        recursive
    );
    return found;
}