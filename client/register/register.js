document.getElementById("form-registro").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value;
  const confirmarPassword = document.getElementById("confirmarPassword").value;

  // Validaciones
  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  if (password !== confirmarPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch("https://streamzone-g6v6.onrender.com/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        correo: correo,
        password: password,
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("¡Registro exitoso!");
      console.log(data);
      window.location.href = "../login/login.html"; // Redirigir al login
    } else {
      alert("Error: " + (data.error || data.mensaje || "No se pudo registrar"));
    }
  } catch (error) {
    console.error("Error de red:", error);
    alert("No se pudo conectar al servidor.");
  }
});
