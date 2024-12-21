export const watchHomePageBanner = (video, title) => {
  let isTitleShown = false;
  video.addEventListener('timeupdate', () => {
    const timeLeft = video.duration - video.currentTime;
    if (timeLeft <= 2.5 && !isTitleShown) {
      // Slide the title in from the left
      title.style.left = 0;
      title.style.opacity = 1;

      // After slide is completed, blur the background
      window.setTimeout(() => {
        title.classList.toggle('backdrop-blur-md');
      }, 2000);

      isTitleShown = true;
    }
  });
};
