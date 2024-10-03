import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
import "./index.css";

const items: Array<Option & { icon: React.ReactElement; url: string }> = [
  {
    label: "facebook",
    value: "facebook",
    icon: <Facebook size={20} />,
    url: "",
  },
  { label: "twitter", value: "twitter", icon: <Twitter size={20} />, url: "" },
  {
    label: "instagram",
    value: "instagram",
    icon: <Instagram size={20} />,
    url: "",
  },
];

const SocialMedia = () => {
  return (
    <div className="flex gap-1 items-center">
      {items.map((item) => (
        <div
          key={item.value}
          className="social-media hover:text-white after:rounded-full after:-z-10 after:absolute after:bg-primary after:top-0 after:left-0 after:bottom-0 after:right-0 flex items-center justify-center z-10 relative w-8 h-8 rounded-full transition-colors duration-300 cursor-pointer"
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default SocialMedia;
