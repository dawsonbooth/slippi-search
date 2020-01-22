import {
    getGamesFromDir,
    withGamesFromDir,
    withGamesFromDirAsync
} from "../src";

const REPLAY_DIR = "slp";

test("[FUNCTION] getGamesFromDir", () => {
    let games = getGamesFromDir(REPLAY_DIR);
    expect(games.length).toBe(10);
    games = getGamesFromDir(REPLAY_DIR, true);
    expect(games.length).toBe(40);
});

test("[FUNCTION] withGamesFromDir", () => {
    withGamesFromDir(REPLAY_DIR, game => {
        expect(game.getSettings().stageId >= 0).toBe(true);
    });
});

test("[FUNCTION] withGamesFromDirAsync", () => {
    let num = 0;
    withGamesFromDirAsync(REPLAY_DIR, game => {
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
