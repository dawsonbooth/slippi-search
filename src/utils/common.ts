import _ from "lodash";
import SlippiGame, {
    FrameEntryType,
    GameStartType,
    PreFrameUpdateType,
    PostFrameUpdateType
} from "slp-parser-js";

export function sortedFrames(game: SlippiGame): FrameEntryType[] {
    const frames = game.getFrames();
    return _.orderBy(frames, "frame");
}

export class Range<E> {
    start: E;
    end: E;
    constructor(start: E, end: E) {
        this.start = start;
        this.end = end;
    }

    has(arg: E) {
        return this.start <= arg && arg <= this.end;
    }
}

export type FrameCriteriaType = {
    frame?: Range<FrameEntryType["frame"]>;
    players?: {
        [playerIndex: number]: PlayerFrameCriteriaType;
    };
    followers?: {
        [playerIndex: number]: PlayerFrameCriteriaType;
    };
};

export type PlayerFrameCriteriaType = {
    pre?: PreFrameUpdateCriteriaType;
    post?: PostFrameUpdateCriteriaType;
};

export type PreFrameUpdateCriteriaType = {
    frame?: Range<PreFrameUpdateType["frame"]>;
    playerIndex?: Range<PreFrameUpdateType["playerIndex"]>;
    isFollower?: Set<PreFrameUpdateType["isFollower"]>;
    seed?: Range<PreFrameUpdateType["seed"]>;
    actionStateId?: Range<PreFrameUpdateType["actionStateId"]>;
    positionX?: Range<PreFrameUpdateType["positionX"]>;
    positionY?: Range<PreFrameUpdateType["positionY"]>;
    facingDirection?: Range<PreFrameUpdateType["facingDirection"]>;
    joystickX?: Range<PreFrameUpdateType["joystickX"]>;
    joystickY?: Range<PreFrameUpdateType["joystickY"]>;
    cStickX?: Range<PreFrameUpdateType["cStickX"]>;
    cStickY?: Range<PreFrameUpdateType["cStickY"]>;
    trigger?: Range<PreFrameUpdateType["trigger"]>;
    buttons?: Range<PreFrameUpdateType["buttons"]>;
    physicalButtons?: Range<PreFrameUpdateType["physicalButtons"]>;
    physicalLTrigger?: Range<PreFrameUpdateType["physicalLTrigger"]>;
    physicalRTrigger?: Range<PreFrameUpdateType["physicalRTrigger"]>;
    percent?: Range<PreFrameUpdateType["percent"]>;
};

export type PostFrameUpdateCriteriaType = {
    frame?: Range<PostFrameUpdateType["frame"]>;
    playerIndex?: Range<PostFrameUpdateType["playerIndex"]>;
    isFollower?: Set<PostFrameUpdateType["isFollower"]>;
    internalCharacterId?: Range<PostFrameUpdateType["internalCharacterId"]>;
    actionStateId?: Range<PostFrameUpdateType["actionStateId"]>;
    positionX?: Range<PostFrameUpdateType["positionX"]>;
    positionY?: Range<PostFrameUpdateType["positionY"]>;
    facingDirection?: Range<PostFrameUpdateType["facingDirection"]>;
    percent?: Range<PostFrameUpdateType["percent"]>;
    shieldSize?: Range<PostFrameUpdateType["shieldSize"]>;
    lastAttackLanded?: Range<PostFrameUpdateType["lastAttackLanded"]>;
    currentComboCount?: Range<PostFrameUpdateType["currentComboCount"]>;
    lastHitBy?: Range<PostFrameUpdateType["lastHitBy"]>;
    stocksRemaining?: Range<PostFrameUpdateType["stocksRemaining"]>;
    actionStateCounter?: Range<PostFrameUpdateType["actionStateCounter"]>;
    lCancelStatus?: Range<PostFrameUpdateType["lCancelStatus"]>;
};

export type GameCriteriaType = {
    slpVersion?: Set<GameStartType["slpVersion"]>;
    stageId?: Set<GameStartType["stageId"]>;
    players?: PlayerCriteriaType[];
    isTeams?: Set<GameStartType["isTeams"]>;
    isPAL?: Set<GameStartType["isPAL"]>;
};

export type PlayerCriteriaType = {
    playerIndex?: Set<PlayerType["playerIndex"]>;
    port?: Set<PlayerType["port"]>;
    characterId?: Set<PlayerType["characterId"]>;
    characterColor?: Set<PlayerType["characterColor"]>;
    startStocks?: Range<PlayerType["startStocks"]>;
    finalStocks?: Range<PlayerType["startStocks"]>;
    type?: Set<PlayerType["type"]>;
    teamId?: Set<PlayerType["teamId"]>;
    controllerFix?: Set<PlayerType["controllerFix"]>;
    nametag?: Set<PlayerType["nametag"]>;
};

// slp-parser-js
// TODO: Get from GameStartType

export type PlayerType = {
    playerIndex: number;
    port: number;
    characterId: number | null;
    characterColor: number | null;
    startStocks: number | null;
    type: number | null;
    teamId: number | null;
    controllerFix: string | null;
    nametag: string | null;
};
