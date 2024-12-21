export const watchTitleDividers = (titleDivider) => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        // Expand the divider, then unobserve it (one-time animation)
        entry.target.style.width = '100%';
        observer.unobserve(entry.target);
      }
    }
  });

  observer.observe(titleDivider);
};
