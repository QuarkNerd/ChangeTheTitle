export default class RotatingExecution {
    constructor() {
        this.active = false;
    }

    async startExecution(functionsConfig) {
        this.active = true;

        let i = 0;
        while(this.active) {
            const currentConfig = functionsConfig[i%functionsConfig.length];
            currentConfig.function();
            await this.sleep(currentConfig.pause);
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
