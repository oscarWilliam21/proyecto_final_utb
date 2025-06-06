 document.getElementById("form-registro").addEventListener("submit", async function (e) {
    e.preventDefault(); // Evita recargar la página

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const telefono = document.getElementById("telefono").value;
    const plan = document.getElementById("plan").value;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre,
          correo: correo,
          password: password,
          telefono: telefono,
          plan: plan
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("¡Registro exitoso!");
        console.log(data);
        // Redirige a login o dashboard si es necesario
      } else {
        alert("Error: " + (data.mensaje || "No se pudo registrar"));
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar al servidor.");
    }
  });