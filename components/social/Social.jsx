import Link from "next/link";

const Social = ({ items = [] }) => {
  return (
    <>
      {items.map(([Icon, url], index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <Icon />
        </a>
      ))}
    </>
  );
};

export default Social;
