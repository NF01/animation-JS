import PubSub from './PubSub';

export default class {

  constructor() {
    $(window).on("keydown", evt => this.onKeyDown(evt));
    $(window).on("keyup", evt => this.onKeyUp(evt));
    this.keysPressed = new Map();
    this.pubSub = new PubSub();
  }

  on(key, callback) {
    key = key.toUpperCase();
    this.pubSub.subscribe(key, callback);
  }

  onKeyDown(evt) {
    let key = evt.key;
    key = key.toUpperCase();
    this.keysPressed.set(key, key);
    this.pubSub.publish(key, evt);
  }

  onKeyUp(evt) {
    let key = evt.key;
    key = key.toUpperCase();
    this.keysPressed.delete(key);
  }

  isKeyDown(key) {
    key = key.toUpperCase();
    return this.keysPressed.has(key);
  }

  isKeysDown(...keys) {
    return keys.every(key => this.isKeyDown(key));
  }

}