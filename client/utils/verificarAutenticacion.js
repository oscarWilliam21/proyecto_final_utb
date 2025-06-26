export function verificarAutenticacion() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "../landing/landingPage.html";
    }
  }

  export function estasVerificado() {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "../home/home.html";
    }
  }