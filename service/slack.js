const webhookUrl = process.env.SLACK_WEBHOOK_URL;

async function enviarResumen(resumen) {
  const payload = {
    text: "📊 Resumen Ejecutivo",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "Prioridad " + resumen.urgencia  }
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: resumen.resumen }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Enviado: ${new Date().toLocaleString()}` }
        ]
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(" Resumen enviado a Slack");
    } else {
      console.error(" Error al enviar:", response.statusText);
    }
  } catch (err) {
    console.error(" Error en fetch:", err);
  }
}


export {enviarResumen};