/* Only recovery listings load this small failure fallback; no API or video player. */
for (const image of document.querySelectorAll('img[data-youtube-thumbnail]')) {
  const showFallback = () => { image.hidden = true }
  // YouTube may return a small placeholder instead of a missing HQ thumbnail.
  const checkImage = () => {
    if (!image.naturalWidth || image.naturalWidth < 480) showFallback()
  }
  image.addEventListener('error', showFallback, { once: true })
  image.addEventListener('load', checkImage, { once: true })
  if (image.complete) checkImage()
}
