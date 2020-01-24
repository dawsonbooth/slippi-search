import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";

const REPLAY_EXT = /\.slp$/;

export function withGamesFromDir(
    startPath: string,
    callback: (game: SlippiGame) => void,
    recursive?: boolean
) {
    if (!fs.existsSync(startPath))
        throw new Error(`Path '${startPath}' does not exist`);

    const files = fs.readdirSync(startPath);

    files.map(f => {
        const filePath = path.join(startPath, f);
        const extFilePath = path.join(process.cwd(), filePath);

        if (recursive && fs.statSync(filePath).isDirectory())
            withGamesFromDir(filePath, callback, recursive);
        else if (REPLAY_EXT.test(filePath))
            callback(new SlippiGame(extFilePath));
    });
}

export function withGamesFromDirAsync(
    startPath: string,
    callback: (game: SlippiGame) => void,
    recursive?: boolean
) {
    fs.readdir(startPath, (err, files) => {
        if (err) {
            throw new Error(`Path '${startPath}' does not exist`);
        }

        files.map(f => {
            const filePath = path.join(startPath, f);
            const extFilePath = path.join(process.cwd(), filePath);

            if (recursive && fs.statSync(filePath).isDirectory())
                withGamesFromDirAsync(filePath, callback, recursive);
            else if (REPLAY_EXT.test(filePath))
                callback(new SlippiGame(extFilePath));
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
