import React from 'react';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  backgroundColor?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  backgroundColor,
  target = '_blank',
  rel = 'noopener noreferrer',
  className = '',
}) => {
  const linkStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? rel : undefined}
      className={`${styles.LinkButton} ${className}`}
      style={linkStyle}
    >
      {children}
    </a>
  );
};

export default LinkButton;
