// ===================== 版本号 =====================
document.getElementById('version-badge').textContent = 'v' + __APP_VERSION__

// ===================== 资源导入 =====================
// 图片
import imgGameBg from '../assets/images/gameBg.png';
import imgStartCover from '../assets/images/startCover.png';
import imgPaddle from '../assets/images/paddle.png';
import imgPaddleGoodFlash from '../assets/images/paddleGoodFlash.png';
import imgPaddleBombFlash from '../assets/images/paddleBombFlash.png';
import imgPaddleIceFlash from '../assets/images/paddleIceFlash.png';
import imgPaddleXiaolongFlash from '../assets/images/paddleXiaolongFlash.png';
import imgPaddleGhostFlash from '../assets/images/paddleGhostFlash.png';
import imgBomb from '../assets/images/bomb.png';
import imgIce from '../assets/images/ice.png';
import imgXiaolong from '../assets/images/xiaolong.png';
import imgGhost from '../assets/images/ghost.png';
import imgEndZero from '../assets/images/endZero.png';
import imgEnd142 from '../assets/images/end142.png';
import imgEnd234 from '../assets/images/end234.png';
import imgEnd325 from '../assets/images/end325.png';
import imgEndQuqu from '../assets/images/endQuqu.png';
import imgEndFreeze from '../assets/images/endFreeze.png';
import imgEndSacred from '../assets/images/endSacred.png';
import imgEndDragonBall from '../assets/images/endDragonBall.png';
import imgEnd5835 from '../assets/images/end5835.png';
import imgEndHigh from '../assets/images/endHigh.png';
import imgEndFull from '../assets/images/endFull.png';
import imgEndLow from '../assets/images/endLow.png';
import imgXiaoLongBao from '../assets/images/xiaolongbao.png';
import imgXigua from '../assets/images/xigua.png';
import imgZhaxia from '../assets/images/zhaxia.png';
import imgLongmibao from '../assets/images/longmibao.png';
import imgZhaxiaSkill from '../assets/images/我是炸虾.png';
import imgFreezeSkill from '../assets/images/全部冻上.png';

// 音频img
import audioBgm from '../assets/audio/bgm.mp3';
import audioEat from '../assets/audio/eat.mp3';
import audioGhost from '../assets/audio/ghost.mp3';
import audioBombBad from '../assets/audio/bombBad.mp3';
import audioXiaolongSong from '../assets/audio/xiaolongSong.mp3';

// ===================== 素材配置 =====================
const IMG = {
  gameBg: imgGameBg,
  startCover: imgStartCover,
  paddle: imgPaddle,
  paddleGoodFlash: imgPaddleGoodFlash,
  paddleBombFlash: imgPaddleBombFlash,
  paddleIceFlash: imgPaddleIceFlash,
  paddleXiaolongFlash: imgPaddleXiaolongFlash,
  paddleGhostFlash: imgPaddleGhostFlash,
  bomb: imgBomb,
  ice: imgIce,
  xiaolong: imgXiaolong,
  ghost: imgGhost,
  endZero: imgEndZero,
  end142: imgEnd142,
  end234: imgEnd234,
  end325: imgEnd325,
  endQuqu: imgEndQuqu,
  endFreeze: imgEndFreeze,
  endSacred: imgEndSacred,
  endDragonBall: imgEndDragonBall,
  end5835: imgEnd5835,
  endHigh: imgEndHigh,
  endFull: imgEndFull,
  endLow: imgEndLow,
  // 加分食物列表（图片复用已提取的资源，实际游戏中对应小笼包/瓜咪/虾咪/龙秘宝）
  goodsList: [
    { img: imgXiaoLongBao, point: 1 },
    { img: imgXigua, point: 2 },
    { img: imgZhaxia, point: 3 },
    { img: imgLongmibao, point: 5 }
  ],
  zhaxiaSkill: imgZhaxiaSkill,
  freezeSkill: imgFreezeSkill,
};

const AUDIO_SRC = {
  bgm: audioBgm,
  eat: audioEat,
  ghost: audioGhost,
  bombBad: audioBombBad,
  xiaolongSong: audioXiaolongSong,
};

// ===================== 存档 =====================
const SAVE_KEY = 'lipaoStats_v1';
const DEFAULT_SAVE = {
  version: 1,
  endings: {
    end5835: 0,
    endFull: 0,
    endFreeze: 0,
    endSacred: 0,
    endDragonBall: 0,
    endQuqu: 0,
    end325: 0,
    endZero: 0,
    end142: 0,
    end234: 0,
    endHigh: 0,
    endLow: 0,
  },
  catches: { bomb: 0, ice: 0, xiaolong: 0, ghost: 0, food: 0 },
  skills: { active: null, passive: null },
};

const SKILL_CATALOG = {
  bigbelly: {
    id: 'bigbelly',
    slot: 'active',
    name: '大胃瓜咪',
    defaultUnlocked: true,
    icon: () => IMG.endHigh,
    desc: '立刻吃掉场上所有食物',
  },
  skill142: {
    id: 'skill142',
    slot: 'active',
    name: '142',
    unlockEnding: 'end142',
    icon: () => IMG.end142,
    desc: '当前页面冰块全部变成小笼包',
  },
  zhaxiaPass: {
    id: 'zhaxiaPass',
    slot: 'passive',
    name: '炸虾瓜咪',
    defaultUnlocked: true,
    icon: () => IMG.zhaxiaSkill,
    desc: '场上所有食物变成炸虾（拾取掉落物触发）',
  },
  freeze: {
    id: 'freeze',
    slot: 'passive',
    name: '结冰',
    unlockEnding: 'endFreeze',
    icon: () => IMG.freezeSkill,
    desc: '物品移速减半（拾取掉落物触发）',
  },
};

