// ============================================================
// FIREBASE
// ============================================================
// Конфиг Firebase-проекта izi-french (подставлен 2026-09-21).
// Firebase Console -> Project settings -> Your apps -> Web app -> SDK setup.
// Сразу после создания проекта: Authentication -> Sign-in method -> Google,
// и Authentication -> Settings -> Authorized domains -> cabinet.izifrench.com
// (без этого вход «сбрасывается» — типовая грабля новых кабинетов).
const firebaseConfig = {
  apiKey: "AIzaSyD7dA7BPbP75qHk1_5FngeUOv2jDLIyEAY",
  authDomain: "izi-french.firebaseapp.com",
  projectId: "izi-french",
  storageBucket: "izi-french.firebasestorage.app",
  messagingSenderId: "156685756129",
  appId: "1:156685756129:web:14e02117b3c1de607a79a0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
let currentUser = null;

let _signingIn = false;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const GOOGLE_BTN_HTML = '<svg class="google-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.9 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.5-3.1-11.3-7.6l-6.5 5C9.7 39.6 16.3 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.9 2.4-2.5 4.5-4.5 5.9l.1-.1 6.2 5.2C36.9 40.7 44 35 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg> Войти через Google';

function signInWithGoogle() {
  if (_signingIn) return;
  _signingIn = true;
  const btn = document.querySelector('.btn-google-login');
  if (btn) { btn.disabled = true; btn.textContent = 'Подождите...'; }

  const provider = new firebase.auth.GoogleAuthProvider();
  const resetBtn = () => {
    _signingIn = false;
    if (btn) { btn.disabled = false; btn.innerHTML = GOOGLE_BTN_HTML; }
  };
  const useRedirect = () => {
    auth.signInWithRedirect(provider);
    // страница перезагрузится, кнопку не сбрасываем
  };

  // Таймаут 12 сек: если popup завис или заблокирован без ошибки — переходим на redirect
  const fallbackTimer = setTimeout(() => {
    if (_signingIn) useRedirect();
  }, 12000);

  auth.signInWithPopup(provider)
    .then(() => clearTimeout(fallbackTimer))
    .catch(err => {
      clearTimeout(fallbackTimer);
      if (err.code === 'auth/cancelled-popup-request' ||
          err.code === 'auth/popup-closed-by-user') {
        resetBtn();
        return;
      }
      if (err.code === 'auth/popup-blocked') {
        useRedirect();
        return;
      }
      resetBtn();
      console.error('signInWithPopup error:', err.code, err.message);
    })
    .finally(() => {
      if (_signingIn) resetBtn();
    });
}

// Обработка результата после redirect (fallback для браузеров где popup недоступен)
auth.getRedirectResult()
  .then(result => { if (result && result.user) console.log('redirect auth ok:', result.user.email); })
  .catch(() => {});

function signOut() {
  hideUserMenu();
  auth.signOut();
}

function showUserMenu() {
  const menu = document.getElementById('user-menu');
  menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
}

function hideUserMenu() {
  document.getElementById('user-menu').style.display = 'none';
}

function renderUserInfo() {
  if (!currentUser) return;
  const name = currentUser.displayName || 'Пользователь';
  const email = currentUser.email || '';
  const photo = currentUser.photoURL;

  const avatarImg = document.getElementById('user-avatar');
  const avatarInitials = document.getElementById('user-initials');
  if (photo) {
    avatarImg.src = photo;
    avatarImg.style.display = 'block';
    avatarInitials.style.display = 'none';
  } else {
    avatarImg.style.display = 'none';
    avatarInitials.textContent = name.charAt(0).toUpperCase();
    avatarInitials.style.display = 'block';
  }

  document.getElementById('user-menu-name').textContent = name;
  document.getElementById('user-menu-email').textContent = email;
  document.getElementById('app-subtitle').textContent = `Bonjour, ${name.split(' ')[0]} !`;
}

// ============================================================
// STATE
// ============================================================
const DEFAULT_STATE = {
  streak: 0,
  lastPlayed: null,
  totalXp: 0,
  dailyXp: 0,
  dailyGoal: 50,
  level: 1,
  lessonsCompleted: 0,
  scenariosCompleted: [],
  errorLog: {},
  achievements: [],
  srs: {},  // { verbId: { interval, ef, due } }
  onboardingDone: false,
  vocabProgress: {},  // { categoryId: [greek, greek, ...] }
  currentLesson: 1
};

let state = { ...DEFAULT_STATE };

let lessonState = {
  exercises: [],
  currentIndex: 0,
  hearts: 3,
  xpEarned: 0,
  correct: 0,
  answered: false
};

let scenarioState = {
  scenarioId: null,
  currentStep: 0,
  score: 0,
  answered: false
};

const XP_PER_CORRECT = 10;
const XP_PER_SCENARIO_STEP = 15;
const EXERCISES_PER_LESSON = 10;

const GREEK_KEYS = [
  ['á','é','í','ó','ú'],
  ['ñ','ü'],
];

const PRONOUNS = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];
// Французская элизия: «je ai» не существует, только «j'ai». Формы в data.js
// хранятся без местоимения («ai mangé»), склейку делает эта функция.
function frForm(pronoun, form) {
  if (!form) return '';
  if (pronoun === 'je' && /^[aeiouyéèêâîôûh]/i.test(form)) return "j'" + form;
  return pronoun + ' ' + form;
}
const PRONOUNS_RU = {
  "je": "я", "tu": "ты", "il/elle": "он/она",
  "nous": "мы", "vous": "вы/Вы", "ils/elles": "они"
};
// VERBS array in data.js contains mixed data — filter real verbs only
const VERBS_ONLY = VERBS.filter(v => v.infinitive);

const LESSON_VERBS_COUNT = 5;
function getLessonModules() {
  const modules = [];
  for (let i = 0; i < VERBS_ONLY.length; i += LESSON_VERBS_COUNT) {
    const num = Math.floor(i / LESSON_VERBS_COUNT) + 1;
    modules.push({ id: num, verbs: VERBS_ONLY.slice(i, i + LESSON_VERBS_COUNT) });
  }
  return modules;
}

let teachState = { module: null, cards: [], currentCard: 0 };

// ============================================================
// PERSISTENCE
// ============================================================

// Ключ localStorage французского кабинета (см. миграцию со старого ключа ниже).
const STATE_KEY = 'izifrench-state-v1';

async function loadState() {
  // Сначала загружаем из localStorage как fallback
  try {
    // Ключ localStorage. Раньше здесь стоял 'greek-app-state-v2' — хвост от
    // греческого кабинета, из которого выросла линейка. Читаем и старый ключ,
    // чтобы у тех, кто успел позаниматься, прогресс не обнулился.
    const saved = localStorage.getItem(STATE_KEY) || localStorage.getItem('greek-app-state-v2');
    if (saved) state = { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch (e) { state = { ...DEFAULT_STATE }; }

  // Потом синхронизируем с Firestore (приоритет)
  if (currentUser) {
    try {
      const doc = await db.collection('users').doc(currentUser.uid).get();
      if (doc.exists) {
        state = { ...DEFAULT_STATE, ...doc.data() };
        localStorage.setItem(STATE_KEY, JSON.stringify(state));
      }
    } catch (e) { console.error('Firestore load error:', e); }
  }
}

function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
  if (currentUser) {
    db.collection('users').doc(currentUser.uid)
      .set(state)
      .catch(e => console.error('Firestore save error:', e));
  }
}

// ============================================================
// SUBSCRIPTION
// ============================================================

// Save email to Firestore so webhook can find user by email
async function saveUserEmail() {
  if (!currentUser?.email) return;
  try {
    await db.collection('users').doc(currentUser.uid).set(
      { email: currentUser.email.toLowerCase() },
      { merge: true }
    );
  } catch (e) { console.error('saveUserEmail error:', e); }
}

// Пробные уроки: гость и вошедший без подписки проходят TRIAL_LESSONS уроков,
// дальше — модалка с предложением оформить доступ. Канон семьи: у турка и немца 5,
// у серба и грека 2. Берём 5 — так же, как в самом свежем (турецком) кабинете,
// и так же, как обещает описание в App Store.
const TRIAL_LESSONS = 5;
let hasSubscription = false;
let pendingUpgrade = false;   // гость нажал «оформить» → после входа сразу пейволл

// Нативная обёртка (iOS через Capacitor). На нативе подписка идёт через Apple IAP
// (RevenueCat) и Firebase-логин для покупки не нужен, поэтому цены показываем гостю
// сразу, без стены входа. Требование аккаунта до показа цены — известный убийца
// конверсии на новом приложении (у IziSerb: 63 установки, 0 триалов).
function isNativeApp() {
  return !!(window.Capacitor && typeof window.Capacitor.isNativePlatform === 'function' && window.Capacitor.isNativePlatform());
}

// Check subscription status: active / trialing = OK, else paywall
async function checkSubscription() {
  if (!currentUser) return false;

  // Developer account — always has access
  if (currentUser.email?.toLowerCase() === 'dondanilo1994@gmail.com') return true;

  // В iOS-приложении подписку подтверждает RevenueCat (native-iap.js выставляет
  // window.__iziNativeSubscription = true). На вебе всегда undefined → пропускаем.
  if (window.__iziNativeSubscription === true) return true;

  // 1. Check users/{uid}.subscription (set by webhook)
  const ACTIVE_STATUSES = ['active', 'trialing', 'on_trial', 'paid'];

  const sub = state.subscription;
  if (sub && ACTIVE_STATUSES.includes(sub.status)) {
    return true;
  }

  // 2. Also check subscriptions/{email} as fallback
  try {
    const email = currentUser.email?.toLowerCase();
    if (email) {
      const doc = await db.collection('subscriptions').doc(email).get();
      if (doc.exists) {
        const s = doc.data();
        if (ACTIVE_STATUSES.includes(s.status)) {
          // Sync to state
          state.subscription = { status: s.status, ...(s.expiresAt ? { expiresAt: s.expiresAt } : {}) };
          saveState();
          return true;
        }
      }
    }
  } catch (e) { console.error('checkSubscription error:', e); }

  return false;
}

// ==================== УДАЛЕНИЕ АККАУНТА (App Store Guideline 5.1.1(v)) ====================
// Полное удаление: данные в Firestore + сам аккаунт Firebase Auth + локальный прогресс.
function deleteAccount() {
  if (!currentUser) return;
  const m = document.getElementById('delete-account-modal');
  if (m) m.style.display = 'flex';
}

function dismissDeleteAccount() {
  const m = document.getElementById('delete-account-modal');
  if (m) m.style.display = 'none';
}

async function confirmDeleteAccount() {
  if (!currentUser) return;
  const btn = document.getElementById('delete-account-confirm');
  if (btn) { btn.disabled = true; btn.textContent = 'Удаляем…'; }
  const uid = currentUser.uid;
  try {
    // 1. Свои посты в ленте (пока есть валидный токен — иначе правила не пустят)
    const myPosts = await db.collection('posts').where('uid', '==', uid).get();
    if (!myPosts.empty) {
      const batch = db.batch();
      myPosts.forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
    // 2. Подписка на пуши и документ пользователя
    await db.collection('push_subscriptions').doc(uid).delete().catch(() => {});
    await db.collection('users').doc(uid).delete().catch(() => {});
    // (subscriptions/{email} не трогаем — платёжная запись, правила write:false)

    // 3. Локальный прогресс
    try { localStorage.removeItem(STATE_KEY); localStorage.removeItem('greek-app-state-v2'); localStorage.removeItem('apnsToken'); } catch (e) {}
    state = { ...DEFAULT_STATE };

    // 4. Сам аккаунт Firebase Auth (в конце — после удаления токен пропадёт)
    await currentUser.delete();

    dismissDeleteAccount();
    // onAuthStateChanged(null) сам уведёт на экран входа
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = 'Удалить навсегда'; }
    if (e.code === 'auth/requires-recent-login') {
      dismissDeleteAccount();
      alert('Для безопасности войди заново, а затем повтори удаление аккаунта.');
      auth.signOut(); // свежий вход даст «recent login», и удаление пройдёт
    } else {
      alert('Не удалось удалить аккаунт: ' + (e.message || e.code || e));
    }
  }
}

function finishOnboarding() {
  state.onboardingDone = true;
  saveState();
  showScreen('screen-home');
  // Ask for push permission after onboarding — user is already engaged
  setTimeout(setupPushNotifications, 2000);
}

const VAPID_PUBLIC_KEY = 'BLdxpa5-YAGttUm7HI9wFmiBA7fAhIV-J9vFxuNgo4zDpSxA-q6C9yjCgmITA37bm42C_9vWkHjJIckG5N7fc80';

function urlBase64ToUint8Array(base64) {
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

// APNs-токен iOS-приложения. native-bridge.js кладёт его в window.__APNS_TOKEN
// и шлёт событие 'apnsToken'; здесь сохраняем под текущим пользователем.
// Web Push в WKWebView не существует, поэтому на нативе идём только этим путём.
async function saveApnsToken(token) {
  if (!token || !currentUser) return;
  try {
    await db.collection('apns_subscriptions').doc(currentUser.uid).set({
      token,
      uid: currentUser.uid,
      platform: 'ios',
      updatedAt: new Date().toISOString()
    });
  } catch (e) { console.error('saveApnsToken error:', e); }
}

async function setupPushNotifications() {
  // iOS-приложение: Web Push в WKWebView нет — регистрируемся на APNs через натив.
  if (isNativeApp()) {
    if (typeof window.__nativeRegisterPush === 'function') window.__nativeRegisterPush();
    if (window.__APNS_TOKEN) saveApnsToken(window.__APNS_TOKEN); // токен мог прийти до входа
    return;
  }
  if (!('Notification' in window) || !('PushManager' in window)) return;
  if (Notification.permission === 'denied') return;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }
    if (currentUser) {
      await db.collection('push_subscriptions').doc(currentUser.uid).set({
        subscription: sub.toJSON(),
        uid: currentUser.uid,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (e) { console.error('Push setup error:', e); }
}

// ============================================================
// PROGRESS DASHBOARD
// ============================================================
const LEAGUES = [
  { id: 'bronze',   name: 'Бронзовая лига',   icon: '🥉', min: 1,  max: 10,  color: '#CD7F32' },
  { id: 'silver',   name: 'Серебряная лига',   icon: '🥈', min: 11, max: 30,  color: '#A8A9AD' },
  { id: 'gold',     name: 'Золотая лига',      icon: '🥇', min: 31, max: 50,  color: '#FFD700' },
  { id: 'platinum', name: 'Платиновая лига',   icon: '💎', min: 51, max: 100, color: '#E5F0FF' },
];

function getLeague(level) {
  return LEAGUES.find(l => level >= l.min && level <= l.max) || LEAGUES[LEAGUES.length - 1];
}

let activeProgressTab = 'xp';

function showProgress(tab = 'xp') {
  activeProgressTab = tab;
  // Record start date if not set
  if (!state.startedAt) {
    state.startedAt = new Date().toISOString();
    saveState();
  }
  renderProgressXP();
  renderProgressLevel();
  renderProgressLessons();
  switchProgressTab(tab);
  showScreen('screen-progress');
}

function switchProgressTab(tab) {
  activeProgressTab = tab;
  ['xp', 'level', 'lessons'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t === tab);
    document.getElementById(`panel-${t}`).style.display = t === tab ? 'block' : 'none';
  });
}

function renderProgressXP() {
  const xp = state.totalXp;
  const level = state.level;
  const xpForLevel = (level - 1) * 500;
  const xpNextLevel = level * 500;
  const xpInLevel = xp - xpForLevel;
  const pct = Math.min(100, Math.round(xpInLevel / 500 * 100));

  document.getElementById('pg-total-xp').textContent = xp.toLocaleString('ru-RU');
  document.getElementById('pg-xp-bar').style.width = pct + '%';
  document.getElementById('pg-xp-bar-label').textContent =
    `${xpInLevel} / 500 XP до уровня ${level + 1}`;

  const days = state.startedAt
    ? Math.max(1, Math.ceil((Date.now() - new Date(state.startedAt).getTime()) / 86400000))
    : 1;
  document.getElementById('pg-xp-days').textContent = `${days} ${pluralDays(days)} в пути`;

  document.getElementById('pg-daily-xp').textContent = state.dailyXp || 0;
  document.getElementById('pg-streak-xp').textContent = state.streak || 0;
  const lessons = state.lessonsCompleted || 0;
  document.getElementById('pg-avg-xp').textContent = lessons > 0 ? Math.round(xp / lessons) : 0;
  document.getElementById('pg-goal-xp').textContent = state.dailyGoal || 50;
}

function renderProgressLevel() {
  const level = state.level;
  const league = getLeague(level);
  const nextLeague = LEAGUES[LEAGUES.indexOf(league) + 1];

  document.getElementById('pg-league-badge').textContent = league.icon;
  document.getElementById('pg-league-name').textContent = league.name;
  document.getElementById('pg-level-val').textContent = level;

  // Progress within league
  const leagueLen = league.max - league.min + 1;
  const inLeague = level - league.min;
  const pct = Math.round(inLeague / leagueLen * 100);
  document.getElementById('pg-league-bar').style.width = pct + '%';

  if (nextLeague) {
    document.getElementById('pg-league-progress-title').textContent =
      `Прогресс в лиге (${inLeague} / ${leagueLen} уровней)`;
    document.getElementById('pg-league-bar-label').textContent =
      `До ${nextLeague.name}: ${league.max - level + 1} уровней`;
  } else {
    document.getElementById('pg-league-progress-title').textContent = 'Максимальная лига!';
    document.getElementById('pg-league-bar-label').textContent = 'Ты достиг платинового уровня 💎';
  }

  // Highlight league rows
  LEAGUES.forEach(l => {
    const row = document.getElementById(`league-${l.id}`);
    const check = document.getElementById(`lcheck-${l.id}`);
    if (!row) return;
    row.classList.remove('current', 'done');
    if (l.id === league.id) { row.classList.add('current'); check.textContent = ''; }
    else if (level > l.max) { row.classList.add('done'); check.textContent = '✅'; }
    else { check.textContent = ''; }
  });
}

function renderProgressLessons() {
  const lessons = state.lessonsCompleted || 0;
  document.getElementById('pg-lessons-val').textContent = lessons;
  document.getElementById('pg-lessons-sub').textContent =
    `Это примерно ${Math.round(lessons * 5)} минут практики`;

  const milestones = [
    { n: 1,   icon: '🌱', title: 'Первый урок',       sub: 'Начало большого пути' },
    { n: 5,   icon: '🔥', title: '5 уроков',           sub: 'Войдёшь в ритм!' },
    { n: 10,  icon: '⭐', title: '10 уроков',          sub: 'Ты серьёзен!' },
    { n: 30,  icon: '🚀', title: '30 уроков',          sub: 'Месяц практики' },
    { n: 50,  icon: '💪', title: '50 уроков',          sub: 'Полпути к мастерству' },
    { n: 100, icon: '🏆', title: '100 уроков',         sub: 'Настоящий француз!' },
  ];
  const nextMilestone = milestones.find(m => m.n > lessons) || milestones[milestones.length - 1];
  document.getElementById('pg-milestones').innerHTML = milestones.map(m => `
    <div class="milestone-row ${lessons >= m.n ? 'done' : ''}">
      <div class="milestone-icon">${m.icon}</div>
      <div class="milestone-info">
        <div class="milestone-title">${m.title}</div>
        <div class="milestone-sub">${m.sub}</div>
      </div>
      <div class="milestone-check">${lessons >= m.n ? '✅' : `${m.n}`}</div>
    </div>`).join('');

  document.getElementById('pg-scenarios').textContent = (state.scenariosCompleted || []).length;
  const vocabLearned = Object.values(state.vocabProgress || {}).reduce((s, a) => s + a.length, 0);
  document.getElementById('pg-vocab-learned').textContent = vocabLearned;
  document.getElementById('pg-achievements').textContent = (state.achievements || []).length;
  document.getElementById('pg-streak-lessons').textContent = state.streak || 0;

  // Motivation
  const motivations = [
    { emoji: '🔥', text: `Ещё ${nextMilestone.n - lessons} уроков до «${nextMilestone.title}»`, sub: 'Ты почти там!' },
    { emoji: '🧠', text: `${vocabLearned} слов уже в голове`, sub: 'Каждое слово — шаг к гражданству' },
    { emoji: '⚡', text: `${state.totalXp} XP заработано`, sub: 'Продолжай — каждый урок считается' },
  ];
  const m = motivations[lessons % motivations.length];
  document.getElementById('pg-motivation').innerHTML = `
    <div class="progress-motivation-emoji">${m.emoji}</div>
    <div class="progress-motivation-text">${m.text}</div>
    <div class="progress-motivation-sub">${m.sub}</div>`;
}

function pluralDays(n) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'дней';
  const r = n % 10;
  if (r === 1) return 'день';
  if (r >= 2 && r <= 4) return 'дня';
  return 'дней';
}

function showSettings() {
  // User info
  if (currentUser) {
    const name = currentUser.displayName || 'Пользователь';
    const email = currentUser.email || '';
    document.getElementById('settings-user-name').textContent = name;
    document.getElementById('settings-user-email').textContent = email;
    document.getElementById('settings-initials').textContent = name.charAt(0).toUpperCase();
    const avatarEl = document.getElementById('settings-avatar');
    const initialsEl = document.getElementById('settings-initials');
    if (currentUser.photoURL) {
      avatarEl.src = currentUser.photoURL;
      avatarEl.style.display = 'block';
      initialsEl.style.display = 'none';
    } else {
      avatarEl.style.display = 'none';
      initialsEl.style.display = 'flex';
    }
  }

  // Daily goal buttons
  document.querySelectorAll('.settings-goal-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.xp) === state.dailyGoal);
  });

  // Push toggle
  const pushOn = pushPermission() === 'granted';
  document.getElementById('push-toggle').classList.toggle('on', pushOn);

  // Stats
  document.getElementById('s-total-xp').textContent = state.totalXp;
  document.getElementById('s-lessons').textContent = state.lessonsCompleted;
  document.getElementById('s-streak').textContent = state.streak;
  const learnedCount = Object.values(state.vocabProgress || {}).reduce((sum, arr) => sum + arr.length, 0);
  document.getElementById('s-vocab').textContent = learnedCount;

  showScreen('screen-settings');
}

function setDailyGoal(xp) {
  state.dailyGoal = xp;
  saveState();
  document.querySelectorAll('.settings-goal-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.xp) === xp);
  });
  renderHome();
}

// В WKWebView (iOS-приложении) объекта Notification НЕ существует — прямое обращение
// кидает ReferenceError и роняет вызвавшую функцию. Именно эта грабля многократно
// заваливала ревью IziGreek. Возвращаем 'unsupported' вместо броска.
function pushPermission() {
  try {
    return (typeof Notification !== 'undefined' && Notification.permission) || 'unsupported';
  } catch (e) { return 'unsupported'; }
}

async function togglePushSetting() {
  if (pushPermission() === 'unsupported') {
    alert('Уведомления в приложении подключаются отдельно — скоро включим.');
    return;
  }
  if (pushPermission() === 'denied') {
    alert('Уведомления заблокированы в настройках браузера. Разрешите их вручную.');
    return;
  }
  if (pushPermission() === 'granted') {
    // Unsubscribe
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
    if (currentUser) await db.collection('push_subscriptions').doc(currentUser.uid).delete().catch(() => {});
    document.getElementById('push-toggle').classList.remove('on');
  } else {
    await setupPushNotifications();
    document.getElementById('push-toggle').classList.toggle('on', pushPermission() === 'granted');
  }
}

function showPaywall() {
  // В iOS-приложении оплата обязана идти через Apple IAP (гайдлайн 3.1.1), а не
  // через внешний LemonSqueezy. native-iap.js регистрирует __iziIapPaywall и сам
  // навешивает нативную покупку на кнопки. На вебе хук undefined → обычный флоу.
  updateGuestUi();
  if (typeof window.__iziIapPaywall === 'function') { window.__iziIapPaywall(); return; }

  const monthlyUrl = `https://izifrench.lemonsqueezy.com/checkout/buy/MONTHLY_PRODUCT_ID?checkout[custom][user_id]=${currentUser?.uid || ''}`;
  const annualUrl = `https://izifrench.lemonsqueezy.com/checkout/buy/YEARLY_PRODUCT_ID?checkout[custom][user_id]=${currentUser?.uid || ''}`;

  document.getElementById('paywall-monthly-btn').href = monthlyUrl;
  document.getElementById('paywall-annual-btn').href = annualUrl;
  showScreen('screen-paywall');
}

function closePaywall() {
  // Уйти с пейволла, ничего не купив. У гостя остаются пробные уроки,
  // поэтому возвращаем на главную, а не на экран входа.
  if (typeof showHome === 'function') showHome();
  else showScreen('screen-home');
}

// ============================================================
// INIT
// ============================================================
async function init() {
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.register('sw.js').catch(() => null);

    // Reload when a new SW takes control (guarantees fresh files)
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    if (reg) {
      // When a new SW finishes installing, tell it to skip waiting immediately
      const onInstalled = (sw) => {
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            sw.postMessage({ type: 'SKIP_WAITING' });
          }
        });
      };
      if (reg.installing) onInstalled(reg.installing);
      reg.addEventListener('updatefound', () => onInstalled(reg.installing));
    }
  }

  // Подписываемся на состояние авторизации
  auth.onAuthStateChanged(async user => {
    if (user) {
      currentUser = user;
      await loadState();
      await saveUserEmail();
      checkStreak();
      renderUserInfo();

      hasSubscription = await checkSubscription();
      updateGuestUi();

      // Гость нажал «оформить доступ» до входа → после входа сразу ведём на пейволл.
      if (pendingUpgrade) {
        pendingUpgrade = false;
        if (!hasSubscription) { showPaywall(); return; }
      }

      // Вошедший без подписки НЕ упирается в пейволл сразу — у него остаются
      // пробные уроки (trialGate), пейволл всплывает по их исчерпании. Так и
      // ревьюер, и пользователь видят контент, а не глухую стену.
      renderHome();
      if (!state.onboardingDone) {
        showScreen('screen-onboarding');
      } else {
        showScreen('screen-home');
        if (isNativeApp() || pushPermission() === 'granted') {
          setTimeout(setupPushNotifications, 3000);
        }
      }
    } else {
      // Гость: работаем на локальном прогрессе, вход не форсим — ни в вебе, ни на нативе.
      currentUser = null;
      hasSubscription = false;
      pendingUpgrade = false;
      await loadState();
      checkStreak();
      updateGuestUi();
      renderHome();
      if (!state.onboardingDone) showScreen('screen-onboarding');
      else showScreen('screen-home');
    }
  });
}

