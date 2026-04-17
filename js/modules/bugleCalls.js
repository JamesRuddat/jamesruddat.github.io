import { bugleCalls, music, presets } from '/assets/audio/audio.js';

let editMode = false;

let callQueue = [];
let callPlaying = false;

let musicQueue = [];
let musicPlaying = false;

let currentMusicIndex = 0;
let currentMusicAudio = null;
let fadeInterval = null;

let musicVolume = 1;
let bugleVolume = 1;

// --- Load persisted schedule ---
const storedSchedule = localStorage.getItem('callQueue');
if (storedSchedule) {
    callQueue = JSON.parse(storedSchedule);
    restoreAudioForScheduledCalls();
}

document.addEventListener("DOMContentLoaded", () => {

    loadPresets();

    // --- Info Page Tables ---
    const bugleTable = document.querySelector("#bugleTable tbody");
    const musicTable = document.querySelector("#musicTable tbody");

    function renderTable(data, table) {
        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    ${item.file ? `
                        <audio id="${item.id}" src="${item.file}"></audio>
                        <button class="small-btn" onclick="playAudio('${item.id}')">Play</button>
                        <button class="small-btn" onclick="stopAudio('${item.id}')">Stop</button>
                    ` : 'No audio file'}
                    </td>    
                <td>${item.name}</td>
                <td>${item.description}</td>
            `;
            table.appendChild(row);
        });
    }

    if (bugleTable) renderTable(bugleCalls, bugleTable);
    if (musicTable) renderTable(music, musicTable);

    // --- Builder Dropdown ---
    const builderDiv = document.getElementById("builder");
    const nowPlaying = document.getElementById("nowPlaying");

    // Get sliders after insertion
    const musicVolumeSlider = document.getElementById("musicVolume");
    const bugleVolumeSlider = document.getElementById("bugleVolume");

    // Prepare click sound for feedback on volume change
    const clickSound = new Audio('/assets/audio/other/click-box.wav');

    function playClickSound(volume) {
        clickSound.pause();
        clickSound.currentTime = 0;
        clickSound.volume = volume;
        clickSound.play();
    }

    musicVolumeSlider.addEventListener("input", (e) => {
        musicVolume = parseFloat(e.target.value);
        if (currentMusicAudio) {
            currentMusicAudio.volume = musicVolume;
        }
        playClickSound(musicVolume);
    });

    bugleVolumeSlider.addEventListener("input", (e) => {
        bugleVolume = parseFloat(e.target.value);
        playClickSound(bugleVolume);
    });

    // --- Builder dropdown elements ---
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
        if (callQueue.some(sc => sc.id === selected.id && sc.time === timeValue)) {
            return alert("This is already scheduled at that time!");
        }

        callQueue.push({
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

const editBtn = document.getElementById("editToggle");

editBtn.onclick = () => {
    editMode = !editMode;
    editBtn.textContent = editMode ? "Save Schedule" : "Edit Schedule";
    renderSchedule(); // re-render to apply lock state
};

    // --- Render Schedule ---
function renderSchedule() {
    const tbody = document.querySelector("#scheduleTable tbody");
    tbody.innerHTML = "";

    callQueue.forEach((item, index) => {
        const allAudio = [...bugleCalls, ...music];
        const data = allAudio.find(c => c.id === item.id);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${data.name}</td>
            <td>
                <input type="time" value="${item.time}" ${!editMode ? "disabled" : ""}>
            </td>
            <td class="actions"></td>
        `;

        // Time input
        const timeInput = row.querySelector("input");
        timeInput.onchange = (e) => updateTime(index, e.target.value);

        const actionsTd = row.querySelector(".actions");

        if (editMode) {
            const upBtn = document.createElement("button");
            upBtn.className = "small-btn"
            upBtn.textContent = "↑";
            upBtn.onclick = () => moveUp(index);

            const downBtn = document.createElement("button");
            downBtn.className = "small-btn"
            downBtn.textContent = "↓";
            downBtn.onclick = () => moveDown(index);

            const delBtn = document.createElement("button");
            delBtn.className = "alt-btn"
            delBtn.textContent = "X";
            delBtn.onclick = () => removeItem(index);

            actionsTd.appendChild(upBtn);
            actionsTd.appendChild(downBtn);
            actionsTd.appendChild(delBtn);
        } else {
            actionsTd.textContent = "...";
        }

        tbody.appendChild(row);
        syncScheduleToTextarea();
    });
}

