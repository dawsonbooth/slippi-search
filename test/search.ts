import {
    withGamesFromDir,
    isValidGame,
    isValidPlayer,
    getGamesFromDir,
    withMatchingGames,
    withMatchingFrames,
    isValidFrame,
    isValidPreFrameUpdate,
    isValidPostFrameUpdate,
    isValidPlayerFrame
} from "../src";
import { stages } from "slp-parser-js";
import _ from "lodash";
import { Range, sortedFrames } from "../src/utils/common";

const REPLAY_DIR = "slp";

test("[FUNCTION] isValidGame", () => {
    const criteria = {
        stageId: new Set([stages.STAGE_FD, stages.STAGE_DREAM_LAND]),
        isTeams: new Set([true]),
        isPAL: new Set([true])
    };

    withGamesFromDir(REPLAY_DIR, game => {
        for (const key in criteria) {
            expect(
                isValidGame(game, {
                    [key]: criteria[key]
                })
            ).toBe(criteria[key].has(game.getSettings()[key]));
        }
    });
});

test("[FUNCTION] isValidPlayer", () => {
    const criteria = {
        playerIndex: new Set([0]),
        port: new Set([1]),
        characterId: new Set([10]),
        characterColor: new Set([1]),
        startStocks: new Range(1, 4),
        finalStocks: new Range(1, 4),
        type: new Set([5]),
        teamId: new Set([1]),
        controllerFix: new Set([true]),
        nametag: new Set(["test"])
    };

    withGamesFromDir(REPLAY_DIR, game => {
        for (const key in criteria) {
            expect(
                isValidPlayer(game.getSettings().players[0], {
                    [key]: criteria[key]
                })
            ).toBe(criteria[key].has(game.getSettings().players[0][key]));
        }
    });
});

test("[FUNCTION] withMatchingGames", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        stageId: new Set([stages.STAGE_FD, stages.STAGE_DREAM_LAND]),
        isTeams: new Set([true]),
        isPAL: new Set([true])
    };

    withMatchingGames(games, criteria, game => {
        expect(isValidGame(game, criteria)).toBe(true);
    });
});

test("[FUNCTION] isValidPreFrameUpdate", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        frame: new Range<number>(1, 1),
        playerIndex: new Range<number>(1, 4)
    };

    let numValidFrames = 0;
    games.forEach(game => {
        const frames = sortedFrames(game);
        frames.forEach(frame => {
            numValidFrames +=
                frame.players[1] &&
                isValidPreFrameUpdate(frame.players[1].pre, criteria)
                    ? 1
                    : 0;
        });
    });

    expect(numValidFrames).toBe(games.length - 1);
});

test("[FUNCTION] isValidPostFrameUpdate", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        frame: new Range<number>(1, 1),
        playerIndex: new Range<number>(1, 4)
    };

    let numValidFrames = 0;
    games.forEach(game => {
        const frames = sortedFrames(game);
        frames.forEach(frame => {
            numValidFrames +=
                frame.players[1] &&
                isValidPostFrameUpdate(frame.players[1].post, criteria)
                    ? 1
                    : 0;
        });
    });

    expect(numValidFrames).toBe(games.length - 1);
});

test("[FUNCTION] isValidPlayerFrameUpdate", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        pre: {
            frame: new Range<number>(1, 1),
            playerIndex: new Range<number>(1, 4)
        },
        post: {
            frame: new Range<number>(1, 1),
            playerIndex: new Range<number>(1, 4)
        }
    };

    let numValidFrames = 0;
    games.forEach(game => {
        const frames = sortedFrames(game);
        frames.forEach(frame => {
            numValidFrames +=
                frame.players[1] &&
                isValidPlayerFrame(frame.players[1], criteria)
                    ? 1
                    : 0;
        });
    });

    expect(numValidFrames).toBe(games.length - 1);
});

test("[FUNCTION] isValidFrame", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        frame: new Range<number>(1, 3)
    };

    let numValidFrames = 0;
    games.forEach(game => {
        const frames = sortedFrames(game);
        frames.forEach(frame => {
            numValidFrames += isValidFrame(frame, criteria) ? 1 : 0;
        });
    });

    expect(numValidFrames).toBe(3 * games.length);
});

test("[FUNCTION] withMatchingFrames", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const gameCriteria = {
        stageId: new Set([stages.STAGE_FD, stages.STAGE_DREAM_LAND]),
        isTeams: new Set([true]),
        isPAL: new Set([true])
    };
    const frameCriteria = {
        frame: new Range<number>(20, 20)
    };

    withMatchingGames(games, gameCriteria, game => {
        withMatchingFrames(game, frameCriteria, frame => {
            expect(isValidFrame(frame, frameCriteria)).toBe(true);
        });
    });
});