function checkStreak() {
  const today = new Date().toDateString();
  if (state.lastPlayed === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (state.lastPlayed !== yesterday.toDateString() && state.lastPlayed !== null) {
    state.streak = 0;
  }
  state.dailyXp = 0;
  saveState();
}

// ============================================================
// HOME
// ============================================================
function renderHome() {
  document.getElementById('streak-number').textContent = state.streak;
  document.getElementById('total-xp').textContent = state.totalXp;
  document.getElementById('level-display').textContent = state.level;
  document.getElementById('lessons-done').textContent = state.lessonsCompleted;

  const pct = Math.min(100, (state.dailyXp / state.dailyGoal) * 100);
  document.getElementById('daily-progress').style.width = pct + '%';
  document.getElementById('daily-xp-display').textContent = `${state.dailyXp} / ${state.dailyGoal} XP`;

  const card = document.getElementById('streak-card');
  card.classList.toggle('streak-zero', state.streak === 0);

  // Achievements counter
  if (!state.achievements) state.achievements = [];
  document.getElementById('ach-nav-count').textContent = `${state.achievements.length}/${ACHIEVEMENTS.length}`;

  // Weak lesson button
  const weakCount = Object.keys(state.errorLog).length;
  const weakBtn = document.getElementById('weak-lesson-btn');
  if (weakBtn) {
    weakBtn.style.display = weakCount > 0 ? 'flex' : 'none';
    document.getElementById('weak-verbs-count').textContent = `${weakCount} ${weakCount === 1 ? 'глагол' : weakCount < 5 ? 'глагола' : 'глаголов'}`;
  }

  // SRS review button
  const dueCount = getSrsDueCount();
  const srsBtn = document.getElementById('srs-review-btn');
  if (srsBtn) {
    srsBtn.style.display = dueCount > 0 ? 'flex' : 'none';
    document.getElementById('srs-due-count').textContent = `${dueCount} ${dueCount === 1 ? 'глагол' : dueCount < 5 ? 'глагола' : 'глаголов'}`;
  }

  // Lesson button
  const mods = getLessonModules();
  const lessonNum = Math.min(state.currentLesson || 1, mods.length);
  const lessonBtnText = document.getElementById('lesson-btn-text');
  if (lessonBtnText) lessonBtnText.textContent = `Урок ${lessonNum} · ${LESSON_VERBS_COUNT} слов ▶`;
}

function showHome() {
  showScreen('screen-home');
  renderHome();
}

// ============================================================
// LESSON — EXERCISE GENERATION
// ============================================================
function generateLesson(verbPool = null) {
  const pool = verbPool || buildSrsPool();
  const exercises = [];
  for (let i = 0; i < EXERCISES_PER_LESSON; i++) {
    const verb = pool[Math.floor(Math.random() * pool.length)];
    const type = Math.floor(Math.random() * 5); // 0-3: multiple choice, 4: typing
    const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];

    if (type === 0) {
      const correct = verb.present[pronoun];
      exercises.push({
        type: 'conjugation', verb, pronoun,
        correctAnswer: correct,
        options: shuffle([correct, ...getWrongForms(verb, correct)])
      });
    } else if (type === 1) {
      const form = verb.present[pronoun];
      const correct = `${PRONOUNS_RU[pronoun]} ${verb.translation}`;
      exercises.push({
        type: 'phrase_meaning', verb,
        greek: `${pronoun} ${form}`,
        correctAnswer: correct,
        options: shuffle([correct, ...getWrongMeanings(verb, pronoun)])
      });
    } else if (type === 2) {
      const correct = verb.translation;
      const wrongs = VERBS_ONLY.filter(v => v.id !== verb.id).sort(() => Math.random() - 0.5).slice(0, 3).map(v => v.translation);
      exercises.push({
        type: 'word_meaning', verb, greek: verb.infinitive,
        correctAnswer: correct, options: shuffle([correct, ...wrongs])
      });
    } else if (type === 3) {
      const correct = verb.present[pronoun];
      exercises.push({
        type: 'translate_to_greek',
        russian: `${PRONOUNS_RU[pronoun]} ${verb.translation}`,
        verb, pronoun,
        correctAnswer: correct,
        options: shuffle([correct, ...getWrongForms(verb, correct)])
      });
    } else {
      // type === 4: typing
      const correct = verb.present[pronoun];
      exercises.push({
        type: 'typing',
        verb, pronoun,
        correctAnswer: correct
      });
    }
  }
  return exercises;
}

function getWrongForms(verb, correctForm) {
  const allForms = Object.values(verb.present).filter(f => f !== correctForm);
  if (allForms.length < 3) {
    const extra = VERBS_ONLY.find(v => v.id !== verb.id);
    allForms.push(...Object.values(extra.present).filter(f => f !== correctForm));
  }
  return shuffle(allForms).slice(0, 3);
}

function getWrongMeanings(verb, pronoun) {
  const pRu = PRONOUNS_RU[pronoun];
  return VERBS_ONLY.filter(v => v.id !== verb.id).sort(() => Math.random() - 0.5).slice(0, 3).map(v => `${pRu} ${v.translation}`);
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

// ============================================================
// LESSON — FLOW
// ============================================================
function startLesson() {
  const mods = getLessonModules();
  const num = Math.min(state.currentLesson || 1, mods.length);
  startTeachPhase(mods[num - 1]);
}

function startWeakLesson() {
  const weakIds = Object.keys(state.errorLog)
    .sort((a, b) => state.errorLog[b] - state.errorLog[a])
    .map(id => parseInt(id));
  const weakVerbs = VERBS_ONLY.filter(v => weakIds.includes(v.id));
  if (weakVerbs.length < 2) return;
  lessonState = {
    exercises: generateLesson(weakVerbs),
    currentIndex: 0, hearts: 3, xpEarned: 0, correct: 0, answered: false,
    isWeakMode: true
  };
  showScreen('screen-lesson');
  renderExercise();
}

function renderExercise() {
  const ex = lessonState.exercises[lessonState.currentIndex];
  lessonState.answered = false;

  document.getElementById('lesson-progress').style.width = (lessonState.currentIndex / EXERCISES_PER_LESSON * 100) + '%';
  renderHearts();
  document.getElementById('lesson-xp').textContent = lessonState.xpEarned;
  document.getElementById('lesson-footer').style.display = 'none';
  document.getElementById('lesson-footer').className = 'lesson-footer';

  const label = document.getElementById('exercise-label');
  const question = document.getElementById('exercise-question');
  const subtitle = document.getElementById('exercise-subtitle');

  if (ex.type === 'conjugation') {
    label.textContent = 'Выбери правильную форму';
    question.textContent = ex.verb.infinitive;
    subtitle.textContent = `${ex.pronoun}  (${PRONOUNS_RU[ex.pronoun]})  —  ${ex.verb.translation}`;
  } else if (ex.type === 'phrase_meaning') {
    label.textContent = 'Что это значит?';
    question.textContent = ex.greek;
    subtitle.textContent = '';
  } else if (ex.type === 'word_meaning') {
    label.textContent = 'Что значит этот глагол?';
    question.textContent = ex.greek;
    subtitle.textContent = '';
  } else if (ex.type === 'typing') {
    label.innerHTML = 'Напечатай форму <span class="label-badge">⌨️ сложно</span>';
    question.textContent = ex.verb.infinitive;
    subtitle.textContent = `${ex.pronoun}  (${PRONOUNS_RU[ex.pronoun]})  —  ${ex.verb.translation}`;
  } else {
    label.textContent = 'Переведи на французский';
    question.textContent = ex.russian;
    subtitle.textContent = `${ex.verb.infinitive}  —  ${ex.verb.translation}`;
  }

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';

  if (ex.type === 'typing') {
    renderTypingInput();
  } else {
    ex.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => selectAnswer(opt, ex.correctAnswer, ex.verb?.id));
      grid.appendChild(btn);
    });
  }
}

function renderTypingInput() {
  const grid = document.getElementById('options-grid');
  grid.innerHTML = `
    <div class="typing-wrap">
      <input type="text" id="typing-input" class="typing-input"
             placeholder="Введи форму глагола..."
             autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    </div>
    <div class="greek-keyboard">
      ${GREEK_KEYS.map(row => `
        <div class="gk-row">
          ${row.map(ch => `<button class="gk-btn" onclick="insertGreekChar('${ch}')">${ch}</button>`).join('')}
        </div>
      `).join('')}
      <div class="gk-row gk-bottom-row">
        <button class="gk-btn gk-space" onclick="insertGreekChar(' ')">·</button>
        <button class="gk-btn gk-backspace" onclick="insertGreekChar('⌫')">⌫</button>
        <button class="gk-btn gk-submit" onclick="checkTypingAnswer()">✓</button>
      </div>
    </div>
  `;
  const input = document.getElementById('typing-input');
  input.addEventListener('keydown', e => { if (e.key === 'Enter') checkTypingAnswer(); });
  setTimeout(() => input.focus(), 50);
}

function insertGreekChar(char) {
  const input = document.getElementById('typing-input');
  if (!input || lessonState.answered) return;
  if (char === '⌫') {
    input.value = input.value.slice(0, -1);
  } else {
    input.value += char;
  }
  input.focus();
}

function normalizeGreek(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function checkTypingAnswer() {
  if (lessonState.answered) return;
  const ex = lessonState.exercises[lessonState.currentIndex];
  const input = document.getElementById('typing-input');
  if (!input) return;
  const userAnswer = input.value.trim();
  if (!userAnswer) { input.classList.add('typing-empty'); setTimeout(() => input.classList.remove('typing-empty'), 400); return; }

  lessonState.answered = true;
  input.disabled = true;

  const footer = document.getElementById('lesson-footer');
  const feedback = document.getElementById('feedback-message');
  const isCorrect = normalizeGreek(userAnswer) === normalizeGreek(ex.correctAnswer);
  if (ex.verb?.id) srsRate(ex.verb.id, isCorrect);

  if (isCorrect) {
    lessonState.correct++;
    lessonState.xpEarned += XP_PER_CORRECT;
    document.getElementById('lesson-xp').textContent = lessonState.xpEarned;
    feedback.textContent = randomCorrectPhrase();
    feedback.className = 'feedback-message correct';
    footer.className = 'lesson-footer correct-footer';
    input.classList.add('typing-correct');
    playSound('correct');
  } else {
    lessonState.hearts--;
    renderHearts();
    feedback.innerHTML = `Правильно: <strong>${ex.correctAnswer}</strong>`;
    feedback.className = 'feedback-message wrong';
    footer.className = 'lesson-footer wrong-footer';
    input.classList.add('typing-wrong');
    if (ex.verb?.id) state.errorLog[ex.verb.id] = (state.errorLog[ex.verb.id] || 0) + 1;
    playSound('wrong');
  }

  footer.style.display = 'flex';
  document.getElementById('continue-btn').textContent = lessonState.hearts <= 0 ? 'Завершить урок' : 'Продолжить';
}

function renderHearts() {
  const h = lessonState.hearts;
  document.getElementById('hearts-display').innerHTML =
    '<span class="heart-icon">❤️</span>'.repeat(h) +
    '<span class="heart-icon dead">🖤</span>'.repeat(3 - h);
}

function selectAnswer(selected, correct, verbId) {
  if (lessonState.answered) return;
  lessonState.answered = true;

  const buttons = document.querySelectorAll('#options-grid .option-btn');
  const footer = document.getElementById('lesson-footer');
  const feedback = document.getElementById('feedback-message');

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add('correct');
  });

  const isCorrect = selected === correct;
  if (verbId) srsRate(verbId, isCorrect);
  if (isCorrect) {
    lessonState.correct++;
    lessonState.xpEarned += XP_PER_CORRECT;
    document.getElementById('lesson-xp').textContent = lessonState.xpEarned;
    feedback.textContent = randomCorrectPhrase();
    feedback.className = 'feedback-message correct';
    footer.className = 'lesson-footer correct-footer';
    buttons.forEach(btn => { if (btn.textContent === selected) btn.classList.add('correct'); });
    playSound('correct');
  } else {
    lessonState.hearts--;
    renderHearts();
    feedback.innerHTML = `Правильно: <strong>${correct}</strong>`;
    feedback.className = 'feedback-message wrong';
    footer.className = 'lesson-footer wrong-footer';
    buttons.forEach(btn => { if (btn.textContent === selected) btn.classList.add('wrong'); });
    if (verbId) {
      state.errorLog[verbId] = (state.errorLog[verbId] || 0) + 1;
    }
    playSound('wrong');
  }

  footer.style.display = 'flex';
  document.getElementById('continue-btn').textContent = lessonState.hearts <= 0 ? 'Завершить урок' : 'Продолжить';
}

function nextExercise() {
  if (lessonState.hearts <= 0) { completeLesson(); return; }
  lessonState.currentIndex++;
  if (lessonState.currentIndex >= EXERCISES_PER_LESSON) completeLesson();
  else renderExercise();
}

function completeLesson() {
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  state.dailyXp += lessonState.xpEarned;
  state.totalXp += lessonState.xpEarned;
  state.level = Math.floor(state.totalXp / 500) + 1;
  state.lessonsCompleted++;
  const isPerfect = lessonState.hearts === 3 && lessonState.correct === EXERCISES_PER_LESSON;
  if (lessonState.isWeakMode) {
    // Clear errors for verbs that were practiced
    const practicedIds = [...new Set(lessonState.exercises.filter(e => e.verb).map(e => e.verb.id))];
    practicedIds.forEach(id => { delete state.errorLog[id]; });
  }
  if (!lessonState.isWeakMode && !lessonState.isSrsMode) {
    const mods = getLessonModules();
    state.currentLesson = Math.min((state.currentLesson || 1) + 1, mods.length);
  }
  saveState();
  checkAchievements({ perfectLesson: isPerfect, weakMode: lessonState.isWeakMode });
  createPost('lesson_complete', {
    isPerfect,
    hearts: lessonState.hearts,
    correct: lessonState.correct,
    total: EXERCISES_PER_LESSON,
    xp: lessonState.xpEarned,
    streak: state.streak
  });

  const acc = lessonState.correct / EXERCISES_PER_LESSON;
  const stars = (lessonState.hearts === 3 && acc === 1) ? '⭐⭐⭐' : (lessonState.hearts >= 2 && acc >= 0.7) ? '⭐⭐' : lessonState.hearts >= 1 ? '⭐' : '😅';

  document.getElementById('complete-stars').textContent = stars;
  document.getElementById('complete-xp').textContent = `+${lessonState.xpEarned}`;
  document.getElementById('complete-correct').textContent = `${lessonState.correct}/${EXERCISES_PER_LESSON}`;
  document.getElementById('complete-hearts').textContent = lessonState.hearts;
  document.getElementById('complete-streak').textContent = state.streak;
  document.getElementById('complete-goal-msg').style.display = state.dailyXp >= state.dailyGoal ? 'block' : 'none';
  showScreen('screen-complete');
}

function randomCorrectPhrase() {
  return ['¡Correcto! Правильно!', '¡Muy bien! Молодец!', '¡Perfecto! Отлично!', '¡Genial! Прекрасно!', '¡Excelente!'][Math.floor(Math.random() * 5)];
}

// ============================================================
// TTS (TEXT-TO-SPEECH)
// ============================================================
function speakGreek(text, event) {
  if (event) event.stopPropagation();
  if (!('speechSynthesis' in window)) return;
  const doSpeak = () => {
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'fr-FR';
    utt.rate = 0.85;
    utt.pitch = 1;
    speechSynthesis.speak(utt);
  };
  if (speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    let fired = false;
    const go = () => { if (!fired) { fired = true; doSpeak(); } };
    speechSynthesis.addEventListener('voiceschanged', go, { once: true });
    setTimeout(go, 500);
  }
}

// ============================================================
// SPACED REPETITION (SRS)
// ============================================================
function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function srsRate(verbId, isCorrect) {
  if (!state.srs) state.srs = {};
  const card = state.srs[verbId] || { interval: 0, ef: 2.5 };
  if (isCorrect) {
    if (card.interval === 0)      card.interval = 1;
    else if (card.interval === 1) card.interval = 4;
    else if (card.interval < 10)  card.interval = Math.round(card.interval * card.ef);
    else                          card.interval = Math.round(card.interval * card.ef);
    card.ef = Math.min(3.0, (card.ef || 2.5) + 0.1);
  } else {
    card.interval = 1;
    card.ef = Math.max(1.3, (card.ef || 2.5) - 0.2);
  }
  const due = new Date();
  due.setDate(due.getDate() + card.interval);
  card.due = due.toISOString().split('T')[0];
  state.srs[verbId] = card;
}

function getSrsDueVerbs() {
  if (!state.srs) return [];
  const today = todayStr();
  return VERBS_ONLY.filter(v => state.srs[v.id]?.due <= today);
}

function getSrsDueCount() {
  return getSrsDueVerbs().length;
}

function renderSrsStats() {
  if (!state.srs) state.srs = {};
  const total = VERBS_ONLY.length;
  const studied = Object.keys(state.srs).length;
  const dueCount = getSrsDueCount();
  const newCount = total - studied;
  const knownCount = studied - dueCount;
  return `
    <div class="srs-stats-grid">
      <div class="srs-stat srs-new"><span class="srs-stat-val">${newCount}</span><span class="srs-stat-lbl">Новых</span></div>
      <div class="srs-stat srs-due"><span class="srs-stat-val">${dueCount}</span><span class="srs-stat-lbl">К повторению</span></div>
      <div class="srs-stat srs-known"><span class="srs-stat-val">${knownCount}</span><span class="srs-stat-lbl">Изучено</span></div>
    </div>
    <div class="srs-bar-wrap">
      <div class="srs-bar" style="background:#e5e5e5; border-radius:8px; overflow:hidden; height:10px; margin-top:10px;">
        <div style="height:100%; width:${Math.round(knownCount/total*100)}%; background:#58CC02; display:inline-block; float:left;"></div>
        <div style="height:100%; width:${Math.round(dueCount/total*100)}%; background:#FF9600; display:inline-block; float:left;"></div>
      </div>
    </div>
    <div style="font-size:12px; color:#999; margin-top:6px;">${studied} из ${total} глаголов изучалось</div>
  `;
}

function buildSrsPool() {
  if (!state.srs) state.srs = {};
  const today = todayStr();
  const pool = [];
  VERBS_ONLY.forEach(v => {
    const card = state.srs[v.id];
    if (!card) {
      // Новый — среднее: 2x
      pool.push(v, v);
    } else if (card.due <= today) {
      // К повторению — высокий приоритет: 4x
      pool.push(v, v, v, v);
    } else {
      // Известный, не пора — низкий: 1x
      pool.push(v);
    }
  });
  return pool;
}

function startSrsLesson() {
  const dueVerbs = getSrsDueVerbs();
  if (dueVerbs.length === 0) return;
  const pool = dueVerbs.length >= 2 ? dueVerbs : null;
  lessonState = {
    exercises: generateLesson(pool),
    currentIndex: 0, hearts: 3, xpEarned: 0, correct: 0,
    answered: false, isWeakMode: false, isSrsMode: true
  };
  showScreen('screen-lesson');
  renderExercise();
}

// ============================================================
// ACHIEVEMENTS
// ============================================================
let achToastQueue = [];

function checkAchievements(ctx = {}) {
  if (!state.achievements) state.achievements = [];
  const conditions = {
    'first_lesson':   state.lessonsCompleted >= 1,
    'perfect_lesson': ctx.perfectLesson === true,
    'lessons_5':      state.lessonsCompleted >= 5,
    'lessons_10':     state.lessonsCompleted >= 10,
    'lessons_30':     state.lessonsCompleted >= 30,
    'streak_3':       state.streak >= 3,
    'streak_7':       state.streak >= 7,
    'streak_30':      state.streak >= 30,
    'scenario_first': state.scenariosCompleted.length >= 1,
    'scenarios_all':  state.scenariosCompleted.length >= SCENARIOS.length,
    'nie_master':     state.scenariosCompleted.includes('prefecture'),
    'vocab_master':   Object.values(state.vocabProgress || {}).reduce((s, a) => s + a.length, 0) >= 200,
    'weak_conquered': ctx.weakMode === true,
    'xp_500':         state.totalXp >= 500,
    'xp_2000':        state.totalXp >= 2000,
    'level_5':        state.level >= 5,
  };
  const newlyUnlocked = [];
  for (const [id, met] of Object.entries(conditions)) {
    if (met && !state.achievements.includes(id)) {
      state.achievements.push(id);
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) newlyUnlocked.push(ach);
    }
  }
  if (newlyUnlocked.length > 0) {
    saveState();
    newlyUnlocked.forEach(a => {
      achToastQueue.push(a);
      createPost('achievement', { icon: a.icon, title: a.title, desc: a.desc });
    });
    if (achToastQueue.length === newlyUnlocked.length) processAchToast();
  }

  // Streak milestones
  const streakMilestones = [3, 7, 14, 30, 60, 100];
  if (streakMilestones.includes(state.streak)) {
    const key = `streak_posted_${state.streak}`;
    if (!state[key]) {
      state[key] = true;
      saveState();
      createPost('streak', { streak: state.streak });
    }
  }
}

function processAchToast() {
  if (!achToastQueue.length) return;
  const ach = achToastQueue[0];
  const toast = document.getElementById('achievement-toast');
  document.getElementById('toast-icon').textContent = ach.icon;
  document.getElementById('toast-title').textContent = ach.title;
  document.getElementById('toast-desc').textContent = ach.desc;
  toast.classList.add('show');
  playSound('correct');
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      achToastQueue.shift();
      processAchToast();
    }, 500);
  }, 3200);
}

function showAchievements() {
  if (!state.achievements) state.achievements = [];
  const unlocked = state.achievements.length;
  const total = ACHIEVEMENTS.length;
  document.getElementById('ach-badge').textContent = `${unlocked}/${total}`;

  const container = document.getElementById('achievements-container');
  const byCategory = {};
  ACHIEVEMENTS.forEach(a => {
    if (!byCategory[a.category]) byCategory[a.category] = [];
    byCategory[a.category].push(a);
  });

  container.innerHTML = Object.entries(byCategory).map(([cat, achs]) => `
    <div class="ach-category">
      <div class="ach-category-title">${cat}</div>
      ${achs.map(a => {
        const isUnlocked = state.achievements.includes(a.id);
        return `
        <div class="ach-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="ach-icon">${isUnlocked ? a.icon : '🔒'}</div>
          <div class="ach-info">
            <div class="ach-title">${a.title}</div>
            <div class="ach-desc">${a.desc}</div>
          </div>
          ${isUnlocked ? '<div class="ach-check">✓</div>' : ''}
        </div>`;
      }).join('')}
    </div>
  `).join('');

  showScreen('screen-achievements');
}

// ============================================================
// SOUND
// ============================================================
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.1);
    }
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {}
}

// ============================================================
// КАРТОЧКИ (флеш-карты) — порт из IziSerb/IziGreek
// ============================================================
// Склонение русских существительных по числу (1 слово / 2 слова / 5 слов).
function pluralRu(n, forms) {
  if (n % 100 >= 11 && n % 100 <= 19) return forms[2];
  const r = n % 10;
  if (r === 1) return forms[0];
  if (r >= 2 && r <= 4) return forms[1];
  return forms[2];
}
// Пропускать ли в контент. Гостю дан пробник, дальше — окно с объяснением.
// Прогресс гостя живёт в localStorage и переносится в аккаунт при входе.
function trialGate() {
  // __iziNativeSubscription — подписка Apple: гость без аккаунта тоже может её иметь,
  // а onAuthStateChanged гостю сбрасывает hasSubscription в false → без этой проверки
  // оплативший гость после перезапуска упрётся в пробник.
  if (hasSubscription || window.__iziNativeSubscription === true) return true;
  if ((state.lessonsCompleted || 0) < TRIAL_LESSONS) return true;
  showTrialModal();
  return false;
}

function showTrialModal() {
  const cta = document.getElementById('trial-cta');
  // На нативе логин для покупки не нужен → «Выбрать план» и гостю.
  if (cta) cta.textContent = (currentUser || isNativeApp()) ? 'Выбрать план' : 'Войти и открыть доступ';
  const m = document.getElementById('trial-modal');
  if (m) m.style.display = 'flex';
}

function dismissTrialModal() {
  const m = document.getElementById('trial-modal');
  if (m) m.style.display = 'none';
}

function trialUpgrade() {
  dismissTrialModal();
  if (currentUser || isNativeApp()) {
    // Вошёл ИЛИ натив-гость → сразу планы. На нативе RevenueCat покажет цены и
    // оформит Apple-триал без Firebase-логина.
    showPaywall();
  } else {
    pendingUpgrade = true;  // веб-гость — сперва вход
    showLoginPromo();
  }
}

// Кнопка возврата на главную — только гостю с уже пройденным онбордингом
// (на самом первом запуске уходить с экрана входа некуда).
function updateLoginBackBtn() {
  const back = document.getElementById('login-back-btn');
  if (back) back.style.display = state.onboardingDone ? 'block' : 'none';
}

function showLoginPromo() {
  const sub = document.querySelector('#screen-login .login-subtitle');
  if (sub) sub.textContent = 'Бесплатные уроки пройдены. Войди, чтобы продолжить и сохранить прогресс.';
  updateLoginBackBtn();
  showScreen('screen-login');
}

// Что показываем гостю, а что вошедшему.
function updateGuestUi() {
  const isGuest = !currentUser;
  const loginBtn = document.getElementById('guest-login-btn');
  const avatarBtn = document.getElementById('user-avatar-btn');
  if (loginBtn) loginBtn.style.display = isGuest ? 'inline-flex' : 'none';
  if (avatarBtn) avatarBtn.style.display = isGuest ? 'none' : 'inline-flex';
  const pwSignout = document.getElementById('paywall-signout-btn');
  if (pwSignout) pwSignout.style.display = isGuest ? 'none' : '';
  const skip = document.getElementById('paywall-skip-btn');
  if (skip) skip.style.display = isGuest ? 'block' : 'none';
}

const FC_BATCH = 10; // пауза «продолжим/хватит» каждые 10 слов
let fcState = {
  catId: null, cat: null, dir: 'el2ru', mode: 'vote',
  queue: [], words: [], index: 0, know: 0, dont: 0, revealed: false, currentWord: null,
  viewTimer: null, viewPlaying: false, viewSpeed: 1, resume: false,
};

