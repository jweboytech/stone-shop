"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { User } from "@nextui-org/user";
import StarRating from "./star-rating";
import StarRatingIcon from "./icons/star-rating";

const options: Option[] = [
  { label: "Most recent", value: "recent" },
  { label: "Most helpful", value: "helpful" },
  { label: "Highest rating", value: "rating" },
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
          defaultSelectedKeys={["recent"]}
        >
          {options.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-medium p-5 bg-white">
          <div className="flex items-center justify-between">
            <User
              name="Jane Doe"
              description="August 1, 2021"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <StarRating />
          </div>
          <div className="mt-4">
            <p className="font-medium text-default-900">Great product</p>
            <p className="mt-1 text-default-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </p>
          </div>
        </div>
        <div className="rounded-medium p-5 bg-white">
          <div className="flex items-center justify-between">
            <User
              name="Jane Doe"
              description="August 1, 2021"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <StarRating />
          </div>
          <div className="mt-4">
            <p className="font-medium text-default-900">Great product</p>
            <p className="mt-1 text-default-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </p>
          </div>
        </div>
        <div className="rounded-medium p-5 bg-white">
          <div className="flex items-center justify-between">
            <User
              name="Jane Doe"
              description="August 1, 2021"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <StarRating />
          </div>
          <div className="mt-4">
            <p className="font-medium text-default-900">Great product</p>
            <p className="mt-1 text-default-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatibus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
