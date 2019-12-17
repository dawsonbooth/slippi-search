import {
    getGamesFromDir,
    withGamesFromDir,
    withGamesFromDirAsync
} from "../src";

test("[FUNCTION] getGamesFromDir", () => {
    const games = getGamesFromDir("slp");
    expect(games.length).toBe(10);
});

test("[FUNCTION] withGamesFromDir", () => {
    withGamesFromDir("slp", game => {
        expect(game.getSettings().stageId >= 0).toBe(true);
    });
});

test("[FUNCTION] withGamesFromDirAsync", () => {
    let num = 0;
    withGamesFromDirAsync("slp", game => {
        expect(game.getSettings().stageId >= 0).toBe(true);
        num += 1;
    });
    expect(num).toBe(0);
});

test("[ERROR] Throw error on invalid path", () => {
    try {
        getGamesFromDir(null);
    } catch (err) {
        expect(err.message).toBe(`Path '${null}' does not exist`);
    }
});
