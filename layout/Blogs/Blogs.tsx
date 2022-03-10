import useSWR from 'swr';
import { useMemo } from 'react';
import { Card, FluidContainer } from '@makinox/makinox-ui';

import ArticleBlog from '../../components/ArticleBlog/ArticleBlog';
import { NewsData } from '../../pages/api/news';
import { fetcher } from '../../utils/fetcher';
import { BlogsSection } from './Blogs.styles';
import BlogsSkeleton from './Blogs.skeleton';

export default function Blogs() {
  const mockData = Array(10).fill(0);
  const { data, error } = useSWR<Array<NewsData>>('/api/news', fetcher);

  const renderContent = useMemo(() => {
    if (error) return <p>failed to load</p>;

    if (data?.length) {
      return data.map((el) => <ArticleBlog key={el.title} blogData={el} />);
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
