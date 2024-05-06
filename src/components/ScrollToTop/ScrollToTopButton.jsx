import { useState } from 'react';
import styles from './ScrollToTopButton.module.css';
import ArrowIcon from '../../assets/arrow.svg';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
    >
      <img src={ArrowIcon} alt="" />
    </button>
  );
};

export default ScrollToTopButton;

