const exercises = [
    { id: 1, name: "Press de Banca", muscle: "pecho", img: "bench.jpg" },
    { id: 2, name: "Sentadilla", muscle: "pierna", img: "squat.jpg" },
    { id: 3, name: "Dominadas", muscle: "espalda", img: "pullup.jpg" },
    { id: 4, name: "Curl de Bíceps", muscle: "brazo", img: "curl.jpg" }
];

// Función para renderizar ejercicios
function renderExercises(filter = "todos") {
    const container = document.querySelector('#exercise-list');
    
    // Filtramos según el músculo
    const filtered = filter === "todos" 
        ? exercises 
        : exercises.filter(ex => ex.muscle === filter);

    // Usamos plantillas literales para construir el HTML
    container.innerHTML = filtered.map(ex => `
        <div class="card" onclick="selectExercise('${ex.name}')">
            <h3>${ex.name}</h3>
            <p>Músculo: ${ex.muscle}</p>
        </div>
    `).join('');
}

// Función creativa: Selección con feedback visual (Almacenamiento Local)
function selectExercise(name) {
    // 1. Guardar en localStorage
    let saved = JSON.parse(localStorage.getItem('myRoutine')) || [];
    saved.push(name);
    localStorage.setItem('myRoutine', JSON.stringify(saved));

    // 2. Efecto visual creativo (Modificación del DOM)
    event.currentTarget.style.border = "3px solid #E63946";
    event.currentTarget.style.backgroundColor = "#fff0f0";
}

// Inicializar al cargar
renderExercises();