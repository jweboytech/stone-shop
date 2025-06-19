import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import React from 'react';

const Reviews = () => {
  return (
    <div className="py-13 px-15 bg-surface-light">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="uppercase font-medium text-3xl">Verified Reviews</h2>
          <div className="flex gap-2">
            <div className="bg-surface-soft w-11 h-11 rounded-full inline-flex items-center justify-center cursor-pointer">
              <ArrowLeft size={18} />
            </div>
            <div className="bg-surface-soft w-11 h-11 rounded-full inline-flex items-center justify-center  cursor-pointer">
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
        <p className="text-base">
          Rated 4.6/5 ★ on Trustpilot with over 150+ Reviews
        </p>
        <div className="overflow-x-hidden">
          <ul className="flex gap-4 w-1000 ">
            <li className="bg-white py-8 px-5 rounded-xl w-102 h-82 relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-4">
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                  </div>
                  <div className="font-semibold">
                    Lovely Products, Perfect Gifts
                  </div>
                  <p className="mt-3 mb-4 text-base">
                    I have bought several of the clover initial necklaces and
                    bracelets, for myself and as gifts. They are really pretty,
                    great quality and excellent value, especially with the buy
                    one get one free offer.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Jayne T.</span>
                  <span className="text-xs">May 05, 25</span>
                </div>
              </div>
            </li>
            <li className="bg-white py-8 px-5 rounded-xl w-102 h-82 relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-4">
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                  </div>
                  <div className="font-semibold">
                    Lovely Products, Perfect Gifts
                  </div>
                  <p className="mt-3 mb-4 text-base">
                    I have bought several of the clover initial necklaces and
                    bracelets, for myself and as gifts. They are really pretty,
                    great quality and excellent value, especially with the buy
                    one get one free offer.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Jayne T.</span>
                  <span className="text-xs">May 05, 25</span>
                </div>
              </div>
            </li>
            <li className="bg-white py-8 px-5 rounded-xl w-102 h-82 relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-4">
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                  </div>
                  <div className="font-semibold">
                    Lovely Products, Perfect Gifts
                  </div>
                  <p className="mt-3 mb-4 text-base">
                    I have bought several of the clover initial necklaces and
                    bracelets, for myself and as gifts. They are really pretty,
                    great quality and excellent value, especially with the buy
                    one get one free offer.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Jayne T.</span>
                  <span className="text-xs">May 05, 25</span>
                </div>
              </div>
            </li>
            <li className="bg-white py-8 px-5 rounded-xl w-102 h-82 relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-4">
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                  </div>
                  <div className="font-semibold">
                    Lovely Products, Perfect Gifts
                  </div>
                  <p className="mt-3 mb-4 text-base">
                    I have bought several of the clover initial necklaces and
                    bracelets, for myself and as gifts. They are really pretty,
                    great quality and excellent value, especially with the buy
                    one get one free offer.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Jayne T.</span>
                  <span className="text-xs">May 05, 25</span>
                </div>
              </div>
            </li>
            <li className="bg-white py-8 px-5 rounded-xl w-102 h-82 relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex gap-1 mb-4">
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                    <Star size={18} />
                  </div>
                  <div className="font-semibold">
                    Lovely Products, Perfect Gifts
                  </div>
                  <p className="mt-3 mb-4 text-base">
                    I have bought several of the clover initial necklaces and
                    bracelets, for myself and as gifts. They are really pretty,
                    great quality and excellent value, especially with the buy
                    one get one free offer.
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Jayne T.</span>
                  <span className="text-xs">May 05, 25</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
