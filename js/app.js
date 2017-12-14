/*
 * Adds a reaction each time a collision occurs
 *   - Adds a brief animation to the board and then removes the classes that cause it
 *   - Uses the nimate.css library
 */
function collisionReaction() {
    $('.reaction').addClass('animated flash');
    setTimeout (function() {
        $('.reaction').removeClass('animated flash');
        }, 500);
}

/*
 * Constructor for enemy objects
 *   - Sets x & y canvas coordiantes, width and height for collision detection, and randomized speed.
 */
function Enemy(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 30;

    min = Math.ceil(200);
    max = Math.floor(50);
    this.speed = Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Detects collisions between the enemies and the player
 *   - Resets the player to the starting position if there is a collision
 *   - Axis-aligned collision detection model from Mozilla: 
 *   - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 */
Enemy.prototype.collisionDetection = function(hero) {
    if (this.x < hero.x + hero.width &&
    this.x + this.width > hero.x &&
    this.y < hero.y + hero.height &&
    this.height + this.y > hero.y) {
        collisionReaction();
        hero.x = 200;
        hero.y = 400;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (this.speed * dt);

    if (this.x > 500) {
        this.x = -80;

         min = Math.ceil(400);
         max = Math.floor(50);
            this.speed = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.collisionDetection(player);
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
    this.score = 0;
}

// Required class fo rthe engine
Player.prototype.update = function(dt) {
};

/*
 * Action when the player wins (reaches the 'water' row)
 *   - Increments the score value, resets player position, displays alert & score
 */
Player.prototype.win = function() {
        swal({
            title: "You made it!",
            icon: "success"
        });

        this.x = 200;
        this. y = 400;

        if (this.score === 0 ) {
            this.score ++;
            $('canvas').before('<div class= "score-counter">Score: '+this.score+' </div>');
        } else {
            this.score ++;
            $('.score-counter').html("Score: "+this.score);
        }
};

/*
 * Determines distance player moves based on key inputs
 */
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

// Required function for the engine, displays payer
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiates enemy objects
const nemesis1 = new Enemy(0, 57);
const nemesis2 = new Enemy(0, 140);
const nemesis3 = new Enemy(0, 222);
const nemesis4 = new Enemy(0, 305);

// Place the player object in a variable called player
const player = new Player(200, 400);

// Place all enemy objects in an array called allEnemies
const allEnemies = [nemesis1, nemesis2, nemesis3, nemesis4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
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