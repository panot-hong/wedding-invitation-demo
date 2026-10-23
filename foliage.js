// Keep the original artwork intact; CSS rotates it gently without deforming leaves.
class FoliageBreeze {
  constructor(image) {
    this.image = image;
    this.active = false;
    this.button = document.querySelector('#motion-toggle');
    this.override = null;
    try {
      const saved = localStorage.getItem('wedding-floral-motion');
      if (saved === 'on' || saved === 'off') this.override = saved === 'on';
    } catch { /* Motion controls still work when storage is unavailable. */ }
    this.preference = matchMedia('(prefers-reduced-motion: reduce)');
    this.update = this.update.bind(this);
    this.preference.addEventListener('change', this.update);
    image.addEventListener('load', this.update);
    addEventListener('pageshow', this.update);
    document.addEventListener('visibilitychange', this.update);
    this.button.addEventListener('click', () => {
      this.override = !this.enabled;
      try { localStorage.setItem('wedding-floral-motion', this.override ? 'on' : 'off'); } catch {}
      this.update();
    });
    this.update();
  }
  get enabled() {
    return this.override ?? !this.preference.matches;
  }
  update() {
    const show = this.active && this.enabled;
    this.image.hidden = !show;
    this.image.classList.toggle('moving', show);
    this.button.textContent = this.enabled ? 'Motion on' : 'Motion off';
    this.button.setAttribute('aria-pressed', String(this.enabled));
    this.button.setAttribute('aria-label', this.enabled ? 'Turn floral motion off' : 'Turn floral motion on');
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
