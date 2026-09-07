// ============================================================
// IziFrench — data.js
// Контент кабинета: глаголы, сценарии, словарь, разговорник,
// квизы, 30-дневный план, достижения.
//
// Спряжения (present / preterite = passé composé / future) НЕ пишутся
// руками — их достраивает tools/build_verbs.js по правилам и таблицам
// неправильных глаголов. Достаточно добавить глагол с полями
// infinitive / translation / transcription / example и прогнать скрипт.
// ============================================================

const VERBS = [
  {
    id: 1, infinitive: "être", translation: "быть",
    transcription: "этр", note: "Главный неправильный глагол. Нужен и сам по себе, и как вспомогательный в passé composé для глаголов движения.",
    example: {"greek": "Je suis russe, je suis en France depuis deux ans.", "ru": "Я русский, я во Франции уже два года."},
    present: {"je": "suis", "tu": "es", "il/elle": "est", "nous": "sommes", "vous": "êtes", "ils/elles": "sont"},
    preterite: {"je": "ai été", "tu": "as été", "il/elle": "a été", "nous": "avons été", "vous": "avez été", "ils/elles": "ont été"},
    future: {"je": "serai", "tu": "seras", "il/elle": "sera", "nous": "serons", "vous": "serez", "ils/elles": "seront"}
  },
  {
    id: 2, infinitive: "avoir", translation: "иметь",
    transcription: "авуа́р", note: "Второй вспомогательный глагол. С ним же строятся «мне холодно», «мне 30 лет»: j'ai froid, j'ai 30 ans.",
    example: {"greek": "J'ai rendez-vous à la préfecture lundi.", "ru": "У меня встреча в префектуре в понедельник."},
    present: {"je": "ai", "tu": "as", "il/elle": "a", "nous": "avons", "vous": "avez", "ils/elles": "ont"},
    preterite: {"je": "ai eu", "tu": "as eu", "il/elle": "a eu", "nous": "avons eu", "vous": "avez eu", "ils/elles": "ont eu"},
    future: {"je": "aurai", "tu": "auras", "il/elle": "aura", "nous": "aurons", "vous": "aurez", "ils/elles": "auront"}
  },
  {
    id: 3, infinitive: "aller", translation: "идти / ехать",
    transcription: "але́", note: "Aller + инфинитив = ближайшее будущее: je vais partir — я сейчас уеду.",
    example: {"greek": "Je vais à la mairie ce matin.", "ru": "Я иду в мэрию сегодня утром."},
    present: {"je": "vais", "tu": "vas", "il/elle": "va", "nous": "allons", "vous": "allez", "ils/elles": "vont"},
    preterite: {"je": "suis allé(e)", "tu": "es allé(e)", "il/elle": "est allé(e)", "nous": "sommes allé(e)s", "vous": "êtes allé(e)(s)", "ils/elles": "sont allé(e)s"},
    future: {"je": "irai", "tu": "iras", "il/elle": "ira", "nous": "irons", "vous": "irez", "ils/elles": "iront"}
  },
  {
    id: 4, infinitive: "faire", translation: "делать",
    transcription: "фэр", note: "Огромное количество выражений: faire les courses (закупаться), faire la queue (стоять в очереди), il fait froid (холодно).",
    example: {"greek": "Je fais les courses au marché le samedi.", "ru": "По субботам я закупаюсь на рынке."},
    present: {"je": "fais", "tu": "fais", "il/elle": "fait", "nous": "faisons", "vous": "faites", "ils/elles": "font"},
    preterite: {"je": "ai fait", "tu": "as fait", "il/elle": "a fait", "nous": "avons fait", "vous": "avez fait", "ils/elles": "ont fait"},
    future: {"je": "ferai", "tu": "feras", "il/elle": "fera", "nous": "ferons", "vous": "ferez", "ils/elles": "feront"}
  },
  {
    id: 5, infinitive: "dire", translation: "говорить / сказать",
    transcription: "дир", note: "Vous dites — одна из трёх форм на -tes во французском (вместе с faites и êtes).",
    example: {"greek": "Qu'est-ce que vous dites ? Je n'ai pas compris.", "ru": "Что вы говорите? Я не понял."},
    present: {"je": "dis", "tu": "dis", "il/elle": "dit", "nous": "disons", "vous": "dites", "ils/elles": "disent"},
    preterite: {"je": "ai dit", "tu": "as dit", "il/elle": "a dit", "nous": "avons dit", "vous": "avez dit", "ils/elles": "ont dit"},
    future: {"je": "dirai", "tu": "diras", "il/elle": "dira", "nous": "dirons", "vous": "direz", "ils/elles": "diront"}
  },
  {
    id: 6, infinitive: "pouvoir", translation: "мочь",
    transcription: "пувуа́р", note: "Вежливая просьба — через условное: pourriez-vous... («не могли бы вы»).",
    example: {"greek": "Est-ce que vous pouvez répéter, s'il vous plaît ?", "ru": "Вы можете повторить, пожалуйста?"},
    present: {"je": "peux", "tu": "peux", "il/elle": "peut", "nous": "pouvons", "vous": "pouvez", "ils/elles": "peuvent"},
    preterite: {"je": "ai pu", "tu": "as pu", "il/elle": "a pu", "nous": "avons pu", "vous": "avez pu", "ils/elles": "ont pu"},
    future: {"je": "pourrai", "tu": "pourras", "il/elle": "pourra", "nous": "pourrons", "vous": "pourrez", "ils/elles": "pourront"}
  },
  {
    id: 7, infinitive: "vouloir", translation: "хотеть",
    transcription: "вулуа́р", note: "«Je veux» в магазине звучит грубо — говорите «je voudrais» (я бы хотел).",
    example: {"greek": "Je voudrais ouvrir un compte bancaire.", "ru": "Я хотел бы открыть банковский счёт."},
    present: {"je": "veux", "tu": "veux", "il/elle": "veut", "nous": "voulons", "vous": "voulez", "ils/elles": "veulent"},
    preterite: {"je": "ai voulu", "tu": "as voulu", "il/elle": "a voulu", "nous": "avons voulu", "vous": "avez voulu", "ils/elles": "ont voulu"},
    future: {"je": "voudrai", "tu": "voudras", "il/elle": "voudra", "nous": "voudrons", "vous": "voudrez", "ils/elles": "voudront"}
  },
  {
    id: 8, infinitive: "devoir", translation: "быть должным",
    transcription: "девуа́р", note: "И про обязанность, и про долг деньгами: je dois 50 euros.",
    example: {"greek": "Je dois apporter un justificatif de domicile.", "ru": "Я должен принести подтверждение места жительства."},
    present: {"je": "dois", "tu": "dois", "il/elle": "doit", "nous": "devons", "vous": "devez", "ils/elles": "doivent"},
    preterite: {"je": "ai dû", "tu": "as dû", "il/elle": "a dû", "nous": "avons dû", "vous": "avez dû", "ils/elles": "ont dû"},
    future: {"je": "devrai", "tu": "devras", "il/elle": "devra", "nous": "devrons", "vous": "devrez", "ils/elles": "devront"}
  },
  {
    id: 9, infinitive: "savoir", translation: "знать (уметь)",
    transcription: "савуа́р", note: "Savoir — знать факт или уметь. Connaître — быть знакомым с человеком или местом.",
    example: {"greek": "Je sais parler un peu français.", "ru": "Я умею немного говорить по-французски."},
    present: {"je": "sais", "tu": "sais", "il/elle": "sait", "nous": "savons", "vous": "savez", "ils/elles": "savent"},
    preterite: {"je": "ai su", "tu": "as su", "il/elle": "a su", "nous": "avons su", "vous": "avez su", "ils/elles": "ont su"},
    future: {"je": "saurai", "tu": "sauras", "il/elle": "saura", "nous": "saurons", "vous": "saurez", "ils/elles": "sauront"}
  },
  {
    id: 10, infinitive: "voir", translation: "видеть",
    transcription: "вуа́р", note: "«On verra» — «посмотрим», очень частый ответ-отсрочка.",
    example: {"greek": "Je vois le médecin traitant demain.", "ru": "Завтра я иду к лечащему врачу."},
    present: {"je": "vois", "tu": "vois", "il/elle": "voit", "nous": "voyons", "vous": "voyez", "ils/elles": "voient"},
    preterite: {"je": "ai vu", "tu": "as vu", "il/elle": "a vu", "nous": "avons vu", "vous": "avez vu", "ils/elles": "ont vu"},
    future: {"je": "verrai", "tu": "verras", "il/elle": "verra", "nous": "verrons", "vous": "verrez", "ils/elles": "verront"}
  },
  {
    id: 11, infinitive: "venir", translation: "приходить",
    transcription: "вени́р", note: "Venir de + инфинитив = только что сделал: je viens d'arriver — я только что приехал.",
    example: {"greek": "Je viens de Russie, j'habite à Lyon.", "ru": "Я из России, живу в Лионе."},
    present: {"je": "viens", "tu": "viens", "il/elle": "vient", "nous": "venons", "vous": "venez", "ils/elles": "viennent"},
    preterite: {"je": "suis venu(e)", "tu": "es venu(e)", "il/elle": "est venu(e)", "nous": "sommes venu(e)s", "vous": "êtes venu(e)(s)", "ils/elles": "sont venu(e)s"},
    future: {"je": "viendrai", "tu": "viendras", "il/elle": "viendra", "nous": "viendrons", "vous": "viendrez", "ils/elles": "viendront"}
  },
  {
    id: 12, infinitive: "prendre", translation: "брать",
    transcription: "прандр", note: "Prendre le métro, prendre un café, prendre rendez-vous — почти всё «делается» этим глаголом.",
    example: {"greek": "Je prends le RER B pour aller à l'aéroport.", "ru": "Я еду на RER B в аэропорт."},
    present: {"je": "prends", "tu": "prends", "il/elle": "prend", "nous": "prenons", "vous": "prenez", "ils/elles": "prennent"},
    preterite: {"je": "ai pris", "tu": "as pris", "il/elle": "a pris", "nous": "avons pris", "vous": "avez pris", "ils/elles": "ont pris"},
    future: {"je": "prendrai", "tu": "prendras", "il/elle": "prendra", "nous": "prendrons", "vous": "prendrez", "ils/elles": "prendront"}
  },
  {
    id: 13, infinitive: "mettre", translation: "класть / надевать",
    transcription: "метр", note: "Mettre du temps — тратить время: je mets une heure pour venir.",
    example: {"greek": "Je mets mon dossier dans une enveloppe.", "ru": "Я кладу своё досье в конверт."},
    present: {"je": "mets", "tu": "mets", "il/elle": "met", "nous": "mettons", "vous": "mettez", "ils/elles": "mettent"},
    preterite: {"je": "ai mis", "tu": "as mis", "il/elle": "a mis", "nous": "avons mis", "vous": "avez mis", "ils/elles": "ont mis"},
    future: {"je": "mettrai", "tu": "mettras", "il/elle": "mettra", "nous": "mettrons", "vous": "mettrez", "ils/elles": "mettront"}
  },
  {
    id: 14, infinitive: "parler", translation: "говорить",
    transcription: "парле́", note: "Правильный глагол на -er — по нему спрягается 90% французских глаголов.",
    example: {"greek": "Est-ce que vous parlez anglais ?", "ru": "Вы говорите по-английски?"},
    present: {"je": "parle", "tu": "parles", "il/elle": "parle", "nous": "parlons", "vous": "parlez", "ils/elles": "parlent"},
    preterite: {"je": "ai parlé", "tu": "as parlé", "il/elle": "a parlé", "nous": "avons parlé", "vous": "avez parlé", "ils/elles": "ont parlé"},
    future: {"je": "parlerai", "tu": "parleras", "il/elle": "parlera", "nous": "parlerons", "vous": "parlerez", "ils/elles": "parleront"}
  },
  {
    id: 15, infinitive: "demander", translation: "спрашивать / просить",
    transcription: "деманде́", note: "Demander à quelqu'un — предлог à обязателен: je demande au vendeur.",
    example: {"greek": "Je vais demander à la CAF comment faire.", "ru": "Я спрошу в CAF, как быть."},
    present: {"je": "demande", "tu": "demandes", "il/elle": "demande", "nous": "demandons", "vous": "demandez", "ils/elles": "demandent"},
    preterite: {"je": "ai demandé", "tu": "as demandé", "il/elle": "a demandé", "nous": "avons demandé", "vous": "avez demandé", "ils/elles": "ont demandé"},
    future: {"je": "demanderai", "tu": "demanderas", "il/elle": "demandera", "nous": "demanderons", "vous": "demanderez", "ils/elles": "demanderont"}
  },
  {
    id: 16, infinitive: "habiter", translation: "жить / проживать",
    transcription: "абите́", note: "Начинается с немого h, поэтому только j'habite, никогда «je habite».",
    example: {"greek": "J'habite en France depuis trois ans.", "ru": "Я живу во Франции три года."},
    present: {"je": "habite", "tu": "habites", "il/elle": "habite", "nous": "habitons", "vous": "habitez", "ils/elles": "habitent"},
    preterite: {"je": "ai habité", "tu": "as habité", "il/elle": "a habité", "nous": "avons habité", "vous": "avez habité", "ils/elles": "ont habité"},
    future: {"je": "habiterai", "tu": "habiteras", "il/elle": "habitera", "nous": "habiterons", "vous": "habiterez", "ils/elles": "habiteront"}
  },
  {
    id: 17, infinitive: "travailler", translation: "работать",
    transcription: "травайе́", note: "Ça ne marche pas / ça ne travaille pas: про технику говорят marcher, а не travailler.",
    example: {"greek": "Je travaille dans une entreprise française.", "ru": "Я работаю во французской компании."},
    present: {"je": "travaille", "tu": "travailles", "il/elle": "travaille", "nous": "travaillons", "vous": "travaillez", "ils/elles": "travaillent"},
    preterite: {"je": "ai travaillé", "tu": "as travaillé", "il/elle": "a travaillé", "nous": "avons travaillé", "vous": "avez travaillé", "ils/elles": "ont travaillé"},
    future: {"je": "travaillerai", "tu": "travailleras", "il/elle": "travaillera", "nous": "travaillerons", "vous": "travaillerez", "ils/elles": "travailleront"}
  },
  {
    id: 18, infinitive: "manger", translation: "есть (кушать)",
    transcription: "манже́", note: "В форме nous пишется mangeons — буква e сохраняет мягкое «ж».",
    example: {"greek": "Nous mangeons souvent à la cantine.", "ru": "Мы часто едим в столовой."},
    present: {"je": "mange", "tu": "manges", "il/elle": "mange", "nous": "mangeons", "vous": "mangez", "ils/elles": "mangent"},
    preterite: {"je": "ai mangé", "tu": "as mangé", "il/elle": "a mangé", "nous": "avons mangé", "vous": "avez mangé", "ils/elles": "ont mangé"},
    future: {"je": "mangerai", "tu": "mangeras", "il/elle": "mangera", "nous": "mangerons", "vous": "mangerez", "ils/elles": "mangeront"}
  },
  {
    id: 19, infinitive: "boire", translation: "пить",
    transcription: "буа́р", note: "Неправильный: nous buvons, ils boivent.",
    example: {"greek": "Je bois un café au comptoir, c'est moins cher.", "ru": "Я пью кофе у стойки — так дешевле."},
    present: {"je": "bois", "tu": "bois", "il/elle": "boit", "nous": "buvons", "vous": "buvez", "ils/elles": "boivent"},
    preterite: {"je": "ai bu", "tu": "as bu", "il/elle": "a bu", "nous": "avons bu", "vous": "avez bu", "ils/elles": "ont bu"},
    future: {"je": "boirai", "tu": "boiras", "il/elle": "boira", "nous": "boirons", "vous": "boirez", "ils/elles": "boiront"}
  },
  {
    id: 20, infinitive: "acheter", translation: "покупать",
    transcription: "ашете́", note: "Accent grave появляется там, где ударение: j'achète, но nous achetons.",
    example: {"greek": "J'achète mon pain à la boulangerie du coin.", "ru": "Я покупаю хлеб в булочной на углу."},
    present: {"je": "achète", "tu": "achètes", "il/elle": "achète", "nous": "achetons", "vous": "achetez", "ils/elles": "achètent"},
    preterite: {"je": "ai acheté", "tu": "as acheté", "il/elle": "a acheté", "nous": "avons acheté", "vous": "avez acheté", "ils/elles": "ont acheté"},
    future: {"je": "achèterai", "tu": "achèteras", "il/elle": "achètera", "nous": "achèterons", "vous": "achèterez", "ils/elles": "achèteront"}
  },
  {
    id: 21, infinitive: "payer", translation: "платить",
    transcription: "пэйе́", note: "Две допустимые записи: je paie и je paye. В банке и в кассе чаще paie.",
    example: {"greek": "Je paie par carte, ça marche ?", "ru": "Я плачу картой, это возможно?"},
    present: {"je": "paie", "tu": "paies", "il/elle": "paie", "nous": "payons", "vous": "payez", "ils/elles": "paient"},
    preterite: {"je": "ai payé", "tu": "as payé", "il/elle": "a payé", "nous": "avons payé", "vous": "avez payé", "ils/elles": "ont payé"},
    future: {"je": "paierai", "tu": "paieras", "il/elle": "paiera", "nous": "paierons", "vous": "paierez", "ils/elles": "paieront"}
  },
  {
    id: 22, infinitive: "donner", translation: "давать",
    transcription: "донэ́", note: "Donner sur — выходить окнами: l'appartement donne sur la cour.",
    example: {"greek": "Donnez-moi une baguette, s'il vous plaît.", "ru": "Дайте мне багет, пожалуйста."},
    present: {"je": "donne", "tu": "donnes", "il/elle": "donne", "nous": "donnons", "vous": "donnez", "ils/elles": "donnent"},
    preterite: {"je": "ai donné", "tu": "as donné", "il/elle": "a donné", "nous": "avons donné", "vous": "avez donné", "ils/elles": "ont donné"},
    future: {"je": "donnerai", "tu": "donneras", "il/elle": "donnera", "nous": "donnerons", "vous": "donnerez", "ils/elles": "donneront"}
  },
  {
    id: 23, infinitive: "trouver", translation: "находить / считать",
    transcription: "труве́", note: "Ещё и «считать, полагать»: je trouve ça cher — по-моему, это дорого.",
    example: {"greek": "Je n'arrive pas à trouver un appartement.", "ru": "У меня не получается найти квартиру."},
    present: {"je": "trouve", "tu": "trouves", "il/elle": "trouve", "nous": "trouvons", "vous": "trouvez", "ils/elles": "trouvent"},
    preterite: {"je": "ai trouvé", "tu": "as trouvé", "il/elle": "a trouvé", "nous": "avons trouvé", "vous": "avez trouvé", "ils/elles": "ont trouvé"},
    future: {"je": "trouverai", "tu": "trouveras", "il/elle": "trouvera", "nous": "trouverons", "vous": "trouverez", "ils/elles": "trouveront"}
  },
  {
    id: 24, infinitive: "chercher", translation: "искать",
    transcription: "шерше́", note: "Никакого предлога после: je cherche un appartement, без «pour».",
    example: {"greek": "Je cherche le bureau des étrangers.", "ru": "Я ищу отдел по делам иностранцев."},
    present: {"je": "cherche", "tu": "cherches", "il/elle": "cherche", "nous": "cherchons", "vous": "cherchez", "ils/elles": "cherchent"},
    preterite: {"je": "ai cherché", "tu": "as cherché", "il/elle": "a cherché", "nous": "avons cherché", "vous": "avez cherché", "ils/elles": "ont cherché"},
    future: {"je": "chercherai", "tu": "chercheras", "il/elle": "cherchera", "nous": "chercherons", "vous": "chercherez", "ils/elles": "chercheront"}
  },
  {
    id: 25, infinitive: "attendre", translation: "ждать",
    transcription: "атандр", note: "Тоже без предлога: j'attends le bus, не «j'attends pour le bus».",
    example: {"greek": "J'attends ma carte de séjour depuis six mois.", "ru": "Я жду свой вид на жительство шесть месяцев."},
    present: {"je": "attends", "tu": "attends", "il/elle": "attend", "nous": "attendons", "vous": "attendez", "ils/elles": "attendent"},
    preterite: {"je": "ai attendu", "tu": "as attendu", "il/elle": "a attendu", "nous": "avons attendu", "vous": "avez attendu", "ils/elles": "ont attendu"},
    future: {"je": "attendrai", "tu": "attendras", "il/elle": "attendra", "nous": "attendrons", "vous": "attendrez", "ils/elles": "attendront"}
  },
  {
    id: 26, infinitive: "comprendre", translation: "понимать",
    transcription: "компрандр", note: "Самая нужная фраза первых месяцев: je ne comprends pas.",
    example: {"greek": "Je comprends mieux quand vous parlez lentement.", "ru": "Я понимаю лучше, когда вы говорите медленно."},
    present: {"je": "comprends", "tu": "comprends", "il/elle": "comprend", "nous": "comprenons", "vous": "comprenez", "ils/elles": "comprennent"},
    preterite: {"je": "ai compris", "tu": "as compris", "il/elle": "a compris", "nous": "avons compris", "vous": "avez compris", "ils/elles": "ont compris"},
    future: {"je": "comprendrai", "tu": "comprendras", "il/elle": "comprendra", "nous": "comprendrons", "vous": "comprendrez", "ils/elles": "comprendront"}
  },
  {
    id: 27, infinitive: "apprendre", translation: "учить (изучать)",
    transcription: "апрандр", note: "Apprendre à + инфинитив: j'apprends à conduire.",
    example: {"greek": "J'apprends le français tous les jours.", "ru": "Я учу французский каждый день."},
    present: {"je": "apprends", "tu": "apprends", "il/elle": "apprend", "nous": "apprenons", "vous": "apprenez", "ils/elles": "apprennent"},
    preterite: {"je": "ai appris", "tu": "as appris", "il/elle": "a appris", "nous": "avons appris", "vous": "avez appris", "ils/elles": "ont appris"},
    future: {"je": "apprendrai", "tu": "apprendras", "il/elle": "apprendra", "nous": "apprendrons", "vous": "apprendrez", "ils/elles": "apprendront"}
  },
  {
    id: 28, infinitive: "écrire", translation: "писать",
    transcription: "экри́р", note: "Nous écrivons, ils écrivent — в основе появляется v.",
    example: {"greek": "Je vous écris pour prendre rendez-vous.", "ru": "Я пишу вам, чтобы записаться на приём."},
    present: {"je": "écris", "tu": "écris", "il/elle": "écrit", "nous": "écrivons", "vous": "écrivez", "ils/elles": "écrivent"},
    preterite: {"je": "ai écrit", "tu": "as écrit", "il/elle": "a écrit", "nous": "avons écrit", "vous": "avez écrit", "ils/elles": "ont écrit"},
    future: {"je": "écrirai", "tu": "écriras", "il/elle": "écrira", "nous": "écrirons", "vous": "écrirez", "ils/elles": "écriront"}
  },
  {
    id: 29, infinitive: "lire", translation: "читать",
    transcription: "лир", note: "Причастие lu: j'ai lu le contrat.",
    example: {"greek": "J'ai lu le bail avant de signer.", "ru": "Я прочитал договор аренды перед подписанием."},
    present: {"je": "lis", "tu": "lis", "il/elle": "lit", "nous": "lisons", "vous": "lisez", "ils/elles": "lisent"},
    preterite: {"je": "ai lu", "tu": "as lu", "il/elle": "a lu", "nous": "avons lu", "vous": "avez lu", "ils/elles": "ont lu"},
    future: {"je": "lirai", "tu": "liras", "il/elle": "lira", "nous": "lirons", "vous": "lirez", "ils/elles": "liront"}
  },
  {
    id: 30, infinitive: "écouter", translation: "слушать",
    transcription: "экуте́", note: "Без предлога: j'écoute la radio.",
    example: {"greek": "J'écoute la radio française pour l'accent.", "ru": "Я слушаю французское радио ради акцента."},
    present: {"je": "écoute", "tu": "écoutes", "il/elle": "écoute", "nous": "écoutons", "vous": "écoutez", "ils/elles": "écoutent"},
    preterite: {"je": "ai écouté", "tu": "as écouté", "il/elle": "a écouté", "nous": "avons écouté", "vous": "avez écouté", "ils/elles": "ont écouté"},
    future: {"je": "écouterai", "tu": "écouteras", "il/elle": "écoutera", "nous": "écouterons", "vous": "écouterez", "ils/elles": "écouteront"}
  },
  {
    id: 31, infinitive: "regarder", translation: "смотреть",
    transcription: "регарде́", note: "Voir — видеть непроизвольно, regarder — смотреть намеренно.",
    example: {"greek": "Je regarde les annonces sur Leboncoin.", "ru": "Я смотрю объявления на Leboncoin."},
    present: {"je": "regarde", "tu": "regardes", "il/elle": "regarde", "nous": "regardons", "vous": "regardez", "ils/elles": "regardent"},
    preterite: {"je": "ai regardé", "tu": "as regardé", "il/elle": "a regardé", "nous": "avons regardé", "vous": "avez regardé", "ils/elles": "ont regardé"},
    future: {"je": "regarderai", "tu": "regarderas", "il/elle": "regardera", "nous": "regarderons", "vous": "regarderez", "ils/elles": "regarderont"}
  },
  {
    id: 32, infinitive: "aimer", translation: "любить / нравиться",
    transcription: "эме́", note: "J'aime — люблю; j'aimerais — хотел бы. Вторая форма вежливее в просьбах.",
    example: {"greek": "J'aime bien ce quartier, il est calme.", "ru": "Мне нравится этот район, он тихий."},
    present: {"je": "aime", "tu": "aimes", "il/elle": "aime", "nous": "aimons", "vous": "aimez", "ils/elles": "aiment"},
    preterite: {"je": "ai aimé", "tu": "as aimé", "il/elle": "a aimé", "nous": "avons aimé", "vous": "avez aimé", "ils/elles": "ont aimé"},
    future: {"je": "aimerai", "tu": "aimeras", "il/elle": "aimera", "nous": "aimerons", "vous": "aimerez", "ils/elles": "aimeront"}
  },
  {
    id: 33, infinitive: "penser", translation: "думать",
    transcription: "пансе́", note: "Penser à — думать о ком-то; penser de — иметь мнение.",
    example: {"greek": "Je pense que c'est trop cher.", "ru": "Я думаю, это слишком дорого."},
    present: {"je": "pense", "tu": "penses", "il/elle": "pense", "nous": "pensons", "vous": "pensez", "ils/elles": "pensent"},
    preterite: {"je": "ai pensé", "tu": "as pensé", "il/elle": "a pensé", "nous": "avons pensé", "vous": "avez pensé", "ils/elles": "ont pensé"},
    future: {"je": "penserai", "tu": "penseras", "il/elle": "pensera", "nous": "penserons", "vous": "penserez", "ils/elles": "penseront"}
  },
  {
    id: 34, infinitive: "croire", translation: "верить / полагать",
    transcription: "круа́р", note: "Je crois que oui — «кажется, да», очень частый смягчённый ответ.",
    example: {"greek": "Je crois que le bureau ferme à 16h.", "ru": "Кажется, офис закрывается в 16:00."},
    present: {"je": "crois", "tu": "crois", "il/elle": "croit", "nous": "croyons", "vous": "croyez", "ils/elles": "croient"},
    preterite: {"je": "ai cru", "tu": "as cru", "il/elle": "a cru", "nous": "avons cru", "vous": "avez cru", "ils/elles": "ont cru"},
    future: {"je": "croirai", "tu": "croiras", "il/elle": "croira", "nous": "croirons", "vous": "croirez", "ils/elles": "croiront"}
  },
  {
    id: 35, infinitive: "connaître", translation: "знать (быть знакомым)",
    transcription: "конэ́тр", note: "Про людей, города, места. Про факты — savoir.",
    example: {"greek": "Je connais bien ce quartier.", "ru": "Я хорошо знаю этот район."},
    present: {"je": "connais", "tu": "connais", "il/elle": "connaît", "nous": "connaissons", "vous": "connaissez", "ils/elles": "connaissent"},
    preterite: {"je": "ai connu", "tu": "as connu", "il/elle": "a connu", "nous": "avons connu", "vous": "avez connu", "ils/elles": "ont connu"},
    future: {"je": "connaîtrai", "tu": "connaîtras", "il/elle": "connaîtra", "nous": "connaîtrons", "vous": "connaîtrez", "ils/elles": "connaîtront"}
  },
  {
    id: 36, infinitive: "rester", translation: "оставаться",
    transcription: "рэсте́", note: "В passé composé с être: je suis resté.",
    example: {"greek": "Je reste en France cette année.", "ru": "В этом году я остаюсь во Франции."},
    present: {"je": "reste", "tu": "restes", "il/elle": "reste", "nous": "restons", "vous": "restez", "ils/elles": "restent"},
    preterite: {"je": "suis resté(e)", "tu": "es resté(e)", "il/elle": "est resté(e)", "nous": "sommes resté(e)s", "vous": "êtes resté(e)(s)", "ils/elles": "sont resté(e)s"},
    future: {"je": "resterai", "tu": "resteras", "il/elle": "restera", "nous": "resterons", "vous": "resterez", "ils/elles": "resteront"}
  },
  {
    id: 37, infinitive: "partir", translation: "уезжать",
    transcription: "парти́р", note: "Partir de — откуда, partir à/pour — куда.",
    example: {"greek": "Le train part dans dix minutes.", "ru": "Поезд отправляется через десять минут."},
    present: {"je": "pars", "tu": "pars", "il/elle": "part", "nous": "partons", "vous": "partez", "ils/elles": "partent"},
    preterite: {"je": "suis parti(e)", "tu": "es parti(e)", "il/elle": "est parti(e)", "nous": "sommes parti(e)s", "vous": "êtes parti(e)(s)", "ils/elles": "sont parti(e)s"},
    future: {"je": "partirai", "tu": "partiras", "il/elle": "partira", "nous": "partirons", "vous": "partirez", "ils/elles": "partiront"}
  },
  {
    id: 38, infinitive: "sortir", translation: "выходить",
    transcription: "сорти́р", note: "Ещё и «гулять, встречаться»: on sort ce soir ?",
    example: {"greek": "Je sors du métro à Châtelet.", "ru": "Я выхожу из метро на Шатле."},
    present: {"je": "sors", "tu": "sors", "il/elle": "sort", "nous": "sortons", "vous": "sortez", "ils/elles": "sortent"},
    preterite: {"je": "suis sorti(e)", "tu": "es sorti(e)", "il/elle": "est sorti(e)", "nous": "sommes sorti(e)s", "vous": "êtes sorti(e)(s)", "ils/elles": "sont sorti(e)s"},
    future: {"je": "sortirai", "tu": "sortiras", "il/elle": "sortira", "nous": "sortirons", "vous": "sortirez", "ils/elles": "sortiront"}
  },
  {
    id: 39, infinitive: "entrer", translation: "входить",
    transcription: "антре́", note: "Entrer dans — предлог обязателен.",
    example: {"greek": "Entrez, asseyez-vous, s'il vous plaît.", "ru": "Входите, садитесь, пожалуйста."},
    present: {"je": "entre", "tu": "entres", "il/elle": "entre", "nous": "entrons", "vous": "entrez", "ils/elles": "entrent"},
    preterite: {"je": "suis entré(e)", "tu": "es entré(e)", "il/elle": "est entré(e)", "nous": "sommes entré(e)s", "vous": "êtes entré(e)(s)", "ils/elles": "sont entré(e)s"},
    future: {"je": "entrerai", "tu": "entreras", "il/elle": "entrera", "nous": "entrerons", "vous": "entrerez", "ils/elles": "entreront"}
  },
  {
    id: 40, infinitive: "arriver", translation: "приезжать / случаться",
    transcription: "ариве́", note: "Ça arrive — «бывает». Arriver à + инфинитив — «получаться».",
    example: {"greek": "J'arrive à la gare à midi.", "ru": "Я приезжаю на вокзал в полдень."},
    present: {"je": "arrive", "tu": "arrives", "il/elle": "arrive", "nous": "arrivons", "vous": "arrivez", "ils/elles": "arrivent"},
    preterite: {"je": "suis arrivé(e)", "tu": "es arrivé(e)", "il/elle": "est arrivé(e)", "nous": "sommes arrivé(e)s", "vous": "êtes arrivé(e)(s)", "ils/elles": "sont arrivé(e)s"},
    future: {"je": "arriverai", "tu": "arriveras", "il/elle": "arrivera", "nous": "arriverons", "vous": "arriverez", "ils/elles": "arriveront"}
  },
  {
    id: 41, infinitive: "monter", translation: "подниматься / садиться (в транспорт)",
    transcription: "монте́", note: "Monter dans le bus — сесть в автобус.",
    example: {"greek": "Je monte dans le bus 38.", "ru": "Я сажусь в автобус 38."},
    present: {"je": "monte", "tu": "montes", "il/elle": "monte", "nous": "montons", "vous": "montez", "ils/elles": "montent"},
    preterite: {"je": "suis monté(e)", "tu": "es monté(e)", "il/elle": "est monté(e)", "nous": "sommes monté(e)s", "vous": "êtes monté(e)(s)", "ils/elles": "sont monté(e)s"},
    future: {"je": "monterai", "tu": "monteras", "il/elle": "montera", "nous": "monterons", "vous": "monterez", "ils/elles": "monteront"}
  },
  {
    id: 42, infinitive: "descendre", translation: "спускаться / выходить (из транспорта)",
    transcription: "десандр", note: "«Vous descendez ?» — вопрос в переполненном метро перед выходом.",
    example: {"greek": "Je descends à la prochaine station.", "ru": "Я выхожу на следующей станции."},
    present: {"je": "descends", "tu": "descends", "il/elle": "descend", "nous": "descendons", "vous": "descendez", "ils/elles": "descendent"},
    preterite: {"je": "suis descendu(e)", "tu": "es descendu(e)", "il/elle": "est descendu(e)", "nous": "sommes descendu(e)s", "vous": "êtes descendu(e)(s)", "ils/elles": "sont descendu(e)s"},
    future: {"je": "descendrai", "tu": "descendras", "il/elle": "descendra", "nous": "descendrons", "vous": "descendrez", "ils/elles": "descendront"}
  },
  {
    id: 43, infinitive: "appeler", translation: "звать / звонить",
    transcription: "апле́", note: "Удвоение l там, где ударение: j'appelle, но nous appelons.",
    example: {"greek": "J'appelle le service client demain matin.", "ru": "Завтра утром я позвоню в службу поддержки."},
    present: {"je": "appelle", "tu": "appelles", "il/elle": "appelle", "nous": "appelons", "vous": "appelez", "ils/elles": "appellent"},
    preterite: {"je": "ai appelé", "tu": "as appelé", "il/elle": "a appelé", "nous": "avons appelé", "vous": "avez appelé", "ils/elles": "ont appelé"},
    future: {"je": "appellerai", "tu": "appelleras", "il/elle": "appellera", "nous": "appellerons", "vous": "appellerez", "ils/elles": "appelleront"}
  },
  {
    id: 44, infinitive: "répondre", translation: "отвечать",
    transcription: "репондр", note: "Répondre à — предлог обязателен: répondre à la question.",
    example: {"greek": "Personne ne répond au téléphone.", "ru": "Никто не отвечает на телефон."},
    present: {"je": "réponds", "tu": "réponds", "il/elle": "répond", "nous": "répondons", "vous": "répondez", "ils/elles": "répondent"},
    preterite: {"je": "ai répondu", "tu": "as répondu", "il/elle": "a répondu", "nous": "avons répondu", "vous": "avez répondu", "ils/elles": "ont répondu"},
    future: {"je": "répondrai", "tu": "répondras", "il/elle": "répondra", "nous": "répondrons", "vous": "répondrez", "ils/elles": "répondront"}
  },
  {
    id: 45, infinitive: "ouvrir", translation: "открывать",
    transcription: "уври́р", note: "Спрягается в présent как глагол на -er: j'ouvre. Причастие ouvert.",
    example: {"greek": "La banque ouvre à neuf heures.", "ru": "Банк открывается в девять."},
    present: {"je": "ouvre", "tu": "ouvres", "il/elle": "ouvre", "nous": "ouvrons", "vous": "ouvrez", "ils/elles": "ouvrent"},
    preterite: {"je": "ai ouvert", "tu": "as ouvert", "il/elle": "a ouvert", "nous": "avons ouvert", "vous": "avez ouvert", "ils/elles": "ont ouvert"},
    future: {"je": "ouvrirai", "tu": "ouvriras", "il/elle": "ouvrira", "nous": "ouvrirons", "vous": "ouvrirez", "ils/elles": "ouvriront"}
  },
  {
    id: 46, infinitive: "fermer", translation: "закрывать",
    transcription: "фэрме́", note: "C'est fermé — «закрыто», часто про обеденный перерыв.",
    example: {"greek": "La pharmacie ferme entre midi et deux.", "ru": "Аптека закрыта с двенадцати до двух."},
    present: {"je": "ferme", "tu": "fermes", "il/elle": "ferme", "nous": "fermons", "vous": "fermez", "ils/elles": "ferment"},
    preterite: {"je": "ai fermé", "tu": "as fermé", "il/elle": "a fermé", "nous": "avons fermé", "vous": "avez fermé", "ils/elles": "ont fermé"},
    future: {"je": "fermerai", "tu": "fermeras", "il/elle": "fermera", "nous": "fermerons", "vous": "fermerez", "ils/elles": "fermeront"}
  },
  {
    id: 47, infinitive: "commencer", translation: "начинать",
    transcription: "комансе́", note: "Nous commençons — седиль сохраняет звук «с».",
    example: {"greek": "Les cours commencent en septembre.", "ru": "Занятия начинаются в сентябре."},
    present: {"je": "commence", "tu": "commences", "il/elle": "commence", "nous": "commençons", "vous": "commencez", "ils/elles": "commencent"},
    preterite: {"je": "ai commencé", "tu": "as commencé", "il/elle": "a commencé", "nous": "avons commencé", "vous": "avez commencé", "ils/elles": "ont commencé"},
    future: {"je": "commencerai", "tu": "commenceras", "il/elle": "commencera", "nous": "commencerons", "vous": "commencerez", "ils/elles": "commenceront"}
  },
  {
    id: 48, infinitive: "finir", translation: "заканчивать",
    transcription: "фини́р", note: "Образец правильных глаголов на -ir: nous finissons.",
    example: {"greek": "Je finis le travail à dix-huit heures.", "ru": "Я заканчиваю работу в восемнадцать часов."},
    present: {"je": "finis", "tu": "finis", "il/elle": "finit", "nous": "finissons", "vous": "finissez", "ils/elles": "finissent"},
    preterite: {"je": "ai fini", "tu": "as fini", "il/elle": "a fini", "nous": "avons fini", "vous": "avez fini", "ils/elles": "ont fini"},
    future: {"je": "finirai", "tu": "finiras", "il/elle": "finira", "nous": "finirons", "vous": "finirez", "ils/elles": "finiront"}
  },
  {
    id: 49, infinitive: "choisir", translation: "выбирать",
    transcription: "шуази́р", note: "Спрягается как finir.",
    example: {"greek": "J'ai choisi la formule à douze euros.", "ru": "Я выбрал комплексное меню за двенадцать евро."},
    present: {"je": "choisis", "tu": "choisis", "il/elle": "choisit", "nous": "choisissons", "vous": "choisissez", "ils/elles": "choisissent"},
    preterite: {"je": "ai choisi", "tu": "as choisi", "il/elle": "a choisi", "nous": "avons choisi", "vous": "avez choisi", "ils/elles": "ont choisi"},
    future: {"je": "choisirai", "tu": "choisiras", "il/elle": "choisira", "nous": "choisirons", "vous": "choisirez", "ils/elles": "choisiront"}
  },
  {
    id: 50, infinitive: "remplir", translation: "заполнять",
    transcription: "рампли́р", note: "Ключевой глагол бюрократии: remplir un formulaire.",
    example: {"greek": "Je dois remplir ce formulaire en ligne.", "ru": "Мне нужно заполнить эту форму онлайн."},
    present: {"je": "remplis", "tu": "remplis", "il/elle": "remplit", "nous": "remplissons", "vous": "remplissez", "ils/elles": "remplissent"},
    preterite: {"je": "ai rempli", "tu": "as rempli", "il/elle": "a rempli", "nous": "avons rempli", "vous": "avez rempli", "ils/elles": "ont rempli"},
    future: {"je": "remplirai", "tu": "rempliras", "il/elle": "remplira", "nous": "remplirons", "vous": "remplirez", "ils/elles": "rempliront"}
  },
  {
    id: 51, infinitive: "signer", translation: "подписывать",
    transcription: "синье́", note: "Signer le bail — подписать договор аренды.",
    example: {"greek": "Je signe le contrat lundi prochain.", "ru": "Я подписываю договор в следующий понедельник."},
    present: {"je": "signe", "tu": "signes", "il/elle": "signe", "nous": "signons", "vous": "signez", "ils/elles": "signent"},
    preterite: {"je": "ai signé", "tu": "as signé", "il/elle": "a signé", "nous": "avons signé", "vous": "avez signé", "ils/elles": "ont signé"},
    future: {"je": "signerai", "tu": "signeras", "il/elle": "signera", "nous": "signerons", "vous": "signerez", "ils/elles": "signeront"}
  },
  {
    id: 52, infinitive: "louer", translation: "снимать / сдавать (жильё)",
    transcription: "луэ́", note: "Работает в обе стороны: и арендатор, и хозяин используют louer.",
    example: {"greek": "Je loue un studio à Nice.", "ru": "Я снимаю студию в Ницце."},
    present: {"je": "loue", "tu": "loues", "il/elle": "loue", "nous": "louons", "vous": "louez", "ils/elles": "louent"},
    preterite: {"je": "ai loué", "tu": "as loué", "il/elle": "a loué", "nous": "avons loué", "vous": "avez loué", "ils/elles": "ont loué"},
    future: {"je": "louerai", "tu": "loueras", "il/elle": "louera", "nous": "louerons", "vous": "louerez", "ils/elles": "loueront"}
  },
  {
    id: 53, infinitive: "vendre", translation: "продавать",
    transcription: "вандр", note: "Образец правильных глаголов на -re.",
    example: {"greek": "Ils vendent des légumes au marché.", "ru": "Они продают овощи на рынке."},
    present: {"je": "vends", "tu": "vends", "il/elle": "vend", "nous": "vendons", "vous": "vendez", "ils/elles": "vendent"},
    preterite: {"je": "ai vendu", "tu": "as vendu", "il/elle": "a vendu", "nous": "avons vendu", "vous": "avez vendu", "ils/elles": "ont vendu"},
    future: {"je": "vendrai", "tu": "vendras", "il/elle": "vendra", "nous": "vendrons", "vous": "vendrez", "ils/elles": "vendront"}
  },
  {
    id: 54, infinitive: "envoyer", translation: "отправлять",
    transcription: "анвуайе́", note: "Основа будущего неправильная: j'enverrai.",
    example: {"greek": "J'envoie les documents par courrier recommandé.", "ru": "Я отправляю документы заказным письмом."},
    present: {"je": "envoie", "tu": "envoies", "il/elle": "envoie", "nous": "envoyons", "vous": "envoyez", "ils/elles": "envoient"},
    preterite: {"je": "ai envoyé", "tu": "as envoyé", "il/elle": "a envoyé", "nous": "avons envoyé", "vous": "avez envoyé", "ils/elles": "ont envoyé"},
    future: {"je": "enverrai", "tu": "enverras", "il/elle": "enverra", "nous": "enverrons", "vous": "enverrez", "ils/elles": "enverront"}
  },
  {
    id: 55, infinitive: "recevoir", translation: "получать",
    transcription: "ресевуа́р", note: "Седиль перед o: je reçois. Причастие reçu.",
    example: {"greek": "J'ai reçu un courrier de la préfecture.", "ru": "Я получил письмо из префектуры."},
    present: {"je": "reçois", "tu": "reçois", "il/elle": "reçoit", "nous": "recevons", "vous": "recevez", "ils/elles": "reçoivent"},
    preterite: {"je": "ai reçu", "tu": "as reçu", "il/elle": "a reçu", "nous": "avons reçu", "vous": "avez reçu", "ils/elles": "ont reçu"},
    future: {"je": "recevrai", "tu": "recevras", "il/elle": "recevra", "nous": "recevrons", "vous": "recevrez", "ils/elles": "recevront"}
  },
  {
    id: 56, infinitive: "oublier", translation: "забывать",
    transcription: "убли́е", note: "Oublier de + инфинитив: j'ai oublié de payer.",
    example: {"greek": "J'ai oublié ma carte Vitale à la maison.", "ru": "Я забыл дома карту медстрахования."},
    present: {"je": "oublie", "tu": "oublies", "il/elle": "oublie", "nous": "oublions", "vous": "oubliez", "ils/elles": "oublient"},
    preterite: {"je": "ai oublié", "tu": "as oublié", "il/elle": "a oublié", "nous": "avons oublié", "vous": "avez oublié", "ils/elles": "ont oublié"},
    future: {"je": "oublierai", "tu": "oublieras", "il/elle": "oubliera", "nous": "oublierons", "vous": "oublierez", "ils/elles": "oublieront"}
  },
  {
    id: 57, infinitive: "essayer", translation: "пробовать / примерять",
    transcription: "эсэйе́", note: "Essayer de + инфинитив — пытаться сделать.",
    example: {"greek": "Je peux essayer cette veste ?", "ru": "Могу я примерить эту куртку?"},
    present: {"je": "essaie", "tu": "essaies", "il/elle": "essaie", "nous": "essayons", "vous": "essayez", "ils/elles": "essaient"},
    preterite: {"je": "ai essayé", "tu": "as essayé", "il/elle": "a essayé", "nous": "avons essayé", "vous": "avez essayé", "ils/elles": "ont essayé"},
    future: {"je": "essaierai", "tu": "essaieras", "il/elle": "essaiera", "nous": "essaierons", "vous": "essaierez", "ils/elles": "essaieront"}
  },
  {
    id: 58, infinitive: "dormir", translation: "спать",
    transcription: "дорми́р", note: "Nous dormons — без -iss-, в отличие от finir.",
    example: {"greek": "Je dors mal à cause du bruit.", "ru": "Я плохо сплю из-за шума."},
    present: {"je": "dors", "tu": "dors", "il/elle": "dort", "nous": "dormons", "vous": "dormez", "ils/elles": "dorment"},
    preterite: {"je": "ai dormi", "tu": "as dormi", "il/elle": "a dormi", "nous": "avons dormi", "vous": "avez dormi", "ils/elles": "ont dormi"},
    future: {"je": "dormirai", "tu": "dormiras", "il/elle": "dormira", "nous": "dormirons", "vous": "dormirez", "ils/elles": "dormiront"}
  },
  {
    id: 59, infinitive: "vivre", translation: "жить",
    transcription: "вивр", note: "Habiter — про адрес, vivre — про жизнь вообще. Причастие vécu.",
    example: {"greek": "Je vis en France depuis 2022.", "ru": "Я живу во Франции с 2022 года."},
    present: {"je": "vis", "tu": "vis", "il/elle": "vit", "nous": "vivons", "vous": "vivez", "ils/elles": "vivent"},
    preterite: {"je": "ai vécu", "tu": "as vécu", "il/elle": "a vécu", "nous": "avons vécu", "vous": "avez vécu", "ils/elles": "ont vécu"},
    future: {"je": "vivrai", "tu": "vivras", "il/elle": "vivra", "nous": "vivrons", "vous": "vivrez", "ils/elles": "vivront"}
  },
  {
    id: 60, infinitive: "rendre", translation: "возвращать / сдавать",
    transcription: "рандр", note: "Rendre visite à — навестить кого-то.",
    example: {"greek": "Je dois rendre les clés au propriétaire.", "ru": "Я должен вернуть ключи хозяину."},
    present: {"je": "rends", "tu": "rends", "il/elle": "rend", "nous": "rendons", "vous": "rendez", "ils/elles": "rendent"},
    preterite: {"je": "ai rendu", "tu": "as rendu", "il/elle": "a rendu", "nous": "avons rendu", "vous": "avez rendu", "ils/elles": "ont rendu"},
    future: {"je": "rendrai", "tu": "rendras", "il/elle": "rendra", "nous": "rendrons", "vous": "rendrez", "ils/elles": "rendront"}
  },
  {
    id: 61, infinitive: "changer", translation: "менять",
    transcription: "шанже́", note: "Changer de — сменить что-то своё: changer d'adresse.",
    example: {"greek": "J'ai changé d'adresse le mois dernier.", "ru": "Я сменил адрес в прошлом месяце."},
    present: {"je": "change", "tu": "changes", "il/elle": "change", "nous": "changeons", "vous": "changez", "ils/elles": "changent"},
    preterite: {"je": "ai changé", "tu": "as changé", "il/elle": "a changé", "nous": "avons changé", "vous": "avez changé", "ils/elles": "ont changé"},
    future: {"je": "changerai", "tu": "changeras", "il/elle": "changera", "nous": "changerons", "vous": "changerez", "ils/elles": "changeront"}
  },
  {
    id: 62, infinitive: "expliquer", translation: "объяснять",
    transcription: "эксплике́", note: "Expliquer à quelqu'un — объяснять кому-то.",
    example: {"greek": "Pouvez-vous m'expliquer ce document ?", "ru": "Можете объяснить мне этот документ?"},
    present: {"je": "explique", "tu": "expliques", "il/elle": "explique", "nous": "expliquons", "vous": "expliquez", "ils/elles": "expliquent"},
    preterite: {"je": "ai expliqué", "tu": "as expliqué", "il/elle": "a expliqué", "nous": "avons expliqué", "vous": "avez expliqué", "ils/elles": "ont expliqué"},
    future: {"je": "expliquerai", "tu": "expliqueras", "il/elle": "expliquera", "nous": "expliquerons", "vous": "expliquerez", "ils/elles": "expliqueront"}
  }
];

