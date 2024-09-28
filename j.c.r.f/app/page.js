//page.js
import Chaplaincy from '../app/components/Chaplaincy';
import Hero from '../app/components/Hero';
import Intro from '../app/components/Inntro';
import Jabu from '../app/components/Jabu';
import Nav from '../app/components/Nav';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Jabu />
      <Chaplaincy />
      <Intro />
    </main>
  );
}