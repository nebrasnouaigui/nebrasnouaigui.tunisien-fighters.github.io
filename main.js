const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player1, player2, cursors, keys, attackKey1;
let hp1 = 100, hp2 = 100;
let healthBar1, healthBar2;
let touchControls = { left: false, right: false, jump: false, attack: false };

const game = new Phaser.Game(config);

function preload() {}

function create() {
  this.add.rectangle(400, 300, 800, 600, 0x2e2e2e); // Background

  player1 = this.physics.add.sprite(200, 450, null).setDisplaySize(50, 100).setTint(0xff0000);
  player2 = this.physics.add.sprite(600, 450, null).setDisplaySize(50, 100).setTint(0x0000ff);

  player1.body.setCollideWorldBounds(true);
  player2.body.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  keys = this.input.keyboard.addKeys('Q,D,Z,A,L');
  attackKey1 = keys.A;

  const ground = this.add.rectangle(400, 580, 800, 40, 0x666666);
  this.physics.add.existing(ground, true);
  this.physics.add.collider(player1, ground);
  this.physics.add.collider(player2, ground);

  healthBar1 = this.add.rectangle(150, 30, hp1 * 2, 20, 0xff0000);
  healthBar2 = this.add.rectangle(650, 30, hp2 * 2, 20, 0x0000ff);

  setupTouchControls();
}

function update() {
  if (keys.Q.isDown || touchControls.left) {
    player1.setVelocityX(-160);
  } else if (keys.D.isDown || touchControls.right) {
    player1.setVelocityX(160);
  } else {
    player1.setVelocityX(0);
  }
  if ((keys.Z.isDown || touchControls.jump) && player1.body.touching.down) {
    player1.setVelocityY(-350);
  }

  if (Phaser.Input.Keyboard.JustDown(attackKey1) || touchControls.attack) {
    if (Phaser.Math.Distance.Between(player1.x, player1.y, player2.x, player2.y) < 100) {
      hp2 -= 10;
      healthBar2.width = hp2 * 2;
      healthBar2.x = 650 - (100 - hp2);
    }
    touchControls.attack = false;
  }
}

function setupTouchControls() {
  document.getElementById("left").addEventListener("touchstart", () => touchControls.left = true);
  document.getElementById("left").addEventListener("touchend", () => touchControls.left = false);
  document.getElementById("right").addEventListener("touchstart", () => touchControls.right = true);
  document.getElementById("right").addEventListener("touchend", () => touchControls.right = false);
  document.getElementById("jump").addEventListener("touchstart", () => touchControls.jump = true);
  document.getElementById("jump").addEventListener("touchend", () => touchControls.jump = false);
  document.getElementById("attack").addEventListener("touchstart", () => touchControls.attack = true);
}
