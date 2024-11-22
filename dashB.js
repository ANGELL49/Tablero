function crearElementoTarea(tareaNombre, esImportante) {
  const tareaDiv = document.createElement("div");
    tareaDiv.classList.add("tarea");
    if (esImportante) tareaDiv.classList.add("importante");

    const textoTarea = document.createElement("span");
    textoTarea.textContent = tareaNombre;

    const checkboxRealizada = document.createElement("input");
    checkboxRealizada.type = "checkbox";
    checkboxRealizada.onchange = () => {
        textoTarea.style.textDecoration = checkboxRealizada.checked ? "line-through" : "none";
    };

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("boton");
    botonEliminar.onclick = () => {
        tareaDiv.remove();
        guardarTareas(); 
    };

    tareaDiv.appendChild(checkboxRealizada);
    tareaDiv.appendChild(textoTarea);
    tareaDiv.appendChild(botonEliminar);

    return tareaDiv;
}

function agregarTarea() {
  const tareaNombre = document.getElementById("tareaNombre").value.trim();
  const masImportante = document.getElementById("masImportante").checked;
  const menosImportante = document.getElementById("menosImportante").checked;

  if (!tareaNombre) {
      alert("Escribe una descripción para la tarea");
      return;
  }
  if (!masImportante && !menosImportante) {
      alert("Selecciona si la tarea es importante o no");
      return;
  }

  const tareaDiv = crearElementoTarea(tareaNombre, masImportante);

  const columnaDestino = masImportante
      ? document.getElementById("columMasImportantes")
      : document.getElementById("columMenosImportante");

  columnaDestino.appendChild(tareaDiv);

  document.getElementById("tareaNombre").value = "";
  document.getElementById("masImportante").checked = false;
  document.getElementById("menosImportante").checked = false;
}

function guardarTareas() {
  const tareas = {
      masImportantes: Array.from(document.getElementById("columMasImportantes").children).map(
          tarea => tarea.querySelector("span").textContent
      ),
      menosImportantes: Array.from(document.getElementById("columMenosImportante").children).map(
          tarea => tarea.querySelector("span").textContent
      ),
  };
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
  const tareas = JSON.parse(localStorage.getItem("tareas"));
  if (tareas) {
      tareas.masImportantes.forEach(tarea =>
          document.getElementById("columMasImportantes").appendChild(crearElementoTarea(tarea, true))
      );
      tareas.menosImportantes.forEach(tarea =>
          document.getElementById("columMenosImportante").appendChild(crearElementoTarea(tarea, false))
      );
  }
}

// Llama a cargarTareas() al cargar la página
window.onload = cargarTareas;