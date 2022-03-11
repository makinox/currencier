import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';

export type NewsData = {
  title: string;
  link: string;
  description: string;
  image: string;
};

export type NewComplete = { tag: string; text: string };

export async function handleNewById({ host, category, id }: { host: string; category: string; id: string }) {
  const response = await fetch(`https://${host}/${category}/${id}`);
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
  texts.add({ tag: 'img', text: $('.article-asset-big img')?.attr('srcset')?.split(',')?.at(-1)?.split(' ')[1] || '' });
  texts.add({ tag: 'h1', text: $('h1 span').text() || '' });
  return Array.from(texts);
}

export default async function handler(_: NextApiRequest, res: NextApiResponse<Array<Partial<NewsData>>>) {
  const response = await fetch('https://www.xataka.com/');
  const html = await response.text();
  const $ = cheerio.load(html);
  const articles: Array<Partial<NewsData>> = [];

  $('.section-recent-list article').each((_, el) => {
    articles.push({
      title: $(el).find('.abstract-content header a').text(),
      link: $(el).find('.abstract-content header a').attr('href'),
      description: $(el).find('.abstract-content .abstract-excerpt p').text(),
      image: $(el).find('.abstract-figure picture source').attr('srcset'),
    });
  });

  return res.status(200).json(articles);
}
