# `slippi-search`

[![npm version](http://img.shields.io/npm/v/slippi-search.svg?style=flat)](https://npmjs.org/package/slippi-search "View this project on npm")
[![downloads](http://img.shields.io/npm/dt/slippi-search.svg?style=flat)](https://npmjs.org/package/slippi-search)
[![downloads](http://img.shields.io/npm/l/slippi-search.svg?style=flat)](https://github.com/dawsonbooth/slippi-search/blob/master/LICENSE)

# Description

This Node.js package is a collection of useful functions for searching through and filtering Slippi Replays.

# Installation

With [Node.js](https://nodejs.org/en/download/) installed, simply run the following command to add the package to your project.

```bash
npm install slippi-search
```

This will also add Project Slippi's [slp-parser-js](https://github.com/project-slippi/slp-parser-js) as a dependency.

# Usage

1. Create a fresh directory on your disk
2. Inside this new directory, create a file called `script.js`
3. Fill the `script.js` file with the following contents:

```js
const {
    withGamesFromDir,
    isValidGame,
    withMatchingFrames
} = require("slippi-search");

// Define criteria
const gameCriteria = {
    isTeams: [false],
    isPAL: [true, false] // Can also just be omitted
};

const frameCriteria = {
    players: [
        {
            post: {
                playerIndex: [1],
                percent: [20]
            }
        }
    ]
};

// With each game in the directory
withGamesFromDir("replays", game => {
    // Check that game matches criteria
    if (isValidGame(game, gameCriteria)) {
        // With frames that match criteria
        withMatchingFrames(sortedFrames(game), frameCriteria, frame => {
            // Print information about the frame
            console.log(frame);
        });
    }
});
```

4. Change the "replays" path to some directory that holds some of your slp files.
5. Browse to the directory from the command line and run the command: `npm install slippi-search`. This should create a `node_modules` directory in the folder.
6. Run the command: `node script.js`. This will run the script above to search through and print data about the replay files that met the criteria in that directory.

# License

This software is released under the terms of [MIT license](LICENSE).
