import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]);

const SliderJS = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
  });
};

export default SliderJS;
