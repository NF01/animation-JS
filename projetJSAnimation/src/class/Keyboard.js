export class Keyboard {


    constructor() {
        $(window).on("keydown", evt => this.onKeyDown(evt));
        $(window).on("keyup", evt => this.onKeyUp(evt));
        this.keysPressed = new Map(); // toute les touches qui sont appuyé
    }


    onKeyDown(evt) {
        let key = evt.key;
        this.keysPressed.set(key, key);
    }

    onKeyUp(evt) {
        let key = evt.key;
        this.keysPressed.delete(key);
    }


    isKeyDown(key) {
        return this.keysPressed.has(key);//renvoit boolean
    }





}