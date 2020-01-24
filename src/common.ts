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

class Range<E> {
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

type Criterion<E> = (E | E[])[];

export class CriteriaSet<E> {
    ranges: Range<E>[] = new Array<Range<E>>();
    values: Set<E> = new Set<E>();

    constructor(args: Criterion<E>) {
        if (args === undefined) return;

        for (let arg of args) {
            if (arg instanceof Array) {
                if (arg.length !== 2) {
                    throw new Error("Range item must have length of 2");
                }
                this.ranges.push(new Range(arg[0], arg[1]));
            } else {
                this.values.add(arg);
            }
        }
    }

    has(arg: E) {
        if (this.values.has(arg)) return true;
        for (let range of this.ranges) if (range.has(arg)) return true;
        return false;
    }
}

export type FrameCriteriaType = {
    frame?: Criterion<FrameEntryType["frame"]>;
    players?: PlayerFrameCriteriaType[];
    followers?: PlayerFrameCriteriaType[];
};

export type PlayerFrameCriteriaType = {
    pre?: PreFrameUpdateCriteriaType;
    post?: PostFrameUpdateCriteriaType;
};

export type PreFrameUpdateCriteriaType = {
    frame?: Criterion<PreFrameUpdateType["frame"]>;
    playerIndex?: Criterion<PreFrameUpdateType["playerIndex"]>;
    isFollower?: Criterion<PreFrameUpdateType["isFollower"]>;
    seed?: Criterion<PreFrameUpdateType["seed"]>;
    actionStateId?: Criterion<PreFrameUpdateType["actionStateId"]>;
    positionX?: Criterion<PreFrameUpdateType["positionX"]>;
    positionY?: Criterion<PreFrameUpdateType["positionY"]>;
    facingDirection?: Criterion<PreFrameUpdateType["facingDirection"]>;
    joystickX?: Criterion<PreFrameUpdateType["joystickX"]>;
    joystickY?: Criterion<PreFrameUpdateType["joystickY"]>;
    cStickX?: Criterion<PreFrameUpdateType["cStickX"]>;
    cStickY?: Criterion<PreFrameUpdateType["cStickY"]>;
    trigger?: Criterion<PreFrameUpdateType["trigger"]>;
    buttons?: Criterion<PreFrameUpdateType["buttons"]>;
    physicalButtons?: Criterion<PreFrameUpdateType["physicalButtons"]>;
    physicalLTrigger?: Criterion<PreFrameUpdateType["physicalLTrigger"]>;
    physicalRTrigger?: Criterion<PreFrameUpdateType["physicalRTrigger"]>;
    percent?: Criterion<PreFrameUpdateType["percent"]>;
};

export type PostFrameUpdateCriteriaType = {
    frame?: Criterion<PostFrameUpdateType["frame"]>;
    playerIndex?: Criterion<PostFrameUpdateType["playerIndex"]>;
    isFollower?: Criterion<PostFrameUpdateType["isFollower"]>;
    internalCharacterId?: Criterion<PostFrameUpdateType["internalCharacterId"]>;
    actionStateId?: Criterion<PostFrameUpdateType["actionStateId"]>;
    positionX?: Criterion<PostFrameUpdateType["positionX"]>;
    positionY?: Criterion<PostFrameUpdateType["positionY"]>;
    facingDirection?: Criterion<PostFrameUpdateType["facingDirection"]>;
    percent?: Criterion<PostFrameUpdateType["percent"]>;
    shieldSize?: Criterion<PostFrameUpdateType["shieldSize"]>;
    lastAttackLanded?: Criterion<PostFrameUpdateType["lastAttackLanded"]>;
    currentComboCount?: Criterion<PostFrameUpdateType["currentComboCount"]>;
    lastHitBy?: Criterion<PostFrameUpdateType["lastHitBy"]>;
    stocksRemaining?: Criterion<PostFrameUpdateType["stocksRemaining"]>;
    actionStateCounter?: Criterion<PostFrameUpdateType["actionStateCounter"]>;
    lCancelStatus?: Criterion<PostFrameUpdateType["lCancelStatus"]>;
};

export type GameCriteriaType = {
    slpVersion?: Criterion<GameStartType["slpVersion"]>;
    stageId?: Criterion<GameStartType["stageId"]>;
    players?: PlayerCriteriaType[];
    isTeams?: Criterion<GameStartType["isTeams"]>;
    isPAL?: Criterion<GameStartType["isPAL"]>;
};

export type PlayerCriteriaType = {
    playerIndex?: Criterion<PlayerType["playerIndex"]>;
    port?: Criterion<PlayerType["port"]>;
    characterId?: Criterion<PlayerType["characterId"]>;
    characterColor?: Criterion<PlayerType["characterColor"]>;
    startStocks?: Criterion<PlayerType["startStocks"]>;
    finalStocks?: Criterion<PlayerType["startStocks"]>;
    type?: Criterion<PlayerType["type"]>;
    teamId?: Criterion<PlayerType["teamId"]>;
    controllerFix?: Criterion<PlayerType["controllerFix"]>;
    nametag?: Criterion<PlayerType["nametag"]>;
};

// slp-parser-js
export type PlayerType = GameStartType["players"][0];
