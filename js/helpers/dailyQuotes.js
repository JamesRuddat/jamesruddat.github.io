
const tips = [
    // Leadership Tips
    "Always lead by example, not by command.",
    "Listen first, then guide.",
    "Small actions daily build strong leadership skills.",
    "Empower your team, don’t micromanage.",
    "Integrity is the foundation of leadership.",

    // Historical Facts with Key Figures
    "CAP was officially founded on December 1, 1941",
    "During WWII, CAP pilots flew anti-submarine missions along the U.S. coasts",
    "In 1946, CAP became the civilian auxiliary of the newly created U.S. Air Force.",
    "The CAP cadet program began in 1942.",
    "CAP has flown over 24 million miles in missions.",
    "CAP provided disaster relief after Hurricane Katrina in 2005, assisting thousands of families.",
    "CAP helped during 9/11 by providing aerial imagery, transport, and emergency services.",

    // Motivational Quotes
    "Excellence is not a skill, it's an attitude.",
    "The more you sweat in training, the less you bleed in battle.",
    "Discipline is the bridge between goals and accomplishment.",
    "Success is the sum of small efforts repeated daily.",
    "Courage is not the absence of fear, but action in spite of it.",
    "A leader is one who knows the way, goes the way, and shows the way.",
    "Confidence comes from preparation, not luck.",
    "Leadership is the capacity to translate vision into reality.",

    // Quick Practical Tips
    "Review drill weekly to stay sharp.",
    "Always wear your uniform with pride and attention to detail.",
    "Attend encampments to gain hands-on leadership experience.",
    "Use teamwork to accomplish more than you could alone.",
    "Keep a personal log of accomplishments and lessons learned.",
    "Seek mentorship from senior members to grow faster.",
    "Cadet leadership skills are transferable to school, work, and life."
];

const tipElement = document.getElementById("tip");
let currentIndex = 0;

function rotateTip() {
    tipElement.style.opacity = 0;

    // Wait for fade-out to finish before changing text
    setTimeout(() => {
        tipElement.innerText = tips[currentIndex];
        currentIndex = (currentIndex + 1) % tips.length;

        // Fade in
        tipElement.style.opacity = 1;
    }, 1000);
}

// Show the first tip immediately
rotateTip();
setInterval(rotateTip, 6000);