function showFlashBreak() {
  stopFlashView();
  document.getElementById('fc-break-count').textContent = fcState.index;
  document.getElementById('fc-break-modal').style.display = 'flex';
  try { playSound('complete'); } catch (e) {}
}
function continueFlashBatch() {
  document.getElementById('fc-break-modal').style.display = 'none';
  fcState.resume = true;
  if (fcState.mode === 'view') {
    fcState.viewPlaying = true;
    document.getElementById('fc-view-play').textContent = '⏸';
    renderFlashViewCard();
  } else {
    renderFlashVote();
  }
}
function endFlashSession() {
  document.getElementById('fc-break-modal').style.display = 'none';
  stopFlashView();
  showFlashDeck(fcState.catId);
}

function fcCat(id) { return VOCAB_CATEGORIES.find(c => c.id === id); }
function fcKnownSet(catId) {
  if (!state.flashProgress) state.flashProgress = {};
  if (!state.flashProgress[catId]) state.flashProgress[catId] = [];
  return state.flashProgress[catId];
}

function showFlashcards() {
  document.getElementById('fc-categories').innerHTML = VOCAB_CATEGORIES.map(cat => {
    const known = fcKnownSet(cat.id).length;
    const total = cat.words.length;
    const pct = total ? Math.round(known / total * 100) : 0;
    return `
      <button class="fc-cat-card" onclick="showFlashDeck('${cat.id}')">
        <div class="fc-cat-pct">${pct}%</div>
        <div class="fc-cat-body">
          <div class="fc-cat-title">${cat.emoji || '🃏'} ${cat.title}</div>
          <div class="fc-cat-sub">${total} ${pluralRu(total, ['слово', 'слова', 'слов'])}</div>
        </div>
        <div class="fc-cat-arrow">›</div>
      </button>`;
  }).join('');
  showScreen('screen-flashcards');
}

function showFlashDeck(catId) {
  const cat = fcCat(catId);
  if (!cat) return;
  fcState.catId = catId;
  fcState.cat = cat;
  document.getElementById('fc-deck-title').textContent = `${cat.emoji || '🃏'} ${cat.title}`;
  document.getElementById('fc-wordlist').innerHTML = cat.words.map(w => `
    <div class="fc-word-row">
      <div class="fc-word-el">${w.greek}${w.transcription ? ` <span class="fc-word-tr">[${w.transcription}]</span>` : ''}</div>
      <div class="fc-word-ru">${w.translation}</div>
    </div>`).join('');
  showScreen('screen-fc-deck');
}

function openFlashDirection() { document.getElementById('fc-direction-modal').style.display = 'flex'; }
function closeFlashDirection() { document.getElementById('fc-direction-modal').style.display = 'none'; }

// --- Флеш-карты: голосование Знаю / Не знаю ---
function startFlashVote(dir) {
  closeFlashDirection();
  if (!trialGate()) return;
  const cat = fcState.cat; if (!cat) return;
  fcState.mode = 'vote';
  fcState.dir = dir;
  fcState.resume = false;
  fcState.queue = shuffle(cat.words);
  fcState.index = 0;
  fcState.know = 0;
  fcState.dont = 0;
  // вернуть кнопки, если их скрыл экран «Готово»
  document.querySelector('#screen-fc-vote .fc-vote-actions').style.display = '';
  document.querySelector('#screen-fc-vote .fc-vote-stats').style.display = '';
  document.querySelector('#screen-fc-vote .fc-skip').style.display = '';
  document.getElementById('fc-vote-title').textContent = `${cat.emoji || '🃏'} ${cat.title}`;
  renderFlashVote();
  showScreen('screen-fc-vote');
}

function renderFlashVote() {
  const total = fcState.queue.length;
  if (fcState.index >= total) { finishFlashVote(); return; }
  const w = fcState.queue[fcState.index];
  fcState.currentWord = w;
  fcState.revealed = false;
  const front = fcState.dir === 'el2ru' ? w.greek : w.translation;
  const back = fcState.dir === 'el2ru' ? w.translation : w.greek;
  document.getElementById('fc-vote-tag').textContent = fcState.dir === 'el2ru' ? 'СЛОВО' : 'ПЕРЕВОД';
  document.getElementById('fc-vote-front').textContent = front;
  document.getElementById('fc-vote-front-tr').textContent = (fcState.dir === 'el2ru' && w.transcription) ? `[${w.transcription}]` : '';
  const backEl = document.getElementById('fc-vote-back');
  backEl.textContent = back;
  backEl.style.display = 'none';
  const hint = document.getElementById('fc-vote-hint');
  hint.textContent = 'Нажми, чтобы увидеть перевод';
  hint.style.display = '';
  updateFlashVoteStats();
}

function revealFlashVote() {
  if (fcState.revealed) return;
  fcState.revealed = true;
  document.getElementById('fc-vote-back').style.display = '';
  document.getElementById('fc-vote-hint').style.display = 'none';
}

function updateFlashVoteStats() {
  document.getElementById('fc-stat-total').textContent = fcState.queue.length;
  document.getElementById('fc-stat-know').textContent = fcState.know;
  document.getElementById('fc-stat-dont').textContent = fcState.dont;
}

function answerFlashVote(known) {
  const w = fcState.queue[fcState.index];
  if (!w) return;
  const set = fcKnownSet(fcState.catId);
  if (known) {
    fcState.know++;
    if (!set.includes(w.greek)) set.push(w.greek);
  } else {
    fcState.dont++;
    const i = set.indexOf(w.greek); if (i >= 0) set.splice(i, 1);
    fcState.queue.push(w); // незнакомые копятся — повторим в конце
  }
  saveState();
  fcState.index++;
  afterVoteAdvance();
}

function afterVoteAdvance() {
  // Пауза каждые FC_BATCH слов: «продолжим или на сегодня хватит?»
  if (fcState.index > 0 && fcState.index % FC_BATCH === 0 && fcState.index < fcState.queue.length) {
    showFlashBreak();
    return;
  }
  renderFlashVote();
}

function skipFlashVote() {
  const w = fcState.queue[fcState.index];
  if (w) fcState.queue.push(w);
  fcState.index++;
  afterVoteAdvance();
}

function finishFlashVote() {
  const total = fcState.know + fcState.dont;
  document.getElementById('fc-vote-tag').textContent = '';
  document.getElementById('fc-vote-front').textContent = '🎉';
  document.getElementById('fc-vote-front-tr').textContent = '';
  document.getElementById('fc-vote-back').style.display = 'none';
  const hint = document.getElementById('fc-vote-hint');
  hint.style.display = '';
  hint.textContent = `Готово! Знаешь ${fcState.know} из ${total}`;
  document.querySelector('#screen-fc-vote .fc-vote-actions').style.display = 'none';
  document.querySelector('#screen-fc-vote .fc-vote-stats').style.display = 'none';
  document.querySelector('#screen-fc-vote .fc-skip').style.display = 'none';
  try { playSound('complete'); } catch (e) {}
}

// --- Просмотр: слово → перевод сам, с озвучкой ---
function startFlashView() {
  if (!trialGate()) return;
  const cat = fcState.cat; if (!cat) return;
  fcState.resume = false;
  fcState.mode = 'view';
  fcState.words = shuffle(cat.words);
  fcState.index = 0;
  fcState.viewSpeed = 1;
  fcState.viewPlaying = true;
  document.getElementById('fc-view-speed').textContent = '1.0x';
  document.getElementById('fc-view-play').textContent = '⏸';
  showScreen('screen-fc-view');
  renderFlashViewCard();
}

function renderFlashViewCard() {
  const w = fcState.words[fcState.index];
  if (!w) { stopFlashView(); showFlashDeck(fcState.catId); return; }
  // Пауза каждые FC_BATCH слов (кроме момента продолжения)
  if (!fcState.resume && fcState.index > 0 && fcState.index % FC_BATCH === 0) {
    showFlashBreak();
    return;
  }
  fcState.resume = false;
  fcState.currentWord = w;
  document.getElementById('fc-view-word').textContent = w.greek;
  document.getElementById('fc-view-tr').textContent = w.transcription || '';
  const tr = document.getElementById('fc-view-translation');
  tr.textContent = '';
  tr.style.opacity = '0';
  document.getElementById('fc-view-counter').textContent = `${fcState.index + 1}/${fcState.words.length}`;
  document.getElementById('fc-view-progress-fill').style.width = (fcState.index / fcState.words.length * 100) + '%';
  playFlashWord();
  scheduleFlashView();
}

function scheduleFlashView() {
  clearFlashViewTimers();
  if (!fcState.viewPlaying) return;
  const revealMs = 2200 / fcState.viewSpeed;
  const nextMs = 1600 / fcState.viewSpeed;
  fcState.viewTimer = setTimeout(() => {
    const tr = document.getElementById('fc-view-translation');
    const w = fcState.words[fcState.index];
    if (w) { tr.textContent = w.translation; tr.style.opacity = '1'; }
    fcState.viewTimer = setTimeout(() => {
      fcState.index++;
      renderFlashViewCard();
    }, nextMs);
  }, revealMs);
}

function clearFlashViewTimers() { if (fcState.viewTimer) { clearTimeout(fcState.viewTimer); fcState.viewTimer = null; } }

function toggleFlashView() {
  fcState.viewPlaying = !fcState.viewPlaying;
  document.getElementById('fc-view-play').textContent = fcState.viewPlaying ? '⏸' : '▶️';
  if (fcState.viewPlaying) scheduleFlashView(); else clearFlashViewTimers();
}

function cycleFlashSpeed() {
  const speeds = [1, 1.5, 2];
  const i = speeds.indexOf(fcState.viewSpeed);
  fcState.viewSpeed = speeds[(i + 1) % speeds.length];
  document.getElementById('fc-view-speed').textContent = fcState.viewSpeed.toFixed(1) + 'x';
  if (fcState.viewPlaying) scheduleFlashView();
}

function stopFlashView() { fcState.viewPlaying = false; clearFlashViewTimers(); }

function playFlashWord() {
  const w = fcState.currentWord;
  if (w) speakGreek(w.greek);
}

// ============================================================
// SCENARIOS
// ============================================================
function showScenarios() {
  // Описание собираем из данных, а не хардкодим: раньше там навсегда осталось
  // «8 реальных ситуаций», хотя сценариев стало 20 — и это попало в скриншот
  // для App Store.
  const desc = document.getElementById('scenarios-desc');
  if (desc) {
    const n = SCENARIOS.length;
    // без toLowerCase: иначе CAF превращается в «caf»
    const names = SCENARIOS.slice(0, 8).map(s => s.title.replace(/^\S+\s/, ''));
    desc.textContent = `${n} ${pluralRu(n, ['реальная ситуация','реальные ситуации','реальных ситуаций'])}: `
      + names.join(', ') + ' и другие.';
  }
  const container = document.getElementById('scenarios-list');
  container.innerHTML = SCENARIOS.map(s => {
    const done = state.scenariosCompleted.includes(s.id);
    return `
    <div class="scenario-card ${done ? 'done' : ''}" onclick="startScenario('${s.id}')">
      <div class="scenario-icon">${s.icon}</div>
      <div class="scenario-info">
        <div class="scenario-title">${s.title}</div>
        <div class="scenario-desc">${s.description}</div>
        <div class="scenario-meta">${s.steps.length} ${pluralRu(s.steps.length, ['шаг','шага','шагов'])} · ${s.steps.length * XP_PER_SCENARIO_STEP} XP</div>
      </div>
      <div class="scenario-arrow">${done ? '✅' : '→'}</div>
    </div>`;
  }).join('');
  showScreen('screen-scenarios');
}

function startScenario(id) {
  const scenario = SCENARIOS.find(s => s.id === id);
  if (!scenario) return;
  scenarioState = { scenarioId: id, currentStep: 0, score: 0, answered: false };
  renderScenarioStep(scenario, 0);
  showScreen('screen-scenario-detail');
}

function renderScenarioStep(scenario, stepIdx) {
  scenarioState.answered = false;
  const step = scenario.steps[stepIdx];
  const total = scenario.steps.length;

  document.getElementById('scenario-progress-fill').style.width = (stepIdx / total * 100) + '%';
  document.getElementById('scenario-step-counter').textContent = `${stepIdx + 1}/${total}`;
  document.getElementById('scenario-title-bar').textContent = scenario.title;

  const container = document.getElementById('scenario-step-container');
  container.innerHTML = `
    <div class="scenario-situation">${step.situation}</div>
    <div class="dialogue-card">
      <div class="dialogue-speaker">${step.speaker} говорит:</div>
      <div class="dialogue-greek-wrap">
        <div class="dialogue-greek">${step.greek}</div>
        <button class="speak-btn-lg" data-speak="${step.greek.replace(/"/g, '&quot;')}" onclick="speakGreek(this.dataset.speak)">🔊</button>
      </div>
      <div class="dialogue-transcription">${step.transcription}</div>
      <div class="dialogue-translation">${step.translation}</div>
    </div>
    <div class="scenario-question">${step.question}</div>
    <div class="scenario-options" id="scenario-options">
      ${step.options.map((opt, i) => `
        <button class="scenario-option-btn" onclick="selectScenarioAnswer(${i})">
          <div class="opt-greek">${opt.text}</div>
          <div class="opt-transcription">🔊 ${opt.transcription}</div>
          <div class="opt-translation">${opt.translation}</div>
        </button>
      `).join('')}
    </div>
    <div class="scenario-feedback" id="scenario-feedback" style="display:none"></div>
    <button class="btn-primary" id="scenario-next-btn" onclick="nextScenarioStep()" style="display:none;margin-top:16px">
      ${stepIdx < total - 1 ? 'Следующий шаг →' : 'Завершить сценарий'}
    </button>
  `;
}

function selectScenarioAnswer(optionIdx) {
  if (scenarioState.answered) return;
  scenarioState.answered = true;

  const scenario = SCENARIOS.find(s => s.id === scenarioState.scenarioId);
  const step = scenario.steps[scenarioState.currentStep];
  const option = step.options[optionIdx];

  const buttons = document.querySelectorAll('.scenario-option-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (step.options[i].correct) btn.classList.add('correct');
  });

  const feedback = document.getElementById('scenario-feedback');
  if (option.correct) {
    scenarioState.score++;
    buttons[optionIdx].classList.add('correct');
    feedback.className = 'scenario-feedback correct';
    feedback.textContent = step.correctFeedback;
    playSound('correct');
  } else {
    buttons[optionIdx].classList.add('wrong');
    feedback.className = 'scenario-feedback wrong';
    feedback.textContent = step.wrongFeedback;
    playSound('wrong');
  }

  feedback.style.display = 'block';
  document.getElementById('scenario-next-btn').style.display = 'block';
}

function nextScenarioStep() {
  const scenario = SCENARIOS.find(s => s.id === scenarioState.scenarioId);
  scenarioState.currentStep++;

  if (scenarioState.currentStep >= scenario.steps.length) {
    completeScenario(scenario);
  } else {
    renderScenarioStep(scenario, scenarioState.currentStep);
  }
}

function completeScenario(scenario) {
  const xp = scenarioState.score * XP_PER_SCENARIO_STEP;
  state.totalXp += xp;
  state.dailyXp += xp;
  state.level = Math.floor(state.totalXp / 500) + 1;
  if (!state.scenariosCompleted.includes(scenario.id)) {
    state.scenariosCompleted.push(scenario.id);
  }
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();
  checkAchievements({});

  const total = scenario.steps.length;
  const pct = scenarioState.score / total;
  const stars = pct === 1 ? '⭐⭐⭐' : pct >= 0.67 ? '⭐⭐' : '⭐';

  document.getElementById('scenario-complete-icon').textContent = scenario.icon;
  document.getElementById('scenario-complete-title').textContent = `${scenario.title} пройден!`;
  document.getElementById('scenario-complete-stars').textContent = stars;
  document.getElementById('scenario-score').textContent = `${scenarioState.score}/${total}`;
  document.getElementById('scenario-xp').textContent = `+${xp} XP`;
  document.getElementById('scenario-complete-msg').textContent =
    pct === 1 ? 'Идеально! Ты готов к этой ситуации в реальной жизни.' :
    pct >= 0.67 ? 'Хорошо! Ещё немного практики — и будет идеально.' :
    'Не страшно. Повтори сценарий — с каждым разом лучше.';

  showScreen('screen-scenario-complete');
}

// ============================================================
// VERB TABLE
// ============================================================
function renderVerbCards(verbs) {
  const pronounsRu = ['я', 'ты', 'он/она', 'мы', 'вы', 'они'];
  const container = document.getElementById('verb-table-container');
  document.getElementById('verb-count-badge').textContent = verbs.length;

  if (verbs.length === 0) {
    container.innerHTML = '<div class="no-results">Ничего не найдено 🤷</div>';
    return;
  }

  container.innerHTML = verbs.map(verb => `
    <div class="verb-card" onclick="this.classList.toggle('expanded')">
      <div class="verb-title">
        <div>
          <span class="verb-infinitive">${verb.infinitive}</span>
          <span class="verb-transcription"> [${verb.transcription}]</span>
        </div>
        <span class="verb-translation-badge">${verb.translation}</span>
      </div>
      ${verb.note ? `<div class="verb-note">${verb.note}</div>` : ''}
      <div class="verb-example">
        <button class="speak-btn" data-speak="${verb.example.greek}" onclick="speakGreek(this.dataset.speak, event)" title="Произнести">🔊</button>
        <span class="example-greek">${verb.example.greek}</span>
        <span class="example-ru">${verb.example.ru}</span>
      </div>
      <div class="verb-conjugation">
        ${[
          { label: 'Настоящее', forms: verb.present },
          { label: 'Прошедшее (passé composé)', forms: verb.preterite },
          { label: 'Будущее (futur simple)', forms: verb.future },
        ].filter(t => t.forms).map(t => `
          <div class="conj-tense-label">${t.label}</div>
          ${PRONOUNS.map((p, i) => `
            <div class="conj-row">
              <span class="conj-pronoun">${pronounsRu[i]}</span>
              <span class="conj-form conj-speakable" onclick="speakGreek('${frForm(p, t.forms[p]).replace(/'/g, "\\'")}', event)" title="Нажми — услышишь">${frForm(p, t.forms[p])}</span>
            </div>
          `).join('')}
        `).join('')}
      </div>
    </div>
  `).join('');
}

function filterVerbs(query) {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? VERBS_ONLY.filter(v =>
        v.infinitive.toLowerCase().includes(q) ||
        v.translation.toLowerCase().includes(q) ||
        Object.values(v.present).some(f => f.toLowerCase().includes(q))
      )
    : VERBS_ONLY;
  renderVerbCards(filtered);
}

function showVerbTable() {
  document.getElementById('verb-search').value = '';
  renderVerbCards(VERBS_ONLY);
  showScreen('screen-verbs');
}

// ============================================================
// PHRASES & EXPRESSIONS
// ============================================================
function showPhrases() {
  // Category pills
  const catsEl = document.getElementById('phrase-cats');
  catsEl.innerHTML = PHRASES.map(cat => `
    <button class="phrase-cat-pill" onclick="scrollToPhraseCat('${cat.id}')" style="border-color:${cat.color};color:${cat.color}">
      ${cat.icon} ${cat.category}
    </button>
  `).join('');

  // All phrases
  const container = document.getElementById('phrases-container');
  container.innerHTML = PHRASES.map(cat => `
    <div class="phrase-category-block" id="phrase-cat-${cat.id}">
      <div class="phrase-cat-header" style="border-color:${cat.color}">
        <span class="phrase-cat-icon">${cat.icon}</span>
        <span class="phrase-cat-title" style="color:${cat.color}">${cat.category}</span>
        <span class="phrase-cat-count">${cat.phrases.length}</span>
      </div>
      ${cat.phrases.map(p => `
        <div class="phrase-card">
          <div class="phrase-top">
            <div class="phrase-greek" data-speak="${p.greek.replace(/"/g,'&quot;')}"
                 onclick="speakGreek(this.dataset.speak)">${p.greek}</div>
            <button class="speak-btn" data-speak="${p.greek.replace(/"/g,'&quot;')}"
                    onclick="speakGreek(this.dataset.speak, event)">🔊</button>
          </div>
          <div class="phrase-transcription">${p.transcription}</div>
          <div class="phrase-translation">${p.translation}</div>
          ${p.note ? `<div class="phrase-note">${p.note}</div>` : ''}
        </div>
      `).join('')}
    </div>
  `).join('');

  // Reset search
  const si = document.getElementById('phrases-search');
  if (si) si.value = '';
  searchPhrases('');

  showScreen('screen-phrases');
}

function searchPhrases(query) {
  const q = query.trim().toLowerCase();
  const resultsEl = document.getElementById('phrases-search-results');
  const normalEl = document.getElementById('phrases-container');
  const catsEl = document.getElementById('phrase-cats');
  const descEl = document.getElementById('phrases-sub-desc');

  if (!q) {
    resultsEl.style.display = 'none';
    normalEl.style.display = '';
    catsEl.style.display = '';
    descEl.style.display = '';
    return;
  }

  normalEl.style.display = 'none';
  catsEl.style.display = 'none';
  descEl.style.display = 'none';
  resultsEl.style.display = '';

  const matches = [];
  PHRASES.forEach(cat => {
    cat.phrases.forEach(p => {
      if (
        p.greek.toLowerCase().includes(q) ||
        p.transcription.toLowerCase().includes(q) ||
        p.translation.toLowerCase().includes(q) ||
        (p.note && p.note.toLowerCase().includes(q))
      ) {
        matches.push({ ...p, catIcon: cat.icon, catTitle: cat.category, catColor: cat.color });
      }
    });
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-empty">Ничего не найдено</div>`;
    return;
  }

  resultsEl.innerHTML = matches.map(p => `
    <div class="phrase-card">
      <div class="phrase-search-cat" style="color:${p.catColor}">${p.catIcon} ${p.catTitle}</div>
      <div class="phrase-top">
        <div class="phrase-greek" data-speak="${p.greek.replace(/"/g,'&quot;')}"
             onclick="speakGreek(this.dataset.speak)">${p.greek}</div>
        <button class="speak-btn" data-speak="${p.greek.replace(/"/g,'&quot;')}"
                onclick="speakGreek(this.dataset.speak, event)">🔊</button>
      </div>
      <div class="phrase-transcription">${p.transcription}</div>
      <div class="phrase-translation">${p.translation}</div>
      ${p.note ? `<div class="phrase-note">${p.note}</div>` : ''}
    </div>
  `).join('');
}

function scrollToPhraseCat(id) {
  const el = document.getElementById('phrase-cat-' + id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Highlight active pill
  document.querySelectorAll('.phrase-cat-pill').forEach(p => p.classList.remove('active'));
  const pills = document.querySelectorAll('.phrase-cat-pill');
  const idx = PHRASES.findIndex(c => c.id === id);
  if (pills[idx]) pills[idx].classList.add('active');
}

// ============================================================
// DAILY GOAL SETTINGS
// ============================================================
function showGoalModal() {
  document.querySelectorAll('.goal-option-btn').forEach(btn => {
    const isActive = parseInt(btn.dataset.xp) === state.dailyGoal;
    btn.classList.toggle('active', isActive);
  });
  document.getElementById('goal-modal').style.display = 'flex';
}

function hideGoalModal() {
  document.getElementById('goal-modal').style.display = 'none';
}

function setDailyGoal(xp) {
  state.dailyGoal = xp;
  saveState();
  renderHome();
  hideGoalModal();
}

// ============================================================
// 30-DAY PLAN
// ============================================================
function showPlan() {
  const lessonsNeededPerDay = 1;
  const daysUnlocked = Math.min(30, state.lessonsCompleted + state.scenariosCompleted.length + 1);

  const typeIcons = { vocab: '📖', grammar: '⚙️', scenario: '🎭', review: '🔄', audit: '📊' };
  const typeLabels = { vocab: 'Лексика', grammar: 'Грамматика', scenario: 'Сценарий', review: 'Повторение', audit: 'Аудит' };

  const container = document.getElementById('plan-container');
  container.innerHTML = PLAN_30.map(week => `
    <div class="week-block">
      <div class="week-header" style="border-color:${week.color}">
        <span class="week-number" style="color:${week.color}">Неделя ${week.week}</span>
        <span class="week-theme">${week.theme}</span>
      </div>
      ${week.days.map(d => {
        const isUnlocked = d.day <= daysUnlocked;
        const isDone = d.day < daysUnlocked;
        return `
        <div class="plan-day ${isDone ? 'done' : ''} ${!isUnlocked ? 'locked' : ''}">
          <div class="plan-day-num" style="background:${isDone ? week.color : isUnlocked ? 'white' : '#e5e5e5'};color:${isDone ? 'white' : '#3c3c3c'}">${d.day}</div>
          <div class="plan-day-info">
            <div class="plan-day-topic">${d.topic}</div>
            <div class="plan-day-focus">${typeIcons[d.type]} ${typeLabels[d.type]} · ${d.focus}</div>
          </div>
          <div class="plan-day-status">${isDone ? '✅' : isUnlocked ? '▶' : '🔒'}</div>
        </div>`;
      }).join('')}
    </div>
  `).join('');

  showScreen('screen-plan');
}

// ============================================================
// AUDIT / PROGRESS
// ============================================================
function showAudit() {
  const container = document.getElementById('audit-container');

  const totalErrors = Object.values(state.errorLog).reduce((a, b) => a + b, 0);
  const weakVerbs = Object.entries(state.errorLog)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => {
      const verb = VERBS_ONLY.find(v => v.id === parseInt(id));
      return verb ? `<div class="weak-verb-row"><span class="wv-infinitive">${verb.infinitive}</span><span class="wv-translation">${verb.translation}</span><span class="wv-errors">${count} ошиб.</span></div>` : '';
    }).join('');

  const accuracy = state.lessonsCompleted > 0
    ? Math.round((1 - totalErrors / (state.lessonsCompleted * EXERCISES_PER_LESSON)) * 100)
    : 100;

  const daysToGoal = state.dailyGoal > 0
    ? Math.max(0, Math.ceil((state.dailyGoal - state.dailyXp) / XP_PER_CORRECT))
    : 0;

  container.innerHTML = `
    <div class="audit-grid">
      <div class="audit-stat">
        <div class="audit-stat-icon">⚡</div>
        <div class="audit-stat-value">${state.totalXp}</div>
        <div class="audit-stat-label">Всего XP</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">🔥</div>
        <div class="audit-stat-value">${state.streak}</div>
        <div class="audit-stat-label">Дней подряд</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">📝</div>
        <div class="audit-stat-value">${state.lessonsCompleted}</div>
        <div class="audit-stat-label">Уроков</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">🎭</div>
        <div class="audit-stat-value">${state.scenariosCompleted.length}/${SCENARIOS.length}</div>
        <div class="audit-stat-label">Сценариев</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">🎯</div>
        <div class="audit-stat-value">${accuracy}%</div>
        <div class="audit-stat-label">Точность</div>
      </div>
      <div class="audit-stat">
        <div class="audit-stat-icon">⭐</div>
        <div class="audit-stat-value">${state.level}</div>
        <div class="audit-stat-label">Уровень</div>
      </div>
    </div>

    <div class="audit-section">
      <div class="audit-section-title">📈 До следующего уровня</div>
      <div class="level-progress-bar">
        <div class="level-progress-fill" style="width:${((state.totalXp % 500) / 500 * 100)}%"></div>
      </div>
      <div class="level-progress-label">${state.totalXp % 500} / 500 XP до уровня ${state.level + 1}</div>
    </div>

    ${Object.keys(state.errorLog).length > 0 ? `
    <div class="audit-section">
      <div class="audit-section-title">⚠️ Слабые места — повтори эти глаголы</div>
      <div class="weak-verbs-list">${weakVerbs}</div>
    </div>` : `
    <div class="audit-section">
      <div class="audit-section-title">✅ Слабых мест нет — продолжай в том же духе!</div>
    </div>`}

    <div class="audit-section">
      <div class="audit-section-title">🧠 Интервальное повторение (SRS)</div>
      ${renderSrsStats()}
    </div>

    <div class="audit-section">
      <div class="audit-section-title">💡 Рекомендация тьютора</div>
      <div class="tutor-tip">${getTutorTip()}</div>
    </div>
  `;

  showScreen('screen-audit');
}

function getTutorTip() {
  if (state.lessonsCompleted === 0) return 'Начни с первого урока прямо сейчас! Каждый день — это шаг к свободному французскому. 🇫🇷';
  if (state.streak === 0) return 'Стрик сброшен. Помни: регулярность важнее интенсивности. 10 минут в день > 2 часа раз в неделю.';
  if (state.scenariosCompleted.length === 0) return 'Попробуй сценарий "В ресторане" или "В миграционной службе" — это практика для реальной жизни!';
  if (!state.scenariosCompleted.includes('prefecture')) return `Пройдено ${state.scenariosCompleted.length}/${SCENARIOS.length} сценариев. Сценарий "В миграционной службе" — один из самых важных. Пройди его!`;
  if (state.scenariosCompleted.length < SCENARIOS.length) return `Пройдено ${state.scenariosCompleted.length}/${SCENARIOS.length} сценариев. Попробуй аптеку, банк и рынок — реальные ситуации во Франции!`;
  return `Отлично! Все ${SCENARIOS.length} сценариев пройдены. Следующий шаг — говорить с носителями. Найди франкоговорящего собеседника и практикуй!`;
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ============================================================
// SCROLL TO TOP
// ============================================================
(function() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });
})();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// SUPPORT FORM
// ============================================================
function showSupportForm() {
  const modal = document.getElementById('support-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Pre-fill name/email from current user
  if (currentUser) {
    const nameEl = document.getElementById('sf-name');
    const emailEl = document.getElementById('sf-email');
    if (nameEl && !nameEl.value) nameEl.value = currentUser.displayName || '';
    if (emailEl && !emailEl.value) emailEl.value = currentUser.email || '';
  }
}

function hideSupportForm() {
  document.getElementById('support-modal').style.display = 'none';
  document.body.style.overflow = '';
  // Reset form
  document.getElementById('support-form-wrap').style.display = 'block';
  document.getElementById('support-success').style.display = 'none';
}

function showPwaGuide() {
  document.getElementById('pwa-modal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hidePwaGuide() {
  document.getElementById('pwa-modal').style.display = 'none';
  document.body.style.overflow = '';
}

async function submitSupportForm() {
  const name    = document.getElementById('sf-name').value.trim();
  const email   = document.getElementById('sf-email').value.trim();
  const phone   = document.getElementById('sf-phone').value.trim();
  const subject = document.getElementById('sf-subject').value;
  const message = document.getElementById('sf-message').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Пожалуйста, заполните все обязательные поля.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Введите корректный email.');
    return;
  }

  const btn = document.querySelector('.support-submit-btn');
  btn.disabled = true;
  btn.textContent = 'Отправляем...';

  try {
    const res = await fetch('https://izifrench-webhook.vercel.app/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message,
        userId: currentUser?.uid || '' })
    });
    if (!res.ok) throw new Error('Server error ' + res.status);
    document.getElementById('support-form-wrap').style.display = 'none';
    document.getElementById('support-success').style.display = 'block';
  } catch (e) {
    console.error('Support form error:', e);
    alert('Не удалось отправить. Попробуйте позже или напишите напрямую: support@izifrench.com');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Отправить';
  }
}

