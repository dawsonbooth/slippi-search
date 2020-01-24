import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";

export function withGamesFromDir(
    startPath: string,
    callback: (game: SlippiGame, index: number, array: string[]) => void,
    recursive?: boolean
) {
    const filter = /\.slp$/;

    if (!fs.existsSync(startPath))
        throw new Error(`Path '${startPath}' does not exist`);

    const files = fs.readdirSync(startPath);

    files.forEach((f, index, array) => {
        const fullPath = path.join(startPath, f);

        if (recursive && fs.statSync(fullPath).isDirectory())
            withGamesFromDir(fullPath, callback, recursive);

        if (filter.test(fullPath))
            callback(new SlippiGame(fullPath), index, array);
    });
}

export function withGamesFromDirAsync(
    startPath: string,
    callback: (game: SlippiGame, index: number, array: string[]) => void,
    recursive?: boolean
) {
    const filter = /\.slp$/;

    fs.readdir(startPath, (err, files) => {
        if (err) {
            throw new Error(`Path '${startPath}' does not exist`);
        }

        files.forEach((f, index, array) => {
            const fullPath = path.join(startPath, f);

            if (recursive && fs.statSync(fullPath).isDirectory())
                withGamesFromDirAsync(fullPath, callback, recursive);

            if (filter.test(fullPath))
                callback(new SlippiGame(fullPath), index, array);
        });
    });
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
