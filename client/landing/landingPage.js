document.addEventListener("DOMContentLoaded", () => {
    const emailForm = document.querySelector(".email-form");
    const emailInput = emailForm.querySelector("input[type='email']");
  
    emailForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (email) {
        localStorage.setItem("email", email);
        window.location.href = "../register/register.html";
      }
    });
  
    const API_PELICULAS = "https://streamzone-g6v6.onrender.com/api/movie/movies";

    console.log(API_PELICULAS)
  
    fetch(API_PELICULAS)
      .then((res) => res.json())
      .then((peliculas) => {
        const tendenciasGrid = document.querySelector(".tendencias-grid");
        tendenciasGrid.innerHTML = "";
  
        peliculas.slice(0, 10).forEach((pelicula, index) => {
          const div = document.createElement("div");
          div.classList.add("tendencia-item");
          div.innerHTML = `
            <span class="numero">${index + 1}</span>
            <img src="${pelicula.imagen}" alt="Top ${index + 1}">
          `;
          div.addEventListener("click", () => {
            window.location.href = "../login/login.html";
          });
          tendenciasGrid.appendChild(div);
        });
      })
      .catch((error) => {
        console.error("Error cargando las películas:", error);
      });
  });
  