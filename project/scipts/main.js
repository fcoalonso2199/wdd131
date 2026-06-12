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
    let saved = JSON.parse(localStorage.getItem('myRoutine')) || [];
    
    if (!saved.includes(name)) {
        saved.push(name);
        localStorage.setItem('myRoutine', JSON.stringify(saved));
        alert(`¡${name} añadido a tu rutina!`);
    } else {
        alert("Ya está en tu rutina.");
    }
}

// Inicializar al cargar
renderExercises();