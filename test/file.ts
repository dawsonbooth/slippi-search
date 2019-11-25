import { utils } from "../src";

test("read games from dir", () => {
    const games = utils.getGamesFromDir("slp");
    expect(games.length).toBe(10);

    utils.withGamesFromDir("slp", game => {
        expect(game.getSettings().stageId >= 0).toBe(true);
    });
});

test("throw error on invalid path", () => {
    try {
        utils.getGamesFromDir(null);
    } catch (err) {
        expect(err.message).toBe(`Path '${null}' does not exist`);
    }
});

test("file asynchrony", () => {
    let num = 0;
    utils.withGamesFromDirAsync("slp", game => {
        num += 1;
    });
    expect(num).toBe(0);
});
