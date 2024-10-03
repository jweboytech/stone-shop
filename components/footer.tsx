import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowRight } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 px-12 bg-white">
      <div className="grid grid-cols-3 mb-16">
        <div className="grid grid-cols-3 col-span-2">
          <div className="flex flex-col gap-6">
            <p className="text-foreground-500 text-xs">Explore</p>
            <ul className="text-base flex flex-col gap-2">
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>About Us</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Terms of Service</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Privacy Policy</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Shipping & Returns</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Cookies</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-6 ">
            <p className="text-foreground-500 text-xs">Explore</p>
            <ul className="text-base flex flex-col gap-2">
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>About Us</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Terms of Service</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Privacy Policy</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Shipping & Returns</li>
              </Link>
              <Link
                isExternal
                className="text-foreground-600 cursor-pointer"
                href="/about"
              >
                <li>Cookies</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-foreground-500 text-xs">Exclusive benefits</p>
          <Input
            endContent={
              <ArrowRight
                className="text-foreground-500 cursor-pointer"
                size={18}
              />
            }
            placeholder="Enter email here"
            variant="underlined"
          />
          <p className="text-xs text-foreground-500">
            Apply for our free membership to receive exclusive deals, news, and
            events. Facebook Twitter
          </p>
        </div>
      </div>
      <div className="text-center ">
        <Link isExternal className="text-xs" href="https://perperpet.com">
          <span className="text-default-600">Powered by&nbsp;</span>
          <p className="text-primary">Perperpet</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
