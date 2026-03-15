// ════════════════════════════════
//  CONTENT BUILDERS
// ════════════════════════════════
function buildFilesWindow(container) {
  const files = [
    { name: 'Documents', icon: ICONS.files },
    { name: 'Photos',    icon: ICONS.files },
    { name: 'Nat Miletic Bio', icon: ICONS.textFile },
  ];

  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content">
      <div class="file-grid">
        ${files.map(f => `
          <div class="file-item" onclick="selectFile(this)" ondblclick="openFileItem('${f.name}')">
            <img src="${f.icon}" alt="">
            <span class="file-label">${f.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${files.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildDocumentsWindow(container) {
  const files = [
    { name: 'Clio Websites Portfolio', url: 'https://cliowebsites.com/portfolio' },
    { name: 'Websites USA Portfolio',  url: 'https://websitesusa.com/our-work/' },
    { name: 'Nat Miletic Github',      url: 'https://github.com/natmiletic' },
  ];
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content">
      <div class="file-grid">
        ${files.map(f => `
          <div class="file-item" onclick="selectFile(this)" ondblclick="window.open('${f.url}','_blank')">
            <img src="img/world.png" alt="${f.name}">
            <span class="file-label">${f.name}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${files.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildPhotosWindow(container) {
  const photos = [
    { name: 'Nat Miletic Headshot', src: 'img/headshot.png', icon: ICONS.imageFile },
  ];
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content">
      <div class="file-grid">
        ${photos.map(p => `
          <div class="file-item" onclick="selectFile(this)" ondblclick="openImageInPaint('${p.src}','${p.name}')">
            <img src="${p.icon}" alt="">
            <span class="file-label">${p.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${photos.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildComputerWindow(container) {
  const drives = [
    { name: 'Floppy (A:)',      icon: ICONS.floppy },
    { name: 'Local Disk (C:)',  icon: ICONS.drive },
    { name: 'CD-ROM (D:)',      icon: ICONS.cdrom },
    { name: 'My Files',         icon: ICONS.files },
    { name: 'Control Panel',    icon: ICONS.controlPanel },
  ];

  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content">
      <div class="file-grid">
        ${drives.map(d => `
          <div class="file-item" onclick="selectFile(this)" ondblclick="${d.name === 'My Files' ? "openWindow('files')" : d.name === 'Control Panel' ? "openWindow('controlpanel')" : ''}">
            <img src="${d.icon}" alt="">
            <span class="file-label">${d.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${drives.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildControlPanelWindow(container) {
  const items = [
    { name: 'Display',        icon: 'img/my-computer.png' },
    { name: 'Fonts',          icon: 'img/notepad.png' },
    { name: 'Internet',       icon: 'img/internet-explorer.png' },
    { name: 'Mouse',          icon: 'img/my-computer.png' },
    { name: 'Sounds',         icon: 'img/speaker.png' },
  ];
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content">
      <div class="file-grid">
        ${items.map(d => `
          <div class="file-item" onclick="selectFile(this)">
            <img src="${d.icon}" alt="">
            <span class="file-label">${d.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${items.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildPaintWindow(container) {
  const COLORS = [
    '#000000','#808080','#800000','#808000','#008000','#008080','#000080','#800080',
    '#808040','#004040','#0080ff','#004080','#8000ff','#804000',
    '#ffffff','#c0c0c0','#ff0000','#ffff00','#00ff00','#00ffff','#0000ff','#ff00ff',
    '#ffff80','#80ff80','#80ffff','#8080ff','#ff80ff','#ff8040',
  ];

  const TOOLS = [
    { name:'Free Select',   svg:`<svg viewBox="0 0 16 16"><path d="M8,1C12,1,15,4,15,8C15,12,12,15,8,15C4,15,1,12,1,8C1,4,4,1,8,1Z" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="2,1.5"/></svg>` },
    { name:'Rect Select',   svg:`<svg viewBox="0 0 16 16"><rect x="1" y="1" width="14" height="14" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="3,1.5"/></svg>` },
    { name:'Eraser',        svg:`<svg viewBox="0 0 16 16"><rect x="1" y="8" width="14" height="7" fill="#ffaaff" stroke="#000" stroke-width="1"/><rect x="1" y="8" width="6" height="7" fill="#ff00ff"/></svg>` },
    { name:'Fill',          svg:`<svg viewBox="0 0 16 16"><path d="M2,13L2,7L6,3L10,7L8,7L8,13Z" fill="#4040ff" stroke="#000" stroke-width="0.5"/><circle cx="13" cy="13" r="2.5" fill="#ff0000"/><line x1="10" y1="10" x2="12" y2="11" stroke="#000" stroke-width="1"/></svg>` },
    { name:'Color Picker',  svg:`<svg viewBox="0 0 16 16"><path d="M14,2L15,3L7,11L5,11L5,13L3,15L1,13L3,11L5,11L5,9Z" fill="#000"/></svg>` },
    { name:'Magnifier',     svg:`<svg viewBox="0 0 16 16"><circle cx="6" cy="6" r="5" fill="none" stroke="#000" stroke-width="2"/><circle cx="6" cy="6" r="2.5" fill="#fff"/><line x1="10" y1="10" x2="15" y2="15" stroke="#000" stroke-width="2.5" stroke-linecap="round"/></svg>` },
    { name:'Pencil',        svg:`<svg viewBox="0 0 16 16"><path d="M13,2L15,4L5,14L3,14L3,12Z" fill="#000"/><path d="M3,12L3,14L5,14" fill="none" stroke="#808080" stroke-width="1"/></svg>` },
    { name:'Brush',         svg:`<svg viewBox="0 0 16 16"><path d="M13,1L15,3L7,11L5,9Z" fill="#804000"/><path d="M5,9L7,11C7,11,6,14,3,14C2,13,2,11,5,9Z" fill="#4080ff"/></svg>` },
    { name:'Airbrush',      svg:`<svg viewBox="0 0 16 16"><rect x="4" y="6" width="7" height="8" rx="2" fill="#808080" stroke="#000" stroke-width="1"/><rect x="1" y="8" width="4" height="2" fill="#000"/><circle cx="12" cy="3" r="1" fill="#000"/><circle cx="14" cy="6" r="1" fill="#000"/><circle cx="14" cy="1" r="1" fill="#000"/><circle cx="11" cy="1" r="1" fill="#000"/></svg>` },
    { name:'Text',          svg:`<svg viewBox="0 0 16 16"><text x="2" y="13" font-family="serif" font-size="13" font-weight="bold" fill="#000">A</text></svg>` },
    { name:'Line',          svg:`<svg viewBox="0 0 16 16"><line x1="2" y1="14" x2="14" y2="2" stroke="#000" stroke-width="2"/></svg>` },
    { name:'Curve',         svg:`<svg viewBox="0 0 16 16"><path d="M2,14 Q2,2 14,2" fill="none" stroke="#000" stroke-width="2"/></svg>` },
    { name:'Rectangle',     svg:`<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" fill="none" stroke="#000" stroke-width="2"/></svg>` },
    { name:'Polygon',       svg:`<svg viewBox="0 0 16 16"><polygon points="8,2 14,7 12,14 4,14 2,7" fill="none" stroke="#000" stroke-width="2"/></svg>` },
    { name:'Ellipse',       svg:`<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="6" ry="5" fill="none" stroke="#000" stroke-width="2"/></svg>` },
    { name:'Rounded Rect',  svg:`<svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="3" fill="none" stroke="#000" stroke-width="2"/></svg>` },
  ];

  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>I</u>mage</span>
      <span class="menu-item"><u>O</u>ptions</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="paint-body">
      <div class="paint-toolbox">
        <div class="paint-tools">
          ${TOOLS.map((t, i) => `
            <button class="paint-tool${i === 6 ? ' active' : ''}" title="${t.name}"
              onclick="this.closest('.paint-tools').querySelectorAll('.paint-tool').forEach(b=>b.classList.remove('active'));this.classList.add('active')">
              ${t.svg}
            </button>`).join('')}
        </div>
        <div class="paint-tool-options">
          ${[1,2,3,4,5].map((w, i) => `
            <button class="paint-line-opt${i === 0 ? ' active' : ''}" title="${w}px line"
              onclick="this.closest('.paint-tool-options').querySelectorAll('.paint-line-opt').forEach(b=>b.classList.remove('active'));this.classList.add('active')">
              <span class="paint-line-preview" style="height:${w}px;"></span>
            </button>`).join('')}
        </div>
      </div>
      <div class="paint-canvas-wrap">
        <div class="paint-canvas-inner">
          <canvas class="paint-canvas" width="400" height="300"></canvas>
          <div class="paint-canvas-handle paint-handle-r"></div>
          <div class="paint-canvas-handle paint-handle-b"></div>
          <div class="paint-canvas-handle paint-handle-br"></div>
        </div>
      </div>
    </div>
    <div class="paint-palette">
      <div class="paint-fg-bg">
        <div class="paint-color-box paint-bg-color"></div>
        <div class="paint-color-box paint-fg-color"></div>
      </div>
      <div class="paint-color-grid">
        ${COLORS.map(c => `<div class="paint-color-swatch" style="background:${c};" title="${c}"
          onclick="this.closest('.paint-palette').querySelector('.paint-fg-color').style.background='${c}'"
          oncontextmenu="event.preventDefault();this.closest('.paint-palette').querySelector('.paint-bg-color').style.background='${c}'"></div>`).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item paint-coords" style="min-width:80px;"></span>
      <span class="status-item">400 x 300</span>
      <div class="status-resize-slot"></div>
    </div>
  `;

  container.style.cssText = 'display:flex;flex-direction:column;overflow:hidden;';

  const canvas = container.querySelector('.paint-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - r.left);
      const y = Math.round(e.clientY - r.top);
      const el = container.querySelector('.paint-coords');
      if (el) el.textContent = `${x}, ${y}`;
    });
    canvas.addEventListener('mouseleave', () => {
      const el = container.querySelector('.paint-coords');
      if (el) el.textContent = '';
    });
  }
}

function buildBriefcaseWindow(container) {
  const files = [
    { name: 'Clio Websites Portfolio',  url: 'https://cliowebsites.com/portfolio' },
    { name: 'Websites USA Portfolio',   url: 'https://websitesusa.com/our-work/' },
    { name: 'Nat Miletic Github',       url: 'https://github.com/natmiletic' },
  ];
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content">
      <div class="file-grid">
        ${files.map(f => `
          <div class="file-item" onclick="selectFile(this)" ondblclick="window.open('${f.url}','_blank')">
            <img src="img/world.png" alt="${f.name}">
            <span class="file-label">${f.name}</span>
          </div>`).join('')}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${files.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildRecycleWindow(container) {
  const colStyle = `flex:1;padding:2px 6px;font-size:11px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;border:2px solid;border-top-color:var(--c-border-lightest);border-left-color:var(--c-border-lightest);border-bottom-color:var(--c-border-dark);border-right-color:var(--c-border-dark);cursor:default;`;
  const rowStyle = `display:flex;align-items:center;padding:2px 0;border-bottom:1px solid #e0e0e0;font-size:13px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;`;
  const items = typeof recycleBinItems !== 'undefined' ? recycleBinItems : [];
  const rows = items.map(item => `
    <div style="${rowStyle}">
      <div style="flex:1;display:flex;align-items:center;gap:6px;padding:0 6px;">
        <img src="${item.src}" style="width:16px;height:16px;image-rendering:pixelated;flex-shrink:0;">
        <span>${item.name}</span>
      </div>
      <div style="flex:1;padding:0 6px;color:#444;">Desktop</div>
    </div>`).join('');
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div style="display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:0;">
      <div style="display:flex;flex-shrink:0;background:var(--c-material);">
        <div style="${colStyle}">Name</div>
        <div style="${colStyle}">Original Location</div>
      </div>
      <div class="window-content" style="flex:1;overflow:auto;background:#fff;">
        ${rows}
      </div>
    </div>
    <div class="status-bar">
      <span class="status-item">${items.length} object(s)</span>
      <div class="status-resize-slot"></div>
    </div>
  `;
}

function buildIEWindow(container) {
  const HOME = 'https://cliowebsites.com';
  ieHistory = [HOME];
  ieHistoryIndex = 0;

  const LINKS = [
    { label: 'Clio Websites', url: 'https://cliowebsites.com' },
    { label: 'Microsoft',     url: 'https://microsoft.com' },
  ];

  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item">F<u>a</u>vorites</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>

    <div class="ie-toolbar">
      <button class="ie-nav-btn" id="ie-back" title="Back" onclick="ieNav('back')" style="opacity:0.4;pointer-events:none;">
        <img src="img/ie-back-disabled.png" style="width:22px;height:22px;image-rendering:pixelated;">
        <span>Back</span>
      </button>
      <button class="ie-nav-btn" id="ie-forward" title="Forward" onclick="ieNav('forward')" style="opacity:0.4;pointer-events:none;">
        <img src="img/ie-forward-disabled.png" style="width:22px;height:22px;image-rendering:pixelated;">
        <span>Forward</span>
      </button>
      <div class="ie-toolbar-divider"></div>
      <button class="ie-nav-btn" id="ie-stop" title="Stop" onclick="ieNav('stop')">
        <img src="img/ie-stop-icon.png" style="width:42px;height:22px;image-rendering:pixelated;">
        <span>Stop</span>
      </button>
      <button class="ie-nav-btn" id="ie-refresh" title="Refresh" onclick="ieNav('refresh')">
        <img src="img/ie-refresh-icon.png" style="width:42px;height:22px;image-rendering:pixelated;">
        <span>Refresh</span>
      </button>
      <button class="ie-nav-btn" id="ie-home" title="Home" onclick="ieNav('home')">
        <img src="img/ie-home-icon.png" style="width:42px;height:22px;image-rendering:pixelated;">
        <span>Home</span>
      </button>
      <button class="ie-nav-btn" id="ie-search" title="Search" onclick="ieLoad('https://google.com')">
        <img src="img/ie-search-icon.png" style="width:42px;height:22px;image-rendering:pixelated;">
        <span>Search</span>
      </button>
      <div class="ie-toolbar-sep"></div>
      <div class="ie-logo">
        <img src="img/internet-explorer.png" id="ie-logo-img" alt="">
      </div>
    </div>

    <div class="ie-addressbar">
      <span class="ie-address-label">Address</span>
      <input class="ie-address-input" id="ie-address" type="text" value="${HOME}"
        onkeydown="if(event.key==='Enter')ieGo()">
    </div>

    <div class="ie-linksbar">
      <span class="ie-links-label">Links</span>
      ${LINKS.map(l => `<button class="ie-link-btn" onclick="ieLoad('${l.url}')">${l.label}</button>`).join('')}
    </div>

    <div class="ie-content" id="ie-content">
      <iframe id="ie-frame" src="${HOME}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onload="ieFrameLoaded(this)" onerror="ieFrameError()"></iframe>
      <div id="ie-blocked" style="display:none;position:absolute;inset:0;background:#fff;padding:12px;font-family:Arial,sans-serif;font-size:13px;color:#000;"></div>
    </div>

    <div class="status-bar">
      <span class="status-item" id="ie-status" style="flex:1;">Done</span>
      <span class="status-item">Internet zone</span>
      <div class="status-resize-slot"></div>
    </div>
  `;

  container.style.cssText = 'display:flex;flex-direction:column;overflow:hidden;';
  setTimeout(() => ieUpdateNavBtns(), 0);
}

let ieHistory = [];
let ieHistoryIndex = -1;

function ieUpdateNavBtns() {
  const backBtn = document.getElementById('ie-back');
  const fwdBtn  = document.getElementById('ie-forward');
  const canBack = ieHistoryIndex > 0;
  const canFwd  = ieHistoryIndex < ieHistory.length - 1;
  console.log('[IE nav]', { ieHistoryIndex, histLen: ieHistory.length, canBack, canFwd });
  if (backBtn) {
    const img = backBtn.querySelector('img');
    backBtn.style.opacity = canBack ? '1' : '0.4';
    backBtn.style.pointerEvents = canBack ? '' : 'none';
    if (img) img.src = canBack ? 'img/ie-back.png' : 'img/ie-back-disabled.png';
  }
  if (fwdBtn) {
    const img = fwdBtn.querySelector('img');
    fwdBtn.style.opacity = canFwd ? '1' : '0.4';
    fwdBtn.style.pointerEvents = canFwd ? '' : 'none';
    if (img) img.src = canFwd ? 'img/ie-forward.png' : 'img/ie-forward-disabled.png';
  }
}

function ieNav(action) {
  const frame = document.getElementById('ie-frame');
  if (!frame) return;
  if (action === 'back') {
    if (ieHistoryIndex > 0) { ieHistoryIndex--; ieLoad(ieHistory[ieHistoryIndex], true); }
  }
  if (action === 'forward') {
    if (ieHistoryIndex < ieHistory.length - 1) { ieHistoryIndex++; ieLoad(ieHistory[ieHistoryIndex], true); }
  }
  if (action === 'stop')    { frame.src = frame.src; }
  if (action === 'refresh') { try { frame.contentWindow.location.reload(); } catch(e){ frame.src = frame.src; } }
  if (action === 'home')    { ieLoad('https://cliowebsites.com'); }
}

function ieLoad(url, isBack) {
  if (!url) return;
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
  const frame   = document.getElementById('ie-frame');
  const addr    = document.getElementById('ie-address');
  const blocked = document.getElementById('ie-blocked');
  const status  = document.getElementById('ie-status');
  if (addr)    addr.value = url;
  if (blocked) { blocked.style.display = 'none'; blocked.textContent = ''; }
  if (frame)   { frame.style.display = 'none'; frame.src = 'about:blank'; }
  if (status)  status.textContent = 'Connecting to ' + url + '...';

  if (!isBack) {
    ieHistory = ieHistory.slice(0, ieHistoryIndex + 1);
    ieHistory.push(url);
    ieHistoryIndex = ieHistory.length - 1;
  }
  ieUpdateNavBtns();

  let hostname = url;
  try { hostname = new URL(url).hostname; } catch(e) {}

  fetch(url, { mode: 'no-cors', signal: AbortSignal.timeout(8000) })
    .then(() => {
      if (frame) { frame.style.display = 'block'; frame.src = url; }
    })
    .catch(err => {
      const msg = err.name === 'TimeoutError'
        ? hostname + ' timed out.'
        : (err.message || 'The page could not be loaded.');
      if (blocked) { blocked.textContent = 'Error: ' + msg; blocked.style.display = 'block'; }
      if (status)  status.textContent = 'Cannot connect to ' + hostname;
    });
}

function ieGo() {
  const addr = document.getElementById('ie-address');
  if (addr) ieLoad(addr.value.trim());
}

function ieFrameLoaded(frame) {
  const status  = document.getElementById('ie-status');
  const blocked = document.getElementById('ie-blocked');
  if (status) status.textContent = 'Done';
  if (!frame.src || frame.src === 'about:blank') return;
  let hostname = frame.src;
  try { hostname = new URL(frame.src).hostname; } catch(e) {}

  let isError = false;

  // Check 1: contentDocument accessible = browser error page (real cross-origin pages throw)
  try {
    const body = frame.contentDocument && frame.contentDocument.body;
    if (body) isError = true;
  } catch(e) { /* cross-origin success */ }

  // Check 2: contentWindow.location.href — chrome-error:// pages don't throw and expose a non-http URL
  if (!isError) {
    try {
      const href = frame.contentWindow.location.href;
      if (href && !/^https?:\/\//i.test(href)) isError = true;
    } catch(e) { /* cross-origin success */ }
  }

  if (isError) {
    if (blocked) { blocked.textContent = 'Error: ' + hostname + ' refused to connect.'; blocked.style.display = 'block'; }
    frame.style.display = 'none';
  }
}

function ieFrameError(e) {
  const blocked = document.getElementById('ie-blocked');
  const frame   = document.getElementById('ie-frame');
  const msg = (e && e.message) ? e.message : 'The page could not be loaded.';
  if (blocked) { blocked.textContent = 'Error: ' + msg; blocked.style.display = 'block'; }
  if (frame)   frame.style.display = 'none';
}

const TIPS = [
  { text: "To open a program, you just click the Start button, and then click the program's icon." },
  { text: "You can use Windows Explorer to see all the files on your computer." },
  { text: "To find a file, click the Start button, point to Find, and then click Files or Folders." },
  { text: "To adjust the volume, double-click the speaker icon in the taskbar." },
  { text: "You can drag icons on the desktop to rearrange them however you like." },
  { text: "Right-click the desktop to change your wallpaper and display settings." },
];
let tipIndex = 0;

const MONITOR_SVG = `<svg width="130" height="110" viewBox="0 0 130 110" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
  <!-- Monitor outer body -->
  <rect x="4" y="4" width="100" height="76" rx="4" fill="#c0c0c0" stroke="#808080" stroke-width="1"/>
  <rect x="4" y="4" width="100" height="2" fill="#dfdfdf"/>
  <rect x="4" y="4" width="2" height="76" fill="#dfdfdf"/>
  <rect x="103" y="4" width="1" height="76" fill="#808080"/>
  <rect x="4" y="79" width="100" height="1" fill="#808080"/>
  <!-- Screen bezel (inset) -->
  <rect x="10" y="10" width="88" height="62" fill="#404040"/>
  <rect x="10" y="10" width="88" height="1" fill="#606060"/>
  <rect x="10" y="10" width="1" height="62" fill="#606060"/>
  <!-- Screen -->
  <rect x="13" y="13" width="82" height="56" fill="#008080"/>
  <!-- Taskbar on screen -->
  <rect x="13" y="60" width="82" height="9" fill="#c0c0c0"/>
  <!-- Start button on screen -->
  <rect x="15" y="61" width="18" height="7" fill="#c0c0c0" stroke="#808080" stroke-width="0.5"/>
  <!-- Cursor arrow (pointing down-left) -->
  <polygon points="32,20 32,42 37,37 40,44 43,43 40,36 46,36" fill="#00e5e5"/>
  <polygon points="32,20 32,42 37,37 40,44 43,43 40,36 46,36" fill="none" stroke="#000" stroke-width="0.5"/>
  <!-- Monitor bottom strip -->
  <rect x="4" y="80" width="100" height="6" rx="0" fill="#b0b0b0" stroke="#808080" stroke-width="0.5"/>
  <!-- Power LED -->
  <rect x="93" y="82" width="4" height="2" fill="#00cc00"/>
  <!-- Neck -->
  <rect x="44" y="86" width="20" height="8" fill="#a8a8a8" stroke="#808080" stroke-width="0.5"/>
  <!-- Base -->
  <rect x="28" y="94" width="52" height="8" rx="2" fill="#a8a8a8" stroke="#808080" stroke-width="0.5"/>
  <rect x="28" y="94" width="52" height="1" fill="#c0c0c0"/>
</svg>`;

function buildWelcomeWindow(container) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;height:100%;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;background:var(--c-material);">

      <!-- Header: grey background -->
      <div style="padding:10px 14px 6px;flex-shrink:0;">
        <span style="font-size:22px;font-weight:normal;color:#000;">Welcome to </span><span style="font-size:22px;font-weight:900;color:#000;-webkit-text-stroke:0.8px #000;">Windows</span><span style="font-size:22px;font-weight:normal;color:#fff;">95</span>
      </div>

      <!-- Main row: yellow box + buttons -->
      <div style="display:flex;flex:1;padding:0 8px 8px;gap:8px;align-items:stretch;min-height:0;overflow:hidden;">

        <!-- Yellow sunken box: headshot left, text right -->
        <div style="flex:1;display:flex;flex-direction:column;gap:10px;align-items:center;background:#ffff99;border:2px solid;border-top-color:var(--c-border-dark);border-left-color:var(--c-border-dark);border-bottom-color:var(--c-border-lightest);border-right-color:var(--c-border-lightest);box-shadow:inset 1px 1px 0 var(--c-border-darkest);padding:12px;min-height:0;">
          <div style="width:100%;">
            <div style="font-size:14px;font-weight:bold;margin-bottom:6px;">Welcome to my Windows 95 portfolio website.</div>
            <div style="font-size:12px;line-height:1.6;">I decided to vibe code this nostalgic portfolio website with Claude Code. I hope you enjoy it!</div>
          </div>
          <img src="img/headshot.png" style="width:140px;height:140px;image-rendering:pixelated;display:block;flex-shrink:0;">
        </div>

        <!-- Right: buttons -->
        <div style="display:flex;flex-direction:column;gap:4px;width:130px;flex-shrink:0;">
          <button class="dialog-btn" style="width:100%;">What's <u>N</u>ew</button>
          <button class="dialog-btn" style="width:100%;"><u>O</u>nline Registration</button>
          <div style="flex:1;"></div>
          <div style="height:1px;background:var(--c-border-dark);margin-bottom:2px;box-shadow:0 1px 0 var(--c-border-lightest);"></div>
          <div style="height:30px;"></div>
          <button class="dialog-btn" style="width:100%;" onclick="closeWindow('welcome')"><u>C</u>lose</button>
        </div>

      </div>
    </div>
  `;
  container.style.cssText = 'display:flex;flex-direction:column;overflow:hidden;';
}

function buildShutdownWindow(container) {
  container.innerHTML = `
    <div style="display:flex;gap:14px;padding:14px 16px 0;align-items:flex-start;">
      <img src="img/shutdown.ico" style="width:41px;height:41px;image-rendering:pixelated;flex-shrink:0;margin-top:2px;">
      <div style="flex:1;">
        <p style="margin-bottom:10px;font-size:12px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;">Are you sure you want to:</p>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;cursor:pointer;">
            <input type="radio" name="shutdown-opt" value="shutdown" checked style="cursor:pointer;accent-color:#000080;flex-shrink:0;">
            <span><u>S</u>hut down the computer?</span>
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;cursor:pointer;">
            <input type="radio" name="shutdown-opt" value="restart" style="cursor:pointer;accent-color:#000080;flex-shrink:0;">
            <span><u>R</u>estart the computer?</span>
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;cursor:pointer;">
            <input type="radio" name="shutdown-opt" value="msdos" style="cursor:pointer;accent-color:#000080;flex-shrink:0;">
            <span>Restart the computer in <u>M</u>S-DOS mode?</span>
          </label>
          <label style="display:flex;align-items:center;gap:6px;font-size:12px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;cursor:pointer;">
            <input type="radio" name="shutdown-opt" value="logoff" style="cursor:pointer;accent-color:#000080;flex-shrink:0;">
            <span><u>C</u>lose all programs and log on as a different user?</span>
          </label>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:center;gap:8px;padding:30px 14px 12px;">
      <button class="dialog-btn" onclick="doShutdownAction()"><u>Y</u>es</button>
      <button class="dialog-btn" onclick="closeWindow('shutdown')"><u>N</u>o</button>
      <button class="dialog-btn" onclick="closeWindow('shutdown')"><u>H</u>elp</button>

    </div>
  `;
  container.style.cssText = 'display:flex;flex-direction:column;';
}

function buildBioWindow(container) {
  const s = "font-family:'Fixedsys','Courier New',monospace;font-size:16px;line-height:1.6;color:#000;padding:8px;";
  const a = 'color:#000080;text-decoration:underline;cursor:pointer;';
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>S</u>earch</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="notepad-edit-row">
      <div class="notepad-ta" style="overflow:hidden;display:block;white-space:normal;">
        <div style="${s}">
          <p style="margin-bottom:12px;">Nat Miletic is the founder of <a href="https://cliowebsites.com" target="_blank" style="${a}">Clio Websites</a> and co-founder of <a href="https://websitesusa.com" target="_blank" style="${a}">Websites USA</a>. With a BCIS and an MBA under his belt, Nat's all about helping businesses thrive online with his sharp eye for detail and relentless passion for making things better.</p>
          <p style="margin-bottom:12px;">From crafting sleek WordPress websites to boosting SEO and ensuring everything works smoothly across devices, Nat's helped businesses big and small grow their online presence. Whether it's global brands like MyFitnessPal or local favorites like Galvanic, his work has made websites not only look great but also perform better in search results.</p>
          <p style="margin-bottom:12px;">Nat's been in the web development and marketing game since the early 2000s, and he loves sharing his insights with thousands of followers on social media.</p>
          <p style="margin-bottom:12px;">Oh, and did we mention? He's also the author of <a href="https://clientbytes.gumroad.com/l/dev-agency-and-freelancer-sales" target="_blank" style="${a}">Client Bytes – Dev Agency and Freelancer Sales</a> and has created several WordPress and SEO courses available on Gumroad and Udemy. He also co-hosts a podcast called The Agency Hustle with Kyle Prinsloo.</p>
        </div>
      </div>
      <div class="notepad-vscroll">
        <button class="notepad-scroll-btn notepad-scroll-up"></button>
        <div class="notepad-vtrack">
          <div class="notepad-vthumb"></div>
        </div>
        <button class="notepad-scroll-btn notepad-scroll-down"></button>
        <div style="width:16px;height:16px;flex-shrink:0;background:#c0c0c0;"></div>
      </div>
    </div>
  `;
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  const ta     = container.querySelector('.notepad-ta');
  const vtrack = container.querySelector('.notepad-vtrack');
  const vthumb = container.querySelector('.notepad-vthumb');
  const vup    = container.querySelector('.notepad-scroll-up');
  const vdown  = container.querySelector('.notepad-scroll-down');

  function updateVScroll() {
    const scrollable = ta.scrollHeight - ta.clientHeight;
    const disabled = scrollable <= 0;
    vup.classList.toggle('scroll-disabled', disabled);
    vdown.classList.toggle('scroll-disabled', disabled);
    vtrack.classList.toggle('scroll-disabled', disabled);
    if (disabled) { vthumb.style.display = 'none'; return; }
    vthumb.style.display = '';
    const trackH = vtrack.clientHeight;
    const thumbH = Math.max(20, (ta.clientHeight / ta.scrollHeight) * trackH);
    const thumbT = (ta.scrollTop / scrollable) * (trackH - thumbH);
    vthumb.style.height = thumbH + 'px';
    vthumb.style.top    = thumbT + 'px';
  }

  ta.addEventListener('scroll', () => { updateVScroll(); });

  vup.addEventListener('click',  () => { ta.scrollTop -= 20; updateVScroll(); });
  vdown.addEventListener('click', () => { ta.scrollTop += 20; updateVScroll(); });

  let vDrag = false, vDragY = 0, vScrollT = 0;
  vthumb.addEventListener('mousedown', e => {
    vDrag = true; vDragY = e.clientY; vScrollT = ta.scrollTop; e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (vDrag) {
      const scrollable = ta.scrollHeight - ta.clientHeight;
      ta.scrollTop = vScrollT + (e.clientY - vDragY) * (scrollable / (vtrack.clientHeight - vthumb.offsetHeight));
      updateVScroll();
    }
  });
  document.addEventListener('mouseup', () => { vDrag = false; });

  ta.addEventListener('wheel', e => {
    e.preventDefault();
    ta.scrollTop += e.deltaY;
    updateVScroll();
  }, { passive: false });

  setTimeout(() => { updateVScroll(); }, 50);
}

function buildNotepadWindow(container) {
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>S</u>earch</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="notepad-edit-row">
      <textarea class="notepad-ta"></textarea>
      <div class="notepad-vscroll">
        <button class="notepad-scroll-btn notepad-scroll-up"></button>
        <div class="notepad-vtrack">
          <div class="notepad-vthumb"></div>
        </div>
        <button class="notepad-scroll-btn notepad-scroll-down"></button>
        <div style="width:16px;height:16px;flex-shrink:0;background:#c0c0c0;"></div>
      </div>
    </div>
  `;
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  const ta     = container.querySelector('.notepad-ta');
  const vtrack = container.querySelector('.notepad-vtrack');
  const vthumb = container.querySelector('.notepad-vthumb');
  const vup    = container.querySelector('.notepad-scroll-up');
  const vdown  = container.querySelector('.notepad-scroll-down');

  function updateVScroll() {
    const scrollable = ta.scrollHeight - ta.clientHeight;
    const disabled = scrollable <= 0;
    vup.classList.toggle('scroll-disabled', disabled);
    vdown.classList.toggle('scroll-disabled', disabled);
    vtrack.classList.toggle('scroll-disabled', disabled);
    if (disabled) { vthumb.style.display = 'none'; return; }
    vthumb.style.display = '';
    const trackH  = vtrack.clientHeight;
    const thumbH  = Math.max(20, (ta.clientHeight / ta.scrollHeight) * trackH);
    const thumbT  = (ta.scrollTop / scrollable) * (trackH - thumbH);
    vthumb.style.height = thumbH + 'px';
    vthumb.style.top    = thumbT + 'px';
  }

  ta.addEventListener('scroll', () => { updateVScroll(); });
  ta.addEventListener('input',  () => { updateVScroll(); });

  vup.addEventListener('click',  () => { ta.scrollTop -= 20; updateVScroll(); });
  vdown.addEventListener('click', () => { ta.scrollTop += 20; updateVScroll(); });

  let vDrag = false, vDragY = 0, vScrollT = 0;
  vthumb.addEventListener('mousedown', e => {
    vDrag = true; vDragY = e.clientY; vScrollT = ta.scrollTop; e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (vDrag) {
      const scrollable = ta.scrollHeight - ta.clientHeight;
      ta.scrollTop = vScrollT + (e.clientY - vDragY) * (scrollable / (vtrack.clientHeight - vthumb.offsetHeight));
      updateVScroll();
    }
  });
  document.addEventListener('mouseup', () => { vDrag = false; });

  ta.addEventListener('wheel', e => {
    e.preventDefault();
    ta.scrollTop += e.deltaY;
    updateVScroll();
  }, { passive: false });

  setTimeout(() => { updateVScroll(); }, 50);
}

function buildRunWindow(container) {
  const f = "font-size:12px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;";
  const comboStyle = `
    flex:1;display:flex;flex-direction:row;justify-content:flex-end;align-items:center;
    padding:2px 2px 2px 5px;height:22px;
    background:#ffffff;border:none;
    box-shadow:inset -1px -1px 0px #ffffff, inset 1px 1px 0px #808080, inset -2px -2px 0px #c1c1c1, inset 2px 2px 0px #000000;
  `;
  const inputStyle = `
    flex:1;height:100%;${f}
    padding:0;border:none;background:transparent;outline:none;
  `;
  const dropBtnStyle = `
    width:16px;align-self:stretch;flex-shrink:0;
    background:#c0c0c0;cursor:pointer;border:none;
    box-shadow:inset -1px -1px 0px #000000, inset 1px 1px 0px #c1c1c1, inset -2px -2px 0px #818181, inset 2px 2px 0px #ffffff;
    display:flex;align-items:center;justify-content:center;padding:0;position:relative;
  `;
  container.innerHTML = `
    <div style="display:flex;gap:12px;padding:14px 14px 10px;align-items:flex-start;">
      <img src="img/run.ico" style="width:38px;height:38px;image-rendering:pixelated;flex-shrink:0;margin-top:2px;">
      <p style="${f}line-height:1.5;">Type the name of a program, folder, or document, and Windows will open it for you.</p>
    </div>
    <div style="display:flex;align-items:center;gap:8px;padding:0 14px 12px;">
      <label style="${f}white-space:nowrap;">Open:</label>
      <div style="${comboStyle}">
        <input type="text" id="run-input" style="${inputStyle}" onkeydown="if(event.key==='Enter')doRun()">
        <button style="${dropBtnStyle}"><svg width="7" height="4" viewBox="0 0 7 4" style="display:block;"><polygon points="0,0 7,0 3.5,4" fill="#000000"/></svg></button>
      </div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:6px;padding:5px 14px 24px;">
      <button class="dialog-btn" onclick="doRun()"><u>O</u>K</button>
      <button class="dialog-btn" onclick="closeWindow('run')"><u>C</u>ancel</button>
      <button class="dialog-btn"><u>B</u>rowse...</button>
    </div>
  `;
  container.style.cssText = 'display:flex;flex-direction:column;';
}

// ════════════════════════════════
//  WINDOW DEFINITIONS
// ════════════════════════════════
//  MINESWEEPER
// ════════════════════════════════
let mineRows = 9, mineCols = 9, mineTotalMines = 10;
let mineBoard = [], mineRevealed = 0, mineFlags = 0;
let mineGameOver = false, mineGameWon = false, mineFirstClick = true;
let mineTimerVal = 0, mineTimerInterval = null;

const MINE_NUM_COLORS = ['','#0000ff','#008000','#ff0000','#000080','#800000','#008080','#000000','#808080'];

function buildMinesweeperWindow(container) {
  container.style.cssText = 'display:flex;flex-direction:column;background:var(--c-material);user-select:none;';
  container.innerHTML = `
    <div class="window-menubar" style="position:relative;">
      <span class="menu-item" onclick="mineGameMenu(event)"><u>G</u>ame</span>
      <div id="mine-game-menu" style="display:none;position:absolute;top:100%;left:0;background:var(--c-material);box-shadow:var(--shadow-window-frame);z-index:9999;min-width:160px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;font-size:13px;">
        <div class="mine-menu-item" onclick="mineSetDifficulty(9,9,10)">Beginner</div>
        <div class="mine-menu-item" onclick="mineSetDifficulty(16,16,40)">Intermediate</div>
        <div class="mine-menu-item" onclick="mineSetDifficulty(16,30,99)">Expert</div>
        <div style="border-top:1px solid var(--c-border-dark);margin:2px 0;"></div>
        <div class="mine-menu-item" onclick="mineNewGame()">New Game</div>
      </div>
    </div>
    <div style="padding:6px;display:flex;flex-direction:column;gap:6px;">
      <div class="mine-header">
        <div class="mine-lcd" id="mine-count-lcd">010</div>
        <button class="mine-face-btn" id="mine-face-btn" onmousedown="mineFacePress()" onmouseup="mineNewGame()">🙂</button>
        <div class="mine-lcd" id="mine-timer-lcd">000</div>
      </div>
      <div class="mine-field-border">
        <div class="mine-grid" id="mine-grid"></div>
      </div>
    </div>
  `;
  mineNewGame();
}

function mineGameMenu(e) {
  e.stopPropagation();
  const menu = document.getElementById('mine-game-menu');
  if (!menu) return;
  const visible = menu.style.display !== 'none';
  menu.style.display = visible ? 'none' : 'block';
  if (!visible) {
    const close = () => { menu.style.display = 'none'; document.removeEventListener('click', close); };
    setTimeout(() => document.addEventListener('click', close), 0);
  }
}

function mineSetDifficulty(r, c, m) {
  mineRows = r; mineCols = c; mineTotalMines = m;
  const win = document.getElementById('win-minesweeper');
  if (win) {
    const newW = c * 22 + 26;
    const newH = r * 22 + 132;
    win.style.width  = newW + 'px';
    win.style.height = newH + 'px';
  }
  mineNewGame();
}

function mineNewGame() {
  if (mineTimerInterval) { clearInterval(mineTimerInterval); mineTimerInterval = null; }
  mineTimerVal = 0; mineFirstClick = true; mineGameOver = false; mineGameWon = false;
  mineFlags = 0; mineRevealed = 0;
  mineBoard = Array.from({ length: mineRows }, () =>
    Array.from({ length: mineCols }, () => ({ mine: false, revealed: false, flagged: false, questioned: false, adj: 0 }))
  );
  mineLCDSet('mine-count-lcd', mineTotalMines);
  mineLCDSet('mine-timer-lcd', 0);
  mineSetFace('🙂');
  mineRenderGrid();
}

function minePlaceMines(safeR, safeC) {
  const safe = new Set([`${safeR},${safeC}`]);
  // Also protect the 8 neighbors
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) safe.add(`${safeR+dr},${safeC+dc}`);
  let placed = 0;
  while (placed < mineTotalMines) {
    const r = Math.floor(Math.random() * mineRows);
    const c = Math.floor(Math.random() * mineCols);
    if (!mineBoard[r][c].mine && !safe.has(`${r},${c}`)) {
      mineBoard[r][c].mine = true; placed++;
    }
  }
  for (let r = 0; r < mineRows; r++)
    for (let c = 0; c < mineCols; c++)
      mineBoard[r][c].adj = mineCountAdj(r, c);
}

function mineCountAdj(r, c) {
  let n = 0;
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    const nr = r+dr, nc = c+dc;
    if (nr >= 0 && nr < mineRows && nc >= 0 && nc < mineCols && mineBoard[nr][nc].mine) n++;
  }
  return n;
}

function mineReveal(r, c) {
  if (mineGameOver || mineGameWon) return;
  if (r < 0 || r >= mineRows || c < 0 || c >= mineCols) return;
  const cell = mineBoard[r][c];
  if (cell.revealed || cell.flagged) return;

  if (mineFirstClick) {
    mineFirstClick = false;
    minePlaceMines(r, c);
    cell.adj = mineCountAdj(r, c); // recalc after placement
    mineTimerInterval = setInterval(() => {
      mineTimerVal = Math.min(mineTimerVal + 1, 999);
      mineLCDSet('mine-timer-lcd', mineTimerVal);
    }, 1000);
  }

  cell.revealed = true; mineRevealed++;

  if (cell.mine) {
    cell.exploded = true;
    mineGameOver = true;
    clearInterval(mineTimerInterval); mineTimerInterval = null;
    mineSetFace('😵');
    mineRevealAllMines();
    mineRenderGrid();
    return;
  }

  if (cell.adj === 0) {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) mineReveal(r+dr, c+dc);
  }

  if (mineRevealed === mineRows * mineCols - mineTotalMines) {
    mineGameWon = true;
    clearInterval(mineTimerInterval); mineTimerInterval = null;
    mineSetFace('😎');
    // Auto-flag remaining
    for (let rr = 0; rr < mineRows; rr++) for (let cc = 0; cc < mineCols; cc++)
      if (mineBoard[rr][cc].mine) mineBoard[rr][cc].flagged = true;
    mineFlags = mineTotalMines;
    mineLCDSet('mine-count-lcd', 0);
  }
  mineRenderGrid();
}

function mineRevealAllMines() {
  for (let r = 0; r < mineRows; r++) for (let c = 0; c < mineCols; c++) {
    const cell = mineBoard[r][c];
    if (cell.mine && !cell.flagged) cell.revealed = true;
    if (!cell.mine && cell.flagged) cell.wrongFlag = true;
  }
}

function mineFlag(r, c) {
  if (mineGameOver || mineGameWon) return;
  const cell = mineBoard[r][c];
  if (cell.revealed) return;
  if (!cell.flagged && !cell.questioned) {
    cell.flagged = true; mineFlags++;
  } else if (cell.flagged) {
    cell.flagged = false; cell.questioned = true; mineFlags--;
  } else {
    cell.questioned = false;
  }
  mineLCDSet('mine-count-lcd', mineTotalMines - mineFlags);
  mineRenderGrid();
}

function mineChord(r, c) {
  const cell = mineBoard[r][c];
  if (!cell.revealed || cell.adj === 0) return;
  let adjFlags = 0;
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    const nr = r+dr, nc = c+dc;
    if (nr >= 0 && nr < mineRows && nc >= 0 && nc < mineCols && mineBoard[nr][nc].flagged) adjFlags++;
  }
  if (adjFlags === cell.adj) {
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) mineReveal(r+dr, c+dc);
  }
}

function mineRenderGrid() {
  const grid = document.getElementById('mine-grid');
  if (!grid) return;
  grid.style.gridTemplateColumns = `repeat(${mineCols}, 22px)`;
  const frag = document.createDocumentFragment();
  for (let r = 0; r < mineRows; r++) {
    for (let c = 0; c < mineCols; c++) {
      const cell = mineBoard[r][c];
      const el = document.createElement('div');
      el.className = 'mine-cell';
      if (cell.revealed) {
        el.classList.add('mine-cell-revealed');
        if (cell.mine) {
          el.classList.add(cell.exploded ? 'mine-cell-exploded' : 'mine-cell-mine');
          el.textContent = '💣';
        } else if (cell.adj > 0) {
          el.textContent = cell.adj;
          el.style.color = MINE_NUM_COLORS[cell.adj];
        }
      } else if (cell.wrongFlag) {
        el.classList.add('mine-cell-revealed', 'mine-cell-wrongflag');
        el.innerHTML = '<span style="text-decoration:line-through;">🚩</span>';
      } else if (cell.flagged) {
        el.textContent = '🚩';
      } else if (cell.questioned) {
        el.textContent = '❓';
      }

      if (!cell.revealed && !cell.wrongFlag) {
        const rr = r, cc = c;
        el.addEventListener('mousedown', e => {
          if (e.button === 0) mineSetFace('😮');
        });
        el.addEventListener('mouseup', e => {
          if (mineGameOver || mineGameWon) return;
          if (e.button === 0) { mineSetFace('🙂'); mineReveal(rr, cc); }
        });
        el.addEventListener('contextmenu', e => { e.preventDefault(); mineFlag(rr, cc); });
      } else if (cell.revealed && !cell.mine && cell.adj > 0) {
        const rr = r, cc = c;
        el.addEventListener('contextmenu', e => { e.preventDefault(); mineChord(rr, cc); });
        el.addEventListener('dblclick', () => mineChord(rr, cc));
      }
      frag.appendChild(el);
    }
  }
  grid.innerHTML = '';
  grid.appendChild(frag);
}

function mineLCDSet(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(Math.max(0, Math.min(999, val))).padStart(3, '0');
}

function mineSetFace(f) {
  const btn = document.getElementById('mine-face-btn');
  if (btn) btn.textContent = f;
}

function mineFacePress() { mineSetFace('🙂'); }

// ════════════════════════════════
//  DISK DEFRAGMENTER
// ════════════════════════════════
function buildDefragWindow(container, type) {
  const BW = 9, BH = 7, GAP = 1;
  const CW = BW + GAP, CH = BH + GAP; // cell stride: 10w × 8h
  const ROWS_MAX = 150;               // total rows for ~15 min run

  const USED = 0, SYS = 1, FRAG = 2, FREE = 3, HEAD = 4, DEFRAG = 5;

  const cvId   = `dfcv-${type}`;
  const vpId   = `dfvp-${type}`;
  const fillId = `dffill-${type}`;
  const pctId  = `dfpct-${type}`;

  container.innerHTML = `
    <div class="defrag-body">
      <div class="defrag-scroll-row">
        <div class="defrag-viewport" id="${vpId}">
          <canvas id="${cvId}" style="position:absolute;top:0;left:0;image-rendering:pixelated;image-rendering:crisp-edges;"></canvas>
        </div>
        <div class="notepad-vscroll">
          <button class="notepad-scroll-btn notepad-scroll-up"></button>
          <div class="notepad-vtrack"><div class="notepad-vthumb"></div></div>
          <button class="notepad-scroll-btn notepad-scroll-down"></button>
        </div>
      </div>
      <div class="defrag-controls">
        <div class="defrag-info">
          <div class="defrag-status-txt">Defragmenting file system...</div>
          <div class="defrag-bar-track">
            <div class="defrag-bar-fill" id="${fillId}"></div>
          </div>
          <div class="defrag-pct" id="${pctId}">0% Complete</div>
        </div>
        <div class="defrag-btns">
          <button class="dialog-btn" style="width:90px"><u>S</u>top</button>
          <button class="dialog-btn" style="width:90px"><u>P</u>ause</button>
          <button class="dialog-btn" style="width:90px">Legend</button>
          <button class="dialog-btn" style="width:90px">Hide Details</button>
        </div>
      </div>
    </div>
  `;
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  const vp     = document.getElementById(vpId);
  const cv     = document.getElementById(cvId);
  const ctx    = cv.getContext('2d');
  const fillEl = document.getElementById(fillId);
  const pctEl  = document.getElementById(pctId);
  const vtrack = container.querySelector('.notepad-vtrack');
  const vthumb = container.querySelector('.notepad-vthumb');
  const vup    = container.querySelector('.notepad-scroll-up');
  const vdown  = container.querySelector('.notepad-scroll-down');

  let COLS = 0, ROWS_INITIAL = 0;
  let grid, currentRows, headPos, scrollOffset;
  let lastTs = 0, nextInterval = 200;
  let progressPos = 0, progressTimer = null;

  function randInterval() { return 150 + Math.random() * 300; } // 150–450ms

  function initGrid(cols) {
    grid = new Uint8Array(ROWS_MAX * cols);
    for (let r = 0; r < ROWS_MAX; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c, rnd = Math.random();
        if      (rnd < 0.07) grid[i] = FREE;
        else if (rnd < 0.13) grid[i] = FRAG;
        else                 grid[i] = USED;
      }
    }
  }

  function drawBlock(i) {
    const r = (i / COLS) | 0, c = i % COLS;
    const x = c * CW, y = r * CH;
    const t = grid[i];
    if (t === FREE) {
      ctx.fillStyle = '#EEEEEE';
      ctx.fillRect(x, y, BW, BH);
      return;
    }
    if (t === FRAG) {
      // White base with red top-right quarter
      ctx.fillStyle = '#F0F0F0';
      ctx.fillRect(x, y, BW, BH);
      ctx.fillStyle = '#CC2020';
      ctx.fillRect(x + ((BW + 1) >> 1), y, BW >> 1, (BH + 1) >> 1);
      return;
    }
    if (t === HEAD) {
      ctx.fillStyle = '#FF2020';
      ctx.fillRect(x, y, BW, BH);
      return;
    }
    if (t === DEFRAG) {
      // Completed blue with black checkerboard dots (like taskbar active tiles)
      ctx.fillStyle = '#1e83e2';
      ctx.fillRect(x, y, BW, BH);
      ctx.fillStyle = '#000000';
      for (let dy = 0; dy < BH; dy++)
        for (let dx = dy & 1; dx < BW; dx += 2)
          ctx.fillRect(x + dx, y + dy, 1, 1);
      return;
    }
    // USED or SYS — bevelled block
    const [fill, hi, sh] = t === SYS
      ? ['#0000A8', '#2828C8', '#000060']
      : ['#0ce3f4', '#80f4ff', '#088898'];
    ctx.fillStyle = fill; ctx.fillRect(x + 1, y + 1, BW - 1, BH - 1);
    ctx.fillStyle = hi;   ctx.fillRect(x, y, BW - 1, 1); ctx.fillRect(x, y + 1, 1, BH - 1);
    ctx.fillStyle = sh;   ctx.fillRect(x + 1, y + BH - 1, BW - 1, 1); ctx.fillRect(x + BW - 1, y + 1, 1, BH - 1);
  }

  function drawRowRange(r0, r1) {
    for (let r = r0; r < r1; r++)
      for (let c = 0; c < COLS; c++) drawBlock(r * COLS + c);
  }

  // ── Scrollbar ──────────────────────────────
  function updateScrollbar() {
    const vpH = vp.clientHeight;
    const canH = currentRows * CH;
    const scrollable = Math.max(0, canH - vpH);
    scrollOffset = Math.max(0, Math.min(scrollOffset, scrollable));
    cv.style.top = -scrollOffset + 'px';
    vup.classList.toggle('scroll-disabled', scrollOffset <= 0);
    vdown.classList.toggle('scroll-disabled', scrollOffset >= scrollable);
    vtrack.classList.toggle('scroll-disabled', scrollable <= 0);
    if (scrollable <= 0) { vthumb.style.display = 'none'; return; }
    vthumb.style.display = '';
    const trackH = vtrack.clientHeight;
    const thumbH = Math.max(20, (vpH / canH) * trackH);
    const thumbT = (scrollOffset / scrollable) * (trackH - thumbH);
    vthumb.style.height = thumbH + 'px';
    vthumb.style.top    = thumbT + 'px';
  }

  function autoScroll() {
    const scrollable = Math.max(0, currentRows * CH - vp.clientHeight);
    if (scrollable > 0 && scrollOffset >= scrollable - CH * 3) {
      scrollOffset = scrollable;
      updateScrollbar();
    }
  }

  vup.addEventListener('click',   () => { scrollOffset -= CH * 3; updateScrollbar(); });
  vdown.addEventListener('click', () => { scrollOffset += CH * 3; updateScrollbar(); });

  let vDrag = false, vDragY = 0, vScrollStart = 0;
  vthumb.addEventListener('mousedown', e => {
    vDrag = true; vDragY = e.clientY; vScrollStart = scrollOffset; e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!vDrag) return;
    const canH = currentRows * CH, vpH = vp.clientHeight;
    const scrollable = Math.max(0, canH - vpH);
    const trackH = vtrack.clientHeight;
    const thumbH = Math.max(20, (vpH / canH) * trackH);
    scrollOffset = vScrollStart + (e.clientY - vDragY) * scrollable / (trackH - thumbH);
    updateScrollbar();
  });
  document.addEventListener('mouseup', () => { vDrag = false; });

  // ── Progress bar (whole blocks only) ───────
  function updateProgress() {
    const pct = Math.min(100, Math.floor(progressPos / (ROWS_MAX * COLS) * 100));
    const trackW = fillEl.parentElement.clientWidth - 4; // 2px padding each side
    const maxBlks = Math.floor(trackW / 10);
    fillEl.style.width = (Math.floor(pct / 100 * maxBlks) * 10) + 'px';
    pctEl.textContent = pct + '% Complete';
  }

  // ── Animation tick ──────────────────────────
  function tick(ts) {
    if (!document.getElementById(cvId)) return; // window closed
    if (ts - lastTs < nextInterval) { requestAnimationFrame(tick); return; }
    lastTs = ts;
    nextInterval = randInterval();

    // Reveal rows one-at-a-time as head progresses
    const targetRows = Math.min(ROWS_MAX, ROWS_INITIAL + Math.floor(headPos / COLS));
    if (targetRows > currentRows) {
      drawRowRange(currentRows, targetRows);
      currentRows = targetRows;
      autoScroll();
      updateScrollbar();
    }

    if (headPos >= ROWS_MAX * COLS) {
      // Full pass complete — restart
      initGrid(COLS);
      currentRows = ROWS_INITIAL;
      headPos = 0;
      scrollOffset = 0;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cv.width, cv.height);
      drawRowRange(0, currentRows);
      updateScrollbar();
      requestAnimationFrame(tick);
      return;
    }

    // Clear previous head — block becomes defragmented (dark blue with dots)
    if (headPos > 0 && grid[headPos - 1] === HEAD) {
      grid[headPos - 1] = DEFRAG;
      drawBlock(headPos - 1);
    }
    // Paint current head — skip SYS and FREE blocks
    if (grid[headPos] !== SYS && grid[headPos] !== FREE) {
      grid[headPos] = HEAD;
      drawBlock(headPos);
    }
    headPos++;

    requestAnimationFrame(tick);
  }

  // ── Init after layout renders ───────────────
  // Double rAF: first frame lets the browser lay out the window,
  // second frame runs immediately after — eliminates the white flash.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    COLS         = Math.max(10, Math.floor(vp.clientWidth / CW));
    ROWS_INITIAL = Math.max(5, Math.floor(vp.clientHeight / CH));

    cv.width  = vp.clientWidth; // exact viewport width — no black gap on right
    cv.height = ROWS_MAX * CH;  // pre-allocate full height

    initGrid(COLS);
    currentRows  = ROWS_INITIAL;
    headPos      = 0;
    progressPos  = 0;
    scrollOffset = 0;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cv.width, cv.height);
    drawRowRange(0, currentRows);
    updateScrollbar();
    updateProgress();

    // Progress bar runs on its own fixed 100ms timer, independent of animation speed
    progressTimer = setInterval(() => {
      if (!document.getElementById(cvId)) { clearInterval(progressTimer); return; }
      progressPos++;
      if (progressPos >= ROWS_MAX * COLS) progressPos = 0;
      updateProgress();
    }, 100);

    requestAnimationFrame(tick);
  }));
}

// ════════════════════════════════
const WINDOW_DEFS = {
  computer: {
    title: 'My Computer',
    width: 500, height: 360,
    icon: 'computer',
    build: buildComputerWindow,
  },
  files: {
    title: 'My Files',
    width: 520, height: 380,
    icon: 'files',
    build: buildFilesWindow,
  },
  recycle: {
    title: 'Recycle Bin',
    width: 380, height: 300,
    icon: 'recycle',
    build: buildRecycleWindow,
  },
  ie: {
    title: 'Internet Explorer',
    width: 800, height: 580,
    icon: 'ie',
    build: buildIEWindow,
  },
  welcome: {
    title: 'Welcome',
    width: 480, height: 380,
    icon: 'welcome',
    noIcon: true,
    noResize: true,
    build: buildWelcomeWindow,
  },
  shutdown: {
    title: 'Shut Down Windows',
    width: 374, height: 215,
    icon: 'shutdown',
    noIcon: true,
    noResize: true,
    build: buildShutdownWindow,
  },
  notepad: {
    title: 'Notepad - Untitled',
    width: 430, height: 320,
    icon: 'notepad',
    build: buildNotepadWindow,
  },
  bio: {
    title: 'Notepad - Nat Miletic Bio',
    width: 520, height: 420,
    icon: 'notepad',
    build: buildBioWindow,
  },
  controlpanel: {
    title: 'Control Panel',
    width: 500, height: 360,
    icon: 'controlPanel',
    build: buildControlPanelWindow,
  },
  documents: {
    title: 'Documents',
    width: 420, height: 320,
    icon: 'files',
    build: buildDocumentsWindow,
  },
  photos: {
    title: 'Photos',
    width: 420, height: 320,
    icon: 'files',
    build: buildPhotosWindow,
  },
  paint: {
    title: 'Untitled - Paint',
    width: 590, height: 500,
    icon: 'paint',
    build: buildPaintWindow,
  },
  run: {
    title: 'Run',
    width: 360, height: 185,
    icon: 'run',
    noResize: true,
    build: buildRunWindow,
    getPos: (dw, dh, w, h) => ({ x: 10, y: dh - h - 10 }),
  },
  minesweeper: {
    title: 'Minesweeper',
    width: 224, height: 330,
    icon: 'minesweeper',
    noResize: true,
    build: buildMinesweeperWindow,
  },
  briefcase: {
    title: 'My Briefcase',
    width: 420, height: 320,
    icon: 'briefcase',
    build: buildBriefcaseWindow,
  },
  defrag: {
    title: 'Defragmenting Drive C',
    width: 660, height: 510,
    icon: 'defrag',
    noResize: true,
    build: buildDefragWindow,
  },
};
