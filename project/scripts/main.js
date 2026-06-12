
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el botón por su ID
    const ctaBtn = document.getElementById('cta-btn');
    
    // Verificamos que el botón exista antes de intentar añadir el evento (por si no estás en index.html)
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            window.location.href = 'library.html';
        });
    }
});

const exercises = [
    { name: "Brench Press", muscle: "Chest", details: "3x10 - Middle chest" },
    { name: "Dumbbell Flyes", muscle: "Chest", details: "3x12 - Full range of motion" },
    { name: "Flat Push-ups", muscle: "Chest", details: "4x failure - Warm-up" },
    { name: "Barbell squat", muscle: "Legs", details: "4x8 - Quadriceps" },
    { name: "Leg Press", muscle: "Legs", details: "3x12 - Strength focus" },
    { name: "Leg Curl", muscle: "Legs", details: "3x15 - Hamstrings" },
    { name: "Deadlift", muscle: "Back", details: "3xMax - Back focus" },
    { name: "Pull-up", muscle: "Back", details: "4x10 - Back middle" },
    { name: "Pulldown", muscle: "Back", details: "3x12 - Back wide" },
    { name: "Bicep Curl", muscle: "Arm", details: "3x12 - Biceps" },
    { name: "Tricep Pushdown", muscle: "Arm", details: "3x10 - Triceps" }
];

// Función para alternar visibilidad (Creativo & Dinámico)
function toggleVisibility() {
    const container = document.querySelector('#exercise-list');
    const btn = document.querySelector('#toggle-btn');
    
    // Cambiamos entre mostrar y ocultar
    if (container.style.display === "none") {
        container.style.display = "grid";
        btn.textContent = "Hide Exercises";
    } else {
        container.style.display = "none";
        btn.textContent = "Show Exercises";
    }
}
function renderExercises(muscleFilter) {
    const container = document.querySelector('#exercise-list');
    const filtered = muscleFilter === 'All' 
        ? exercises 
        : exercises.filter(ex => ex.muscle === muscleFilter);

    // Creamos las tarjetas con un botón de "Añadir"
    container.innerHTML = filtered.map(ex => `
        <div class="card">
            <h3>${ex.name}</h3>
            <p>${ex.details}</p>
            <button onclick="addToRoutine('${ex.name}')">Add to My Routine</button>
        </div>
    `).join('');
    // En tu .map de renderExercises:
    container.innerHTML = filtered.map(ex => `
       <div class="card">
        <h3>${ex.name}</h3>
        <button onclick="addToRoutine('${ex.name}')">Add</button>
        <button class="btn-delete" onclick="removeFromRoutine('${ex.name}')">Remove</button>
       </div>
`).join('');
}

function addToRoutine(exerciseName) {
    // 1. Obtener rutina actual del localStorage
    let currentRoutine = JSON.parse(localStorage.getItem('userRoutine')) || [];
    
    // 2. Evitar duplicados
    if (!currentRoutine.includes(exerciseName)) {
        currentRoutine.push(exerciseName);
        localStorage.setItem('userRoutine', JSON.stringify(currentRoutine));
        alert(`${exerciseName} added to your routine.`);
        displayRoutine(); // Refresh the view
    } else {
        alert("Already in your routine.");
    }
}

function displayRoutine() {
    const list = document.querySelector('#my-routine');
    const saved = JSON.parse(localStorage.getItem('userRoutine')) || [];
    
    list.innerHTML = saved.map(item => `<li>${item}</li>`).join('');
}
function displayTracker() {
    const container = document.querySelector('#tracker-container');
    const saved = JSON.parse(localStorage.getItem('userRoutine')) || [];

    if (saved.length === 0) {
        container.innerHTML = "<p>You haven't added any exercises yet. <a href='library.html'>Add some first</a>.</p>";
        return;
    }

    // Usamos map para crear la lista de ejercicios con inputs
    container.innerHTML = saved.map((exercise, index) => `
        <div class="tracker-card">
            <h3>${exercise}</h3>
            <label>Reps: <input type="number" id="reps-${index}" placeholder="e.g., 10"></label>
            <label>Weight (kg): <input type="number" id="weight-${index}" placeholder="e.g., 20"></label>
            <button onclick="saveProgress(${index}, '${exercise}')">Save Session</button>
        </div>
    `).join('');
}

function saveProgress(index, name) {
    const reps = document.getElementById(`reps-${index}`).value;
    const weight = document.getElementById(`weight-${index}`).value;

    // Guardamos un objeto con el progreso
    const progress = { name, reps, weight, date: new Date().toLocaleDateString() };
    
    // Guardamos en un nuevo array de historial en localStorage
    let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.push(progress);
    localStorage.setItem('workoutHistory', JSON.stringify(history));

    alert(`Progress saved for ${name}: ${reps} reps with ${weight}kg`);
}

function clearRoutine() {
    localStorage.removeItem('userRoutine');
    location.reload(); // Recarga la página para mostrar que está vacío
}
// Función para mostrar ejercicios de la rutina en el tracker
function displayTracker() {
    const container = document.querySelector('#tracker-container');
    const saved = JSON.parse(localStorage.getItem('userRoutine')) || [];

    if (saved.length === 0) {
        container.innerHTML = "<p>You don't have any exercises in your routine. <a href='library.html'>Add some first</a>.</p>";
        return;
    }

    container.innerHTML = saved.map((exercise, index) => `
        <div class="tracker-card">
            <h3>${exercise}</h3>
            <form onsubmit="saveProgress(event, '${exercise}')">
                <fieldset>
                    <legend>Register Set</legend>
                    <label>Reps: <input type="number" id="reps-${index}" required min="1"></label>
                    <label>Weight (kg): <input type="number" id="weight-${index}" required min="0"></label>
                    <button type="submit">Save</button>
                </fieldset>
            </form>
        </div>
    `).join('');
}

