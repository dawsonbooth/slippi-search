import { utils } from "../src";
import SlippiGame, {
    animations,
    characters,
    moves,
    stages
} from "slp-parser-js";
import _ from "lodash";
import { NumberRange } from "../src/utils/common";

test("[FUNCTION] isValidGame", () => {
    const criteria = {
        stageId: new Set([stages.STAGE_FD, stages.STAGE_DREAM_LAND]),
        isTeams: new Set([true]),
        isPAL: new Set([true])
    };

    utils.withGamesFromDir("slp", game => {
        for (const key in criteria) {
            expect(
                utils.isValidGame(game, {
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
        startStocks: new NumberRange(1, 4),
        finalStocks: new NumberRange(1, 4),
        type: new Set([5]),
        teamId: new Set([1]),
        controllerFix: new Set([true]),
        nametag: new Set(["test"])
    };

    utils.withGamesFromDir("slp", game => {
        for (const key in criteria) {
            expect(
                utils.isValidPlayer(game.getSettings().players[0], {
                    [key]: criteria[key]
                })
            ).toBe(criteria[key].has(game.getSettings().players[0][key]));
        }
    });
});
