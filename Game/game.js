//canvas setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", { alpha: false });

//sets canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//global variables
let score = 0;
let lives = 10;
let up = false;
let down = false;
let spawn = false;
let currentlyPlaying = false;
let immunity = false;
let speedTimerVar = 0;
let hits = 130;
let bossStatus = false;
let bossSpawned = false;
let damageTimerVar = 0;
let damage = 50;
let slownessTimerVar = 0;
let allyCount = 0;
let blocker1 = 0;

//dom variables
let scoreHTML = document.getElementById("score");
let livesHTML = document.getElementById("lives");
const startGameButton = document.getElementById("startgamebtn");
const gameOverModal = document.getElementById("gameovermodal");
let pointsHTML = document.getElementById("points");
let pausePointsHTML = document.getElementById("pausepoints");
let puaseLivesHTML = document.getElementById("pauselives");
const playGameButton = document.getElementById("playgamebtn");
const pauseGameModal = document.getElementById("pausegamemodal");
const pauseButton = document.getElementById("pausebutton");

//player variables
let playerX = 100;
let playerY = 100;
let playerWidth = 100;
let playerHeight = 100;
let playerColor = "red";
let playerSpeed = 12;
let playerAmmo = 50;
//bullet variables
let bulletRadius = 5;
let bulletColor = "white";
let bulletSpeed = 20;
//ally variables
let allyX;
let allyY;
let allyWidth;
let allyHeight;
let allyColor;
let allyHealth;
let allyfireRate;
let allyLevel;
//enemy variables
let enemyX;
let enemyY;
let enemyRadius;
let enemyColor;
let enemySpeed;
let enemyHealth;
//big enemy variables
let bigenemyX;
let bigenemyY;
let bigenemyRadius;
let bigenemyColor;
let bigenemySpeed;
let bigenemyHealth;
//fast enemy variables
let fastenemyX;
let fastenemyY;
let fastenemyRadius;
let fastenemyColor;
let fastenemySpeed;
let fastenemyHealth;
//lives powerup variables
let livespowerupX;
let livespowerupY;
let livespowerupRadius;
let livespowerupColor;
let livespowerupSpeed;
let livespowerupAction;
let livespowerupImageUrl;
//immunity powerup variables
let immunpowerupX;
let immunpowerupY;
let immunpowerupRadius;
let immunpowerupColor;
let immunpowerupSpeed;
let immunpowerupAction;
let immunpowerupImageUrl;
//speed powerup variabls
let speedpowerupX;
let speedpowerupY;
let speedpowerupRadius;
let speedpowerupColor;
let speedpowerupSpeed;
let speedpowerupAction;
let speedpowerupImageUrl;
//wall powerup vairables
let wallpowerupX;
let wallpowerupY;
let wallpowerupRadius;
let wallpowerupColor;
let wallpowerupSpeed;
let wallpowerupAction;
let wallpwerupImageUrl;
//damage powerup
let multiplierpowerupX;
let multiplierpowerupY;
let multiplierpowerupRadius;
let multiplierpowerupColor;
let multiplierpowerupSpeed;
let multiplierpowerupAction;
let multiplierpowerupImageUrl;
//magazine powerup
//color is #8103FF

//slow powerup
let slownesspowerupX;
let slownesspowerupY;
let slownesspowerupRadius;
let slownesspowerupColor;
let slownesspowerupSpeed;
let slownesspowerupAction;
let slownesspowerupImageUrl;
//ally powerup
let allypowerupX;
let allypowerupY;
let allypowerupRadius;
let allypowerupColor;
let allypowerupSpeed;
let allypowerupAction;
let allypowerupImageUrl;