const ENDING_LIST = [
  { id: 'end5835', name: '5835分专属' },
  { id: 'endFull', name: '999分以上' },
  { id: 'endFreeze', name: '冷冻结局' },
  { id: 'endSacred', name: '神圣结局' },
  { id: 'endDragonBall', name: '七龙珠' },
  { id: 'endQuqu', name: '区区结局' },
  { id: 'end325', name: '325分' },
  { id: 'endZero', name: '零分' },
  { id: 'end142', name: '142分' },
  { id: 'end234', name: '234分' },
  { id: 'endHigh', name: '高分结局' },
  { id: 'endLow', name: '普通结局' },
];

function loadSave() {
  const data = JSON.parse(JSON.stringify(DEFAULT_SAVE));
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return data;
    const saved = JSON.parse(raw);
    if (saved.version !== 1) return data;
    Object.keys(data.endings).forEach((k) => {
      if (typeof saved.endings?.[k] === 'number')
        data.endings[k] = saved.endings[k];
    });
    Object.keys(data.catches).forEach((k) => {
      if (typeof saved.catches?.[k] === 'number')
        data.catches[k] = saved.catches[k];
    });
    if (saved.skills) {
      if (saved.skills.active === null || typeof saved.skills.active === 'string')
        data.skills.active = saved.skills.active;
      if (saved.skills.passive === null || typeof saved.skills.passive === 'string')
        data.skills.passive = saved.skills.passive;
    }
  } catch (e) {}
  return data;
}
function isSkillUnlocked(skillId, data) {
  const def = SKILL_CATALOG[skillId];
  if (!def) return false;
  if (def.defaultUnlocked) return true;
  const save = data || loadSave();
  return (save.endings[def.unlockEnding] || 0) > 0;
}
function getValidatedSkills(data) {
  const save = data || loadSave();
  let active = save.skills?.active || null;
  let passive = save.skills?.passive || null;
  if (active && !isSkillUnlocked(active, save)) active = null;
  if (passive && !isSkillUnlocked(passive, save)) passive = null;
  return { active, passive };
}
function setEquippedSkill(slot, skillId) {
  const data = loadSave();
  if (!data.skills) data.skills = { active: null, passive: null };
  data.skills[slot] = skillId;
  saveSave(data);
  renderSkillSlots(data);
}
function renderSkillSlotUI(slotEl, iconEl, skillId) {
  if (skillId && SKILL_CATALOG[skillId]) {
    const def = SKILL_CATALOG[skillId];
    slotEl.classList.remove('empty');
    iconEl.src = def.icon();
    iconEl.alt = def.name;
    iconEl.classList.remove('hide');
  } else {
    slotEl.classList.add('empty');
    iconEl.removeAttribute('src');
    iconEl.alt = '';
    iconEl.classList.add('hide');
  }
}
function renderSkillSlots(data) {
  const skills = getValidatedSkills(data);
  renderSkillSlotUI(activeSkillSlot, activeSkillIcon, skills.active);
  renderSkillSlotUI(passiveSkillSlot, passiveSkillIcon, skills.passive);
}
function openSkillPicker(slot) {
  skillPickerSlot = slot;
  skillsPopTitle.textContent = slot === 'active' ? '选择主动技能' : '选择被动技能';
  renderSkillPicker();
  startPop.classList.add('hide');
  skillsPop.classList.remove('hide');
}
function closeSkillPicker() {
  skillsPop.classList.add('hide');
  startPop.classList.remove('hide');
  skillPickerSlot = null;
}
function renderSkillPicker() {
  const data = loadSave();
  const current = getValidatedSkills(data)[skillPickerSlot];
  skillsList.innerHTML = '';
  const noneBtn = document.createElement('button');
  noneBtn.type = 'button';
  noneBtn.className = 'skill-pick' + (current === null ? ' selected' : '');
  noneBtn.innerHTML = '<p class="skill-pick-name">无</p>';
  noneBtn.onclick = () => {
    setEquippedSkill(skillPickerSlot, null);
    closeSkillPicker();
  };
  skillsList.appendChild(noneBtn);
  Object.values(SKILL_CATALOG)
    .filter((s) => s.slot === skillPickerSlot)
    .forEach((def) => {
      const unlocked = isSkillUnlocked(def.id, data);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'skill-pick' +
        (current === def.id ? ' selected' : '') +
        (unlocked ? '' : ' locked');
      btn.innerHTML =
        `<img src="${def.icon()}" alt="${def.name}">` +
        `<p class="skill-pick-name">${def.name}</p>`;
      if (unlocked) {
        btn.onclick = () => {
          setEquippedSkill(skillPickerSlot, def.id);
          closeSkillPicker();
        };
      } else {
        btn.title = '需达成对应结局解锁';
      }
      skillsList.appendChild(btn);
    });
}
function getPassiveSpeedMult() {
  return isPassiveBuffActive() && equippedPassive === 'freeze' ? 0.5 : 1;
}
function isPassiveBuffActive() {
  return !!equippedPassive && Date.now() < passiveBuffUntil;
}
function activatePassiveBuff() {
  passiveBuffUntil = Date.now() + PASSIVE_BUFF_MS;
  updatePassiveBuffUI();
}
function updatePassiveBuffUI() {
  const wrap = document.getElementById('passiveBuffWrap');
  const timeEl = document.getElementById('passiveBuffTime');
  if (!isPlay || !isPassiveBuffActive()) {
    wrap.classList.add('hide');
    return;
  }
  const left = Math.ceil((passiveBuffUntil - Date.now()) / 1000);
  timeEl.textContent = left;
  wrap.classList.remove('hide');
}
function getPassivePickupAlphaKey(passiveId) {
  return 'passive_' + passiveId;
}
function spawnPassivePickupItem() {
  const def = SKILL_CATALOG[equippedPassive];
  if (!def) return false;
  const div = document.createElement('div');
  div.className = 'item';
  div.dataset.type = 'passive_pickup';
  div.dataset.passiveId = equippedPassive;
  div.dataset.alphaKey = getPassivePickupAlphaKey(equippedPassive);
  div.style.backgroundImage = `url(${def.icon()})`;
  div.style.width = Math.round(itemW) + 'px';
  div.style.height = Math.round(itemH) + 'px';
  const minGap = itemW + 10 * scale;
  let randomLeft = Math.random() * (window.innerWidth - itemW);
  let attempts = 0;
  while (
    attempts < 15 &&
    dropList.some((ex) => Math.abs(ex.x - randomLeft) < minGap)
  ) {
    randomLeft = Math.random() * (window.innerWidth - itemW);
    attempts++;
  }
  div.style.left = randomLeft + 'px';
  div.style.top = `-${itemH}px`;
  gameWrap.appendChild(div);
  const currentDropSpeed = dropSpeed;
  dropList.push({
    dom: div,
    x: randomLeft,
    y: -itemH,
    w: itemW,
    h: itemH,
    speed: currentDropSpeed * (0.85 + Math.random() * 0.3),
  });
  return true;
}
function getZhaxiaGood() {
  return IMG.goodsList[2];
}
function applyZhaxiaToGoodItem(item) {
  const zhaxia = getZhaxiaGood();
  item.dom.dataset.type = 'good';
  item.dom.dataset.point = String(zhaxia.point);
  item.dom.dataset.alphaKey = zhaxia.alphaKey;
  item.dom.style.backgroundImage = `url(${zhaxia.img})`;
}
function onCatchGood(getPoint, silent) {
  if (!silent) playSound('eat');
  combo++;
  multiplier = Math.round((1 + combo * 0.1) * 10) / 10;
  score += Math.round(getPoint * multiplier);
  scoreBox.innerText = score;
  updateComboDisplay();
  updatePaddleSize();
  dropSpeed = Math.min(3 + Math.floor(score / 60), 8) * speedScale;
  clearInterval(createTimer);
  const interval = Math.max(850 - score * 4, 400);
  createTimer = setInterval(createItem, interval);
}
function getPaddleVacuumTarget() {
  const bottom = window.innerHeight - Math.round(30 * scale);
  return { x: padX + padW / 2, y: bottom - padH / 2 };
}
function transformIceToXiaolongbao() {
  const bao = IMG.goodsList[0];
  dropList.forEach((item) => {
    if (item.dom.dataset.type !== 'ice') return;
    item.dom.dataset.type = 'good';
    item.dom.dataset.point = String(bao.point);
    item.dom.dataset.alphaKey = bao.alphaKey;
    item.dom.style.backgroundImage = `url(${bao.img})`;
    if (isPassiveBuffActive() && equippedPassive === 'zhaxiaPass')
      applyZhaxiaToGoodItem(item);
  });
}
function vacuumAllFood() {
  const foods = dropList.filter(
    (item) => item.dom.dataset.type === 'good' && !item.sucking,
  );
  if (foods.length === 0) return false;
  flashPaddle('good');
  playSound('eat');
  const target = getPaddleVacuumTarget();
  foods.forEach((item, idx) => {
    item.sucking = true;
    item.suckStartX = item.x;
    item.suckStartY = item.y;
    item.suckT = 0;
    item.suckDuration = 280 + idx * 45 + Math.random() * 80;
    item.suckTargetX = target.x - item.w / 2;
    item.suckTargetY = target.y - item.h / 2;
    item.dom.classList.add('sucking');
  });
  return true;
}
function collectVacuumedFood(index) {
  const item = dropList[index];
  statFood++;
  onCatchGood(Number(item.dom.dataset.point), true);
  item.dom.classList.remove('sucking');
  item.dom.style.transform = '';
  removeItem(index);
}
function updateInGameSkillBtn() {
  if (!equippedActive || !isPlay) {
    activeSkillBtn.style.display = 'none';
    return;
  }
  const def = SKILL_CATALOG[equippedActive];
  activeSkillBtn.style.display = 'block';
  activeSkillBtn.style.backgroundImage = `url(${def.icon()})`;
  activeSkillBtn.classList.toggle('used', activeSkillUsed);
}
function useActiveSkill() {
  if (!isPlay || isPaused || !equippedActive || activeSkillUsed) return;
  let used = false;
  if (equippedActive === 'skill142') {
    transformIceToXiaolongbao();
    used = true;
  } else if (equippedActive === 'bigbelly') {
    used = vacuumAllFood();
  }
  if (used) {
    activeSkillUsed = true;
    updateInGameSkillBtn();
  }
}
function saveSave(data) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {}
}
function renderSaveStats(data) {
  const el = (id) => document.getElementById(id);
  const endingsSeen = Object.values(data.endings).filter((n) => n > 0).length;
  el('saveEndingsTotal').textContent = endingsSeen;
  el('saveBomb').textContent = data.catches.bomb;
  el('saveIce').textContent = data.catches.ice;
  el('saveXiaolong').textContent = data.catches.xiaolong;
  el('saveGhost').textContent = data.catches.ghost;
  el('saveFood').textContent = data.catches.food;
}
function recordGameResult(endingId, runStats) {
  const data = loadSave();
  if (data.endings[endingId] != null) data.endings[endingId]++;
  data.catches.bomb += runStats.bomb;
  data.catches.ice += runStats.ice;
  data.catches.xiaolong += runStats.xiaolong;
  data.catches.ghost += runStats.ghost;
  data.catches.food += runStats.food;
  saveSave(data);
  renderSaveStats(data);
  renderSkillSlots(data);
}

