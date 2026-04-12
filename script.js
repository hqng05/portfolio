/* ═══════════════════════════════════════════════
   BOOT SEQUENCE
   ═══════════════════════════════════════════════ */
(function bootSequence() {
  const bar = document.getElementById('boot-bar');
  const text = document.getElementById('boot-text');
  const biosEl = document.getElementById('bios-lines');
  const biosLines = biosEl.querySelectorAll('span');
  const bootScreen = document.getElementById('boot-screen');

  const messages = [
    'Loading system files...',
    'Initializing portfolio kernel...',
    'Mounting project drives...',
    'Loading skill modules...',
    'Scanning contact ports...',
    'Applying retro theme...',
    'Starting desktop...'
  ];

  // BIOS text phase
  let biosIdx = 0;
  const biosInterval = setInterval(() => {
    if (biosIdx < biosLines.length) {
      biosLines[biosIdx].classList.add('show');
      biosIdx++;
    } else {
      clearInterval(biosInterval);
    }
  }, 180);

  // Progress bar phase (starts after BIOS)
  setTimeout(() => {
    let progress = 0;
    let msgIdx = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress > 100) progress = 100;
      bar.style.width = progress + '%';

      if (msgIdx < messages.length && progress > (msgIdx + 1) * (100 / messages.length)) {
        text.textContent = messages[msgIdx];
        msgIdx++;
      }

      if (progress >= 100) {
        clearInterval(progressInterval);
        text.textContent = 'Welcome!';
        setTimeout(() => {
          bootScreen.classList.add('fade-out');
          setTimeout(() => bootScreen.remove(), 600);
          // Auto-open About window after boot
          openWindow('about');
        }, 400);
      }
    }, 120);
  }, biosLines.length * 180 + 300);
})();

/* ═══════════════════════════════════════════════
   WINDOW MANAGEMENT
   ═══════════════════════════════════════════════ */
let zCounter = 100;
const windowState = {}; // { id: { open, minimized, maximized, prevStyle } }

const wins = {
  about: { icon: '👤', title: 'About Me' },
  projects: { icon: '📁', title: 'Projects' },
  skills: { icon: '💾', title: 'Skills' },
  contact: { icon: '📧', title: 'Contact' },
  resume: { icon: '📄', title: 'Resume' },
  support: { icon: '💖', title: 'Support Me' },
  crypto: { icon: '🪙', title: 'Crypto' },
  banktransfer: { icon: '🏦', title: 'MBBank Transfer' },
};

function getWinEl(id) { return document.getElementById('win-' + id); }

function openWindow(id) {
  const el = getWinEl(id);
  if (!el) return;

  el.classList.remove('hidden', 'minimized');
  el.style.display = '';
  windowState[id] = windowState[id] || {};
  windowState[id].open = true;
  windowState[id].minimized = false;

  bringToFront(id);
  updateTaskbar();
  playClick();
}

function closeWindow(id) {
  const el = getWinEl(id);
  el.classList.add('hidden');
  el.classList.remove('maximized', 'minimized');
  delete windowState[id];
  updateTaskbar();
  playClick();
}

function minimizeWindow(id) {
  const el = getWinEl(id);
  el.classList.add('minimized');
  if (windowState[id]) windowState[id].minimized = true;
  updateTaskbar();
  playClick();
}

function maximizeWindow(id) {
  const el = getWinEl(id);
  if (!windowState[id]) windowState[id] = {};

  if (el.classList.contains('maximized')) {
    el.classList.remove('maximized');
    // Restore prev position
    if (windowState[id].prevStyle) {
      Object.assign(el.style, windowState[id].prevStyle);
    }
    windowState[id].maximized = false;
  } else {
    // Save current position
    windowState[id].prevStyle = {
      top: el.style.top,
      left: el.style.left,
      width: el.style.width,
      height: el.style.height,
    };
    el.classList.add('maximized');
    windowState[id].maximized = true;
  }
  playClick();
}

function bringToFront(id) {
  zCounter++;
  const el = getWinEl(id);
  el.style.zIndex = zCounter;

  // Mark all inactive
  document.querySelectorAll('.win95-window').forEach(w => w.classList.add('inactive'));
  el.classList.remove('inactive');

  updateTaskbar();
}

function closeAllWindows() {
  Object.keys(wins).forEach(id => {
    const el = getWinEl(id);
    el.classList.add('hidden');
    el.classList.remove('maximized', 'minimized');
  });
  Object.keys(windowState).forEach(k => delete windowState[k]);
  updateTaskbar();
}

/* ═══════════════════════════════════════════════
   TASKBAR
   ═══════════════════════════════════════════════ */
function updateTaskbar() {
  const container = document.getElementById('taskbar-items');
  container.innerHTML = '';

  for (const id of Object.keys(wins)) {
    if (!windowState[id] || !windowState[id].open) continue;

    const btn = document.createElement('button');
    btn.className = 'taskbar-item';
    if (!windowState[id].minimized) {
      const el = getWinEl(id);
      if (!el.classList.contains('inactive')) btn.classList.add('active');
    }
    btn.innerHTML = `<span class="tb-icon">${wins[id].icon}</span> ${wins[id].title}`;
    btn.onclick = () => {
      if (windowState[id].minimized) {
        openWindow(id);
      } else {
        const el = getWinEl(id);
        if (!el.classList.contains('inactive')) {
          minimizeWindow(id);
        } else {
          bringToFront(id);
        }
      }
    };
    container.appendChild(btn);
  }
}

