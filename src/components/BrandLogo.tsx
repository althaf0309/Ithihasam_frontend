interface BrandLogoProps {
  imageClassName?: string;
  titleClassName?: string;
}

export function BrandLogo({
  imageClassName = "h-11 w-11 rounded-full object-cover shadow-[0_10px_24px_rgba(0,0,0,0.14)] ring-1 ring-border/40",
  titleClassName = "text-xl font-bold tracking-tight text-foreground",
}: BrandLogoProps) {
  return (
    <>
      <img
        src="/ithihasa-logo.jpeg"
        alt="Ithihasam logo"
        className={imageClassName}
        loading="eager"
      />
      <span className={titleClassName}>Ithihasam</span>
    </>
  );
}