const SCENARIOS = [
{
  id: 'bank',
  title: '🏦 В банке',
  icon: '🏦',
  description: 'Открываем счёт во французском банке',
  steps: [
    {
      situation: 'Вы пришли в отделение банка, чтобы открыть счёт. К вам подходит сотрудник.',
      speaker: 'Conseiller — Консультант банка',
      greek: 'Bonjour, vous avez rendez-vous ?',
      transcription: 'Бонжу́р, ву-з-аве́ рандэву́ ?',
      translation: 'Здравствуйте, вы записаны?',
      question: 'Скажите, что записаны на 10 часов и хотите открыть счёт.',
      options: [
        { text: "Bonjour, oui, à dix heures. Je voudrais ouvrir un compte.", transcription: 'Бонжу́р, уи́, а ди-з-ёр. Жё вудрэ́ уври́р эн конт.', translation: 'Здравствуйте, да, на десять. Я хотел бы открыть счёт.', correct: true },
        { text: "Bonjour, je veux de l'argent.", transcription: "Бонжу́р, жё вё дё ларжа́н.", translation: 'Здравствуйте, я хочу денег.', correct: false },
        { text: 'Bonjour, où est le distributeur ?', transcription: 'Бонжу́р, у э лё дистрибютё́р ?', translation: 'Здравствуйте, где банкомат?', correct: false },
        { text: 'Bonjour, je cherche un travail.', transcription: 'Бонжу́р, жё шерш эн траваи́.', translation: 'Здравствуйте, я ищу работу.', correct: false }
      ],
      correctFeedback: '«Je voudrais» вместо «je veux» — именно так звучит вежливая просьба во французском учреждении.',
      wrongFeedback: 'Нужно «Je voudrais ouvrir un compte» — «я хотел бы открыть счёт».'
    },
    {
      situation: 'Консультант просит документы.',
      speaker: 'Conseiller — Консультант банка',
      greek: "Il me faut une pièce d'identité et un justificatif de domicile.",
      transcription: "Иль мё фо юн пьес дидантитэ́ э-эн жюстификати́ф дё домиси́ль.",
      translation: 'Мне нужен документ, удостоверяющий личность, и подтверждение адреса.',
      question: 'Скажите, что у вас есть паспорт и счёт за электричество.',
      options: [
        { text: "J'ai mon passeport et une facture d'électricité.", transcription: 'Жэ мон паспо́р э юн фактю́р делектрисите́.', translation: 'У меня есть паспорт и счёт за электричество.', correct: true },
        { text: "J'ai seulement mon téléphone.", transcription: 'Жэ сёльма́н мон телефо́н.', translation: 'У меня только телефон.', correct: false },
        { text: 'Je ne sais pas.', transcription: 'Жё нё сэ па.', translation: 'Я не знаю.', correct: false },
        { text: "J'ai oublié tout à la maison.", transcription: 'Жэ ублие́ ту-т-а ля мэзо́н.', translation: 'Я всё забыл дома.', correct: false }
      ],
      correctFeedback: 'Facture d\'électricité — самый простой justificatif de domicile. Работают также счёт за интернет и налоговое уведомление.',
      wrongFeedback: 'Скажите «J\'ai mon passeport et une facture d\'électricité» — этих двух документов достаточно.'
    },
    {
      situation: 'Консультант рассказывает про тарифы.',
      speaker: 'Conseiller — Консультант банка',
      greek: 'La carte bancaire coûte quarante-cinq euros par an.',
      transcription: 'Ля карт банкэ́р кут карант-сэ́нк ёро́ пар ан.',
      translation: 'Банковская карта стоит сорок пять евро в год.',
      question: 'Спросите, есть ли карта дешевле.',
      options: [
        { text: 'Est-ce qu\'il y a une carte moins chère ?', transcription: 'Эс-киль-я юн карт муэ́н шэр ?', translation: 'Есть ли карта подешевле?', correct: true },
        { text: 'C\'est très bien, merci.', transcription: 'Сэ трэ бье́н, мерси́.', translation: 'Это очень хорошо, спасибо.', correct: false },
        { text: 'Je paie en espèces.', transcription: 'Жё пэ ан эспэ́с.', translation: 'Я плачу наличными.', correct: false },
        { text: 'Quarante-cinq euros par mois ?', transcription: 'Карант-сэ́нк ёро́ пар муа́ ?', translation: 'Сорок пять евро в месяц?', correct: false }
      ],
      correctFeedback: '«Est-ce qu\'il y a…» — универсальное начало вопроса «есть ли…». Работает везде: в банке, в магазине, в префектуре.',
      wrongFeedback: 'Спросите «Est-ce qu\'il y a une carte moins chère ?» — «moins cher» значит «дешевле».'
    },
    {
      situation: 'Счёт открыт, консультант объясняет, что будет дальше.',
      speaker: 'Conseiller — Консультант банка',
      greek: 'Vous recevrez votre RIB par courrier sous une semaine.',
      transcription: 'Ву рёсеврэ́ вотр риб пар курье́ су юн сёмэ́н.',
      translation: 'Вы получите ваш RIB по почте в течение недели.',
      question: 'Спросите, можно ли получить RIB прямо сейчас.',
      options: [
        { text: 'Est-ce que je peux avoir un RIB tout de suite ?', transcription: 'Эс-кё жё пё авуа́р эн риб ту дё сюи́т ?', translation: 'Могу я получить RIB прямо сейчас?', correct: true },
        { text: 'Le RIB, c\'est quoi ?', transcription: 'Лё риб, сэ куа́ ?', translation: 'RIB — это что?', correct: false },
        { text: 'Je n\'ai pas de courrier.', transcription: 'Жё нэ па дё курье́.', translation: 'У меня нет почты.', correct: false },
        { text: 'Une semaine, c\'est trop long.', transcription: 'Юн сёмэ́н, сэ тро лон.', translation: 'Неделя — это слишком долго.', correct: false }
      ],
      correctFeedback: 'RIB нужен сразу — для работодателя, CAF и аренды. Его почти всегда распечатывают на месте, если попросить.',
      wrongFeedback: 'Попросите: «Est-ce que je peux avoir un RIB tout de suite ?»'
    },
    {
      situation: 'Вы уходите. Консультант прощается.',
      speaker: 'Conseiller — Консультант банка',
      greek: 'Bonne journée, et à bientôt !',
      transcription: 'Бон журнэ́, э-а бьенто́ !',
      translation: 'Хорошего дня и до скорого!',
      question: 'Поблагодарите и попрощайтесь вежливо.',
      options: [
        { text: 'Merci beaucoup, bonne journée à vous aussi !', transcription: 'Мерси́ боку́, бон журнэ́ а ву-з-осси́ !', translation: 'Большое спасибо, и вам хорошего дня!', correct: true },
        { text: 'Salut !', transcription: 'Салю́ !', translation: 'Привет / пока!', correct: false },
        { text: 'D\'accord.', transcription: 'Дако́р.', translation: 'Ладно.', correct: false },
        { text: 'Bonne nuit.', transcription: 'Бон нюи́.', translation: 'Спокойной ночи.', correct: false }
      ],
      correctFeedback: 'Во Франции прощание — часть вежливости, а не формальность. Без «bonne journée» вы выглядите резким.',
      wrongFeedback: '«Salut» — только для друзей. В банке говорят «Merci, bonne journée».'
    }
  ]
},
{
  id: 'prefecture',
  title: '📋 В префектуре',
  icon: '📋',
  description: 'Подаём документы на titre de séjour',
  steps: [
    {
      situation: 'Вы пришли в префектуру по записи. Сотрудник вызывает вас к окну.',
      speaker: 'Agent — Сотрудник префектуры',
      greek: 'Bonjour, vous venez pour quel motif ?',
      transcription: 'Бонжу́р, ву вёнэ́ пур кель моти́ф ?',
      translation: 'Здравствуйте, вы по какому вопросу?',
      question: 'Скажите, что пришли подать документы на вид на жительство.',
      options: [
        { text: 'Bonjour, je viens déposer un dossier de titre de séjour.', transcription: 'Бонжу́р, жё вьен депозе́ эн досье́ дё титр дё сежу́р.', translation: 'Здравствуйте, я пришёл подать досье на вид на жительство.', correct: true },
        { text: 'Bonjour, je cherche un travail.', transcription: 'Бонжу́р, жё шерш эн траваи́.', translation: 'Здравствуйте, я ищу работу.', correct: false },
        { text: 'Bonjour, je suis touriste.', transcription: 'Бонжу́р, жё сюи́ тури́ст.', translation: 'Здравствуйте, я турист.', correct: false },
        { text: 'Bonjour, je veux un passeport français.', transcription: 'Бонжу́р, жё вё эн паспо́р франсэ́.', translation: 'Здравствуйте, я хочу французский паспорт.', correct: false }
      ],
      correctFeedback: '«Déposer un dossier» — стандартная формула: подать пакет документов. Именно её ждёт сотрудник.',
      wrongFeedback: 'Скажите «Je viens déposer un dossier de titre de séjour».'
    },
    {
      situation: 'Сотрудник перечисляет документы.',
      speaker: 'Agent — Сотрудник префектуры',
      greek: 'Il me faut votre passeport, un justificatif de domicile et trois photos.',
      transcription: 'Иль мё фо вотр паспо́р, эн жюстификати́ф дё домиси́ль э труа́ фото́.',
      translation: 'Мне нужен ваш паспорт, подтверждение адреса и три фотографии.',
      question: 'Скажите, что всё принесли, и передайте документы.',
      options: [
        { text: 'Voilà, j\'ai tout apporté.', transcription: 'Вуаля́, жэ ту-т-апорте́.', translation: 'Вот, я всё принёс.', correct: true },
        { text: 'Je vais chercher ça demain.', transcription: 'Жё вэ шерше́ са дёмэ́н.', translation: 'Я схожу за этим завтра.', correct: false },
        { text: 'Photos, c\'est obligatoire ?', transcription: 'Фото́, сэ облигатуа́р ?', translation: 'Фотографии обязательны?', correct: false },
        { text: 'Je n\'ai pas de passeport.', transcription: 'Жё нэ па дё паспо́р.', translation: 'У меня нет паспорта.', correct: false }
      ],
      correctFeedback: '«Voilà» подаётся вместе с документами — это жест и слово одновременно, самое французское из всех.',
      wrongFeedback: 'Отвечайте «Voilà, j\'ai tout apporté» и передавайте папку.'
    },
    {
      situation: 'Сотрудник проверяет папку и хмурится.',
      speaker: 'Agent — Сотрудник префектуры',
      greek: 'Il manque l\'attestation d\'hébergement.',
      transcription: 'Иль манк лятестасьо́н дэбержма́н.',
      translation: 'Не хватает свидетельства о предоставлении жилья.',
      question: 'Спросите, можно ли прислать этот документ по электронной почте.',
      options: [
        { text: 'Est-ce que je peux l\'envoyer par mail ?', transcription: 'Эс-кё жё пё лянвуайе́ пар мэйль ?', translation: 'Могу я отправить его по почте (электронной)?', correct: true },
        { text: 'Ce n\'est pas grave.', transcription: 'Сё нэ па грав.', translation: 'Ничего страшного.', correct: false },
        { text: 'Je ne comprends rien.', transcription: 'Жё нё компра́н рье́н.', translation: 'Я ничего не понимаю.', correct: false },
        { text: 'Vous êtes sûr ?', transcription: 'Ву-з-эт сюр ?', translation: 'Вы уверены?', correct: false }
      ],
      correctFeedback: 'Вопрос про mail экономит второй визит: часто префектура принимает недостающий документ письмом.',
      wrongFeedback: 'Спросите «Est-ce que je peux l\'envoyer par mail ?» — так вы избежите повторной записи.'
    },
    {
      situation: 'Сотрудник выдаёт вам временный документ.',
      speaker: 'Agent — Сотрудник префектуры',
      greek: 'Voici votre récépissé, valable six mois.',
      transcription: 'Вуаси́ вотр ресеписе́, валя́бль си муа́.',
      translation: 'Вот ваша расписка, действительна шесть месяцев.',
      question: 'Спросите, можно ли с ней работать.',
      options: [
        { text: 'Est-ce que j\'ai le droit de travailler avec ça ?', transcription: 'Эс-кё жэ лё друа́ дё травайе́ аве́к са ?', translation: 'Имею ли я право работать с этим?', correct: true },
        { text: 'C\'est un passeport ?', transcription: 'Сэ-т-эн паспо́р ?', translation: 'Это паспорт?', correct: false },
        { text: 'Six mois, c\'est court.', transcription: 'Си муа́, сэ кур.', translation: 'Шесть месяцев — это мало.', correct: false },
        { text: 'Merci, au revoir.', transcription: 'Мерси́, о рёвуа́р.', translation: 'Спасибо, до свидания.', correct: false }
      ],
      correctFeedback: '«Avoir le droit de» — иметь право. Формулировка, которую понимают в любом французском учреждении.',
      wrongFeedback: 'Спросите «Est-ce que j\'ai le droit de travailler avec ça ?» — право на работу зависит от типа récépissé.'
    },
    {
      situation: 'Вы уточняете, что будет дальше.',
      speaker: 'Agent — Сотрудник префектуры',
      greek: 'Vous serez convoqué par courrier ou par mail.',
      transcription: 'Ву сёрэ́ конвокэ́ пар курье́ у пар мэйль.',
      translation: 'Вас вызовут письмом или по электронной почте.',
      question: 'Спросите, сколько примерно нужно ждать.',
      options: [
        { text: 'Il faut compter combien de temps environ ?', transcription: 'Иль фо контэ́ комбье́н дё тан анвиро́н ?', translation: 'Сколько примерно нужно рассчитывать по времени?', correct: true },
        { text: 'Je vais attendre ici.', transcription: 'Жё вэ атандр иси́.', translation: 'Я подожду здесь.', correct: false },
        { text: 'Vous avez mon numéro ?', transcription: 'Ву-з-аве́ мон нюмеро́ ?', translation: 'У вас есть мой номер?', correct: false },
        { text: 'Ce n\'est pas normal.', transcription: 'Сё нэ па норма́ль.', translation: 'Это ненормально.', correct: false }
      ],
      correctFeedback: '«Il faut compter…» — «нужно рассчитывать на…». Так спрашивают про сроки везде: в мастерской, в банке, в префектуре.',
      wrongFeedback: 'Спросите «Il faut compter combien de temps environ ?»'
    }
  ]
},
{
  id: 'medecin',
  title: '🏥 У врача',
  icon: '🏥',
  description: 'Приём у médecin traitant',
  steps: [
    {
      situation: 'Вы в кабинете врача. Он приглашает вас сесть.',
      speaker: 'Médecin — Врач',
      greek: 'Bonjour, installez-vous. Qu\'est-ce qui vous amène ?',
      transcription: 'Бонжу́р, энсталэ́-ву. Кэс-ки́ ву-з-амэ́н ?',
      translation: 'Здравствуйте, располагайтесь. Что вас привело?',
      question: 'Скажите, что у вас болит горло уже три дня.',
      options: [
        { text: 'J\'ai mal à la gorge depuis trois jours.', transcription: 'Жэ маль а ля горж дёпюи́ труа́ жур.', translation: 'У меня болит горло уже три дня.', correct: true },
        { text: 'Je suis fatigué de la France.', transcription: 'Жё сюи́ фатигэ́ дё ля Франс.', translation: 'Я устал от Франции.', correct: false },
        { text: 'J\'ai besoin d\'un passeport.', transcription: 'Жэ бёзуэ́н дэн паспо́р.', translation: 'Мне нужен паспорт.', correct: false },
        { text: 'Ma gorge est bonne.', transcription: 'Ма горж э бон.', translation: 'Моё горло хорошее.', correct: false }
      ],
      correctFeedback: 'Формула «avoir mal à + часть тела» описывает любую боль: j\'ai mal à la tête, au dos, aux dents.',
      wrongFeedback: 'Скажите «J\'ai mal à la gorge depuis trois jours» — depuis значит «в течение, уже».'
    },
    {
      situation: 'Врач уточняет симптомы.',
      speaker: 'Médecin — Врач',
      greek: 'Vous avez de la fièvre ?',
      transcription: 'Ву-з-аве́ дё ля фьевр ?',
      translation: 'У вас есть температура?',
      question: 'Скажите, что вчера было 38.5.',
      options: [
        { text: 'Oui, hier j\'avais trente-huit cinq.', transcription: 'Уи́, иэ́р жавэ́ трант-юи́т сэнк.', translation: 'Да, вчера у меня было 38,5.', correct: true },
        { text: 'Non, j\'ai froid dehors.', transcription: 'Но́н, жэ фруа́ дёо́р.', translation: 'Нет, мне холодно на улице.', correct: false },
        { text: 'Je ne prends pas de médicaments.', transcription: 'Жё нё пран па дё медикама́н.', translation: 'Я не принимаю лекарств.', correct: false },
        { text: 'La fièvre, c\'est quoi ?', transcription: 'Ля фьевр, сэ куа́ ?', translation: 'Температура — это что?', correct: false }
      ],
      correctFeedback: 'Во Франции температуру называют полностью: «trente-huit cinq» = 38,5 °C.',
      wrongFeedback: 'Ответьте «Oui, hier j\'avais trente-huit cinq».'
    },
    {
      situation: 'Врач осмотрел вас и выписывает лечение.',
      speaker: 'Médecin — Врач',
      greek: 'Je vais vous prescrire un antibiotique pour une semaine.',
      transcription: 'Жё вэ ву прескри́р эн-н-антибиоти́к пур юн сёмэ́н.',
      translation: 'Я выпишу вам антибиотик на неделю.',
      question: 'Спросите, есть ли у лекарства побочные эффекты.',
      options: [
        { text: 'Est-ce qu\'il y a des effets secondaires ?', transcription: 'Эс-киль-я дэ-з-эфэ́ сёгондэ́р ?', translation: 'Есть ли побочные эффекты?', correct: true },
        { text: 'Je préfère ne rien prendre.', transcription: 'Жё префэ́р нё рье́н прандр.', translation: 'Я предпочитаю ничего не принимать.', correct: false },
        { text: 'C\'est cher ?', transcription: 'Сэ шэр ?', translation: 'Это дорого?', correct: false },
        { text: 'Une semaine, c\'est long.', transcription: 'Юн сёмэ́н, сэ лон.', translation: 'Неделя — это долго.', correct: false }
      ],
      correctFeedback: '«Effets secondaires» — побочные эффекты. Полезно и в аптеке, и при чтении инструкции.',
      wrongFeedback: 'Спросите «Est-ce qu\'il y a des effets secondaires ?»'
    },
    {
      situation: 'Врач протягивает рецепт.',
      speaker: 'Médecin — Врач',
      greek: 'Voici votre ordonnance. Vous avez votre carte Vitale ?',
      transcription: 'Вуаси́ вотр ордона́нс. Ву-з-аве́ вотр карт Витáль ?',
      translation: 'Вот ваш рецепт. У вас есть карта медстрахования?',
      question: 'Скажите, что карта ещё в процессе оформления.',
      options: [
        { text: 'Pas encore, ma demande est en cours.', transcription: 'Па-з-анко́р, ма дёма́нд э-т-ан кур.', translation: 'Ещё нет, моя заявка в процессе.', correct: true },
        { text: 'Je n\'en ai pas besoin.', transcription: 'Жё нан-э па бёзуэ́н.', translation: 'Она мне не нужна.', correct: false },
        { text: 'Elle est à la maison.', transcription: 'Эль э-т-а ля мэзо́н.', translation: 'Она дома.', correct: false },
        { text: 'C\'est une carte bancaire ?', transcription: 'Сэ-т-юн карт банкэ́р ?', translation: 'Это банковская карта?', correct: false }
      ],
      correctFeedback: '«En cours» — «в процессе». Универсальный ответ про любую заявку: досье, карту, запрос.',
      wrongFeedback: 'Ответьте «Pas encore, ma demande est en cours» — врач тогда выдаст feuille de soins для возмещения.'
    },
    {
      situation: 'Пора платить за приём.',
      speaker: 'Médecin — Врач',
      greek: 'La consultation est à vingt-six euros cinquante.',
      transcription: 'Ля консультасьо́н э-т-а вэнт-си́с ёро́ сэнка́нт.',
      translation: 'Приём стоит двадцать шесть евро пятьдесят.',
      question: 'Спросите, можно ли заплатить картой.',
      options: [
        { text: 'Je peux payer par carte ?', transcription: 'Жё пё пэйе́ пар карт ?', translation: 'Могу я заплатить картой?', correct: true },
        { text: 'C\'est gratuit, non ?', transcription: 'Сэ гратюи́, но́н ?', translation: 'Это же бесплатно, нет?', correct: false },
        { text: 'Je paierai la prochaine fois.', transcription: 'Жё пэйрэ́ ля прошэ́н фуа́.', translation: 'Заплачу в следующий раз.', correct: false },
        { text: 'Vingt-six, c\'est trop.', transcription: 'Вэнт-си́с, сэ тро.', translation: 'Двадцать шесть — это много.', correct: false }
      ],
      correctFeedback: 'Короткая форма вопроса «Je peux… ?» работает везде. Полная — «Est-ce que je peux… ?» — чуть вежливее.',
      wrongFeedback: 'Спросите «Je peux payer par carte ?»'
    }
  ]
},
{
  id: 'logement',
  title: '🏠 Аренда квартиры',
  icon: '🏠',
  description: 'Просмотр квартиры и договор',
  steps: [
    {
      situation: 'Вы пришли на просмотр квартиры. Агент открывает дверь.',
      speaker: 'Agent immobilier — Агент по недвижимости',
      greek: 'Bonjour, vous venez pour la visite de dix-sept heures ?',
      transcription: 'Бонжу́р, ву вёнэ́ пур ля визи́т дё дис-сэ́т ёр ?',
      translation: 'Здравствуйте, вы на просмотр в семнадцать часов?',
      question: 'Подтвердите и представьтесь.',
      options: [
        { text: 'Oui, bonjour, je suis Ivan Petrov.', transcription: 'Уи́, бонжу́р, жё сюи́ Ива́н Петро́в.', translation: 'Да, здравствуйте, я Иван Петров.', correct: true },
        { text: 'Non, je passais par là.', transcription: 'Но́н, жё пасэ́ пар ля.', translation: 'Нет, я просто мимо проходил.', correct: false },
        { text: 'Dix-sept heures, c\'est tard.', transcription: 'Дис-сэ́т ёр, сэ тар.', translation: 'Семнадцать часов — это поздно.', correct: false },
        { text: 'Je cherche une maison.', transcription: 'Жё шерш юн мэзо́н.', translation: 'Я ищу дом.', correct: false }
      ],
      correctFeedback: 'На просмотрах во Франции конкурс: приветствие и имя сразу — первый плюс в вашу пользу.',
      wrongFeedback: 'Ответьте «Oui, bonjour, je suis…» и назовите себя.'
    },
    {
      situation: 'Агент показывает квартиру.',
      speaker: 'Agent immobilier — Агент',
      greek: 'C\'est un deux-pièces de quarante mètres carrés.',
      transcription: 'Сэ-т-эн дё-пьес дё кара́нт метр карэ́.',
      translation: 'Это двухкомнатная квартира сорок квадратных метров.',
      question: 'Спросите, входят ли коммунальные платежи в стоимость.',
      options: [
        { text: 'Est-ce que les charges sont comprises ?', transcription: 'Эс-кё ле шарж сон компри́з ?', translation: 'Коммунальные расходы включены?', correct: true },
        { text: 'Quarante mètres, c\'est petit.', transcription: 'Кара́нт метр, сэ пёти́.', translation: 'Сорок метров — это мало.', correct: false },
        { text: 'Je prends, sans regarder.', transcription: 'Жё пран, сан рёгардэ́.', translation: 'Беру, не глядя.', correct: false },
        { text: 'Il y a une piscine ?', transcription: 'Илья́ юн писи́н ?', translation: 'Тут есть бассейн?', correct: false }
      ],
      correctFeedback: 'Charges comprises (CC) или hors charges (HC) — от этого зависит реальная сумма платежа, всегда уточняйте.',
      wrongFeedback: 'Спросите «Est-ce que les charges sont comprises ?»'
    },
    {
      situation: 'Агент рассказывает про условия.',
      speaker: 'Agent immobilier — Агент',
      greek: 'Il faut un garant français et trois fois le loyer en revenus.',
      transcription: 'Иль фо-т-эн гара́н франсэ́ э труа́ фуа́ лё луайе́ ан рёвёню́.',
      translation: 'Нужен французский гарант и доход в три раза выше аренды.',
      question: 'Спросите, подойдёт ли Visale вместо гаранта.',
      options: [
        { text: 'Est-ce que vous acceptez la garantie Visale ?', transcription: 'Эс-кё ву-з-аксепте́ ля гаранти́ Виза́ль ?', translation: 'Вы принимаете гарантию Visale?', correct: true },
        { text: 'Je n\'ai pas d\'amis en France.', transcription: 'Жё нэ па дами́ ан Франс.', translation: 'У меня нет друзей во Франции.', correct: false },
        { text: 'C\'est illégal.', transcription: 'Сэ-т-илега́ль.', translation: 'Это незаконно.', correct: false },
        { text: 'Je peux payer un an d\'avance ?', transcription: 'Жё пё пэйе́ эн-н-ан дава́нс ?', translation: 'Могу заплатить за год вперёд?', correct: false }
      ],
      correctFeedback: 'Visale — бесплатное государственное поручительство. Для приезжего без французского гаранта это главный аргумент.',
      wrongFeedback: 'Спросите про Visale: «Est-ce que vous acceptez la garantie Visale ?»'
    },
    {
      situation: 'Квартира вам подходит.',
      speaker: 'Agent immobilier — Агент',
      greek: 'Vous êtes intéressé ? J\'ai d\'autres visites après vous.',
      transcription: 'Ву-з-эт энтересэ́ ? Жэ дотр визи́т апрэ́ ву.',
      translation: 'Вы заинтересованы? После вас есть другие просмотры.',
      question: 'Скажите, что берёте, и спросите, как подать досье.',
      options: [
        { text: 'Oui, ça m\'intéresse. Comment je dépose mon dossier ?', transcription: 'Уи́, са мэнтерэ́с. Кома́н жё депо́з мон досье́ ?', translation: 'Да, мне интересно. Как подать досье?', correct: true },
        { text: 'Je vais réfléchir un mois.', transcription: 'Жё вэ рефлеши́р эн муа́.', translation: 'Я подумаю месяц.', correct: false },
        { text: 'Les autres peuvent passer avant.', transcription: 'Ле-з-отр пёв пасе́ ава́н.', translation: 'Другие могут пройти первыми.', correct: false },
        { text: 'C\'est trop cher pour moi.', transcription: 'Сэ тро шэр пур муа́.', translation: 'Для меня это слишком дорого.', correct: false }
      ],
      correctFeedback: 'На французском рынке аренды решает скорость: сказать «ça m\'intéresse» и подать досье в тот же день — норма.',
      wrongFeedback: 'Скажите «Oui, ça m\'intéresse» и спросите про досье.'
    },
    {
      situation: 'Вы подписываете договор.',
      speaker: 'Agent immobilier — Агент',
      greek: 'Le dépôt de garantie est d\'un mois de loyer.',
      transcription: 'Лё депо́ дё гаранти́ э дэн муа́ дё луайе́.',
      translation: 'Залог составляет один месяц аренды.',
      question: 'Спросите, когда его возвращают.',
      options: [
        { text: 'Il est rendu quand, à la fin du bail ?', transcription: 'Иль э ранду́ кан, а ля фэн дю бай ?', translation: 'Когда его возвращают, в конце договора?', correct: true },
        { text: 'Je ne paie pas de dépôt.', transcription: 'Жё нё пэ па дё депо́.', translation: 'Я не плачу залог.', correct: false },
        { text: 'C\'est un cadeau ?', transcription: 'Сэ-т-эн кадо́ ?', translation: 'Это подарок?', correct: false },
        { text: 'Un mois, c\'est beaucoup.', transcription: 'Эн муа́, сэ боку́.', translation: 'Месяц — это много.', correct: false }
      ],
      correctFeedback: 'По закону залог возвращают в течение месяца после сдачи квартиры (или двух, если есть замечания в акте).',
      wrongFeedback: 'Спросите «Il est rendu quand ?» — так вы узнаете сроки возврата.'
    }
  ]
},
{
  id: 'boulangerie',
  title: '🥖 В булочной и магазине',
  icon: '🥖',
  description: 'Покупки, вес, цены, оплата',
  steps: [
    {
      situation: 'Вы заходите в булочную. Продавщица здоровается.',
      speaker: 'Boulangère — Продавщица',
      greek: 'Bonjour, qu\'est-ce que ce sera ?',
      transcription: 'Бонжу́р, кэс-кё сё сёра́ ?',
      translation: 'Здравствуйте, что желаете?',
      question: 'Попросите одну традиционную багетку.',
      options: [
        { text: 'Bonjour, une tradition, s\'il vous plaît.', transcription: 'Бонжу́р, юн традисьо́н, силь ву плэ.', translation: 'Здравствуйте, один традиционный багет, пожалуйста.', correct: true },
        { text: 'Donnez-moi du pain.', transcription: 'Донэ́-муа́ дю пэн.', translation: 'Дайте мне хлеба.', correct: false },
        { text: 'Je veux une baguette maintenant.', transcription: 'Жё вё юн багэ́т мэнтёна́н.', translation: 'Я хочу багет сейчас же.', correct: false },
        { text: 'Combien de pain avez-vous ?', transcription: 'Комбье́н дё пэн аве́-ву ?', translation: 'Сколько у вас хлеба?', correct: false }
      ],
      correctFeedback: '«Une tradition» — багет по традиционному рецепту, вкуснее обычного. Заказывают именно так, одним словом.',
      wrongFeedback: 'Скажите «Bonjour, une tradition, s\'il vous plaît» — без «bonjour» во Франции разговор не начинают.'
    },
    {
      situation: 'Продавщица подаёт багет.',
      speaker: 'Boulangère — Продавщица',
      greek: 'Et avec ceci ?',
      transcription: 'Э аве́к сёси́ ?',
      translation: 'Что-нибудь ещё?',
      question: 'Попросите два круассана.',
      options: [
        { text: 'Deux croissants, s\'il vous plaît.', transcription: 'Дё круасса́н, силь ву плэ.', translation: 'Два круассана, пожалуйста.', correct: true },
        { text: 'Rien, merci beaucoup au revoir.', transcription: 'Рье́н, мерси́ боку́ о рёвуа́р.', translation: 'Ничего, спасибо большое до свидания.', correct: false },
        { text: 'Avec ceci quoi ?', transcription: 'Аве́к сёси́ куа́ ?', translation: 'С этим что?', correct: false },
        { text: 'Je réfléchis.', transcription: 'Жё рефлеши́.', translation: 'Я думаю.', correct: false }
      ],
      correctFeedback: '«Et avec ceci ?» — ритуальная фраза французской торговли. Отвечают заказом или «ce sera tout» (это всё).',
      wrongFeedback: 'Закажите: «Deux croissants, s\'il vous plaît».'
    },
    {
      situation: 'Продавщица называет сумму.',
      speaker: 'Boulangère — Продавщица',
      greek: 'Ça fait quatre euros vingt.',
      transcription: 'Са фэ катр ёро́ вэн.',
      translation: 'С вас четыре евро двадцать.',
      question: 'Скажите, что платите картой.',
      options: [
        { text: 'Par carte, s\'il vous plaît.', transcription: 'Пар карт, силь ву плэ.', translation: 'Картой, пожалуйста.', correct: true },
        { text: 'Je n\'ai pas d\'argent.', transcription: 'Жё нэ па дарж́ан.', translation: 'У меня нет денег.', correct: false },
        { text: 'Quatre euros, c\'est cher.', transcription: 'Катр ёро́, сэ шэр.', translation: 'Четыре евро — это дорого.', correct: false },
        { text: 'Vous acceptez les roubles ?', transcription: 'Ву-з-аксепте́ ле рубль ?', translation: 'Вы принимаете рубли?', correct: false }
      ],
      correctFeedback: '«Ça fait…» — так называют итоговую сумму. В ответ достаточно «par carte» или «en espèces».',
      wrongFeedback: 'Ответьте «Par carte, s\'il vous plaît».'
    },
    {
      situation: 'Терминал не срабатывает с первого раза.',
      speaker: 'Boulangère — Продавщица',
      greek: 'Ça n\'a pas marché, vous pouvez réessayer ?',
      transcription: 'Са на па марше́, ву пуве́ реэсэйе́ ?',
      translation: 'Не прошло, можете попробовать ещё раз?',
      question: 'Согласитесь и спросите, есть ли минимальная сумма для карты.',
      options: [
        { text: 'Bien sûr. Il y a un minimum pour la carte ?', transcription: 'Бье́н сюр. Илья́ эн миниму́м пур ля карт ?', translation: 'Конечно. Есть минимум для оплаты картой?', correct: true },
        { text: 'Votre machine est cassée.', transcription: 'Вотр маши́н э касэ́.', translation: 'Ваш терминал сломан.', correct: false },
        { text: 'Je pars alors.', transcription: 'Жё парало́р.', translation: 'Тогда я ухожу.', correct: false },
        { text: 'Ce n\'est pas ma faute.', transcription: 'Сё нэ па ма фот.', translation: 'Это не моя вина.', correct: false }
      ],
      correctFeedback: 'В маленьких лавках часто есть минимум для карты — обычно 5 или 10 евро. Спросить об этом нормально.',
      wrongFeedback: 'Скажите «Bien sûr» и спросите: «Il y a un minimum pour la carte ?»'
    },
    {
      situation: 'Оплата прошла, вы забираете покупки.',
      speaker: 'Boulangère — Продавщица',
      greek: 'C\'est bon, merci. Bonne journée !',
      transcription: 'Сэ бон, мерси́. Бон журнэ́ !',
      translation: 'Всё прошло, спасибо. Хорошего дня!',
      question: 'Ответьте вежливо.',
      options: [
        { text: 'Merci, bonne journée à vous !', transcription: 'Мерси́, бон журнэ́ а ву !', translation: 'Спасибо, и вам хорошего дня!', correct: true },
        { text: 'Ok.', transcription: 'Окэ́й.', translation: 'Окей.', correct: false },
        { text: 'Enfin !', transcription: 'Анфэ́н !', translation: 'Наконец-то!', correct: false },
        { text: 'À demain.', transcription: 'А дёмэ́н.', translation: 'До завтра.', correct: false }
      ],
      correctFeedback: 'Обмен «bonne journée» на выходе — обязательная часть покупки, как «здравствуйте» на входе.',
      wrongFeedback: 'Отвечайте «Merci, bonne journée à vous !»'
    }
  ]
},
{
  id: 'transport',
  title: '🚇 Транспорт',
  icon: '🚇',
  description: 'Метро, RER, SNCF и Navigo',
  steps: [
    {
      situation: 'Вы в кассе метро, хотите оформить проездной.',
      speaker: 'Guichetier — Кассир',
      greek: 'Bonjour, je vous écoute.',
      transcription: 'Бонжу́р, жё ву-з-экут.',
      translation: 'Здравствуйте, слушаю вас.',
      question: 'Скажите, что хотите оформить проездной Navigo на месяц.',
      options: [
        { text: 'Bonjour, je voudrais un Navigo mensuel.', transcription: 'Бонжу́р, жё вудрэ́ эн Навиго́ мансюэ́ль.', translation: 'Здравствуйте, я хотел бы месячный Navigo.', correct: true },
        { text: 'Bonjour, un billet pour Moscou.', transcription: 'Бонжу́р, эн бийе́ пур Моску́.', translation: 'Здравствуйте, билет до Москвы.', correct: false },
        { text: 'Bonjour, le métro est gratuit ?', transcription: 'Бонжу́р, лё метро́ э гратюи́ ?', translation: 'Здравствуйте, метро бесплатное?', correct: false },
        { text: 'Bonjour, je suis perdu.', transcription: 'Бонжу́р, жё сюи́ перду́.', translation: 'Здравствуйте, я потерялся.', correct: false }
      ],
      correctFeedback: 'Navigo mensuel — месячный проездной по всей Иль-де-Франс. Есть и hebdomadaire — недельный.',
      wrongFeedback: 'Скажите «Je voudrais un Navigo mensuel».'
    },
    {
      situation: 'Кассир просит фотографию.',
      speaker: 'Guichetier — Кассир',
      greek: 'Il me faut une photo d\'identité pour la carte.',
      transcription: 'Иль мё фо юн фото́ дидантитэ́ пур ля карт.',
      translation: 'Мне нужна фотография на карту.',
      question: 'Спросите, где можно сделать фото рядом.',
      options: [
        { text: 'Où est-ce que je peux en faire une près d\'ici ?', transcription: 'У эс-кё жё пё-з-ан фэр юн прэ диси́ ?', translation: 'Где я могу сделать её поблизости?', correct: true },
        { text: 'Je n\'aime pas les photos.', transcription: 'Жё нэм па ле фото́.', translation: 'Я не люблю фотографии.', correct: false },
        { text: 'Prenez-moi en photo.', transcription: 'Прёнэ́-муа́ ан фото́.', translation: 'Сфотографируйте меня.', correct: false },
        { text: 'C\'est obligatoire vraiment ?', transcription: 'Сэ-т-облигатуа́р врэма́н ?', translation: 'Это правда обязательно?', correct: false }
      ],
      correctFeedback: '«Près d\'ici» — «поблизости». Фотоавтоматы (photomaton) стоят почти на каждой крупной станции.',
      wrongFeedback: 'Спросите «Où est-ce que je peux en faire une près d\'ici ?»'
    },
    {
      situation: 'Вы едете в поезде, контролёр проверяет билеты.',
      speaker: 'Contrôleur — Контролёр',
      greek: 'Bonjour, contrôle des billets s\'il vous plaît.',
      transcription: 'Бонжу́р, контро́ль де бийе́ силь ву плэ.',
      translation: 'Здравствуйте, проверка билетов, пожалуйста.',
      question: 'Скажите, что билет у вас в телефоне.',
      options: [
        { text: 'Voilà, il est sur mon téléphone.', transcription: 'Вуаля́, иль э сюр мон телефо́н.', translation: 'Вот, он у меня в телефоне.', correct: true },
        { text: 'Je l\'ai perdu tout de suite.', transcription: 'Жё лэ перду́ ту дё сюи́т.', translation: 'Я его сразу потерял.', correct: false },
        { text: 'Vous d\'abord.', transcription: 'Ву дабо́р.', translation: 'Сначала вы.', correct: false },
        { text: 'Le train est en retard.', transcription: 'Лё трэн э-т-ан рёта́р.', translation: 'Поезд опаздывает.', correct: false }
      ],
      correctFeedback: 'Электронный билет — норма. Главное — открыть его до подхода контролёра, сеть в поезде часто пропадает.',
      wrongFeedback: 'Ответьте «Voilà, il est sur mon téléphone» и покажите экран.'
    },
    {
      situation: 'Поезд задерживается, объявление невнятное.',
      speaker: 'Voyageur — Пассажир рядом',
      greek: 'Ils ont dit quelque chose sur un retard.',
      transcription: 'Иль-з-он ди келькё шоз сюр эн рёта́р.',
      translation: 'Они что-то сказали про задержку.',
      question: 'Переспросите, на сколько задержка.',
      options: [
        { text: 'Vous savez de combien de temps ?', transcription: 'Ву саве́ дё комбье́н дё тан ?', translation: 'Вы не знаете, на сколько времени?', correct: true },
        { text: 'Je déteste les trains.', transcription: 'Жё детэ́ст ле трэн.', translation: 'Ненавижу поезда.', correct: false },
        { text: 'Ce n\'est pas grave du tout.', transcription: 'Сё нэ па грав дю ту.', translation: 'Совсем не страшно.', correct: false },
        { text: 'Je descends ici.', transcription: 'Жё дёса́н иси́.', translation: 'Я выхожу здесь.', correct: false }
      ],
      correctFeedback: 'Начать вопрос с «Vous savez…» мягче, чем прямое «combien ?» — и незнакомые люди отвечают охотнее.',
      wrongFeedback: 'Спросите «Vous savez de combien de temps ?»'
    },
    {
      situation: 'Вы выходите на нужной станции в час пик.',
      speaker: 'Voyageur — Пассажир у двери',
      greek: 'Vous descendez ?',
      transcription: 'Ву дёсандэ́ ?',
      translation: 'Вы выходите?',
      question: 'Ответьте, что выходите, и попросите пройти.',
      options: [
        { text: 'Oui, pardon, je descends.', transcription: 'Уи́, пардо́н, жё дёса́н.', translation: 'Да, извините, я выхожу.', correct: true },
        { text: 'Non, restez là.', transcription: 'Но́н, рэстэ́ ля.', translation: 'Нет, стойте там.', correct: false },
        { text: 'Poussez-vous.', transcription: 'Пусэ́-ву.', translation: 'Подвиньтесь.', correct: false },
        { text: 'Je ne sais pas encore.', transcription: 'Жё нё сэ па-з-анко́р.', translation: 'Я ещё не знаю.', correct: false }
      ],
      correctFeedback: '«Pardon» в толпе означает «дайте пройти» и звучит совершенно нейтрально.',
      wrongFeedback: 'Скажите «Oui, pardon, je descends».'
    }
  ]
},
{
  id: 'caf',
  title: '💶 CAF и пособия',
  icon: '💶',
  description: 'Подаём заявку на жилищное пособие APL',
  steps: [
    {
      situation: 'Вы пришли в отделение CAF с вопросом о пособии на жильё.',
      speaker: 'Agent CAF — Сотрудник CAF',
      greek: 'Bonjour, vous venez pour quel dossier ?',
      transcription: 'Бонжу́р, ву вёнэ́ пур кель досье́ ?',
      translation: 'Здравствуйте, вы по какому вопросу?',
      question: 'Скажите, что хотите подать заявку на APL.',
      options: [
        { text: 'Bonjour, je voudrais faire une demande d\'APL.', transcription: 'Бонжу́р, жё вудрэ́ фэр юн дёма́нд дапеэ́ль.', translation: 'Здравствуйте, я хотел бы подать заявку на APL.', correct: true },
        { text: 'Bonjour, je veux de l\'argent gratuit.', transcription: 'Бонжу́р, жё вё дё ларжа́н гратюи́.', translation: 'Здравствуйте, я хочу бесплатных денег.', correct: false },
        { text: 'Bonjour, je cherche un logement.', transcription: 'Бонжу́р, жё шерш эн ложма́н.', translation: 'Здравствуйте, я ищу жильё.', correct: false },
        { text: 'Bonjour, c\'est pour un colis.', transcription: 'Бонжу́р, сэ пур эн коли́.', translation: 'Здравствуйте, это за посылкой.', correct: false }
      ],
      correctFeedback: '«Faire une demande de…» — подать заявку. Формула работает и для APL, и для любого другого пособия.',
      wrongFeedback: 'Скажите «Je voudrais faire une demande d\'APL».'
    },
    {
      situation: 'Сотрудник спрашивает про ваш статус.',
      speaker: 'Agent CAF — Сотрудник CAF',
      greek: 'Vous avez un titre de séjour en cours de validité ?',
      transcription: 'Ву-з-аве́ эн титр дё сежу́р ан кур дё валидитэ́ ?',
      translation: 'У вас есть действующий вид на жительство?',
      question: 'Скажите, что у вас récépissé, и спросите, подходит ли он.',
      options: [
        { text: 'J\'ai un récépissé, est-ce que ça suffit ?', transcription: 'Жэ эн ресеписе́, эс-кё са сюфи́ ?', translation: 'У меня расписка, этого достаточно?', correct: true },
        { text: 'Non, je n\'ai rien du tout.', transcription: 'Но́н, жё нэ рье́н дю ту.', translation: 'Нет, у меня совсем ничего нет.', correct: false },
        { text: 'Je suis en vacances.', transcription: 'Жё сюи́-з-ан вака́нс.', translation: 'Я в отпуске.', correct: false },
        { text: 'Bien sûr, j\'ai un passeport russe.', transcription: 'Бье́н сюр, жэ эн паспо́р рюс.', translation: 'Конечно, у меня российский паспорт.', correct: false }
      ],
      correctFeedback: '«Est-ce que ça suffit ?» — «этого достаточно?». Экономит время: сразу ясно, хватает ли документов.',
      wrongFeedback: 'Скажите «J\'ai un récépissé, est-ce que ça suffit ?»'
    },
    {
      situation: 'Сотрудник объясняет процедуру.',
      speaker: 'Agent CAF — Сотрудник CAF',
      greek: 'Tout se fait en ligne, sur votre espace personnel.',
      transcription: 'Ту сё фэ ан линь, сюр вотр эспа́с персонэ́ль.',
      translation: 'Всё делается онлайн, в вашем личном кабинете.',
      question: 'Скажите, что не понимаете сайт, и попросите помочь.',
      options: [
        { text: 'Je n\'ai pas bien compris le site, vous pouvez m\'aider ?', transcription: 'Жё нэ па бье́н компри́ лё сит, ву пуве́ мэдэ́ ?', translation: 'Я не очень понял сайт, вы можете мне помочь?', correct: true },
        { text: 'Internet, ça ne marche jamais.', transcription: 'Энтернэ́т, са нё марш жамэ́.', translation: 'Интернет никогда не работает.', correct: false },
        { text: 'Faites-le pour moi.', transcription: 'Фэт-лё пур муа́.', translation: 'Сделайте это за меня.', correct: false },
        { text: 'Je n\'ai pas d\'ordinateur, tant pis.', transcription: 'Жё нэ па дординатё́р, тан пи́.', translation: 'У меня нет компьютера, ну и ладно.', correct: false }
      ],
      correctFeedback: 'Признать, что не понял, и попросить помощи — рабочая стратегия. В CAF есть стойки с помощником для онлайн-заявок.',
      wrongFeedback: 'Скажите «Je n\'ai pas bien compris le site, vous pouvez m\'aider ?»'
    },
    {
      situation: 'Сотрудник перечисляет документы для загрузки.',
      speaker: 'Agent CAF — Сотрудник CAF',
      greek: 'Il faut le bail, un RIB et votre avis d\'imposition.',
      transcription: 'Иль фо лё бай, эн риб э вотр ави́ дэмпозисьо́н.',
      translation: 'Нужен договор аренды, RIB и налоговое уведомление.',
      question: 'Скажите, что налогового уведомления нет — вы первый год во Франции.',
      options: [
        { text: 'Je n\'ai pas d\'avis d\'imposition, c\'est ma première année en France.', transcription: 'Жё нэ па дави́ дэмпозисьо́н, сэ ма прёмье́р анэ́ ан Франс.', translation: 'У меня нет налогового уведомления, это мой первый год во Франции.', correct: true },
        { text: 'Je ne paie pas d\'impôts.', transcription: 'Жё нё пэ па дэмпо́.', translation: 'Я не плачу налогов.', correct: false },
        { text: 'Ce document n\'existe pas.', transcription: 'Сё докюма́н негзи́ст па.', translation: 'Такого документа не существует.', correct: false },
        { text: 'Je vais le faire plus tard.', transcription: 'Жё вэ лё фэр плю тар.', translation: 'Я сделаю это позже.', correct: false }
      ],
      correctFeedback: 'Объяснить причину — половина решения. Для первого года CAF принимает декларацию о доходах или справку от работодателя.',
      wrongFeedback: 'Объясните: «c\'est ma première année en France» — тогда предложат замену документа.'
    },
    {
      situation: 'Вы уточняете сроки выплаты.',
      speaker: 'Agent CAF — Сотрудник CAF',
      greek: 'Le premier versement arrive après un mois de délai.',
      transcription: 'Лё прёмье́ версма́н ари́в апрэ́ эн муа́ дё делэ́.',
      translation: 'Первая выплата приходит после месяца ожидания.',
      question: 'Спросите, будет ли пересчёт за этот месяц.',
      options: [
        { text: 'Est-ce que ce mois-là est rattrapé ?', transcription: 'Эс-кё сё муа́-ля э ратрапэ́ ?', translation: 'Этот месяц потом компенсируется?', correct: true },
        { text: 'Un mois sans argent, impossible.', transcription: 'Эн муа́ сан-з-арж́ан, энпоси́бль.', translation: 'Месяц без денег — невозможно.', correct: false },
        { text: 'Je vais me plaindre.', transcription: 'Жё вэ мё плэндр.', translation: 'Я буду жаловаться.', correct: false },
        { text: 'D\'accord, merci, au revoir.', transcription: 'Дако́р, мерси́, о рёвуа́р.', translation: 'Ладно, спасибо, до свидания.', correct: false }
      ],
      correctFeedback: 'Первый месяц аренды по правилам не оплачивается (mois de carence) — лучше узнать это сразу, чем ждать зря.',
      wrongFeedback: 'Спросите «Est-ce que ce mois-là est rattrapé ?»'
    }
  ]
},
{
  id: 'restaurant',
  title: '🍽️ В ресторане',
  icon: '🍽️',
  description: 'Заказ, счёт и чаевые',
  steps: [
    {
      situation: 'Вы заходите в ресторан вдвоём без брони.',
      speaker: 'Serveur — Официант',
      greek: 'Bonsoir, vous avez réservé ?',
      transcription: 'Бонсуа́р, ву-з-аве́ резервэ́ ?',
      translation: 'Добрый вечер, вы бронировали?',
      question: 'Скажите, что нет, и спросите столик на двоих.',
      options: [
        { text: 'Non, est-ce que vous avez une table pour deux ?', transcription: 'Но́н, эс-кё ву-з-аве́ юн табль пур дё ?', translation: 'Нет, у вас есть столик на двоих?', correct: true },
        { text: 'Non, mais on entre quand même.', transcription: 'Но́н, мэ он антр кан мэм.', translation: 'Нет, но мы всё равно зайдём.', correct: false },
        { text: 'Oui, au nom de personne.', transcription: 'Уи́, о ном дё персо́н.', translation: 'Да, на имя никого.', correct: false },
        { text: 'Deux personnes maintenant.', transcription: 'Дё персо́н мэнтёна́н.', translation: 'Два человека сейчас.', correct: false }
      ],
      correctFeedback: '«Une table pour deux» — стандартная формула. После 20:00 в популярных местах почти всегда просят бронь.',
      wrongFeedback: 'Спросите «Est-ce que vous avez une table pour deux ?»'
    },
    {
      situation: 'Официант принёс меню и вернулся за заказом.',
      speaker: 'Serveur — Официант',
      greek: 'Vous avez choisi ?',
      transcription: 'Ву-з-аве́ шуази́ ?',
      translation: 'Вы выбрали?',
      question: 'Закажите дневное меню и спросите, что в нём сегодня.',
      options: [
        { text: 'Je prends la formule du jour. Il y a quoi aujourd\'hui ?', transcription: 'Жё пран ля формю́ль дю жур. Илья́ куа́ ожурдюи́ ?', translation: 'Я возьму дневное меню. Что в нём сегодня?', correct: true },
        { text: 'Donnez-moi tout.', transcription: 'Донэ́-муа́ ту.', translation: 'Дайте мне всё.', correct: false },
        { text: 'Je n\'ai pas faim.', transcription: 'Жё нэ па фэн.', translation: 'Я не голоден.', correct: false },
        { text: 'Le menu est en français ?', transcription: 'Лё мёню́ э-т-ан франсэ́ ?', translation: 'Меню на французском?', correct: false }
      ],
      correctFeedback: 'Formule du jour — комплексный обед, обычно вдвое дешевле блюд по отдельности. Спросить состав — нормально.',
      wrongFeedback: 'Скажите «Je prends la formule du jour» и уточните, что в неё входит.'
    },
    {
      situation: 'Официант уточняет прожарку мяса.',
      speaker: 'Serveur — Официант',
      greek: 'Votre steak, quelle cuisson ?',
      transcription: 'Вотр стэк, кель кюисо́н ?',
      translation: 'Ваш стейк — какая прожарка?',
      question: 'Попросите среднюю прожарку.',
      options: [
        { text: 'À point, s\'il vous plaît.', transcription: 'А пуэ́н, силь ву плэ.', translation: 'Средней прожарки, пожалуйста.', correct: true },
        { text: 'Normal.', transcription: 'Норма́ль.', translation: 'Обычную.', correct: false },
        { text: 'Comme vous voulez.', transcription: 'Ком ву вуле́.', translation: 'Как хотите.', correct: false },
        { text: 'Bien froid.', transcription: 'Бье́н фруа́.', translation: 'Хорошо холодным.', correct: false }
      ],
      correctFeedback: 'Шкала: bleu — почти сырой, saignant — с кровью, à point — средняя, bien cuit — прожаренный.',
      wrongFeedback: 'Скажите «À point» — это средняя прожарка.'
    },
    {
      situation: 'Вы поели и хотите расплатиться.',
      speaker: 'Serveur — Официант',
      greek: 'Ça s\'est bien passé ?',
      transcription: 'Са сэ бье́н пасэ́ ?',
      translation: 'Всё было хорошо?',
      question: 'Похвалите еду и попросите счёт.',
      options: [
        { text: 'C\'était très bon, l\'addition s\'il vous plaît.', transcription: 'Сетэ́ трэ бон, лядисьо́н силь ву плэ.', translation: 'Было очень вкусно, счёт, пожалуйста.', correct: true },
        { text: 'Le bill, please.', transcription: 'Лё биль, пли́з.', translation: 'Счёт, пожалуйста (по-английски).', correct: false },
        { text: 'Combien je dois ?', transcription: 'Комбье́н жё дуа́ ?', translation: 'Сколько я должен?', correct: false },
        { text: 'On part maintenant.', transcription: 'Он пар мэнтёна́н.', translation: 'Мы сейчас уходим.', correct: false }
      ],
      correctFeedback: '«L\'addition, s\'il vous plaît» — единственная нужная формула. Счёт во Франции не приносят, пока не попросишь.',
      wrongFeedback: 'Скажите «C\'était très bon, l\'addition s\'il vous plaît».'
    },
    {
      situation: 'Официант приносит счёт.',
      speaker: 'Serveur — Официант',
      greek: 'Voilà. Vous payez ensemble ou séparément ?',
      transcription: 'Вуаля́. Ву пэйе́ ансамбль у сепарема́н ?',
      translation: 'Вот. Платите вместе или раздельно?',
      question: 'Скажите, что платите раздельно, картой.',
      options: [
        { text: 'Séparément, par carte tous les deux.', transcription: 'Сепарема́н, пар карт ту ле дё.', translation: 'Раздельно, оба картой.', correct: true },
        { text: 'Ensemble, mais je ne paie pas.', transcription: 'Ансамбль, мэ жё нё пэ па.', translation: 'Вместе, но я не плачу.', correct: false },
        { text: 'Comme d\'habitude.', transcription: 'Ком дабитю́д.', translation: 'Как обычно.', correct: false },
        { text: 'Le service est compris ?', transcription: 'Лё серви́с э компри́ ?', translation: 'Обслуживание включено?', correct: false }
      ],
      correctFeedback: 'Раздельная оплата во Франции обычное дело. Чаевые уже включены в счёт — сверху оставляют пару евро по желанию.',
      wrongFeedback: 'Ответьте «Séparément, par carte».'
    }
  ]
}
];

