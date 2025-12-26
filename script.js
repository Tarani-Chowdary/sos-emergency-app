let sosActive = false;
let countdown = 5;
let countdownInterval;

const sosButton = document.getElementById("sosButton");
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const cancelBtn = document.getElementById("cancelBtn");
const flashOverlay = document.getElementById("flashOverlay");

sosButton.addEventListener("click", startSOS);
cancelBtn.addEventListener("click", cancelSOS);

function startSOS() {
    if (sosActive) return;

    sosActive = true;
    countdown = 5;

    sosButton.classList.add("active");
    timer.classList.add("active");
    cancelBtn.classList.add("active");
    timer.textContent = countdown;

    countdownInterval = setInterval(() => {
        countdown--;
        timer.textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownInterval);
            activateEmergency();
        }
    }, 1000);
}

function activateEmergency() {
    status.classList.add("active");
    timer.classList.remove("active");
    flashOverlay.classList.add("active");

    activateFeature("feature1", "contact1", "Tracking...");
    activateFeature("feature2", "contact2", "Notified ✓");
    activateFeature("feature3", "contact3", "Notified ✓");
    activateFeature("feature4");
    activateFeature("feature5");
}

function activateFeature(featureId, contactId, text) {
    document.getElementById(featureId).classList.add("active");
    if (contactId) {
        document.getElementById(contactId).textContent = text;
    }
}

function cancelSOS() {
    sosActive = false;
    clearInterval(countdownInterval);

    sosButton.classList.remove("active");
    timer.classList.remove("active");
    status.classList.remove("active");
    cancelBtn.classList.remove("active");
    flashOverlay.classList.remove("active");

    document.querySelectorAll(".feature-item").forEach(f => f.classList.remove("active"));

    ["contact1","contact2","contact3"].forEach(id => {
        document.getElementById(id).textContent = "Ready";
    });
}
