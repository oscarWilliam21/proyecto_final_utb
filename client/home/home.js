

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

  function mostrarPeliculas(peliculas) {
    console.log(peliculas)
    const popularesRow = document.querySelectorAll(".row")[0].querySelector(".row-posters");
    const accionRow = document.querySelectorAll(".row")[1].querySelector(".row-posters");
  
    popularesRow.innerHTML = '';
    accionRow.innerHTML = '';
  
    const slides = document.querySelectorAll('.slide');
    peliculas.slice(0, slides.length).forEach((pelicula, i) => {
      const slide = slides[i];
      slide.style.backgroundImage = `url('${pelicula.portada}')`;
      slide.querySelector('h2').textContent = pelicula.titulo;
      slide.querySelector('p').textContent = `Generos: ${pelicula.genero.join(', ')}`;
    });
  
    peliculas.forEach(pelicula => {
      const img = document.createElement("img");
      img.src = pelicula.imagen;
      img.alt = pelicula.titulo;
      img.style.cursor = "pointer";
  
      img.addEventListener("click", () => {
        localStorage.setItem("peliculaSeleccionada", JSON.stringify(pelicula));
        window.location.href = "../movie/detalles.html";
      });
  
      if (pelicula.genero.includes("Acción")) {
        accionRow.appendChild(img);
      } else {
        popularesRow.appendChild(img);
      }
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



  

