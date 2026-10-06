import { useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";

export default function FallbackImage({
  src,
  alt,
  className = "",
  onError,
  ...imageProps
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label="Photo not uploaded"
        title="Photo not uploaded"
        className={`${className} flex items-center justify-center overflow-hidden bg-[#242729] px-2 text-center text-xs font-medium text-[#b8bfba]`}
      >
        Photo not uploaded
      </div>
    );
  }

  return (
    <img
      {...imageProps}
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