//Rocket class
class Rocket {
  constructor(x, y, width, height, color, dy, ammo) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dy = dy;
    this.ammo = ammo;
  }
  //rocket draw func
  draw() {
    if (immunity) {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    }
    if (speedTimerVar > 0) {
      ctx.fillStyle = "orange";
      ctx.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(
      this.ammo,
      this.x + this.width / 3,
      this.y + this.height / 1 / 2
    );
  }
  //rocket update func
  update() {
    this.draw();
    //makes rocket move up and down
    this.y += this.dy;
  }
}

//Bullet class
class Bullet {
  constructor(x, y, radius, color, dx) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
  }
  //bullet draw func
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  //bullet update func
  update() {
    this.draw();
    //makes bullet move right
    this.x += this.dx;
  }
}

//Enemy class
class Enemy {
  constructor(x, y, radius, color, dx, health) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.health = health;
  }
  //enemy draw func
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  //enemy update func
  update() {
    this.draw();
    //makes enemies move left
    this.x -= this.dx;
  }
}

//Powerup class
class Powerup {
  constructor(x, y, radius, color, dx, action, imageUrl) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.action = action;
    this.imageUrl = imageUrl;
  }
  //powerup draw func
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    let image = new Image();
    image.src = this.imageUrl;
    ctx.drawImage(image, this.x - 20, this.y - 20, 40, 40);
  }
  //powerup action func. picks what action to do
  pickAction() {
    if (this.action === "lives") {
      lives++;
      livesHTML.innerHTML = lives;
    }
    if (this.action === "immunity") {
      immunity = true;
    }
    if (this.action === "speed") {
      playerSpeed = 20;
      speedTimerVar = 500;
    }
    if (this.action === "wall") {
      wall.isBuilt = true;
    }
    if (this.action === "damage") {
      damage = 150;
      damageTimerVar = 500;
    }
    if (this.action === "slow") {
      slownessTimerVar = 500;
    }
    if (this.action === "ally") {
      let allyWidth = 75;
      let allyY = Math.random() * canvas.height;
      let allyX = 0 - allyWidth;
      let allyHeight = 75;
      let allyColor = "#00C1FF";
      let allyHealth = 100;
      let allyfireRate = 25;
      let allyLevel = 1;
      allies.push(
        new Ally(
          allyX,
          allyY,
          allyWidth,
          allyHeight,
          allyColor,
          allyHealth,
          allyfireRate,
          allyLevel
        )
      );
      allyCount++;
    }
  }
  //powerup update func
  update() {
    this.draw();
    //moves the powerup to the left
    this.x -= this.dx;
  }
}

class Ally {
  constructor(x, y, width, height, color, health, fireRate, level) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.health = health;
    this.fireRate = fireRate;
    this.level = level;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    if (this.x < 90) {
      this.x++;
    }
  }

  shoot() {
    bullets.push(
      new Bullet(
        this.x + this.width,
        this.y + this.height / 2,
        bulletRadius,
        bulletColor,
        bulletSpeed
      )
    );
  }
}

class Boss {
  constructor(x, y, radius, dx, health, ringHealth) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.health = health;
    this.ringHealth = ringHealth;
  }
  draw() {
    if (this.ringHealth > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 30, 0, Math.PI * 2, false);
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.closePath();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    if (this.x > (canvas.width * 3) / 4) {
      this.x -= this.dx;
    }
  }
}

//wall for wall powerup
const wall = {
  x: 10,
  y: 10,
  width: 60,
  height: canvas.height,
  health: 1000,
  isBuilt: false,
  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  takeDamage() {
    this.health -= 100;
  },
  break() {
    if (this.health === 0) {
      this.isBuilt = false;
    }
  },
};

//rocket declaration
let rocket = new Rocket(
  playerX,
  playerY,
  playerWidth,
  playerHeight,
  playerColor,
  0,
  playerAmmo
);
//bullet array declaration
let bullets = [];
//enemies array declaration
let enemies = [];
//powerups array declaration
let powerups = [];
//bosses array declaration
let bosses = [];
//allies array declaration
let allies = [];