// Поле `greek` во всех структурах — историческое имя из IziGreek.
// Оно содержит слово на целевом языке (здесь — французском). Не переименовывать:
// app.js читает именно card.greek.
const VOCAB_CATEGORIES = [
  {
    id: 'verbs_basic', emoji: '📚', title: 'Глаголы: основные',
    words: [
      { greek: 'être', transcription: 'этр', translation: 'быть', emoji: '🧍' },
      { greek: 'avoir', transcription: 'авуа́р', translation: 'иметь', emoji: '🤲' },
      { greek: 'faire', transcription: 'фэр', translation: 'делать', emoji: '🔨' },
      { greek: 'aller', transcription: 'але́', translation: 'идти / ехать', emoji: '🚶' },
      { greek: 'dire', transcription: 'дир', translation: 'говорить', emoji: '💬' },
      { greek: 'pouvoir', transcription: 'пувуа́р', translation: 'мочь', emoji: '💪' },
      { greek: 'vouloir', transcription: 'вулуа́р', translation: 'хотеть', emoji: '🎯' },
      { greek: 'devoir', transcription: 'девуа́р', translation: 'быть должным', emoji: '📌' },
      { greek: 'savoir', transcription: 'савуа́р', translation: 'знать / уметь', emoji: '🧠' },
      { greek: 'voir', transcription: 'вуа́р', translation: 'видеть', emoji: '👀' },
      { greek: 'venir', transcription: 'вени́р', translation: 'приходить', emoji: '🚪' },
      { greek: 'prendre', transcription: 'прандр', translation: 'брать', emoji: '✋' },
      { greek: 'mettre', transcription: 'метр', translation: 'класть / надевать', emoji: '📥' },
      { greek: 'donner', transcription: 'донэ́', translation: 'давать', emoji: '🎁' },
      { greek: 'parler', transcription: 'парле́', translation: 'говорить / разговаривать', emoji: '🗣️' },
    ]
  },
  {
    id: 'verbs_motion', emoji: '🚶', title: 'Глаголы: движение',
    words: [
      { greek: 'partir', transcription: 'парти́р', translation: 'уезжать', emoji: '🧳' },
      { greek: 'arriver', transcription: 'ариве́', translation: 'приезжать', emoji: '🛬' },
      { greek: 'entrer', transcription: 'антре́', translation: 'входить', emoji: '➡️' },
      { greek: 'sortir', transcription: 'сорти́р', translation: 'выходить', emoji: '⬅️' },
      { greek: 'monter', transcription: 'монте́', translation: 'подниматься', emoji: '⬆️' },
      { greek: 'descendre', transcription: 'десандр', translation: 'спускаться', emoji: '⬇️' },
      { greek: 'marcher', transcription: 'марше́', translation: 'ходить пешком', emoji: '🚶' },
      { greek: 'courir', transcription: 'кури́р', translation: 'бежать', emoji: '🏃' },
      { greek: 'tourner', transcription: 'турне́', translation: 'поворачивать', emoji: '↩️' },
      { greek: 'traverser', transcription: 'траверсе́', translation: 'переходить', emoji: '🚸' },
      { greek: 'revenir', transcription: 'рёвени́р', translation: 'возвращаться', emoji: '🔄' },
      { greek: 'rentrer', transcription: 'рантре́', translation: 'возвращаться домой', emoji: '🏠' },
      { greek: 'conduire', transcription: 'кондюи́р', translation: 'водить машину', emoji: '🚗' },
      { greek: 'voyager', transcription: 'вуаяже́', translation: 'путешествовать', emoji: '✈️' },
      { greek: 'attendre', transcription: 'атандр', translation: 'ждать', emoji: '⏳' },
    ]
  },
  {
    id: 'verbs_daily', emoji: '🔄', title: 'Глаголы: повседневные',
    words: [
      { greek: 'manger', transcription: 'манже́', translation: 'есть', emoji: '🍽️' },
      { greek: 'boire', transcription: 'буа́р', translation: 'пить', emoji: '🥤' },
      { greek: 'dormir', transcription: 'дорми́р', translation: 'спать', emoji: '😴' },
      { greek: 'travailler', transcription: 'травайе́', translation: 'работать', emoji: '💼' },
      { greek: 'acheter', transcription: 'ашете́', translation: 'покупать', emoji: '🛒' },
      { greek: 'payer', transcription: 'пэйе́', translation: 'платить', emoji: '💳' },
      { greek: 'chercher', transcription: 'шерше́', translation: 'искать', emoji: '🔍' },
      { greek: 'trouver', transcription: 'труве́', translation: 'находить', emoji: '🎯' },
      { greek: 'appeler', transcription: 'апле́', translation: 'звонить / звать', emoji: '📞' },
      { greek: 'écrire', transcription: 'экри́р', translation: 'писать', emoji: '✍️' },
      { greek: 'lire', transcription: 'лир', translation: 'читать', emoji: '📖' },
      { greek: 'écouter', transcription: 'экуте́', translation: 'слушать', emoji: '🎧' },
      { greek: 'regarder', transcription: 'регарде́', translation: 'смотреть', emoji: '📺' },
      { greek: 'ouvrir', transcription: 'уври́р', translation: 'открывать', emoji: '🔓' },
      { greek: 'fermer', transcription: 'фэрме́', translation: 'закрывать', emoji: '🔒' },
    ]
  },
  {
    id: 'city', emoji: '🏙️', title: 'Город',
    words: [
      { greek: 'la ville', transcription: 'ля виль', translation: 'город', emoji: '🏙️' },
      { greek: 'la rue', transcription: 'ля рю', translation: 'улица', emoji: '🛣️' },
      { greek: 'la mairie', transcription: 'ля мэри́', translation: 'мэрия', emoji: '🏛️' },
      { greek: 'la préfecture', transcription: 'ля префектю́р', translation: 'префектура', emoji: '📋' },
      { greek: 'la poste', transcription: 'ля пост', translation: 'почта', emoji: '📮' },
      { greek: 'la banque', transcription: 'ля банк', translation: 'банк', emoji: '🏦' },
      { greek: 'la pharmacie', transcription: 'ля фармаси́', translation: 'аптека', emoji: '💊' },
      { greek: 'le marché', transcription: 'лё марше́', translation: 'рынок', emoji: '🧺' },
      { greek: 'la boulangerie', transcription: 'ля буланжри́', translation: 'булочная', emoji: '🥖' },
      { greek: 'le supermarché', transcription: 'лё сюпермарше́', translation: 'супермаркет', emoji: '🛒' },
      { greek: 'la gare', transcription: 'ля гар', translation: 'вокзал', emoji: '🚉' },
      { greek: 'le quartier', transcription: 'лё картье́', translation: 'район', emoji: '🏘️' },
      { greek: 'le parc', transcription: 'лё парк', translation: 'парк', emoji: '🌳' },
      { greek: "l'hôpital", transcription: 'лёпита́ль', translation: 'больница', emoji: '🏥' },
      { greek: "l'école", transcription: 'леко́ль', translation: 'школа', emoji: '🎒' },
    ]
  },
  {
    id: 'home', emoji: '🏠', title: 'Дом и квартира',
    words: [
      { greek: "l'appartement", transcription: 'лапартёма́н', translation: 'квартира', emoji: '🏢' },
      { greek: 'la maison', transcription: 'ля мэзо́н', translation: 'дом', emoji: '🏠' },
      { greek: 'la chambre', transcription: 'ля шамбр', translation: 'комната / спальня', emoji: '🛏️' },
      { greek: 'la cuisine', transcription: 'ля кюизи́н', translation: 'кухня', emoji: '🍳' },
      { greek: 'la salle de bain', transcription: 'ля саль дё бэн', translation: 'ванная', emoji: '🛁' },
      { greek: 'les toilettes', transcription: 'ле туалэ́т', translation: 'туалет', emoji: '🚽' },
      { greek: 'le loyer', transcription: 'лё луайе́', translation: 'арендная плата', emoji: '💶' },
      { greek: 'le bail', transcription: 'лё бай', translation: 'договор аренды', emoji: '📄' },
      { greek: 'les charges', transcription: 'ле шарж', translation: 'коммунальные платежи', emoji: '🧾' },
      { greek: 'le propriétaire', transcription: 'лё проприетэ́р', translation: 'хозяин жилья', emoji: '🔑' },
      { greek: 'le voisin', transcription: 'лё вуазэ́н', translation: 'сосед', emoji: '👥' },
      { greek: "l'ascenseur", transcription: 'лясансё́р', translation: 'лифт', emoji: '🛗' },
      { greek: 'le chauffage', transcription: 'лё шофа́ж', translation: 'отопление', emoji: '🔥' },
      { greek: 'la clé', transcription: 'ля кле', translation: 'ключ', emoji: '🗝️' },
      { greek: 'le meuble', transcription: 'лё мёбль', translation: 'мебель', emoji: '🪑' },
    ]
  },
  {
    id: 'food', emoji: '🍽️', title: 'Еда и напитки',
    words: [
      { greek: 'le pain', transcription: 'лё пэн', translation: 'хлеб', emoji: '🍞' },
      { greek: 'le fromage', transcription: 'лё фрома́ж', translation: 'сыр', emoji: '🧀' },
      { greek: 'la viande', transcription: 'ля вьянд', translation: 'мясо', emoji: '🥩' },
      { greek: 'le poisson', transcription: 'лё пуасо́н', translation: 'рыба', emoji: '🐟' },
      { greek: 'les légumes', transcription: 'ле легю́м', translation: 'овощи', emoji: '🥕' },
      { greek: 'les fruits', transcription: 'ле фрюи́', translation: 'фрукты', emoji: '🍎' },
      { greek: "l'eau", transcription: 'ло', translation: 'вода', emoji: '💧' },
      { greek: 'le vin', transcription: 'лё вэн', translation: 'вино', emoji: '🍷' },
      { greek: 'le café', transcription: 'лё кафе́', translation: 'кофе', emoji: '☕' },
      { greek: 'le lait', transcription: 'лё лэ', translation: 'молоко', emoji: '🥛' },
      { greek: 'le sucre', transcription: 'лё сюкр', translation: 'сахар', emoji: '🍬' },
      { greek: 'le sel', transcription: 'лё сэль', translation: 'соль', emoji: '🧂' },
      { greek: 'le petit-déjeuner', transcription: 'лё пёти́-дежёне́', translation: 'завтрак', emoji: '🥐' },
      { greek: 'le déjeuner', transcription: 'лё дежёне́', translation: 'обед', emoji: '🍽️' },
      { greek: 'le dîner', transcription: 'лё дине́', translation: 'ужин', emoji: '🌙' },
    ]
  },
  {
    id: 'shopping', emoji: '🛒', title: 'Покупки',
    words: [
      { greek: 'le prix', transcription: 'лё при', translation: 'цена', emoji: '🏷️' },
      { greek: 'la caisse', transcription: 'ля кэс', translation: 'касса', emoji: '💰' },
      { greek: 'le ticket', transcription: 'лё тикэ́', translation: 'чек', emoji: '🧾' },
      { greek: 'la carte bancaire', transcription: 'ля карт банкэ́р', translation: 'банковская карта', emoji: '💳' },
      { greek: 'les espèces', transcription: 'ле-з-эспэ́с', translation: 'наличные', emoji: '💵' },
      { greek: 'la monnaie', transcription: 'ля монэ́', translation: 'сдача / мелочь', emoji: '🪙' },
      { greek: 'la promotion', transcription: 'ля промосьо́н', translation: 'акция / скидка', emoji: '🔻' },
      { greek: 'les soldes', transcription: 'ле сольд', translation: 'сезонные распродажи', emoji: '🏷️' },
      { greek: 'le sac', transcription: 'лё сак', translation: 'пакет / сумка', emoji: '🛍️' },
      { greek: 'la taille', transcription: 'ля тай', translation: 'размер', emoji: '📏' },
      { greek: 'la cabine', transcription: 'ля каби́н', translation: 'примерочная', emoji: '🚪' },
      { greek: 'le rayon', transcription: 'лё рэйо́н', translation: 'отдел в магазине', emoji: '🗄️' },
      { greek: 'la livraison', transcription: 'ля ливрэзо́н', translation: 'доставка', emoji: '📦' },
      { greek: 'le remboursement', transcription: 'лё рамбурсма́н', translation: 'возврат денег', emoji: '↩️' },
      { greek: 'la garantie', transcription: 'ля гаранти́', translation: 'гарантия', emoji: '🛡️' },
    ]
  },
  {
    id: 'transport', emoji: '🚇', title: 'Транспорт',
    words: [
      { greek: 'le métro', transcription: 'лё метро́', translation: 'метро', emoji: '🚇' },
      { greek: 'le bus', transcription: 'лё бюс', translation: 'автобус', emoji: '🚌' },
      { greek: 'le train', transcription: 'лё трэн', translation: 'поезд', emoji: '🚆' },
      { greek: 'le billet', transcription: 'лё бийе́', translation: 'билет', emoji: '🎫' },
      { greek: "l'arrêt", transcription: 'лярэ́', translation: 'остановка', emoji: '🚏' },
      { greek: 'la station', transcription: 'ля стасьо́н', translation: 'станция', emoji: '🚉' },
      { greek: 'la correspondance', transcription: 'ля кореспонда́нс', translation: 'пересадка', emoji: '🔀' },
      { greek: 'le quai', transcription: 'лё кэ', translation: 'платформа', emoji: '🛤️' },
      { greek: 'le retard', transcription: 'лё рёта́р', translation: 'опоздание', emoji: '⏰' },
      { greek: 'la grève', transcription: 'ля грэв', translation: 'забастовка', emoji: '✊' },
      { greek: 'le taxi', transcription: 'лё такси́', translation: 'такси', emoji: '🚕' },
      { greek: 'la voiture', transcription: 'ля вуатю́р', translation: 'машина', emoji: '🚗' },
      { greek: "l'essence", transcription: 'лесса́нс', translation: 'бензин', emoji: '⛽' },
      { greek: 'le vélo', transcription: 'лё вело́', translation: 'велосипед', emoji: '🚲' },
      { greek: "l'aéroport", transcription: 'лаэропо́р', translation: 'аэропорт', emoji: '✈️' },
    ]
  },
  {
    id: 'health', emoji: '🏥', title: 'Здоровье и тело',
    words: [
      { greek: 'le médecin', transcription: 'лё медсэ́н', translation: 'врач', emoji: '👨‍⚕️' },
      { greek: 'la douleur', transcription: 'ля дулё́р', translation: 'боль', emoji: '😣' },
      { greek: 'la fièvre', transcription: 'ля фьевр', translation: 'температура', emoji: '🌡️' },
      { greek: "l'ordonnance", transcription: 'лордона́нс', translation: 'рецепт', emoji: '📝' },
      { greek: 'le médicament', transcription: 'лё медикама́н', translation: 'лекарство', emoji: '💊' },
      { greek: 'la carte Vitale', transcription: 'ля карт Витáль', translation: 'карта медстраховки', emoji: '💳' },
      { greek: 'la tête', transcription: 'ля тэт', translation: 'голова', emoji: '🗣️' },
      { greek: 'la gorge', transcription: 'ля горж', translation: 'горло', emoji: '🫁' },
      { greek: 'le ventre', transcription: 'лё вантр', translation: 'живот', emoji: '🫃' },
      { greek: 'le dos', transcription: 'лё до', translation: 'спина', emoji: '🦴' },
      { greek: 'la dent', transcription: 'ля дан', translation: 'зуб', emoji: '🦷' },
      { greek: 'la main', transcription: 'ля мэн', translation: 'рука (кисть)', emoji: '✋' },
      { greek: 'la jambe', transcription: 'ля жамб', translation: 'нога', emoji: '🦵' },
      { greek: 'les urgences', transcription: 'ле-з-юржа́нс', translation: 'скорая помощь / приёмный покой', emoji: '🚑' },
      { greek: 'le rendez-vous', transcription: 'лё рандэву́', translation: 'запись на приём', emoji: '📅' },
    ]
  },
  {
    id: 'documents', emoji: '📋', title: 'Документы и бюрократия',
    words: [
      { greek: 'le titre de séjour', transcription: 'лё титр дё сежу́р', translation: 'вид на жительство', emoji: '🪪' },
      { greek: 'le récépissé', transcription: 'лё ресеписе́', translation: 'временная расписка', emoji: '🧾' },
      { greek: 'le passeport', transcription: 'лё паспо́р', translation: 'паспорт', emoji: '📕' },
      { greek: 'le dossier', transcription: 'лё досье́', translation: 'пакет документов', emoji: '📁' },
      { greek: 'le formulaire', transcription: 'лё формюлэ́р', translation: 'бланк / форма', emoji: '📄' },
      { greek: 'le justificatif de domicile', transcription: 'лё жюстификати́ф дё домиси́ль', translation: 'подтверждение адреса', emoji: '🏠' },
      { greek: "l'attestation", transcription: 'лятестасьо́н', translation: 'справка', emoji: '📜' },
      { greek: 'la signature', transcription: 'ля синьятю́р', translation: 'подпись', emoji: '✒️' },
      { greek: 'le délai', transcription: 'лё делэ́', translation: 'срок ожидания', emoji: '⏳' },
      { greek: 'la demande', transcription: 'ля дёма́нд', translation: 'заявка', emoji: '📨' },
      { greek: 'le numéro de sécurité sociale', transcription: 'лё нюмеро́ дё секюритэ́ сосья́ль', translation: 'номер соцстрахования', emoji: '#️⃣' },
      { greek: "l'avis d'imposition", transcription: 'лави́ дэмпозисьо́н', translation: 'налоговое уведомление', emoji: '🧮' },
      { greek: 'le RIB', transcription: 'лё риб', translation: 'банковские реквизиты', emoji: '🏦' },
      { greek: 'le contrat', transcription: 'лё контра́', translation: 'договор', emoji: '📑' },
      { greek: 'le courrier recommandé', transcription: 'лё курье́ рёкоманде́', translation: 'заказное письмо', emoji: '✉️' },
    ]
  },
  {
    id: 'work', emoji: '💼', title: 'Работа и офис',
    words: [
      { greek: 'le travail', transcription: 'лё траваи́', translation: 'работа', emoji: '💼' },
      { greek: "l'entreprise", transcription: 'лянтрёпри́з', translation: 'компания', emoji: '🏢' },
      { greek: 'le collègue', transcription: 'лё колэ́г', translation: 'коллега', emoji: '🤝' },
      { greek: 'le patron', transcription: 'лё патро́н', translation: 'начальник', emoji: '👔' },
      { greek: 'le salaire', transcription: 'лё салэ́р', translation: 'зарплата', emoji: '💶' },
      { greek: 'le contrat de travail', transcription: 'лё контра́ дё траваи́', translation: 'трудовой договор', emoji: '📄' },
      { greek: "l'entretien", transcription: 'лянтрётьэ́н', translation: 'собеседование', emoji: '🗣️' },
      { greek: 'le CV', transcription: 'лё севе́', translation: 'резюме', emoji: '📃' },
      { greek: 'la réunion', transcription: 'ля реюньо́н', translation: 'совещание', emoji: '👥' },
      { greek: 'le bureau', transcription: 'лё бюро́', translation: 'офис / рабочий стол', emoji: '🖥️' },
      { greek: 'le congé', transcription: 'лё конже́', translation: 'отпуск', emoji: '🏖️' },
      { greek: "l'horaire", transcription: 'лёрэ́р', translation: 'график', emoji: '🕘' },
      { greek: 'la formation', transcription: 'ля формасьо́н', translation: 'обучение', emoji: '🎓' },
      { greek: 'le chômage', transcription: 'лё шома́ж', translation: 'безработица', emoji: '📉' },
      { greek: 'la fiche de paie', transcription: 'ля фиш дё пэ', translation: 'расчётный лист', emoji: '🧾' },
    ]
  },
  {
    id: 'family', emoji: '👪', title: 'Семья и люди',
    words: [
      { greek: 'la famille', transcription: 'ля фами́й', translation: 'семья', emoji: '👪' },
      { greek: 'le mari', transcription: 'лё мари́', translation: 'муж', emoji: '🤵' },
      { greek: 'la femme', transcription: 'ля фам', translation: 'жена / женщина', emoji: '👰' },
      { greek: "l'enfant", transcription: 'лянфа́н', translation: 'ребёнок', emoji: '🧒' },
      { greek: 'le fils', transcription: 'лё фис', translation: 'сын', emoji: '👦' },
      { greek: 'la fille', transcription: 'ля фий', translation: 'дочь / девочка', emoji: '👧' },
      { greek: 'les parents', transcription: 'ле пара́н', translation: 'родители', emoji: '👫' },
      { greek: 'la mère', transcription: 'ля мэр', translation: 'мать', emoji: '👩' },
      { greek: 'le père', transcription: 'лё пэр', translation: 'отец', emoji: '👨' },
      { greek: 'le frère', transcription: 'лё фрэр', translation: 'брат', emoji: '👬' },
      { greek: 'la sœur', transcription: 'ля сёр', translation: 'сестра', emoji: '👭' },
      { greek: "l'ami", transcription: 'лями́', translation: 'друг', emoji: '🙋' },
      { greek: 'le collègue de travail', transcription: 'лё колэ́г дё траваи́', translation: 'коллега по работе', emoji: '👔' },
      { greek: 'le monsieur', transcription: 'лё мёсьё́', translation: 'мужчина / господин', emoji: '🙎' },
      { greek: 'la dame', transcription: 'ля дам', translation: 'женщина / дама', emoji: '💁' },
    ]
  },
  {
    id: 'numbers_time', emoji: '🔢', title: 'Числа и время',
    words: [
      { greek: 'un', transcription: 'эн', translation: 'один', emoji: '1️⃣' },
      { greek: 'deux', transcription: 'дё', translation: 'два', emoji: '2️⃣' },
      { greek: 'trois', transcription: 'труа́', translation: 'три', emoji: '3️⃣' },
      { greek: 'dix', transcription: 'дис', translation: 'десять', emoji: '🔟' },
      { greek: 'vingt', transcription: 'вэн', translation: 'двадцать', emoji: '🔢' },
      { greek: 'cent', transcription: 'сан', translation: 'сто', emoji: '💯' },
      { greek: "aujourd'hui", transcription: 'ожурдюи́', translation: 'сегодня', emoji: '📅' },
      { greek: 'demain', transcription: 'дёмэ́н', translation: 'завтра', emoji: '➡️' },
      { greek: 'hier', transcription: 'иэ́р', translation: 'вчера', emoji: '⬅️' },
      { greek: 'la semaine', transcription: 'ля сёмэ́н', translation: 'неделя', emoji: '🗓️' },
      { greek: 'le mois', transcription: 'лё муа́', translation: 'месяц', emoji: '📆' },
      { greek: "l'année", transcription: 'лянэ́', translation: 'год', emoji: '🎊' },
      { greek: 'le matin', transcription: 'лё матэ́н', translation: 'утро', emoji: '🌅' },
      { greek: "l'après-midi", transcription: 'лапрэ́-миди́', translation: 'вторая половина дня', emoji: '☀️' },
      { greek: 'le soir', transcription: 'лё суа́р', translation: 'вечер', emoji: '🌆' },
    ]
  },
  {
    id: 'adjectives', emoji: '⭐', title: 'Прилагательные',
    words: [
      { greek: 'grand', transcription: 'гран', translation: 'большой', emoji: '🔝' },
      { greek: 'petit', transcription: 'пёти́', translation: 'маленький', emoji: '🔻' },
      { greek: 'bon', transcription: 'бон', translation: 'хороший / вкусный', emoji: '👍' },
      { greek: 'mauvais', transcription: 'мовэ́', translation: 'плохой', emoji: '👎' },
      { greek: 'cher', transcription: 'шэр', translation: 'дорогой', emoji: '💸' },
      { greek: 'pas cher', transcription: 'па шэр', translation: 'недорогой', emoji: '🪙' },
      { greek: 'facile', transcription: 'фаси́ль', translation: 'лёгкий', emoji: '✅' },
      { greek: 'difficile', transcription: 'дифиси́ль', translation: 'трудный', emoji: '⚠️' },
      { greek: 'rapide', transcription: 'рапи́д', translation: 'быстрый', emoji: '⚡' },
      { greek: 'lent', transcription: 'лан', translation: 'медленный', emoji: '🐢' },
      { greek: 'chaud', transcription: 'шо', translation: 'горячий / тёплый', emoji: '🔥' },
      { greek: 'froid', transcription: 'фруа́', translation: 'холодный', emoji: '❄️' },
      { greek: 'nouveau', transcription: 'нуво́', translation: 'новый', emoji: '🆕' },
      { greek: 'vieux', transcription: 'вьё', translation: 'старый', emoji: '🕰️' },
      { greek: 'gratuit', transcription: 'гратюи́', translation: 'бесплатный', emoji: '🆓' },
    ]
  },
  {
    id: 'weather', emoji: '🌦️', title: 'Погода и природа',
    words: [
      { greek: 'le temps', transcription: 'лё тан', translation: 'погода / время', emoji: '🌤️' },
      { greek: 'la pluie', transcription: 'ля плюи́', translation: 'дождь', emoji: '🌧️' },
      { greek: 'le soleil', transcription: 'лё солэ́й', translation: 'солнце', emoji: '☀️' },
      { greek: 'le vent', transcription: 'лё ван', translation: 'ветер', emoji: '💨' },
      { greek: 'la neige', transcription: 'ля нэж', translation: 'снег', emoji: '❄️' },
      { greek: 'le nuage', transcription: 'лё нюа́ж', translation: 'облако', emoji: '☁️' },
      { greek: "l'orage", transcription: 'лёра́ж', translation: 'гроза', emoji: '⛈️' },
      { greek: 'la mer', transcription: 'ля мэр', translation: 'море', emoji: '🌊' },
      { greek: 'la montagne', transcription: 'ля монта́нь', translation: 'гора', emoji: '⛰️' },
      { greek: 'la forêt', transcription: 'ля форэ́', translation: 'лес', emoji: '🌲' },
      { greek: 'la rivière', transcription: 'ля ривьэ́р', translation: 'река', emoji: '🏞️' },
      { greek: 'le printemps', transcription: 'лё прэнта́н', translation: 'весна', emoji: '🌸' },
      { greek: "l'été", transcription: 'лете́', translation: 'лето', emoji: '🏖️' },
      { greek: "l'automne", transcription: 'лёто́н', translation: 'осень', emoji: '🍂' },
      { greek: "l'hiver", transcription: 'ливэ́р', translation: 'зима', emoji: '⛄' },
    ]
  },
  {
    id: 'colors_clothes', emoji: '🎨', title: 'Цвета и одежда',
    words: [
      { greek: 'blanc', transcription: 'блан', translation: 'белый', emoji: '⚪' },
      { greek: 'noir', transcription: 'нуа́р', translation: 'чёрный', emoji: '⚫' },
      { greek: 'rouge', transcription: 'руж', translation: 'красный', emoji: '🔴' },
      { greek: 'bleu', transcription: 'блё', translation: 'синий', emoji: '🔵' },
      { greek: 'vert', transcription: 'вэр', translation: 'зелёный', emoji: '🟢' },
      { greek: 'jaune', transcription: 'жон', translation: 'жёлтый', emoji: '🟡' },
      { greek: 'gris', transcription: 'гри', translation: 'серый', emoji: '⬜' },
      { greek: 'le manteau', transcription: 'лё манто́', translation: 'пальто', emoji: '🧥' },
      { greek: 'la veste', transcription: 'ля вэст', translation: 'куртка / пиджак', emoji: '👕' },
      { greek: 'le pantalon', transcription: 'лё панталё́н', translation: 'брюки', emoji: '👖' },
      { greek: 'la robe', transcription: 'ля роб', translation: 'платье', emoji: '👗' },
      { greek: 'la chemise', transcription: 'ля шёми́з', translation: 'рубашка', emoji: '👔' },
      { greek: 'les chaussures', transcription: 'ле шоссю́р', translation: 'обувь', emoji: '👟' },
      { greek: "l'écharpe", transcription: 'лешарп', translation: 'шарф', emoji: '🧣' },
      { greek: 'le parapluie', transcription: 'лё параплюи́', translation: 'зонт', emoji: '☂️' },
    ]
  },
];

