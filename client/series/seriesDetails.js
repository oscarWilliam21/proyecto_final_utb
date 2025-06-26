document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("serieSeleccionada"));
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!data) {
      document.body.innerHTML = "<p style='color:white'>No hay datos para mostrar.</p>";
      return;
    }

    let esFavorita = false;
    if (usuario && Array.isArray(usuario.mis_series_favoritas)) {
      esFavorita = usuario.mis_series_favoritas.includes(data.id);
    }

    const iconoFavorito = document.getElementById("icono-favorito");
    const textoFavorito = document.getElementById("texto-favorito");

    const actualizarFavoritoUI = () => {
      if (esFavorita) {
        iconoFavorito.src = "../assets/images/corazonGuardar.png";
        textoFavorito.textContent = "Quitar de mi lista";
      } else {
        iconoFavorito.src = "../assets/images/corazon.png";
        textoFavorito.textContent = "Agregar a mi lista";
      }
    };
  
    actualizarFavoritoUI();

    document.getElementById("favorito-container").addEventListener("click", async () => {
      if (!usuario || !Array.isArray(usuario.mis_peliculas_favoritas)) return;
  
      const userId = usuario.id;
      const serieId = data.id;
      const baseURL = "https://streamzone-g6v6.onrender.com/api/movie/favoritos/series";
  
      try {
        if (esFavorita) {
          // Quitar de favoritos (DELETE)
          const response = await fetch(`${baseURL}/${userId}/${serieId}`, {
            method: "DELETE",
          });
  
          if (!response.ok) throw new Error("Error al quitar de favoritos");
  
          usuario.mis_series_favoritas = usuario.mis_series_favoritas.filter(id => id !== serieId);
          esFavorita = false;
        } else {
          // Agregar a favoritos (POST)
          const response = await fetch(`${baseURL}/${userId}/${serieId}`, {
            method: "POST",
          });
  
          if (!response.ok) throw new Error("Error al agregar a favoritos");
  
          usuario.mis_series_favoritas.push(serieId);
          esFavorita = true;
        }
  
        // Actualizar almacenamiento local
        localStorage.setItem("usuario", JSON.stringify(usuario));
        actualizarFavoritoUI();
      } catch (error) {
        console.error(error);
        alert("Hubo un problema al actualizar los favoritos.");
      }
    });
  
    document.getElementById("titulo").textContent = data.titulo;
    document.getElementById("descripcion").textContent = data.descripcion;
    document.getElementById("genero").textContent = data.genero.join(", ");
    document.getElementById("anio").textContent = data.año || "Desconocido";

    const directorMatch = data.descripcion.match(/Director:\s*(.*)/i);
    const repartoMatch = data.descripcion.match(/Reparto:\s*(.*)/i);
  
    document.getElementById("director").textContent = directorMatch ? directorMatch[1] : "Desconocido";
    document.getElementById("reparto").textContent = repartoMatch ? repartoMatch[1] : "Desconocido";
  
    const trailer = data.trailer_url.replace("watch?v=", "embed/").split("&")[0];
    document.getElementById("trailer").src = `${trailer}?autoplay=1`;
  
    const contenedor = document.getElementById("capitulos-container");
    contenedor.innerHTML = ''; 
  
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
  