//initiation function: called when game is restarted; used to reset everything
const init = () => {
  rocket = new Rocket(100, 100, 100, 100, "red", 0, playerAmmo);
  bullets = [];
  enemies = [];
  powerups = [];
  bosses = [];
  lives = 10;
  score = 0;
  scoreHTML.innerHTML = score;
  livesHTML.innerHTML = lives;
  pointsHTML.innerHTML = score;
  spawn = false;
  currentlyPlaying = true;
  immunity = false;
  playerSpeed = 12;
  speedTimerVar = 0;
  hits = 130;
  bossStatus = false;
  wall.isBuilt = false;
  wall.health = 1000;
  damage = 50;
  damageTimerVar = 0;
  bossSpawned = false;
  enemySpeed = 6;
  bigenemySpeed = 3;
  fastenemySpeed = 12;
  slownessTimerVar = 0;
  allies = [];
  allyCount = 0;
  powerups.forEach((powerup) => {
    powerup.action = "";
  });
};

const spawnBoss = () => {
  setInterval(() => {
    if (!bossStatus && currentlyPlaying && score >= 100) {
      bosses.push(
        new Boss(canvas.width + 300, canvas.height / 2, 300, 3, 1500, 5000)
      );
      bossStatus = true;
      bossSpawned = true;
    }
  }, 1);
};

//boss spawns on screen
spawnBoss();

//spawn enemies function; responsible for spawning the basic enemies
const spawnEnemies = () => {
  setInterval(() => {
    //enemy variables
    enemyY = Math.random() * canvas.height;
    enemyRadius = 50;
    enemyX = canvas.width + enemyRadius;
    enemyColor = "green";
    enemySpeed = 6;
    bosses.forEach((boss) => {
      if (boss.ringHealth === 0) {
        enemySpeed = 8;
      }
    });
    if (slownessTimerVar > 0) {
      enemySpeed = 3;
    }
    if (slownessTimerVar === 0) {
      enemySpeed = 6;
    }
    enemyHealth = 150;
    //creates a new enemy into the enemies array every second
    if (currentlyPlaying) {
      enemies.push(
        new Enemy(
          enemyX,
          enemyY,
          enemyRadius,
          enemyColor,
          enemySpeed,
          enemyHealth
        )
      );
    }
  }, 1000);
};

//spawn big enemies function; responsible for spawning the big enemies
const spawnBigEnemies = () => {
  setInterval(() => {
    //big enemy variables
    bigenemyY = Math.random() * canvas.height;
    bigenemyRadius = 100;
    bigenemyX = canvas.width + bigenemyRadius;
    bigenemyColor = "pink";
    bigenemySpeed = 3;
    if (slownessTimerVar > 0) {
      bigenemySpeed = 1;
    }
    if (slownessTimerVar === 0) {
      bigenemySpeed = 3;
    }
    bigenemyHealth = 500;
    //creates a new big enemy into the enemies array every ten seconds
    if (score >= 50 && currentlyPlaying && !bossSpawned) {
      enemies.push(
        new Enemy(
          bigenemyX,
          bigenemyY,
          bigenemyRadius,
          bigenemyColor,
          bigenemySpeed,
          bigenemyHealth
        )
      );
    }
  }, 10000);
};

//spawn fast enemies function; responsible for spawning the fast enemies
const spawnFastEnemies = () => {
  setInterval(() => {
    //fast enemy variables
    fastenemyY = Math.random() * canvas.height;
    fastenemyRadius = 25;
    fastenemyX = canvas.width + fastenemyRadius;
    fastenemyColor = "yellow";
    fastenemySpeed = 12;
    if (slownessTimerVar > 0) {
      fastenemySpeed = 6;
    }
    if (slownessTimerVar === 0) {
      fastenemySpeed = 12;
    }
    fastenemyHealth = 50;
    //creates new fast enemy into enemies array every ten seconds
    if (score >= 75 && currentlyPlaying && !bossSpawned) {
      enemies.push(
        new Enemy(
          fastenemyX,
          fastenemyY,
          fastenemyRadius,
          fastenemyColor,
          fastenemySpeed,
          fastenemyHealth
        )
      );
    }
  }, 5000);
};

