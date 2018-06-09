////////////////////////comm//////////////////////////

function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

        //A collision might be occuring. Check for a collision on the y axis
        if (Math.abs(vy) < combinedHalfHeights) {

            //There's definitely a collision happening
            hit = true;
        } else {

            //There's no collision on the y axis
            hit = false;
        }
    } else {

        //There's no collision on the x axis
        hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
};

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    window.addEventListener("keydown", key.downHandler.bind(key), false);
    window.addEventListener("keyup", key.upHandler.bind(key), false);
    return key;
}
////////////////////////comma/////////////////////////
/// draw backgroud
let app = new PIXI.Application({
    width: 800, // default: 800
    height: 800, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1 // default: 1
});
document.body.appendChild(app.view);
/// draw snake
let snake_body = new PIXI.Container();
for (let index = 0; index < 3; index++) {
    let rect = new PIXI.Graphics();
    rect.beginFill(0xffffff);
    rect.drawRect(index * 24, 24, 24, 24);
    rect.endFill();

    snake_body.addChild(rect);
}
app.stage.addChild(snake_body);
let state;
let cat;
let size=24;
drawHead();
///////draw food
function drawHead() {

    //Define any variables that are used in more than one function
    cat = new PIXI.Graphics;
    cat.beginFill(0xffffff);
    cat.drawCircle(84, 36, size/2);
    cat.vx=0;
    cat.vy=0;
    app.stage.addChild(cat);

    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
        //Change the cat's velocity when the key is pressed
        cat.vx = -3;
        cat.vy = 0;   
        
    };
    //Up
    up.press = () => {
        cat.vy = -3;
        cat.vx = 0;
        console.log('up');
    };
    // up.release = () => {
    //     if (!down.isDown && cat.vx === 0) {
    //         cat.vy = 0;
    //     }
    // };

    //Right
    right.press = () => {
        cat.vx =3;
        cat.vy = 0;
        console.log('right');
    };
    // right.release = () => {
    //     if (!left.isDown && cat.vy === 0) {
    //         cat.vx = 0;
    //     }
    // };

    //Down
    down.press = () => {
        cat.vy = 3;
        cat.vx = 0;
        console.log('down');
    };
    // down.release = () => {
    //     if (!up.isDown && cat.vx === 0) {
    //         cat.vy = 0;
    //     }
    // };

    //Set the game state
    state = play;

    //Start the game loop
    app.ticker.add(delta => gameLoop(delta));

}

function gameLoop(delta) {

    //Update the current game state:
    state(delta);
}

function play(delta) {

    //Use the cat's velocity to make it move
    cat.x += cat.vx;
    cat.y += cat.vy;
    snake_body.position.set(cat.x,cat.y);
   
}