const PHRASES = [
  {
    id: 'daily', category: 'Каждый день', icon: '☀️', color: '#000091',
    phrases: [
      { greek: 'Bonjour', transcription: 'Бонжу́р', translation: 'Здравствуйте / Добрый день', note: 'Обязательное слово. Войти в магазин, лифт или кабинет без «bonjour» — считается невежливым.' },
      { greek: 'Bonsoir', transcription: 'Бонсуа́р', translation: 'Добрый вечер', note: 'Примерно после 18:00 заменяет bonjour. Ошибиться не страшно, но местные переключаются точно.' },
      { greek: 'Merci beaucoup', transcription: 'Мерси́ боку́', translation: 'Большое спасибо', note: 'Универсальная благодарность. «Merci bien» звучит суше и иногда иронично.' },
      { greek: 'S’il vous plaît', transcription: 'Силь ву плэ', translation: 'Пожалуйста (просьба)', note: 'Ставится в конец просьбы. На «ты» — s’il te plaît.' },
      { greek: 'Je vous en prie', transcription: 'Жё ву-з-ан при', translation: 'Пожалуйста (в ответ на спасибо)', note: 'Вежливый ответ на merci. Неформально — «de rien».' },
      { greek: 'Excusez-moi', transcription: 'Экскюзэ́-муа́', translation: 'Извините', note: 'Чтобы обратиться или пройти. «Pardon» короче и годится в толпе.' },
      { greek: 'Au revoir', transcription: 'О рёвуа́р', translation: 'До свидания', note: 'Стандартное прощание везде, кроме дружеского круга.' },
      { greek: 'Bonne journée', transcription: 'Бон журнэ́', translation: 'Хорошего дня', note: 'Финал почти любой покупки или встречи. Вечером — «bonne soirée».' },
      { greek: 'Oui, bien sûr', transcription: 'Уи́, бье́н сюр', translation: 'Да, конечно', note: 'Тёплое согласие. Просто «oui» звучит сухо.' },
      { greek: 'Non, désolé', transcription: 'Но́н, дезоле́', translation: 'Нет, извините', note: 'Отказ смягчается словом désolé, иначе звучит грубо.' },
      { greek: 'D’accord', transcription: 'Дако́р', translation: 'Хорошо / Договорились', note: 'Самое частое слово согласия в быту. В речи часто сокращают до «d’ac».' },
      { greek: 'Ça va ?', transcription: 'Са ва ?', translation: 'Как дела?', note: 'И вопрос, и ответ: «Ça va, merci». Ритуал, а не настоящий интерес.' },
      { greek: 'Pas de problème', transcription: 'Па дё проблэ́м', translation: 'Без проблем', note: 'Снимает напряжение после чужой ошибки или извинения.' },
      { greek: 'Je ne comprends pas', transcription: 'Жё нё компра́н па', translation: 'Я не понимаю', note: 'Главная фраза первых месяцев. За ней сразу просите говорить медленнее.' },
      { greek: 'Vous pouvez répéter, s’il vous plaît ?', transcription: 'Ву пуве́ репете́, силь ву плэ ?', translation: 'Можете повторить, пожалуйста?', note: 'Работает лучше, чем «quoi ?» — то звучит резко.' },
    ]
  },
  {
    id: 'survival', category: 'Выживание и экстренное', icon: '🆘', color: '#000091',
    phrases: [
      { greek: 'Au secours !', transcription: 'О сёку́р !', translation: 'Помогите!', note: 'Крик о помощи в опасности. В быту для просьбы используйте «vous pouvez m’aider ?».' },
      { greek: 'Appelez une ambulance', transcription: 'Апле́ юн амбюла́нс', translation: 'Вызовите скорую', note: 'Скорая — SAMU, номер 15. Единый европейский — 112.' },
      { greek: 'J’ai besoin d’un médecin', transcription: 'Жэ бёзуэ́н дэн медсэ́н', translation: 'Мне нужен врач', note: 'Конструкция «avoir besoin de» = нуждаться в чём-то.' },
      { greek: 'Je me suis perdu', transcription: 'Жё мё сюи́ перду́', translation: 'Я заблудился', note: 'Женщина скажет «perdue» — на слух то же самое.' },
      { greek: 'On m’a volé mon portefeuille', transcription: 'Он ма воле́ мон портфё́й', translation: 'У меня украли кошелёк', note: 'Заявление в полицию — «porter plainte».' },
      { greek: 'Où est le commissariat ?', transcription: 'У э лё комисария́ ?', translation: 'Где полицейский участок?', note: 'Полиция — 17. Для заявления нужен паспорт.' },
      { greek: 'Je ne me sens pas bien', transcription: 'Жё нё мё сан па бье́н', translation: 'Мне плохо', note: 'Нейтральная формула для любого недомогания.' },
      { greek: 'C’est urgent', transcription: 'Сэ-т-юржа́н', translation: 'Это срочно', note: 'Слово, которое ускоряет очередь в аптеке или у стойки.' },
      { greek: 'Je suis allergique à…', transcription: 'Жё сюи́-з-алержи́к а…', translation: 'У меня аллергия на…', note: 'Обязательно сказать в аптеке и ресторане.' },
      { greek: 'Vous parlez anglais ?', transcription: 'Ву парле́ англэ́ ?', translation: 'Вы говорите по-английски?', note: 'Спросите только после попытки на французском — реакция будет теплее.' },
      { greek: 'Pouvez-vous parler plus lentement ?', transcription: 'Пуве́-ву парле́ плю лянтёма́н ?', translation: 'Можете говорить медленнее?', note: 'Просьба, которая решает половину проблем понимания.' },
      { greek: 'Comment ça s’écrit ?', transcription: 'Кома́н са секри́ ?', translation: 'Как это пишется?', note: 'Спасает при записи адреса, фамилии, названия лекарства.' },
      { greek: 'Je n’ai pas de réseau', transcription: 'Жё нэ па дё резо́', translation: 'У меня нет связи', note: 'Réseau — мобильная сеть. Wi-Fi называют «le wifi».' },
      { greek: 'Ma carte ne marche pas', transcription: 'Ма карт нё марш па', translation: 'Моя карта не работает', note: 'Marcher о технике = «работать». Travailler так не используют.' },
      { greek: 'Il y a une erreur', transcription: 'Илья́ юн эрё́р', translation: 'Здесь ошибка', note: 'Нейтрально и не обвиняет — правильный тон для спора о счёте.' },
    ]
  },
  {
    id: 'politeness', category: 'Знакомство и вежливость', icon: '🤝', color: '#000091',
    phrases: [
      { greek: 'Je m’appelle…', transcription: 'Жё мапэ́ль…', translation: 'Меня зовут…', note: 'Дословно «я себя зову». Возвратный глагол s’appeler.' },
      { greek: 'Enchanté', transcription: 'Аншантэ́', translation: 'Очень приятно', note: 'Говорят при первом знакомстве, пожимая руку.' },
      { greek: 'Je viens de Russie', transcription: 'Жё вьен дё Рюси́', translation: 'Я из России', note: 'Venir de + страна. Для города — «je viens de Moscou».' },
      { greek: 'J’habite à Lyon', transcription: 'Жаби́т а Льо́н', translation: 'Я живу в Лионе', note: 'С городом — à, со страной женского рода — en: en France.' },
      { greek: 'Je suis ici depuis deux ans', transcription: 'Жё сюи́-з-иси́ дёпюи́ дё-з-ан', translation: 'Я здесь два года', note: 'Depuis + срок отвечает на «как долго».' },
      { greek: 'J’apprends le français', transcription: 'Жапра́н лё франсэ́', translation: 'Я учу французский', note: 'Признание, после которого почти все начинают говорить медленнее.' },
      { greek: 'Je parle un peu français', transcription: 'Жё парль эн пё франсэ́', translation: 'Я немного говорю по-французски', note: 'Скромная формулировка располагает собеседника.' },
      { greek: 'Vous êtes très gentil', transcription: 'Ву-з-эт трэ жанти́', translation: 'Вы очень любезны', note: 'Женщине — «gentille», звучит как «жанти́й».' },
      { greek: 'Ça me fait plaisir', transcription: 'Са мё фэ плези́р', translation: 'Мне это приятно', note: 'Тёплый ответ на приглашение или подарок.' },
      { greek: 'Bonne chance !', transcription: 'Бон шанс !', translation: 'Удачи!', note: 'Перед экзаменом, собеседованием, визитом в префектуру.' },
      { greek: 'Félicitations !', transcription: 'Фелиситасьо́н !', translation: 'Поздравляю!', note: 'Для события: свадьба, работа, полученный титр де сежур.' },
      { greek: 'Je suis désolé pour le retard', transcription: 'Жё сюи́ дезоле́ пур лё рёта́р', translation: 'Извините за опоздание', note: 'Опоздание на 5–10 минут во Франции терпимо, но извиниться нужно.' },
      { greek: 'Vous permettez ?', transcription: 'Ву пермете́ ?', translation: 'Позволите?', note: 'Спросить, можно ли сесть рядом или пройти.' },
      { greek: 'Après vous', transcription: 'Апрэ́ ву', translation: 'После вас', note: 'В дверях и в очереди. Мелочь, которую замечают.' },
      { greek: 'Vous habitez dans le quartier ?', transcription: 'Ву-з-абите́ дан лё картье́ ?', translation: 'Вы живёте в этом районе?', note: 'Безопасный вопрос для начала разговора с соседом.' },
    ]
  },
  {
    id: 'shop', category: 'Магазин и рынок', icon: '🛒', color: '#000091',
    phrases: [
      { greek: 'Je voudrais…', transcription: 'Жё вудрэ́…', translation: 'Я хотел бы…', note: 'Вежливая форма от vouloir. «Je veux» в магазине звучит требовательно.' },
      { greek: 'C’est combien ?', transcription: 'Сэ комбье́н ?', translation: 'Сколько это стоит?', note: 'Короткий разговорный вариант «combien ça coûte ?».' },
      { greek: 'Un kilo, s’il vous plaît', transcription: 'Эн ки́ло, силь ву плэ', translation: 'Один килограмм, пожалуйста', note: 'На рынке говорят и «une livre» — это 500 граммов.' },
      { greek: 'Une tranche, s’il vous plaît', transcription: 'Юн транш, силь ву плэ', translation: 'Один кусочек (ломтик), пожалуйста', note: 'Так заказывают ветчину, сыр, пирог.' },
      { greek: 'Ce sera tout', transcription: 'Сё сёра́ ту', translation: 'Это всё', note: 'Ответ на ритуальное «et avec ceci ?».' },
      { greek: 'Vous avez la monnaie ?', transcription: 'Ву-з-аве́ ля монэ́ ?', translation: 'У вас есть сдача?', note: 'Monnaie — мелочь и сдача, argent — деньги вообще.' },
      { greek: 'Je peux payer par carte ?', transcription: 'Жё пё пэйе́ пар карт ?', translation: 'Можно заплатить картой?', note: 'В маленьких лавках бывает минимальная сумма для карты.' },
      { greek: 'Je regarde, merci', transcription: 'Жё рёга́рд, мерси́', translation: 'Я просто смотрю, спасибо', note: 'Вежливый ответ продавцу в одежном магазине.' },
      { greek: 'Vous l’avez en taille M ?', transcription: 'Ву лаве́ ан тай эм ?', translation: 'У вас есть это в размере M?', note: 'Размеры одежды французские, обувь — своя шкала.' },
      { greek: 'Je peux essayer ?', transcription: 'Жё пё эсэйе́ ?', translation: 'Можно примерить?', note: 'Примерочная — la cabine d’essayage.' },
      { greek: 'C’est trop cher pour moi', transcription: 'Сэ тро шэр пур муа́', translation: 'Для меня это слишком дорого', note: 'В магазинах не торгуются, но на рынке под закрытие цену иногда снижают.' },
      { greek: 'Il est frais ?', transcription: 'Иль э фрэ ?', translation: 'Он свежий?', note: 'Нормальный вопрос про рыбу, сыр, продукты на рынке.' },
      { greek: 'Je vais prendre celui-là', transcription: 'Жё вэ прандр сёлюи́-ля', translation: 'Я возьму вот этот', note: 'Celui-là / celle-là — «вот тот» мужского и женского рода.' },
      { greek: 'Vous fermez à quelle heure ?', transcription: 'Ву фэрме́ а келё́р ?', translation: 'Во сколько вы закрываетесь?', note: 'Многие магазины закрыты в воскресенье и на обед.' },
      { greek: 'Je peux avoir un sac ?', transcription: 'Жё пё авуа́р эн сак ?', translation: 'Можно пакет?', note: 'Пакеты платные, часто предлагают только большие.' },
    ]
  },
  {
    id: 'admin', category: 'Бюрократия и учреждения', icon: '📋', color: '#000091',
    phrases: [
      { greek: 'J’ai rendez-vous à dix heures', transcription: 'Жэ рандэву́ а ди-з-ёр', translation: 'У меня запись на десять', note: 'Почти всё во Франции — по записи, включая банк и врача.' },
      { greek: 'Je voudrais prendre rendez-vous', transcription: 'Жё вудрэ́ прандр рандэву́', translation: 'Я хотел бы записаться', note: 'Prendre rendez-vous — записаться, annuler — отменить.' },
      { greek: 'Quels documents faut-il ?', transcription: 'Кель докюма́н фо-ти́ль ?', translation: 'Какие документы нужны?', note: 'Задавайте этот вопрос заранее — список меняется от префектуры к префектуре.' },
      { greek: 'Il me manque un document', transcription: 'Иль мё манк эн докюма́н', translation: 'Мне не хватает документа', note: 'Manquer работает наоборот: не «я забыл», а «мне не хватает».' },
      { greek: 'Où dois-je signer ?', transcription: 'У дуа́-жё синье́ ?', translation: 'Где мне подписать?', note: 'Часто просят подписать и поставить дату от руки.' },
      { greek: 'C’est pour quelle date ?', transcription: 'Сэ пур кель дат ?', translation: 'На какую дату?', note: 'Про запись, доставку или срок ответа.' },
      { greek: 'Combien de temps ça prend ?', transcription: 'Комбье́н дё тан са пран ?', translation: 'Сколько времени это займёт?', note: 'Отвечают обычно «une quinzaine de jours» — примерно две недели.' },
      { greek: 'Je peux envoyer par mail ?', transcription: 'Жё пё анвуайе́ пар мэйль ?', translation: 'Можно отправить по электронной почте?', note: 'Иногда экономит целый повторный визит.' },
      { greek: 'Mon dossier est en cours', transcription: 'Мон досье́ э-т-ан кур', translation: 'Моё дело в процессе', note: 'En cours — статус любой заявки, от APL до вида на жительство.' },
      { greek: 'Je n’ai pas reçu de réponse', transcription: 'Жё нэ па рёсю́ дё репо́нс', translation: 'Я не получил ответа', note: 'Первая фраза для звонка или письма-напоминания.' },
      { greek: 'Vous pouvez me faire une attestation ?', transcription: 'Ву пуве́ мё фэр юн-н-атестасьо́н ?', translation: 'Можете сделать мне справку?', note: 'Attestation — справка, во Франции нужна почти для всего.' },
      { greek: 'C’est une erreur dans mon dossier', transcription: 'Сэ-т-юн эрё́р дан мон досье́', translation: 'В моём деле ошибка', note: 'Спокойный тон работает лучше, чем требование.' },
      { greek: 'À qui dois-je m’adresser ?', transcription: 'А ки дуа́-жё мадресе́ ?', translation: 'К кому мне обратиться?', note: 'Спасает, когда переводят из окна в окно.' },
      { greek: 'Je suis là pour le renouvellement', transcription: 'Жё сюи́ ля пур лё рёнувельма́н', translation: 'Я по поводу продления', note: 'Renouvellement — продление документа, подаётся заранее.' },
      { greek: 'Merci pour votre aide', transcription: 'Мерси́ пур вотр эд', translation: 'Спасибо за вашу помощь', note: 'Заканчивайте так любой разговор в учреждении.' },
    ]
  },
  {
    id: 'transport_ph', category: 'Транспорт и дорога', icon: '🚇', color: '#000091',
    phrases: [
      { greek: 'Un ticket, s’il vous plaît', transcription: 'Эн тикэ́, силь ву плэ', translation: 'Один билет, пожалуйста', note: 'Пачка билетов — «un carnet», выходит дешевле.' },
      { greek: 'C’est quelle ligne ?', transcription: 'Сэ кель линь ?', translation: 'Это какая линия?', note: 'Линии метро называют по номеру: la ligne 4.' },
      { greek: 'Je dois changer où ?', transcription: 'Жё дуа́ шанже́ у ?', translation: 'Где мне пересесть?', note: 'Пересадка — correspondance, указатели оранжевые.' },
      { greek: 'Ce bus va à la gare ?', transcription: 'Сё бюс ва а ля гар ?', translation: 'Этот автобус идёт на вокзал?', note: 'Водителю можно и нужно задавать вопросы на остановке.' },
      { greek: 'Le prochain train part quand ?', transcription: 'Лё прошэ́н трэн пар кан ?', translation: 'Когда следующий поезд?', note: 'Расписание — les horaires, задержка — le retard.' },
      { greek: 'Il y a une grève aujourd’hui ?', transcription: 'Илья́ юн грэв ожурдюи́ ?', translation: 'Сегодня забастовка?', note: 'Полезный вопрос: забастовки объявляют заранее, движение сокращают.' },
      { greek: 'Vous descendez ?', transcription: 'Ву дёсандэ́ ?', translation: 'Вы выходите?', note: 'Стандартный вопрос в переполненном вагоне перед выходом.' },
      { greek: 'Je descends à la prochaine', transcription: 'Жё дёса́н а ля прошэ́н', translation: 'Я выхожу на следующей', note: 'Подразумевается station — его опускают.' },
      { greek: 'C’est loin d’ici ?', transcription: 'Сэ луэ́н диси́ ?', translation: 'Это далеко отсюда?', note: 'Ответят в минутах ходьбы: «dix minutes à pied».' },
      { greek: 'Je vais à cette adresse', transcription: 'Жё вэ а сэт адрэ́с', translation: 'Мне нужно по этому адресу', note: 'Фраза для такси — покажите адрес на экране.' },
      { greek: 'Vous pouvez me déposer ici ?', transcription: 'Ву пуве́ мё депозе́ иси́ ?', translation: 'Можете высадить меня здесь?', note: 'Déposer — высадить пассажира.' },
      { greek: 'Le train a du retard', transcription: 'Лё трэн а дю рёта́р', translation: 'Поезд опаздывает', note: 'При задержке больше 30 минут SNCF частично возвращает деньги.' },
    ]
  },
  {
    id: 'restaurant_ph', category: 'Ресторан и кафе', icon: '🍽️', color: '#000091',
    phrases: [
      { greek: 'Une table pour deux', transcription: 'Юн табль пур дё', translation: 'Столик на двоих', note: 'Вечером в популярных местах почти всегда нужна бронь.' },
      { greek: 'La carte, s’il vous plaît', transcription: 'Ля карт, силь ву плэ', translation: 'Меню, пожалуйста', note: 'La carte — меню; le menu — комплексный обед по фиксированной цене.' },
      { greek: 'Qu’est-ce que vous me conseillez ?', transcription: 'Кэс-кё ву мё консэйе́ ?', translation: 'Что вы посоветуете?', note: 'Официанты советуют охотно, это часть культуры.' },
      { greek: 'Je prends la formule du jour', transcription: 'Жё пран ля формю́ль дю жур', translation: 'Я возьму дневное меню', note: 'Днём это самый выгодный вариант почти везде.' },
      { greek: 'Une carafe d’eau, s’il vous plaît', transcription: 'Юн кара́ф до, силь ву плэ', translation: 'Графин воды, пожалуйста', note: 'Водопроводная вода в графине бесплатна по закону.' },
      { greek: 'Sans gluten, c’est possible ?', transcription: 'Сан глютэ́н, сэ поси́бль ?', translation: 'Без глютена — возможно?', note: 'Так же спрашивают про lactose, viande, arachides.' },
      { greek: 'C’était délicieux', transcription: 'Сетэ́ делисьё́', translation: 'Было очень вкусно', note: 'Комплимент, который повару передают всерьёз.' },
      { greek: 'L’addition, s’il vous plaît', transcription: 'Лядисьо́н, силь ву плэ', translation: 'Счёт, пожалуйста', note: 'Счёт не приносят, пока не попросишь — это не забывчивость.' },
      { greek: 'Le service est compris ?', transcription: 'Лё серви́с э компри́ ?', translation: 'Обслуживание включено?', note: 'Почти всегда да. Сверху оставляют пару евро по желанию.' },
      { greek: 'On peut payer séparément ?', transcription: 'Он пё пэйе́ сепарема́н ?', translation: 'Можно заплатить раздельно?', note: 'Совершенно нормальная просьба, никого не удивляет.' },
      { greek: 'Un café, s’il vous plaît', transcription: 'Эн кафе́, силь ву плэ', translation: 'Один кофе, пожалуйста', note: 'Просто «un café» — это эспрессо. С молоком — un noisette или un crème.' },
      { greek: 'C’est pour emporter', transcription: 'Сэ пур ампортэ́', translation: 'Это с собой', note: 'Sur place — здесь, à emporter — навынос. Цена может отличаться.' },
    ]
  },
  {
    id: 'small_talk', category: 'Разговор и реакции', icon: '💬', color: '#000091',
    phrases: [
      { greek: 'Ah bon ?', transcription: 'А бо́н ?', translation: 'Правда? / Вот как?', note: 'Самая частая реакция удивления. Показывает, что вы слушаете.' },
      { greek: 'C’est vrai ?', transcription: 'Сэ врэ ?', translation: 'Это правда?', note: 'Чуть сильнее, чем «ah bon».' },
      { greek: 'Ça dépend', transcription: 'Са депа́н', translation: 'Смотря как / зависит', note: 'Идеальный ответ, когда не хотите отвечать однозначно.' },
      { greek: 'Je suis d’accord avec vous', transcription: 'Жё сюи́ дако́р аве́к ву', translation: 'Я с вами согласен', note: 'Être d’accord — быть согласным, а не «иметь согласие».' },
      { greek: 'Pas du tout', transcription: 'Па дю ту', translation: 'Вовсе нет', note: 'Твёрдое, но вежливое отрицание.' },
      { greek: 'Peut-être', transcription: 'Пёт-этр', translation: 'Может быть', note: 'Часто означает мягкое «нет».' },
      { greek: 'Ça m’étonne', transcription: 'Са метóн', translation: 'Меня это удивляет', note: 'Вежливый способ выразить сомнение в сказанном.' },
      { greek: 'Tant pis', transcription: 'Тан пи́', translation: 'Ну и ладно', note: 'Смирение с мелкой неудачей. Противоположность — «tant mieux».' },
      { greek: 'Ça vaut le coup', transcription: 'Са во лё ку', translation: 'Это того стоит', note: 'Про покупку, поездку, усилие.' },
      { greek: 'Je suis pressé', transcription: 'Жё сюи́ пресе́', translation: 'Я тороплюсь', note: 'Корректный способ свернуть затянувшийся разговор.' },
      { greek: 'On se voit bientôt', transcription: 'Он сё вуа́ бьенто́', translation: 'Скоро увидимся', note: 'Тёплое прощание с коллегой или соседом.' },
      { greek: 'Bon courage !', transcription: 'Бон кура́ж !', translation: 'Держись! / Удачи в делах!', note: 'Говорят тому, у кого впереди трудное дело или рабочий день.' },
    ]
  },
];

