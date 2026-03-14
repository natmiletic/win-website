// ════════════════════════════════
//  BOOT VIDEO
// ════════════════════════════════
(function () {
  const screen = document.getElementById('boot-screen');
  const video  = document.getElementById('boot-video');
  if (!screen || !video) return;

  function dismissBoot() {
    screen.classList.add('fade-out');
    screen.addEventListener('transitionend', () => screen.remove(), { once: true });
  }

  video.addEventListener('ended', dismissBoot);
  video.addEventListener('error', dismissBoot);
  video.play().catch(dismissBoot);
})();

function reboot() {
  // Close all open windows and clear backdrop
  [...Object.keys(openWindows)].forEach(t => closeWindow(t));
  const backdrop = document.getElementById('shutdown-backdrop');
  if (backdrop) backdrop.remove();

  const screen = document.createElement('div');
  screen.id = 'boot-screen';
  screen.style.cssText = 'position:fixed;inset:0;background:#000;z-index:999999;display:flex;align-items:center;justify-content:center;transition:opacity 0.5s ease;cursor:default;';

  const clickMsg = document.createElement('div');
  clickMsg.style.cssText = 'display:none;position:absolute;inset:0;align-items:center;justify-content:center;flex-direction:column;gap:16px;cursor:pointer;';
  clickMsg.innerHTML = `<p style="color:#fff;font-family:'MS Sans Serif',sans-serif;font-size:16px;animation:blinkText 1.2s step-start infinite;">Click to start Windows 95</p>`;

  screen.innerHTML = `<video id="reboot-video" playsinline muted autoplay style="width:100%;height:100%;object-fit:contain;background:#000;display:block;"><source src="mmjdxbwbsb3b1.mp4" type="video/mp4"></video>`;
  screen.appendChild(clickMsg);
  document.body.appendChild(screen);

  function dismissReboot() {
    screen.style.transition = 'opacity 0.5s ease';
    screen.style.opacity = '0';
    screen.addEventListener('transitionend', () => screen.remove(), { once: true });
  }

  const vid = document.getElementById('reboot-video');
  vid.addEventListener('ended', dismissReboot);
  vid.addEventListener('error', () => {
    clickMsg.style.display = 'flex';
    clickMsg.addEventListener('click', dismissReboot, { once: true });
  });
  vid.play().catch(() => {
    clickMsg.style.display = 'flex';
    clickMsg.addEventListener('click', () => {
      vid.play().then(() => { clickMsg.style.display = 'none'; }).catch(dismissReboot);
    }, { once: true });
  });
}

// ════════════════════════════════
//  STATE
// ════════════════════════════════
let windowZIndex = 1000;
let activeWindow = null;
const openWindows = {};

