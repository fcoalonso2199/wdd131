const exercises = [
    { name: "Bench Press", muscle: "chest", difficulty: "intermediate" },
    { name: "Tricep Dips", muscle: "triceps", difficulty: "beginner" },
    { name: "Squats", muscle: "legs", difficulty: "intermediate" },
    { name: "Push Ups", muscle: "chest", difficulty: "beginner" }
];

const mainContent = document.getElementById('content-placeholder');
const ctaButton = document.getElementById('cta-btn');

function renderExercises(exerciseList) {
    mainContent.innerHTML = ""; 
    
    exerciseList.forEach(ex => {
        const card = `
            <div class="exercise-card">
                <h3>${ex.name}</h3>
                <p>Target: ${ex.muscle.toUpperCase()}</p>
                <button onclick="saveRoutine('${ex.name}')">Save to Routine</button>
            </div>
        `;
        mainContent.innerHTML += card;
    });
}

function saveRoutine(exerciseName) {
    let savedRoutine = JSON.parse(localStorage.getItem('myRoutine')) || [];
    
    if (!savedRoutine.includes(exerciseName)) {
        savedRoutine.push(exerciseName);
        localStorage.setItem('myRoutine', JSON.stringify(savedRoutine));
        alert(`${exerciseName} added to your routine!`);
    } else {
        alert("Exercise already in your routine.");
    }
}

ctaButton.addEventListener('click', () => {
    const userGoal = prompt("Do you want to see 'beginner' or 'intermediate' exercises?");
    
    const filtered = exercises.filter(ex => ex.difficulty === userGoal);
    
    if (filtered.length > 0) {
        renderExercises(filtered);
    } else {
        renderExercises(exercises);
    }
});