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
): boolean {
  for (const key in criteria) {
    if (!new CriteriaSet(criteria[key]).has(player[key])) return false;
  }
  return true;
}

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

export function isValidPreFrameUpdate(
  pre: PreFrameUpdateType,
  criteria: PreFrameUpdateCriteriaType
): boolean {
  for (const key in criteria) {
    if (!new CriteriaSet(criteria[key]).has(pre[key])) return false;
  }
  return true;
}

export function isValidPostFrameUpdate(
  post: PostFrameUpdateType,
  criteria: PostFrameUpdateCriteriaType
): boolean {
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
): boolean {
  return (
    isValidPreFrameUpdate(playerFrame.pre, criteria.pre) &&
    isValidPostFrameUpdate(playerFrame.post, criteria.post)
  );
}

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

export function getMatchingGames(
  games: Iterable<SlippiGame>,
  criteria: GameCriteriaType
): Array<SlippiGame> {
  return Array.from(games).filter(game => isValidGame(game, criteria));
}

export function getMatchingFrames(
  frames: FrameEntryType[],
  criteria: FrameCriteriaType
): Array<FrameEntryType> {
  return Array.from(frames).filter(frame => isValidFrame(frame, criteria));
}
