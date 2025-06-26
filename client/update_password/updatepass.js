document.getElementById("reset-form").addEventListener("submit", async function (e) {
  e.preventDefault(); 
  console.log("Enviando solicitud para restablecer contraseña...");

  const passwordCurrent = document.getElementById("password_actual").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || !usuario.id) {
    alert("No se encontró información del usuario en el almacenamiento local.");
    return;
  }

  const userId = usuario.id;

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch(`https://streamzone-g6v6.onrender.com/api/user/update/password/${userId}`, { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password_actual: passwordCurrent,
        nueva_password: newPassword,
        confirmar_password: confirmPassword
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