// Квиз «собери предложение»: words — правильный порядок, приложение перемешивает.
// diff: 1 — простое, 2 — длиннее и с непривычным порядком слов.
const QUIZ_CATEGORIES = [
  {
    id: 'basic_phrases', emoji: '👋', title: 'Базовые фразы',
    sentences: [
      { ru: 'Здравствуйте, как дела?', words: ['Bonjour,', 'ça', 'va', '?'], diff: 1 },
      { ru: 'Меня зовут Иван.', words: ['Je', 'm’appelle', 'Ivan.'], diff: 1 },
      { ru: 'Я из России.', words: ['Je', 'viens', 'de', 'Russie.'], diff: 1 },
      { ru: 'Я не понимаю.', words: ['Je', 'ne', 'comprends', 'pas.'], diff: 1 },
      { ru: 'Вы говорите по-английски?', words: ['Vous', 'parlez', 'anglais', '?'], diff: 1 },
      { ru: 'Спасибо большое, хорошего дня.', words: ['Merci', 'beaucoup,', 'bonne', 'journée.'], diff: 1 },
      { ru: 'Можете повторить, пожалуйста?', words: ['Vous', 'pouvez', 'répéter,', 's’il', 'vous', 'plaît', '?'], diff: 2 },
      { ru: 'Я немного говорю по-французски.', words: ['Je', 'parle', 'un', 'peu', 'français.'], diff: 1 },
      { ru: 'Я живу во Франции два года.', words: ['J’habite', 'en', 'France', 'depuis', 'deux', 'ans.'], diff: 2 },
      { ru: 'Извините, я тороплюсь.', words: ['Excusez-moi,', 'je', 'suis', 'pressé.'], diff: 1 },
      { ru: 'Можете говорить медленнее, пожалуйста?', words: ['Pouvez-vous', 'parler', 'plus', 'lentement,', 's’il', 'vous', 'plaît', '?'], diff: 2 },
      { ru: 'Я учу французский каждый день.', words: ['J’apprends', 'le', 'français', 'tous', 'les', 'jours.'], diff: 2 },
    ]
  },
  {
    id: 'shop_quiz', emoji: '🛒', title: 'Магазин и покупки',
    sentences: [
      { ru: 'Сколько это стоит?', words: ['C’est', 'combien', '?'], diff: 1 },
      { ru: 'Я хотел бы багет.', words: ['Je', 'voudrais', 'une', 'baguette.'], diff: 1 },
      { ru: 'Один килограмм, пожалуйста.', words: ['Un', 'kilo,', 's’il', 'vous', 'plaît.'], diff: 1 },
      { ru: 'Я плачу картой.', words: ['Je', 'paie', 'par', 'carte.'], diff: 1 },
      { ru: 'Это всё, спасибо.', words: ['Ce', 'sera', 'tout,', 'merci.'], diff: 1 },
      { ru: 'Для меня это слишком дорого.', words: ['C’est', 'trop', 'cher', 'pour', 'moi.'], diff: 2 },
      { ru: 'У вас есть это в размере M?', words: ['Vous', 'l’avez', 'en', 'taille', 'M', '?'], diff: 2 },
      { ru: 'Можно примерить эту куртку?', words: ['Je', 'peux', 'essayer', 'cette', 'veste', '?'], diff: 2 },
      { ru: 'Во сколько вы закрываетесь?', words: ['Vous', 'fermez', 'à', 'quelle', 'heure', '?'], diff: 2 },
      { ru: 'Можно пакет, пожалуйста?', words: ['Je', 'peux', 'avoir', 'un', 'sac,', 's’il', 'vous', 'plaît', '?'], diff: 2 },
      { ru: 'Я просто смотрю, спасибо.', words: ['Je', 'regarde,', 'merci.'], diff: 1 },
      { ru: 'Есть ли что-нибудь подешевле?', words: ['Est-ce', 'qu’il', 'y', 'a', 'moins', 'cher', '?'], diff: 2 },
    ]
  },
  {
    id: 'admin_quiz', emoji: '📋', title: 'Документы и учреждения',
    sentences: [
      { ru: 'У меня запись на десять часов.', words: ['J’ai', 'rendez-vous', 'à', 'dix', 'heures.'], diff: 1 },
      { ru: 'Я хотел бы записаться.', words: ['Je', 'voudrais', 'prendre', 'rendez-vous.'], diff: 1 },
      { ru: 'Какие документы нужны?', words: ['Quels', 'documents', 'faut-il', '?'], diff: 2 },
      { ru: 'Моё дело в процессе.', words: ['Mon', 'dossier', 'est', 'en', 'cours.'], diff: 1 },
      { ru: 'Мне не хватает одного документа.', words: ['Il', 'me', 'manque', 'un', 'document.'], diff: 2 },
      { ru: 'Я пришёл подать досье.', words: ['Je', 'viens', 'déposer', 'un', 'dossier.'], diff: 2 },
      { ru: 'Сколько времени это займёт?', words: ['Combien', 'de', 'temps', 'ça', 'prend', '?'], diff: 2 },
      { ru: 'Я не получил ответа.', words: ['Je', 'n’ai', 'pas', 'reçu', 'de', 'réponse.'], diff: 2 },
      { ru: 'Можно отправить это по почте?', words: ['Je', 'peux', 'l’envoyer', 'par', 'mail', '?'], diff: 2 },
      { ru: 'Где мне подписать?', words: ['Où', 'dois-je', 'signer', '?'], diff: 1 },
      { ru: 'Спасибо за вашу помощь.', words: ['Merci', 'pour', 'votre', 'aide.'], diff: 1 },
      { ru: 'Я по поводу продления вида на жительство.', words: ['Je', 'suis', 'là', 'pour', 'le', 'renouvellement', 'de', 'mon', 'titre', 'de', 'séjour.'], diff: 2 },
    ]
  },
  {
    id: 'health_quiz', emoji: '🏥', title: 'Здоровье и врач',
    sentences: [
      { ru: 'У меня болит голова.', words: ['J’ai', 'mal', 'à', 'la', 'tête.'], diff: 1 },
      { ru: 'Мне нужен врач.', words: ['J’ai', 'besoin', 'd’un', 'médecin.'], diff: 1 },
      { ru: 'У меня температура со вчера.', words: ['J’ai', 'de', 'la', 'fièvre', 'depuis', 'hier.'], diff: 2 },
      { ru: 'У меня аллергия на антибиотики.', words: ['Je', 'suis', 'allergique', 'aux', 'antibiotiques.'], diff: 2 },
      { ru: 'Мне нехорошо.', words: ['Je', 'ne', 'me', 'sens', 'pas', 'bien.'], diff: 1 },
      { ru: 'Где ближайшая аптека?', words: ['Où', 'est', 'la', 'pharmacie', 'la', 'plus', 'proche', '?'], diff: 2 },
      { ru: 'У вас есть что-нибудь от кашля?', words: ['Vous', 'avez', 'quelque', 'chose', 'contre', 'la', 'toux', '?'], diff: 2 },
      { ru: 'Вот мой рецепт.', words: ['Voici', 'mon', 'ordonnance.'], diff: 1 },
      { ru: 'Это срочно.', words: ['C’est', 'urgent.'], diff: 1 },
      { ru: 'Моя карта медстрахования ещё оформляется.', words: ['Ma', 'carte', 'Vitale', 'est', 'en', 'cours.'], diff: 2 },
      { ru: 'Есть ли побочные эффекты?', words: ['Est-ce', 'qu’il', 'y', 'a', 'des', 'effets', 'secondaires', '?'], diff: 2 },
      { ru: 'Мне нужна запись к врачу.', words: ['J’ai', 'besoin', 'd’un', 'rendez-vous', 'médical.'], diff: 2 },
    ]
  },
  {
    id: 'home_quiz', emoji: '🏠', title: 'Жильё и быт',
    sentences: [
      { ru: 'Я ищу квартиру.', words: ['Je', 'cherche', 'un', 'appartement.'], diff: 1 },
      { ru: 'Коммунальные платежи включены?', words: ['Les', 'charges', 'sont', 'comprises', '?'], diff: 2 },
      { ru: 'Сколько стоит аренда в месяц?', words: ['C’est', 'combien', 'le', 'loyer', 'par', 'mois', '?'], diff: 2 },
      { ru: 'Я хотел бы посмотреть квартиру.', words: ['Je', 'voudrais', 'visiter', 'l’appartement.'], diff: 2 },
      { ru: 'Отопление не работает.', words: ['Le', 'chauffage', 'ne', 'marche', 'pas.'], diff: 1 },
      { ru: 'Я потерял ключи.', words: ['J’ai', 'perdu', 'mes', 'clés.'], diff: 1 },
      { ru: 'Мне нужно связаться с хозяином.', words: ['Je', 'dois', 'contacter', 'le', 'propriétaire.'], diff: 2 },
      { ru: 'У соседей очень шумно.', words: ['Les', 'voisins', 'font', 'beaucoup', 'de', 'bruit.'], diff: 2 },
      { ru: 'Я подписываю договор завтра.', words: ['Je', 'signe', 'le', 'bail', 'demain.'], diff: 1 },
      { ru: 'Залог — это один месяц аренды.', words: ['Le', 'dépôt', 'de', 'garantie', 'est', 'd’un', 'mois', 'de', 'loyer.'], diff: 2 },
      { ru: 'Квартира меблированная?', words: ['L’appartement', 'est', 'meublé', '?'], diff: 1 },
      { ru: 'Мне нужно подтверждение адреса.', words: ['J’ai', 'besoin', 'd’un', 'justificatif', 'de', 'domicile.'], diff: 2 },
    ]
  },
  {
    id: 'transport_quiz', emoji: '🚇', title: 'Транспорт',
    sentences: [
      { ru: 'Один билет, пожалуйста.', words: ['Un', 'ticket,', 's’il', 'vous', 'plaît.'], diff: 1 },
      { ru: 'Этот автобус идёт на вокзал?', words: ['Ce', 'bus', 'va', 'à', 'la', 'gare', '?'], diff: 2 },
      { ru: 'Где мне пересесть?', words: ['Je', 'dois', 'changer', 'où', '?'], diff: 1 },
      { ru: 'Поезд опаздывает.', words: ['Le', 'train', 'a', 'du', 'retard.'], diff: 1 },
      { ru: 'Я выхожу на следующей.', words: ['Je', 'descends', 'à', 'la', 'prochaine.'], diff: 1 },
      { ru: 'Когда следующий поезд?', words: ['Le', 'prochain', 'train', 'part', 'quand', '?'], diff: 2 },
      { ru: 'Сегодня забастовка?', words: ['Il', 'y', 'a', 'une', 'grève', 'aujourd’hui', '?'], diff: 2 },
      { ru: 'Это далеко отсюда?', words: ['C’est', 'loin', 'd’ici', '?'], diff: 1 },
      { ru: 'Мне нужно по этому адресу.', words: ['Je', 'vais', 'à', 'cette', 'adresse.'], diff: 1 },
      { ru: 'Я хотел бы месячный проездной.', words: ['Je', 'voudrais', 'un', 'Navigo', 'mensuel.'], diff: 2 },
      { ru: 'Сколько остановок до Шатле?', words: ['Combien', 'd’arrêts', 'jusqu’à', 'Châtelet', '?'], diff: 2 },
      { ru: 'Извините, я выхожу.', words: ['Pardon,', 'je', 'descends.'], diff: 1 },
    ]
  },
];

