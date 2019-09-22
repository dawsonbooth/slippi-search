type GameCriteriaType = {
  stageId: Set<GameSettingsType["stageId"]>;
  isTeams: Set<GameSettingsType["isTeams"]>;
  players: GameSettingsType["players"]; // FIXME
  isPAL: Set<GameSettingsType["isPAL"]>;
};

type FrameCriteriaType = {};


// slp-parser-js typedefs

type FrameEntryType = {
  frame: number;
  players: {
    [playerIndex: number]: {
      pre: PreFrameUpdateType;
      post: PostFrameUpdateType;
    };
  };
};

type SlpReadInput = {
  source: string;
  filePath?: string;
  buffer?: Buffer;
};

type SlpRefType = {
  source: string;
  fileDescriptor?: number;
  buffer?: Buffer;
};

type SlpFileType = {
  ref: SlpRefType;
  rawDataPosition: number;
  rawDataLength: number;
  metadataPosition: number;
  metadataLength: number;
  messageSizes: { [command: number]: number };
};

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
  isTeams: boolean | null;
  isPAL: boolean | null;
  stageId: number | null;
  players: PlayerType[];
};

type PreFrameUpdateType = {
  frame: number | null;
  playerIndex: number | null;
  isFollower: boolean | null;
  seed: number | null;
  actionStateId: number | null;
  positionX: number | null;
  positionY: number | null;
  facingDirection: number | null;
  joystickX: number | null;
  joystickY: number | null;
  cStickX: number | null;
  cStickY: number | null;
  trigger: number | null;
  buttons: number | null;
  physicalButtons: number | null;
  physicalLTrigger: number | null;
  physicalRTrigger: number | null;
  percent: number | null;
};

type PostFrameUpdateType = {
  frame: number | null;
  playerIndex: number | null;
  isFollower: boolean | null;
  internalCharacterId: number | null;
  actionStateId: number | null;
  positionX: number | null;
  positionY: number | null;
  facingDirection: number | null;
  percent: number | null;
  shieldSize: number | null;
  lastAttackLanded: number | null;
  currentComboCount: number | null;
  lastHitBy: number | null;
  stocksRemaining: number | null;
  actionStateCounter: number | null;
};

type GameEndType = {
  gameEndMethod: number | null;
  lrasInitiatorIndex: number | null;
};

type MetadataType = {
  startAt: string | null | void;
  playedOn: string | null | void;
  lastFrame: number | null | void;
  players: {
    [playerIndex: number]: {
      characters: {
        [internalCharacterId: number]: number;
      };
    } | null | void;
  };
};

type GameSettingsType = {
  stageId: number;
  isTeams: boolean;
  players: PlayerType[];
  isPAL: boolean;
};

type FramesType = {
  [frameIndex: number]: FrameEntryType;
};

type StatsType = {
  gameComplete: boolean;
  lastFrame: number;
  playableFrameCount: number;
  stocks: StockType[];
  conversions: ConversionType[];
  combos: ComboType[];
  actionCounts: ActionCountsType[];
  overall: OverallType[];
};

type EventPayloadTypes =
  | GameStartType
  | PreFrameUpdateType
  | PostFrameUpdateType
  | GameEndType;

type EventCallbackFunc = (
  command: number,
  payload: EventPayloadTypes | null | void
) => boolean;

type RatioType = {
  count: number;
  total: number;
  ratio: number | null;
};

type PlayerIndexedType = {
  playerIndex: number;
  opponentIndex: number;
};

type DurationType = {
  startFrame: number;
  endFrame: number | null | void;
};

type DamageType = {
  startPercent: number;
  currentPercent: number;
  endPercent: number | null | void;
};

type StockType = PlayerIndexedType &
  DurationType &
  DamageType & {
    count: number;
    deathAnimation: number | null | void;
  };

type MoveLandedType = {
  frame: number;
  moveId: number;
  hitCount: number;
  damage: number;
};

type ConversionType = PlayerIndexedType &
  DurationType &
  DamageType & {
    moves: MoveLandedType[];
    openingType: string;
    didKill: boolean;
  };

type ComboType = PlayerIndexedType &
  DurationType &
  DamageType & {
    moves: MoveLandedType[];
    didKill: boolean;
  };

type ActionCountsType = PlayerIndexedType & {
  wavedashCount: number;
  wavelandCount: number;
  airDodgeCount: number;
  dashDanceCount: number;
  spotDodgeCount: number;
  rollCount: number;
};

type OverallType = PlayerIndexedType & {
  inputCount: number;
  conversionCount: number;
  totalDamage: number;
  killCount: number;
  successfulConversions: RatioType;
  inputsPerMinute: RatioType;
  openingsPerKill: RatioType;
  damagePerOpening: RatioType;
  neutralWinRatio: RatioType;
  counterHitRatio: RatioType;
  beneficialTradeRatio: RatioType;
};
