import { useMemo } from 'react';
import BlogsSkeleton from './Blogs.skeleton';

export default function Blogs() {
  const data = Array(5).fill(0);

  const renderContent = useMemo(() => {
    if (!data.length) {
      return data.map((_, i) => <article key={i}>aqui va un blog o skeleton si va cargando</article>);
    }

    return data.map((_, i) => <BlogsSkeleton key={i} />);
  }, [data]);

  return (
    <section className="flex justify-center flex-col items-center">
      <h3>Related blogs</h3>
      <div className="flex flex-wrap justify-center">{renderContent}</div>
    </section>
  );
}
