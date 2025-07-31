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

let player1, player2, cursors, keys, attackKey1, attackKey2, healthBar1, healthBar2;
let hp1 = 100, hp2 = 100;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('bg', 'https://i.imgur.com/YOUR_BACKGROUND_IMAGE.png'); // Placeholder
}

function create() {
  this.add.rectangle(400, 300, 800, 600, 0x2e2e2e); // Background

  // Players (colored blocks)
  player1 = this.physics.add.sprite(200, 450, null).setDisplaySize(50, 100).setTint(0xff0000);
  player2 = this.physics.add.sprite(600, 450, null).setDisplaySize(50, 100).setTint(0x0000ff);

  player1.body.setCollideWorldBounds(true);
  player2.body.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();
  keys = this.input.keyboard.addKeys('Q,D,Z,A,L');

  attackKey1 = keys.A;
  attackKey2 = keys.L;

  // Ground
  const ground = this.add.rectangle(400, 580, 800, 40, 0x666666);
  this.physics.add.existing(ground, true);
  this.physics.add.collider(player1, ground);
  this.physics.add.collider(player2, ground);

  // Health bars
  healthBar1 = this.add.rectangle(150, 30, hp1 * 2, 20, 0xff0000);
  healthBar2 = this.add.rectangle(650, 30, hp2 * 2, 20, 0x0000ff);
}

function update() {
  // Player 1 controls (Q, D, Z)
  if (keys.Q.isDown) {
    player1.setVelocityX(-160);
  } else if (keys.D.isDown) {
    player1.setVelocityX(160);
  } else {
    player1.setVelocityX(0);
  }
  if (keys.Z.isDown && player1.body.touching.down) {
    player1.setVelocityY(-350);
  }

  // Player 2 controls (←, →, ↑)
  if (cursors.left.isDown) {
    player2.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player2.setVelocityX(160);
  } else {
    player2.setVelocityX(0);
  }
  if (cursors.up.isDown && player2.body.touching.down) {
    player2.setVelocityY(-350);
  }

  // Attacks
  if (Phaser.Input.Keyboard.JustDown(attackKey1)) {
    if (Phaser.Math.Distance.Between(player1.x, player1.y, player2.x, player2.y) < 100) {
      hp2 -= 10;
      healthBar2.width = hp2 * 2;
      healthBar2.x = 650 - (100 - hp2);
    }
  }
  if (Phaser.Input.Keyboard.JustDown(attackKey2)) {
    if (Phaser.Math.Distance.Between(player2.x, player2.y, player1.x, player1.y) < 100) {
      hp1 -= 10;
      healthBar1.width = hp1 * 2;
      healthBar1.x = 150 - (100 - hp1);
    }
  }
}