// ===================== DOM 缓存 =====================
const gameWrap = document.getElementById('game');
const paddle = document.getElementById('paddle');
const scoreBox = document.getElementById('score');
const lifeBox = document.getElementById('life');
const startPop = document.getElementById('startPop');
const overPop = document.getElementById('overPop');
const endingsPop = document.getElementById('endingsPop');
const skillsPop = document.getElementById('skillsPop');
const finalScore = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const homeBtn = document.getElementById('homeBtn');
const endingsBtn = document.getElementById('endingsBtn');
const endingsBackBtn = document.getElementById('endingsBackBtn');
const skillsPopTitle = document.getElementById('skillsPopTitle');
const skillsList = document.getElementById('skillsList');
const skillsBackBtn = document.getElementById('skillsBackBtn');
const activeSkillSlot = document.getElementById('activeSkillSlot');
const passiveSkillSlot = document.getElementById('passiveSkillSlot');
const activeSkillIcon = document.getElementById('activeSkillIcon');
const passiveSkillIcon = document.getElementById('passiveSkillIcon');
const activeSkillBtn = document.getElementById('activeSkillBtn');
const startCoverImg = document.getElementById('startCoverImg');
const resultImg = document.getElementById('resultImg');
const loadingMask = document.getElementById('loadingMask');
const cntBomb = document.getElementById('cntBomb');
const cntIce = document.getElementById('cntIce');
const cntXiaolong = document.getElementById('cntXiaolong');
const cntGhost = document.getElementById('cntGhost');
const cntFood = document.getElementById('cntFood');
const pauseBtn = document.getElementById('pauseBtn');
const pauseMask = document.getElementById('pauseMask');
const resumeBtn = document.getElementById('resumeBtn');