// ============================================================
// SOCIAL FEED
// ============================================================
let feedUnsubscribe = null;

function showFeed() {
  showScreen('screen-feed');
  hideFeedBadge();
  renderComposerAvatar();
  initComposer();
  loadFeed();
}

function initComposer() {
  const ta = document.getElementById('composer-text');
  if (!ta || ta._composerInited) return;
  ta._composerInited = true;
  ta.addEventListener('input', onComposerInput);
}

function renderComposerAvatar() {
  const wrap = document.getElementById('composer-avatar-wrap');
  if (!wrap || !currentUser) return;
  if (currentUser.photoURL) {
    wrap.innerHTML = `<img class="feed-avatar" src="${currentUser.photoURL}" alt="" style="margin-top:4px">`;
  } else {
    wrap.innerHTML = `<div class="feed-avatar-initials" style="margin-top:4px">${getInitials(currentUser.displayName)}</div>`;
  }
}

function onComposerInput() {
  const ta = document.getElementById('composer-text');
  const counter = document.getElementById('composer-char-count');
  const btn = document.getElementById('composer-submit');
  const len = ta.value.length;
  counter.textContent = len > 0 ? `${len} / 1000` : '';
  counter.className = 'composer-char-count' + (len >= 1000 ? ' limit' : len >= 800 ? ' warn' : '');
  btn.disabled = len === 0;
}

async function submitPost() {
  if (!currentUser) return;
  const ta = document.getElementById('composer-text');
  const text = ta.value.trim();
  if (!text) return;

  const btn = document.getElementById('composer-submit');
  btn.classList.add('loading');
  btn.textContent = 'Публикуем...';

  try {
    await db.collection('posts').add({
      uid: currentUser.uid,
      displayName: currentUser.displayName || 'Ученик',
      photoURL: currentUser.photoURL || null,
      type: 'user_post',
      emoji: '✍️',
      title: text,
      subtitle: '',
      imageUrl: null,
      chips: [],
      likes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Reset composer
    ta.value = '';
    onComposerInput();
  } catch (e) {
    console.error('submitPost error:', e);
    alert('Не удалось опубликовать. Попробуй ещё раз.');
  } finally {
    btn.classList.remove('loading');
    btn.textContent = 'Опубликовать';
  }
}

function hideFeedBadge() {
  document.getElementById('feed-nav-badge').style.display = 'none';
}

function showFeedBadge() {
  const badge = document.getElementById('feed-nav-badge');
  const currentScreen = document.querySelector('.screen.active');
  if (currentScreen && currentScreen.id === 'screen-feed') return;
  badge.style.display = 'block';
}

function loadFeed() {
  const container = document.getElementById('feed-container');
  if (!container) return;

  if (feedUnsubscribe) {
    feedUnsubscribe();
    feedUnsubscribe = null;
  }

  container.innerHTML = '<div class="feed-loading">Загружаем ленту...</div>';

  feedUnsubscribe = db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(50)
    .onSnapshot(snapshot => {
      // Note: requires Firestore index on createdAt desc — auto-created on first query
      if (snapshot.empty) {
        container.innerHTML = `
          <div class="feed-empty">
            <div class="feed-empty-icon">🌱</div>
            <div class="feed-empty-text">Лента пока пустая</div>
            <div class="feed-empty-sub">Пройди урок или квиз — и твой результат появится здесь!</div>
          </div>`;
        return;
      }

      const isFirstLoad = container.querySelector('.feed-loading');
      const newPostIds = new Set();
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added' && !isFirstLoad) newPostIds.add(change.doc.id);
      });

      if (newPostIds.size > 0 && !isFirstLoad) showFeedBadge();

      container.innerHTML = '';
      snapshot.forEach(doc => {
        container.appendChild(renderFeedCard(doc.id, doc.data()));
      });
    }, err => {
      console.error('Feed error:', err);
      // Fallback: load without ordering (index may not exist yet)
      db.collection('posts').limit(50).get().then(snap => {
        if (snap.empty) {
          container.innerHTML = `<div class="feed-empty"><div class="feed-empty-icon">🌱</div><div class="feed-empty-text">Лента пока пустая</div><div class="feed-empty-sub">Пройди урок или квиз!</div></div>`;
          return;
        }
        const docs = [];
        snap.forEach(d => docs.push({ id: d.id, data: d.data() }));
        docs.sort((a, b) => (b.data.createdAt?.seconds || 0) - (a.data.createdAt?.seconds || 0));
        container.innerHTML = '';
        docs.forEach(d => container.appendChild(renderFeedCard(d.id, d.data)));
      }).catch(() => {
        container.innerHTML = '<div class="feed-loading">Не удалось загрузить ленту</div>';
      });
    });
}

function renderFeedCard(docId, post) {
  const card = document.createElement('div');
  card.className = 'feed-card';
  card.dataset.postId = docId;

  const myUid = currentUser?.uid;
  const likes = post.likes || [];
  const isLiked = likes.includes(myUid);
  const timeAgo = formatTimeAgo(post.createdAt?.toDate ? post.createdAt.toDate() : new Date());

  let avatarHtml;
  if (post.photoURL) {
    avatarHtml = `<img class="feed-avatar" src="${post.photoURL}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                  <div class="feed-avatar-initials" style="display:none">${getInitials(post.displayName)}</div>`;
  } else {
    avatarHtml = `<div class="feed-avatar-initials">${getInitials(post.displayName)}</div>`;
  }

  const chipsHtml = (post.chips || []).map(c =>
    `<span class="feed-chip ${c.color || ''}">${c.text}</span>`
  ).join('');

  const isUserPost = post.type === 'user_post';

  card.innerHTML = `
    <div class="feed-card-header">
      ${avatarHtml}
      <div class="feed-card-meta">
        <div class="feed-card-name">${escHtml(post.displayName || 'Ученик')}</div>
        <div class="feed-card-time">${timeAgo}</div>
      </div>
    </div>
    ${isUserPost ? `
      ${post.title ? `<div class="feed-user-text">${escHtml(post.title)}</div>` : ''}
      ${post.imageUrl ? `<div class="feed-card-image"><img src="${post.imageUrl}" alt="" loading="lazy" onclick="openFeedImage('${post.imageUrl}')"></div>` : ''}
    ` : `
      <div class="feed-card-body">
        <div class="feed-card-icon">${post.emoji || '📌'}</div>
        <div class="feed-card-text">
          <div class="feed-card-title">${escHtml(post.title || '')}</div>
          <div class="feed-card-sub">${escHtml(post.subtitle || '')}</div>
          ${chipsHtml ? `<div class="feed-card-chips">${chipsHtml}</div>` : ''}
        </div>
      </div>
    `}
    <div class="feed-card-footer">
      <button class="feed-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike('${docId}')">
        <span class="like-heart">${isLiked ? '❤️' : '🤍'}</span>
        <span>${likes.length > 0 ? likes.length : ''}</span>
      </button>
      ${post.uid === myUid ? `<button class="feed-delete-btn" onclick="deletePost('${docId}')" title="Удалить пост">✕</button>` : ''}
    </div>`;
  return card;
}

function deletePost(docId) {
  if (!currentUser) return;
  db.collection('posts').doc(docId).get().then(doc => {
    if (!doc.exists || doc.data().uid !== currentUser.uid) return;
    db.collection('posts').doc(docId).delete();
  });
}

function toggleLike(docId) {
  if (!currentUser) return;
  const uid = currentUser.uid;
  const ref = db.collection('posts').doc(docId);
  ref.get().then(doc => {
    if (!doc.exists) return;
    const likes = doc.data().likes || [];
    const updated = likes.includes(uid)
      ? likes.filter(id => id !== uid)
      : [...likes, uid];
    ref.update({ likes: updated });
  });
}

async function createPost(type, data) {
  if (!currentUser) return;
  try {
    await db.collection('posts').add({
      uid: currentUser.uid,
      displayName: currentUser.displayName || 'Ученик',
      photoURL: currentUser.photoURL || null,
      type,
      ...buildPostContent(type, data),
      likes: [],
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (e) {
    console.warn('createPost error:', e);
  }
}

function buildPostContent(type, data) {
  switch (type) {
    case 'lesson_complete': {
      const stars = data.isPerfect ? '⭐⭐⭐' : data.hearts >= 2 ? '⭐⭐' : '⭐';
      return {
        emoji: '📖',
        title: 'Прошёл урок французского',
        subtitle: `${stars} · ${data.correct}/${data.total} правильно`,
        chips: [
          { text: `+${data.xp} XP`, color: 'green' },
          { text: `🔥 ${data.streak} дн.`, color: 'yellow' }
        ]
      };
    }
    case 'quiz_complete': {
      const stars = data.pct === 1 ? '⭐⭐⭐' : data.pct >= 0.7 ? '⭐⭐' : '⭐';
      return {
        emoji: '🧩',
        title: `Квиз: ${data.categoryTitle || 'Французский'}`,
        subtitle: `${stars} · ${data.score}/${data.total} правильно`,
        chips: [
          { text: `+${data.xp} XP`, color: 'green' },
          { text: `${Math.round(data.pct * 100)}%`, color: data.pct === 1 ? 'green' : 'blue' }
        ]
      };
    }
    case 'achievement': {
      return {
        emoji: data.icon || '🏆',
        title: `Достижение: ${data.title}`,
        subtitle: data.desc || '',
        chips: [{ text: 'Новое достижение', color: 'yellow' }]
      };
    }
    case 'streak': {
      return {
        emoji: '🔥',
        title: `${data.streak} дней подряд!`,
        subtitle: 'Отличная серия — так держать!',
        chips: [{ text: `🔥 ${data.streak} дней`, color: 'yellow' }]
      };
    }
    default:
      return { emoji: '📌', title: data.title || '', subtitle: '' };
  }
}

function formatTimeAgo(date) {
  if (!date) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'только что';
  if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} дн. назад`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function openFeedImage(url) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out';
  overlay.innerHTML = `<img src="${url}" style="max-width:95vw;max-height:90vh;border-radius:12px;object-fit:contain">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

// ============================================================
// BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', init);

// ============================================================
// NEWS FEED
// ============================================================
const NEWS_TOPICS = [
  { id: 'all',       label: 'Все',         emoji: '🌐' },
  { id: 'football',  label: 'Футбол',      emoji: '⚽', query: 'fútbol' },
  { id: 'politics',  label: 'Политика',    emoji: '🏛️', query: 'política' },
  { id: 'history',   label: 'История',     emoji: '📜', query: 'historia' },
  { id: 'tech',      label: 'Технологии',  emoji: '💻', query: 'tecnología' },
  { id: 'marketing', label: 'Маркетинг',   emoji: '📊', query: 'marketing' },
  { id: 'ai',        label: 'ИИ',          emoji: '🤖', query: 'inteligencia artificial' },
  { id: 'games',     label: 'Игры',        emoji: '🎮', query: 'videojuegos gaming' },
  { id: 'science',   label: 'Наука',       emoji: '🔬', query: 'ciencia' },
  { id: 'hollywood', label: 'Голливуд',    emoji: '🎬', query: 'hollywood cine' },
];

let newsCache = {};
let activeNewsTopic = 'all';
let newsRefreshTimer = null;
let translationCache = {};
let currentNewsItems = [];

async function showNews() {
  showScreen('screen-news');
  renderNewsTabs();
  await loadNews(activeNewsTopic);
  startNewsRefreshTimer();
}

function renderNewsTabs() {
  document.getElementById('news-tabs').innerHTML = NEWS_TOPICS.map(t => `
    <button class="news-tab ${t.id === activeNewsTopic ? 'active' : ''}" data-topic="${t.id}" onclick="switchNewsTopic('${t.id}')">
      ${t.emoji} ${t.label}
    </button>
  `).join('');
}

async function switchNewsTopic(topicId) {
  activeNewsTopic = topicId;
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.topic === topicId);
  });
  await loadNews(topicId);
}

async function loadNews(topicId, forceRefresh = false) {
  if (!forceRefresh && newsCache[topicId]) {
    currentNewsItems = newsCache[topicId];
    renderNewsItems(currentNewsItems, topicId);
    return;
  }
  showNewsLoading();
  try {
    const items = topicId === 'all'
      ? await fetchAllNews()
      : await fetchNewsForQuery(NEWS_TOPICS.find(t => t.id === topicId).query, topicId);
    newsCache[topicId] = items;
    currentNewsItems = items;
    renderNewsItems(items, topicId);
  } catch (e) {
    showNewsError();
  }
}

function fetchWithTimeout(url, ms) {
  return Promise.race([
    fetch(url, { cache: 'no-store' }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  ]);
}

function parseRSSXML(text) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, 'text/xml');
  const items = [...xml.querySelectorAll('item')];
  if (!items.length) return null;
  return items.map(item => {
    const rawTitle = item.querySelector('title')?.textContent || '';
    const linkNode = item.querySelector('link');
    const link = linkNode ? (linkNode.nextSibling?.nodeValue?.trim() || linkNode.textContent) : '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const source = item.querySelector('source')?.textContent || '';
    const desc = item.querySelector('description')?.textContent || '';
    const imgMatch = desc.match(/<img[^>]+src="([^"]+)"/);
    const thumbnail = imgMatch ? imgMatch[1] : '';
    return { title: rawTitle, link, pubDate, thumbnail, source };
  });
}

async function fetchRSS(rssUrl) {
  const encoded = encodeURIComponent(rssUrl);
  const proxies = [
    // rss2json — returns parsed JSON directly (no count param = free tier)
    async () => {
      const res = await fetchWithTimeout(`https://api.rss2json.com/v1/api.json?rss_url=${encoded}`, 8000);
      const d = await res.json();
      if (d.status === 'ok' && d.items?.length) {
        return d.items.map(i => ({
          title: i.title, link: i.link, pubDate: i.pubDate,
          thumbnail: i.thumbnail || i.enclosure?.link || '', source: i.author || ''
        }));
      }
      return null;
    },
    // allorigins raw endpoint
    async () => {
      const res = await fetchWithTimeout(`https://api.allorigins.win/raw?url=${encoded}`, 10000);
      if (!res.ok) return null;
      return await res.text();
    },
    // allorigins get endpoint (JSON-wrapped, sometimes succeeds when /raw times out)
    async () => {
      const res = await fetchWithTimeout(`https://api.allorigins.win/get?url=${encoded}`, 10000);
      const d = await res.json();
      if (d.contents && d.contents.trim().startsWith('<')) return d.contents;
      return null;
    },
  ];

  for (const attempt of proxies) {
    try {
      const result = await attempt();
      if (!result) continue;
      // rss2json already returns parsed array
      if (Array.isArray(result)) return result;
      const parsed = parseRSSXML(result);
      if (parsed && parsed.length > 0) return parsed;
    } catch (e) {
      console.warn('RSS proxy failed, trying next:', e.message);
    }
  }
  return [];
}

async function fetchNewsForQuery(query, topicId) {
  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=fr&gl=FR&ceid=FR:fr`;
  const items = await fetchRSS(rssUrl);
  return items.map(item => ({ ...item, _topicId: topicId }));
}

async function fetchAllNews() {
  const rssUrl = `https://news.google.com/rss?hl=fr&gl=FR&ceid=FR:fr`;
  return await fetchRSS(rssUrl);
}

function showNewsLoading() {
  document.getElementById('news-feed').innerHTML = `
    <div class="news-loading">
      <div class="news-spinner"></div>
      <div>Загружаем новости на французском...</div>
    </div>`;
}

function showNewsError() {
  document.getElementById('news-feed').innerHTML = `
    <div class="news-error">
      ⚠️ Не удалось загрузить новости.<br>
      <button class="news-translate-btn" style="margin-top:12px" onclick="loadNews(activeNewsTopic, true)">
        Попробовать снова
      </button>
    </div>`;
}

function renderNewsItems(items, topicId) {
  const feed = document.getElementById('news-feed');
  if (!items || items.length === 0) {
    feed.innerHTML = `<div class="news-empty">Новостей не найдено 😕</div>`;
    return;
  }
  feed.innerHTML = items.map((item, idx) => {
    const imgUrl = item.thumbnail || (item.enclosure && item.enclosure.link) || '';
    const imgHtml = imgUrl ? `<img class="news-img" src="${imgUrl}" alt="" onerror="this.style.display='none'" loading="lazy">` : '';
    const source = extractDomain(item.link || item.guid || '');
    const date = formatNewsDate(item.pubDate);
    const titleHtml = wrapWordsInSpans(item.title || '');
    const topic = NEWS_TOPICS.find(t => t.id === (item._topicId || topicId));
    const tagHtml = (topicId === 'all' && topic && topic.id !== 'all')
      ? `<div class="news-topic-tag">${topic.emoji} ${topic.label}</div>` : '';
    return `
      <div class="news-card">
        ${imgHtml}
        <div class="news-content">
          ${tagHtml}
          <div class="news-title">${titleHtml}</div>
          <div class="news-meta">
            <span class="news-source">${source}</span>
            <span class="news-date">${date}</span>
          </div>
          <button class="news-translate-btn" onclick="translateNewsItem(this, ${idx})">Перевести</button>
          <div class="news-translation" id="news-trans-${idx}" style="display:none"></div>
        </div>
      </div>`;
  }).join('');
}

function wrapWordsInSpans(text) {
  const clean = text.replace(/<[^>]*>/g, '');
  return clean.split(/(\s+)/).map(token => {
    if (/^\s+$/.test(token)) return token;
    const word = token.replace(/^[«»"'.,!?;:()\[\]]+|[«»"'.,!?;:()\[\]]+$/g, '');
    if (!word || word.length < 2) return token;
    const safe = word.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    return `<span class="news-word" onclick="translateWord(this,'${safe}')">${token}</span>`;
  }).join('');
}

function extractDomain(url) {
  if (!url) return '';
  try { return new URL(url).hostname.replace('www.', ''); } catch (e) { return ''; }
}

function formatNewsDate(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 60) return `${diff} мин. назад`;
  if (diff < 1440) return `${Math.floor(diff / 60)} ч. назад`;
  return `${Math.floor(diff / 1440)} дн. назад`;
}

async function translateNewsItem(btn, idx) {
  const transEl = document.getElementById(`news-trans-${idx}`);
  if (transEl.style.display !== 'none') {
    transEl.style.display = 'none';
    btn.textContent = 'Перевести';
    btn.classList.remove('translated');
    return;
  }
  const text = currentNewsItems[idx] && currentNewsItems[idx].title;
  if (!text) return;
  btn.textContent = '...';
  btn.disabled = true;
  const translated = await fetchTranslation(text);
  transEl.textContent = translated;
  transEl.style.display = 'block';
  btn.textContent = 'Скрыть перевод';
  btn.classList.add('translated');
  btn.disabled = false;
}

async function translateWord(el, word) {
  if (!word || word.length < 2) return;
  document.querySelectorAll('.news-word.word-active').forEach(w => w.classList.remove('word-active'));
  el.classList.add('word-active');
  const tooltip = document.getElementById('word-tooltip');
  document.getElementById('word-tooltip-original').textContent = word;
  document.getElementById('word-tooltip-translation').textContent = '...';
  const rect = el.getBoundingClientRect();
  const top = rect.bottom + 8;
  const left = Math.min(rect.left, window.innerWidth - 220);
  tooltip.style.cssText = `top:${top}px;left:${left}px;`;
  tooltip.classList.add('visible');
  const translation = await fetchTranslation(word);
  document.getElementById('word-tooltip-translation').textContent = translation;
  clearTimeout(tooltip._hideTimer);
  tooltip._hideTimer = setTimeout(() => {
    tooltip.classList.remove('visible');
    el.classList.remove('word-active');
  }, 4000);
}

async function fetchTranslation(text) {
  if (!text) return '';
  if (translationCache[text]) return translationCache[text];
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|ru`;
    const res = await fetch(url);
    const data = await res.json();
    const result = data.responseData && data.responseData.translatedText
      ? data.responseData.translatedText
      : text;
    translationCache[text] = result;
    return result;
  } catch (e) { return '(ошибка перевода)'; }
}

function startNewsRefreshTimer() {
  if (newsRefreshTimer) clearInterval(newsRefreshTimer);
  newsRefreshTimer = setInterval(async () => {
    newsCache = {};
    const badge = document.getElementById('news-refresh-badge');
    if (badge) badge.classList.add('spinning');
    await loadNews(activeNewsTopic, true);
    if (badge) badge.classList.remove('spinning');
  }, 30 * 60 * 1000);
}

function manualRefreshNews() {
  newsCache = {};
  const badge = document.getElementById('news-refresh-badge');
  if (badge) badge.classList.add('spinning');
  loadNews(activeNewsTopic, true).then(() => {
    if (badge) badge.classList.remove('spinning');
  });
}

document.addEventListener('click', e => {
  if (!e.target.classList.contains('news-word')) {
    const tooltip = document.getElementById('word-tooltip');
    if (tooltip) tooltip.classList.remove('visible');
    document.querySelectorAll('.news-word.word-active').forEach(w => w.classList.remove('word-active'));
  }
  // Закрываем меню пользователя при клике вне
  const menu = document.getElementById('user-menu');
  const btn = document.getElementById('user-avatar-btn');
  if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

// ============================================================
// VOCAB QUIZ
// ============================================================
let currentVocabMode = 'image';
let vocabQuizState = {
  categoryId: null, mode: null, words: [],
  currentIndex: 0, score: 0, answered: false, totalWords: 10, options: []
};

function showVocab(mode) {
  currentVocabMode = mode;
  document.getElementById('vocab-screen-title').textContent = mode === 'image' ? 'Карточки' : 'Перевод';
  const descEl = document.getElementById('vocab-screen-desc');
  if (descEl) descEl.textContent = mode === 'image'
    ? 'Выбери картинку, которая соответствует французскому слову.'
    : 'Выбери правильный перевод французского слова.';

  document.getElementById('vocab-categories-list').innerHTML =
    `<div class="vocab-categories-grid">${VOCAB_CATEGORIES.map(cat => {
      const learned = (state.vocabProgress[cat.id] || []).length;
      const total = cat.words.length;
      const pct = Math.round(learned / total * 100);
      const done = learned >= total;
      return `
      <div class="vocab-category-card${done ? ' vocab-cat-done' : ''}" onclick="startVocabQuiz('${cat.id}')">
        <div class="vocab-cat-icon">${done ? '✅' : cat.emoji}</div>
        <div class="vocab-cat-title">${cat.title}</div>
        ${learned > 0 ? `
        <div class="vocab-cat-progress">
          <div class="vocab-cat-progress-bar">
            <div class="vocab-cat-progress-fill" style="width:${pct}%"></div>
          </div>
          <span class="vocab-cat-progress-label">${learned}/${total}</span>
        </div>` : ''}
      </div>`;
    }).join('')}</div>`;

  // Reset search
  const si = document.getElementById('vocab-search');
  if (si) si.value = '';
  searchVocab('');

  showScreen('screen-vocab');
}

function searchVocab(query) {
  const q = query.trim().toLowerCase();
  const resultsEl = document.getElementById('vocab-search-results');
  const catsEl = document.getElementById('vocab-categories-list');

  if (!q) {
    resultsEl.style.display = 'none';
    catsEl.style.display = '';
    return;
  }

  catsEl.style.display = 'none';
  resultsEl.style.display = '';

  const matches = [];
  VOCAB_CATEGORIES.forEach(cat => {
    cat.words.forEach(w => {
      if (
        w.greek.toLowerCase().includes(q) ||
        w.transcription.toLowerCase().includes(q) ||
        w.translation.toLowerCase().includes(q)
      ) {
        matches.push({ ...w, catTitle: cat.title, catEmoji: cat.emoji });
      }
    });
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-empty">Ничего не найдено</div>`;
    return;
  }

  resultsEl.innerHTML = `<div class="vocab-search-list">${matches.map(w => `
    <div class="vocab-search-card">
      <div class="vocab-search-emoji">${w.emoji || '📝'}</div>
      <div class="vocab-search-body">
        <div class="vocab-search-greek">${w.greek}
          <button class="vocab-tts-btn" data-greek="${w.greek.replace(/"/g,'&quot;')}"
                  onclick="speakGreek(this.dataset.greek)">🔊</button>
        </div>
        <div class="vocab-search-transcription">${w.transcription}</div>
        <div class="vocab-search-translation">${w.translation}</div>
      </div>
      <div class="vocab-search-cat">${w.catEmoji} ${w.catTitle}</div>
    </div>
  `).join('')}</div>`;
}

