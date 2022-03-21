import { FluidContainer } from '@makinox/makinox-ui';
import Head from 'next/head';
import Image from 'next/image';
import { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
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
    <>
      <Head>
        <title>{title} - article: Currencier </title>
      </Head>
      <section>
        <div>
          {bigImage ? (
            <Image height={350} width={1500} layout="responsive" objectFit="cover" src={bigImage} alt={`Currencier: ${title}`} />
          ) : (
            <div className={`${FluidContainer()} flex justify-center`}>
              <ContentLoader width={1500} height={350} viewBox={`0 0 ${1500} 350`}>
                <rect x="0" y="0" width={1500} height="350" />
              </ContentLoader>
            </div>
          )}
          {title ? (
            <h1 className={`text-center ${FluidContainer()}`}>{title}</h1>
          ) : (
            <div className={`${FluidContainer()} flex justify-center`}>
              <ContentLoader width={500} height={30} viewBox={`0 0 ${500} 30`}>
                <rect x="0" y="10" rx="10" ry="20" width={500} height="20" />
              </ContentLoader>
            </div>
          )}
        </div>
        {blogContent?.length ? (
          <article className={`${FluidContainer()}`}>{blogContent}</article>
        ) : (
          <article className={`${FluidContainer()} flex justify-center`}>
            <ContentLoader width={800} height={350} viewBox={`0 0 ${800} 350`}>
              <rect x="0" y="10" rx="10" ry="20" width={600} height="20" />
              <rect x="0" y="40" rx="10" ry="20" width={700} height="20" />
              <rect x="0" y="70" rx="10" ry="20" width={600} height="20" />
              <rect x="0" y="100" rx="10" ry="20" width={700} height="20" />
              <rect x="0" y="130" rx="10" ry="20" width={600} height="20" />
              <rect x="0" y="160" rx="10" ry="20" width={700} height="20" />
              <rect x="0" y="190" rx="10" ry="20" width={650} height="20" />
              <rect x="0" y="220" rx="10" ry="20" width={700} height="20" />
              <rect x="0" y="250" rx="10" ry="20" width={650} height="20" />
              <rect x="0" y="280" rx="10" ry="20" width={700} height="20" />
              <rect x="0" y="310" rx="10" ry="20" width={300} height="20" />
            </ContentLoader>
          </article>
        )}
      </section>
    </>
  );
}
