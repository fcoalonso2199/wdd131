const exercises = [
    { name: "Brench Press", muscle: "Chest", details: "3x10 - Middle chest" },
    { name: "Dumbbell Flyes", muscle: "Chest", details: "3x12 - Full range of motion" },
    { name: "Barbell squat", muscle: "Legs", details: "4x8 - Quadriceps" },
    { name: "Deadlift", muscle: "Back", details: "3xMax - Back focus" },
    { name: "Bicep Curl", muscle: "Arm", details: "3x12 - Biceps" }
];

function renderExercises(muscleFilter) {
    const container = document.querySelector('#exercise-list');
    if (!container) return;

    const filtered = muscleFilter === 'All' ? exercises : exercises.filter(ex => ex.muscle === muscleFilter);

    container.innerHTML = filtered.map(ex => `
        <div class="card">
            <h3>${ex.name}</h3>
            <p>${ex.details}</p>
            <button onclick="addToRoutine('${ex.name}')">Add to Routine</button>
        </div>
    `).join('');
}

function addToRoutine(exerciseName) {
    let currentRoutine = JSON.parse(localStorage.getItem('userRoutine')) || [];
    if (!currentRoutine.includes(exerciseName)) {
        currentRoutine.push(exerciseName);
        localStorage.setItem('userRoutine', JSON.stringify(currentRoutine));
        alert(`${exerciseName} added to your routine.`);
        if (document.getElementById('my-routine')) displayRoutine();
    } else {
        alert("Already in your routine.");
    }
}

function removeFromRoutine(exerciseName) {
    let currentRoutine = JSON.parse(localStorage.getItem('userRoutine')) || [];
    currentRoutine = currentRoutine.filter(item => item !== exerciseName);
    localStorage.setItem('userRoutine', JSON.stringify(currentRoutine));
    displayRoutine();
}

function displayRoutine() {
    const list = document.querySelector('#my-routine');
    if (!list) return;
    const saved = JSON.parse(localStorage.getItem('userRoutine')) || [];
    list.innerHTML = saved.map(item => `
        <li>${item} <button onclick="removeFromRoutine('${item}')">X</button></li>
    `).join('');
}

function displayTracker() {
    const container = document.querySelector('#tracker-container');
    if (!container) return;
    
    const saved = JSON.parse(localStorage.getItem('userRoutine')) || [];
    if (saved.length === 0) {
        container.innerHTML = "<p>No exercises in your routine. <a href='library.html'>Add some!</a></p>";
        return;
    }

    container.innerHTML = saved.map((exercise, index) => `
        <div class="tracker-card">
            <h3>${exercise}</h3>
            <form onsubmit="saveProgress(event, '${exercise}', ${index})">
                <fieldset>
                    <label>Reps: <input type="number" id="reps-${index}" required min="1"></label>
                    <label>Weight (Kg): <input type="number" id="weight-${index}" required min="0"></label>
                    <button type="submit">Save Session</button>
                </fieldset>
            </form>
        </div>
    `).join('');
}

function saveProgress(event, name, index) {
    event.preventDefault();
    const reps = document.getElementById(`reps-${index}`).value;
    const weight = document.getElementById(`weight-${index}`).value;

    let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.push({ name, reps, weight, date: new Date().toLocaleDateString() });
    localStorage.setItem('workoutHistory', JSON.stringify(history));
    
    alert(`Progress saved for ${name}!`);
    displayHistory();
}

function displayHistory() {
    const historyList = document.querySelector('#history-list');
    if (!historyList) return;
    
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    historyList.innerHTML = history.reverse().map((entry, index) => `
        <div class="history-item">
            <p>${entry.date}: ${entry.name} - ${entry.reps} reps @ ${entry.weight}kg</p>
            <button onclick="deleteEntry(${index})">Delete</button>
        </div>
    `).join('');
}

function deleteEntry(index) {
    let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('workoutHistory', JSON.stringify(history));
    displayHistory();
}

document.addEventListener('DOMContentLoaded', () => {
    const ctaBtn = document.getElementById('cta-btn');
    if (ctaBtn) ctaBtn.addEventListener('click', () => window.location.href = 'library.html');

    if (document.getElementById('exercise-list')) renderExercises('All');
    if (document.getElementById('my-routine')) displayRoutine();
    if (document.getElementById('tracker-container')) {
        displayTracker();
        displayHistory();
    }
});

function toggleVisibility() {
    const container = document.querySelector('#exercise-list');
    const btn = document.querySelector('#toggle-btn');
    
    if (!container) return;

    if (container.style.display === "none") {
        container.style.display = "grid";
        btn.textContent = "Hide Exercises";
    } else {
        container.style.display = "none";
        btn.textContent = "Show Exercises";
    }
}