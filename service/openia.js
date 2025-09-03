import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//uso este chatgpt porque no me deja usar otro gratis
async function analizarTweet(tweet) {

  const prompt = "Clasifica relevancia, Extraer información clave, Generar resumen y Determina nivel de urgencia del texto";

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: tweet },
    ],
  });
  return armarBody(response.choices[0].message.content);


}

//Armo body para usar en el mensaje a slack
function armarBody(content) {

  let regex = /\*\*[^\*]*Relevancia[^\*]*\*\*([^\*])*/gm;
  let result = regex.exec(content);
  let relevancia = result.length > 1 ? result[1] : "";

  regex = /\*\*[^\*]*Información[^\*]*\*\*([^\*])*/gm;
  result = regex.exec(content);
  let informacion = result.length > 1 ? result[1] : "";

  regex = /\*\*[^\*]*Resumen[^\*]*\*\*([^\*])*/gm;
  result = regex.exec(content);
  let resumen = result.length > 1 ? result[1] : "";

  regex = /\*\*[^\*]*Urgencia[^\*]*\*\*([^\*])*/gm;
  result = regex.exec(content);
  let urgencia = result.length > 1 ? result[1] : "";

  return {
    relevacia: relevancia,
    informacion: informacion,
    resument: resumen,
    urgencia: urgencia,
  }
}

export {analizarTweet};