// ===================== 音频系统 =====================
let audioCtx = null;
const audioBuf = {};
let bgmSource = null;
let bgmEl = null;
let soundEnabled = true;
let useAudioFallback = false;

async function decodeAllAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  await audioCtx.resume();
  const entries = [
    ['eat', AUDIO_SRC.eat],
    ['ghost', AUDIO_SRC.ghost],
    ['bombBad', AUDIO_SRC.bombBad],
    ['xiaolongSong', AUDIO_SRC.xiaolongSong],
    ['bgm', AUDIO_SRC.bgm],
  ];
  let failed = false;
  for (const [key, url] of entries) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const ab = await resp.arrayBuffer();
      audioBuf[key] = await audioCtx.decodeAudioData(ab);
    } catch (e) {
      failed = true;
    }
  }
  if (failed) useAudioFallback = true;
}

function playSound(type) {
  if (!soundEnabled) return;
  if (useAudioFallback) {
    try {
      if (type === 'bgm') {
        bgmEl = new Audio(AUDIO_SRC.bgm);
        bgmEl.loop = true;
        bgmEl.volume = 0.4;
        bgmEl.play().catch(() => {
          soundEnabled = false;
        });
      } else {
        const a = new Audio(AUDIO_SRC[type]);
        a.volume = 0.8;
        a.play().catch(() => {});
      }
    } catch (e) {
      soundEnabled = false;
    }
    return;
  }
  if (!audioBuf[type]) return;
  try {
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuf[type];
    const gain = audioCtx.createGain();
    gain.gain.value = type === 'bgm' ? 0.4 : 0.8;
    source.connect(gain);
    gain.connect(audioCtx.destination);
    source.start(0);
    if (type === 'bgm') {
      source.loop = true;
      bgmSource = source;
    }
  } catch (e) {
    soundEnabled = false;
  }
}

function stopBgm() {
  if (bgmSource) {
    try {
      bgmSource.stop();
    } catch (e) {}
    bgmSource = null;
  }
  if (bgmEl) {
    try {
      bgmEl.pause();
      bgmEl.currentTime = 0;
    } catch (e) {}
    bgmEl = null;
  }
}

// ===================== 像素级碰撞 =====================
const alphaCache = {};

function extractAlpha(key, img, mode = 'stretch') {
  try {
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
    const a = new Uint8Array(img.naturalWidth * img.naturalHeight);
    for (let i = 0; i < a.length; i++) a[i] = d[i * 4 + 3];
    alphaCache[key] = {
      alpha: a,
      w: img.naturalWidth,
      h: img.naturalHeight,
      mode,
    };
  } catch (e) {
    alphaCache[key] = false;
  }
}

IMG.goodsList.forEach((g, i) => {
  g.alphaKey = 'good_' + i;
});

