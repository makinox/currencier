import { FluidContainer } from '@makinox/makinox-ui';
import Image from 'next/image';
import { useMemo } from 'react';
import { handleNewById, NewComplete } from '../api/news';

export async function getServerSideProps({ query }: { query: any }) {
  const newData = await handleNewById(query);
  return {
    props: { newData },
  };
}

export default function Article({ newData }: { newData: Array<NewComplete> }) {
  const title = newData.find((el) => el.tag === 'h1')?.text;
  const bigImage = newData.find((el) => el.tag === 'img')?.text;

  const blogContent = useMemo(() => {
    return newData.map((el, i) => {
      if (el.tag === 'p') {
        return <p key={i}>{el.text}</p>;
      }
      if (el.tag === 'h3') {
        return <p key={i}>{el.text}</p>;
      }

      return null;
    });
  }, [newData]);

  return (
    <section>
      <div>
        <Image height={350} width={1500} layout="responsive" objectFit="cover" src={bigImage || ''} alt={`Currencier: ${title}`} />
        <h1 className={`text-center ${FluidContainer()}`}>{title}</h1>
      </div>
      <article className={`${FluidContainer()}`}>{blogContent}</article>
    </section>
  );
}
