document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
  
    if (!data) {
      document.body.innerHTML = "<p style='color:white'>No hay película seleccionada para reproducir.</p>";
      return;
    }

    console.log(data.reproducir_url)
    document.getElementById("titulo").textContent = `Reproduciendo: ${data.titulo}`;
    document.getElementById("player").src = data.reproducir_url;
  });
  