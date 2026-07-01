import Image from "next/image";

/* Full-width image at its own natural ratio, for cases where the intrinsic
   size isn't known ahead of time (masonry photo walls, project process shots).
   Uses next/image's responsive width=0/height=0 pattern so it still gets
   automatic AVIF/WebP, per-device resizing and lazy loading — and you can drop
   in new images without hand-writing width/height. */
export default function FluidImage({
  src,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={0}
      height={0}
      sizes={sizes}
      priority={priority}
      draggable={false}
      className={className}
      style={{ width: "100%", height: "auto" }}
    />
  );
}
