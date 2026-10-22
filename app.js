const settings = {introVideo: 'assets/intro-v3.mp4', rsvpStorageKey: 'wedding-rsvp-demo-v1'};
const gate = document.querySelector('#gate');
const cinema = document.querySelector('#cinema');
const video = document.querySelector('#intro');
const page = document.querySelector('main');
const openButton = document.querySelector('#open');
const skipButton = document.querySelector('#skip');
let sceneVersion = 0;
let opening = false;

// Keep the actual decoded final frame on screen. The background never swaps.
function reveal({fallback = false} = {}) {
  video.pause();
  opening = false;
  gate.hidden = true;
  cinema.hidden = false;
  cinema.classList.toggle('fallback', fallback);
  cinema.classList.add('backdrop');
  skipButton.hidden = true;
  page.hidden = false;
  document.body.classList.add('invitation-ready');
  window.scrollTo({top: 0, behavior: 'instant'});
  page.classList.remove('content-visible');
  requestAnimationFrame(() => requestAnimationFrame(() => {
    page.classList.add('content-visible');
  }));
}

async function start() {
  if (opening) return;
  opening = true;
  ++sceneVersion;
  document.body.classList.remove('invitation-ready');
  page.hidden = true;
  gate.hidden = true;
  cinema.hidden = false;
  cinema.classList.remove('backdrop', 'fallback');
  skipButton.hidden = false;
  if (!video.getAttribute('src')) video.src = settings.introVideo;
  video.currentTime = 0;
  try { await video.play(); } catch { reveal({fallback: true}); }
}

async function skipIntro() {
  const version = sceneVersion;
  video.pause();
  if (!Number.isFinite(video.duration) || video.duration <= 0 || !video.seekable.length) {
    reveal({fallback: true});
    return;
  }
  // Seek within the final held frame before exposing text, including on slow devices.
  const positioned = new Promise(resolve => {
    const timer = setTimeout(() => finish(false), 2000);
    const done = () => finish(true);
    function finish(ok) {
      clearTimeout(timer);
      video.removeEventListener('seeked', done);
      resolve(ok);
    }
    video.addEventListener('seeked', done, {once: true});
  });
  video.currentTime = Math.max(0, video.duration - 0.04);
  const ok = await positioned;
  if (version === sceneVersion) reveal({fallback: !ok || video.currentTime < video.duration - 0.25});
}

openButton.addEventListener('click', start);
skipButton.addEventListener('click', skipIntro);
video.addEventListener('ended', () => reveal());
video.addEventListener('error', () => {
  if (opening) reveal({fallback: true});
});
document.querySelector('#replay').addEventListener('click', () => {
  ++sceneVersion;
  opening = false;
  video.pause();
  page.hidden = true;
  page.classList.remove('content-visible');
  cinema.hidden = true;
  gate.hidden = false;
  document.body.classList.remove('invitation-ready');
  window.scrollTo({top: 0, behavior: 'instant'});
  openButton.focus({preventScroll: true});
});

const form = document.querySelector('form');
form.addEventListener('change', () => {
  const absent = form.elements.attending.value === 'no';
  document.querySelector('#guest-label').hidden = absent;
  form.elements.guests.disabled = absent;
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form));
  if (!values.name.trim()) {
    form.elements.name.setCustomValidity('กรุณาระบุชื่อ');
    form.elements.name.reportValidity();
    return;
  }
  form.elements.name.setCustomValidity('');
  if (values.attending === 'no') values.guests = '0';
  const result = document.querySelector('#result');
  try {
    localStorage.setItem(settings.rsvpStorageKey, JSON.stringify({...values, savedAt: new Date().toISOString()}));
    result.textContent = 'บันทึกคำตอบตัวอย่างแล้วบนเบราว์เซอร์นี้ — ยังไม่ได้ส่งถึงเจ้าภาพ';
  } catch {
    result.textContent = 'เบราว์เซอร์ไม่อนุญาตให้บันทึกข้อมูล กรุณาลองอีกครั้ง';
  }
  result.focus();
});
form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