async function preloadAllAssets() {
  const loadingFill = document.getElementById('loadingFill');
  const loadingPct = document.getElementById('loadingPct');
  function setProgress(done, total) {
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    loadingFill.style.width = pct + '%';
    loadingPct.textContent = pct + '%';
  }

  const alphaSrcMap = [
    { key: 'paddle', src: IMG.paddle, mode: 'contain' },
    { key: 'bomb', src: IMG.bomb },
    { key: 'ice', src: IMG.ice },
    { key: 'xiaolong', src: IMG.xiaolong },
    { key: 'ghost', src: IMG.ghost },
    { key: 'passive_freeze', src: IMG.freezeSkill },
    { key: 'passive_zhaxiaPass', src: IMG.zhaxiaSkill },
    ...IMG.goodsList.map((g) => ({ key: g.alphaKey, src: g.img })),
  ];
  const alphaMap = {};
  alphaSrcMap.forEach(({ key, src, mode }) => {
    if (!alphaMap[src]) alphaMap[src] = [];
    alphaMap[src].push({ key, mode: mode || 'stretch' });
  });

  const allImgSrc = [
    ...new Set([
      IMG.gameBg,
      IMG.startCover,
      IMG.paddle,
      IMG.paddleGoodFlash,
      IMG.paddleBombFlash,
      IMG.paddleIceFlash,
      IMG.paddleXiaolongFlash,
      IMG.paddleGhostFlash,
      IMG.endZero,
      IMG.end142,
      IMG.end234,
      IMG.end325,
      IMG.endQuqu,
      IMG.endFreeze,
      IMG.endSacred,
      IMG.endDragonBall,
      IMG.end5835,
      IMG.endHigh,
      IMG.endFull,
      IMG.endLow,
      IMG.bomb,
      IMG.ice,
      IMG.xiaolong,
      IMG.ghost,
      IMG.zhaxiaSkill,
      IMG.freezeSkill,
      ...IMG.goodsList.map((g) => g.img),
    ]),
  ];

  const total = allImgSrc.reduce(
    (s, src) => s + 1 + (alphaMap[src] ? 1 : 0),
    0,
  );
  let done = 0;
  function tick() {
    done++;
    setProgress(done, total);
  }

  await Promise.all(
    allImgSrc.map(
      (imgSrc) =>
        new Promise((res) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            tick();
            if (alphaMap[imgSrc]) {
              alphaMap[imgSrc].forEach(({ key, mode }) =>
                extractAlpha(key, img, mode),
              );
              tick();
            }
            res();
          };
          img.onerror = () => {
            tick();
            if (alphaMap[imgSrc]) {
              alphaMap[imgSrc].forEach(({ key }) => {
                alphaCache[key] = false;
              });
              tick();
            }
            res();
          };
          img.src = imgSrc;
        }),
    ),
  );

  setProgress(total, total);
  loadingMask.classList.add('hide');
  startCoverImg.src = IMG.startCover;
  paddle.style.backgroundImage = `url(${IMG.paddle})`;
  gameWrap.style.backgroundImage = `url(${IMG.gameBg})`;
  startPop.classList.remove('hide');
}

function getAlphaAt(key, elW, elH, px, py) {
  const d = alphaCache[key];
  if (!d) return 0;
  let ix, iy;
  if (d.mode === 'stretch') {
    ix = (px / elW) * d.w;
    iy = (py / elH) * d.h;
  } else {
    const s = Math.min(elW / d.w, elH / d.h);
    const ox = (elW - d.w * s) / 2;
    const oy = (elH - d.h * s) / 2;
    ix = (px - ox) / s;
    iy = (py - oy) / s;
  }
  if (ix < 0 || ix >= d.w || iy < 0 || iy >= d.h) return 0;
  return d.alpha[Math.floor(iy) * d.w + Math.floor(ix)];
}

function pixelCheck(k1, x1, y1, w1, h1, k2, x2, y2, w2, h2) {
  const cache1 = alphaCache[k1];
  const cache2 = alphaCache[k2];
  if (!cache1 || !cache2) {
    console.warn('⚠️ 缓存缺失：', !cache1 ? k1 : k2);
    return true;
  }
  const oL = Math.max(x1, x2),
    oR = Math.min(x1 + w1, x2 + w2);
  const oT = Math.max(y1, y2),
    oB = Math.min(y1 + h1, y2 + h2);
  const step = 2;
  for (let sy = oT; sy < oB; sy += step) {
    for (let sx = oL; sx < oR; sx += step) {
      if (getAlphaAt(k2, w2, h2, sx - x2, sy - y2) <= 20) continue;
      if (getAlphaAt(k1, w1, h1, sx - x1, sy - y1) <= 20) continue;
      return true;
    }
  }
  return false;
}

// ===================== 自适应缩放 =====================
const DESIGN_W = 430;
let scale = 1;
let itemW = 100;
let itemH = 100;

function getScale() {
  const w = window.innerWidth;
  const h = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  if (isLandscape) {
    // 横屏：以高度为基准缩放（高度是更小的那一边），但给一个更大的基数让图标更大
    return Math.max(0.35, Math.min(h / DESIGN_W, 2.0));
  }
  const scaleW = w / DESIGN_W;
  const scaleH = h / ((DESIGN_W * 16) / 9);
  return Math.max(0.35, Math.min(scaleW, scaleH, 2.0));
}

function applyScale() {
  scale = getScale();
  const w = window.innerWidth;
  const h = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  itemW = Math.round(100 * scale);
  itemH = Math.round(100 * scale);
  document.querySelectorAll('.item').forEach((el) => {
    el.style.width = itemW + 'px';
    el.style.height = itemH + 'px';
  });
  paddle.style.bottom = Math.round(30 * scale) + 'px';
  document.querySelector('.pop-cover').style.width =
    Math.round(220 * scale) + 'px';
  document.querySelectorAll('.end-img').forEach((el) => {
    el.style.width = Math.round(240 * scale) + 'px';
  });
  updatePaddleSize();
  const maxPadX = w - padW;
  padX = Math.max(0, Math.min(padX, maxPadX));
  updatePad();
  speedScale = Math.max(0.4, Math.min(h / 800, 1.2));
}

// ===================== 横屏处理 =====================
function fixViewportHeight() {
  const vh = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
  gameWrap.style.height = vh + 'px';
}

function handleOrientation() {
  isLandscape = window.innerWidth > window.innerHeight;
  fixViewportHeight();
  applyScale();
}

// ===================== 全局状态 =====================
let isLandscape = window.innerWidth > window.innerHeight; // 当前是否横屏
let score = 0,
  life = 3,
  isPlay = false,
  isPaused = false;
let dropList = [],
  dropSpeed = 3,
  speedScale = 1;
let frameId = null,
  createTimer = null;
let padW = 100,
  padH = 100,
  padX = 0;
let combo = 0,
  multiplier = 1.0;
let paddleFlashTimer = null;
let lastFrameTime = 0;
let catchIceCount = 0,
  catchXiaolongCount = 0;
let statBomb = 0,
  statIce = 0,
  statXiaolong = 0,
  statGhost = 0,
  statFood = 0;
