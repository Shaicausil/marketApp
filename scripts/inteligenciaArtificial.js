const botonIA = document.querySelector('.botonIA');

botonIA.addEventListener('click', () => {
  if (!document.querySelector('#modalIA')) {
    const modal = document.createElement('div');
    modal.id = 'modalIA';

    modal.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 10px;">
        <button id="cerrarModal" style="float: right; background: transparent; border: none; font-size: 18px;">✖</button>
        
        <label for="productoInput">Escribe el nombre del producto:</label>
        <input type="text" id="productoInput" placeholder="Ej: panela" style="width: 100%; padding: 8px; margin-top: 5px;"/>
        <button id="consultarBtn" style="margin-top: 10px;">Consultar precio</button>
        <pre id="respuestaIA" style="margin-top: 15px; white-space: pre-wrap;"></pre>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('cerrarModal').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    const consultarBtn = document.getElementById('consultarBtn');
    const productoInput = document.getElementById('productoInput');
    const respuestaIA = document.getElementById('respuestaIA');

    consultarBtn.addEventListener('click', async () => {
      const producto = productoInput.value.trim();
      if (!producto) {
        alert('Por favor escribe el nombre del producto');
        return;
      }

      respuestaIA.textContent = 'Consultando IA...';

      try {
        const prompt = `Sugiere un precio estimado en pesos colombianos (COP) para el siguiente producto: ${producto} da una respuesta clara consisa`;
        const GEMINI_API_KEY = 'AIzaSyCaCSnAoMZHPwX-bMXMgZnUS5x9iwGHc4E'; // <--- Cambia esto por tu clave real de Google AI Studio

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            }),
          }
        );

        const data = await response.json();
        console.log('Respuesta completa de la IA:', data);

        if (data.candidates && data.candidates.length > 0) {
          respuestaIA.textContent = data.candidates[0].content.parts[0].text;
        } else if (data.error) {
          respuestaIA.textContent = `Error API: ${data.error.message}`;
        } else {
          respuestaIA.textContent = 'No se recibió respuesta de la IA.';
        }
      } catch (error) {
        console.error(error);
        respuestaIA.textContent = 'Error al consultar la IA.';
      }
    });
  }
});
