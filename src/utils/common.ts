import _ from "lodash";
import SlippiGame from "slp-parser-js";

export function sortedFrames(game: SlippiGame) {
  const frames = game.getFrames();
  return _.orderBy(frames, "frame");
}
