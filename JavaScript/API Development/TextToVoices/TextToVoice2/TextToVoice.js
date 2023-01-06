let voiceList = document.querySelector('#voiceList');
let textInput = document.querySelector('#textInput');
let btnSpeak = document.querySelector('#btnSpeak');

let tts = window.speechSynthesis;
let voices = [];
let browser = navigator.userAgent.toLowerCase();

GetVoices();

if(speechSynthesis !== undefined) speechSynthesis.onvoiceschanged = GetVoices;

btnSpeak.addEventListener('click', () => {
    let toSpeak = new SpeechSynthesisUtterance(textInput.value);
    let selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    
    voices.forEach((voice) => {
        if(voice.name === selectedVoiceName) toSpeak.voice = voice;
    });
    tts.speak(toSpeak);
});

function GetVoices() {
    voices = tts.getVoices();
    voiceList.innerHTML = '';
    voices.forEach((voice) => {
        let listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });
    if(browser.indexOf("chrome") != -1) {
        voiceList.selectedIndex = 13;
    }
    if(browser.indexOf("edg") != -1) {
        voiceList.selectedIndex = 15;
    }
    if(browser.indexOf("whale") != -1) {
        voiceList.selectedIndex = 3;
    }
    if(browser.indexOf("msie") != -1) {
        voiceList.selectedIndex = 0;
    }
}