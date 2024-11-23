import { fontLilitaOne } from '@/config/fonts';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import FacebookIcon from './icons/facebook';
import { TwitterIcon } from './icons';
import PinterestIcon from './icons/pinterest';
import InstagramIcon from './icons/instagram';
import YoutubeIcon from './icons/youtube';
import { Image } from '@nextui-org/image';

const Footer = () => {
  return (
    <footer className=" bg-primary text-white">
      <section className="w-4/5 mx-auto py-8 px-12">
        <div className="grid grid-cols-4">
          <div className="flex flex-col gap-4">
            <h1
              className={clsx(
                'font-bold font-lilita-one text-4xl text-white',
                fontLilitaOne.variable,
              )}>
              Per Per Pet
            </h1>
            <Image src="https://assets.jweboy.asia/shop/logo.png" width={160} />
          </div>
          <div className="grid grid-cols-3 col-span-2">
            <div className="flex flex-col gap-6">
              <h2
                className={clsx(
                  'text-2xl font-semibold font-lilita-one uppercase',
                  fontLilitaOne.variable,
                )}>
                Our story
              </h2>
              <ul className="text-base flex flex-col gap-4 ">
                <Link isExternal className="text-white" href="/about">
                  <li>Who We Are</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Community & Giving</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Customer Reviews</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Made Responsibly</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Affiliate Program</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-6 ">
              <h2
                className={clsx(
                  'text-2xl font-semibold font-lilita-one uppercase',
                  fontLilitaOne.variable,
                )}>
                Support
              </h2>
              <ul className="text-base flex flex-col gap-4 ">
                <Link isExternal className="text-white" href="/about">
                  <li>Help Center</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Terms of Service</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Privacy Policy</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Shipping & Returns</li>
                </Link>
                <Link isExternal className="text-white" href="/about">
                  <li>Cookies</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-6 ">
              <h2
                className={clsx(
                  'text-2xl font-semibold font-lilita-one uppercase',
                  fontLilitaOne.variable,
                )}>
                Follow us
              </h2>
              <div className="flex items-center gap-4">
                <Link
                  isExternal
                  className="text-white"
                  href="https://www.facebook.com">
                  <FacebookIcon size={32} />
                </Link>
                <Link
                  isExternal
                  className="text-white"
                  href="https://www.twitter.com">
                  <TwitterIcon size={32} />
                </Link>
                <Link
                  isExternal
                  className="text-white"
                  href="https://www.pinterest.com">
                  <PinterestIcon size={32} />
                </Link>
                <Link
                  isExternal
                  className="text-white"
                  href="https://www.instagram.com">
                  <InstagramIcon size={32} />
                </Link>
                <Link
                  isExternal
                  className="text-white"
                  href="https://www.youtube.com">
                  <YoutubeIcon size={32} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-5 text-center">
        <ul className="inline-flex gap-12 items-center">
          <li>
            <Link
              isExternal
              className="text-white text-sm"
              href="https://perperpet.com">
              © 2024 Perper Pet
            </Link>
          </li>
          <li>
            <Link isExternal className="text-white text-sm" href="/about">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link isExternal className="text-white text-sm" href="/about">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
