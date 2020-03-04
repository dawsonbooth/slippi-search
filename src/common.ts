import _ from "lodash";
import SlippiGame, {
  FrameEntryType,
  GameStartType,
  PreFrameUpdateType,
  PostFrameUpdateType
} from "slp-parser-js";

/**
 * Sort frames from given [SlippiGame](https://github.com/project-slippi/slp-parser-js/blob/master/src/SlippiGame.ts#L19-L180) game
 *
 * @param game [SlippiGame](https://github.com/project-slippi/slp-parser-js/blob/master/src/SlippiGame.ts#L19-L180) game to get frames from
 */
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

  has(arg: E): boolean {
    return this.start <= arg && arg <= this.end;
  }
}

export type Criterion<P> = (P | P[])[];

type Criteria<T> = {
  [P in keyof T]?: Criterion<T[P]>;
};

export class CriteriaSet<P> {
  ranges: Range<P>[];
  values: Set<P>;

  constructor(args: Criterion<P>) {
    if (args === undefined) return;

    const ranges = [];
    const values = new Set<P>();

    for (const arg of args) {
      if (arg instanceof Array) {
        if (arg.length !== 2) {
          throw new TypeError("Range item must have length of 2");
        }
        ranges.push(new Range(arg[0], arg[1]));
      } else {
        values.add(arg);
      }
    }

    this.ranges = ranges;
    this.values = values;
  }

  has(arg: P): boolean {
    if (this.values.has(arg)) return true;
    for (const range of this.ranges) if (range.has(arg)) return true;
    return false;
  }
}

export type FrameCriteriaType = Omit<
  Criteria<FrameEntryType>,
  "players" | "followers"
> & {
  players?: PlayerFrameCriteriaType[];
  followers?: PlayerFrameCriteriaType[];
};

export type PlayerFrameCriteriaType = {
  pre?: PreFrameUpdateCriteriaType;
  post?: PostFrameUpdateCriteriaType;
};

export type PreFrameUpdateCriteriaType = Criteria<PreFrameUpdateType>;

export type PostFrameUpdateCriteriaType = Criteria<PostFrameUpdateType>;

export type GameCriteriaType = Omit<Criteria<GameStartType>, "players"> & {
  players?: PlayerCriteriaType[];
};

export type PlayerCriteriaType = Criteria<PlayerType>;

// slp-parser-js
export type PlayerType = GameStartType["players"][number];
