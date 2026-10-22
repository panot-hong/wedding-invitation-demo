// A fixed, independent canvas layer gives the existing botanical artwork a breeze.
// Its source is the decoded final video frame, preserving the transition alignment.
class FoliageBreeze {
  constructor(canvas, video) {
    this.canvas = canvas;
    this.video = video;
    this.source = document.createElement('canvas');
    this.frame = document.createElement('canvas');
    this.preference = matchMedia('(prefers-reduced-motion: reduce)');
    this.active = false;
    this.serial = 0;
    this.tick = this.tick.bind(this);
    this.preference.addEventListener('change', () => {
      if (!this.active) return;
      cancelAnimationFrame(this.raf);
      this.canvas.hidden = this.preference.matches;
      if (!this.preference.matches) this.raf = requestAnimationFrame(this.tick);
    });
    addEventListener('resize', () => { if (this.active) this.layout(); });
  }
  async start(fallback) {
    this.stop();
    const serial = this.serial;
    let image = this.video;
    if (fallback) {
      image = new Image();
      image.src = 'assets/invitation-paper.png';
      try { await image.decode(); } catch { return; }
    }
    if (serial !== this.serial) return;
    const width = image.videoWidth || image.naturalWidth;
    const height = image.videoHeight || image.naturalHeight;
    if (!width || !height) return;
    this.source.width = width;
    this.source.height = height;
    this.source.getContext('2d').drawImage(image, 0, 0);
    this.active = true;
    this.started = performance.now();
    this.lastDraw = 0;
    this.layout();
    this.canvas.hidden = this.preference.matches;
    if (!this.preference.matches) this.raf = requestAnimationFrame(this.tick);
  }
  layout() {
    const bounds = this.canvas.parentElement.getBoundingClientRect();
    this.width = bounds.width;
    this.height = bounds.height;
    this.strip = Math.ceil(this.width * 0.4);
    this.dpr = Math.min(devicePixelRatio || 1, 1.5);
    this.canvas.width = Math.ceil(this.strip * this.dpr);
    this.canvas.height = Math.ceil(this.height * this.dpr);
    this.canvas.style.width = this.strip + 'px';
    this.frame.width = Math.ceil(this.width * this.dpr);
    this.frame.height = Math.ceil(this.height * this.dpr);
    const scale = Math.max(this.width / this.source.width, this.height / this.source.height);
    const context = this.frame.getContext('2d');
    context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    context.drawImage(this.source, 0, (this.height - this.source.height * scale) / 2,
      this.source.width * scale, this.source.height * scale);
    this.draw(0);
  }
  draw(time) {
    const context = this.canvas.getContext('2d');
    context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    context.clearRect(0, 0, this.strip, this.height);
    const gain = Math.min(time / 1.8, 1);
    // Row-based displacement bends stems and leaf tips without moving the page.
    for (let y = 0; y < this.height; y += 4) {
      const row = Math.min(4, this.height - y);
      const offset = gain * (Math.sin(time * 0.85 + y * 0.009) * 1.8 + Math.sin(time * 1.25 + y * 0.017) * 0.8);
      context.drawImage(this.frame, 0, y * this.dpr, (this.strip + 5) * this.dpr, row * this.dpr,
        offset, y, this.strip + 5, row);
    }
  }
  tick(now) {
    if (!this.active || this.preference.matches) return;
    if (now - this.lastDraw >= 1000 / 30) {
      this.draw((now - this.started) / 1000);
      this.lastDraw = now;
    }
    this.raf = requestAnimationFrame(this.tick);
  }
  stop() {
    ++this.serial;
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.canvas.hidden = true;
  }
}