//spawn powerups function; responsible for spawning powerups
const spawnPowerups = () => {
  setInterval(() => {
    livespowerupY = Math.random() * canvas.height;
    livespowerupRadius = 35;
    livespowerupX = canvas.width + livespowerupRadius;
    livespowerupColor = "blue";
    livespowerupSpeed = 5;
    livespowerupAction = "lives";
    livespowerupImageUrl = "../Resources/heart.png";

    let randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 1 && currentlyPlaying) {
      powerups.push(
        new Powerup(
          livespowerupX,
          livespowerupY,
          livespowerupRadius,
          livespowerupColor,
          livespowerupSpeed,
          livespowerupAction,
          livespowerupImageUrl
        )
      );
    }
  }, 3000);
  setInterval(() => {
    immunpowerupY = Math.random() * canvas.height;
    immunpowerupRadius = 35;
    immunpowerupX = canvas.width + immunpowerupRadius;
    immunpowerupColor = "orange";
    immunpowerupSpeed = 5;
    immunpowerupAction = "immunity";
    immunpowerupImageUrl = "../Resources/shield.png";

    let randomNum2 = Math.floor(Math.random() * 5);
    if (randomNum2 === 3 && currentlyPlaying) {
      powerups.push(
        new Powerup(
          immunpowerupX,
          immunpowerupY,
          immunpowerupRadius,
          immunpowerupColor,
          immunpowerupSpeed,
          immunpowerupAction,
          immunpowerupImageUrl
        )
      );
    }
  }, 5000);
  setInterval(() => {
    speedpowerupY = Math.random() * canvas.height;
    speedpowerupRadius = 35;
    speedpowerupX = canvas.width + speedpowerupRadius;
    speedpowerupColor = "#6700ff";
    speedpowerupSpeed = 5;
    speedpowerupAction = "speed";
    speedpowerupImageUrl = "../Resources/lightning.png";

    let randomNum3 = Math.floor(Math.random() * 4);
    if (randomNum3 === 2 && currentlyPlaying) {
      powerups.push(
        new Powerup(
          speedpowerupX,
          speedpowerupY,
          speedpowerupRadius,
          speedpowerupColor,
          speedpowerupSpeed,
          speedpowerupAction,
          speedpowerupImageUrl
        )
      );
    }
  }, 7000);
  setInterval(() => {
    wallpowerupY = Math.random() * canvas.height;
    wallpowerupRadius = 35;
    wallpowerupX = canvas.width + wallpowerupRadius;
    wallpowerupColor = "#03C9FF";
    wallpowerupSpeed = 5;
    wallpowerupAction = "wall";
    wallpowerupImageUrl = "../Resources/hammer.png";

    let randomNum4 = Math.floor(Math.random() * 4);
    if (randomNum4 == 3 && currentlyPlaying) {
      powerups.push(
        new Powerup(
          wallpowerupX,
          wallpowerupY,
          wallpowerupRadius,
          wallpowerupColor,
          wallpowerupSpeed,
          wallpowerupAction,
          wallpowerupImageUrl
        )
      );
    }
  }, 10000);
  setInterval(() => {
    multiplierpowerupY = Math.random() * canvas.height;
    multiplierpowerupRadius = 35;
    multiplierpowerupX = canvas.width + multiplierpowerupRadius;
    multiplierpowerupColor = "#BD0008";
    multiplierpowerupSpeed = 5;
    multiplierpowerupAction = "damage";
    multiplierpowerupImageUrl = "../Resources/muscle.png";

    let randomNum5 = Math.floor(Math.random() * 5);
    if (randomNum5 == 3 && currentlyPlaying) {
      powerups.push(
        new Powerup(
          multiplierpowerupX,
          multiplierpowerupY,
          multiplierpowerupRadius,
          multiplierpowerupColor,
          multiplierpowerupSpeed,
          multiplierpowerupAction,
          multiplierpowerupImageUrl
        )
      );
    }
  }, 7000);
  setInterval(() => {
    slownesspowerupY = Math.random() * canvas.height;
    slownesspowerupRadius = 35;
    slownesspowerupX = canvas.width + slownesspowerupRadius;
    slownesspowerupColor = "#ff9fec";
    slownesspowerupSpeed = 5;
    slownesspowerupAction = "slow";
    slownesspowerupImageUrl = "../Resources/snowflake.png";

    let randomNum6 = Math.floor(Math.random() * 7);
    if (randomNum6 == 1 && currentlyPlaying) {
      powerups.push(
        new Powerup(
          slownesspowerupX,
          slownesspowerupY,
          slownesspowerupRadius,
          slownesspowerupColor,
          slownesspowerupSpeed,
          slownesspowerupAction,
          slownesspowerupImageUrl
        )
      );
    }
  }, 5000);
  setInterval(() => {
    allypowerupY = Math.random() * canvas.height;
    allypowerupRadius = 35;
    allypowerupX = canvas.width + allypowerupRadius;
    allypowerupColor = "#a8815a";
    allypowerupSpeed = 5;
    allypowerupAction = "ally";
    allypowerupImageUrl = "../Resources/robot.png";

    let randomNum7 = Math.floor(Math.random() * 10);
    if (randomNum7 == 1 && currentlyPlaying && allyCount <= 3) {
      powerups.push(
        new Powerup(
          allypowerupX,
          allypowerupY,
          allypowerupRadius,
          allypowerupColor,
          allypowerupSpeed,
          allypowerupAction,
          allypowerupImageUrl
        )
      );
    }
  }, 1000);
};

