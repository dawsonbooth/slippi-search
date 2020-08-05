import SlippiGame, {
  FrameEntryType,
  PreFrameUpdateType,
  PostFrameUpdateType
} from "@slippi/slippi-js";
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

/**
 * Find out if player matches the given criteria
 *
 * @param player [[PlayerType]] object that will be checked
 * @param criteria Criteria with required player attributes
 */
export function isValidPlayer(
  player: PlayerType,
  criteria: PlayerCriteriaType
): boolean {
  for (const key in criteria) {
    if (!new CriteriaSet(criteria[key]).has(player[key])) return false;
  }
  return true;
}

/**
 * Find out if game matches the given criteria
 *
 * @param game [SlippiGame](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/SlippiGame.ts#L19-L180) object that will be checked
 * @param criteria Criteria with required game attributes
 */
export function isValidGame(
  game: SlippiGame,
  criteria: GameCriteriaType
): boolean {
  const gameSettings = game.getSettings();
  for (const key in criteria) {
    if (key === "players") {
      for (const critPlayer of criteria.players) {
        let playerFound = false;
        for (const player of gameSettings.players) {
          if (isValidPlayer(player, critPlayer)) {
            playerFound = true;
            break;
          }
        }
        if (!playerFound) return false;
      }
    } else if (!new CriteriaSet(criteria[key]).has(gameSettings[key]))
      return false;
  }
  return true;
}

/**
 * Find out if preframe update matches the given criteria
 *
 * @param pre [[PreFrameUpdateType]] object that will be checked
 * @param criteria Criteria with required preframe attributes
 */
export function isValidPreFrameUpdate(
  pre: PreFrameUpdateType,
  criteria: PreFrameUpdateCriteriaType
): boolean {
  for (const key in criteria) {
    if (!new CriteriaSet(criteria[key]).has(pre[key])) return false;
  }
  return true;
}

/**
 * Find out if postframe update matches the given criteria
 *
 * @param post [[PostFrameUpdateType]] object that will be checked
 * @param criteria Criteria with required postframe attributes
 */
export function isValidPostFrameUpdate(
  post: PostFrameUpdateType,
  criteria: PostFrameUpdateCriteriaType
): boolean {
  for (const key in criteria) {
    if (!new CriteriaSet(criteria[key]).has(post[key])) return false;
  }
  return true;
}

/**
 * Find out if player frame matches the given criteria
 *
 * @param playerFrame Player frame object that will be checked
 * @param criteria Criteria with required player frame attributes
 */
export function isValidPlayerFrame(
  playerFrame: {
    pre: PreFrameUpdateType;
    post: PostFrameUpdateType;
  },
  criteria: PlayerFrameCriteriaType
): boolean {
  return (
    isValidPreFrameUpdate(playerFrame.pre, criteria.pre) &&
    isValidPostFrameUpdate(playerFrame.post, criteria.post)
  );
}

/**
 * Find out if frame matches the given criteria
 *
 * @param frame [FrameEntryType](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/stats/common.ts#L4-L15) object that will be checked
 * @param criteria Criteria with required frame attributes
 */
export function isValidFrame(
  frame: FrameEntryType,
  criteria: FrameCriteriaType
): boolean {
  if (criteria.frame && !new CriteriaSet(criteria.frame).has(frame.frame))
    return false;
  if (criteria.players) {
    for (const critPlayerFrame of criteria.players) {
      let playerFound = false;
      for (const playerFrameIndex in frame.players) {
        const playerFrame = frame.players[playerFrameIndex];
        if (isValidPlayerFrame(playerFrame, critPlayerFrame)) {
          playerFound = true;
          break;
        }
      }
      if (!playerFound) return false;
    }
  }
  if (criteria.followers) {
    for (const critFollowerFrame of criteria.followers) {
      let followerFound = false;
      for (const followerFrameIndex in frame.followers) {
        const followerFrame = frame.followers[followerFrameIndex];
        if (isValidPlayerFrame(followerFrame, critFollowerFrame)) {
          followerFound = true;
          break;
        }
      }
      if (!followerFound) return false;
    }
  }
  return true;
}

/**
 * Perform some function with an iterable of [SlippiGame](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/SlippiGame.ts#L19-L180)
 * games that fit some given criteria
 *
 * @param games An iterable of [SlippiGame](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/SlippiGame.ts#L19-L180) games
 * @param criteria Criteria with required game attributes
 * @param callback Callback function to be called with each matching game
 */
export function withMatchingGames(
  games: Iterable<SlippiGame>,
  criteria: GameCriteriaType,
  callback: (game: SlippiGame) => void
): void {
  for (const game of games) {
    if (isValidGame(game, criteria)) {
      callback(game);
    }
  }
}

/**
 * Perform some function with an iterable of [FrameEntryType](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/stats/common.ts#L4-L15)
 * frames that fit some given criteria
 *
 * @param frames An iterable of [FrameEntryType](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/stats/common.ts#L4-L15) frames
 * @param criteria Criteria with required frame attributes
 * @param callback Callback function to be called with each matching frame
 */
export function withMatchingFrames(
  frames: Iterable<FrameEntryType>,
  criteria: FrameCriteriaType,
  callback: (frame: FrameEntryType) => void
): void {
  for (const frame of frames) {
    if (isValidFrame(frame, criteria)) {
      callback(frame);
    }
  }
}

/**
 * Filter for all the matching games from a [SlippiGame](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/SlippiGame.ts#L19-L180) iterable
 *
 * @param games An iterable of [SlippiGame](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/SlippiGame.ts#L19-L180) games
 * @param criteria Criteria with required game attributes
 */
export function getMatchingGames(
  games: Iterable<SlippiGame>,
  criteria: GameCriteriaType
): SlippiGame[] {
  return [...games].filter(game => isValidGame(game, criteria));
}

/**
 * Filter for all the matching frames from a [FrameEntryType](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/stats/common.ts#L4-L15) iterable
 *
 * @param frames An iterable of [FrameEntryType](https://github.com/project-slippi/@slippi/slippi-js/blob/master/src/stats/common.ts#L4-L15) frames
 * @param criteria Criteria with required frame attributes
 */
export function getMatchingFrames(
  frames: FrameEntryType[],
  criteria: FrameCriteriaType
): FrameEntryType[] {
  return [...frames].filter(frame => isValidFrame(frame, criteria));
}
