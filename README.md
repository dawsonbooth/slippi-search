# `slippi-search`

[![npm version](http://img.shields.io/npm/v/slippi-search.svg?style=flat)](https://npmjs.org/package/slippi-search "View this project on npm")

# Description

This Node.js package is a collection of useful functions for searching through and filtering Slippi Replays.

# Installation

With Node.js installed (https://nodejs.org/en/download/), simply run the following command to add the package to your project.

```bash
npm install slippi-search
```

This will also add Project Slippi's <a href="https://github.com/project-slippi/slp-parser-js">slp-parser-js</a> as a dependency.

# Usage

1. Create a fresh directory on your disk
2. Inside this new directory, create a file called `script.js`
3. Fill the `script.js` file with the following contents:

```js
const { withGamesFromDir, isValidGame } = require("slippi-search");
const { stages } = require("slp-parser-js");

// Define game criteria
const criteria = {
    stageId: new Set([stages.STAGE_FD, stages.STAGE_DREAM_LAND]),
    isTeams: new Set([false]),
    isPAL: new Set([true, false]) // Can also just be omitted
};

// With each game in the directory
withGamesFromDir("replays", game => {
    // Check that game matches criteria
    if (isValidGame(game, criteria)) {
        // From slp-parser-js README (https://github.com/project-slippi/slp-parser-js)
        // Get game settings – stage, characters, etc
        const settings = game.getSettings();
        console.log(settings);

        // Get metadata - start time, platform played on, etc
        const metadata = game.getMetadata();
        console.log(metadata);

        // Get computed stats - openings / kill, conversions, etc
        const stats = game.getStats();
        console.log(stats);

        // Get frames – animation state, inputs, etc
        // This is used to compute your own stats or get more frame-specific info (advanced)
        const frames = game.getFrames();
        console.log(frames[0].players); // Print frame when timer starts counting down
    }
});
```

4. Change the "replays" path to some directory that holds some of your slp files.
5. Browse to the directory from the command line and run the command: `npm install slippi-search`. This should create a `node_modules` directory in the folder.
6. Run the command: `node script.js`. This will run the script above to search through and print data about the replay files that met the criteria in that directory.
