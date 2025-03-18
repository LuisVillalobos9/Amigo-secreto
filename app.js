// Array para almacenar los nombres de los amigos
let amigos = [];

// Función para agregar nombres a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo"); // Captura el input
    const nombre = input.value.trim(); // Elimina espacios innecesarios

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }

    amigos.push(nombre); // Agregar al array
    actualizarLista(); // Refrescar la lista en pantalla
    input.value = ""; // Limpiar el campo
}

// Función para actualizar la lista en la interfaz
function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Vaciar la lista antes de actualizar

    amigos.forEach((nombre) => {
        const li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para sortear a los amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes ingresar al menos dos nombres para realizar el sorteo.");
        return;
    }

    let asignados = new Map();
    let disponibles = [...amigos]; // Copia de la lista original

    amigos.forEach((nombre) => {
        let posibles = disponibles.filter((amigo) => amigo !== nombre); // Evitar que se asigne a sí mismo

        if (posibles.length === 0) {
            alert("No se pudo realizar el sorteo. Inténtalo de nuevo.");
            return;
        }

        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        asignados.set(nombre, elegido);

        disponibles = disponibles.filter((amigo) => amigo !== elegido); // Eliminar el asignado
    });

    mostrarResultados(asignados);
}

// Función para mostrar los resultados en la interfaz
function mostrarResultados(asignados) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados anteriores

    asignados.forEach((amigoSecreto, persona) => {
        const li = document.createElement("li");
        li.textContent = `${persona} → ${amigoSecreto}`;
        resultado.appendChild(li);
    });
}

// Nueva función para limpiar la lista
function limpiarLista() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}

document.getElementById("btnAgregar").addEventListener("click", agregarAmigo);
document.getElementById("btnSortear").addEventListener("click", sortearAmigo);
document.getElementById("btnLimpiar").addEventListener("click", limpiarLista);