import Link from "next/link";
import React from "react";
import { SOCIAL_LINKS } from "../common/utils/constants";
import Image from "next/image";

function Footer() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-xs text-gray-400 border-t-slate-400">
        Copyrightⓒ 2024 All rights reserved by 홍성찬
      </p>
      <div className="flex flex-row gap-2">
        {SOCIAL_LINKS.social.map((content) => (
          <Link href={content.link} target="_blank">
            <Image
              src={content.image}
              width={25}
              height={25}
              alt={content.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Footer;
