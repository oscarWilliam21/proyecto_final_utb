let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const usuario = JSON.parse(localStorage.getItem("usuario"));
const name = document.getElementById('username');

if (usuario && name) {
  name.textContent = `Hola, ${usuario.nombre}`;
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

const API_URL = "https://streamzone-g6v6.onrender.com/api/movie/series";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    mostrarSeries(data);
  })
  .catch(error => console.error('Error al cargar las series:', error));

// Función para crear imagen con evento de click
function crearImagen(serie) {
  const img = document.createElement("img");
  img.src = serie.imagen;
  img.alt = serie.titulo;
  img.style.cursor = "pointer";

  img.addEventListener("click", () => {
    localStorage.setItem("serieSeleccionada", JSON.stringify(serie));
    window.location.href = "./seriesDetails.html";
  });

  return img;
}

function mostrarSeries(series) {
  const filas = document.querySelectorAll(".row");

  // Mapa de género a sección
  const generoMap = {
    'Drama': filas[0].querySelector(".row-posters"),
    'Acción': filas[1].querySelector(".row-posters"),
    'Suspenso': filas[2].querySelector(".row-posters"),
    'Crimen': filas[3].querySelector(".row-posters"),
    'Thriller': filas[4].querySelector(".row-posters"),
    'Romance': filas[5].querySelector(".row-posters"),
    'Aventura': filas[6].querySelector(".row-posters"),
  };

  // Limpiar contenido de las filas
  Object.values(generoMap).forEach(row => row.innerHTML = '');

  // Cargar el carrusel
  series.slice(0, slides.length).forEach((serie, i) => {
    const slide = slides[i];
    slide.style.backgroundImage = `url('${serie.portada}')`;
    slide.querySelector('h2').textContent = serie.titulo;
    slide.querySelector('p').textContent = `Géneros: ${serie.genero.join(', ')}`;
  });

  // Mostrar cada serie en las filas correspondientes
  series.forEach(serie => {
    serie.genero.forEach(gen => {
      const fila = generoMap[gen];
      if (fila) fila.appendChild(crearImagen(serie));
    });
  });
}

// Lógica para cerrar sesión y actualizar contraseña
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

  const actualizarPassBtn = document.getElementById("actualizar-contraseña");
  if (actualizarPassBtn) {
    actualizarPassBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "../update_password/updatepass.html";
    });
  }
});
