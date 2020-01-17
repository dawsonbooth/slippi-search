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
import { stages, FrameEntryType } from "slp-parser-js";
import {
    sortedFrames,
    CriteriaSet,
    FrameCriteriaType,
    GameCriteriaType
} from "../src/utils/common";

const REPLAY_DIR = "slp";

test("[FUNCTION] isValidGame", () => {
    const criteria = {
        stageId: [stages.STAGE_FD, stages.STAGE_DREAM_LAND],
        isTeams: [true],
        isPAL: [true],
        players: [
            {
                characterId: [10]
            }
        ]
    };

    withGamesFromDir(REPLAY_DIR, game => {
        for (const key in criteria) {
            expect(
                isValidGame(game, {
                    [key]: criteria[key]
                })
            ).toBe(new CriteriaSet(criteria[key]).has(game.getSettings()[key]));
        }
    });
});

test("[FUNCTION] isValidPlayer", () => {
    const criteria = {
        playerIndex: [0],
        port: [1],
        characterId: [10],
        characterColor: [1],
        startStocks: [[1, 4]],
        finalStocks: [[1, 4]],
        type: [5],
        teamId: [1],
        controllerFix: [true],
        nametag: ["test"]
    };

    withGamesFromDir(REPLAY_DIR, game => {
        for (const key in criteria) {
            expect(
                isValidPlayer(game.getSettings().players[0], {
                    [key]: criteria[key]
                })
            ).toBe(
                new CriteriaSet(criteria[key]).has(
                    game.getSettings().players[0][key]
                )
            );
        }
    });
});

test("[FUNCTION] withMatchingGames", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        stageId: [stages.STAGE_FD, stages.STAGE_DREAM_LAND],
        isTeams: [true],
        isPAL: [true]
    };

    withMatchingGames(games, criteria, game => {
        expect(isValidGame(game, criteria)).toBe(true);
    });
});

test("[FUNCTION] isValidPreFrameUpdate", () => {
    const games = getGamesFromDir(REPLAY_DIR);
    const criteria = {
        frame: [[1, 1]],
        playerIndex: [[1, 4]]
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
        frame: [[1, 1]],
        playerIndex: [[1, 4]]
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
            frame: [[1, 1]],
            playerIndex: [[1, 4]]
        },
        post: {
            frame: [[1, 1]],
            playerIndex: [[1, 4]]
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
        frame: [[1, 3]]
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
    // Define criteria
    const gameCriteria: GameCriteriaType = {
        isTeams: [false],
        isPAL: [true, false] // Can also just be omitted
    };

    const frameCriteria: FrameCriteriaType = {
        players: [
            null,
            {
                post: {
                    playerIndex: [1],
                    percent: [25]
                }
            }
        ]
    };

    // With each game in the directory
    withGamesFromDir(REPLAY_DIR, game => {
        // Check that game matches criteria
        if (isValidGame(game, gameCriteria)) {
            // With frames that match criteria
            withMatchingFrames(
                sortedFrames(game),
                frameCriteria,
                (frame: FrameEntryType) => {
                    // Print information about the frame
                    expect(frame.players[1].post.percent).toBe(25);
                }
            );
        }
    });
});
