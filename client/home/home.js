let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const usuario = JSON.parse(localStorage.getItem("usuario"));
const name = document.getElementById("username");

if (usuario && name) {
  name.textContent = `Hola, ${usuario.nombre}`;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}


function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

const API_PELICULAS = "https://streamzone-g6v6.onrender.com/api/movie/movies";
const API_SERIES = "https://streamzone-g6v6.onrender.com/api/movie/series";

fetch(API_PELICULAS)
  .then((response) => response.json())
  .then((data) => {
    console.log("Películas:", data);
    mostrarPeliculas(data);
  })
  .catch((error) => console.error("Error al cargar las películas:", error));

fetch(API_SERIES)
  .then((response) => response.json())
  .then((data) => {
    console.log("Series:", data);
    mostrarSeries(data);
  })
  .catch((error) => console.error("Error al cargar las series:", error));

function mostrarPeliculas(peliculas) {
  const peliculasRow = document.getElementById("peliculas-row");
  peliculasRow.innerHTML = "";

  peliculas.slice(0, slides.length).forEach((pelicula, i) => {
    const slide = slides[i];
    slide.style.backgroundImage = `url('${pelicula.portada}')`;
    slide.querySelector("h2").textContent = pelicula.titulo;
    slide.querySelector("p").textContent = `Géneros: ${pelicula.genero.join(", ")}`;
  });

  peliculas.forEach((pelicula) => {
    const img = document.createElement("img");
    img.src = pelicula.imagen;
    img.alt = pelicula.titulo;
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      localStorage.setItem("peliculaSeleccionada", JSON.stringify(pelicula));
      window.location.href = "../movie/detalles.html";
    });

    peliculasRow.appendChild(img);
  });
}

function mostrarSeries(series) {
  const seriesRow = document.getElementById("series-row");
  seriesRow.innerHTML = "";

  series.forEach((serie) => {
    const img = document.createElement("img");
    img.src = serie.imagen;
    img.alt = serie.titulo;
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      localStorage.setItem("serieSeleccionada", JSON.stringify(serie));
      window.location.href = "../series/seriesDetails.html";
    });

    seriesRow.appendChild(img);
  });
}

// Lógica para cerrar sesión
document.addEventListener("DOMContentLoaded", () => {
  const cerrarSesionBtn = document.getElementById("cerrar-sesion");

  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      window.location.href = "../landing/landingPage.html";
    });
  }

  // Redirigir a actualizar contraseña
  const actualizarPassBtn = document.getElementById("actualizar-contraseña");
  if (actualizarPassBtn) {
    actualizarPassBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../update_password/updatepass.html";
    });
  }
});
