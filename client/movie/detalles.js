document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!data) {
    document.body.innerHTML = "<p style='color:white'>No hay datos para mostrar.</p>";
    return;
  }

  let esFavorita = false;
  if (usuario && Array.isArray(usuario.mis_peliculas_favoritas)) {
    esFavorita = usuario.mis_peliculas_favoritas.includes(data.id);
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
    const peliculaId = data.id;
    const baseURL = "https://streamzone-g6v6.onrender.com/api/movie/favoritos/peliculas";

    try {
      if (esFavorita) {
        // Quitar de favoritos (DELETE)
        const response = await fetch(`${baseURL}/${userId}/${peliculaId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Error al quitar de favoritos");

        usuario.mis_peliculas_favoritas = usuario.mis_peliculas_favoritas.filter(id => id !== peliculaId);
        esFavorita = false;
      } else {
        // Agregar a favoritos (POST)
        const response = await fetch(`${baseURL}/${userId}/${peliculaId}`, {
          method: "POST",
        });

        if (!response.ok) throw new Error("Error al agregar a favoritos");

        usuario.mis_peliculas_favoritas.push(peliculaId);
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


  // Mostrar datos
  document.getElementById("titulo").textContent = data.titulo;
  document.getElementById("descripcion").textContent = data.descripcion;
  document.getElementById("genero").textContent = data.genero.join(", ");
  document.getElementById("anio").textContent = data.año || "Desconocido";

  const directorMatch = data.director;
  const repartoMatch = data.reparto;

  document.getElementById("director").textContent = directorMatch ? directorMatch : "Desconocido";
  document.getElementById("reparto").textContent = repartoMatch ? repartoMatch : "Desconocido";

  const trailer = data.trailer_url.replace("watch?v=", "embed/").split("&")[0];
  document.getElementById("trailer").src = `${trailer}?autoplay=1`;

  document.getElementById("ver-pelicula").addEventListener("click", () => {
    window.location.href = "./ver.html";
  });
});
