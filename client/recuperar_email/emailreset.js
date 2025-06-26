 document.getElementById("reset-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
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