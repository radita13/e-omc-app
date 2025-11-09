"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Tentukan placeholder Anda di satu tempat
const PLACEHOLDER_SRC =
  "https://res.cloudinary.com/dakh6bkz8/image/upload/v1761977427/omc_articles/omc-article-1761977364501.jpg";

export default function ClientImage(props) {
  const { src, alt, ...rest } = props;

  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc || PLACEHOLDER_SRC}
      alt={alt}
      {...rest}
      onError={() => {
        setImgSrc(PLACEHOLDER_SRC);
      }}
    />
  );
}
