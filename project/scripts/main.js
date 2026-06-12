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

// Cargar al iniciar
renderExercises('todos');
displayRoutine();