/* ═══════════════════════════════════════════════
   START MENU
   ═══════════════════════════════════════════════ */
function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  const btn = document.getElementById('start-btn');
  menu.classList.toggle('open');
  btn.classList.toggle('active');
}
function closeStartMenu() {
  document.getElementById('start-menu').classList.remove('open');
  document.getElementById('start-btn').classList.remove('active');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) {
    closeStartMenu();
  }
});

/* ═══════════════════════════════════════════════
   DRAGGING
   ═══════════════════════════════════════════════ */
(function initDrag() {
  let dragging = null;
  let offsetX, offsetY;

  document.addEventListener('mousedown', (e) => {
    const titlebar = e.target.closest('.win-titlebar');
    if (!titlebar || e.target.closest('.win-btn')) return;

    const winId = titlebar.dataset.window;
    const el = getWinEl(winId);
    if (!el || el.classList.contains('maximized')) return;

    bringToFront(winId);
    dragging = el;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const desktop = document.getElementById('desktop');
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;
    // Clamp
    x = Math.max(-dragging.offsetWidth + 80, Math.min(x, desktop.offsetWidth - 40));
    y = Math.max(0, Math.min(y, desktop.offsetHeight - 30));
    dragging.style.left = x + 'px';
    dragging.style.top = y + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = null; });
})();

/* ═══════════════════════════════════════════════
   RESIZING
   ═══════════════════════════════════════════════ */
(function initResize() {
  let resizing = null;
  let startW, startH, startX, startY;

  document.addEventListener('mousedown', (e) => {
    const handle = e.target.closest('.win-resize');
    if (!handle) return;

    const winId = handle.dataset.window;
    const el = getWinEl(winId);
    if (!el || el.classList.contains('maximized')) return;

    bringToFront(winId);
    resizing = el;
    const rect = el.getBoundingClientRect();
    startW = rect.width;
    startH = rect.height;
    startX = e.clientX;
    startY = e.clientY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!resizing) return;
    const w = Math.max(280, startW + (e.clientX - startX));
    const h = Math.max(150, startH + (e.clientY - startY));
    resizing.style.width = w + 'px';
    resizing.style.height = h + 'px';
  });

  document.addEventListener('mouseup', () => { resizing = null; });
})();

/* Focus window on body click */
document.getElementById('desktop').addEventListener('mousedown', (e) => {
  const win = e.target.closest('.win95-window');
  if (win) {
    const id = win.id.replace('win-', '');
    bringToFront(id);
  }
});

/* ═══════════════════════════════════════════════
   CLOCK
   ═══════════════════════════════════════════════ */
function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('tray-clock').textContent = h + ':' + m;
}
updateClock();
setInterval(updateClock, 30000);

/* ═══════════════════════════════════════════════
   8-BIT CLICK SOUND
   ═══════════════════════════════════════════════ */
let audioCtx = null;
function playClick() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
  } catch (e) { }
}

/* ═══════════════════════════════════════════════
   SUPPORT ME
   ═══════════════════════════════════════════════ */
function openCrypto() {
  // Reset display
  document.getElementById('crypto-addr-box').style.display = 'none';
  openWindow('crypto');
}

/* ✏️ EDIT: Replace with your actual wallet addresses */
const cryptoAddresses = {
  btc: { label: '₿ Bitcoin (BTC)', addr: 'bc1qrp94uck2gax4rsuqsr53lk8udkurqyz9ws2w26' },
  eth: { label: 'Ξ Ethereum (ETH)', addr: '0xbd771a0ef93a4387e790f5282e475e5f1c9c72aa' },
  ltc: { label: 'Ł Litecoin (LTC)', addr: 'ltc1qjag542fh2h5xu5k5yjz6veu89zslxfm5gghph4' },
};

function showCryptoAddr(coin) {
  const info = cryptoAddresses[coin];
  if (!info) return;
  playClick();
  document.getElementById('crypto-coin-label').textContent = info.label;
  document.getElementById('crypto-addr-text').textContent = info.addr;
  document.getElementById('crypto-copy-btn').textContent = '📋 Copy';
  document.getElementById('crypto-addr-box').style.display = 'block';
}

function copyCryptoAddr() {
  const addr = document.getElementById('crypto-addr-text').textContent;
  navigator.clipboard.writeText(addr).then(() => {
    document.getElementById('crypto-copy-btn').textContent = '✅ Copied!';
    setTimeout(() => {
      document.getElementById('crypto-copy-btn').textContent = '📋 Copy';
    }, 2000);
  });
  playClick();
}

function openBankTransfer() {
  // Reset QR
  document.getElementById('qr-container').style.display = 'none';
  document.getElementById('custom-amount').value = '';
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('amount-active'));
  openWindow('banktransfer');
}

function selectAmount(amount) {
  if (!amount || amount < 1000) return;
  playClick();

  // Highlight active button
  document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('amount-active'));
  // Find matching preset button
  document.querySelectorAll('.amount-grid .amount-btn').forEach(b => {
    const btnAmount = parseInt(b.textContent.replace(/[^0-9]/g, ''));
    if (btnAmount === amount) b.classList.add('amount-active');
  });

  const formatted = amount.toLocaleString('vi-VN');
  const qrUrl = `https://qr.sepay.vn/img?acc=0971217856&bank=MBBank&amount=${amount}&template=compact&des=tysm`;

  document.getElementById('qr-label').textContent = `Số tiền: ${formatted}₫`;
  document.getElementById('qr-img').src = qrUrl;
  document.getElementById('qr-container').style.display = 'block';
}
