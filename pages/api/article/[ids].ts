import * as cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import { NewComplete } from '../news';

export default async function handleNewById(req: NextApiRequest, res: NextApiResponse) {
  const { title, host, category } = req.query;
  const response = await fetch(`https://${host}/${category}/${title}`);
  const html = await response.text();
  const $ = cheerio.load(html);
  const texts = new Set<NewComplete>();
  $('.article-content .js-post-images-container > ').each((_, el) => {
    if (el.name === 'p') {
      texts.add({ tag: el.name, text: $(el).text() });
    }
    if (el.name === 'h2') {
      texts.add({ tag: el.name, text: $(el).text() });
    }
  });
  texts.add({ tag: 'h1', text: $('h1 span').text() || '' });
  try {
    const imageList = $('.article-asset-big img')?.attr('srcset')?.split(',');
    if (imageList) {
      texts.add({ tag: 'img', text: imageList[imageList.length - 1].split(' ')[1] });
    }
  } catch (error) {
    console.error(error);
  }
  return res.status(200).json(Array.from(texts));
}
