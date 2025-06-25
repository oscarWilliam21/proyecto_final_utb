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

const API_URL = "http://127.0.0.1:5000/api/movie/movies";

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    mostrarPeliculas(data);
  })
  .catch(error => console.error('Error al cargar las películas:', error));

function crearImagen(pelicula) {
  const img = document.createElement("img");
  img.src = pelicula.imagen;
  img.alt = pelicula.titulo;
  img.style.cursor = "pointer";

  img.addEventListener("click", () => {
    localStorage.setItem("peliculaSeleccionada", JSON.stringify(pelicula));
    window.location.href = "./detalles.html";
  });

  return img;
}

function mostrarPeliculas(peliculas) {
  const filas = document.querySelectorAll(".row");
  const generoMap = {
    'Drama': filas[0].querySelector(".row-posters"),
    'Acción': filas[1].querySelector(".row-posters"),
    'Comedia': filas[2].querySelector(".row-posters"),
    'Terror': filas[3].querySelector(".row-posters"),
    'Suspenso': filas[4].querySelector(".row-posters"),
    'Crimen': filas[5].querySelector(".row-posters"),
    'Thriller': filas[6].querySelector(".row-posters"),
    'Romance': filas[7].querySelector(".row-posters"),
    'Aventura': filas[8].querySelector(".row-posters"),
    'Sobrenatural': filas[9].querySelector(".row-posters"),
    'Misterio': filas[10].querySelector(".row-posters"),
    'Urbano': filas[11].querySelector(".row-posters"),
  };

  // Limpiar contenido
  Object.values(generoMap).forEach(row => row.innerHTML = '');

  // Mostrar en el carrusel
  peliculas.slice(0, slides.length).forEach((pelicula, i) => {
    const slide = slides[i];
    slide.style.backgroundImage = `url('${pelicula.portada}')`;
    slide.querySelector('h2').textContent = pelicula.titulo;
    slide.querySelector('p').textContent = `Géneros: ${pelicula.genero.join(', ')}`;
  });

  // Mostrar por género
  peliculas.forEach(pelicula => {
    pelicula.genero.forEach(gen => {
      const fila = generoMap[gen];
      if (fila) fila.appendChild(crearImagen(pelicula));
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