let equippedActive = null;
let equippedPassive = null;
let activeSkillUsed = false;
let skillPickerSlot = null;
let passiveBuffUntil = 0;
const PASSIVE_BUFF_MS = 30000;
const PASSIVE_PICKUP_RATE = 0.04;

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    handleOrientation();
  });
}
window.addEventListener('orientationchange', () =>
  setTimeout(handleOrientation, 350),
);
window.addEventListener('resize', handleOrientation);
handleOrientation();

applyScale();
padX = (window.innerWidth - padW) / 2;
preloadAllAssets();

// ===================== 存档渲染 =====================
renderSaveStats(loadSave());
renderSkillSlots(loadSave());

// ===================== 托盘控制 =====================
function updatePad() {
  paddle.style.left = padX + 'px';
  paddle.style.bottom = Math.round(30 * scale) + 'px';
}
updatePad();

function movePad(x) {
  let newX = x - padW / 2;
  newX = Math.max(0, Math.min(newX, window.innerWidth - padW));
  padX = newX;
  updatePad();
}

function flashPaddle(type) {
  if (paddleFlashTimer) clearTimeout(paddleFlashTimer);
  const map = {
    good: IMG.paddleGoodFlash,
    bomb: IMG.paddleBombFlash,
    ice: IMG.paddleIceFlash,
    xiaolong: IMG.paddleXiaolongFlash,
    ghost: IMG.paddleGhostFlash,
  };
  if (map[type]) paddle.style.backgroundImage = `url(${map[type]})`;
  paddleFlashTimer = setTimeout(() => {
    paddle.style.backgroundImage = `url(${IMG.paddle})`;
    paddleFlashTimer = null;
  }, 200);
}

// ===================== 输入事件 =====================
gameWrap.addEventListener(
  'touchmove',
  (e) => {
    if (!isPlay) return;
    e.preventDefault();
    movePad(e.touches[0].clientX);
  },
  { passive: false },
);

gameWrap.addEventListener('mousemove', (e) => {
  if (!isPlay) return;
  movePad(e.clientX);
});

// ===================== 掉落物生成 =====================
function createItem() {
  if (!isPlay || isMenuOpen()) return;
  if (equippedPassive && Math.random() < PASSIVE_PICKUP_RATE) {
    spawnPassivePickupItem();
    return;
  }
  const div = document.createElement('div');
  div.className = 'item';
  const rand = Math.random();
  if (rand < 0.25) {
    div.dataset.type = 'bomb';
    div.dataset.alphaKey = 'bomb';
    div.style.backgroundImage = `url(${IMG.bomb})`;
  } else if (rand < 0.37) {
    div.dataset.type = 'ice';
    div.dataset.alphaKey = 'ice';
    div.dataset.point = 0;
    div.style.backgroundImage = `url(${IMG.ice})`;
  } else if (rand < 0.45) {
    div.dataset.type = 'xiaolong';
    div.dataset.alphaKey = 'xiaolong';
    div.dataset.point = 0;
    div.style.backgroundImage = `url(${IMG.xiaolong})`;
  } else if (rand < 0.55) {
    div.dataset.type = 'ghost';
    div.dataset.alphaKey = 'ghost';
    div.dataset.point = 0;
    div.style.backgroundImage = `url(${IMG.ghost})`;
  } else {
    const rg = IMG.goodsList[Math.floor(Math.random() * IMG.goodsList.length)];
    div.dataset.type = 'good';
    div.dataset.point = rg.point;
    div.dataset.alphaKey = rg.alphaKey;
    div.style.backgroundImage = `url(${rg.img})`;
  }
  div.style.width = Math.round(itemW) + 'px';
  div.style.height = Math.round(itemH) + 'px';

  const minGap = itemW + 10 * scale;
  let randomLeft = Math.random() * (window.innerWidth - itemW);
  let attempts = 0;
  while (
    attempts < 15 &&
    dropList.some((ex) => Math.abs(ex.x - randomLeft) < minGap)
  ) {
    randomLeft = Math.random() * (window.innerWidth - itemW);
    attempts++;
  }
  div.style.left = randomLeft + 'px';
  div.style.top = `-${itemH}px`;
  gameWrap.appendChild(div);

  const currentDropSpeed = dropSpeed;
  dropList.push({
    dom: div,
    x: randomLeft,
    y: -itemH,
    w: itemW,
    h: itemH,
    speed: (() => {
      const t = div.dataset.type;
      if (t === 'bomb') return currentDropSpeed * (0.6 + Math.random() * 0.8);
      if (t === 'ice') return currentDropSpeed * (0.9 + Math.random() * 0.3);
      return currentDropSpeed * (0.8 + Math.random() * 0.4);
    })(),
  });
}

// ===================== 碰撞检测 =====================
function hitTest(item) {
  const gameRect = gameWrap.getBoundingClientRect();
  const padRect = paddle.getBoundingClientRect();
  const pL = padRect.left - gameRect.left;
  const pR = padRect.right - gameRect.left;
  const baseH = 100 * scale;
  const hRatio = padRect.height / baseH;
  const pT = padRect.top - gameRect.top + Math.round(25 * scale * hRatio);
  const pB = padRect.bottom - gameRect.top - Math.round(20 * scale * hRatio);
  const wRatio = padRect.width / (100 * scale);
  const shrink = Math.round(20 * scale * wRatio);
  const iL = item.x + shrink,
    iR = item.x + item.w - shrink;
  const iT = item.y + shrink,
    iB = item.y + item.h - shrink;
  if (pR < iL || pL > iR || pB < iT || pT > iB) return false;
  return pixelCheck(
    'paddle',
    pL,
    pT,
    padRect.width,
    pB - pT,
    item.dom.dataset.alphaKey,
    item.x,
    item.y,
    item.w,
    item.h,
  );
}

