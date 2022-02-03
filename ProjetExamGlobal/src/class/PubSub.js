export default class {

  constructor() {
    this.channels = new Map();
  }

  subscribe(chan, callback) {
    let subs = this.channels.has(chan) ? this.channels.get(chan) : [];
    subs.push(callback);
    this.channels.set(chan, subs);
  }

  publish(chan, data = {}) {
    let subs = this.channels.has(chan) ? this.channels.get(chan) : [];
    subs.forEach(callback => callback(data));
  }

}