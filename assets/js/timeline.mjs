const PROGRESSBARCLASS = 'scroll-progress-bar';

export const watchTimelineScroll = (timeline) => {
  const progressBar = document.querySelector(`.${PROGRESSBARCLASS}`);
  timeline.addEventListener('scroll', () => {
    const scroll = timeline.scrollLeft;
    const total = timeline.scrollWidth - timeline.clientWidth;
    progressBar.style.width = ((scroll / total) * 100) + "%";
  });
};
