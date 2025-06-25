document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
  
    if (!data) {
      document.body.innerHTML = "<p style='color:white'>No hay datos para mostrar.</p>";
      return;
    }
  
    document.getElementById("titulo").textContent = data.titulo;
    document.getElementById("descripcion").textContent = data.descripcion;
    document.getElementById("genero").textContent = data.genero.join(", ");
    document.getElementById("anio").textContent = data.año || "Desconocido";
  
    // Extraer director y reparto desde la descripción si están disponibles
    const directorMatch = data.descripcion.match(/Director:\s*(.*)/i);
    const repartoMatch = data.descripcion.match(/Reparto:\s*(.*)/i);
  
    document.getElementById("director").textContent = directorMatch ? directorMatch[1] : "Desconocido";
    document.getElementById("reparto").textContent = repartoMatch ? repartoMatch[1] : "Desconocido";
  
    // Cargar trailer en iframe (autoplay si es posible)
    const trailer = data.trailer_url.replace("watch?v=", "embed/").split("&")[0];
    document.getElementById("trailer").src = `${trailer}?autoplay=1&mute=1`;
  
    document.getElementById("ver-pelicula").addEventListener("click", () => {
      window.open(data.reproducir_url, "_blank");
    });
  });
  