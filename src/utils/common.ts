import _ from "lodash";
import SlippiGame from "slp-parser-js";

export function sortedFrames(game: SlippiGame) {
  const frames = game.getFrames();
  return _.orderBy(frames, "frame");
}

export class NumberRange {
  start: number;
  end: number;
  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  has(arg: number) {
    return (this.start <= arg && arg <= this.end);
  }
}
