const exercises = [
    { name: "Press Banca", muscle: "pecho", details: "3 series de 10 reps" },
    { name: "Aperturas con mancuerna", muscle: "pecho", details: "3 series de 12 reps" },
    { name: "Sentadilla", muscle: "pierna", details: "4 series de 8 reps" },
    { name: "Peso Muerto", muscle: "pierna", details: "3 series de 6 reps" },
    { name: "Remo con barra", muscle: "espalda", details: "3 series de 10 reps" }
];

function renderExercises(muscleFilter) {
    const container = document.querySelector('#exercise-list');
    const filtered = muscleFilter === 'todos' 
        ? exercises 
        : exercises.filter(ex => ex.muscle === muscleFilter);

    // Creamos las tarjetas con un botón de "Añadir"
    container.innerHTML = filtered.map(ex => `
        <div class="card">
            <h3>${ex.name}</h3>
            <p>${ex.details}</p>
            <button onclick="addToRoutine('${ex.name}')">Añadir a mi rutina</button>
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
        alert(`${exerciseName} añadido a tu rutina.`);
        displayRoutine(); // Refrescar la vista
    } else {
        alert("Ya está en tu rutina.");
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
        container.innerHTML = "<p>Aún no has añadido ejercicios. ¡Ve a la biblioteca!</p>";
        return;
    }

    // Usamos map para crear la lista de ejercicios con inputs
    container.innerHTML = saved.map((exercise, index) => `
        <div class="tracker-card">
            <h3>${exercise}</h3>
            <label>Reps: <input type="number" id="reps-${index}" placeholder="Ej: 10"></label>
            <label>Peso (kg): <input type="number" id="weight-${index}" placeholder="Ej: 20"></label>
            <button onclick="saveProgress(${index}, '${exercise}')">Guardar Sesión</button>
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

    alert(`Progreso guardado para ${name}: ${reps} reps con ${weight}kg`);
}

function clearRoutine() {
    localStorage.removeItem('userRoutine');
    location.reload(); // Recarga la página para mostrar que está vacío
}
// Cargar al iniciar
renderExercises('todos');
displayRoutine();