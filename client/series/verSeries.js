document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("serieSeleccionada"));
    const capitulo = localStorage.getItem("capitulo");
    const url = localStorage.getItem("url");
  
    if (!data) {
      document.body.innerHTML = "<p style='color:white'>No hay película seleccionada para reproducir.</p>";
      return;
    }

    console.log(url)
    document.getElementById("titulo").textContent = `Reproduciendo: ${data.titulo}`;
    document.getElementById("capitulo").textContent = `Capitulo: N°${capitulo}`;
    document.getElementById("player").src = url;
    
  });
  