function startVocabQuiz(categoryId) {
  const category = VOCAB_CATEGORIES.find(c => c.id === categoryId);
  if (!category) return;
  const words = shuffle([...category.words]).slice(0, 10);
  vocabQuizState = {
    categoryId, mode: currentVocabMode, words,
    currentIndex: 0, score: 0, answered: false, totalWords: words.length, options: []
  };
  showScreen('screen-vocab-quiz');
  renderVocabWord();
}

function renderVocabWord() {
  const { words, currentIndex, mode, totalWords } = vocabQuizState;
  const word = words[currentIndex];
  vocabQuizState.answered = false;
  document.getElementById('vocab-progress').style.width = (currentIndex / totalWords * 100) + '%';
  document.getElementById('vocab-score').textContent = vocabQuizState.score;
  document.getElementById('vocab-footer').style.display = 'none';
  document.getElementById('vocab-footer').className = 'lesson-footer';
  const category = VOCAB_CATEGORIES.find(c => c.id === vocabQuizState.categoryId);
  if (mode === 'image') renderImageQuiz(word, category);
  else renderTranslationQuiz(word, category);
}

function renderImageQuiz(word, category) {
  const pool = category.words.filter(w => w.greek !== word.greek);
  const wrongWords = shuffle(pool).slice(0, 3);
  // if pool has < 3 words pad from other categories
  if (wrongWords.length < 3) {
    const extra = VOCAB_CATEGORIES
      .filter(c => c.id !== category.id)
      .flatMap(c => c.words)
      .filter(w => !wrongWords.some(x => x.greek === w.greek));
    wrongWords.push(...shuffle(extra).slice(0, 3 - wrongWords.length));
  }
  const options = shuffle([word, ...wrongWords]);
  vocabQuizState.options = options;

  document.getElementById('vocab-quiz-container').innerHTML = `
    <div class="vocab-word-display">
      <div class="vocab-word-mode-label">✦ Новый</div>
      <div class="vocab-word-instruction">Выберите картинку с переводом на русский</div>
      <div class="vocab-word-greek">
        ${word.greek}
        <button class="vocab-tts-btn" data-greek="${word.greek.replace(/"/g, '&quot;')}" onclick="speakGreek(this.dataset.greek)">🔊</button>
      </div>
      <div class="vocab-word-transcription">${word.transcription}</div>
    </div>
    <div class="vocab-image-grid">
      ${options.map((opt, i) => `
        <button class="vocab-image-card" onclick="selectVocabAnswer(${i})">
          <span class="vocab-card-emoji">${opt.emoji}</span>
          <div class="vocab-card-label">${opt.translation}</div>
        </button>`).join('')}
    </div>`;
}

function renderTranslationQuiz(word, category) {
  const pool = category.words.filter(w => w.greek !== word.greek);
  const wrongWords = shuffle(pool).slice(0, 2);
  if (wrongWords.length < 2) {
    const extra = VOCAB_CATEGORIES
      .filter(c => c.id !== category.id)
      .flatMap(c => c.words)
      .filter(w => !wrongWords.some(x => x.greek === w.greek));
    wrongWords.push(...shuffle(extra).slice(0, 2 - wrongWords.length));
  }
  const options = shuffle([word, ...wrongWords]);
  vocabQuizState.options = options;

  document.getElementById('vocab-quiz-container').innerHTML = `
    <div class="vocab-word-display">
      <div class="vocab-word-mode-label">✦ Новый</div>
      <div class="vocab-word-instruction">Выберите перевод на русский</div>
      <div class="vocab-word-greek">
        ${word.greek}
        <button class="vocab-tts-btn" data-greek="${word.greek.replace(/"/g, '&quot;')}" onclick="speakGreek(this.dataset.greek)">🔊</button>
      </div>
      <div class="vocab-word-transcription">${word.transcription}</div>
    </div>
    <div class="vocab-translation-options">
      ${options.map((opt, i) => `
        <button class="vocab-translation-btn" onclick="selectVocabAnswer(${i})">
          ${opt.translation}
        </button>`).join('')}
    </div>`;
}

function selectVocabAnswer(optionIdx) {
  if (vocabQuizState.answered) return;
  vocabQuizState.answered = true;

  const { words, currentIndex, options, mode } = vocabQuizState;
  const correctWord = words[currentIndex];
  const selectedWord = options[optionIdx];
  const isCorrect = selectedWord.greek === correctWord.greek;
  const correctIdx = options.findIndex(o => o.greek === correctWord.greek);

  const btnSelector = mode === 'image' ? '.vocab-image-card' : '.vocab-translation-btn';
  const buttons = document.querySelectorAll(btnSelector);
  buttons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    vocabQuizState.score++;
    buttons[optionIdx].classList.add('correct');
    document.getElementById('vocab-score').textContent = vocabQuizState.score;
    document.getElementById('vocab-feedback').textContent = randomCorrectPhrase();
    document.getElementById('vocab-feedback').className = 'feedback-message correct';
    document.getElementById('vocab-footer').className = 'lesson-footer correct-footer';
    playSound('correct');
    // Mark word as learned
    const catId = vocabQuizState.categoryId;
    if (!state.vocabProgress[catId]) state.vocabProgress[catId] = [];
    if (!state.vocabProgress[catId].includes(correctWord.greek)) {
      state.vocabProgress[catId].push(correctWord.greek);
    }
  } else {
    buttons[optionIdx].classList.add('wrong');
    buttons[correctIdx].classList.add('correct');
    document.getElementById('vocab-feedback').innerHTML = `Правильно: <strong>${correctWord.translation}</strong> ${correctWord.emoji}`;
    document.getElementById('vocab-feedback').className = 'feedback-message wrong';
    document.getElementById('vocab-footer').className = 'lesson-footer wrong-footer';
    playSound('wrong');
  }
  document.getElementById('vocab-footer').style.display = 'flex';
}

function nextVocabWord() {
  vocabQuizState.currentIndex++;
  if (vocabQuizState.currentIndex >= vocabQuizState.totalWords) completeVocabQuiz();
  else renderVocabWord();
}

function completeVocabQuiz() {
  const { score, totalWords } = vocabQuizState;
  const xp = score * XP_PER_CORRECT;
  state.totalXp += xp;
  state.dailyXp += xp;
  state.level = Math.floor(state.totalXp / 500) + 1;
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();
  const pct = score / totalWords;
  document.getElementById('vocab-complete-stars').textContent = pct === 1 ? '⭐⭐⭐' : pct >= 0.7 ? '⭐⭐' : '⭐';
  document.getElementById('vocab-complete-score').textContent = `${score}/${totalWords}`;
  document.getElementById('vocab-complete-xp').textContent = `+${xp}`;
  showScreen('screen-vocab-complete');
}

function restartVocabQuiz() { startVocabQuiz(vocabQuizState.categoryId); }
function exitVocabQuiz() { showVocab(currentVocabMode); }


// ============================================================
// QUIZ — SENTENCE ORDERING
// ============================================================
let quizState = {
  categoryId: null, sentences: [], currentIndex: 0,
  hearts: 3, score: 0, xpEarned: 0, answered: false,
  placedWords: [], availableWords: [], dragSrc: null
};

function showQuiz() {
  const list = document.getElementById('quiz-categories-list');
  list.innerHTML = `<div class="vocab-categories-grid">${
    QUIZ_CATEGORIES.map(cat => `
      <div class="vocab-category-card" onclick="startQuiz('${cat.id}')">
        <div class="vocab-cat-icon">${cat.emoji}</div>
        <div class="vocab-cat-title">${cat.title}</div>
        <div class="vocab-cat-count">${cat.sentences.length} предложений</div>
      </div>`).join('')
  }</div>`;
  showScreen('screen-quiz');
}

function startQuiz(categoryId) {
  const cat = QUIZ_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return;
  // Берём 10 предложений: сортируем по сложности, выбираем равномерно
  const sorted = [...cat.sentences].sort((a, b) => a.diff - b.diff);
  const sentences = shuffle(sorted).slice(0, 10).sort((a, b) => a.diff - b.diff);
  quizState = {
    categoryId, sentences, currentIndex: 0,
    hearts: 3, score: 0, xpEarned: 0, answered: false,
    placedWords: [], availableWords: [], dragSrc: null
  };
  showScreen('screen-quiz-session');
  renderQuizSentence();
}

function renderQuizSentence() {
  const { sentences, currentIndex } = quizState;
  const s = sentences[currentIndex];
  quizState.answered = false;
  quizState.placedWords = [];
  quizState.availableWords = shuffle([...s.words]);

  document.getElementById('quiz-progress').style.width =
    (currentIndex / quizState.sentences.length * 100) + '%';
  document.getElementById('quiz-xp').textContent = quizState.xpEarned;
  document.getElementById('quiz-footer').style.display = 'none';
  document.getElementById('quiz-footer').className = 'lesson-footer';

  renderQuizUI(s);
}

function renderQuizUI(s) {
  const container = document.getElementById('quiz-session-container');
  const hearts = '<span class="heart-icon">❤️</span>'.repeat(quizState.hearts) +
    '<span class="heart-icon dead">🖤</span>'.repeat(3 - quizState.hearts);

  container.innerHTML = `
    <div class="quiz-hearts">${hearts}</div>
    <div class="quiz-translation">${s.ru}</div>
    <div class="quiz-answer-area" id="quiz-answer-area">
      ${quizState.placedWords.length === 0
        ? '<span class="quiz-answer-placeholder">Нажми на слова ниже</span>'
        : quizState.placedWords.map((w, i) =>
            `<button class="quiz-word-tile placed" onclick="removeQuizWord(${i})"
              draggable="true" data-idx="${i}" data-source="placed">${w}</button>`
          ).join('')}
    </div>
    <div class="quiz-word-pool" id="quiz-word-pool">
      ${quizState.availableWords.map((w, i) =>
        `<button class="quiz-word-tile" onclick="addQuizWord(${i})"
          draggable="true" data-idx="${i}" data-source="pool">${w}</button>`
      ).join('')}
    </div>
    <button class="btn-primary quiz-check-btn" id="quiz-check-btn"
      onclick="checkQuizAnswer()"
      ${quizState.placedWords.length === 0 ? 'disabled' : ''}>
      Проверить ✓
    </button>`;

  setupQuizDragDrop();
}

function addQuizWord(poolIdx) {
  if (quizState.answered) return;
  const word = quizState.availableWords[poolIdx];
  quizState.availableWords.splice(poolIdx, 1);
  quizState.placedWords.push(word);
  renderQuizUI(quizState.sentences[quizState.currentIndex]);
}

function removeQuizWord(placedIdx) {
  if (quizState.answered) return;
  const word = quizState.placedWords[placedIdx];
  quizState.placedWords.splice(placedIdx, 1);
  quizState.availableWords.push(word);
  renderQuizUI(quizState.sentences[quizState.currentIndex]);
}

function checkQuizAnswer() {
  if (quizState.answered || quizState.placedWords.length === 0) return;
  const s = quizState.sentences[quizState.currentIndex];

  // Проверяем если все слова размещены
  if (quizState.placedWords.length < s.words.length) return;

  quizState.answered = true;
  const correct = s.words.join(' ');
  const answer = quizState.placedWords.join(' ');
  const isCorrect = answer === correct;

  const footer = document.getElementById('quiz-footer');
  const feedback = document.getElementById('quiz-feedback');
  const checkBtn = document.getElementById('quiz-check-btn');
  if (checkBtn) checkBtn.disabled = true;

  // Подсветка ответа
  const answerArea = document.getElementById('quiz-answer-area');
  if (answerArea) {
    answerArea.classList.add(isCorrect ? 'answer-correct' : 'answer-wrong');
  }

  if (isCorrect) {
    quizState.score++;
    quizState.xpEarned += XP_PER_CORRECT;
    document.getElementById('quiz-xp').textContent = quizState.xpEarned;
    feedback.textContent = randomCorrectPhrase();
    feedback.className = 'feedback-message correct';
    footer.className = 'lesson-footer correct-footer';
    playSound('correct');
  } else {
    quizState.hearts--;
    feedback.innerHTML = `Правильно: <strong>${correct}</strong>`;
    feedback.className = 'feedback-message wrong';
    footer.className = 'lesson-footer wrong-footer';
    playSound('wrong');
  }

  footer.style.display = 'flex';
  const continueBtn = document.getElementById('quiz-continue-btn');
  continueBtn.textContent = quizState.hearts <= 0 ? 'Завершить' : 'Продолжить';
}

function nextQuizSentence() {
  if (quizState.hearts <= 0) { completeQuiz(); return; }
  quizState.currentIndex++;
  if (quizState.currentIndex >= quizState.sentences.length) completeQuiz();
  else renderQuizSentence();
}

function completeQuiz() {
  const { score, xpEarned } = quizState;
  const total = quizState.sentences.length;
  state.totalXp += xpEarned;
  state.dailyXp += xpEarned;
  state.level = Math.floor(state.totalXp / 500) + 1;
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();

  const pct = score / total;
  const cat = QUIZ_CATEGORIES.find(c => c.id === quizState.categoryId);
  createPost('quiz_complete', {
    score, total, pct, xp: xpEarned,
    categoryTitle: cat?.title || 'Французский'
  });

  document.getElementById('quiz-complete-stars').textContent =
    pct === 1 ? '⭐⭐⭐' : pct >= 0.7 ? '⭐⭐' : '⭐';
  document.getElementById('quiz-complete-score').textContent = `${score}/${total}`;
  document.getElementById('quiz-complete-xp').textContent = `+${xpEarned}`;
  showScreen('screen-quiz-complete');
}

function restartQuiz() { startQuiz(quizState.categoryId); }
function exitQuiz() { showQuiz(); }

// ============================================================
// DRAG AND DROP
// ============================================================
function setupQuizDragDrop() {
  const tiles = document.querySelectorAll('.quiz-word-tile');
  const answerArea = document.getElementById('quiz-answer-area');
  const pool = document.getElementById('quiz-word-pool');

  tiles.forEach(tile => {
    // Desktop drag
    tile.addEventListener('dragstart', e => {
      quizState.dragSrc = tile;
      e.dataTransfer.effectAllowed = 'move';
      tile.classList.add('dragging');
    });
    tile.addEventListener('dragend', () => tile.classList.remove('dragging'));

    // Mobile touch drag
    tile.addEventListener('touchstart', handleTouchStart, { passive: true });
    tile.addEventListener('touchmove', handleTouchMove, { passive: false });
    tile.addEventListener('touchend', handleTouchEnd);
  });

  [answerArea, pool].forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      if (!quizState.dragSrc) return;
      const src = quizState.dragSrc.dataset.source;
      const idx = parseInt(quizState.dragSrc.dataset.idx);
      const dest = zone.id === 'quiz-answer-area' ? 'placed' : 'pool';
      if (src === 'pool' && dest === 'placed') addQuizWord(idx);
      else if (src === 'placed' && dest === 'pool') removeQuizWord(idx);
    });
  });
}

let _touchTile = null, _touchClone = null, _touchOffX = 0, _touchOffY = 0;

function handleTouchStart(e) {
  _touchTile = e.currentTarget;
  const t = e.touches[0];
  const r = _touchTile.getBoundingClientRect();
  _touchOffX = t.clientX - r.left;
  _touchOffY = t.clientY - r.top;
  _touchClone = _touchTile.cloneNode(true);
  _touchClone.className = 'quiz-word-tile dragging touch-clone';
  _touchClone.style.cssText = `position:fixed;z-index:9999;pointer-events:none;
    left:${r.left}px;top:${r.top}px;width:${r.width}px;opacity:0.85;`;
  document.body.appendChild(_touchClone);
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!_touchClone) return;
  const t = e.touches[0];
  _touchClone.style.left = (t.clientX - _touchOffX) + 'px';
  _touchClone.style.top = (t.clientY - _touchOffY) + 'px';
}

function handleTouchEnd(e) {
  if (!_touchClone || !_touchTile) return;
  const t = e.changedTouches[0];
  _touchClone.remove();

  const el = document.elementFromPoint(t.clientX, t.clientY);
  const inAnswer = el && (el.id === 'quiz-answer-area' || el.closest('#quiz-answer-area'));
  const inPool = el && (el.id === 'quiz-word-pool' || el.closest('#quiz-word-pool'));

  const src = _touchTile.dataset.source;
  const idx = parseInt(_touchTile.dataset.idx);

  if (src === 'pool' && inAnswer) addQuizWord(idx);
  else if (src === 'placed' && inPool) removeQuizWord(idx);

  _touchTile = null;
  _touchClone = null;
}

// ============================================================
// BLOG
// ============================================================
const BLOG_ARTICLES = [
  {
    section: '📚 С чего начать',
    color: 'green',
    items: [
      { slug: 'francuzski-alfavit',        emoji: '🔤', tag: 'Основы',   title: 'Французский алфавит и чтение: буквы, диграфы, немые окончания' },
      { slug: 'kak-govorit-po-francuzski', emoji: '📚', tag: 'С нуля',   title: 'Как начать говорить по-французски с нуля: пошаговый план' },
      { slug: 'slozhno-li-uchit-francuzski', emoji: '💡', tag: 'Мотивация', title: 'Сложно ли учить французский язык русскому? Честный ответ' },
      { slug: 'francuzski-dlya-russkih',   emoji: '🇷🇺', tag: 'Лайфхаки', title: 'Французский для русскоязычных: особенности, ошибки и лайфхаки' },
      { slug: 'intervalnoe-povtorenie',    emoji: '🧠', tag: 'Методика', title: 'Интервальное повторение для изучения французского: метод SRS' },
    ]
  },
  {
    section: '🇫🇷 Жизнь во Франции',
    color: 'green',
    items: [
      { slug: '50-fraz-vo-francii',        emoji: '💬', tag: 'Фразы',     title: '50 фраз для жизни во Франции с транскрипцией' },
      { slug: 'arenda-vo-francii',         emoji: '🏠', tag: 'Быт',       title: 'Аренда квартиры во Франции: bail, гарант и dépôt de garantie' },
      { slug: 'francuzski-u-vracha',       emoji: '🏥', tag: 'Срочное',   title: 'Французский у врача: médecin traitant, carte Vitale, аптека' },
      { slug: 'francuzski-v-banke',        emoji: '🏦', tag: 'Документы', title: 'Французский в банке: открыть счёт, RIB, virement' },
      { slug: 'titre-de-sejour-dokumenty', emoji: '📋', tag: 'Документы', title: 'Titre de séjour: префектура, OFII и все документы' },
      { slug: 'caf-posobiya',              emoji: '💶', tag: 'Документы', title: 'CAF во Франции: APL и пособия — как подать и что говорить' },
      { slug: 'francuzski-na-rabote',      emoji: '💼', tag: 'Карьера',   title: 'Французский на работе: деловые фразы для офиса и переговоров' },
      { slug: 'deti-shkola-franciya',      emoji: '👨‍👩‍👧', tag: 'Семья', title: 'Дети и школа во Франции: французский для родителей' },
      { slug: 'francuzski-transport',      emoji: '🚇', tag: 'Транспорт', title: 'Транспорт во Франции: métro, RER, SNCF и Navigo' },
      { slug: 'francuzski-sosedi-dom',     emoji: '🏘️', tag: 'Быт',       title: 'Французский для дома и соседей: syndic, charges, ремонт' },
      { slug: 'francuzski-pokupki',        emoji: '🛍️', tag: 'Покупки',   title: 'Французский в магазине: продукты, одежда, рынок' },
    ]
  },
  {
    section: '📖 Грамматика и словарь',
    color: 'green',
    items: [
      { slug: 'grammatika-francuzski',     emoji: '📖', tag: 'Грамматика', title: 'Грамматика французского языка: базовые правила для начинающих' },
      { slug: 'glagoly-francuzski',        emoji: '⚡', tag: 'Словарь',    title: 'Глаголы французского языка: 100 самых важных с транскрипцией' },
      { slug: 'chislitelnie-francuzski',   emoji: '🔢', tag: 'Словарь',    title: 'Числительные во французском: от 1 до миллиона (и почему 80 — это 4×20)' },
      { slug: 'francuzski-predlogi',       emoji: '🔗', tag: 'Грамматика', title: 'Предлоги во французском: à, de, en, pour, chez с примерами' },
      { slug: 'francuzski-voprosy',        emoji: '❓', tag: 'Грамматика', title: 'Вопросы по-французски: est-ce que, инверсия и вопросительные слова' },
      { slug: 'vremena-goda-francuzski',   emoji: '🌦️', tag: 'Словарь',    title: 'Времена года и погода по-французски: слова и фразы' },
      { slug: 'telo-cheloveka-francuzski', emoji: '🧍', tag: 'Словарь',    title: 'Части тела по-французски: словарь с транскрипцией' },
      { slug: 'francuzski-cveta',          emoji: '🎨', tag: 'Словарь',    title: 'Цвета по-французски: полный словарь с произношением' },
      { slug: 'francuzski-semya',          emoji: '👪', tag: 'Словарь',    title: 'Семья по-французски: члены семьи, слова и фразы' },
      { slug: 'francuzski-sport-fitnes',   emoji: '🏋️', tag: 'Словарь',    title: 'Французский для спорта и фитнеса: слова для зала и бассейна' },
    ]
  },
  {
    section: '🎭 Культура и жизнь',
    color: 'green',
    items: [
      { slug: 'francuzskaya-kuhnya',   emoji: '🍽️', tag: 'Кухня',       title: 'Французская кухня: слова и фразы для ресторана и рынка' },
      { slug: 'prazdniki-francii',     emoji: '🎉', tag: 'Культура',    title: 'Праздники во Франции: даты, традиции и слова' },
      { slug: 'poslovitsy-francuzski', emoji: '📜', tag: 'Культура',    title: 'Пословицы и поговорки на французском с переводом' },
      { slug: 'sleng-francuzski',      emoji: '😎', tag: 'Разговорный', title: 'Французский сленг и разговорные выражения (включая verlan)' },
    ]
  },
];

function showBlog() {
  showScreen('screen-blog');
  renderBlogList();
}

function renderBlogList() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  let html = '';
  BLOG_ARTICLES.forEach(section => {
    const isPurple = section.color === 'purple';
    html += `<div class="blog-section-label${isPurple ? ' blog-section-purple' : ''}">${section.section}</div>`;
    html += `<div class="blog-section-grid">`;
    section.items.forEach(article => {
      const safeTitle = article.title.replace(/"/g, '&quot;');
      html += `
        <button class="blog-card" data-slug="${article.slug}" data-title="${safeTitle}" onclick="openBlogArticle(this.dataset.slug, this.dataset.title)">
          <div class="blog-card-emoji${isPurple ? ' blog-card-emoji-purple' : ''}">${article.emoji}</div>
          <div class="blog-card-body">
            <div class="blog-card-tag${isPurple ? ' blog-card-tag-purple' : ''}">${article.tag}</div>
            <div class="blog-card-title">${article.title}</div>
          </div>
          <div class="blog-card-arrow${isPurple ? ' blog-card-arrow-purple' : ''}">→</div>
        </button>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

function openBlogArticle(slug, title) {
  const frame = document.getElementById('blog-article-frame');
  const titleEl = document.getElementById('blog-article-title');
  if (frame) frame.src = `https://izifrench.com/blog/${slug}.html?ref=cabinet`;
  if (titleEl) titleEl.textContent = title;
  showScreen('screen-blog-article');
}

// ============================================================
// SPEECH TRAINING
// ============================================================
const SPEECH_CATEGORIES = (() => {
  const cats = [];

  // Глаголы из VERBS
  cats.push({
    id: 'verbs',
    icon: '📚',
    name: 'Глаголы',
    getWords: () => VERBS.map(v => ({
      greek: v.infinitive,
      transcription: v.transcription,
      translation: v.translation
    }))
  });

  // Фразы из PHRASES
  if (typeof PHRASES !== 'undefined') {
    PHRASES.forEach(cat => {
      cats.push({
        id: 'phrase_' + cat.id,
        icon: cat.icon || '💬',
        name: 'Фразы: ' + cat.category,
        getWords: () => cat.phrases.map(p => ({
          greek: p.greek,
          transcription: p.transcription,
          translation: p.translation
        }))
      });
    });
  }

  // Словарь из VOCAB_CATEGORIES
  if (typeof VOCAB_CATEGORIES !== 'undefined') {
    VOCAB_CATEGORIES.forEach(cat => {
      cats.push({
        id: 'vocab_' + cat.id,
        icon: cat.icon || '🔤',
        name: cat.title,
        getWords: () => cat.words.map(w => ({
          greek: w.greek,
          transcription: w.transcription,
          translation: w.translation
        }))
      });
    });
  }

  return cats;
})();

let speechSession = {
  words: [],
  index: 0,
  total: 15,
  correctCount: 0,
  xpEarned: 0,
  recognition: null,
  uiState: 'idle', // idle | recording | correct | wrong
  micGranted: false // разрешение на микрофон получено один раз
};

function requestMicPermissionOnce() {
  if (speechSession.micGranted) return; // уже есть — не спрашиваем

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    // На мобиле проверяем через Permissions API без вызова getUserMedia
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' }).then(result => {
        if (result.state === 'granted') speechSession.micGranted = true;
      }).catch(() => {});
    }
    return;
  }

  // На десктопе — запрашиваем один раз при входе в раздел
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      stream.getTracks().forEach(t => t.stop());
      speechSession.micGranted = true;
    })
    .catch(() => {}); // пользователь отказал — спросим при нажатии кнопки
}

