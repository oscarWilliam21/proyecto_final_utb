const API_PELICULAS = "https://streamzone-g6v6.onrender.com/api/movie/movies";
const API_SERIES = "https://streamzone-g6v6.onrender.com/api/movie/series";

document.addEventListener("DOMContentLoaded", async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    alert("Usuario no encontrado.");
    return;
  }

  const idsPeliculas = usuario.mis_peliculas_favoritas || [];
  const idsSeries = usuario.mis_series_favoritas || [];

  try {
    const [resPeliculas, resSeries] = await Promise.all([
      fetch(API_PELICULAS),
      fetch(API_SERIES)
    ]);

    const todasPeliculas = await resPeliculas.json();
    const todasSeries = await resSeries.json();

    const peliculasFavoritas = todasPeliculas.filter(p => idsPeliculas.includes(p.id));
    const seriesFavoritas = todasSeries.filter(s => idsSeries.includes(s.id));

    renderContenido(peliculasFavoritas, "peliculas-container", "pelicula");
    renderContenido(seriesFavoritas, "series-container", "serie");
  } catch (err) {
    console.error("Error al cargar datos:", err);
  }
});

function renderContenido(lista, containerId, tipo) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
  
    if (lista.length === 0) {
      container.innerHTML = "<p style='color:gray'>No hay elementos en tu lista.</p>";
      return;
    }
  
    lista.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
  
      const img = document.createElement("img");
      img.src = item.imagen || "https://via.placeholder.com/180x270?text=Sin+Imagen";
  
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = item.titulo;
  
      card.appendChild(img);
      card.appendChild(title);
  
      // Evento al hacer clic
      card.addEventListener("click", () => {
        if (tipo === "pelicula") {
          localStorage.setItem("peliculaSeleccionada", JSON.stringify(item));
          window.location.href = "../movie/detalles.html";
        } else if (tipo === "serie") {
          localStorage.setItem("serieSeleccionada", JSON.stringify(item));
          window.location.href = "../series/seriesDetails.html";
        }
      });
  
      container.appendChild(card);
    });
  }
  