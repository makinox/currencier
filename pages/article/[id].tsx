import { FluidContainer } from '@makinox/makinox-ui';
import Head from 'next/head';
import Image from 'next/image';
import { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import useSWR from 'swr';

import { fetcher } from '../../utils/fetcher';
import isBrowser from '../../utils/isBrowser';
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
    <>
      <Head>
        <title>{title} - article: Currencier </title>
      </Head>
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
          {title ? (
            <h1 className={`text-center ${FluidContainer()}`}>{title}</h1>
          ) : (
            <div className={FluidContainer()}>
              <ContentLoader width={1200} height={100} viewBox={`0 0 ${1200} 40`} backgroundColor="#000">
                <rect x="0" y="10" rx="10" ry="20" width={1200} height="20" />
              </ContentLoader>
            </div>
          )}
        </div>
        {blogContent ? (
          <article className={`${FluidContainer()}`}>{blogContent}</article>
        ) : (
          <article className={`${FluidContainer()}`}>blogContent</article>
        )}
      </section>
    </>
  );
}