function showSpeechTraining() {
  requestMicPermissionOnce();
  const list = document.getElementById('speech-categories-list');
  list.innerHTML = '';
  SPEECH_CATEGORIES.forEach(cat => {
    const count = cat.getWords().length;
    const btn = document.createElement('button');
    btn.className = 'speech-cat-btn';
    btn.innerHTML = `
      <div class="speech-cat-icon">${cat.icon}</div>
      <div class="speech-cat-info">
        <div class="speech-cat-name">${cat.name}</div>
        <div class="speech-cat-count">${count} слов / фраз</div>
      </div>
      <div class="speech-cat-arrow">›</div>`;
    btn.onclick = () => startSpeechSession(cat.id);
    list.appendChild(btn);
  });
  showScreen('screen-speech-categories');
}

function startSpeechSession(catId) {
  const cat = SPEECH_CATEGORIES.find(c => c.id === catId);
  if (!cat) return;
  const all = cat.getWords().filter(w => w.greek && w.translation);
  const shuffled = all.sort(() => Math.random() - 0.5);
  speechSession.words = shuffled.slice(0, speechSession.total);
  speechSession.index = 0;
  speechSession.correctCount = 0;
  speechSession.xpEarned = 0;
  speechSession.uiState = 'idle';
  renderSpeechCard();
  showScreen('screen-speech');
}

function renderSpeechCard() {
  const w = speechSession.words[speechSession.index];
  document.getElementById('speech-greek').textContent = w.greek;
  document.getElementById('speech-transcription').textContent = w.transcription || '';
  document.getElementById('speech-translation').textContent = w.translation ? '"' + w.translation + '"' : '';
  document.getElementById('speech-counter').textContent =
    (speechSession.index + 1) + '/' + speechSession.total;
  const pct = (speechSession.index / speechSession.total) * 100;
  document.getElementById('speech-progress').style.width = pct + '%';
  document.getElementById('speech-recognized').textContent = '';
  setSpeechUIState('idle');
}

function setSpeechUIState(st) {
  speechSession.uiState = st;
  const btn    = document.getElementById('speech-mic-btn');
  const bubble = document.getElementById('speech-bubble');
  const badge  = document.getElementById('speech-bubble-badge');
  const word   = document.getElementById('speech-greek');
  const char   = document.getElementById('speech-character');

  btn.className = 'speech-mic-btn';

  if (st === 'idle') {
    btn.classList.add('speech-mic-idle');
    btn.innerHTML = '<span style="font-size:28px">🎤</span>';
    bubble.textContent = 'Скажите это слово:';
    badge.style.display = 'none';
    word.className = 'speech-greek-word';
    char.className = 'speech-character';
  } else if (st === 'recording') {
    btn.classList.add('speech-mic-recording');
    btn.innerHTML = '<div class="speech-waves"><span></span><span></span><span></span><span></span><span></span></div>';
    bubble.textContent = 'Слушаю...';
    badge.style.display = 'none';
    word.className = 'speech-greek-word';
  } else if (st === 'correct') {
    btn.classList.add('speech-mic-correct');
    btn.innerHTML = '<span style="font-size:32px">✓</span>';
    bubble.textContent = 'Отлично! Продолжаем!';
    badge.style.display = 'none';
    word.className = 'speech-greek-word speech-correct';
    char.className = 'speech-character speech-character-happy';
  } else if (st === 'wrong') {
    btn.classList.add('speech-mic-idle');
    btn.innerHTML = '<span style="font-size:28px">🎤</span>';
    bubble.textContent = 'Скажите это слово:';
    badge.style.display = 'flex';
    word.className = 'speech-greek-word speech-wrong';
    char.className = 'speech-character speech-character-thinking';
  }
}

function onSpeechMicClick() {
  if (speechSession.uiState === 'recording') return;

  if (speechSession.uiState === 'correct') {
    speechSession.index++;
    if (speechSession.index >= speechSession.total) {
      finishSpeechSession();
    } else {
      renderSpeechCard();
    }
    return;
  }

  startSpeechRecognition();
}

// Нативное распознавание (в приложении) — вместо Web Speech API, которого нет в WKWebView.
function runNativeSpeech() {
  const ns = window.__iziNativeSpeech;
  const recognize = () => {
    setSpeechUIState('recording');
    ns.recognize('fr-FR').then(alts => {
      const target = speechSession.words[speechSession.index].greek;
      const el = document.getElementById('speech-recognized');
      if (el) el.textContent = (alts && alts[0]) || '';
      const ok = (alts || []).some(t => normalizeGreekSpeech(t) === normalizeGreekSpeech(target));
      if (ok) {
        speechSession.correctCount++;
        speechSession.xpEarned += 5;
        setSpeechUIState('correct');
      } else {
        setSpeechUIState('wrong');
      }
    }).catch(() => {
      setSpeechUIState('idle');
      const el = document.getElementById('speech-recognized');
      if (el) el.textContent = '🎙️ Не удалось распознать. Попробуй ещё раз.';
    });
  };
  if (speechSession.micGranted) { recognize(); return; }
  ns.requestPermission().then(granted => {
    if (granted) { speechSession.micGranted = true; recognize(); }
    else {
      setSpeechUIState('idle');
      const el = document.getElementById('speech-recognized');
      if (el) el.textContent = '🎙️ Разреши доступ к микрофону и распознаванию речи в Настройках.';
    }
  });
}

function startSpeechRecognition() {
  // В приложении идём нативным путём (SFSpeechRecognizer) — Web Speech API в WKWebView нет.
  if (window.__iziNativeSpeech) { runNativeSpeech(); return; }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert('Ваш браузер не поддерживает распознавание речи. Используйте Chrome или Safari.');
    return;
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (speechSession.micGranted || isMobile) {
    // Разрешение уже есть (или мобиль) — запускаем сразу
    runSpeechRecognition(SR);
  } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Первый раз на десктопе — запрашиваем разрешение
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        stream.getTracks().forEach(t => t.stop());
        speechSession.micGranted = true;
        runSpeechRecognition(SR);
      })
      .catch(err => {
        setSpeechUIState('idle');
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          alert('Нужен доступ к микрофону. Разреши его в настройках браузера и попробуй снова.');
        }
      });
  } else {
    runSpeechRecognition(SR);
  }
}

function runSpeechRecognition(SR) {
  setSpeechUIState('recording');
  const r = new SR();
  r.lang = 'fr-FR';
  r.continuous = false;
  r.interimResults = false;
  r.maxAlternatives = 6;
  speechSession.recognition = r;

  // Таймаут — если за 9 секунд ничего не распознано, останавливаем
  const timeout = setTimeout(() => {
    if (speechSession.uiState === 'recording') {
      try { r.stop(); } catch(e) {}
    }
  }, 9000);

  r.onspeechend = () => {
    // Речь закончилась — принудительно останавливаем, чтобы получить результат
    try { r.stop(); } catch(e) {}
  };

  r.onresult = (event) => {
    clearTimeout(timeout);
    const target = speechSession.words[speechSession.index].greek;
    const alts = Array.from(event.results[0]).map(a => a.transcript);
    document.getElementById('speech-recognized').textContent = alts[0] || '';
    const ok = alts.some(t => normalizeGreekSpeech(t) === normalizeGreekSpeech(target));
    if (ok) {
      speechSession.correctCount++;
      speechSession.xpEarned += 5;
      setSpeechUIState('correct');
    } else {
      setSpeechUIState('wrong');
    }
  };

  r.onerror = (e) => {
    clearTimeout(timeout);
    if (e.error === 'not-allowed') {
      alert('Нужен доступ к микрофону. Разреши его в настройках браузера и попробуй снова.');
    }
    if (e.error !== 'aborted') setSpeechUIState('idle');
  };

  r.onend = () => {
    clearTimeout(timeout);
    if (speechSession.uiState === 'recording') setSpeechUIState('idle');
    speechSession.recognition = null;
  };

  r.start();
}

function normalizeGreekSpeech(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u0345]/g, '')
    .replace(/[^a-z]/gi, '')
    .trim();
}

function finishSpeechSession() {
  // Award XP
  const xp = speechSession.xpEarned + 10; // +10 bonus for finishing
  state.totalXp += xp;
  state.dailyXp = (state.dailyXp || 0) + xp;
  state.level = Math.floor(state.totalXp / 500) + 1;
  state.lessonsCompleted = (state.lessonsCompleted || 0) + 1;
  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = (state.lastPlayed === yesterday.toDateString()) ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }
  saveState();
  checkAchievements({});

  document.getElementById('speech-complete-correct').textContent = speechSession.correctCount;
  document.getElementById('speech-complete-xp').textContent = '+' + xp;
  document.getElementById('speech-complete-total').textContent = speechSession.total;
  showScreen('screen-speech-complete');
}

function exitSpeechTraining() {
  if (speechSession.recognition) {
    try { speechSession.recognition.abort(); } catch(e) {}
    speechSession.recognition = null;
  }
  showSpeechTraining();
}

// ============================================================
// TEACH PHASE — карточки перед уроком
// ============================================================
function startTeachPhase(mod) {
  teachState = { module: mod, cards: mod.verbs, currentCard: 0 };
  renderTeachCard();
  showScreen('screen-teach');
}

function renderTeachCard() {
  const { cards, currentCard, module } = teachState;
  const total = cards.length;
  const pct = (currentCard / total) * 100;
  document.getElementById('teach-progress').style.width = pct + '%';
  document.getElementById('teach-counter').textContent = `${Math.min(currentCard + 1, total)}/${total}`;

  if (currentCard >= total) {
    document.getElementById('teach-label').textContent = 'Готово — ты изучил все слова!';
    document.getElementById('teach-card-area').innerHTML = `
      <div class="teach-summary-card">
        <div class="teach-summary-icon">🎯</div>
        <div class="teach-summary-title">Урок ${module.id} · Слова изучены</div>
        <div class="teach-summary-words">${cards.map(v =>
          `<span class="teach-summary-word">${v.infinitive} — ${v.translation}</span>`
        ).join('')}</div>
        <div class="teach-summary-hint">Теперь проверим, как ты запомнил</div>
      </div>`;
    const btn = document.getElementById('teach-next-btn');
    btn.textContent = 'Начать упражнения ▶';
    btn.onclick = finishTeachPhase;
    return;
  }

  const verb = cards[currentCard];
  document.getElementById('teach-label').textContent = `Урок ${module.id} · Слово ${currentCard + 1} из ${total}`;
  document.getElementById('teach-card-area').innerHTML = `
    <div class="teach-greek-row">
      <div class="teach-greek-word">${verb.infinitive}</div>
      <button class="teach-speak-btn" onclick="speakGreek('${verb.infinitive.replace(/'/g, "\\'")}')">🔊</button>
    </div>
    ${verb.transcription ? `<div class="teach-transcription">${verb.transcription}</div>` : ''}
    <div class="teach-translation">${verb.translation}</div>
    ${verb.note ? `<div class="teach-note">${verb.note}</div>` : ''}
    ${verb.example ? `
    <div class="teach-example-box">
      <div class="teach-example-label">Пример:</div>
      <button class="teach-example-speak" onclick="speakGreek('${verb.example.greek.replace(/'/g, "\\'")}')">🔊</button>
      <div class="teach-example-greek">${verb.example.greek}</div>
      <div class="teach-example-ru">${verb.example.ru}</div>
    </div>` : ''}
    <details class="teach-conj-details">
      <summary class="teach-conj-summary">Спряжение ▾</summary>
      ${[
        { label: 'Настоящее', forms: verb.present },
        { label: 'Прошедшее (passé composé)', forms: verb.preterite },
        { label: 'Будущее (futur simple)', forms: verb.future },
      ].filter(t => t.forms).map(t => `
        <div class="teach-conj-tense">${t.label}</div>
        <div class="teach-conj-grid">
          ${Object.entries(t.forms).map(([pr, form]) =>
            `<span class="teach-conj-pr">${pr}</span><span class="teach-conj-form" onclick="speakGreek('${frForm(pr, form).replace(/'/g, "\\'")}')">${frForm(pr, form)}</span>`
          ).join('')}
        </div>
      `).join('')}
    </details>`;

  const btn = document.getElementById('teach-next-btn');
  btn.textContent = currentCard < total - 1 ? 'Следующее слово →' : 'Последнее! →';
  btn.onclick = nextTeachCard;
}

function nextTeachCard() {
  teachState.currentCard++;
  renderTeachCard();
}

function finishTeachPhase() {
  const mod = teachState.module;
  lessonState = {
    exercises: generateLesson(mod.verbs),
    currentIndex: 0, hearts: 3, xpEarned: 0, correct: 0,
    answered: false, isWeakMode: false, isSrsMode: false
  };
  showScreen('screen-lesson');
  renderExercise();
}

// ============================================================
// EXAM PREP — подготовка к DELF A2 / B1
// Материал переписан под французский экзамен 2026-09-24: структура частей,
// проходной балл 50/100 с порогом 5 в каждой части, passé composé против
// imparfait, ситуации из французского быта (префектура, CAF, syndic).
// ============================================================
function showExamPrep() {
  showScreen('screen-exam');
}

function showExamSection(section) {
  if (section === 'tests')     { startExamMockTest(); return; }
  if (section === 'listening') { startExamListening(); return; }
  const map = {
    structure: ['🗺️ Как устроен экзамен', getExamStructureHTML],
    writing:   ['✍️ Письмо',              getExamWritingHTML],
    speaking:  ['🗣️ Говорение',           getExamSpeakingHTML],
    grammar:   ['📚 Грамматика A2/B1',    getExamGrammarHTML],
    tips:      ['💡 Лайфхаки',            getExamTipsHTML],
    vocab:      ['📖 Экзаменационный словарь', getExamVocabHTML],
    listening:  ['🎧 Аудирование',            null],
  };
  const [title, fn] = map[section] || map.tips;
  document.getElementById('exam-detail-title').textContent = title;
  document.getElementById('exam-detail-body').innerHTML = fn();
  showScreen('screen-exam-detail');
}

function getExamStructureHTML() {
  return `
<div class="exam-info-banner">
  <div class="exam-info-row"><span>📍 Организатор</span><strong>France Éducation international</strong></div>
  <div class="exam-info-row"><span>🏛️ Где сдают</span><strong>Alliance Française и аккредитованные центры</strong></div>
  <div class="exam-info-row"><span>📅 Сессии</span><strong>Несколько раз в год, даты у центра</strong></div>
  <div class="exam-info-row"><span>🎯 Для гражданства</span><strong>B2 (с 2026 года, было B1)</strong></div>
</div>

<div class="exam-note-block">
  DELF — государственный диплом Министерства образования Франции. Он бессрочный:
  сдал один раз — действует всю жизнь, в отличие от TCF и TEF, у которых срок два года.
  Уровни A1, A2, B1, B2; выше идёт DALF (C1, C2).
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">1</span>
    <div><div class="exam-part-title">🎧 Compréhension de l'oral</div><div class="exam-part-time">~25 минут · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">Аудирование. Записи звучат <strong>дважды</strong>, между прослушиваниями есть пауза на ответы.</div>
  <div class="exam-part-label">Типы заданий:</div>
  <ul class="exam-part-list">
    <li>Выбор из 3 вариантов (A/B/C)</li>
    <li>Записать цифру: время, цену, номер, дату</li>
    <li>Короткий ответ своими словами</li>
  </ul>
  <div class="exam-part-example">
    <b>Примеры ситуаций:</b> объявление на вокзале · автоответчик врача · разговор коллег · репортаж по радио · сообщение из школы
  </div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">2</span>
    <div><div class="exam-part-title">📖 Compréhension des écrits</div><div class="exam-part-time">30 мин (A2) · 45 мин (B1) · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">Чтение. На A2 — короткие бытовые документы, на B1 добавляется текст с аргументацией.</div>
  <div class="exam-part-label">Типы заданий:</div>
  <ul class="exam-part-list">
    <li>Vrai / Faux с обязательной <strong>цитатой из текста</strong></li>
    <li>Выбор из вариантов</li>
    <li>Найти соответствие: объявление ↔ человек</li>
    <li>Ответить на вопрос по тексту</li>
  </ul>
  <div class="exam-part-example">
    <b>Примеры текстов:</b> письмо из CAF · объявление об аренде · программа праздника · статья о транспорте · форум с отзывами
  </div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">3</span>
    <div><div class="exam-part-title">✍️ Production écrite</div><div class="exam-part-time">45 минут · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">
    <strong>A2: два коротких текста по 60–80 слов.</strong><br>
    <strong>B1: один текст на 160–180 слов</strong> — рассказ, письмо или изложение позиции.
  </div>
  <div class="exam-part-label">Что просят на A2:</div>
  <ul class="exam-part-list">
    <li>Рассказать о событии в прошлом: поездка, праздник, переезд</li>
    <li>Написать письмо: пригласить, поблагодарить, извиниться</li>
  </ul>
  <div class="exam-part-label" style="margin-top:8px">Что просят на B1:</div>
  <ul class="exam-part-list">
    <li>Изложить своё мнение и обосновать его</li>
    <li>Описать опыт и чувства по поводу события</li>
    <li>Написать письмо с просьбой или жалобой</li>
  </ul>
  <div class="exam-part-example">💡 Количество слов считают: за недобор снимают баллы. Структура и связки важнее редкой лексики.</div>
</div>

<div class="exam-part-card">
  <div class="exam-part-header">
    <span class="exam-part-num">4</span>
    <div><div class="exam-part-title">🗣️ Production orale</div><div class="exam-part-time">6–8 мин (A2) · ~15 мин (B1) · 25 баллов</div></div>
  </div>
  <div class="exam-part-desc">Разговор один на один с экзаменатором. Перед началом дают <strong>10 минут на подготовку</strong>. Три части:</div>
  <ul class="exam-part-list">
    <li><strong>Entretien dirigé</strong> — вопросы о себе: кто ты, чем занимаешься, как оказался во Франции</li>
    <li><strong>Monologue suivi</strong> (A2) — рассказ по вытянутой теме. На B1 — <strong>exercice en interaction</strong>: разыгрываете ситуацию</li>
    <li><strong>Exercice en interaction</strong> (A2) — бытовая сценка. На B1 — <strong>expression d'un point de vue</strong>: высказываете мнение по короткому тексту</li>
  </ul>
  <div class="exam-part-example">💡 Тему тянут жребием, обычно из двух на выбор. Говори медленно и связками: d'abord, ensuite, par contre, donc.</div>
</div>

<div class="exam-scoring-block">
  <div class="exam-scoring-title">⚖️ Проходной балл</div>
  <div class="exam-scoring-row"><span>Каждая из четырёх частей</span><span>макс. 25 баллов</span></div>
  <div class="exam-scoring-row"><span>Итого максимум</span><span>100 баллов</span></div>
  <div class="exam-scoring-row exam-scoring-pass"><span>Минимум для сдачи</span><span>50 из 100</span></div>
  <div class="exam-scoring-row exam-scoring-pass"><span>И при этом в каждой части</span><span>не меньше 5 из 25</span></div>
  <div class="exam-scoring-note">Слабую часть можно вытянуть остальными, но ноль в одной топит весь экзамен: порог 5 баллов обязателен для каждой.</div>
</div>`;
}

function sp(text) {
  return `onclick="speakGreek('${text.replace(/'/g,"\\'")}')"`;
}

function getExamSpeakingHTML() {
  return `
<div class="speaking-intro">
  Production orale — <strong>3 части</strong>. На A2 это 6–8 минут, на B1 около 15. Перед началом дают <strong>10 минут на подготовку</strong>. Оценивают связность речи, словарь и грамматику; медленная правильная речь лучше быстрой с ошибками.
</div>

<div class="speaking-stage-header">Часть 1 · Entretien dirigé</div>
<div class="speaking-stage-hint">Экзаменатор расспрашивает о тебе. Ответы стоит знать наизусть — это единственная часть, которую можно полностью подготовить заранее.</div>

${[
  ['Comment vous appelez-vous ?','Как вас зовут?','Je m\'appelle Olga Ivanova.','Меня зовут Ольга Иванова.'],
  ['D\'où venez-vous ?','Откуда вы?','Je viens de Russie, de Moscou.','Я из России, из Москвы.'],
  ['Depuis combien de temps habitez-vous en France ?','Сколько времени вы живёте во Франции?','J\'habite en France depuis quatre ans.','Я живу во Франции четыре года.'],
  ['Qu\'est-ce que vous faites dans la vie ?','Чем вы занимаетесь?','Je suis comptable, je travaille dans une petite entreprise à Lyon.','Я бухгалтер, работаю в небольшой компании в Лионе.'],
  ['Parlez-moi de votre famille.','Расскажите о своей семье.','Je suis mariée et j\'ai deux enfants. Ils vont à l\'école ici.','Я замужем, у меня двое детей. Они ходят здесь в школу.'],
  ['Pourquoi apprenez-vous le français ?','Почему вы учите французский?','J\'apprends le français pour parler avec mes voisins, comprendre les papiers administratifs et me sentir chez moi ici.','Учу французский, чтобы говорить с соседями, понимать документы и чувствовать себя здесь дома.'],
  ['Qu\'est-ce que vous aimez faire le week-end ?','Чем любите заниматься в выходные?','Le week-end, je vais au marché et je me promène au bord de la rivière avec ma famille.','По выходным хожу на рынок и гуляю с семьёй у реки.'],
].map(([q,qru,a,aru]) => `
  <div class="speaking-qa-card">
    <div class="speaking-q-row">
      <div class="speaking-q">${q}</div>
      <button class="speaking-tts-btn" ${sp(q)}>🔊</button>
    </div>
    <div class="speaking-qru">${qru}</div>
    <div class="speaking-a-row">
      <div class="speaking-a">${a}</div>
      <button class="speaking-tts-btn" ${sp(a)}>🔊</button>
    </div>
    <div class="speaking-aru">${aru}</div>
  </div>`).join('')}

<div class="speaking-stage-header">Часть 2 · Monologue suivi (A2)</div>
<div class="speaking-stage-hint">Тянешь карточку с темой и рассказываешь минуту-две. На B1 вместо монолога — разыгранная ситуация. Эти связки нужны и там, и там:</div>

<div class="speaking-phrases-card">
${[
  ['D\'abord, je voudrais dire que…','Сначала я хотел бы сказать, что…'],
  ['Ensuite, il y a aussi…','Затем есть ещё…'],
  ['Par exemple, quand je…','Например, когда я…'],
  ['À mon avis, c\'est important parce que…','На мой взгляд, это важно, потому что…'],
  ['Par contre, je pense que…','С другой стороны, я думаю, что…'],
  ['Pour conclure, je dirais que…','В заключение я бы сказал, что…'],
  ['Ça dépend des situations.','Это зависит от ситуации.'],
].map(([fr,ru]) => `
  <div class="speaking-phrase-row">
    <div class="speaking-phrase-left">
      <div class="speaking-phrase-gr">${fr}</div>
      <div class="speaking-phrase-ru">${ru}</div>
    </div>
    <button class="speaking-tts-btn" ${sp(fr)}>🔊</button>
  </div>`).join('')}
</div>

<div class="speaking-stage-header">Часть 3 · Exercice en interaction</div>
<div class="speaking-stage-hint">Бытовая сценка с экзаменатором: ты решаешь задачу, он играет вторую роль. Типичные ситуации во Франции:</div>

${[
  ['🏥 Записаться к врачу',['Bonjour, je voudrais prendre rendez-vous.','C\'est assez urgent, j\'ai de la fièvre depuis trois jours.','Vous avez quelque chose cette semaine ?','Est-ce que vous prenez de nouveaux patients ?']],
  ['🏠 Снять квартиру',['Je suis intéressé par l\'annonce.','Est-ce que les charges sont comprises ?','Quand est-ce que je peux visiter ?','Il faut un garant ou la garantie Visale suffit ?']],
  ['🎒 Записать ребёнка в школу',['Je voudrais inscrire mon enfant à l\'école.','Quels documents faut-il apporter ?','Il ne parle pas encore bien français.','Est-ce qu\'il y a une cantine ?']],
  ['🛍️ Вернуть покупку',['Je voudrais échanger cet article.','Voici le ticket de caisse.','Il ne me va pas, c\'est trop petit.','Est-ce que je peux avoir un remboursement ?']],
  ['🚆 Купить билет и поменять его',['Un aller-retour pour Lyon, s\'il vous plaît.','Le train part de quel quai ?','Je peux changer mon billet pour demain ?','Il y a un supplément ?']],
].map(([title, phrases]) => `
  <details class="speaking-topic-card">
    <summary>${title}</summary>
    <div class="speaking-topic-phrases">
      ${phrases.map(ph => `
        <div class="speaking-topic-phrase-row">
          <span>${ph}</span>
          <button class="speaking-tts-btn" ${sp(ph)}>🔊</button>
        </div>`).join('')}
    </div>
  </details>`).join('')}

<div class="speaking-tip-block">
  💡 <strong>Забыл слово</strong> — не молчи. Скажи <em ${sp('Comment dit-on… en français ?')} style="cursor:pointer;color:#9B59B6">«Comment dit-on… en français ?»</em> или опиши другими словами: «c\'est une chose pour…». Экзаменатор оценивает умение выкручиваться, а не словарь.
</div>`;
}

