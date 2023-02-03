export default class TitleSlider {
    constructor() {
        this.active = false;
    }

    async startSlidingTitle({txt, duration}) {
        this.active = true;

        let currentTxt = txt;
        while(this.active) {
            document.title = currentTxt;
            await this.sleep(duration);
            currentTxt = currentTxt.length ? currentTxt.substring(1) : txt;
        }
    }

    terminate() {
        this.active = false;
    }

    sleep(ms) {
        return new Promise(r => setTimeout(r, ms))
    }
}
