export default class TitleChanger {
    constructor() {
        this.active = false;
    }

    async startRotatingTitles(titlesList) {
        this.active = true;

        let i = 0;
        while(this.active) {
            const title = titlesList[i%titlesList.length];
            document.title = title.txt;
            await this.sleep(title.duration);
            i++;
        }
    }

    terminate() {
        this.active = false;
    }

    sleep(ms) {
        return new Promise(r => setTimeout(r, ms))
    }
}
