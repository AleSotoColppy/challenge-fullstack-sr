import cron from "node-cron";
import dotenv from "dotenv";
import { scraper } from "./service/scraperTwitter.js";
import { Repository } from "./db/repository.js";
import { analizarTweet } from "./service/openia.js";
import { enviarResumen } from "./service/slack.js";

dotenv.config();

cron.schedule("*/" + process.env.MAX_TWEETS_PER_RUN + " * * * *", async () => {
  console.log("Tarea programada ejecutándose:", new Date().toLocaleString());

  let tweets = await scraper("arca_informa", process.env.MAX_TWEETS_PER_RUN);

  const repository = new Repository();

  repository.delete();

  tweets.forEach((tweet) =>  {
    if (repository.getByText(tweet).length > 0) {
        console.log("ya existe este tweet");
    } else {
        repository.add(tweet);
        console.log("twwet agregado");
        let resumen =  analizarTweet(tweet);
        enviarResumen(resumen);       
    }});
});

