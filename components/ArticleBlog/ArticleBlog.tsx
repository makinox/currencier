import Image from 'next/image';
import { Card } from '@makinox/makinox-ui';

import { NewsData } from '../../pages/api/news';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

export default function ArticleBlog({ blogData }: { blogData: NewsData }) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const urlData = new URL(blogData.link);
    const options = urlData.pathname.split('/')[1];
    const title = urlData.pathname.split('/')[2];
    console.log({ urlData, args: urlData.pathname.split('/') });
    router.push(`/article/${title}?category=${options}&host=${urlData.host}`);
  }, [blogData.link, router]);

  return (
    <article key={blogData.title} className={Card({ type: 'neumorphic', css: { maxWidth: 300 } })} onClick={handleClick}>
      <div className="card-media">
        <Image src={blogData.image} width={300} height={200} alt={`Currencier: ${blogData.title}`} />
      </div>
      <div className="card-header">
        <h6 className="headline6">{blogData.title}</h6>
      </div>
      <div className="card-body">
        <p className="body2">{blogData.description}</p>
      </div>
    </article>
  );
}
