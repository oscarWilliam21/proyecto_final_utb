 function getTokenFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("token");
  }

  document.getElementById("reset-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const newPassword = document.getElementById("resetnew-password").value;
    const confirmPassword = document.getElementById("resetconfirm-password").value;
    const token = getTokenFromURL(); 
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/recuperar-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          new_password: newPassword,
          token: token
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Contraseña cambiada exitosamente.");
      } else {
        alert("Error: " + (data.message || "No se pudo cambiar la contraseña."));
      }
    } catch (error) {
      alert("Error de conexión con el servidor.");
      console.error(error);
    }
  });