//collides function; responsible for collision between rocket and enemies
const collides = (rect, circle, collide_inside) => {
  // compute a center-to-center vector
  let half = { x: rect.width / 2, y: rect.height / 2 };
  let center = {
    x: circle.x - (rect.x + half.x),
    y: circle.y - (rect.y + half.y),
  };

  // check circle position inside the rectangle quadrant
  let side = {
    x: Math.abs(center.x) - half.x,
    y: Math.abs(center.y) - half.y,
  };
  if (side.x > circle.radius || side.y > circle.radius)
    // outside
    return false;
  if (side.x < -circle.radius && side.y < -circle.radius)
    // inside
    return collide_inside;
  if (side.x < 0 || side.y < 0)
    // intersects side or corner
    return true;

  // circle is near the corner
  return side.x * side.x + side.y * side.y < circle.radius * circle.radius;
};

//game over function
const gameOver = () => {
  //pauses animation on canvas
  cancelAnimationFrame(animationId);
  //game over screen displays
  gameOverModal.style.display = "flex";
  //displays score on game over screen
  pointsHTML.innerHTML = score;
  //reset currentlyPlaying to false
  currentlyPlaying = false;
  //removes pause button
  pauseButton.style.display = "none";
};

//pause game function
const gamePause = () => {
  //pauses animation on canvas
  cancelAnimationFrame(animationId);
  //game pause screen displays
  pauseGameModal.style.display = "flex";
  //displays score and lives on pause screen
  pausePointsHTML.innerHTML = score;
  puaseLivesHTML.innerHTML = lives;
  //reset currentlyPlaying to false
  currentlyPlaying = false;
};

//used for pausing animation frames
let animationId;

