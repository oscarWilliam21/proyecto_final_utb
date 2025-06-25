export function verificarAutenticacion() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "../landing/landingPage.html";
    }
  }