function getExamWritingHTML() {
  return `
<div class="writing-intro">
  <strong>A2:</strong> два коротких текста по 60–80 слов за 45 минут.<br>
  <strong>B1:</strong> один текст на 160–180 слов — мнение, рассказ или письмо.<br>
  Слова считают. Шаблон ниже закрывает структуру, остаётся подставить тему.
</div>

<!-- ===== НЕФОРМАЛЬНОЕ ПИСЬМО ===== -->
<div class="writing-type-header">📩 Тип 1 — Письмо другу (неформальное)</div>

<div class="writing-template-card">
  <div class="writing-template-title">Универсальный шаблон</div>
  <div class="writing-block writing-block-open">
    <div class="writing-block-label">Обращение</div>
    <div class="writing-greek">Salut Marie, / Cher Paul,</div>
    <div class="writing-ru">Привет, Мари, / Дорогой Поль,</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Начало — как дела</div>
    <div class="writing-greek">Comment vas-tu ? J'espère que tout va bien pour toi.</div>
    <div class="writing-ru">Как ты? Надеюсь, у тебя всё хорошо.</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Основная часть (меняется по теме)</div>
    <div class="writing-greek">Je t'écris parce que je voudrais te raconter…</div>
    <div class="writing-ru">Пишу тебе, потому что хочу рассказать…</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Вопрос в конце</div>
    <div class="writing-greek">Et toi, quoi de neuf ? Donne-moi de tes nouvelles.</div>
    <div class="writing-ru">А у тебя что нового? Напиши, как дела.</div>
  </div>
  <div class="writing-block writing-block-close">
    <div class="writing-block-label">Закрытие</div>
    <div class="writing-greek">À bientôt ! Je t'embrasse,<br><em>Olga</em></div>
    <div class="writing-ru">До скорого! Обнимаю, Ольга</div>
  </div>
</div>

<div class="writing-topics-label">📋 Темы, которые дают, и что писать:</div>

<details class="writing-topic">
  <summary>🥐 Переезд и первые впечатления</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Je t'écris de Lyon : nous avons enfin déménagé le mois dernier. L'appartement est petit mais lumineux, et il y a une boulangerie juste en bas. Les voisins sont très gentils : ils sont venus se présenter le premier soir. Le plus difficile, c'est l'administration — j'ai passé deux heures à la préfecture. Et toi, quoi de neuf ?</div>
    <div class="writing-ru">Пишу тебе из Лиона: в прошлом месяце мы наконец переехали. Квартира маленькая, но светлая, а прямо внизу булочная. Соседи очень славные: пришли познакомиться в первый же вечер. Самое трудное — бюрократия, я провела два часа в префектуре. А у тебя что нового?</div>
  </div>
</details>

<details class="writing-topic">
  <summary>🎉 Праздник или день рождения</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Samedi dernier, j'ai fêté mon anniversaire à la maison. J'ai invité mes collègues et quelques voisins. Nous avons mangé une tarte aux pommes que j'ai préparée moi-même et nous avons beaucoup ri. Un ami a apporté sa guitare et nous avons chanté jusqu'à minuit. C'était une soirée vraiment réussie.</div>
    <div class="writing-ru">В прошлую субботу я отмечала день рождения дома. Позвала коллег и нескольких соседей. Мы ели яблочный пирог, который я испекла сама, и много смеялись. Друг принёс гитару, и мы пели до полуночи. Вечер получился отличный.</div>
  </div>
</details>

<details class="writing-topic">
  <summary>🏖️ Поездка или отпуск</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">En août, nous sommes partis une semaine en Bretagne. Nous avons loué une petite maison près de la mer. Il a plu deux jours, mais après il a fait très beau. Nous nous sommes promenés le long de la côte et nous avons mangé des crêpes tous les soirs. Je te conseille vraiment cette région.</div>
    <div class="writing-ru">В августе мы уехали на неделю в Бретань. Сняли маленький дом у моря. Два дня шёл дождь, зато потом была прекрасная погода. Мы гуляли вдоль побережья и каждый вечер ели блины. Очень советую тебе этот край.</div>
  </div>
</details>

<details class="writing-topic">
  <summary>📅 Приглашение</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Je voudrais t'inviter chez moi samedi prochain vers dix-neuf heures. On fête la fin des travaux dans l'appartement. Il y aura quelques amis, de la musique et surtout beaucoup à manger. Tu peux venir avec ta sœur si tu veux. Dis-moi vite si tu es libre !</div>
    <div class="writing-ru">Хочу позвать тебя к себе в следующую субботу около семи вечера. Отмечаем окончание ремонта в квартире. Будут друзья, музыка и, главное, много еды. Можешь прийти с сестрой, если хочешь. Ответь поскорее, свободна ли ты!</div>
  </div>
</details>

<!-- ===== ОФИЦИАЛЬНОЕ ПИСЬМО ===== -->
<div class="writing-type-header" style="margin-top:8px">🏛️ Тип 2 — Официальное письмо</div>

<div class="writing-template-card">
  <div class="writing-template-title">Универсальный шаблон</div>
  <div class="writing-block writing-block-open">
    <div class="writing-block-label">Обращение</div>
    <div class="writing-greek">Madame, Monsieur,</div>
    <div class="writing-ru">Уважаемые господа,</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Тема</div>
    <div class="writing-greek">Objet : demande d'information / demande d'inscription</div>
    <div class="writing-ru">Тема: запрос информации / заявление о записи</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Кто вы</div>
    <div class="writing-greek">Je m'appelle Olga Ivanova et j'habite à Lyon depuis trois ans.</div>
    <div class="writing-ru">Меня зовут Ольга Иванова, я живу в Лионе три года.</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Цель письма</div>
    <div class="writing-greek">Je vous écris afin de vous demander des informations concernant…</div>
    <div class="writing-ru">Пишу вам, чтобы запросить информацию о…</div>
  </div>
  <div class="writing-block">
    <div class="writing-block-label">Вопросы</div>
    <div class="writing-greek">Pourriez-vous me préciser les horaires, le tarif et les documents nécessaires ?</div>
    <div class="writing-ru">Не могли бы вы уточнить расписание, стоимость и необходимые документы?</div>
  </div>
  <div class="writing-block writing-block-close">
    <div class="writing-block-label">Закрытие</div>
    <div class="writing-greek">Dans l'attente de votre réponse, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.<br><em>Olga Ivanova</em></div>
    <div class="writing-ru">В ожидании вашего ответа примите, госпожа, господин, мои наилучшие пожелания. Ольга Иванова</div>
  </div>
</div>

<details class="writing-topic">
  <summary>📚 Запрос о курсах французского</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Je vous écris afin d'obtenir des informations sur vos cours de français. Je suis de niveau A2 et je souhaite préparer le DELF B1. Pourriez-vous me préciser quand commencent les cours, combien de séances par semaine sont prévues, quel est le tarif et quels documents il faut fournir pour l'inscription ?</div>
    <div class="writing-ru">Пишу вам, чтобы получить информацию о курсах французского. У меня уровень A2, и я хочу готовиться к DELF B1. Не могли бы вы уточнить, когда начинаются занятия, сколько их в неделю, какова стоимость и какие документы нужны для записи?</div>
  </div>
</details>

<details class="writing-topic">
  <summary>🏠 Жалоба владельцу жилья</summary>
  <div class="writing-topic-body">
    <div class="writing-greek">Je me permets de vous écrire au sujet du chauffage de mon appartement, qui ne fonctionne plus depuis le 10 janvier. Malgré mes deux appels, aucun technicien n'est venu. La température ne dépasse pas quinze degrés. Je vous demande d'intervenir dans les plus brefs délais.</div>
    <div class="writing-ru">Позволю себе написать вам по поводу отопления в моей квартире, которое не работает с 10 января. Несмотря на два моих звонка, мастер так и не пришёл. Температура не поднимается выше пятнадцати градусов. Прошу вас вмешаться в кратчайшие сроки.</div>
  </div>
</details>

<div class="writing-phrases-block">
  <div class="writing-phrases-title">🔑 Ключевые фразы — выучи наизусть</div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Je t'écris parce que…</span><span class="writing-phrase-ru">Пишу тебе, потому что…</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Je voudrais te raconter que…</span><span class="writing-phrase-ru">Хочу тебе рассказать, что…</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">C'était vraiment super !</span><span class="writing-phrase-ru">Было правда здорово!</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">J'ai été très content(e) de…</span><span class="writing-phrase-ru">Я был(а) очень рад(а)…</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">J'ai hâte de te voir !</span><span class="writing-phrase-ru">Не могу дождаться встречи!</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Merci pour ta lettre.</span><span class="writing-phrase-ru">Спасибо за твоё письмо.</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Je vous écris afin de…</span><span class="writing-phrase-ru">Пишу вам, чтобы…</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Pourriez-vous me préciser…</span><span class="writing-phrase-ru">Не могли бы вы уточнить…</span></div>
  <div class="writing-phrase-row"><span class="writing-phrase-gr">Je vous prie d'agréer mes salutations distinguées.</span><span class="writing-phrase-ru">Примите мои наилучшие пожелания (офиц. концовка)</span></div>
</div>`;
}

function getExamGrammarHTML() {
  return `
<div class="gram-nav">Нажми на тему:</div>
<div class="gram-toc">
  <button class="gram-toc-btn" onclick="document.getElementById('gr1').scrollIntoView({behavior:'smooth'})">Présent</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr2').scrollIntoView({behavior:'smooth'})">Passé composé</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr3').scrollIntoView({behavior:'smooth'})">Imparfait</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr4').scrollIntoView({behavior:'smooth'})">Будущее</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr5').scrollIntoView({behavior:'smooth'})">Артикли</button>
  <button class="gram-toc-btn" onclick="document.getElementById('gr6').scrollIntoView({behavior:'smooth'})">Связки</button>
</div>

<div id="gr1" class="gram-block">
  <div class="gram-title">🔵 Présent</div>
  <div class="gram-subtitle">Первая группа, -ER: parler, travailler, habiter, acheter, écouter</div>
  <table class="gram-table">
    <tr><td>je</td><td>parl<b>e</b></td><td>travaill<b>e</b></td></tr>
    <tr><td>tu</td><td>parl<b>es</b></td><td>travaill<b>es</b></td></tr>
    <tr><td>il/elle</td><td>parl<b>e</b></td><td>travaill<b>e</b></td></tr>
    <tr><td>nous</td><td>parl<b>ons</b></td><td>travaill<b>ons</b></td></tr>
    <tr><td>vous</td><td>parl<b>ez</b></td><td>travaill<b>ez</b></td></tr>
    <tr><td>ils/elles</td><td>parl<b>ent</b></td><td>travaill<b>ent</b></td></tr>
  </table>
  <div class="gram-tip">💡 Формы je / tu / il / ils звучат ОДИНАКОВО — ПАРЛЬ. Разница только на письме, и экзаменатор это проверяет именно в письменной части.</div>
  <div class="gram-subtitle" style="margin-top:10px">Вторая группа, -IR с -iss-: finir, choisir, réussir</div>
  <table class="gram-table">
    <tr><td>je finis</td><td>tu finis</td><td>il finit</td></tr>
    <tr><td>nous finissons</td><td>vous finissez</td><td>ils finissent</td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Неправильные — учить отдельно</div>
  <table class="gram-table">
    <tr><td>être</td><td>suis / es / est / sommes / êtes / sont</td></tr>
    <tr><td>avoir</td><td>ai / as / a / avons / avez / ont</td></tr>
    <tr><td>aller</td><td>vais / vas / va / allons / allez / vont</td></tr>
    <tr><td>faire</td><td>fais / fais / fait / faisons / faites / font</td></tr>
  </table>
</div>

<div id="gr2" class="gram-block">
  <div class="gram-title">🟠 Passé composé</div>
  <div class="gram-tip">💡 Главное время для письма и говорения: всё, что уже случилось. Строится из двух частей — вспомогательный глагол плюс причастие.</div>
  <div class="gram-subtitle" style="margin-top:8px">С AVOIR — подавляющее большинство глаголов</div>
  <table class="gram-table">
    <tr><th>Инфинитив</th><th>Причастие</th><th>Пример</th></tr>
    <tr><td>parler</td><td>parl<b>é</b></td><td>j'ai parlé — я поговорил</td></tr>
    <tr><td>finir</td><td>fin<b>i</b></td><td>j'ai fini — я закончил</td></tr>
    <tr><td>attendre</td><td>attend<b>u</b></td><td>j'ai attendu — я подождал</td></tr>
    <tr><td>faire</td><td>fait</td><td>j'ai fait — я сделал</td></tr>
    <tr><td>prendre</td><td>pris</td><td>j'ai pris — я взял</td></tr>
    <tr><td>voir</td><td>vu</td><td>j'ai vu — я увидел</td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">С ÊTRE — движение, изменение состояния и все возвратные</div>
  <table class="gram-table">
    <tr><td colspan="2">aller · venir · arriver · partir · entrer · sortir · monter · descendre · rester · tomber · naître · mourir</td></tr>
    <tr><td>je suis allé(e)</td><td>я пошёл / пошла</td></tr>
    <tr><td>elle est partie</td><td>она уехала</td></tr>
    <tr><td>nous sommes restés</td><td>мы остались</td></tr>
    <tr><td>je me suis levé(e)</td><td>я встал(а)</td></tr>
  </table>
  <div class="gram-tip">⚠️ С être причастие согласуется с подлежащим: elle est allé<b>e</b>, ils sont allé<b>s</b>, elles sont allé<b>es</b>. На письме это ловят в первую очередь.</div>
</div>

<div id="gr3" class="gram-block">
  <div class="gram-title">🟣 Imparfait</div>
  <div class="gram-subtitle">Фон, привычка, описание. Берём форму nous в présent, убираем -ons, добавляем окончания</div>
  <table class="gram-table">
    <tr><td>je parl<b>ais</b></td><td>tu parl<b>ais</b></td><td>il parl<b>ait</b></td></tr>
    <tr><td>nous parl<b>ions</b></td><td>vous parl<b>iez</b></td><td>ils parl<b>aient</b></td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Passé composé или imparfait?</div>
  <table class="gram-table">
    <tr><th>Смысл</th><th>Время</th><th>Пример</th></tr>
    <tr><td>Однократное событие</td><td>passé composé</td><td>Hier, j'ai visité un appartement.</td></tr>
    <tr><td>Повторялось раньше</td><td>imparfait</td><td>Avant, je visitais des appartements chaque samedi.</td></tr>
    <tr><td>Описание обстановки</td><td>imparfait</td><td>Il faisait froid, la rue était vide.</td></tr>
    <tr><td>Событие на фоне</td><td>оба</td><td>Je dormais quand le téléphone a sonné.</td></tr>
  </table>
  <div class="gram-tip">💡 На B1 умение развести эти два времени — половина оценки за письменную часть.</div>
</div>

<div id="gr4" class="gram-block">
  <div class="gram-title">🟢 Будущее</div>
  <table class="gram-table">
    <tr><th>Форма</th><th>Как строится</th><th>Пример</th></tr>
    <tr><td>Futur proche</td><td>aller + инфинитив</td><td>Je vais partir demain.</td></tr>
    <tr><td>Futur simple</td><td>инфинитив + ai/as/a/ons/ez/ont</td><td>Je partirai demain.</td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Неправильные основы futur simple</div>
  <table class="gram-table">
    <tr><td>être → ser-</td><td>avoir → aur-</td><td>aller → ir-</td></tr>
    <tr><td>faire → fer-</td><td>venir → viendr-</td><td>pouvoir → pourr-</td></tr>
    <tr><td>vouloir → voudr-</td><td>devoir → devr-</td><td>voir → verr-</td></tr>
  </table>
</div>

<div id="gr5" class="gram-block">
  <div class="gram-title">🔶 Артикли и предлоги</div>
  <table class="gram-table">
    <tr><th>Тип</th><th>Формы</th><th>Когда</th></tr>
    <tr><td>Определённый</td><td>le / la / les</td><td>Известный предмет или понятие целиком</td></tr>
    <tr><td>Неопределённый</td><td>un / une / des</td><td>Первое упоминание</td></tr>
    <tr><td>Частичный</td><td>du / de la</td><td>Неисчисляемое: du pain, de l'eau</td></tr>
  </table>
  <div class="gram-tip">⚠️ После отрицания un/une/des/du превращаются в <b>de</b>: J'ai une voiture → Je n'ai pas <b>de</b> voiture. Определённый артикль не меняется: Je n'aime pas le café.</div>
  <div class="gram-subtitle" style="margin-top:10px">Слияние предлогов</div>
  <table class="gram-table">
    <tr><td>à + le = <b>au</b></td><td>à + les = <b>aux</b></td></tr>
    <tr><td>de + le = <b>du</b></td><td>de + les = <b>des</b></td></tr>
  </table>
  <div class="gram-subtitle" style="margin-top:10px">Страны</div>
  <table class="gram-table">
    <tr><td>en France, en Russie</td><td>женский род (обычно на -e)</td></tr>
    <tr><td>au Portugal, au Canada</td><td>мужской род</td></tr>
    <tr><td>aux États-Unis</td><td>множественное число</td></tr>
    <tr><td>à Paris, à Lyon</td><td>города</td></tr>
  </table>
</div>

<div id="gr6" class="gram-block">
  <div class="gram-title">🔗 Связки — за них дают баллы</div>
  <div class="gram-tip">💡 На B1 оценивают связность текста отдельным критерием. Три-четыре связки в письме поднимают оценку заметнее, чем редкие слова.</div>
  <table class="gram-table">
    <tr><th>Связка</th><th>Перевод</th><th>Зачем</th></tr>
    <tr><td>d'abord</td><td>сначала</td><td>начать перечисление</td></tr>
    <tr><td>ensuite / puis</td><td>затем</td><td>продолжить</td></tr>
    <tr><td>de plus</td><td>кроме того</td><td>добавить довод</td></tr>
    <tr><td>par contre</td><td>зато, напротив</td><td>противопоставить</td></tr>
    <tr><td>cependant</td><td>однако</td><td>то же, но формальнее</td></tr>
    <tr><td>parce que</td><td>потому что</td><td>причина</td></tr>
    <tr><td>c'est pourquoi</td><td>поэтому</td><td>следствие</td></tr>
    <tr><td>enfin / pour conclure</td><td>наконец / в заключение</td><td>закончить</td></tr>
  </table>
</div>`;
}

function getExamTipsHTML() {
  return `
<div class="tips-intro">Что реально влияет на балл DELF A2 и B1 — по устройству самого экзамена, а не по общим советам «учите слова».</div>
<div class="tip-item">
  <div class="tip-num">1</div>
  <div class="tip-body">
    <div class="tip-title">Четыре части, и каждая обязательна</div>
    <div class="tip-text">Аудирование, чтение, письмо, говорение — по 25 баллов. Для диплома нужно 50 из 100, НО минимум 5 баллов в каждой части. Ноль в одной топит весь экзамен, даже если остальные сданы блестяще. Поэтому слабую часть нельзя игнорировать — её надо дотянуть хотя бы до порога.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">2</div>
  <div class="tip-body">
    <div class="tip-title">A2 или B1 — что выбрать</div>
    <div class="tip-text">A2 подтверждает бытовое выживание: магазин, врач, транспорт. B1 — уровень, на котором можно работать и спорить. Для натурализации с 2026 года требуется B2, так что B1 — промежуточная ступень, а не финиш. Если A2 даётся уверенно, идите сразу на B1: разница в цене невелика, а диплом бессрочный.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">3</div>
  <div class="tip-body">
    <div class="tip-title">Запись слушают дважды</div>
    <div class="tip-text">В отличие от многих экзаменов, на DELF каждую запись включают два раза с паузой между. Первый раз слушайте целиком, не записывая — ловите общий смысл. Второй раз заполняйте ответы. Попытка записывать с первого прослушивания — типичная ошибка, теряется нить.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">4</div>
  <div class="tip-body">
    <div class="tip-title">Vrai/Faux требует цитату</div>
    <div class="tip-text">В чтении задание «верно или неверно» почти всегда просит justification — выписать фразу из текста. Без цитаты балл не засчитают, даже если галочка стоит правильно. Привыкайте сразу подчёркивать нужную строку.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">5</div>
  <div class="tip-body">
    <div class="tip-title">Слова считают</div>
    <div class="tip-text">На письме указано «60–80 слов» или «160–180» — это не рекомендация. За недобор снимают баллы. Научитесь на глаз определять объём: в среднем строка рукописного текста — около 10 слов. Считать в конце некогда.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">6</div>
  <div class="tip-body">
    <div class="tip-title">Связки дороже редких слов</div>
    <div class="tip-text">Связность текста — отдельный критерий оценки. Три-четыре d'abord / ensuite / par contre / c'est pourquoi поднимут оценку сильнее, чем попытка вставить сложное слово, в котором легко ошибиться.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">7</div>
  <div class="tip-body">
    <div class="tip-title">Десять минут подготовки к устному</div>
    <div class="tip-text">Перед говорением дают время с листом бумаги. Не пишите готовый текст — читать по бумажке запрещено и это видно. Записывайте только опорные слова и связки: три-четыре пункта плана хватает.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">8</div>
  <div class="tip-body">
    <div class="tip-title">Не знаешь слово — опиши его</div>
    <div class="tip-text">Экзаменатор оценивает не словарь, а способность донести мысль. «C'est une chose pour ouvrir les bouteilles» вместо забытого tire-bouchon — это плюс, а не минус. Молчание и переход на русский — минус.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">9</div>
  <div class="tip-body">
    <div class="tip-title">Passé composé против imparfait</div>
    <div class="tip-text">Половина письменных ошибок на B1 — здесь. Правило простое: случилось однажды — passé composé, происходило регулярно или описывает фон — imparfait. Потренируйтесь на своей неделе: «вчера я сходил» против «раньше я ходил каждую субботу».</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">10</div>
  <div class="tip-body">
    <div class="tip-title">Слушайте французское радио фоном</div>
    <div class="tip-text">Тридцать минут в день радио или подкаста для изучающих дают к аудированию больше, чем разбор упражнений. Не старайтесь понять всё — привыкайте к ритму и к тому, как французы глотают звуки.</div>
  </div>
</div>
<div class="tip-item">
  <div class="tip-num">11</div>
  <div class="tip-body">
    <div class="tip-title">Диплом навсегда</div>
    <div class="tip-text">DELF не истекает, в отличие от TCF и TEF, у которых срок два года. Сдали один раз — предъявляете всю жизнь. Это довод в пользу DELF, если сроки подачи на гражданство пока неясны.</div>
  </div>
</div>`;
}