// ════════════════════════════════
//  ICONS  (URL-encoded inline SVG)
// ════════════════════════════════
const ICONS = {
  files: `img/folder.png`,

  computer: `img/my-computer.png`,

  ie: `img/internet-explorer.png`,

  drive: `img/hard-drive.png`,

  floppy: `img/floppy.png`,

  cdrom: `img/cdrom.png`,

  controlPanel: `img/control-panel.png`,

  recycle: `img/recycle-bin.png`,

  notepad: `img/notepad.png`,

  welcome: `img/welcome.png`,

  about: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='2' y='4' width='28' height='24' fill='%23c0c0c0'/%3E%3Crect x='2' y='4' width='28' height='1' fill='%23fff'/%3E%3Crect x='2' y='4' width='1' height='24' fill='%23fff'/%3E%3Crect x='29' y='4' width='1' height='24' fill='%23808080'/%3E%3Crect x='2' y='27' width='28' height='1' fill='%23808080'/%3E%3Crect x='3' y='5' width='26' height='10' fill='%23000080'/%3E%3Ctext x='16' y='14' text-anchor='middle' fill='%23fff' font-size='8' font-family='Arial' font-weight='bold'%3EWin95%3C/text%3E%3Crect x='6' y='18' width='6' height='6' fill='%23ff3333'/%3E%3Crect x='13' y='18' width='6' height='6' fill='%2333cc33'/%3E%3Crect x='6' y='22' width='6' height='6' fill='%233399ff'/%3E%3Crect x='13' y='22' width='6' height='6' fill='%23ffcc00'/%3E%3C/svg%3E`,
  shutdown: `img/shutdown.ico`,
};

// ════════════════════════════════
//  WINDOW DEFINITIONS
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
    width: 560, height: 400,
    icon: 'ie',
    build: buildIEWindow,
  },
  about: {
    title: 'About Windows 95',
    width: 340, height: 230,
    icon: 'about',
    build: buildAboutWindow,
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
    width: 374, height: 240,
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
};

// ════════════════════════════════
//  OPEN / CLOSE WINDOWS
// ════════════════════════════════
function openWindow(type) {
  if (openWindows[type]) {
    restoreWindow(type);
    focusWindow(type);
    return;
  }

  const def = WINDOW_DEFS[type];
  if (!def) return;

  const desktop = document.getElementById('desktop');
  const dw = desktop.offsetWidth;
  const dh = desktop.offsetHeight;
  const count = Object.keys(openWindows).length;

  const w = Math.min(def.width, dw - 40);
  const h = Math.min(def.height, dh - 40);
  const x = Math.max(20, Math.min(dw - w - 20, (dw - w) / 2 + count * 22));
  const y = Math.max(20, Math.min(dh - h - 20, (dh - h) / 2 + count * 22));

  const win = document.createElement('div');
  win.className = 'window active';
  win.id = 'win-' + type;
  win.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;`;

  win.innerHTML = `
    <div class="window-titlebar" id="titlebar-${type}">
      ${def.noIcon ? '' : `<img class="window-title-icon" src="${ICONS[def.icon] || ''}" alt="">`}
      <span class="window-title">${def.title}</span>
      <div class="window-controls">
        <button class="win-btn" title="Minimize" onclick="minimizeWindow('${type}')">
          <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="9" width="10" height="2" fill="#000"/></svg>
        </button>
        <button class="win-btn" title="Maximize" onclick="toggleMaximize('${type}')">
          <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="10" height="10" fill="none" stroke="#000" stroke-width="1.5"/><rect x="1" y="1" width="10" height="3" fill="#000"/></svg>
        </button>
        <button class="win-btn win-btn-close" title="Close" onclick="closeWindow('${type}')">
          <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="1" x2="11" y2="11" stroke="#000" stroke-width="2.5"/><line x1="11" y1="1" x2="1" y2="11" stroke="#000" stroke-width="2.5"/></svg>
        </button>
      </div>
    </div>
    <div class="window-body" id="wbody-${type}"></div>
    ${def.noResize ? '' : `<div class="resize-handle" id="resize-${type}"></div>`}
  `;

  desktop.appendChild(win);
  openWindows[type] = { minimized: false, maximized: false, x, y, w, h };

  def.build(document.getElementById('wbody-' + type), type);
  focusWindow(type);
  makeDraggable(win, document.getElementById('titlebar-' + type), type);
  if (!def.noResize) makeResizable(win, document.getElementById('resize-' + type), type);
  addTaskbarBtn(type, def.title, def.icon);
}

