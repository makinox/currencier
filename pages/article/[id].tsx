import { FluidContainer } from '@makinox/makinox-ui';
import Image from 'next/image';
import { useMemo } from 'react';
import useSWR from 'swr';

import { fetcher } from '../../utils/fetcher';
import { NewComplete } from '../api/news';

export async function getServerSideProps({ query }: { query: any }) {
  return {
    props: { query },
  };
}

export default function Article({ query }: { query: any }) {
  const { data } = useSWR<Array<NewComplete>>(`/api/article/1?category=${query.category}&host=${query.host}&title=${query.id}`, fetcher);

  const title = data?.find((el) => el.tag === 'h1')?.text;
  const bigImage = data?.find((el) => el.tag === 'img')?.text;

  const blogContent = useMemo(() => {
    return data?.map((el, i) => {
      if (el.tag === 'p') {
        return <p key={i}>{el.text}</p>;
      }
      if (el.tag === 'h3') {
        return <p key={i}>{el.text}</p>;
      }

      return null;
    });
  }, [data]);

  return (
    <section>
      <div>
        <Image
          height={350}
          width={1500}
          layout="responsive"
          objectFit="cover"
          src={bigImage || 'https://picsum.photos/id/1011/1500/350'}
          alt={`Currencier: ${title}`}
        />
        <h1 className={`text-center ${FluidContainer()}`}>{title}</h1>
      </div>
      <article className={`${FluidContainer()}`}>{blogContent}</article>
    </section>
  );
}
