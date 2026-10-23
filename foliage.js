// Native animated WebP: 120 frames, a six-second seamless loop, loop=0 (forever).
// The browser decodes the motion independently of JavaScript drawing and scroll.
class FoliageBreeze {
  constructor(image) {
    this.image = image;
    this.active = false;
    this.preference = matchMedia('(prefers-reduced-motion: reduce)');
    this.update = this.update.bind(this);
    this.preference.addEventListener('change', this.update);
    image.addEventListener('load', this.update);
    addEventListener('pageshow', this.update);
    document.addEventListener('visibilitychange', this.update);
  }
  update() {
    const show = this.active && !this.preference.matches;
    this.image.hidden = !show;
    this.image.classList.toggle('moving', show);
  }
  start() {
    this.active = true;
    this.update();
  }
  stop() {
    this.active = false;
    this.update();
  }
}