// ════════════════════════════════
//  CONTENT BUILDERS
// ════════════════════════════════
function buildFilesWindow(container) {
  const files = [
    { name: 'Documents', icon: ICONS.files },
    { name: 'Photos',    icon: ICONS.files },
    { name: 'readme.txt',        icon: ICONS.notepad },
    { name: 'notes.txt',         icon: ICONS.notepad },
    { name: 'report.txt',        icon: ICONS.notepad },
    { name: 'Nat Miletic Bio', icon: ICONS.notepad },
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
    </div>
  `;
}

function buildRecycleWindow(container) {
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div style="display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:0;">
      <!-- Column headers -->
      <div style="display:flex;flex-shrink:0;background:var(--c-material);">
        <div style="flex:1;padding:2px 6px;font-size:11px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;border:2px solid;border-top-color:var(--c-border-lightest);border-left-color:var(--c-border-lightest);border-bottom-color:var(--c-border-dark);border-right-color:var(--c-border-dark);cursor:default;">Name</div>
        <div style="flex:1;padding:2px 6px;font-size:11px;font-family:'w95fa','MS Sans Serif',Tahoma,sans-serif;border:2px solid;border-top-color:var(--c-border-lightest);border-left-color:var(--c-border-lightest);border-bottom-color:var(--c-border-dark);border-right-color:var(--c-border-dark);cursor:default;">Original Location</div>
      </div>
      <!-- Empty content area -->
      <div class="window-content" style="flex:1;overflow:auto;background:#fff;"></div>
    </div>
    <div class="status-bar">
      <span class="status-item">0 object(s)</span>
      <span class="status-item">0 bytes</span>
    </div>
  `;
}

function buildIEWindow(container) {
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>V</u>iew</span>
      <span class="menu-item">F<u>a</u>vorites</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-toolbar">
      <button class="toolbar-btn" title="Back">&#x2190;</button>
      <button class="toolbar-btn" title="Forward">&#x2192;</button>
      <button class="toolbar-btn" title="Stop">&#x2716;</button>
      <button class="toolbar-btn" title="Refresh">&#x21BB;</button>
      <button class="toolbar-btn" title="Home">&#x2302;</button>
      <div class="toolbar-sep"></div>
      <button class="toolbar-btn" title="Favorites">&#x2605;</button>
    </div>
    <div class="address-bar">
      <span class="address-label">Address</span>
      <input class="address-input" type="text" value="about:blank" readonly>
    </div>
    <div class="window-content" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;background:#fff;">
      <img src="img/internet-explorer.png" style="width:64px;height:64px;image-rendering:pixelated;">
      <div style="font-family:'w95fa','MS Sans Serif',sans-serif;font-size:13px;color:#000080;font-weight:bold;">Internet Explorer 4.0</div>
      <div style="font-family:'w95fa','MS Sans Serif',sans-serif;font-size:11px;color:#808080;">Cannot find server or DNS Error</div>
    </div>
    <div class="status-bar">
      <span class="status-item">Done</span>
      <span class="status-item">Internet zone</span>
    </div>
  `;
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
}

function buildAboutWindow(container) {
  container.innerHTML = `
    <div class="window-content" style="display:flex;flex-direction:column;">
      <div style="background:#000080;padding:14px 16px;display:flex;align-items:center;gap:14px;">
        <svg width="44" height="44" viewBox="0 0 20 20">
          <rect x="0" y="0" width="9" height="9" fill="#ff3333"/>
          <rect x="11" y="0" width="9" height="9" fill="#33cc33"/>
          <rect x="0" y="11" width="9" height="9" fill="#3399ff"/>
          <rect x="11" y="11" width="9" height="9" fill="#ffcc00"/>
        </svg>
        <div>
          <div style="color:#fff;font-size:20px;font-weight:bold;font-family:'MS Sans Serif',Arial,sans-serif;letter-spacing:0.5px;">Windows 95</div>
          <div style="color:#aac;font-size:11px;margin-top:2px;font-family:'MS Sans Serif',Arial,sans-serif;">Version 4.00.950</div>
        </div>
      </div>
      <div style="padding:14px 16px;font-family:'MS Sans Serif',Arial,sans-serif;font-size:12px;background:#fff;flex:1;">
        <div style="border-bottom:1px solid #c0c0c0;padding-bottom:10px;margin-bottom:10px;">
          <p>This product is licensed to:</p>
          <p style="font-weight:bold;margin:4px 0 2px;">User</p>
          <p style="color:#444;font-size:11px;">Windows 95 Web Emulator</p>
        </div>
        <p style="font-size:11px;color:#808080;line-height:1.7;">
          Microsoft Corporation. All rights reserved.<br>
          This web emulator is for demonstration purposes only.
        </p>
      </div>
    </div>
    <div style="padding:8px;display:flex;justify-content:center;background:#c0c0c0;">
      <button class="dialog-btn" style="min-width:80px;" onclick="closeWindow('about')">OK</button>
    </div>
  `;
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
    <div style="display:flex;flex:1;gap:14px;padding:14px 16px 0;align-items:flex-start;">
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
    <div style="display:flex;justify-content:center;gap:8px;padding:4px 14px 12px;">
      <button class="dialog-btn" onclick="doShutdownAction()"><u>Y</u>es</button>
      <button class="dialog-btn" onclick="closeWindow('shutdown')"><u>N</u>o</button>
      <button class="dialog-btn" onclick="closeWindow('shutdown')"><u>H</u>elp</button>

    </div>
  `;
  container.style.cssText = 'display:flex;flex-direction:column;';
}

function buildBioWindow(container) {
  const s = 'font-family:"Courier New",Courier,monospace;font-size:15px;line-height:1.6;color:#000;';
  const a = 'color:#000080;text-decoration:underline;cursor:pointer;';
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item"><u>F</u>ile</span>
      <span class="menu-item"><u>E</u>dit</span>
      <span class="menu-item"><u>S</u>earch</span>
      <span class="menu-item"><u>H</u>elp</span>
    </div>
    <div class="window-content" style="padding:8px;overflow:auto;">
      <div style="${s}">
        <p style="margin-bottom:12px;">Nat Miletic is the founder of <a href="https://cliowebsites.com" target="_blank" style="${a}">Clio Websites</a>, a Calgary web design company. With a BCIS and an MBA under his belt, Nat's all about helping businesses thrive online with his sharp eye for detail and relentless passion for making things better.</p>
        <p style="margin-bottom:12px;">From crafting sleek WordPress websites to boosting SEO and ensuring everything works smoothly across devices, Nat's helped businesses big and small grow their online presence. Whether it's global brands like <a href="https://www.myfitnesspal.com" target="_blank" style="${a}">MyFitnessPal</a> or local favorites like Galvanic, his work has made websites not only look great but also perform better in search results.</p>
        <p style="margin-bottom:12px;">Nat's been in the web development and marketing game since the early 2000s, and he loves sharing his insights with thousands of followers on social media.</p>
        <p style="margin-bottom:12px;">Oh, and did we mention? He's also the author of Client Bytes – Dev Agency and Freelancer Sales and has created several WordPress and SEO courses available on Gumroad and Udemy. He also co-hosts a podcast called The Agency Hustle with Kyle Prinsloo.</p>
      </div>
    </div>
  `;
  container.style.cssText = 'display:flex;flex-direction:column;';
}

function buildNotepadWindow(container) {
  container.innerHTML = `
    <div class="window-menubar">
      <span class="menu-item">File</span>
      <span class="menu-item">Edit</span>
      <span class="menu-item">Search</span>
      <span class="menu-item">Help</span>
    </div>
    <div style="flex:1;margin:2px;display:flex;">
      <textarea style="
        flex:1;width:100%;resize:none;
        border:2px solid;border-color:#808080 #dfdfdf #dfdfdf #808080;
        box-shadow:inset 1px 1px 0 #404040;
        font-family:'Courier New',Courier,monospace;font-size:13px;
        padding:4px;background:#fff;outline:none;line-height:1.5;
        color:#000;
      "></textarea>
    </div>
  `;
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
}

// ════════════════════════════════
//  WINDOW MANAGEMENT
// ════════════════════════════════
function focusWindow(type) {
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));

  const win = document.getElementById('win-' + type);
  if (!win) return;
  win.classList.add('active');
  win.style.zIndex = ++windowZIndex;
  activeWindow = type;

  const tb = document.getElementById('tbtn-' + type);
  if (tb) tb.classList.add('active');
}

function minimizeWindow(type) {
  const win = document.getElementById('win-' + type);
  if (!win) return;
  win.style.display = 'none';
  openWindows[type].minimized = true;
  const tb = document.getElementById('tbtn-' + type);
  if (tb) tb.classList.remove('active');
  activeWindow = null;
}

function restoreWindow(type) {
  const win = document.getElementById('win-' + type);
  if (!win) return;
  win.style.display = 'flex';
  openWindows[type].minimized = false;
}

function toggleMaximize(type) {
  const win = document.getElementById('win-' + type);
  if (!win) return;
  const state = openWindows[type];

  if (state.maximized) {
    win.classList.remove('maximized');
    win.style.left   = state.x + 'px';
    win.style.top    = state.y + 'px';
    win.style.width  = state.w + 'px';
    win.style.height = state.h + 'px';
    state.maximized = false;
  } else {
    state.x = parseInt(win.style.left);
    state.y = parseInt(win.style.top);
    state.w = win.offsetWidth;
    state.h = win.offsetHeight;
    win.classList.add('maximized');
    state.maximized = true;
  }
  focusWindow(type);
}

function closeWindow(type) {
  const win = document.getElementById('win-' + type);
  if (win) win.remove();
  const tb = document.getElementById('tbtn-' + type);
  if (tb) tb.remove();
  delete openWindows[type];
  activeWindow = null;
  if (type === 'shutdown') {
    const backdrop = document.getElementById('shutdown-backdrop');
    if (backdrop) backdrop.remove();
  }
}

// ════════════════════════════════
//  TASKBAR
// ════════════════════════════════
function addTaskbarBtn(type, title, iconKey) {
  const bar = document.getElementById('taskbar-windows');
  const btn = document.createElement('button');
  btn.className = 'taskbar-btn active';
  btn.id = 'tbtn-' + type;
  btn.innerHTML = `<img src="${ICONS[iconKey] || ''}" alt=""><span>${title}</span>`;
  btn.onclick = () => {
    if (openWindows[type].minimized) {
      restoreWindow(type);
      focusWindow(type);
    } else if (activeWindow === type) {
      minimizeWindow(type);
    } else {
      restoreWindow(type);
      focusWindow(type);
    }
  };
  bar.appendChild(btn);
}

// ════════════════════════════════
//  DRAG
// ════════════════════════════════
function makeDraggable(win, handle, type) {
  let startX, startY, startL, startT, dragging = false;

  const onDown = (cx, cy) => {
    if (openWindows[type].maximized) return;
    dragging = true;
    startX = cx; startY = cy;
    startL = parseInt(win.style.left) || 0;
    startT = parseInt(win.style.top) || 0;
    focusWindow(type);
  };

  const onMove = (cx, cy) => {
    if (!dragging) return;
    const desktop = document.getElementById('desktop');
    const nx = Math.max(0, Math.min(desktop.offsetWidth  - win.offsetWidth,  startL + cx - startX));
    const ny = Math.max(0, Math.min(desktop.offsetHeight - win.offsetHeight, startT + cy - startY));
    win.style.left = nx + 'px';
    win.style.top  = ny + 'px';
  };

  handle.addEventListener('mousedown', e => {
    if (e.target.classList.contains('win-btn')) return;
    onDown(e.clientX, e.clientY);
    e.preventDefault();
  });
  handle.addEventListener('touchstart', e => {
    if (e.target.classList.contains('win-btn')) return;
    onDown(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  document.addEventListener('mousemove',  e => onMove(e.clientX, e.clientY));
  document.addEventListener('touchmove',  e => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  document.addEventListener('mouseup',    () => { dragging = false; });
  document.addEventListener('touchend',   () => { dragging = false; });

  win.addEventListener('mousedown', () => focusWindow(type));
}

// ════════════════════════════════
//  RESIZE
// ════════════════════════════════
function makeResizable(win, handle, type) {
  let startX, startY, startW, startH, resizing = false;

  handle.addEventListener('mousedown', e => {
    if (openWindows[type].maximized) return;
    resizing = true;
    startX = e.clientX; startY = e.clientY;
    startW = win.offsetWidth; startH = win.offsetHeight;
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener('mousemove', e => {
    if (!resizing) return;
    win.style.width  = Math.max(220, startW + e.clientX - startX) + 'px';
    win.style.height = Math.max(160, startH + e.clientY - startY) + 'px';
  });
  document.addEventListener('mouseup', () => { resizing = false; });
}

// ════════════════════════════════
//  START MENU
// ════════════════════════════════
function toggleStartMenu(e) {
  e.stopPropagation();
  document.getElementById('start-menu').classList.toggle('visible');
  document.getElementById('start-btn').classList.toggle('pressed');
}
function closeStartMenu() {
  document.getElementById('start-menu').classList.remove('visible');
  document.getElementById('start-btn').classList.remove('pressed');
}

// ════════════════════════════════
//  CONTEXT MENU
// ════════════════════════════════
function showContextMenu(e) {
  e.preventDefault();
  const menu = document.getElementById('context-menu');
  const x = Math.min(e.clientX, window.innerWidth  - 170);
  const y = Math.min(e.clientY, window.innerHeight - 120);
  menu.style.left = x + 'px';
  menu.style.top  = y + 'px';
  menu.classList.add('visible');
}
function hideContextMenu() {
  document.getElementById('context-menu').classList.remove('visible');
}

// ════════════════════════════════
//  DESKTOP / ICON INTERACTIONS
// ════════════════════════════════
function desktopClick(e) {
  closeStartMenu();
  hideContextMenu();
  if (e.target === document.getElementById('desktop')) {
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  }
}

function selectIcon(e, id) {
  e.stopPropagation();
  document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  document.getElementById(id).classList.add('selected');
}

function selectFile(el) {
  el.closest('.window-content').querySelectorAll('.file-item').forEach(f => f.classList.remove('selected'));
  el.classList.add('selected');
}

function openFileItem(name) {
  if (name === 'Nat Miletic Bio') { openWindow('bio'); return; }
  if (name.endsWith('.txt')) openWindow('notepad');
}

// ════════════════════════════════
//  SHUTDOWN / DIALOG
// ════════════════════════════════
function showShutdown() {
  let backdrop = document.getElementById('shutdown-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'shutdown-backdrop';
    backdrop.style.cssText = 'position:fixed;inset:0 0 40px 0;background:rgba(0,0,0,0.25);z-index:999;pointer-events:none;';
    document.body.appendChild(backdrop);
  }
  openWindow('shutdown');
}
function hideDialog() {
  closeWindow('shutdown');
  const backdrop = document.getElementById('shutdown-backdrop');
  if (backdrop) backdrop.remove();
}
function doShutdownAction() {
  const opt = (document.querySelector('input[name="shutdown-opt"]:checked') || {}).value || 'shutdown';
  closeWindow('shutdown');
  const backdrop = document.getElementById('shutdown-backdrop');
  if (backdrop) backdrop.remove();
  if (opt === 'restart') {
    reboot();
  } else if (opt === 'logoff') {
    document.body.innerHTML = `
      <div style="background:#008080;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:24px;">
        <p style="color:#fff;font-family:'MS Sans Serif',Arial,sans-serif;font-size:16px;text-align:center;">
          Please wait while Windows logs you off...
        </p>
        <button onclick="location.reload()" style="padding:6px 24px;font-size:12px;cursor:pointer;background:#c0c0c0;border:2px solid;border-color:#fff #808080 #808080 #fff;box-shadow:0 0 0 1px #000;font-family:'MS Sans Serif',Arial,sans-serif;">
          Log on again
        </button>
      </div>`;
  } else if (opt === 'msdos') {
    document.body.innerHTML = `
      <style>
        #dos-screen { background:#000; width:100vw; height:100vh; padding:12px 16px; font-family:'Courier New',Courier,monospace; font-size:16px; color:#aaaaaa; overflow:hidden; display:flex; flex-direction:column; cursor:text; box-sizing:border-box; }
        #dos-output { white-space:pre-wrap; word-break:break-all; }
        #dos-input-line { display:flex; align-items:center; }
        #dos-prompt { white-space:nowrap; }
        #dos-input { background:transparent; border:none; outline:none; color:#aaaaaa; font-family:'Courier New',Courier,monospace; font-size:16px; flex:1; caret-color:#aaaaaa; padding:0; margin:0; }
        @keyframes dosBlink { 0%,100%{opacity:1} 50%{opacity:0} }
      </style>
      <div id="dos-screen" onclick="document.getElementById('dos-input').focus()">
        <div id="dos-output">Microsoft(R) MS-DOS(R) Version 7.0
           (C)Copyright Microsoft Corp 1981-1995.

</div>
        <div id="dos-input-line">
          <span id="dos-prompt">C:\\&gt;</span>
          <input id="dos-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        </div>
      </div>`;

    const input = document.getElementById('dos-input');
    const output = document.getElementById('dos-output');
    input.focus();

    input.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter') return;
      const cmd = input.value.trim();
      input.value = '';
      const line = 'C:\\>' + cmd + '\n';

      const responses = {
        '': '',
        'cls': '__CLEAR__',
        'ver': 'MS-DOS Version 7.0\n',
        'dir': ' Volume in drive C has no label\n Volume Serial Number is 1A2B-3C4D\n\n Directory of C:\\\n\nWINDOWS      <DIR>        03-14-96  12:00p\nCOMMAND  COM       54,619  03-14-96  12:00p\nCONFIG   SYS          256  03-14-96  12:00p\nAUTOEXEC BAT          128  03-14-96  12:00p\n         2 file(s)         54,875 bytes\n         1 dir(s)     524,288,000 bytes free\n',
        'help': 'For more information on a specific command, type HELP command-name\nCLS       COMMAND   DIR       ECHO      EXIT\nMEM       TIME      VER       VOL\n',
        'mem': '655,360 bytes total conventional memory\n655,360 bytes available to MS-DOS\n619,264 largest executable program size\n\n7,340,032 bytes total contiguous extended memory\n        0 bytes available contiguous extended memory\n6,553,600 bytes available XMS memory\n  MS-DOS resident in High Memory Area\n',
        'time': 'Current time is ' + new Date().toLocaleTimeString() + '\nEnter new time: ',
        'date': 'Current date is ' + new Date().toLocaleDateString('en-US',{weekday:'short',month:'2-digit',day:'2-digit',year:'numeric'}) + '\nEnter new date (mm-dd-yy): ',
        'vol':  'Volume in drive C has no label\nVolume Serial Number is 1A2B-3C4D\n',
        'exit': '__EXIT__',
        'win':  '__EXIT__',
      };

      const key = cmd.toLowerCase().split(' ')[0];
      const response = responses.hasOwnProperty(key) ? responses[key] : (cmd ? 'Bad command or file name\n' : '');

      if (response === '__CLEAR__') {
        output.textContent = '';
      } else if (response === '__EXIT__') {
        output.textContent += line;
        output.textContent += 'Restarting Windows 95...\n';
        setTimeout(() => location.reload(), 1200);
      } else {
        output.textContent += line + response + '\n';
        output.scrollTop = output.scrollHeight;
      }
    });

  } else {
    document.body.innerHTML = `
      <div style="background:#000;width:100vw;height:100vh;overflow:hidden;">
        <img src="img/shutdown-screen.jpg" style="width:100%;height:100%;object-fit:cover;">
      </div>`;
  }
}

// ════════════════════════════════
//  CLOCK
// ════════════════════════════════
function updateClock() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.getElementById('clock').textContent = h + ':' + String(m).padStart(2, '0') + ' ' + ampm;
}
updateClock();
setInterval(updateClock, 10000);

// ════════════════════════════════
//  GLOBAL CLICK HANDLERS
// ════════════════════════════════
document.addEventListener('click', e => {
  if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) closeStartMenu();
  if (!e.target.closest('#context-menu')) hideContextMenu();
});

// Auto-open Welcome on load
window.addEventListener('load', () => openWindow('welcome'));