// ===================== 游戏循环 =====================
function gameLoop(timestamp) {
  if (!isPlay || isMenuOpen()) return;
  frameId = requestAnimationFrame(gameLoop);
  if (timestamp == null) return;
  if (lastFrameTime === null) {
    lastFrameTime = timestamp;
    return;
  }
  const dt = Math.min(timestamp - lastFrameTime, 50);
  lastFrameTime = timestamp;
  const timeScale = dt / 16.667;
  updatePassiveBuffUI();

  for (let i = dropList.length - 1; i >= 0; i--) {
    const item = dropList[i];

    if (item.sucking) {
      item.suckT += dt;
      const t = Math.min(item.suckT / item.suckDuration, 1);
      const ease = t * t * t;
      item.x = item.suckStartX + (item.suckTargetX - item.suckStartX) * ease;
      item.y = item.suckStartY + (item.suckTargetY - item.suckStartY) * ease;
      item.dom.style.left = Math.round(item.x) + 'px';
      item.dom.style.top = Math.round(item.y) + 'px';
      const shrink = 1 - ease * 0.35;
      item.dom.style.transform = `scale(${shrink})`;
      if (t >= 1) collectVacuumedFood(i);
      continue;
    }

    if (
      isPassiveBuffActive() &&
      equippedPassive === 'zhaxiaPass' &&
      item.dom.dataset.type === 'good' &&
      item.dom.dataset.alphaKey !== getZhaxiaGood().alphaKey
    ) {
      applyZhaxiaToGoodItem(item);
    }

    item.y += item.speed * getPassiveSpeedMult() * timeScale;
    item.dom.style.top = Math.round(item.y) + 'px';

    if (hitTest(item)) {
      const type = item.dom.dataset.type;
      removeItem(i);

      if (type === 'passive_pickup') {
        playSound('eat');
        flashPaddle('good');
        activatePassiveBuff();
        continue;
      }

      flashPaddle(type);

      if (type === 'bomb') statBomb++;
      if (type === 'ice') statIce++;
      if (type === 'xiaolong') statXiaolong++;
      if (type === 'ghost') statGhost++;
      if (type === 'good') statFood++;

      if (type === 'good') {
        onCatchGood(Number(item.dom.dataset.point));
      } else if (type === 'ghost') {
        playSound('ghost');
        life++;
        lifeBox.innerText = life;
      } else if (type === 'bomb') {
        playSound('bombBad');
        life--;
        lifeBox.innerText = life;
        resetCombo();
        if (life <= 0) {
          gameOver();
          return;
        }
      } else if (type === 'ice') {
        catchIceCount++;
        if (catchIceCount >= 15) {
          gameOver();
          return;
        }
      } else if (type === 'xiaolong') {
        playSound('xiaolongSong');
        catchXiaolongCount++;
        if (catchXiaolongCount >= 100) {
          gameOver();
          return;
        }
      }
      continue;
    }

    if (item.y > window.innerHeight + 50) {
      const wasFood = item.dom.dataset.type === 'good';
      removeItem(i);
      if (wasFood) resetCombo();
    }
  }
}

function removeItem(index) {
  dropList[index].dom.remove();
  dropList.splice(index, 1);
}

function startCreate() {
  createTimer = setInterval(createItem, 850);
}
function stopCreate() {
  if (createTimer) clearInterval(createTimer);
  createTimer = null;
}

function updatePaddleSize() {
  padW = Math.round(Math.min(100 + Math.floor(score * 0.5), 200) * scale);
  padH = Math.round(Math.min(100 + Math.floor(score * 0.3), 200) * scale);
  paddle.style.width = padW + 'px';
  paddle.style.height = padH + 'px';
  const maxX = window.innerWidth - padW;
  padX = Math.max(0, Math.min(padX, maxX));
  updatePad();
}

function resetCombo() {
  combo = 0;
  multiplier = 1.0;
  updateComboDisplay();
}
function updateComboDisplay() {
  document.getElementById('comboDisplay').innerText = combo;
  document.getElementById('multDisplay').innerText = multiplier.toFixed(1);
}

// ===================== 结局判断 =====================
function resolveEndingId(score, catchIceCount, catchXiaolongCount) {
  const ququScores = [15, 123, 300, 400, 700, 777];
  if (score === 5835) return 'end5835';
  if (score >= 999) return 'endFull';
  if (catchIceCount >= 15) return 'endFreeze';
  if (catchXiaolongCount >= 100) return 'endSacred';
  if (score === 7) return 'endDragonBall';
  if (ququScores.includes(score)) return 'endQuqu';
  if (score === 325) return 'end325';
  if (score === 0) return 'endZero';
  if (score === 142) return 'end142';
  if (score === 234) return 'end234';
  if (score >= 318) return 'endHigh';
  return 'endLow';
}

// ===================== 结局图鉴 =====================
function renderEndingsGallery() {
  const data = loadSave();
  const grid = document.getElementById('endingsGrid');
  grid.innerHTML = '';
  ENDING_LIST.forEach(({ id, name }) => {
    const count = data.endings[id] || 0;
    const unlocked = count > 0;
    const card = document.createElement('div');
    card.className = 'ending-card' + (unlocked ? '' : ' locked');
    card.innerHTML =
      `<img src="${IMG[id]}" alt="${name}">` +
      `<p class="ending-name">${name}</p>` +
      (unlocked
        ? `<p class="ending-count">×${count}</p>`
        : '<p class="ending-lock">未达成</p>');
    grid.appendChild(card);
  });
}
function openEndingsGallery() {
  renderEndingsGallery();
  startPop.classList.add('hide');
  skillsPop.classList.add('hide');
  endingsPop.classList.remove('hide');
}
function closeEndingsGallery() {
  endingsPop.classList.add('hide');
  startPop.classList.remove('hide');
}
function isMenuOpen() {
  return (
    !startPop.classList.contains('hide') ||
    !overPop.classList.contains('hide') ||
    !endingsPop.classList.contains('hide') ||
    !skillsPop.classList.contains('hide')
  );
}

