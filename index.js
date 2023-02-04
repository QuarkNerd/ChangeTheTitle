import RotatingExecution from './rotatingExecution.js';

const titleChanger = new RotatingExecution();
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const roatingCheckbox = document.getElementById('rotating');
const ERROR = 'ERROR';

window.execute = function execute() {
    const getTitleConfig = roatingCheckbox.checked ? getRotatingTitleConfig : getSlidingTitleConfig;
    const titleConfig = getTitleConfig();
    if (titleConfig == ERROR) return;
    titleChanger.startExecution(titleConfig);

    startButton.classList.add('invisible');
    stopButton.classList.remove('invisible');
}

window.terminate = function terminate() {
    stopButton.classList.add('invisible');
    startButton.classList.remove('invisible');
    titleChanger.terminate();
    titleSlider.terminate();
}

window.loadImage = async function loadImage(event) {
    console.log(234234);
    const element = event.target;
    const url = await getFaviconUrl(element.value);
    element.parentElement.parentElement.querySelector('img').src = url;
}

window.addRow = function addRow(cls) {
    const row = document.createElement('tr');
    row.innerHTML = cls === 'changing-icon' ? 
            '<td><img></td><td><input onfocusout="loadImage(event)" type="text"></input></td><td><input class="time" type="text"></input></td><td onclick="deleteRow(event)">X</td>'
            : '<td><input type="text"></input></td><td><input class="time" type="text"></input></td><td onclick="deleteRow(event)">X</td>';
    document.querySelector('table.' + cls).appendChild(row);
}

window.deleteRow = function deleteRow(e) {
    e.target.parentElement.remove();
}

function getRotatingTitleConfig() {
    const data = getDataFromTable('rotating-title');
    if (data === ERROR) return ERROR;
    return data.map(x => ({
        function: () => document.title = x.txt,
        pause: x.pause
    }))
}

function getSlidingTitleConfig() {
    const data = getDataFromTable('sliding-title')[0];
    if (data === ERROR) return ERROR;
    const {txt, pause} = data;

    return [...Array(txt.length + 1)].map((_, i) => ({
        function: () => document.title = txt.substring(i),
        pause
    }))
}

function getDataFromTable(cls) {
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
            pause: time
        }
    });
    if (error) return ERROR;
    return config.filter(item => item.pause);
}

async function getFaviconUrl(url) {    
    const http = 'https://';
    if (!url.startsWith('http')) url = http + url;
    const { hostname } = new URL(url);
    const res = await fetch(`http://favicongrabber.com/api/grab/${hostname}`)
    const json = await res.json();
    const link = json.icons[0].src;
    if (!link) throw new Error('Failed to get favicon');
	return link;
}