function getExamVocabHTML() {
  const topics = [
    {
      id: 'v1', title: 'Личные данные', emoji: '🪪',
      hint: 'Первая часть устного экзамена — entretien dirigé',
      words: [
        ['le nom', 'лё нон', 'фамилия'],
        ['le prénom', 'лё прено́н', 'имя'],
        ['la date de naissance', 'ля дат дё нэса́нс', 'дата рождения'],
        ['la nationalité', 'ля насьоналитэ́', 'гражданство'],
        ['l\'adresse', 'лядрэ́с', 'адрес'],
        ['le numéro de téléphone', 'лё нюмеро́ дё телефо́н', 'номер телефона'],
        ['la situation familiale', 'ля ситюасьо́н фамилья́ль', 'семейное положение'],
        ['marié(e)', 'марие́', 'женат / замужем'],
        ['célibataire', 'селибатэ́р', 'холост / не замужем'],
        ['j\'ai deux enfants', 'жэ дёз-анфа́н', 'у меня двое детей'],
      ]
    },
    {
      id: 'v2', title: 'Семья', emoji: '👨‍👩‍👧',
      hint: 'Частая тема монолога и письма другу',
      words: [
        ['le mari', 'лё мари́', 'муж'],
        ['la femme', 'ля фам', 'жена'],
        ['les enfants', 'лез-анфа́н', 'дети'],
        ['le fils', 'лё фис', 'сын'],
        ['la fille', 'ля фий', 'дочь'],
        ['les parents', 'ле пара́н', 'родители'],
        ['le frère', 'лё фрэр', 'брат'],
        ['la sœur', 'ля сёр', 'сестра'],
        ['les grands-parents', 'ле гран-пара́н', 'бабушка и дедушка'],
        ['s\'occuper de', 'сокюпэ́ дё', 'заботиться о'],
      ]
    },
    {
      id: 'v3', title: 'Работа и профессия', emoji: '💼',
      hint: 'Спросят почти наверняка: qu\'est-ce que vous faites ?',
      words: [
        ['le travail', 'лё трава́й', 'работа'],
        ['l\'entreprise', 'лянтрёпри́з', 'компания'],
        ['le collègue', 'лё колле́г', 'коллега'],
        ['le chef', 'лё шеф', 'начальник'],
        ['le salaire', 'лё салэ́р', 'зарплата'],
        ['le contrat', 'лё контра́', 'договор'],
        ['chercher un emploi', 'шершэ́ эн амплуа́', 'искать работу'],
        ['l\'entretien d\'embauche', 'лянтрётье́н дамбо́ш', 'собеседование'],
        ['à temps plein', 'а тан плэн', 'полный рабочий день'],
        ['le stage', 'лё стаж', 'стажировка'],
      ]
    },
    {
      id: 'v4', title: 'Жильё', emoji: '🏠',
      hint: 'Сценка «снять квартиру» — классика interaction',
      words: [
        ['le logement', 'лё ложма́н', 'жильё'],
        ['l\'appartement', 'ляпартёма́н', 'квартира'],
        ['le loyer', 'лё луайе́', 'арендная плата'],
        ['les charges', 'ле шарж', 'коммунальные расходы'],
        ['le bail', 'лё бай', 'договор аренды'],
        ['le propriétaire', 'лё проприетэ́р', 'владелец жилья'],
        ['le locataire', 'лё локатэ́р', 'арендатор'],
        ['l\'état des lieux', 'лета́ де льё', 'опись состояния жилья'],
        ['le chauffage', 'лё шофа́ж', 'отопление'],
        ['déménager', 'деменажэ́', 'переезжать'],
      ]
    },
    {
      id: 'v5', title: 'Здоровье', emoji: '🏥',
      hint: 'Запись к врачу — частая ситуация на устном',
      words: [
        ['le médecin', 'лё медсэ́н', 'врач'],
        ['le rendez-vous', 'лё рандэву́', 'приём, встреча'],
        ['l\'ordonnance', 'лёрдона́нс', 'рецепт'],
        ['la pharmacie', 'ля фармаси́', 'аптека'],
        ['avoir mal à', 'авуа́р маль а', 'испытывать боль в'],
        ['la fièvre', 'ля фьевр', 'температура'],
        ['la carte Vitale', 'ля карт вита́ль', 'карта медстраховки'],
        ['l\'arrêt de travail', 'лярэ́ дё трава́й', 'больничный'],
        ['les urgences', 'лез-юржа́нс', 'приёмный покой'],
        ['se soigner', 'сё суанье́', 'лечиться'],
      ]
    },
    {
      id: 'v6', title: 'Транспорт и город', emoji: '🚌',
      hint: 'Объявления на вокзале — типичное аудирование',
      words: [
        ['la gare', 'ля гар', 'вокзал'],
        ['le quai', 'лё кэ', 'платформа'],
        ['le billet', 'лё бийе́', 'билет'],
        ['l\'horaire', 'лёрэ́р', 'расписание'],
        ['la correspondance', 'ля кореспонда́нс', 'пересадка'],
        ['le retard', 'лё рёта́р', 'опоздание'],
        ['la grève', 'ля грэв', 'забастовка'],
        ['le centre-ville', 'лё сантр-ви́ль', 'центр города'],
        ['la mairie', 'ля мэри́', 'мэрия'],
        ['le quartier', 'лё картье́', 'район'],
      ]
    },
    {
      id: 'v7', title: 'Покупки и деньги', emoji: '🛒',
      hint: 'Сценки в магазине и банке',
      words: [
        ['le magasin', 'лё магазэ́н', 'магазин'],
        ['la caisse', 'ля кэс', 'касса'],
        ['le prix', 'лё при', 'цена'],
        ['les soldes', 'ле сольд', 'распродажа'],
        ['le ticket de caisse', 'лё тикэ́ дё кэс', 'чек'],
        ['rembourser', 'рамбурсэ́', 'возместить, вернуть деньги'],
        ['le compte bancaire', 'лё конт банкэ́р', 'банковский счёт'],
        ['le virement', 'лё вирма́н', 'перевод'],
        ['cher / bon marché', 'шер / бон маршэ́', 'дорогой / дешёвый'],
        ['dépenser', 'депансэ́', 'тратить'],
      ]
    },
    {
      id: 'v8', title: 'Досуг и отдых', emoji: '🎭',
      hint: 'Монолог о себе и письмо другу',
      words: [
        ['les loisirs', 'ле луази́р', 'досуг'],
        ['la promenade', 'ля промёна́д', 'прогулка'],
        ['le cinéma', 'лё синема́', 'кино'],
        ['le musée', 'лё мюзэ́', 'музей'],
        ['la randonnée', 'ля рандонэ́', 'поход'],
        ['faire du sport', 'фэр дю спор', 'заниматься спортом'],
        ['les vacances', 'ле вака́нс', 'отпуск, каникулы'],
        ['se reposer', 'сё рёпозэ́', 'отдыхать'],
        ['se retrouver', 'сё рётрувэ́', 'встречаться'],
        ['ça me plaît', 'са мё плэ', 'мне это нравится'],
      ]
    },
    {
      id: 'v9', title: 'Время и даты', emoji: '📅',
      hint: 'В аудировании просят записать время и дату',
      words: [
        ['aujourd\'hui', 'ожурдюи́', 'сегодня'],
        ['demain', 'дёмэ́н', 'завтра'],
        ['hier', 'йер', 'вчера'],
        ['la semaine prochaine', 'ля сёмэ́н прошэ́н', 'на следующей неделе'],
        ['le mois dernier', 'лё муа́ дернье́', 'в прошлом месяце'],
        ['tous les jours', 'ту ле жур', 'каждый день'],
        ['depuis deux ans', 'дёпюи́ дёз-ан', 'вот уже два года'],
        ['dans une heure', 'дан-з-юн ёр', 'через час'],
        ['le matin / le soir', 'лё матэ́н / лё суа́р', 'утром / вечером'],
        ['à quelle heure ?', 'а кэль ёр', 'во сколько?'],
      ]
    },
    {
      id: 'v10', title: 'Связки и мнение', emoji: '🔗',
      hint: 'За них отдельно дают баллы на B1',
      words: [
        ['d\'abord', 'дабо́р', 'сначала'],
        ['ensuite', 'ансюи́т', 'затем'],
        ['de plus', 'дё плю', 'кроме того'],
        ['par contre', 'пар контр', 'зато, напротив'],
        ['cependant', 'сёпанда́н', 'однако'],
        ['parce que', 'парс кё', 'потому что'],
        ['c\'est pourquoi', 'сэ пуркуа́', 'поэтому'],
        ['à mon avis', 'а мон-ави́', 'на мой взгляд'],
        ['je pense que', 'жё панс кё', 'я думаю, что'],
        ['pour conclure', 'пур конклю́р', 'в заключение'],
      ]
    },
  ];

  const toc = topics.map(t =>
    `<button class="gram-toc-btn" onclick="document.getElementById('${t.id}').scrollIntoView({behavior:'smooth'})">${t.emoji} ${t.title}</button>`
  ).join('');

  const blocks = topics.map(t => {
    const rows = t.words.map(([gr, tr, ru]) => `
<tr>
  <td class="vocab-ex-gr" onclick="${sp(gr)}">${gr} <span class="vocab-ex-speak">🔊</span></td>
  <td class="vocab-ex-tr">[${tr}]</td>
  <td class="vocab-ex-ru">${ru}</td>
</tr>`).join('');
    return `
<div id="${t.id}" class="gram-block">
  <div class="gram-title">${t.emoji} ${t.title}</div>
  <div class="gram-subtitle">${t.hint}</div>
  <table class="vocab-ex-table">
    <thead><tr>
      <th>Французский</th><th>Транскрипция</th><th>Перевод</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>
</div>`;
  }).join('\n');

  return `
<div class="gram-nav">
  <div class="gram-toc">${toc}</div>
</div>
<div class="vocab-ex-intro">100 ключевых слов по темам экзамена. Нажми 🔊 чтобы услышать.</div>
${blocks}`;
}

// ===================== EXAM MOCK TEST (sprint 6) =====================

const EXAM_MOCK_QUESTIONS = [
  // -- GRAMMAIRE --
  {
    type: 'grammar',
    q: 'Выбери правильную форму:\nJe ___ à Lyon depuis trois ans.',
    opts: ['habite', 'habites', 'habitons', 'habitent'],
    correct: 0,
    exp: 'Je → 1-е лицо ед. ч. первой группы: habite'
  },
  {
    type: 'grammar',
    q: 'Выбери правильную форму:\nNous ___ au marché tous les samedis.',
    opts: ['allons', 'allez', 'vais', 'vont'],
    correct: 0,
    exp: 'Aller с nous → allons'
  },
  {
    type: 'grammar',
    q: 'Passé composé. Выбери верное:\nHier, je ___ à la préfecture.',
    opts: ['suis allé', 'ai allé', 'vais', 'irai'],
    correct: 0,
    exp: 'Aller — глагол движения, вспомогательный être: je suis allé'
  },
  {
    type: 'grammar',
    q: 'Passé composé. Выбери верное:\nElle ___ le dossier hier soir.',
    opts: ['a préparé', 'est préparé', 'a prépare', 'est préparée'],
    correct: 0,
    exp: 'Préparer идёт с avoir, причастие préparé: elle a préparé'
  },
  {
    type: 'grammar',
    q: 'Согласование с être. Выбери верное:\nMes sœurs sont ___ à Paris.',
    opts: ['arrivées', 'arrivé', 'arrivés', 'arriver'],
    correct: 0,
    exp: 'С être причастие согласуется: mes sœurs — женский род мн. ч. → arrivées'
  },
  {
    type: 'grammar',
    q: 'Отрицание. Выбери верное:\nJe n\'ai pas ___ voiture.',
    opts: ['de', 'une', 'la', 'des'],
    correct: 0,
    exp: 'После отрицания un/une/des превращаются в de'
  },
  {
    type: 'grammar',
    q: 'Предлог со страной. Выбери верное:\nJe vais ___ Portugal cet été.',
    opts: ['au', 'en', 'à', 'aux'],
    correct: 0,
    exp: 'Portugal — мужской род, значит au Portugal'
  },
  {
    type: 'grammar',
    q: 'Слияние предлога. Выбери верное:\nJe parle ___ voisins.',
    opts: ['aux', 'à les', 'au', 'à la'],
    correct: 0,
    exp: 'à + les = aux, формы «à les» не существует'
  },
  {
    type: 'grammar',
    q: 'Imparfait или passé composé?\nQuand j\'étais petit, je ___ chez ma grand-mère chaque été.',
    opts: ['allais', 'suis allé', 'irai', 'vais'],
    correct: 0,
    exp: 'Повторялось регулярно в прошлом → imparfait: j\'allais'
  },
  {
    type: 'grammar',
    q: 'Futur simple. Выбери верное:\nDemain, nous ___ le contrat.',
    opts: ['signerons', 'signons', 'avons signé', 'signions'],
    correct: 0,
    exp: 'Futur simple от signer с nous: signerons'
  },

  // -- VOCABULAIRE --
  {
    type: 'vocab',
    q: 'Как называется подтверждение адреса, которое просят в банке и префектуре?',
    opts: ['un justificatif de domicile', 'un relevé de notes', 'une ordonnance', 'un devis'],
    correct: 0,
    exp: 'Justificatif de domicile — счёт за свет, договор аренды и т.п.'
  },
  {
    type: 'vocab',
    q: 'Что такое «bail» ?',
    opts: ['договор аренды', 'банковская выписка', 'страховка', 'налоговое уведомление'],
    correct: 0,
    exp: 'Bail — договор аренды жилья'
  },
  {
    type: 'vocab',
    q: 'Куда обращаются за пособием на жильё?',
    opts: ['à la CAF', 'à la préfecture', 'à la mairie', 'à la Sécurité sociale'],
    correct: 0,
    exp: 'CAF — Caisse d\'allocations familiales, она платит APL'
  },
  {
    type: 'vocab',
    q: 'Что означает «prendre rendez-vous» ?',
    opts: ['записаться на приём', 'отменить встречу', 'опоздать', 'подписать договор'],
    correct: 0,
    exp: 'Prendre rendez-vous — записаться, назначить встречу'
  },
  {
    type: 'vocab',
    q: 'Как сказать «мне нужна справка» ?',
    opts: ['J\'ai besoin d\'une attestation', 'Je suis une attestation', 'J\'attends une attestation', 'Je fais une attestation'],
    correct: 0,
    exp: 'Avoir besoin de — нуждаться в чём-то'
  },
  {
    type: 'vocab',
    q: 'Что такое «récépissé» ?',
    opts: ['расписка о приёме документов', 'квитанция из магазина', 'рецепт врача', 'счёт за свет'],
    correct: 0,
    exp: 'Récépissé выдаёт префектура, он временно заменяет вид на жительство'
  },

  // -- COMPRÉHENSION DES ÉCRITS --
  {
    type: 'reading',
    passage: 'Camille est infirmière. Elle travaille à l\'hôpital de Lyon depuis cinq ans. Chaque matin, elle prend le tram à sept heures. Le mardi, elle finit plus tôt et va chercher sa fille à l\'école.',
    q: 'Où travaille Camille ?',
    opts: ['À l\'hôpital', 'À l\'école', 'À la pharmacie', 'À la mairie'],
    correct: 0,
    exp: 'В тексте: «elle travaille à l\'hôpital de Lyon»'
  },
  {
    type: 'reading',
    passage: 'Camille est infirmière. Elle travaille à l\'hôpital de Lyon depuis cinq ans. Chaque matin, elle prend le tram à sept heures. Le mardi, elle finit plus tôt et va chercher sa fille à l\'école.',
    q: 'Comment va-t-elle au travail ?',
    opts: ['En tram', 'En voiture', 'À pied', 'En bus'],
    correct: 0,
    exp: 'В тексте: «elle prend le tram à sept heures»'
  },
  {
    type: 'reading',
    passage: 'AVIS AUX LOCATAIRES. En raison de travaux sur la toiture, l\'eau sera coupée mercredi 12 mars de 9h à 16h. Nous vous prions de prévoir une réserve d\'eau. Le syndic reste joignable au 04 78 55 12 30.',
    q: 'Что произойдёт 12 марта?',
    opts: ['Отключат воду', 'Отключат отопление', 'Закроют подъезд', 'Отключат электричество'],
    correct: 0,
    exp: 'В объявлении: «l\'eau sera coupée mercredi 12 mars»'
  },
  {
    type: 'reading',
    passage: 'AVIS AUX LOCATAIRES. En raison de travaux sur la toiture, l\'eau sera coupée mercredi 12 mars de 9h à 16h. Nous vous prions de prévoir une réserve d\'eau. Le syndic reste joignable au 04 78 55 12 30.',
    q: 'Кому звонить с вопросами?',
    opts: ['Управляющему домом (syndic)', 'Владельцу квартиры', 'В мэрию', 'Соседям'],
    correct: 0,
    exp: 'В объявлении указан телефон syndic — управляющего домом'
  },
];

const EXAM_LISTENING_TRACKS = [
  {
    title: 'Message du cabinet médical',
    titleRu: 'Сообщение из кабинета врача',
    emoji: '📞',
    text: 'Bonjour Madame Ivanova, c\'est le cabinet du docteur Mercier. Je vous appelle pour confirmer votre rendez-vous de jeudi quatorze heures trente. Pensez à apporter votre carte Vitale et l\'ordonnance précédente. Si vous ne pouvez pas venir, merci de nous prévenir au moins vingt-quatre heures avant.',
    textRu: 'Здравствуйте, госпожа Иванова, это кабинет доктора Мерсье. Звоню подтвердить ваш приём в четверг в четырнадцать тридцать. Не забудьте карту Vitale и предыдущий рецепт. Если не сможете прийти, предупредите хотя бы за двадцать четыре часа.',
    questions: [
      { q: 'Quand est le rendez-vous ?', opts: ['Jeudi à 14h30', 'Mardi à 14h30', 'Jeudi à 4h30', 'Vendredi à 15h'], correct: 0, exp: '«votre rendez-vous de jeudi quatorze heures trente»' },
      { q: 'Que faut-il apporter ?', opts: ['La carte Vitale et l\'ordonnance', 'Le passeport', 'Un justificatif de domicile', 'Rien du tout'], correct: 0, exp: '«apporter votre carte Vitale et l\'ordonnance précédente»' },
      { q: 'En cas d\'empêchement, il faut prévenir…', opts: ['24 heures avant', '2 heures avant', 'le jour même', 'une semaine avant'], correct: 0, exp: '«au moins vingt-quatre heures avant»' },
    ]
  },
  {
    title: 'Annonce en gare',
    titleRu: 'Объявление на вокзале',
    emoji: '🚆',
    text: 'Mesdames et messieurs, votre attention s\'il vous plaît. Le train à destination de Marseille, départ prévu à seize heures dix, partira voie numéro huit avec un retard d\'environ vingt minutes. Nous vous prions de nous excuser pour la gêne occasionnée.',
    textRu: 'Дамы и господа, внимание. Поезд до Марселя, отправление в шестнадцать десять, отправится с восьмого пути с опозданием примерно на двадцать минут. Приносим извинения за неудобства.',
    questions: [
      { q: 'Quelle est la destination ?', opts: ['Marseille', 'Montpellier', 'Metz', 'Mulhouse'], correct: 0, exp: '«à destination de Marseille»' },
      { q: 'De quelle voie part le train ?', opts: ['Voie 8', 'Voie 18', 'Voie 10', 'Voie 6'], correct: 0, exp: '«partira voie numéro huit»' },
      { q: 'Quel est le retard ?', opts: ['Environ 20 minutes', 'Environ 10 minutes', 'Une heure', 'Pas de retard'], correct: 0, exp: '«un retard d\'environ vingt minutes»' },
    ]
  },
  {
    title: 'Message de l\'école',
    titleRu: 'Сообщение из школы',
    emoji: '🎒',
    text: 'Chers parents, nous vous rappelons que la réunion parents-professeurs aura lieu mardi prochain à dix-huit heures dans la salle polyvalente. La sortie scolaire au musée est reportée au vendredi treize. N\'oubliez pas de signer le carnet de liaison de votre enfant.',
    textRu: 'Уважаемые родители, напоминаем, что родительское собрание состоится в следующий вторник в восемнадцать часов в актовом зале. Экскурсия в музей перенесена на пятницу тринадцатого. Не забудьте подписать дневник связи вашего ребёнка.',
    questions: [
      { q: 'Quand a lieu la réunion ?', opts: ['Mardi à 18h', 'Vendredi à 18h', 'Mardi à 8h', 'Lundi à 18h'], correct: 0, exp: '«mardi prochain à dix-huit heures»' },
      { q: 'Qu\'est-ce qui est reporté ?', opts: ['La sortie au musée', 'La réunion', 'Les vacances', 'Le cours de sport'], correct: 0, exp: '«La sortie scolaire au musée est reportée»' },
      { q: 'Que doivent faire les parents ?', opts: ['Signer le carnet de liaison', 'Payer la cantine', 'Appeler le directeur', 'Apporter un justificatif'], correct: 0, exp: '«N\'oubliez pas de signer le carnet de liaison»' },
    ]
  },
  {
    title: 'Annonce au supermarché',
    titleRu: 'Объявление в супермаркете',
    emoji: '🛒',
    text: 'Chers clients, nous vous informons que le rayon boulangerie propose aujourd\'hui une réduction de trente pour cent sur toutes les viennoiseries. Par ailleurs, en raison du jour férié, le magasin fermera exceptionnellement à dix-neuf heures. Merci de votre compréhension.',
    textRu: 'Уважаемые покупатели, сообщаем, что сегодня в хлебном отделе скидка тридцать процентов на всю выпечку. Кроме того, из-за праздничного дня магазин закроется в порядке исключения в девятнадцать часов. Благодарим за понимание.',
    questions: [
      { q: 'Où est la réduction ?', opts: ['Au rayon boulangerie', 'Au rayon fruits', 'Au rayon poisson', 'Au rayon boissons'], correct: 0, exp: '«le rayon boulangerie propose une réduction»' },
      { q: 'Quelle est la réduction ?', opts: ['30 %', '13 %', '50 %', '3 %'], correct: 0, exp: '«une réduction de trente pour cent»' },
      { q: 'À quelle heure ferme le magasin ?', opts: ['19h', '21h', '18h', '20h'], correct: 0, exp: '«le magasin fermera exceptionnellement à dix-neuf heures»' },
    ]
  },
  {
    title: 'Conversation entre collègues',
    titleRu: 'Разговор коллег',
    emoji: '💼',
    text: 'Tu viens déjeuner avec nous ? On va au petit restaurant en face, celui qui fait une formule à quinze euros. Il faut y être avant midi et demi, sinon il n\'y a plus de place. Ah, et Julien nous rejoint vers treize heures, il a une réunion avant.',
    textRu: 'Пойдёшь с нами обедать? Мы идём в маленький ресторан напротив, тот, где комплекс за пятнадцать евро. Надо быть там до половины первого, иначе мест не будет. А, и Жюльен присоединится к нам около часа, у него до этого совещание.',
    questions: [
      { q: 'Combien coûte la formule ?', opts: ['15 euros', '50 euros', '13 euros', '5 euros'], correct: 0, exp: '«une formule à quinze euros»' },
      { q: 'Avant quelle heure faut-il arriver ?', opts: ['12h30', '13h', '12h', '11h30'], correct: 0, exp: '«avant midi et demi» — до 12:30' },
      { q: 'Pourquoi Julien arrive plus tard ?', opts: ['Il a une réunion', 'Il est malade', 'Il déjeune ailleurs', 'Il travaille à distance'], correct: 0, exp: '«il a une réunion avant»' },
    ]
  },
];

let listeningState = { trackIdx: null, answered: [], ttsPlaying: false };

function startExamListening() {
  document.getElementById('exam-detail-title').textContent = '🎧 Аудирование';
  listeningState = { trackIdx: null, answered: [], ttsPlaying: false };
  renderListeningTracks();
  showScreen('screen-exam-detail');
}

function renderListeningTracks() {
  const cards = EXAM_LISTENING_TRACKS.map((t, i) => {
    const done = listeningState.answered[i] !== undefined;
    const score = done ? listeningState.answered[i] : null;
    const badge = done ? `<span class="listen-done-badge">${score}/${t.questions.length}</span>` : '';
    return `
<div class="listen-track-card${done ? ' listen-track-done' : ''}" onclick="startListeningTrack(${i})">
  <span class="listen-track-emoji">${t.emoji}</span>
  <div class="listen-track-info">
    <div class="listen-track-title">${t.title}</div>
    <div class="listen-track-sub">${t.titleRu} · ${t.questions.length} вопроса</div>
  </div>
  ${badge}
  <span class="listen-track-arrow">${done ? '✓' : '›'}</span>
</div>`;
  }).join('');

  const totalDone = listeningState.answered.filter(x => x !== undefined).length;
  document.getElementById('exam-detail-body').innerHTML = `
<div class="listen-intro">Нажми ▶ чтобы услышать текст, затем ответь на вопросы. Текст скрыт — тренируй настоящее слушание.</div>
<div class="listen-tracks">${cards}</div>
${totalDone > 0 ? `<div class="listen-total">Пройдено: ${totalDone} / ${EXAM_LISTENING_TRACKS.length}</div>` : ''}`;
}

function startListeningTrack(idx) {
  listeningState.trackIdx = idx;
  listeningState.ttsPlaying = false;
  renderListeningTrack();
}

function renderListeningTrack() {
  const idx = listeningState.trackIdx;
  const t = EXAM_LISTENING_TRACKS[idx];
  const qs = t.questions.map((q, qi) => `
<div class="listen-q-block" id="listen-q-${qi}">
  <div class="listen-q-text">${qi+1}. ${q.q}</div>
  <div class="mock-opts">${q.opts.map((o, oi) =>
    `<button class="mock-opt" id="lopt-${qi}-${oi}" onclick="answerListeningQ(${idx},${qi},${oi})">${String.fromCharCode(65+oi)}. ${o}</button>`
  ).join('')}</div>
  <div class="mock-explanation" id="listen-exp-${qi}" style="display:none"></div>
</div>`).join('');

  document.getElementById('exam-detail-body').innerHTML = `
<button class="btn-back-inline" onclick="renderListeningTracks()">← К списку</button>
<div class="listen-track-header">
  <span style="font-size:28px">${t.emoji}</span>
  <div>
    <div class="listen-th-title">${t.title}</div>
    <div class="listen-th-sub">${t.titleRu}</div>
  </div>
</div>
<div class="listen-play-area">
  <button class="listen-play-btn" id="listen-play-btn" onclick="playListeningTrack(${idx})">▶ Слушать</button>
  <div class="listen-play-hint">Нажми — текст озвучится по-французски</div>
</div>
<div id="listen-transcript" class="listen-transcript" style="display:none">${t.text.replace(/\n/g,'<br>')}</div>
<button class="listen-reveal-btn" id="listen-reveal-btn" onclick="toggleListeningTranscript()">👁 Показать текст</button>
<div class="listen-qs-title">Вопросы по тексту:</div>
<div id="listen-qs">${qs}</div>
<div id="listen-track-result" style="display:none"></div>`;
}

function playListeningTrack(idx) {
  const t = EXAM_LISTENING_TRACKS[idx];
  const btn = document.getElementById('listen-play-btn');
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); btn.textContent = '▶ Слушать'; return; }
  const utt = new SpeechSynthesisUtterance(t.text.replace(/\n/g, ' '));
  utt.lang = 'fr-FR';
  utt.rate = 0.85;
  const voices = speechSynthesis.getVoices();
  const elVoice = voices.find(v => v.lang.startsWith('es'));
  if (elVoice) utt.voice = elVoice;
  utt.onstart = () => { btn.textContent = '⏹ Остановить'; };
  utt.onend = utt.onerror = () => { btn.textContent = '▶ Слушать снова'; };
  speechSynthesis.speak(utt);
}

function toggleListeningTranscript() {
  const el = document.getElementById('listen-transcript');
  const btn = document.getElementById('listen-reveal-btn');
  const hidden = el.style.display === 'none';
  el.style.display = hidden ? 'block' : 'none';
  btn.textContent = hidden ? '👁 Скрыть текст' : '👁 Показать текст';
}

let listenQScores = {};

function answerListeningQ(trackIdx, qi, oi) {
  const t = EXAM_LISTENING_TRACKS[trackIdx];
  const q = t.questions[qi];
  const key = `${trackIdx}-${qi}`;
  if (listenQScores[key] !== undefined) return;

  const correct = q.correct;
  listenQScores[key] = (oi === correct) ? 1 : 0;

  document.querySelectorAll(`[id^="lopt-${qi}-"]`).forEach(btn => {
    const btnOi = parseInt(btn.id.split('-')[2]);
    btn.disabled = true;
    if (btnOi === correct) btn.classList.add('mock-opt-correct');
    else if (btnOi === oi) btn.classList.add('mock-opt-wrong');
  });
  const expEl = document.getElementById(`listen-exp-${qi}`);
  expEl.textContent = (oi === correct ? '✅ ' : '❌ ') + q.exp;
  expEl.style.display = 'block';

  const allAnswered = t.questions.every((_, i) => listenQScores[`${trackIdx}-${i}`] !== undefined);
  if (allAnswered) {
    const score = t.questions.reduce((s, _, i) => s + (listenQScores[`${trackIdx}-${i}`] || 0), 0);
    if (!listeningState.answered) listeningState.answered = [];
    listeningState.answered[trackIdx] = score;
    const pct = Math.round(score / t.questions.length * 100);
    document.getElementById('listen-track-result').innerHTML = `
<div class="listen-result-bar">
  ${pct >= 67 ? '✅' : '💪'} Результат: <strong>${score}/${t.questions.length}</strong>
  <button class="btn-back-inline" style="margin-left:auto" onclick="renderListeningTracks()">← К списку</button>
</div>`;
    document.getElementById('listen-track-result').style.display = 'block';
  }
}

// native-bridge.js шлёт 'apnsToken', когда APNs выдал device-token — он может
// прийти и до, и после входа, поэтому слушаем постоянно.
window.addEventListener('apnsToken', function (e) { saveApnsToken(e.detail); });