// ===================== 游戏主流程 =====================
function startGame() {
  startBtn.disabled =
    restartBtn.disabled =
    homeBtn.disabled =
    endingsBtn.disabled =
      true;
  score = 0;
  life = 3;
  dropSpeed = 3 * speedScale;
  catchIceCount = catchXiaolongCount = 0;
  statBomb = statIce = statXiaolong = statGhost = statFood = 0;
  isPaused = false;
  document.getElementById('pauseMask').classList.add('hide');
  document.getElementById('pauseBtn').innerHTML = '&#9646;&#9646;';
  resetCombo();
  updatePaddleSize();
  scoreBox.innerText = score;
  lifeBox.innerText = life;
  dropList.forEach((i) => i.dom.remove());
  dropList = [];
  paddle.style.backgroundImage = `url(${IMG.paddle})`;
  if (paddleFlashTimer) clearTimeout(paddleFlashTimer);
  paddleFlashTimer = null;
  startPop.classList.add('hide');
  overPop.classList.add('hide');
  endingsPop.classList.add('hide');
  skillsPop.classList.add('hide');
  const skills = getValidatedSkills();
  equippedActive = skills.active;
  equippedPassive = skills.passive;
  activeSkillUsed = false;
  passiveBuffUntil = 0;
  document.getElementById('passiveBuffWrap').classList.add('hide');
  isPlay = true;
  document.getElementById('pauseBtn').style.display = 'block';
  updateInGameSkillBtn();
  lastFrameTime = null;
  if (!audioBuf.bgm) {
    decodeAllAudio().then(() => playSound('bgm'));
  } else {
    playSound('bgm');
  }
  gameLoop();
  startCreate();
  setTimeout(() => {
    startBtn.disabled =
      restartBtn.disabled =
      homeBtn.disabled =
      endingsBtn.disabled =
        false;
  }, 500);
}

function returnToMain() {
  isPlay = false;
  isPaused = false;
  if (frameId) cancelAnimationFrame(frameId);
  frameId = null;
  stopCreate();
  stopBgm();
  if (paddleFlashTimer) clearTimeout(paddleFlashTimer);
  paddleFlashTimer = null;
  dropList.forEach((i) => i.dom.remove());
  dropList = [];
  paddle.style.backgroundImage = `url(${IMG.paddle})`;
  document.getElementById('pauseBtn').style.display = 'none';
  activeSkillBtn.style.display = 'none';
  document.getElementById('passiveBuffWrap').classList.add('hide');
  document.getElementById('pauseMask').classList.add('hide');
  overPop.classList.add('hide');
  endingsPop.classList.add('hide');
  skillsPop.classList.add('hide');
  startPop.classList.remove('hide');
  renderSaveStats(loadSave());
  renderSkillSlots(loadSave());
}

function gameOver() {
  isPlay = false;
  document.getElementById('pauseBtn').style.display = 'none';
  activeSkillBtn.style.display = 'none';
  document.getElementById('passiveBuffWrap').classList.add('hide');
  isPaused = false;
  if (frameId) cancelAnimationFrame(frameId);
  frameId = null;
  stopCreate();
  if (paddleFlashTimer) clearTimeout(paddleFlashTimer);
  paddleFlashTimer = null;
  stopBgm();
  finalScore.innerText = score;
  cntBomb.innerText = statBomb;
  cntIce.innerText = statIce;
  cntXiaolong.innerText = statXiaolong;
  cntGhost.innerText = statGhost;
  cntFood.innerText = statFood;
  const endingId = resolveEndingId(score, catchIceCount, catchXiaolongCount);
  resultImg.src = IMG[endingId];
  recordGameResult(endingId, {
    bomb: statBomb,
    ice: statIce,
    xiaolong: statXiaolong,
    ghost: statGhost,
    food: statFood,
  });
  overPop.classList.remove('hide');
}

// ===================== 事件绑定 =====================
startBtn.onclick = startGame;
restartBtn.onclick = startGame;
homeBtn.onclick = returnToMain;
endingsBtn.onclick = openEndingsGallery;
endingsBackBtn.onclick = closeEndingsGallery;
activeSkillSlot.onclick = () => openSkillPicker('active');
passiveSkillSlot.onclick = () => openSkillPicker('passive');
skillsBackBtn.onclick = closeSkillPicker;
activeSkillBtn.addEventListener('click', useActiveSkill);

// ===================== 暂停 / 继续 =====================
// （pauseBtn/pauseMask/resumeBtn 已在 DOM 缓存区声明）
function pauseGame() {
  if (!isPlay || isPaused) return;
  isPaused = true;
  isPlay = false;
  stopCreate();
  if (frameId) cancelAnimationFrame(frameId);
  stopBgm();
  pauseBtn.innerHTML = '&#9654;';
  pauseMask.classList.remove('hide');
}
function resumeGame() {
  if (!isPaused) return;
  isPaused = false;
  isPlay = true;
  lastFrameTime = null;
  pauseMask.classList.add('hide');
  pauseBtn.innerHTML = '&#9646;&#9646;';
  gameLoop();
  startCreate();
  playSound('bgm');
}

pauseBtn.addEventListener('click', () => {
  if (isPaused) resumeGame();
  else pauseGame();
});
resumeBtn.addEventListener('click', resumeGame);

window.addEventListener('blur', () => {
  if (!isPlay || isPaused) return;
  pauseGame();
});
window.addEventListener('focus', () => {
  if (isPaused || isMenuOpen()) return;
  if (
    !isPlay &&
    startPop.classList.contains('hide') &&
    overPop.classList.contains('hide')
  ) {
    isPlay = true;
    lastFrameTime = null;
    gameLoop();
    startCreate();
    playSound('bgm');
  }
});
