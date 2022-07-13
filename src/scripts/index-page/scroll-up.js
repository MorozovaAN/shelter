export const scrollUp = () => {
  const scrollUp = document.querySelector('.scroll-up');
  const startScreen = document.querySelector('.start-screen');

  window.addEventListener('scroll', () => {
    const height = startScreen.offsetHeight;
    if (document.documentElement.scrollTop > height) {
      scrollUp.style.opacity = '1';
    } else {
      scrollUp.style.opacity = '0';
    }
  });
};
