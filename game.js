const config = {
    type: Phaser.AUTO,
    width: 1475,
    height: 690,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1400},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let playerDirection = "right";
let enemy;
let thunders;
let cursors;

function preload() {
    this.load.image('flashRight', 'flashRight.png');
    this.load.image('flashLeft', 'flashLeft.png');

    this.load.image('sarvitarRight', 'sarvitarRight.png');
    this.load.image('sarvitarLeft', 'sarvitarLeft.png');

    this.load.image('thunderRight', 'thunderRight.png');
    this.load.image('thunderLeft', 'thunderLeft.png');

    this.load.image('floor', 'floor.png');
}
function create() {
    const floor = this.physics.add.staticGroup();
    floor.create(400, 685, 'floor').setScale(1.5).refreshBody();

    player = this.physics.add.sprite(100, 602, 'flashRight');
    player.setScale(0.2);

    enemy = this.physics.add.sprite(1400, 577, 'sarvitarLeft');
    enemy.setScale(0.27);

    thunders = this.physics.add.group({
        defaultKey: 'thunderRight',
        maxSize: 2
    });

    this.physics.add.collider(player, floor);
    this.physics.add.collider(enemy, floor);
    //this.physics.add.overlap(thunders, enemy, hitEnemy, null, this);

    enemy.setCollideWorldBounds(true);
    enemy.setVelocityX(-1000);

    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    //this.input.keyboard.on('keydown-SPACE', playerThunders, this);
}
function update() {
    if(cursors.left.isDown) {
        player.x -= 25;
        player.setTexture('flashLeft');
    }
    else if(cursors.right.isDown) {
        player.x += 25;
        player.setTexture('flashRight');
    }
    else if(cursors.up.isDown) {
        player.y -= 15;
    }

    if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
        playerThunders();
    }

    if(enemy.body.blocked.left) {
        enemy.setTexture('sarvitarRight');
        enemy.setVelocityX(1000);
    }
    if(enemy.body.blocked.right) {
        enemy.setTexture('sarvitarLeft');
        enemy.setVelocityX(-1000);
    }

    thunders.children.each(thunder => {
        if(thunder.active && (thunder.x < 0 || thunder.x > 1475)) thunder.setActive(false).setVisible(false);
    });
}
//Atualizar função playerThunders()
function playerThunders() {
    const thunder = thunders.get(player.x, player.y - 20);
    if(thunder) {
        thunder.setActive(true).setVisible(true).setScale(0.15);
        thunder.body.allowGravity = false;
        thunder.setVelocityX(600);
    }
}