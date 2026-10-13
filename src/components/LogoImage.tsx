export default function LogoImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className="logo-glitch relative select-none"
      style={{ ["--img" as string]: `url(${src})` }}
    >
      <img src={src} alt="ZP Builds logo" className="logo-base" draggable={false} />
      <div className="logo-tint red" />
      <div className="logo-tint cyan" />
    </div>
  );
}
