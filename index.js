import TitleChanger from './titleChanger.js';
import TitleSlider from './titleSlider.js';

const titleChanger = new TitleChanger();
const titleSlider = new TitleSlider();
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

window.execute = function execute() {

    if (document.getElementById('rotating').checked) {
        const rotatingTitles = getConfigFromTable('rotating-title');
        if (rotatingTitles == 'ERROR') return;
        titleChanger.startRotatingTitles(rotatingTitles);
    } else {
        const config = getConfigFromTable('sliding-title')[0];
        if (config == 'ERROR') return;
        titleSlider.startSlidingTitle(config);

    }

    startButton.classList.add('invisible');
    stopButton.classList.remove('invisible');
}

window.terminate = function terminate() {
    stopButton.classList.add('invisible');
    startButton.classList.remove('invisible');
    titleChanger.terminate();
    titleSlider.terminate();
}

window.addRow = function addRow(cls) {
    const row = document.createElement('tr');
    row.innerHTML = '<td><input type="text"></input></td><td><input type="text"></input></td>'
    document.querySelector('table.' + cls).appendChild(row);
}

function getConfigFromTable(cls) {
    let error = false;
    const config = [...document.querySelectorAll(`table.${cls} tr`)].slice(1).map(row => {
        const inputs = row.querySelectorAll('input');
        const timeInput = inputs[1];
        const time = timeInput.value ? parseInt(timeInput.value) : 0;
        timeInput.classList.remove('error');
        if (Number.isNaN(time)) {
            timeInput.classList.add('error');
            error = true;
        }
        return {
            txt: inputs[0].value,
            duration: time
        }
    });
    if (error) return 'ERROR';
    console.log(config);
    return config.filter(item => item.duration);
}