function moveUp(index) {
    if (index === 0) return;

    [callQueue[index - 1], callQueue[index]] =
        [callQueue[index], callQueue[index - 1]];

    saveSchedule();
    renderSchedule();
};

function moveDown(index) {
    if (index === callQueue.length - 1) return;

    [callQueue[index + 1], callQueue[index]] =
        [callQueue[index], callQueue[index + 1]];

    saveSchedule();
    renderSchedule();
};

function updateTime(index, newTime) {
    callQueue[index].time = newTime;
    saveSchedule();
};

function removeItem(index) {
    callQueue.splice(index, 1);
    saveSchedule();
    renderSchedule();
};

    // --- Daily Scheduler with Music Fade ---
    const FADE_DURATION = 10000; // 10 sec fade
    const TOLERANCE = 5000;      // 5 seconds tolerance for playing bugle calls
    setInterval(() => {
        const now = new Date();

        // Gather calls that should play now (within tolerance)
        const callsToPlayNow = [];

        callQueue.forEach(item => {
            const [hh, mm] = item.time.split(':');
            const callTime = new Date();
            callTime.setHours(parseInt(hh), parseInt(mm), 0, 0);

            const timeDiff = callTime - now;

            if (timeDiff <= TOLERANCE && timeDiff >= -TOLERANCE && item.lastPlayed !== now.toDateString()) {
                callsToPlayNow.push(item);
            }
        });

        // If calls should be played and not already playing, start playing them in order
        if (callsToPlayNow.length > 0 && !callPlaying) {
            // Mark them as lastPlayed to prevent replay this tick
            callsToPlayNow.forEach(call => call.lastPlayed = now.toDateString());

            // Fade out music 10 seconds before the earliest call
            const earliestCallTime = callsToPlayNow.reduce((earliest, c) => {
                const [hh, mm] = c.time.split(':');
                const callTime = new Date();
                callTime.setHours(parseInt(hh), parseInt(mm), 0, 0);
                return callTime < earliest ? callTime : earliest;
            }, new Date(Date.now() + 86400000)); // future date init

            const fadeTimeDiff = earliestCallTime - now;

            if (musicPlaying && currentMusicAudio && fadeTimeDiff > 0 && fadeTimeDiff <= FADE_DURATION) {
                fadeVolume(currentMusicAudio, 0, fadeTimeDiff);
                setTimeout(() => {
                    if (!currentMusicAudio.paused) currentMusicAudio.pause();
                    playScheduledCallsInOrder(callsToPlayNow.slice());
                }, fadeTimeDiff);
            } else {
                playScheduledCallsInOrder(callsToPlayNow.slice());
            }
        }

    }, 1000);

    renderSchedule();
});

// --- Play scheduled calls in order ---
function playScheduledCallsInOrder(calls) {
    if (calls.length === 0) {
        callPlaying = false;
        document.getElementById("nowPlaying").textContent = "Now Playing: None";
        if (currentMusicAudio && musicPlaying) {
            currentMusicAudio.play();
            fadeVolume(currentMusicAudio, musicVolume, 2000);
        }
        return;
    }

    callPlaying = true;
    const call = calls.shift();

    call.audio.currentTime = 0;
    call.audio.volume = bugleVolume;
    call.audio.play();
    document.getElementById("nowPlaying").textContent = `Now Playing: ${call.id}`;

    call.audio.onended = () => {
        playScheduledCallsInOrder(calls);
    };
}

