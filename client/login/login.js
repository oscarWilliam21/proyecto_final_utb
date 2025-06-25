document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita recargar la página
    console.log('estoy iniciando sesion');
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            correo: correo,
            password: password
        })
    });

    const data = await response.json();
    console.log('data de login', data);

    if (response.ok) {
        console.log("Login exitoso:", data);
    
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "../home/home.html";
    } else {
        console.error("Error en login:", data.error);
        alert(data.error || "Error desconocido");
    }
});

document.addEventListener("DOMContentLoaded", () => {
const suscribirseBtn = document.querySelector(".suscribirse-btn");

if (suscribirseBtn) {
    suscribirseBtn.addEventListener("click", () => {
    window.location.href = "../register/register.html";
    });
}
});