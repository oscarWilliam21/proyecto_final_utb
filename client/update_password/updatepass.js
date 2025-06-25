document.getElementById("reset-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Evita el reload de página
  console.log("Enviando solicitud para restablecer contraseña...");

  const passwordCurrent = document.getElementById("password_actual").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || !usuario._id) {
    alert("No se encontró información del usuario en el almacenamiento local.");
    return;
  }

  const userId = usuario._id;

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:5000/user/update/password/${userId}`, { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password_actual: passwordCurrent,
        nueva_contrasena: newPassword,
        confirmPassword: confirmPassword
      })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (response.ok) {
      alert("Contraseña actualizada correctamente.");
    } else {
      alert(data.error || "Error al actualizar la contraseña");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("No se pudo conectar al servidor.");
  }
});