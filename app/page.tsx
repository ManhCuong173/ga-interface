'use client';

import Footer from '@/components/footer';
import Banner from '@/components/home/banner';
import CRM from '@/components/home/crm';
import Introduce from '@/components/home/introduce';
import LuckyDraw from '@/components/home/lucky-draw';
import NFTGallery from '@/components/home/nft-gallery';
import Slogan from '@/components/home/slogan';
import Sidebar from '@/components/sidebar';
import { homePageItems } from '@/constants/home-page-items.constant';
import {
  selectActiveSection,
  setActiveSection,
} from '@/lib/features/home-section/home-section-slice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const path = usePathname();
  const active = useAppSelector(selectActiveSection);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const options = {
      root: document.getElementById('root-div'),
      rootMargin: '0px',
      threshold: 0.5,
    };

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          dispatch(setActiveSection(entry.target.id));
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    [{ id: 'banner' }, ...homePageItems].forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      } else {
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dispatch, path]);

  useEffect(() => {
    dispatch(setActiveSection(''));
  }, [dispatch, path]);

  useEffect(() => {
    const rootDiv = document.getElementById('root-div')!;

    const sectionSlogan = document.getElementById('section-slogan')!;
    const sectionCrm = document.getElementById('section-crm')!;

    const background = document.getElementById('background')!;

    const handleScroll = () => {
      const distance =
        rootDiv.scrollTop -
        (rootDiv.scrollTop + sectionSlogan.getBoundingClientRect().top) +
        sectionCrm.clientHeight;
      background.setAttribute('style', `transform:translateY(-${distance}px);`);

      if (sectionSlogan.getBoundingClientRect().top <= 0) {
        dispatch(setActiveSection('section-slogan'));
      }
    };

    rootDiv.addEventListener('scroll', handleScroll);

    return () => rootDiv.removeEventListener('scroll', handleScroll);
  }, [active, dispatch]);

  const isSnapMode = [
    'banner',
    'section-nft-gallery',
    'section-lucky-draw',
  ].includes(active);

  return (
    <>
      <div
        id='background'
        className='fixed inset-x-0 top-0 aspect-[414/2000] w-full lg:aspect-[1442/2440]'
      />
      <div
        id='root-div'
        className={cn(
          'relative z-10 h-screen max-h-screen w-full overflow-y-auto overflow-x-hidden',
          isSnapMode ? 'snap-y snap-mandatory' : ''
        )}
      >
        <Sidebar />
        <Banner />
        <Introduce />
        <NFTGallery />
        <LuckyDraw />
        <CRM />
        <Slogan />
        <Footer />
      </div>
    </>
  );
}