const animate = () => {
  //gives variable a value each time animate is called
  animationId = requestAnimationFrame(animate);
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //canvas background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //draws wall
  if (wall.isBuilt) {
    wall.draw();
  } else {
    wall.health = 1000;
  }
  wall.break();

  //powerups forEach iterator
  powerups.forEach((powerup, index) => {
    //powerups update function so it can move
    powerup.update();
    //detects rocket and powerup collision
    if (collides(rocket, powerup)) {
      //picks the action for specific powerup
      powerup.pickAction();
      //deletes the powerup from powerups array
      powerups.splice(index, 1);
    }
  });

  //bullet foreach iterator
  bullets.forEach((bullet, index) => {
    //allows all bullets to move
    bullet.update();
    //deletes bullets if it moves outside canvas
    if (bullet.x + bullet.radius > canvas.width) {
      setTimeout(() => {
        bullets.splice(index, 1);
      }, 0);
    }
    bosses.forEach((boss, bossIndex) => {
      const bossDist = Math.hypot(bullet.x - boss.x, bullet.y - boss.y);
      if (bossDist - boss.radius - bullet.radius < 1) {
        bullets.splice(index, 1);
        if (boss.ringHealth > 0) {
          boss.ringHealth -= damage;
          hits--;
        } else {
          boss.health -= damage;
          hits--;
        }
      }
    });
  });

  bosses.forEach((boss, index) => {
    boss.update();
    if (boss.health <= 0) {
      bosses.splice(index, 1);
      bossSatus = false;
      bossSpawned = false;
    }
    if (boss.ringHealth <= 0) {
      enemySpeed = 6;
    }
    if (boss.health > 0) {
      if (boss.ringHealth > 0) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle = "red";
      }
      ctx.font = "30px Arial";
      ctx.fillText("Boss Battle", (canvas.width * 3) / 7, 50);
      ctx.fillText("Hits Remaining: " + hits, (canvas.width * 2) / 5, 100);
    }
  });

  allies.forEach((ally, index) => {
    ally.update();
    enemies.forEach((enemy, enemyindex) => {
      if (collides(ally, enemy)) {
        enemies.splice(enemyindex, 1);
        ally.health -= 50;
      }
    });

    if (ally.health <= 0) {
      allies.splice(index, 1);
      allyCount--;
    }

    // setInterval(() => {
    //     blocker1 = 0;
    //     if (currentlyPlaying && allies.length >= 1) {
    //         if (blocker1 == 0) {
    //             bullets.push(new Bullet(ally.x + ally.width, ally.y + (ally.height / 2), bulletRadius, bulletColor, bulletSpeed))
    //             blocker1 = 1;
    //         }
    //     }
    // }, 500/ally.fireRate)
    setInterval(() => {
      if (currentlyPlaying && allies.length >= 1) {
        if (blocker1 == 0) {
          allies.forEach((ally) => {
            ally.shoot();
          });
          blocker1 = 1;
          setTimeout(() => {
            blocker1 = 0;
          }, 1000);
        }
      }
    }, 1000);
  });

  //enemies foreach iterator
  enemies.forEach((enemy, index) => {
    //allows all enemies to move
    enemy.update();
    //responsible for bullet and enemy collision
    bullets.forEach((bullet, bulletIndex) => {
      //variable used to measure distance between bullet and enemy
      const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
      if (dist - enemy.radius - bullet.radius < 1) {
        //deletes the bullet from bullets array
        bullets.splice(bulletIndex, 1);
        //decreases enemy's health
        enemy.health -= damage;
      }
    });
    //hits wall
    if (collides(wall, enemy) && wall.isBuilt) {
      enemies.splice(index, 1);
      wall.takeDamage();
    }
    //enemy dies
    if (enemy.health <= 0) {
      //removes enemy from enemies array
      enemies.splice(index, 1);
      //increases score by 1 if regular enemy is killed
      if (enemy.radius === enemyRadius) {
        score++;
        scoreHTML.innerHTML = score;
      }
      //increases score by 5 if big enemy is killed
      else if (enemy.radius === bigenemyRadius) {
        score += 5;
        scoreHTML.innerHTML = score;
      }
      //increases score by 3 if fast enemy is killed
      else if (enemy.radius === fastenemyRadius) {
        score += 3;
        scoreHTML.innerHTML = score;
      }
    }

    //game ends if rocket and enemy collide or no lives remaining
    if (lives === 0) {
      gameOver();
    }
    if (collides(rocket, enemy) && !immunity) {
      gameOver();
    } else if (collides(rocket, enemy) && immunity) {
      immunity = false;
      enemies.splice(index, 1);
    }
    //if enemy goes off screen
    if (enemy.x - enemy.radius <= 0) {
      //deletes the enemy from enemies array
      enemies.splice(index, 1);
      //lives go down
      lives--;
      //lives counter is updated
      livesHTML.innerHTML = lives;
    }
  });

  if (speedTimerVar > 0) {
    speedTimerVar--;
  }

  if (speedTimerVar === 0) {
    playerSpeed = 12;
  }

  if (damageTimerVar > 0) {
    damageTimerVar--;
    bulletColor = "red";
  }

  if (damageTimerVar === 0) {
    damage = 50;
    bulletColor = "white";
  }
  if (slownessTimerVar > 0) {
    slownessTimerVar--;
  }

  pauseButton.addEventListener("click", () => {
    gamePause();
  });
  //rockets update function so it can move
  rocket.update();
  console.log(allies.length);
};
//responsible for character movement
addEventListener("keydown", (evt) => {
  //W key is pressed
  if (evt.code === "KeyW" && currentlyPlaying) {
    //player moves up
    rocket.dy = -playerSpeed;
    //stops player from moving up too far
    if (rocket.y < 10 && currentlyPlaying) {
      //used for condition for keeping character in canvas
      up = true;
    }
    if (up && currentlyPlaying) {
      //brings rocket back to canvas
      rocket.y = 0;
      //rocket velocity is 0
      rocket.dy = 0;
      //resets up bool
      up = false;
    }
  }
  //S key is pressed
  else if (evt.code === "KeyS" && currentlyPlaying) {
    //player moves down
    rocket.dy = playerSpeed;
    //stops player from moving down too far
    if (rocket.y > canvas.height - rocket.height && currentlyPlaying) {
      //used for condition for keeping character in canvas
      down = true;
    }
    if (down && currentlyPlaying) {
      //brings rocket back to canvas
      rocket.y = canvas.height - rocket.height + 10;
      //rocket velocity is 0
      rocket.dy = 0;
      //resets up bool
      down = false;
    }
  }

  if (evt.code === "KeyR" && currentlyPlaying) {
    rocket.ammo = 50;
  }
});

