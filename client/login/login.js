document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita recargar la página

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Login exitoso:", data);
        // Por ejemplo, guardar token y redirigir
        // localStorage.setItem("token", data.access_token);
        // window.location.href = "/dashboard";
    } else {
        console.error("Error en login:", data.error);
        alert(data.error || "Error desconocido");
    }
});