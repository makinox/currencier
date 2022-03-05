import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex justify-center items-center" style={{ backgroundColor: 'rgb(var(--light-primary))' }}>
      <h1>Get the current information about your favorite currencies</h1>
      <Image src="https://picsum.photos/id/1015/200/300" alt="Currency presentation image" width={300} height={200} />
    </section>
  );
}
