const bugleCalls = [
    { id: "AdjutantsCall", name: "Adjutant's Call", description: "Indicates that the adjutant is about to form the formation.", file: "bugleCalls/AdjutantsCall.ogg" },
    { id: "Assembly", name: "Assembly", description: "Signals troops to assemble at a designated place.", file: "bugleCalls/Assembly.ogg" },
    { id: "Attention", name: "Attention", description: "Sounded as a warning that troops are about to be called to attention.", file: null },
    { id: "BootsAndSaddles", name: "Boots and Saddles", description: "Sounded for mounted troops to mount and take their place in line.", file: null },
    { id: "CallToQuarters", name: "Call to Quarters", description: "Signals all personnel not authorized to be absent to return to their quarters for the night.", file: "bugleCalls/CallToQuarters.ogg" },
    { id: "ChurchCall", name: "Church Call", description: "Signals that religious services are about to begin; may announce formation of a funeral escort.", file: null },
    { id: "DrillCall", name: "Drill Call", description: "Sounds as a warning to turn out for drill.", file: "bugleCalls/DrillCall.ogg" },
    { id: "FatigueCall", name: "Fatigue Call", description: "Signals all designated personnel to report for fatigue duty.", file: null },
    { id: "FireCall", name: "Fire Call", description: "Signals a fire on post or in the vicinity; also used for fire drills.", file: "bugleCalls/FireCall.mp3" },
    { id: "FirstCall", name: "First Call", description: "Sounds as a warning that personnel will prepare to assemble for formation.", file: "bugleCalls/FirstCall.ogg" },
    { id: "FirstSergeantsCall", name: "First Sergeant's Call", description: "Signals that the First Sergeant is about to form the formation.", file: null },
    { id: "MailCall", name: "Mail Call", description: "Signals personnel to assemble for the distribution of mail.", file: "bugleCalls/MailCall.ogg" },
    { id: "MessCall", name: "Mess Call", description: "Signals mealtime.", file: "bugleCalls/MessCall.ogg" },
    { id: "OfficersCall", name: "Officers Call", description: "Signals all officers to assemble at a designated place.", file: "bugleCalls/OfficersCall.ogg" },
    { id: "PayCall", name: "Pay Call", description: "Signals that troops will be paid.", file: null },
    { id: "Recall", name: "Recall", description: "Signals duties or drills to cease.", file: "bugleCalls/Recall.ogg" },
    { id: "Retreat", name: "Retreat", description: "Signals the end of the official day. Played before 'To The Colors'.", file: "bugleCalls/Retreat.ogg" },
    { id: "Reveille", name: "Reveille", description: "Signals troops to awaken for morning roll call; accompanies raising of the flag.", file: "bugleCalls/Reveille.ogg" },
    { id: "TheRouse", name: "The Rouse", description: "Used in Commonwealth nations to signal soldiers to get out of bed.", file: "bugleCalls/Rouse.wav" },
    { id: "SchoolCall", name: "School Call", description: "Signals school is about to begin.", file: null },
    { id: "SickCall", name: "Sick Call", description: "Signals all troops needing medical attention to report to the dispensary.", file: null },
    { id: "Taps", name: "Taps", description: "Signals that unauthorized lights are to be extinguished; also sounded at military funerals.", file: "bugleCalls/Taps.ogg" },
    { id: "Tattoo", name: "Tattoo", description: "Signals lights out and that all loud talking and disturbances be discontinued within 15 minutes.", file: "bugleCalls/Tattoo.ogg" },
    { id: "ToTheColors", name: "To The Colors", description: "Used to render honors to the nation. Played when no band is available, immediately following Retreat.", file: "bugleCalls/ToTheColor.ogg" },
    { id: "ToArms", name: "To Arms", description: "Signals all troops to fall under arms at designated places without delay.", file: null }
];

const tbody = document.querySelector("#bugleTable tbody"); // make sure your <table> has id="bugleTable"

bugleCalls.forEach(call => {
    const row = document.createElement("tr");

    // Only create controls if there is an audio file
    let controlsHTML = '';
    if (call.file) {
        controlsHTML = `
            <audio id="${call.id}" src="${call.file}" type="audio/ogg"></audio>
            <button class="small-btn" onclick="playAudio('${call.id}')">Play</button>
            <button class="small-btn" onclick="stopAudio('${call.id}')">Stop Audio</button>
            <input type="time" id="${call.id}Time">
            <button class="small-btn" onclick="scheduleFromInput('${call.id}', '${call.id}Time')">Schedule Daily</button>
            <button class="small-btn" onclick="stopScheduled('${call.id}')">Stop Schedule</button>
        `;
    } else {
        controlsHTML = 'No audio file';
    }

    row.innerHTML = `
        <td>${call.name}</td>
        <td>${call.description}</td>
        <td>${controlsHTML}</td>
    `;

    tbody.appendChild(row);
});

const scheduledIntervals = {}; // Keep track of scheduled loops

function playAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

function stopAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.pause();
        audio.currentTime = 0; // reset to start
    }
}

function scheduleFromInput(audioId, inputId) {
    const audio = document.getElementById(audioId);
    const timeInput = document.getElementById(inputId).value;
    if (!timeInput) return alert("Please select a time!");

    // If already scheduled, clear previous interval
    if (scheduledIntervals[audioId]) {
        clearInterval(scheduledIntervals[audioId]);
    }

    const [hour, minute] = timeInput.split(':').map(Number);

    function checkTime() {
        const now = new Date();
        if (now.getHours() === hour && now.getMinutes() === minute) {
            audio.loop = true; // loop until user stops it
            playAudio(audioId);
        }
    }

    // Check every 30 seconds
    scheduledIntervals[audioId] = setInterval(checkTime, 30000);

    alert(`Scheduled ${audioId} daily at ${timeInput}.`);
}

function stopScheduled(audioId) {
    const audio = document.getElementById(audioId);
    if (scheduledIntervals[audioId]) {
        clearInterval(scheduledIntervals[audioId]);
        delete scheduledIntervals[audioId];
        if (audio) audio.pause();  // stop looping audio
        alert(`Stopped daily schedule for ${audioId}.`);
    }
}