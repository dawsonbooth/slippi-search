import { utils } from "../src";

test("[FUNCTION] getGamesFromDir", () => {
    const games = utils.getGamesFromDir("slp");
    expect(games.length).toBe(10);
});

test("[FUNCTION] withGamesFromDir", () => {
    utils.withGamesFromDir("slp", game => {
        expect(game.getSettings().stageId >= 0).toBe(true);
    });
});

test("[FUNCTION] withGamesFromDirAsync", () => {
    let num = 0;
    utils.withGamesFromDirAsync("slp", game => {
        expect(game.getSettings().stageId >= 0).toBe(true);
        num += 1;
    });
    expect(num).toBe(0);
});

test("[ERROR] Throw error on invalid path", () => {
    try {
        utils.getGamesFromDir(null);
    } catch (err) {
        expect(err.message).toBe(`Path '${null}' does not exist`);
    }
});