// --- Audio Controls ---
window.playAudio = function (id) {
    const audio = document.getElementById(id);
    if (audio) { audio.currentTime = 0; audio.play(); }
};
window.stopAudio = function (id) {
    const audio = document.getElementById(id);
    if (audio) { audio.pause(); audio.currentTime = 0; }
};

function restoreAudioForScheduledCalls() {
    const allAudio = [...bugleCalls, ...music];
    callQueue.forEach(item => {
        if (!item.audio) {
            const data = allAudio.find(c => c.id === item.id);
            if (data && data.file) {
                item.audio = new Audio(data.file);
            }
        }
    });
}

// --- Music Queue ---
function playNextMusic() {
    if (currentMusicAudio) {
        currentMusicAudio.pause();
        currentMusicAudio = null;
    }
    if (!musicPlaying || currentMusicIndex >= musicQueue.length) {
        musicPlaying = false;
        currentMusicAudio = null;
        document.getElementById("nowPlaying").textContent = "Now Playing: None";
        return;
    }

    const track = musicQueue[currentMusicIndex];
    currentMusicAudio = new Audio(track.file);
    currentMusicAudio.volume = musicVolume;
    currentMusicAudio.play();
    document.getElementById("nowPlaying").textContent = `Now Playing: ${track.name}`;

    currentMusicAudio.onended = () => {
        currentMusicIndex++;
        playNextMusic();
    };
}

window.startMusic = function () {
    if (musicPlaying) return;
    musicQueue = music.filter(track => track.sensitive == false);
    if (musicQueue.length === 0) return;
    currentMusicIndex = 0;
    musicPlaying = true;
    playNextMusic();
};

window.stopMusic = function () {
    if (currentMusicAudio) {
        currentMusicAudio.pause();
        currentMusicAudio.currentTime = 0;
        currentMusicAudio = null;
    }
    musicPlaying = false;
    currentMusicIndex = 0;
    musicQueue = [];
    if (fadeInterval) {
        clearInterval(fadeInterval);
        fadeInterval = null;
    }
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
            audioEl.volume = Math.min(1, Math.max(0, audioEl.volume + volStep));
            currentStep++;
        }
    }, stepTime);
}

function loadPresets() {
    const tbody = document.querySelector("#schedulePresets tbody");
    tbody.innerHTML = "";

    presets.forEach(preset => {
        const headerRow = document.createElement("tr");
        const headerCell = document.createElement("td");
        headerCell.textContent = preset.name;
        headerCell.style.fontWeight = "bold";

        headerRow.appendChild(headerCell);
        tbody.appendChild(headerRow);

        // RAW TEXT ROWS (KEEP "|")
        const lines = preset.data.trim().split("\n");

        lines.forEach(line => {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.textContent = line.trim();

            row.appendChild(cell);
            tbody.appendChild(row);
        });
    });
}

// --- Persist Schedule ---
function saveSchedule() {
    localStorage.setItem('callQueue', JSON.stringify(callQueue.map(c => ({
        id: c.id,
        time: c.time
    }))));
}

function syncScheduleToTextarea() {
    const textarea = document.getElementById("scheduleInput");
    if (!textarea) return;

    textarea.value = callQueue
        .map(item => `${item.id}|${item.time}`)
        .join("\n");
}

window.importScheduleText = function () {
    const raw = document.getElementById("scheduleInput").value.trim();

    if (!raw) {
        alert("No schedule text provided");
        return;
    }

    const lines = raw.split("\n");
    const newSchedule = [];

    for (const line of lines) {
        const parts = line.split("|");

        if (parts.length < 2) continue;

        const id = parts[0].trim();
        const time = parts[1].trim();

        if (!id || !time) continue;

        newSchedule.push({
            id,
            time
        });
    }

    callQueue = newSchedule;

    // persist + update UI
    saveSchedule();
    //window.renderSchedule();
    syncScheduleToTextarea();

    alert("Schedule loaded successfully! Please refresh");
};