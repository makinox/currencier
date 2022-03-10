import * as cheerio from 'cheerio';
import type { NextApiRequest, NextApiResponse } from 'next';

export type NewsData = {
  title: string;
  link: string;
  description: string;
  image: string;
};

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
