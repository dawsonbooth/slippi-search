# `slippi-search`

[![npm version](http://img.shields.io/npm/v/slippi-search.svg?style=flat)](https://npmjs.org/package/slippi-search "View this project on npm")
[![downloads](http://img.shields.io/npm/dt/slippi-search.svg?style=flat)](https://npmjs.org/package/slippi-search)
[![build status](https://github.com/dawsonbooth/slippi-search/workflows/build/badge.svg)](https://github.com/dawsonbooth/slippi-search/actions?workflow=build)
[![license](http://img.shields.io/npm/l/slippi-search.svg?style=flat)](https://github.com/dawsonbooth/slippi-search/blob/master/LICENSE)

# Description

This Node.js package is a collection of useful functions for searching through and filtering [Slippi](https://github.com/project-slippi/project-slippi) replays.

# Installation

With [Node.js](https://nodejs.org/en/download/) installed, simply run the following command to add the package to your project.

```bash
npm install slippi-search
```

This will also add Project Slippi's [@slippi/slippi-js](https://github.com/project-slippi/slippi-js) as a dependency.

# Usage

See some [working examples](https://github.com/dawsonbooth/slippi-search/tree/master/examples), or [check out the docs](https://dawsonbooth.github.io/slippi-search/).

## Example

1. Create a fresh directory on your disk
2. Inside this new directory, create a file called `search.js`
3. Fill the `search.js` file with the following contents:

```js
const {
    withGamesFromDir,
    isValidGame,
    withMatchingFrames,
    sortedFrames
} = require("slippi-search");
const { stages } = require("@slippi/slippi-js");

// Define game criteria
const gameCriteria = {
    stageId: [stages.STAGE_BATTLEFIELD, stages.STAGE_DREAM_LAND],
    players: [
        {
            characterId: [0, 20] // Captain Falcon, Falco
        },
        {
            characterId: [19] // Sheik
        }
    ],
    isPAL: [false, true], // Can also just omit
    isTeams: [false]
};

// Define frame criteria
const frameCriteria = {
    players: [
        {
            pre: {
                playerIndex: [1],
                percent: [[10, 20]], // Between 10 and 20 percent
                facingDirection: [-1]
            }
        }
    ]
};

const validGames = [];
const validFrames = [];

// With each game in the directory
withGamesFromDir("replays", game => {
    // Check that game matches criteria
    if (isValidGame(game, gameCriteria)) {
        validGames.push(game);

        // With each frame that matches criteria
        withMatchingFrames(sortedFrames(game), frameCriteria, frame => {
            validFrames.push(frame);

            // Print info about players in frame
            console.log(frame.players);
        });
    }
});
```

4. Change the "replays" path to some directory that holds some of your slp files.
5. Browse to the directory from the command line and run the command: `npm install slippi-search`. This should create a `node_modules` directory in the folder.
6. Run the command: `node search.js`. This will run the script above to search through and print data about the replay files that met the criteria in that directory.

# License

This software is released under the terms of [MIT license](LICENSE).