//when keys are released
addEventListener("keyup", (evt) => {
  if (evt.code === "KeyW" || (evt.code === "KeyS" && currentlyPlaying)) {
    //stops player from moving if keys are released
    rocket.dy = 0;
  }
});

//shooting

addEventListener("click", (event) => {
  //if mouse is clicked and ammo is above 0 new bullet is created and added to bullets array
  if (rocket.ammo > 0 && currentlyPlaying) {
    bullets.push(
      new Bullet(
        rocket.x + rocket.width,
        rocket.y + rocket.height / 2,
        bulletRadius,
        bulletColor,
        bulletSpeed
      )
    );
    rocket.ammo--;
  }
});

//start game button in game over modal; used to restart the game
startGameButton.addEventListener("click", () => {
  //calls the function to reset all data
  init();
  //makes the game start animating again
  animate();
  //makes game over modal go away
  gameOverModal.style.display = "none";
  //makes pause button viewable
  pauseButton.style.display = "block";
});

playGameButton.addEventListener("click", () => {
  animate();
  pauseGameModal.style.display = "none";
  currentlyPlaying = true;
});

//spawns enemies on screen
spawnEnemies();
//big enemies spawn on screen
spawnBigEnemies();
//fast enemies spawn on screen
spawnFastEnemies();
//powerups spawn on screen
spawnPowerups();
