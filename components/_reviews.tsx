'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { User } from '@nextui-org/user';
import StarRating from './star-rating';
import StarRatingIcon from './icons/star-rating';
import { Image } from '@nextui-org/image';
import clsx from 'clsx';
import { fontLilitaOne } from '@/config/fonts';

const options: Option[] = [
  { label: 'Most recent', value: 'recent' },
  { label: 'Most helpful', value: 'helpful' },
  { label: 'Highest rating', value: 'rating' },
];

const Reviews = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <h1 className="text-medium font-semibold md:text-large">Reviews</h1>
          <StarRatingIcon isActive />
          <span className="text-medium font-semibold md:text-large">4.4</span>
        </div>
        <Select
          disallowEmptySelection
          className="w-40"
          defaultSelectedKeys={['recent']}>
          {options.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-medium p-5 border-b-1">
          <div className="mt-4 flex gap-6">
            <div className="flex-1 pr-6">
              <User
                name="Jane Doe"
                description="August 1, 2021"
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                }}
              />
              <div className="flex items-center py-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarRatingIcon
                    key={index}
                    className={
                      index < 4 ? 'text-warning' : 'text-foreground-300'
                    }
                  />
                ))}
              </div>
              <p
                className={clsx(
                  'text-medium-dark font-lilita-one font-semibold text-xl',
                  fontLilitaOne.variable,
                )}>
                Couldn&apos;t love these more!
              </p>
              <p className="mt-1 text-default-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus.
              </p>
            </div>
            <Image
              width={160}
              height={200}
              className="cursor-pointer"
              src="https://d3g5hqndtiniji.cloudfront.net/images/1d156235-1a66-45e3-843d-d0dfaac74ac0/f195d54a-0140-4524-afe7-1615c5d44126.jpg?d=300x400&crop=center"
            />
          </div>
        </div>
        <div className="rounded-medium p-5 border-b-1">
          <div className="mt-4 flex gap-6">
            <div className="flex-1 pr-6">
              <User
                name="Jane Doe"
                description="August 1, 2021"
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                }}
              />
              <div className="flex items-center py-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarRatingIcon
                    key={index}
                    className={
                      index < 4 ? 'text-warning' : 'text-foreground-300'
                    }
                  />
                ))}
              </div>
              <p
                className={clsx(
                  'text-medium-dark font-lilita-one font-semibold text-xl',
                  fontLilitaOne.variable,
                )}>
                Couldn&apos;t love these more!
              </p>
              <p className="mt-1 text-default-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatibus.
              </p>
            </div>
            <Image
              width={160}
              height={200}
              className="cursor-pointer"
              src="https://d3g5hqndtiniji.cloudfront.net/images/1d156235-1a66-45e3-843d-d0dfaac74ac0/f195d54a-0140-4524-afe7-1615c5d44126.jpg?d=300x400&crop=center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
