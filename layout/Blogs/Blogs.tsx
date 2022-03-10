import useSWR from 'swr';
import Image from 'next/image';
import { useMemo } from 'react';
import { Card, FluidContainer } from '@makinox/makinox-ui';

import { NewsData } from '../../pages/api/news';
import { fetcher } from '../../utils/fetcher';
import BlogsSkeleton from './Blogs.skeleton';
import { BlogsSection } from './Blogs.styles';

export default function Blogs() {
  const mockData = Array(6).fill(0);
  const { data, error } = useSWR<Array<NewsData>>('/api/news', fetcher);

  const renderContent = useMemo(() => {
    if (error) return <p>failed to load</p>;

    if (data?.length) {
      return data.map((el) => (
        <article key={el.title} className={Card({ type: 'neumorphic', css: { maxWidth: 300 } })}>
          <div className="card-media">
            <Image src={el.image} width={300} height={200} alt={`Currencier: ${el.title}`} />
          </div>
          <div className="card-header">
            <h6 className="headline6">{el.title}</h6>
          </div>
          <div className="card-body">
            <p className="body2">{el.description}</p>
          </div>
        </article>
      ));
    }

    return mockData.map((_, i) => <BlogsSkeleton key={i} />);
  }, [data, error, mockData]);

  return (
    <section className={`flex justify-center flex-col items-center ${FluidContainer()} ${BlogsSection()}`}>
      <h3>Related blogs</h3>
      <div className="flex flex-wrap justify-center">{renderContent}</div>
    </section>
  );
}
