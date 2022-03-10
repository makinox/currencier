import Coin from '../../Icon/Coin';

export default function Hero() {
  return (
    <section className="flex justify-center items-center" style={{ backgroundColor: 'rgb(var(--light-primary))' }}>
      <h1 className="text-center" style={{ maxWidth: 500, fontSize: 40, color: '#fff' }}>
        Get the current information about your favorite currencies
      </h1>
      <Coin size={600} />
    </section>
  );
}
