import Link from "next/link";
import React from "react";

function InstagramLink() {
  return (
    <Link
      href="https://www.instagram.com/hravel_pic"
      target="_blank"
      className="font-semibold"
    >
      여행 인스타그램으로 가기
    </Link>
  );
}

export default InstagramLink;
