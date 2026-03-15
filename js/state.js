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

  notepad: `img/notepad2.png`,

  textFile: `img/notepad.png`,

  run: `img/run.ico`,

  welcome: `img/welcome.png`,

  shutdown: `img/shutdown.ico`,

  paint: `img/paint.png`,

  imageFile: `img/image-file.png`,

  minesweeper: `img/minesweeper.png`,

  briefcase: `img/briefcase.png`,
};

