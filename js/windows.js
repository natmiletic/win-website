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
  const defaultX = Math.max(20, Math.min(dw - w - 20, (dw - w) / 2 + count * 22));
  const defaultY = Math.max(20, Math.min(dh - h - 20, (dh - h) / 2 + count * 22));
  const pos = def.getPos ? def.getPos(dw, dh, w, h) : { x: defaultX, y: defaultY };
  const x = pos.x;
  const y = pos.y;

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
