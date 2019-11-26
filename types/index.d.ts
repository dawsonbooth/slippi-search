type GameCriteriaType = {
    stageId?: Set<GameStartType["stageId"]>;
    players?: PlayerCriteriaType[];
    isTeams?: Set<GameStartType["isTeams"]>;
    isPAL?: Set<GameStartType["isPAL"]>;
};

type FrameCriteriaType = {};

type PlayerCriteriaType = {
    playerIndex?: Set<PlayerType["playerIndex"]>;
    port?: Set<PlayerType["port"]>;
    characterId?: Set<PlayerType["characterId"]>;
    characterColor?: Set<PlayerType["characterColor"]>;
    startStocks?: NumberRange<PlayerType["startStocks"]>;
    finalStocks?: NumberRange<PlayerType["startStocks"]>;
    type?: Set<PlayerType["type"]>;
    teamId?: Set<PlayerType["teamId"]>;
    controllerFix?: Set<PlayerType["controllerFix"]>;
    nametag?: Set<PlayerType["nametag"]>;
};

type NumberRange<E> = {
    start: number;
    end: number;
};

// slp-parser-js

type PlayerType = {
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

type GameStartType = {
    slpVersion: string | null;
    isTeams: boolean | null;
    isPAL: boolean | null;
    stageId: number | null;
    players: PlayerType[];
};
