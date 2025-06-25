document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("serieSeleccionada"));
    if (!data) {
      document.body.innerHTML = "<p style='color:white'>No hay datos para mostrar.</p>";
      return;
    }
  
    document.getElementById("titulo").textContent = data.titulo;
    document.getElementById("descripcion").textContent = data.descripcion;
    document.getElementById("genero").textContent = data.genero.join(", ");
    document.getElementById("anio").textContent = data.año || "Desconocido";
  
    // Extraer director y reparto si están en la descripción
    const directorMatch = data.descripcion.match(/Director:\s*(.*)/i);
    const repartoMatch = data.descripcion.match(/Reparto:\s*(.*)/i);
  
    document.getElementById("director").textContent = directorMatch ? directorMatch[1] : "Desconocido";
    document.getElementById("reparto").textContent = repartoMatch ? repartoMatch[1] : "Desconocido";
  
    // Reemplazar watch?v= por embed/ si es necesario
    const trailer = data.trailer_url.replace("watch?v=", "embed/").split("&")[0];
    document.getElementById("trailer").src = `${trailer}?autoplay=1&mute=1`;
  
    // Crear botones por cada capítulo
    const contenedor = document.getElementById("capitulos-container");
    contenedor.innerHTML = ''; // Limpia si hay algo
  
    if (Array.isArray(data.capitulos)) {
      data.capitulos.forEach((url, index) => {
        const btn = document.createElement("button");
        btn.textContent = `Capítulo ${index + 1}`;
        btn.addEventListener("click", () => {
            console.log(url);
          localStorage.setItem('url', url);
          localStorage.setItem('capitulo', index + 1);
          window.location.href = "./verSeries.html";
        });
        contenedor.appendChild(btn);
      });
    } else {
      contenedor.innerHTML = "<p>No hay capítulos disponibles.</p>";
    }
  });
  