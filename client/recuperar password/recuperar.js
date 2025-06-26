function getTokenFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

document.getElementById("reset-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const newPassword = document.getElementById("resetnew-password").value;
  const confirmPassword = document.getElementById("resetconfirm-password").value;
  const token = getTokenFromURL(); 

  if (!newPassword || !confirmPassword) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  if (!token) {
    alert("Token inválido o expirado. Intenta solicitar un nuevo enlace.");
    return;
  }

  try {
    const response = await fetch("https://streamzone-g6v6.onrender.com/api/user/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        new_password: newPassword,
        confirm_password: confirmPassword,
        token: token
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Contraseña cambiada exitosamente.");
      window.location.href = "../login/login.html";
    } else {
      alert("Error: " + (data.message || "No se pudo cambiar la contraseña."));
    }
  } catch (error) {
    alert("Error de conexión con el servidor.");
    console.error(error);
  }
});
