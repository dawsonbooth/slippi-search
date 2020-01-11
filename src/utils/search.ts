import SlippiGame, {
    FrameEntryType,
    PreFrameUpdateType,
    PostFrameUpdateType
} from "slp-parser-js";
import {
    GameCriteriaType,
    FrameCriteriaType,
    PlayerType,
    PlayerCriteriaType,
    PlayerFrameCriteriaType,
    PreFrameUpdateCriteriaType,
    PostFrameUpdateCriteriaType,
    CriteriaSet
} from "./common";

export function isValidPlayer(
    player: PlayerType,
    criteria: PlayerCriteriaType
) {
    for (const key in criteria) {
        if (!new CriteriaSet(criteria[key]).has(player[key])) return false;
    }
    return true;
}

export function isValidGame(
    game: SlippiGame,
    criteria: GameCriteriaType
): boolean {
    const gameSettings = game.getSettings()!;
    for (const key in criteria) {
        if (key === "players" && !isValidPlayer) return false;
        if (!new CriteriaSet(criteria[key]).has(gameSettings[key]))
            return false;
    }
    return true;
}

export function isValidPreFrameUpdate(
    pre: PreFrameUpdateType,
    criteria: PreFrameUpdateCriteriaType
) {
    for (const key in criteria) {
        if (!new CriteriaSet(criteria[key]).has(pre[key])) return false;
    }
    return true;
}

export function isValidPostFrameUpdate(
    post: PostFrameUpdateType,
    criteria: PostFrameUpdateCriteriaType
) {
    for (const key in criteria) {
        if (!new CriteriaSet(criteria[key]).has(post[key])) return false;
    }
    return true;
}

export function isValidPlayerFrame(
    playerFrame: {
        pre: PreFrameUpdateType;
        post: PostFrameUpdateType;
    },
    criteria: PlayerFrameCriteriaType
) {
    return (
        isValidPreFrameUpdate(playerFrame.pre, criteria.pre) &&
        isValidPostFrameUpdate(playerFrame.post, criteria.post)
    );
}

export function isValidFrame(
    frame: FrameEntryType,
    criteria: FrameCriteriaType
) {
    if (!new CriteriaSet(criteria.frame).has(frame.frame)) return false;
    if (criteria.players) {
        for (let i = 0; i < criteria.players.length; i++) {
            if (
                frame.players[i] &&
                !isValidPlayerFrame(frame.players[i], criteria.players[i])
            )
                return false;
        }
    }
    if (criteria.followers) {
        for (let i = 0; i < criteria.followers.length; i++) {
            if (
                frame.followers[i] &&
                !isValidPlayerFrame(frame.followers[i], criteria.followers[i])
            )
                return false;
        }
    }
    return true;
}

export function withMatchingGames(
    games: Iterable<SlippiGame>,
    criteria: GameCriteriaType,
    callback: Function
) {
    for (const game of games) {
        if (isValidGame(game, criteria)) {
            callback(game);
        }
    }
}

export function withMatchingFrames(
    frames: Iterable<FrameEntryType>,
    criteria: FrameCriteriaType,
    callback: Function
) {
    for (const frame of frames) {
        if (isValidFrame(frame, criteria)) {
            callback(frame);
        }
    }
}

export function getMatchingGames(
    games: Iterable<SlippiGame>,
    criteria: GameCriteriaType
) {
    return Array.from(games).filter(game => isValidGame(game, criteria));
}

export function getMatchingFrames(
    frames: Array<FrameEntryType>,
    criteria: FrameCriteriaType
) {
    return Array.from(frames).filter(frame => isValidFrame(frame, criteria));
}
