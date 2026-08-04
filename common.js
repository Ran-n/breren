/*
 * Shared toolbar (language picker + theme toggle) and i18n plumbing used by
 * every full page on breren.com (index.html, about/index.html, ...). The
 * thin iframe-wrapper pages (vitralis/, licenses/pbl/) don't need the full
 * toolbar and keep their own tiny inline snippet instead.
 *
 * Each page must provide this markup:
 *   <div class="lang-picker">
 *     <button class="lang-trigger" id="lang-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
 *       <span class="flag" id="lang-trigger-flag"></span>
 *       <span id="lang-trigger-name"></span>
 *       <span class="chevron">▾</span>
 *     </button>
 *     <ul class="lang-menu" id="lang-menu" role="listbox" hidden></ul>
 *   </div>
 *   <button class="theme-btn" id="theme-toggle" type="button"></button>
 */
(function (global) {
  // SVG flags (emoji flags don't render on all platforms/fonts).
  var FLAG_GALEGO = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#ffffff"/><polygon points="0,20 0,14 24,0 30,0" fill="#0090d6"/></svg>';
  var FLAG_ESPERANTO = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#007a3d"/><rect width="13" height="11" fill="#ffffff"/><text x="6.6" y="9.7" font-size="8" text-anchor="middle" dominant-baseline="middle" fill="#007a3d">★</text></svg>';
  var FLAG_GB = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#00247d"/><path d="M0,0 L30,20 M30,0 L0,20" stroke="#ffffff" stroke-width="4"/><path d="M0,0 L30,20 M30,0 L0,20" stroke="#cf142b" stroke-width="1.5"/><path d="M15,0 V20 M0,10 H30" stroke="#ffffff" stroke-width="6.5"/><path d="M15,0 V20 M0,10 H30" stroke="#cf142b" stroke-width="4"/></svg>';
  var FLAG_CN = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#de2910"/><g fill="#ffde00"><path d="M5,2 L6,5.2 L9,3.2 L7,6 L9,7 L5.8,6.6 L6,10 L4.6,6.9 L2,8.5 L3.8,5.7 L1,4.6 L4.4,4.6 Z"/><circle cx="10.5" cy="1.5" r="0.7"/><circle cx="12" cy="4" r="0.7"/><circle cx="12" cy="7" r="0.7"/><circle cx="10" cy="9" r="0.7"/></g></svg>';
  var FLAG_IN = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="6.67" fill="#ff9933"/><rect width="30" height="6.67" y="6.67" fill="#ffffff"/><rect width="30" height="6.66" y="13.34" fill="#138808"/><circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" stroke-width="0.4"/></svg>';
  var FLAG_ES = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#aa151b"/><rect width="30" height="10" y="5" fill="#f1bf00"/></svg>';
  var FLAG_SA = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#006c35"/><rect x="4" y="13.5" width="18" height="1.6" fill="#ffffff"/><polygon points="22,13.5 26,14.3 22,15.1" fill="#ffffff"/></svg>';
  var FLAG_FR = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="20" fill="#0055a4"/><rect width="10" height="20" x="10" fill="#ffffff"/><rect width="10" height="20" x="20" fill="#ef4135"/></svg>';
  var FLAG_BD = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#006a4e"/><circle cx="13.5" cy="10" r="5.5" fill="#f42a41"/></svg>';
  var FLAG_PT = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#da291c"/><rect width="12" height="20" fill="#046a38"/><circle cx="12" cy="10" r="3.4" fill="#f2c500" stroke="#da291c" stroke-width="0.3"/></svg>';
  var FLAG_RU = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="6.67" fill="#ffffff"/><rect width="30" height="6.67" y="6.67" fill="#0039a6"/><rect width="30" height="6.66" y="13.34" fill="#d52b1e"/></svg>';
  var FLAG_PK = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#01411c"/><rect width="7.5" height="20" fill="#ffffff"/><circle cx="19" cy="10" r="4.5" fill="#ffffff"/><circle cx="20.5" cy="10" r="3.6" fill="#01411c"/><polygon points="24,6.5 24.9,9 27.5,9 25.4,10.6 26.2,13.1 24,11.6 21.8,13.1 22.6,10.6 20.5,9 23.1,9" fill="#ffffff"/></svg>';
  var FLAG_ID = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="10" fill="#ce1126"/><rect width="30" height="10" y="10" fill="#ffffff"/></svg>';
  var FLAG_DE = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="6.67" fill="#000000"/><rect width="30" height="6.67" y="6.67" fill="#dd0000"/><rect width="30" height="6.66" y="13.34" fill="#ffce00"/></svg>';
  var FLAG_JP = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#ffffff"/><circle cx="15" cy="10" r="5.5" fill="#bc002d"/></svg>';
  var FLAG_TZ = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#1eb53a"/><polygon points="0,20 0,15 30,5 30,0" fill="#00a3dd"/><polygon points="0,20 0,16 30,6 30,2" fill="#fcd116"/><polygon points="0,19 0,17 30,7 30,5" fill="#000000"/></svg>';
  var FLAG_TR = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#e30a17"/><circle cx="12.5" cy="10" r="4.2" fill="#ffffff"/><circle cx="13.7" cy="10" r="3.4" fill="#e30a17"/><polygon points="18,6.5 18.9,9 21.5,9 19.4,10.6 20.2,13.1 18,11.6 15.8,13.1 16.6,10.6 14.5,9 17.1,9" fill="#ffffff"/></svg>';
  var FLAG_VN = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#da251d"/><polygon points="15,4.5 16.3,8.4 20.4,8.4 17.1,10.8 18.4,14.7 15,12.3 11.6,14.7 12.9,10.8 9.6,8.4 13.7,8.4" fill="#ffff00"/></svg>';
  var FLAG_KR = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#ffffff"/><circle cx="15" cy="10" r="4" fill="#cd2e3a"/><path d="M15,6 A2,2 0 0 1 15,10 A2,2 0 0 0 15,14 A4,4 0 0 0 15,6 Z" fill="#0047a0"/></svg>';
  var FLAG_IT = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="20" fill="#009246"/><rect width="10" height="20" x="10" fill="#ffffff"/><rect width="10" height="20" x="20" fill="#ce2b37"/></svg>';
  var FLAG_IR = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="6.67" fill="#239f40"/><rect width="30" height="6.67" y="6.67" fill="#ffffff"/><rect width="30" height="6.66" y="13.34" fill="#da0000"/><circle cx="15" cy="10" r="2.2" fill="none" stroke="#da0000" stroke-width="0.3"/></svg>';
  var FLAG_PA = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#f8bd21"/><rect width="30" height="2.5" fill="#0039a6"/><rect width="30" height="2.5" y="17.5" fill="#0039a6"/><circle cx="15" cy="10" r="3.6" fill="#ff8000"/></svg>';
  var FLAG_TH = '<svg viewBox="0 0 30 20" xmlns="http://www.w3.org/2000/svg"><rect width="30" height="20" fill="#a51931"/><rect width="30" height="13.33" y="3.33" fill="#ffffff"/><rect width="30" height="6.67" y="6.67" fill="#2d2a4a"/></svg>';

  // Ordered roughly by number of speakers, with Galego pinned first and
  // Esperanto last. `rtl: true` flips document direction when selected.
  var LANGUAGES = [
    { code: 'gl', flag: FLAG_GALEGO, name: 'Galego' },
    { code: 'en', flag: FLAG_GB, name: 'English' },
    { code: 'zh', flag: FLAG_CN, name: '中文' },
    { code: 'hi', flag: FLAG_IN, name: 'हिन्दी' },
    { code: 'es', flag: FLAG_ES, name: 'Español' },
    { code: 'ar', flag: FLAG_SA, name: 'العربية', rtl: true },
    { code: 'fr', flag: FLAG_FR, name: 'Français' },
    { code: 'bn', flag: FLAG_BD, name: 'বাংলা' },
    { code: 'pt', flag: FLAG_PT, name: 'Português' },
    { code: 'ru', flag: FLAG_RU, name: 'Русский' },
    { code: 'ur', flag: FLAG_PK, name: 'اردو', rtl: true },
    { code: 'id', flag: FLAG_ID, name: 'Bahasa Indonesia' },
    { code: 'de', flag: FLAG_DE, name: 'Deutsch' },
    { code: 'ja', flag: FLAG_JP, name: '日本語' },
    { code: 'sw', flag: FLAG_TZ, name: 'Kiswahili' },
    { code: 'te', flag: FLAG_IN, name: 'తెలుగు' },
    { code: 'tr', flag: FLAG_TR, name: 'Türkçe' },
    { code: 'ta', flag: FLAG_IN, name: 'தமிழ்' },
    { code: 'vi', flag: FLAG_VN, name: 'Tiếng Việt' },
    { code: 'ko', flag: FLAG_KR, name: '한국어' },
    { code: 'it', flag: FLAG_IT, name: 'Italiano' },
    { code: 'fa', flag: FLAG_IR, name: 'فارسی', rtl: true },
    { code: 'pa', flag: FLAG_PA, name: 'ਪੰਜਾਬੀ' },
    { code: 'th', flag: FLAG_TH, name: 'ไทย' },
    { code: 'eo', flag: FLAG_ESPERANTO, name: 'Esperanto' }
  ];
  var SUPPORTED_LANGS = LANGUAGES.map(function (l) { return l.code; });
  var LANG_BY_CODE = {};
  LANGUAGES.forEach(function (l) { LANG_BY_CODE[l.code] = l; });
  var RTL_LANGS = ['ar', 'ur', 'fa'];

  // Strings every full page needs (toolbar labels, the shared "About"
  // etymology text, the hero tagline). Page-specific strings live in each
  // page's own STRINGS object and take priority when a key collides.
  var COMMON_STRINGS = {
    gl: {
      tagline: 'Un alicerce que leva adiante o que importa.',
      themeToLight: 'Cambiar a modo claro',
      themeToDark: 'Cambiar a modo escuro',
      aboutTitle: 'Sobre Breren',
      aboutOrigin: 'Breren combina dúas raíces antigas: o protoindoeuropeo *bher-* — levar, portar, transmitir cara adiante — e o protoceltra *brigā* — unha fortaleza, unha altura desde a que se ve máis lonxe. Xuntas: unha base forte que leva o que importa cara ao futuro.',
      backToHome: '← Volver a Breren'
    },
    en: {
      tagline: 'A foundation that carries what matters forward.',
      themeToLight: 'Switch to light mode',
      themeToDark: 'Switch to dark mode',
      aboutTitle: 'About Breren',
      aboutOrigin: 'Breren blends two ancient roots: Proto-Indo-European *bher-* — to carry, to bear, to bring forward — and Proto-Celtic *brigā* — a stronghold, a height from which you can see further. Together: a strong foundation that carries what matters into the future.',
      backToHome: '← Back to Breren'
    },
    eo: {
      tagline: 'Fundamento kiu portas antaŭen tion, kio gravas.',
      themeToLight: 'Ŝanĝi al luma reĝimo',
      themeToDark: 'Ŝanĝi al malluma reĝimo',
      aboutTitle: 'Pri Breren',
      aboutOrigin: 'Breren kombinas du antikvajn radikojn: la praindeŭropan *bher-* — porti, teni, antaŭenporti — kaj la prakeltan *brigā* — fortikaĵo, alto de kie oni vidas pli malproksimen. Kune: forta fundamento kiu portas antaŭen tion, kio gravas.',
      backToHome: '← Reen al Breren'
    },
    es: {
      tagline: 'Un fundamento que impulsa hacia adelante lo que importa.',
      themeToLight: 'Cambiar a modo claro',
      themeToDark: 'Cambiar a modo oscuro',
      aboutTitle: 'Sobre Breren',
      aboutOrigin: 'Breren combina dos raíces antiguas: el protoindoeuropeo *bher-* — llevar, portar, transmitir hacia adelante — y el protoceltal *brigā* — una fortaleza, una altura desde la que se ve más lejos. Juntas: una base fuerte que lleva hacia adelante lo que importa.',
      backToHome: '← Volver a Breren'
    },
    fr: {
      tagline: "Une fondation qui fait avancer ce qui compte.",
      themeToLight: 'Passer en mode clair',
      themeToDark: 'Passer en mode sombre',
      aboutTitle: 'À propos de Breren',
      aboutOrigin: "Breren associe deux racines anciennes : le proto-indo-européen *bher-* — porter, transmettre, faire avancer — et le proto-celtique *brigā* — une forteresse, une hauteur d'où l'on voit plus loin. Ensemble : une fondation solide qui fait avancer ce qui compte.",
      backToHome: '← Retour à Breren'
    },
    pt: {
      tagline: 'Uma base que leva adiante o que importa.',
      themeToLight: 'Mudar para o modo claro',
      themeToDark: 'Mudar para o modo escuro',
      aboutTitle: 'Sobre a Breren',
      aboutOrigin: 'A Breren combina duas raízes antigas: o proto-indo-europeu *bher-* — carregar, levar, transmitir adiante — e o proto-celta *brigā* — uma fortaleza, uma altura de onde se vê mais longe. Juntas: uma base forte que leva adiante o que importa.',
      backToHome: '← Voltar à Breren'
    },
    de: {
      tagline: 'Ein Fundament, das Wichtiges weiterträgt.',
      themeToLight: 'Zum hellen Modus wechseln',
      themeToDark: 'Zum dunklen Modus wechseln',
      aboutTitle: 'Über Breren',
      aboutOrigin: 'Breren verbindet zwei alte Wurzeln: das urindogermanische *bher-* — tragen, bringen, weitertragen — und das urkeltische *brigā* — eine Festung, eine Anhöhe, von der aus man weiter sieht. Zusammen: ein starkes Fundament, das Wichtiges in die Zukunft trägt.',
      backToHome: '← Zurück zu Breren'
    },
    it: {
      tagline: 'Una fondazione che porta avanti ciò che conta.',
      themeToLight: 'Passa alla modalità chiara',
      themeToDark: 'Passa alla modalità scura',
      aboutTitle: 'Informazioni su Breren',
      aboutOrigin: "Breren unisce due antiche radici: il proto-indoeuropeo *bher-* — portare, recare, trasmettere in avanti — e il proto-celtico *brigā* — una fortezza, un'altura da cui si vede più lontano. Insieme: una base solida che porta avanti ciò che conta.",
      backToHome: '← Torna a Breren'
    },
    ru: {
      tagline: 'Основа, которая несёт вперёд то, что важно.',
      themeToLight: 'Переключиться на светлую тему',
      themeToDark: 'Переключиться на тёмную тему',
      aboutTitle: 'О Breren',
      aboutOrigin: 'Breren соединяет два древних корня: праиндоевропейский *bher-* — нести, приносить, передавать вперёд — и пракельтский *brigā* — крепость, возвышенность, с которой видно дальше. Вместе: прочная основа, несущая важное в будущее.',
      backToHome: '← Назад к Breren'
    },
    zh: {
      tagline: '承载重要之物，一路向前的根基。',
      themeToLight: '切换到浅色模式',
      themeToDark: '切换到深色模式',
      aboutTitle: '关于 Breren',
      aboutOrigin: 'Breren 融合了两个古老的词根:原始印欧语 *bher-*——承载、携带、向前传递——以及原始凯尔特语 *brigā*——堡垒,能看得更远的高地。合而为一:承载重要之物、迈向未来的坚实根基。',
      backToHome: '← 返回 Breren'
    },
    ja: {
      tagline: '大切なものを未来へ運ぶ土台。',
      themeToLight: 'ライトモードに切り替える',
      themeToDark: 'ダークモードに切り替える',
      aboutTitle: 'Breren について',
      aboutOrigin: 'Brerenは二つの古い語根を組み合わせています。印欧祖語の*bher-*(運ぶ、携える、前へ伝える)と、ケルト祖語の*brigā*(砦、より遠くを見渡せる高台)です。合わせると、大切なものを未来へ運ぶ強固な土台となります。',
      backToHome: '← Breren に戻る'
    },
    ko: {
      tagline: '중요한 것을 앞으로 나아가게 하는 토대.',
      themeToLight: '라이트 모드로 전환',
      themeToDark: '다크 모드로 전환',
      aboutTitle: 'Breren 소개',
      aboutOrigin: 'Breren은 두 가지 고대 어근을 결합합니다. 인도유럽조어 *bher-*(나르다, 짊어지다, 앞으로 전하다)와 켈트조어 *brigā*(요새, 더 멀리 볼 수 있는 높은 곳)입니다. 함께: 중요한 것을 미래로 나르는 튼튼한 토대입니다.',
      backToHome: '← Breren으로 돌아가기'
    },
    ar: {
      tagline: 'أساس يحمل ما يهم إلى الأمام.',
      themeToLight: 'التبديل إلى الوضع الفاتح',
      themeToDark: 'التبديل إلى الوضع الداكن',
      aboutTitle: 'عن Breren',
      aboutOrigin: 'يجمع اسم Breren بين جذرين قديمين: الجذر الهندي الأوروبي البدائي *bher-* — يحمل، يسند، ينقل إلى الأمام — والجذر السلتي البدائي *brigā* — حصن، مرتفع يُرى منه أبعد. معًا: أساس قوي يحمل ما يهم نحو المستقبل.',
      backToHome: '← العودة إلى Breren'
    },
    hi: {
      tagline: 'एक नींव जो ज़रूरी चीज़ों को आगे ले जाती है।',
      themeToLight: 'लाइट मोड में बदलें',
      themeToDark: 'डार्क मोड में बदलें',
      aboutTitle: 'Breren के बारे में',
      aboutOrigin: 'Breren दो प्राचीन मूलों को जोड़ता है: प्रोटो-इंडो-यूरोपीय *bher-* — ले जाना, वहन करना, आगे पहुँचाना — और प्रोटो-सेल्टिक *brigā* — एक किला, एक ऊँचाई जहाँ से आगे तक देखा जा सके। साथ में: एक मज़बूत नींव जो ज़रूरी चीज़ों को भविष्य की ओर ले जाती है।',
      backToHome: '← Breren पर वापस जाएँ'
    },
    bn: {
      tagline: 'একটি ভিত্তি যা গুরুত্বপূর্ণ জিনিসকে সামনে এগিয়ে নিয়ে যায়।',
      themeToLight: 'লাইট মোডে যান',
      themeToDark: 'ডার্ক মোডে যান',
      aboutTitle: 'Breren সম্পর্কে',
      aboutOrigin: 'Breren দুটি প্রাচীন মূল একত্রিত করে: প্রোটো-ইন্দো-ইউরোপীয় *bher-* — বহন করা, ধরে রাখা, সামনে এগিয়ে নেওয়া — এবং প্রোটো-কেল্টিক *brigā* — একটি দুর্গ, এমন উচ্চতা যেখান থেকে আরও দূর দেখা যায়। একসাথে: একটি শক্তিশালী ভিত্তি যা গুরুত্বপূর্ণ জিনিসকে ভবিষ্যতের দিকে বহন করে।',
      backToHome: '← Breren-এ ফিরে যান'
    },
    ur: {
      tagline: 'ایک بنیاد جو اہم چیزوں کو آگے لے کر جاتی ہے۔',
      themeToLight: 'لائٹ موڈ پر جائیں',
      themeToDark: 'ڈارک موڈ پر جائیں',
      aboutTitle: 'Breren کے بارے میں',
      aboutOrigin: 'Breren دو قدیم جڑوں کو ملاتا ہے: پروٹو-انڈو-یورپی *bher-* — اٹھانا، لے جانا، آگے پہنچانا — اور پروٹو-سیلٹک *brigā* — ایک قلعہ، ایک بلندی جہاں سے مزید دور دیکھا جا سکے۔ ملا کر: ایک مضبوط بنیاد جو اہم چیزوں کو مستقبل کی طرف لے جاتی ہے۔',
      backToHome: '← Breren پر واپس جائیں'
    },
    fa: {
      tagline: 'بنیادی که آنچه اهمیت دارد را به پیش می‌برد.',
      themeToLight: 'رفتن به حالت روشن',
      themeToDark: 'رفتن به حالت تاریک',
      aboutTitle: 'درباره Breren',
      aboutOrigin: 'Breren دو ریشه باستانی را ترکیب می‌کند: ریشه پروتوهندواروپایی *bher-* — حمل کردن، بردن، به‌پیش‌بردن — و ریشه پروتوکلتیک *brigā* — دژی، بلندایی که از آن دورتر می‌توان دید. با هم: بنیادی استوار که آنچه اهمیت دارد را به آینده می‌برد.',
      backToHome: '← بازگشت به Breren'
    },
    tr: {
      tagline: 'Önemli olanı ileriye taşıyan bir temel.',
      themeToLight: 'Aydınlık moda geç',
      themeToDark: 'Karanlık moda geç',
      aboutTitle: 'Breren Hakkında',
      aboutOrigin: 'Breren iki eski kökü birleştirir: Proto-Hint-Avrupa kökü *bher-* — taşımak, sürdürmek, ileriye götürmek — ve Proto-Kelt kökü *brigā* — bir kale, daha uzağı görebileceğiniz bir yükseklik. Birlikte: önemli olanı geleceğe taşıyan güçlü bir temel.',
      backToHome: '← Breren’a dön'
    },
    vi: {
      tagline: 'Một nền tảng mang những điều quan trọng tiến về phía trước.',
      themeToLight: 'Chuyển sang chế độ sáng',
      themeToDark: 'Chuyển sang chế độ tối',
      aboutTitle: 'Về Breren',
      aboutOrigin: 'Breren kết hợp hai gốc từ cổ xưa: gốc Tiền Ấn-Âu *bher-* — mang, gánh vác, đưa về phía trước — và gốc Tiền Celt *brigā* — một pháo đài, một nơi cao để nhìn xa hơn. Kết hợp lại: một nền tảng vững chắc mang những điều quan trọng tiến về phía trước.',
      backToHome: '← Quay lại Breren'
    },
    id: {
      tagline: 'Fondasi yang membawa hal-hal penting maju ke depan.',
      themeToLight: 'Beralih ke mode terang',
      themeToDark: 'Beralih ke mode gelap',
      aboutTitle: 'Tentang Breren',
      aboutOrigin: 'Breren memadukan dua akar kuno: Proto-Indo-Eropa *bher-* — membawa, memikul, membawa maju — dan Proto-Celtic *brigā* — sebuah benteng, ketinggian tempat memandang lebih jauh. Bersama-sama: fondasi kuat yang membawa hal-hal penting menuju masa depan.',
      backToHome: '← Kembali ke Breren'
    },
    th: {
      tagline: 'รากฐานที่นำสิ่งสำคัญไปข้างหน้า',
      themeToLight: 'สลับเป็นโหมดสว่าง',
      themeToDark: 'สลับเป็นโหมดมืด',
      aboutTitle: 'เกี่ยวกับ Breren',
      aboutOrigin: 'Breren ผสานรากศัพท์โบราณสองราก คือ Proto-Indo-European *bher-* ที่แปลว่าแบก นำพา ส่งต่อไปข้างหน้า และ Proto-Celtic *brigā* ที่แปลว่าป้อมปราการ ที่สูงซึ่งมองเห็นได้ไกลกว่า รวมกันแล้วคือรากฐานที่มั่นคงซึ่งนำสิ่งสำคัญไปสู่อนาคต',
      backToHome: '← กลับไปที่ Breren'
    },
    sw: {
      tagline: 'Msingi unaobeba mbele mambo muhimu.',
      themeToLight: 'Badilisha hali ya mwanga',
      themeToDark: 'Badilisha hali ya giza',
      aboutTitle: 'Kuhusu Breren',
      aboutOrigin: 'Breren huchanganya mizizi miwili ya kale: mzizi wa Proto-Indo-European *bher-* — kubeba, kuchukua, kupeleka mbele — na mzizi wa Proto-Celtic *brigā* — ngome, kilele ambacho unaweza kuona mbali zaidi. Kwa pamoja: msingi imara unaobeba mambo muhimu kuelekea siku zijazo.',
      backToHome: '← Rudi Breren'
    },
    te: {
      tagline: 'ముఖ్యమైన వాటిని ముందుకు తీసుకెళ్లే పునాది.',
      themeToLight: 'లైట్ మోడ్‌కు మారండి',
      themeToDark: 'డార్క్ మోడ్‌కు మారండి',
      aboutTitle: 'Breren గురించి',
      aboutOrigin: 'Breren రెండు ప్రాచీన మూలాలను మిళితం చేస్తుంది: ప్రోటో-ఇండో-యూరోపియన్ *bher-* — మోయడం, భరించడం, ముందుకు తీసుకెళ్లడం — మరియు ప్రోటో-సెల్టిక్ *brigā* — కోట, మరింత దూరం చూడగలిగే ఎత్తైన ప్రదేశం. కలిపి: ముఖ్యమైన వాటిని భవిష్యత్తు వైపు మోసుకెళ్లే బలమైన పునాది.',
      backToHome: '← Breren‌కు తిరిగి వెళ్లండి'
    },
    ta: {
      tagline: 'முக்கியமானதை முன்னோக்கி கொண்டு செல்லும் அடித்தளம்.',
      themeToLight: 'லைட் பயன்முறைக்கு மாறவும்',
      themeToDark: 'டார்க் பயன்முறைக்கு மாறவும்',
      aboutTitle: 'Breren பற்றி',
      aboutOrigin: 'Breren இரண்டு பண்டைய வேர்களை இணைக்கிறது: புரோட்டோ-இந்தோ-ஐரோப்பிய *bher-* — சுமப்பது, தாங்குவது, முன்னோக்கி கொண்டு செல்வது — மற்றும் புரோட்டோ-கெல்டிக் *brigā* — ஒரு கோட்டை, தொலைவை பார்க்கக்கூடிய உயரம். ஒன்றாக: முக்கியமானதை எதிர்காலத்திற்கு கொண்டு செல்லும் வலுவான அடித்தளம்.',
      backToHome: '← Breren‌க்குத் திரும்பு'
    },
    pa: {
      tagline: 'ਇੱਕ ਬੁਨਿਆਦ ਜੋ ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ ਨੂੰ ਅੱਗੇ ਲੈ ਜਾਂਦੀ ਹੈ।',
      themeToLight: "ਲਾਈਟ ਮੋਡ 'ਤੇ ਜਾਓ",
      themeToDark: "ਡਾਰਕ ਮੋਡ 'ਤੇ ਜਾਓ",
      aboutTitle: 'Breren ਬਾਰੇ',
      aboutOrigin: 'Breren ਦੋ ਪ੍ਰਾਚੀਨ ਜੜ੍ਹਾਂ ਨੂੰ ਜੋੜਦਾ ਹੈ: ਪ੍ਰੋਟੋ-ਇੰਡੋ-ਯੂਰਪੀਅਨ *bher-* — ਚੁੱਕਣਾ, ਲਿਜਾਣਾ, ਅੱਗੇ ਪਹੁੰਚਾਉਣਾ — ਅਤੇ ਪ੍ਰੋਟੋ-ਸੈਲਟਿਕ *brigā* — ਇੱਕ ਕਿਲ੍ਹਾ, ਇੱਕ ਉਚਾਈ ਜਿੱਥੋਂ ਹੋਰ ਦੂਰ ਤੱਕ ਦੇਖਿਆ ਜਾ ਸਕੇ। ਇਕੱਠੇ: ਇੱਕ ਮਜ਼ਬੂਤ ਬੁਨਿਆਦ ਜੋ ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ ਨੂੰ ਭਵਿੱਖ ਵੱਲ ਲੈ ਜਾਂਦੀ ਹੈ।',
      backToHome: '← ਵਾਪਸ Breren ਵੱਲ'
    }
  };

  // A page linking back here (e.g. vitralis's "Breren" link) can hand off
  // its current language/theme via ?lang=&theme= query params - a plain
  // top-level navigation can't carry a postMessage, since the page that
  // would send it has already unloaded by the time this one loads. Applied
  // unconditionally (not just first-seed) and then stripped from the URL.
  function applyIncomingPreset() {
    var params = new URLSearchParams(window.location.search);
    var lang = (params.get('lang') || '').toLowerCase();
    var theme = (params.get('theme') || '').toLowerCase();
    var hasLang = lang && SUPPORTED_LANGS.indexOf(lang) !== -1;
    var hasTheme = theme === 'light' || theme === 'dark';
    if (hasLang) localStorage.setItem('breren-lang', lang);
    if (hasTheme) localStorage.setItem('breren-theme', theme);
    if (params.has('lang') || params.has('theme')) {
      params.delete('lang');
      params.delete('theme');
      var qs = params.toString();
      var newUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      window.history.replaceState(null, '', newUrl);
    }
  }

  function detectLang() {
    var stored = localStorage.getItem('breren-lang');
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    var candidates = navigator.languages || [navigator.language || 'gl'];
    for (var i = 0; i < candidates.length; i++) {
      var code = (candidates[i] || '').slice(0, 2).toLowerCase();
      if (SUPPORTED_LANGS.indexOf(code) !== -1) return code;
    }
    return 'gl';
  }

  function effectiveTheme() {
    var stored = localStorage.getItem('breren-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyDirection(code) {
    var lang = LANG_BY_CODE[code];
    document.documentElement.dir = lang && lang.rtl ? 'rtl' : 'ltr';
  }

  // `t` is the page's own translate function (falls back through
  // COMMON_STRINGS already), used here just for the theme button's label.
  function applyTheme(theme, t) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? t('themeToLight') : t('themeToDark'));
    btn.title = btn.getAttribute('aria-label');
  }

  function setupThemeToggle(t, onChange) {
    document.getElementById('theme-toggle').addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      localStorage.setItem('breren-theme', next);
      applyTheme(next, t);
      if (onChange) onChange(next);
    });
  }

  // `getCurrentLang`/`onSelect` let the calling page own `currentLang` and
  // react (re-render, update <html lang>, ...) when it changes.
  function setupLangPicker(getCurrentLang, onSelect) {
    var trigger = document.getElementById('lang-trigger');
    var menu = document.getElementById('lang-menu');
    var triggerFlag = document.getElementById('lang-trigger-flag');
    var triggerName = document.getElementById('lang-trigger-name');

    LANGUAGES.forEach(function (lang) {
      var li = document.createElement('li');
      li.setAttribute('role', 'presentation');

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-option';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', String(lang.code === getCurrentLang()));
      btn.innerHTML =
        '<span class="flag">' + lang.flag + '</span><span>' + lang.name + '</span>';
      btn.addEventListener('click', function () {
        onSelect(lang.code);
        updateTrigger();
        closeMenu();
      });

      li.appendChild(btn);
      menu.appendChild(li);
    });

    updateTrigger();

    trigger.addEventListener('click', function () {
      var isOpen = !menu.hidden;
      if (isOpen) closeMenu(); else openMenu();
    });

    document.addEventListener('click', function (e) {
      if (!menu.hidden && !e.target.closest('.lang-picker')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        closeMenu();
        trigger.focus();
      }
    });

    function openMenu() {
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
    function updateTrigger() {
      var lang = LANG_BY_CODE[getCurrentLang()];
      triggerFlag.innerHTML = lang.flag;
      triggerName.textContent = lang.name;
      Array.prototype.forEach.call(menu.querySelectorAll('.lang-option'), function (btn, i) {
        btn.setAttribute('aria-selected', String(LANGUAGES[i].code === getCurrentLang()));
      });
    }

    return { updateTrigger: updateTrigger };
  }

  global.BrerenCommon = {
    LANGUAGES: LANGUAGES,
    SUPPORTED_LANGS: SUPPORTED_LANGS,
    LANG_BY_CODE: LANG_BY_CODE,
    RTL_LANGS: RTL_LANGS,
    COMMON_STRINGS: COMMON_STRINGS,
    applyIncomingPreset: applyIncomingPreset,
    detectLang: detectLang,
    effectiveTheme: effectiveTheme,
    applyDirection: applyDirection,
    applyTheme: applyTheme,
    setupThemeToggle: setupThemeToggle,
    setupLangPicker: setupLangPicker
  };
})(window);
