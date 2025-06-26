document.getElementById("reset-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const response = await fetch("https://streamzone-g6v6.onrender.com/api/user/recuperar-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correo: email })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Correo enviado exitosamente. Revisa tu bandeja de entrada.");
    } else {
      alert("Error: " + (data.message || "No se pudo enviar el correo."));
    }
  } catch (error) {
    alert("Error de conexión con el servidor.");
    console.error(error);
  }
});