const PLAN_30 = [
  {
    week: 1,
    theme: 'Основы — кто ты и что умеешь',
    color: '#000091',
    days: [
      { day: 1, topic: 'Приветствия и вежливость', focus: 'Bonjour, merci, s’il vous plaît, au revoir', type: 'vocab' },
      { day: 2, topic: 'Глагол être — «быть»', focus: 'Je suis russe, je suis en France', type: 'grammar' },
      { day: 3, topic: 'Глагол avoir — «иметь»', focus: 'J’ai rendez-vous, j’ai 30 ans, j’ai froid', type: 'grammar' },
      { day: 4, topic: 'Vouloir и pouvoir', focus: 'Je voudrais… / Je peux… — просьба и возможность', type: 'grammar' },
      { day: 5, topic: 'Сценарий: знакомство и булочная', focus: 'Первый разговор без английского', type: 'scenario' },
      { day: 6, topic: 'Повторение недели 1', focus: 'Все слова и фразы недели', type: 'review' },
      { day: 7, topic: 'Аудит недели 1', focus: 'Тест и разбор ошибок', type: 'audit' }
    ]
  },
  {
    week: 2,
    theme: 'Быт — магазин, деньги, дом',
    color: '#000091',
    days: [
      { day: 8, topic: 'Числа и цены', focus: 'От 1 до 100, «ça fait…»', type: 'vocab' },
      { day: 9, topic: 'Правильные глаголы на -er', focus: 'parler, acheter, payer, habiter', type: 'grammar' },
      { day: 10, topic: 'Магазин и рынок', focus: 'Вес, количество, оплата картой', type: 'vocab' },
      { day: 11, topic: 'Вопросы: est-ce que и инверсия', focus: 'Три способа задать вопрос', type: 'grammar' },
      { day: 12, topic: 'Сценарий: банк', focus: 'Открыть счёт, попросить RIB', type: 'scenario' },
      { day: 13, topic: 'Повторение недели 2', focus: 'Слова быта и денег', type: 'review' },
      { day: 14, topic: 'Аудит недели 2', focus: 'Тест и разбор ошибок', type: 'audit' }
    ]
  },
  {
    week: 3,
    theme: 'Бюрократия и здоровье',
    color: '#000091',
    days: [
      { day: 15, topic: 'Документы: словарь', focus: 'Dossier, attestation, justificatif', type: 'vocab' },
      { day: 16, topic: 'Прошедшее время passé composé', focus: 'J’ai déposé, je suis allé', type: 'grammar' },
      { day: 17, topic: 'Сценарий: префектура', focus: 'Подача досье на titre de séjour', type: 'scenario' },
      { day: 18, topic: 'Тело и симптомы', focus: 'Avoir mal à… — описать боль', type: 'vocab' },
      { day: 19, topic: 'Сценарий: врач и аптека', focus: 'Приём, рецепт, carte Vitale', type: 'scenario' },
      { day: 20, topic: 'Повторение недели 3', focus: 'Бюрократия и здоровье', type: 'review' },
      { day: 21, topic: 'Аудит недели 3', focus: 'Тест и разбор ошибок', type: 'audit' }
    ]
  },
  {
    week: 4,
    theme: 'Свобода — жильё, транспорт, разговор',
    color: '#000091',
    days: [
      { day: 22, topic: 'Жильё: словарь аренды', focus: 'Bail, charges, dépôt de garantie', type: 'vocab' },
      { day: 23, topic: 'Будущее время futur simple', focus: 'Je signerai, on verra', type: 'grammar' },
      { day: 24, topic: 'Сценарий: просмотр квартиры', focus: 'Вопросы агенту и подача досье', type: 'scenario' },
      { day: 25, topic: 'Транспорт и направления', focus: 'Métro, RER, correspondance', type: 'vocab' },
      { day: 26, topic: 'Сценарий: CAF и пособия', focus: 'Заявка на APL', type: 'scenario' },
      { day: 27, topic: 'Разговорные реакции', focus: 'Ah bon, ça dépend, tant pis', type: 'vocab' },
      { day: 28, topic: 'Финальный аудит месяца', focus: 'Полный тест и план на следующий месяц', type: 'audit' }
    ]
  },
];