// Función para guardar progreso (ramificación condicional + LocalStorage)
function saveProgress(event, name) {
    event.preventDefault(); // Evita recarga de página
    
    // Obtener valores del formulario
    const reps = event.target.querySelector('input[type="number"]').value;
    const weight = event.target.querySelector('input[type="number"]:last-of-type').value;

    const progressEntry = { name, reps, weight, date: new Date().toLocaleDateString() };
    
    let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.push(progressEntry);
    localStorage.setItem('workoutHistory', JSON.stringify(history));

    alert(`Progress registered for ${name}!`);
    displayHistory(); // Update history on screen
}

// Mostrar historial usando métodos de array (slice y reverse)
function displayHistory() {
    const historyList = document.querySelector('#history-list');
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    
    // Mostrar los últimos 5 entrenamientos
    const lastEntries = history.slice(-5).reverse();
    
    historyList.innerHTML = lastEntries.map(entry => `
        <p><strong>${entry.date}:</strong> ${entry.name} - ${entry.reps} reps @ ${entry.weight}kg</p>
    `).join('');
}
// Función para mostrar ejercicios de la rutina en el tracker
function displayTracker() {
    const container = document.querySelector('#tracker-container');
    const saved = JSON.parse(localStorage.getItem('userRoutine')) || [];

    if (saved.length === 0) {
        container.innerHTML = "<p>You don't have any exercises in your routine. <a href='library.html'>Add some first</a>.</p>";
        return;
    }

    container.innerHTML = saved.map((exercise, index) => `
        <div class="tracker-card">
            <h3>${exercise}</h3>
            <form onsubmit="saveProgress(event, '${exercise}')">
                <fieldset>
                    <legend>Register Set</legend>
                    <label>Reps: <input type="number" id="reps-${index}" required min="1"></label>
                    <label>Weight (kg): <input type="number" id="weight-${index}" required min="0"></label>
                    <button type="submit">Save</button>
                </fieldset>
            </form>
        </div>
    `).join('');
}

// Función para guardar progreso (ramificación condicional + LocalStorage)
function saveProgress(event, name) {
    event.preventDefault(); // Evita recarga de página
    
    // Obtener valores del formulario
    const reps = event.target.querySelector('input[type="number"]').value;
    const weight = event.target.querySelector('input[type="number"]:last-of-type').value;

    const progressEntry = { name, reps, weight, date: new Date().toLocaleDateString() };
    
    let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.push(progressEntry);
    localStorage.setItem('workoutHistory', JSON.stringify(history));

    alert(`Progress registered for ${name}!`);
    displayHistory(); // Update history on screen
}

// Mostrar historial usando métodos de array (slice y reverse)
function displayHistory() {
    const historyList = document.querySelector('#history-list');
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    
    // Mostrar los últimos 5 entrenamientos
    const lastEntries = history.slice(-5).reverse();
    
    historyList.innerHTML = lastEntries.map(entry => `
        <p><strong>${entry.date}:</strong> ${entry.name} - ${entry.reps} reps @ ${entry.weight}kg</p>
    `).join('');
}
// Borrar un ejercicio específico de la rutina seleccionada
function removeFromRoutine(exerciseName) {
    let currentRoutine = JSON.parse(localStorage.getItem('userRoutine')) || [];
    // Filtramos para quitar el ejercicio que coincide con el nombre
    currentRoutine = currentRoutine.filter(item => item !== exerciseName);
    localStorage.setItem('userRoutine', JSON.stringify(currentRoutine));
    
    // Refrescamos la vista (esta función depende de dónde estés)
    if (document.getElementById('my-routine')) displayRoutine();
    if (document.getElementById('tracker-container')) displayTracker();
}

// Limpiar todo el historial de entrenamiento
function clearHistory() {
    if (confirm("Are you sure you want to clear your entire workout history?")) {
        localStorage.removeItem('workoutHistory');
        displayHistory(); // Refrescamos el historial en pantalla
    }
}

function displayHistory() {
    const historyList = document.querySelector('#history-list');
    const history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    
    historyList.innerHTML = history.reverse().map((entry, index) => `
        <div class="history-item">
            <p>${entry.date}: ${entry.name} - ${entry.reps} reps @ ${entry.weight}kg</p>
            <button onclick="deleteEntry(${index})">Delete Entry</button>
        </div>
    `).join('');
}

// Función para borrar un registro específico del historial
function deleteEntry(index) {
    let history = JSON.parse(localStorage.getItem('workoutHistory')) || [];
    history.splice(index, 1); // Elimina 1 elemento en la posición 'index'
    localStorage.setItem('workoutHistory', JSON.stringify(history));
    displayHistory();
}

container.innerHTML = saved.map((exercise, index) => `
    <div class="tracker-card">
        <h3>${exercise}</h3>
        <form onsubmit="saveProgress(event, '${exercise}')">
            <fieldset>
                <div class="form-group">
                    <label>Reps: <input type="number" id="reps-${index}" required></label>
                    <label>Weight (kg): <input type="number" id="weight-${index}" required></label>
                </div>
                <button type="submit">Save Record</button>
            </fieldset>
        </form>
    </div>
`).join('');

// Cargar al iniciar
renderExercises('All');
displayRoutine();