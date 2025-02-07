let config = require('../../configs/defaults.js');
const {asteroids} = require('../server');


function update(boss, players) {
  move(boss, players);
  updateShooting(boss);
  hitAsteroid(boss);
  processHittingPlayers(boss,players);
}


function move(boss, players) {

  let player = players[0];

  if (player) {
    let speed = 1;

    let distanceX = Math.abs(boss.x - player.x);
    let distanceY = Math.abs(boss.y - player.y);

    if (distanceX + distanceY > 1400) {
      if (boss.x > player.x) {
        boss.x -= speed;
      } else {
        boss.x += speed;
      }

      if (boss.y > player.y) {
        boss.y -= speed;
      } else {
        boss.y += speed;
      }
    }


    setAngle(player, boss);
  }
}

function setAngle(player, boss) {
  let playerAngle = Math.atan2(player.y - boss.y, player.x - boss.x);
  var dtheta = playerAngle - boss.angle;
  if (dtheta > Math.PI) {
    boss.angle += 2 * Math.PI;
  } else if (dtheta < -Math.PI) {
    boss.angle -= 2 * Math.PI;
  }
  boss.angle += (playerAngle - boss.angle) * 0.02;
}

function updateShooting(boss) {
  boss.update();
}

function hitAsteroid(boss) {

  // need to respawn asteroid


  // for (let i = asteroids.length - 1; i >= 0; i--) {
  //   let asteroid = asteroids[i];
  //   if (Math.abs(asteroid.x - boss.x) < 500 && Math.abs(asteroid.y - boss.y) < 500) {
  //     asteroids.splice(i, 1);
  //   }
  // }
}


function processHittingPlayers(boss,players) {
  let destinationX = boss.x + 1500 * Math.cos(boss.angle);
  let destinationY = boss.y + 1500 * Math.sin(boss.angle);

  if (boss.isLaser) {
    for (let player of players) {
      processHittingPlayer(player, boss, destinationX, destinationY);
    }
  }
}


function processHittingPlayer(player, boss, destinationX, destinationY) {
  if (isWithinLaserX(player, boss, destinationX)) {
    if (isWithinLaserY(player, boss, destinationY)) {
      player.shield -= 1;
    }
  }
}

function isWithinLaserX(player, boss, destinationX) {
  return player.x < boss.x && player.x > destinationX || player.x > boss.x && player.x < destinationX;
}

function isWithinLaserY(player, boss, destinationY) {
  return player.y < boss.y && player.y > destinationY || player.y > boss.y && player.y < destinationY;
}


module.exports = {
  move,
  update
};
