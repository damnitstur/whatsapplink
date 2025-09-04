export const Footer = () => {
  return (
    <footer className="py-12 px-4 justify-center flex">
      <small className="text-base-content/70">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://instagram.com/damnits_tur"
          target="_blank"
          rel="noopener noreferrer"
          className="text-warning font-semibold"
        >
          Gpt.art
        </a>{' '}
        All Rights Reserved.
      </small>
    </footer>
  );
};
