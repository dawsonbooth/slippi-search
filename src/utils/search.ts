import SlippiGame from "slp-parser-js";


export function isValidGame(
    game: SlippiGame,
    criteria: GameCriteriaType
  ): boolean {
    const gameSettings = game.getSettings()!;
    if (criteria.stageId && !criteria.stageId.has(gameSettings.stageId))
      return false;
    return true;
  }
  
  export function isValidFrame(
    frame: FrameEntryType,
    criteria: FrameCriteriaType
  ) {
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
    const found = new Array<SlippiGame>();
    withMatchingGames(games, criteria, (game: SlippiGame) => found.push(game));
    return found;
  }
  
  export function getMatchingFrames(
    frames: Array<FrameEntryType>,
    criteria: FrameCriteriaType
  ) {
    const found = new Array<FrameEntryType>();
    withMatchingFrames(frames, criteria, (frame: FrameEntryType) => found.push(frame));
    return found;
  }
  