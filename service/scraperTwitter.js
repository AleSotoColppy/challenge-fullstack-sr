import { chromium } from "playwright";

async function scraper(username, maxTweets = 10) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // URL del perfil (sección "Tweets")
  const url = `https://twitter.com/${username}`;
  await page.goto(url, { waitUntil: "networkidle" });

  // Esperar al menos un tweet
  await page.waitForSelector("article");

  const tweets = new Set();

  while (tweets.size < maxTweets) {
    // Extraer tweets visibles
    const newTweets = await page.$$eval("article div[data-testid='tweetText']", nodes =>
      nodes.map(n => n.innerText)
    );

    newTweets.forEach(t => tweets.add(t));

    if (tweets.size >= maxTweets) break;

    // Hacer scroll hacia abajo
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    // Esperar un poco a que carguen más tweets
    await page.waitForTimeout(2000);
  }

  await browser.close();
  return Array.from(tweets).slice(0, maxTweets);
}

export {scraper};