import Image from 'next/image';
import { Inter } from 'next/font/google';
import NavBar from '@/components/layout/navbar';
import Head from 'next/head';
import Carousel from '@/components/main_page/carousel';

export default function Home() {
  return (
    <>
      <Head>
        <title>Iglesia Cristiana Echaurren 80</title>
      </Head>

      <NavBar />

      <Carousel id="home" />

      <section>más cosas</section>
    </>
  );
}
