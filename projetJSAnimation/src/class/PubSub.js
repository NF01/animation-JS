export class PubSub {


    constructor() {

        this.channels = new Map();
    }

    subscribe(chanel, callback) {

        let subs = [];
        subs.push(callback);
        this.channels.set(chan, subs)



    }

    publish() {


    }



}