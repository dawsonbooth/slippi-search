/* Credit to https://github.com/mtimkovich/slippi-renamer for most of this script! */
/* Let this example serve as a slippi-search alternative for the above */
/* Run a `git diff` to see the changes that were made and just how flexible slippi-search can be! */

const fs = require('fs');
const path = require('path');
const slp = require('slp-parser-js');
const { default: SlippiGame } = require('slp-parser-js');
const { withGamesFromDir } = require('slippi-search');

/** Returns character with their tag or color in parentheses (if they have either). */
function playerName(player) {
  const character = slp.characters.getCharacterName(player.characterId);
  const color = slp.characters.getCharacterColorName(player.characterId, player.characterColor);

  if (player.nametag) {
    return `${character} (${player.nametag})`;
  } else if (color !== 'Default') {
    return `${character} (${color})`;
  }

  return character;
}

function prettyPrint(settings) {
  let player1;
  let player2;

  if (settings.isTeams) {
    let teams = {};
    for (const player of settings.players) {
      if (!(player.teamId in teams)) {
        teams[player.teamId] = [];
      }
      teams[player.teamId].push(playerName(player));
    }

    // Something's wrong with this teams game.
    if (teams.length !== 2) {
      return null;
    }

    player1 = teams[0].join(' & ');
    player2 = teams[1].join(' & ');
  } else {
    player1 = playerName(settings.players[0]);
    player2 = playerName(settings.players[1]);
  }

  return `${player1} vs ${player2} - ${slp.stages.getStageName(settings.stageId)}`;
}

function parsedFilename(settings, file) {
  const dateRegex = file.match('_([^\.]+)');

  if (!dateRegex) {
    return null;
  }

  const pretty = prettyPrint(settings);
  if (!pretty) {
    return null;
  }

  return `${dateRegex[1]} - ${pretty}.slp`
}

withGamesFromDir(
    "replays",
    game => {
        const filePath = game.getFilePath();
        const dir = path.dirname(filePath);
        const file = path.basename(filePath);

        const settings = game.getSettings();

        const newName = parsedFilename(settings, file);
        if (!newName) {
            console.log(`Error parsing '${file}'`);
            return;
        }

        const newPath = path.join(dir, newName);
        console.log(`${filePath} -> ${newPath}`);

        fs.rename(filePath, newPath, err => {
            if (err) {
                console.log(`Error renaming ${filePath}: ${err}`);
            }
        });
    },
    true
);
