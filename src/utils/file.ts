import path from "path";
import fs from "fs";
import SlippiGame from "slp-parser-js";

export function withGamesFromDir(
    startPath: string,
    callback: (game: SlippiGame) => void
) {
    const filter = /\.slp$/;

    if (!fs.existsSync(startPath))
        throw new Error(`Path '${startPath}' does not exist`);

    for (const f of fs.readdirSync(startPath)) {
        const fullPath = path.join(startPath, f);

        if (filter.test(fullPath)) callback(new SlippiGame(fullPath));
    }
}

export function withGamesFromDirAsync(
    startPath: string,
    callback: (game: SlippiGame) => void
) {
    const filter = /\.slp$/;

    fs.readdir(startPath, (err, files) => {
        if (err) {
            throw new Error(`Path '${startPath}' does not exist`);
        }

        files.forEach(f => {
            const fullPath = path.join(startPath, f);
            if (filter.test(fullPath)) callback(new SlippiGame(fullPath));
        });
    });
}

export function getGamesFromDir(startPath: string) {
    const found = new Array<SlippiGame>();
    withGamesFromDir(startPath, (game: SlippiGame) => found.push(game));
    return found;
}
