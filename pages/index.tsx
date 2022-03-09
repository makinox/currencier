import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Blogs from '../layout/Blogs/Blogs';
import Hero from '../layout/Hero/Hero';
import Info from '../layout/Info/Info';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Info />
      <Blogs />
      <Footer />
    </>
  );
}
