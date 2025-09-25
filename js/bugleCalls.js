import { bugleCalls, music } from '/js/data/audio/audio.js';

let scheduledCalls = []; // store calls with time
let musicQueue = [];
let currentMusicIndex = 0;
let musicPlaying = false;
let currentMusicAudio = null;
let fadeInterval = null;

// --- Load persisted schedule ---
const storedSchedule = localStorage.getItem('scheduledCalls');
if (storedSchedule) scheduledCalls = JSON.parse(storedSchedule);

document.addEventListener("DOMContentLoaded", () => {

    // --- Info Page Tables ---
    const bugleTable = document.querySelector("#bugleTable tbody");
    const musicTable = document.querySelector("#musicTable tbody");

    function renderTable(data, table) {
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>
                    ${item.file ? `
                        <audio id="${item.id}" src="${item.file}"></audio>
                        <button class="small-btn" onclick="playAudio('${item.id}')">Play</button>
                        <button class="small-btn" onclick="stopAudio('${item.id}')">Stop</button>
                    ` : 'No audio file'}
                </td>
            `;
            table.appendChild(row);
        });
    }

    if (bugleTable) renderTable(bugleCalls, bugleTable);
    if (musicTable) renderTable(music, musicTable);

    // --- Builder Dropdown ---
    const builderDiv = document.getElementById("builder");
    const mySchedule = document.getElementById("mySchedule");
    const nowPlaying = document.getElementById("nowPlaying");

    const rowDiv = document.createElement("div");
    rowDiv.className = "call-row";

    const select = document.createElement("select");

    const bugleGroup = document.createElement("optgroup");
    bugleGroup.label = "Bugle Calls";
    bugleCalls.forEach(call => {
        if (call.file) {
            const option = document.createElement("option");
            option.value = call.id;
            option.textContent = call.name;
            bugleGroup.appendChild(option);
        }
    });
    select.appendChild(bugleGroup);

    const musicGroup = document.createElement("optgroup");
    musicGroup.label = "Music";
    music.forEach(song => {
        if (song.file) {
            const option = document.createElement("option");
            option.value = song.id;
            option.textContent = song.name;
            musicGroup.appendChild(option);
        }
    });
    select.appendChild(musicGroup);

    const timeInput = document.createElement("input");
    timeInput.type = "time";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.className = "small-btn";
    addBtn.onclick = () => {
        const allAudio = [...bugleCalls, ...music];
        const selected = allAudio.find(c => c.id === select.value);
        const timeValue = timeInput.value;
        if (!timeValue) return alert("Please select a time!");
        if (scheduledCalls.some(sc => sc.id === selected.id && sc.time === timeValue)) {
            return alert("This is already scheduled at that time!");
        }

        scheduledCalls.push({
            id: selected.id,
            audio: new Audio(selected.file),
            time: timeValue,
            lastPlayed: null
        });
        saveSchedule();
        renderSchedule();
    };

    rowDiv.appendChild(select);
    rowDiv.appendChild(timeInput);
    rowDiv.appendChild(addBtn);
    builderDiv.appendChild(rowDiv);

    // --- Render Schedule ---
    function renderSchedule() {
        mySchedule.innerHTML = '';
        scheduledCalls.sort((a, b) => a.time.localeCompare(b.time));
        scheduledCalls.forEach(item => {
            const allAudio = [...bugleCalls, ...music];
            const data = allAudio.find(c => c.id === item.id);
            const li = document.createElement("li");
            li.textContent = `${item.time} - ${data.name} `;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.className = "small-btn";
            removeBtn.onclick = () => {
                const index = scheduledCalls.findIndex(sc => sc.id === item.id && sc.time === item.time);
                if (index > -1) scheduledCalls.splice(index, 1);
                saveSchedule();
                renderSchedule();
            };
            li.appendChild(removeBtn);
            mySchedule.appendChild(li);
        });
    }

    // --- Daily Scheduler with Music Fade ---
    const FADE_DURATION = 10000; // 10 sec fade
    setInterval(() => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        scheduledCalls.forEach(item => {
            const [hh, mm] = item.time.split(':');
            const callTime = new Date();
            callTime.setHours(parseInt(hh), parseInt(mm), 0, 0);
            const timeDiff = callTime - now;

            const allAudio = [...bugleCalls, ...music];
            const callData = allAudio.find(c => c.id === item.id);
            const isBugle = bugleCalls.some(b => b.id === item.id && b.id !== "TheStarSpangledBanner");

            // Pre-fade 10s before bugle
            if (isBugle && musicPlaying && currentMusicAudio && timeDiff <= FADE_DURATION && timeDiff > 0) {
                fadeVolume(currentMusicAudio, 0, timeDiff);
            }

            // Play bugle call
            if (isBugle && timeDiff <= 0 && item.lastPlayed !== now.toDateString()) {
                if (currentMusicAudio) currentMusicAudio.volume = 0;
                item.audio.currentTime = 0;
                item.audio.play();
                item.lastPlayed = now.toDateString();
                nowPlaying.textContent = `Now Playing: ${callData.name}`;

                item.audio.onended = () => {
                    // Fade music back up
                    if (currentMusicAudio) fadeVolume(currentMusicAudio, 1, FADE_DURATION);
                    nowPlaying.textContent = "Now Playing: None";
                };
            }
        });
    }, 1000);

    renderSchedule();
});

// --- Audio Controls ---
window.playAudio = function (id) {
    const audio = document.getElementById(id);
    if (audio) { audio.currentTime = 0; audio.play(); }
};
window.stopAudio = function (id) {
    const audio = document.getElementById(id);
    if (audio) { audio.pause(); audio.currentTime = 0; }
};

// --- Music Queue ---
function playNextMusic() {
    if (!musicPlaying || currentMusicIndex >= musicQueue.length) {
        musicPlaying = false;
        currentMusicAudio = null;
        document.getElementById("nowPlaying").textContent = "Now Playing: None";
        return;
    }

    const track = musicQueue[currentMusicIndex];
    currentMusicAudio = new Audio(track.file);
    currentMusicAudio.volume = 1;
    currentMusicAudio.play();
    document.getElementById("nowPlaying").textContent = `Now Playing: ${track.name}`;

    currentMusicAudio.onended = () => {
        currentMusicIndex++;
        playNextMusic();
    };
}

window.startMusic = function () {
    musicQueue = music.filter(track => track.name !== "The Star-Spangled Banner");
    if (musicQueue.length === 0) return;
    currentMusicIndex = 0;
    musicPlaying = true;
    playNextMusic();
};

window.stopMusic = function () {
    if (currentMusicAudio) {
        currentMusicAudio.pause();
        currentMusicAudio.currentTime = 0;
    }
    musicPlaying = false;
    currentMusicAudio = null;
    currentMusicIndex = 0;
    musicQueue = [];
    document.getElementById("nowPlaying").textContent = "Now Playing: None";
};

// --- Fade Function ---
function fadeVolume(audioEl, targetVol, duration) {
    if (!audioEl) return;
    clearInterval(fadeInterval);
    const startVol = audioEl.volume;
    const stepTime = 100;
    const steps = duration / stepTime;
    const volStep = (targetVol - startVol) / steps;
    let currentStep = 0;

    fadeInterval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audioEl.volume = targetVol;
        } else {
            audioEl.volume += volStep;
            currentStep++;
        }
    }, stepTime);
}

// --- Persist Schedule ---
function saveSchedule() {
    localStorage.setItem('scheduledCalls', JSON.stringify(scheduledCalls.map(c => ({
        id: c.id,
        time: c.time
    }))));
}
