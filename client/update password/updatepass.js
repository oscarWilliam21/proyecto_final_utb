document.getElementById("reset-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Evita el reload de página
  console.log("Enviando solicitud para restablecer contraseña...");

  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api/auth/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correo: email,
        nueva_contrasena: newPassword
      })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (response.ok) {
      alert("Contraseña actualizada correctamente. Ahora puedes iniciar sesión.");
      window.location.href = "../login/login.html";
    } else {
      alert(data.error || "Error al restablecer la contraseña");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("No se pudo conectar al servidor.");
  }
});