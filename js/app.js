//Use sci fi images: http://www.fps-x-games.com/2012/03/sci-fi-textures.html
var score = 0;


function collisionReaction() {
    $('.reaction').addClass('animated flash');
    setTimeout (function() {
        $('.reaction').removeClass('animated flash');
        }, 500);
}

function collisionDetector(enemy, hero) {
// Axis-aligned collision detection model from Mozilla: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (enemy.x < hero.x + hero.width &&
    enemy.x + enemy.width > hero.x &&
    enemy.y < hero.y + hero.height &&
    enemy.height + enemy.y > hero.y) {
    // collision detected!
        collisionReaction();
        hero.x = 200;
        hero.y = 400;
    }
}

// Enemies our player must avoid
function Enemy(x, y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 30;

    min = Math.ceil(200);
    max = Math.floor(50);
    this.speed = Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x += (this.speed * dt);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 500) {
        this.x = -80;

         min = Math.ceil(400);
         max = Math.floor(50);
            this.speed = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    collisionDetector(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 61;
    this.height = 30;
}

Player.prototype.update = function(dt) {
};

Player.prototype.win = function() {

        swal({
            title: "You made it!",
            icon: "success"
        });

        this.x = 200;
        this. y = 400;

        if (score === 0 ) {
            score ++;
            $('canvas').before('<div class= "score-counter">Score: '+score+' </div>');
        } else {
            score ++;
            $('.score-counter').html("Score: "+score);
        }
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x === 0) {
                break;
            } else {
                this.x -= 100;
            }
            break;
        case 'right':
            if (this.x === 400) {
                break;
            } else {
                this.x += 100;
            }
            break;
        case 'up':
            console.log(this.y);
            if (this.y === -20) {
                break;
            } else if (this.y === 64) {
                this.win();
            } else {
                this.y -= 84;
            }
            break;
        case 'down':
            if (this.y === 400) {
                break;
            } else {
                this.y += 84;
            }
            break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate objects.
var nemesis1 = new Enemy(0, 57);
var nemesis2 = new Enemy(0, 140);
var nemesis3 = new Enemy(0, 222);
var nemesis4 = new Enemy(0, 305);

// Place the player object in a variable called player
var player = new Player(200, 400);

// Place all enemy objects in an array called allEnemies
var allEnemies = [nemesis1, nemesis2, nemesis3, nemesis4];

nemesis1.update(1.4); 
nemesis2.update(1.4); 
nemesis3.update(1.4); 
nemesis4.update(1.4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

$(document).ready(function() {
    $('canvas').wrap('<div class="reaction animated slideInDown"></div>');
    setTimeout (function() {
        $('.reaction').removeClass('animated slideInDown');
        }, 1000);
});