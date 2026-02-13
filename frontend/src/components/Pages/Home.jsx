import Navbar from '../Layout/Navbar';
import Hero from '../Home/Hero';
import Categoria from '../Home/Categoria';
import Featureproducts from '../Home/Featureproducts';
import Newsletter from '../Home/Newsletter';
import Footer from '../Layout/Footer';

export default function Home() {

  return (
    <>
    <Navbar/>
    <Hero/>
    <Categoria/>
    <Featureproducts/>
    <Newsletter/>
    <Footer/>
    </>
  );
}