const ACHIEVEMENTS = [
  { id: 'first_lesson',    icon: '🎓', title: 'Первый шаг',        desc: 'Пройти первый урок',                  category: 'уроки' },
  { id: 'perfect_lesson',  icon: '💎', title: 'Перфекционист',     desc: 'Урок без единой ошибки',              category: 'уроки' },
  { id: 'lessons_5',       icon: '📚', title: 'Студент',           desc: '5 уроков пройдено',                   category: 'уроки' },
  { id: 'lessons_10',      icon: '🏆', title: 'Упорный',           desc: '10 уроков пройдено',                  category: 'уроки' },
  { id: 'lessons_30',      icon: '🦾', title: 'Марафонец',         desc: '30 уроков пройдено',                  category: 'уроки' },
  { id: 'streak_3',        icon: '🔥', title: 'На разогреве',      desc: '3 дня подряд',                        category: 'стрик' },
  { id: 'streak_7',        icon: '🌟', title: 'Неделя силы',       desc: '7 дней подряд',                       category: 'стрик' },
  { id: 'streak_30',       icon: '👑', title: 'Легенда',           desc: '30 дней подряд',                      category: 'стрик' },
  { id: 'scenario_first',  icon: '🎭', title: 'Актёр',             desc: 'Первый сценарий пройден',             category: 'сценарии' },
  { id: 'scenarios_all',   icon: '🇫🇷', title: 'Готов к Франции',  desc: 'Все сценарии пройдены',               category: 'сценарии' },
  { id: 'nie_master',      icon: '📋', title: 'Мастер бюрократии', desc: 'Сценарий «В префектуре» пройден',     category: 'сценарии' },
  { id: 'weak_conquered',  icon: '⚔️', title: 'Победил ошибки',    desc: 'Пройден урок повторения слабых мест', category: 'прогресс' },
  { id: 'xp_500',          icon: '⚡', title: 'Энергичный',        desc: '500 XP набрано',                      category: 'прогресс' },
  { id: 'xp_2000',         icon: '💫', title: 'Опытный',           desc: '2000 XP набрано',                     category: 'прогресс' },
  { id: 'level_5',         icon: '🚀', title: 'Взлёт',             desc: 'Достигнут 5-й уровень',               category: 'прогресс' },
  { id: 'vocab_master',    icon: '🧠', title: 'Хранитель слов',    desc: 'Выучено 200 слов из словаря',         category: 'прогресс' },
];
