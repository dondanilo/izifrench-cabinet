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
  },
  {
    id: 63, infinitive: "aider", translation: "помогать",
    transcription: "эдэ́",
    example: {"greek": "Vous pouvez m'aider, s'il vous plaît ?", "ru": "Можете мне помочь, пожалуйста?"},
    present: {"je": "aide", "tu": "aides", "il/elle": "aide", "nous": "aidons", "vous": "aidez", "ils/elles": "aident"},
    preterite: {"je": "ai aidé", "tu": "as aidé", "il/elle": "a aidé", "nous": "avons aidé", "vous": "avez aidé", "ils/elles": "ont aidé"},
    future: {"je": "aiderai", "tu": "aideras", "il/elle": "aidera", "nous": "aiderons", "vous": "aiderez", "ils/elles": "aideront"}
  },
  {
    id: 64, infinitive: "apporter", translation: "приносить",
    transcription: "апортэ́",
    example: {"greek": "Apportez votre passeport et le justificatif.", "ru": "Принесите паспорт и подтверждающий документ."},
    present: {"je": "apporte", "tu": "apportes", "il/elle": "apporte", "nous": "apportons", "vous": "apportez", "ils/elles": "apportent"},
    preterite: {"je": "ai apporté", "tu": "as apporté", "il/elle": "a apporté", "nous": "avons apporté", "vous": "avez apporté", "ils/elles": "ont apporté"},
    future: {"je": "apporterai", "tu": "apporteras", "il/elle": "apportera", "nous": "apporterons", "vous": "apporterez", "ils/elles": "apporteront"}
  },
  {
    id: 65, infinitive: "arrêter", translation: "останавливать / прекращать",
    transcription: "арэтэ́",
    example: {"greek": "J'ai arrêté de fumer il y a un an.", "ru": "Я бросил курить год назад."},
    present: {"je": "arrête", "tu": "arrêtes", "il/elle": "arrête", "nous": "arrêtons", "vous": "arrêtez", "ils/elles": "arrêtent"},
    preterite: {"je": "ai arrêté", "tu": "as arrêté", "il/elle": "a arrêté", "nous": "avons arrêté", "vous": "avez arrêté", "ils/elles": "ont arrêté"},
    future: {"je": "arrêterai", "tu": "arrêteras", "il/elle": "arrêtera", "nous": "arrêterons", "vous": "arrêterez", "ils/elles": "arrêteront"}
  },
  {
    id: 66, infinitive: "assurer", translation: "страховать / обеспечивать",
    transcription: "асюрэ́",
    example: {"greek": "Il faut assurer le logement avant la signature.", "ru": "Жильё нужно застраховать до подписания договора."},
    present: {"je": "assure", "tu": "assures", "il/elle": "assure", "nous": "assurons", "vous": "assurez", "ils/elles": "assurent"},
    preterite: {"je": "ai assuré", "tu": "as assuré", "il/elle": "a assuré", "nous": "avons assuré", "vous": "avez assuré", "ils/elles": "ont assuré"},
    future: {"je": "assurerai", "tu": "assureras", "il/elle": "assurera", "nous": "assurerons", "vous": "assurerez", "ils/elles": "assureront"}
  },
  {
    id: 67, infinitive: "avancer", translation: "продвигаться",
    transcription: "авансэ́",
    example: {"greek": "Mon dossier avance lentement.", "ru": "Моё дело продвигается медленно."},
    present: {"je": "avance", "tu": "avances", "il/elle": "avance", "nous": "avançons", "vous": "avancez", "ils/elles": "avancent"},
    preterite: {"je": "ai avancé", "tu": "as avancé", "il/elle": "a avancé", "nous": "avons avancé", "vous": "avez avancé", "ils/elles": "ont avancé"},
    future: {"je": "avancerai", "tu": "avanceras", "il/elle": "avancera", "nous": "avancerons", "vous": "avancerez", "ils/elles": "avanceront"}
  },
  {
    id: 68, infinitive: "baisser", translation: "опускать / снижать",
    transcription: "бэсэ́",
    example: {"greek": "Baissez le chauffage, il fait trop chaud.", "ru": "Убавьте отопление, слишком жарко."},
    present: {"je": "baisse", "tu": "baisses", "il/elle": "baisse", "nous": "baissons", "vous": "baissez", "ils/elles": "baissent"},
    preterite: {"je": "ai baissé", "tu": "as baissé", "il/elle": "a baissé", "nous": "avons baissé", "vous": "avez baissé", "ils/elles": "ont baissé"},
    future: {"je": "baisserai", "tu": "baisseras", "il/elle": "baissera", "nous": "baisserons", "vous": "baisserez", "ils/elles": "baisseront"}
  },
  {
    id: 69, infinitive: "bouger", translation: "двигаться",
    transcription: "бужэ́",
    example: {"greek": "Ne bougez pas, je reviens tout de suite.", "ru": "Не двигайтесь, я сейчас вернусь."},
    present: {"je": "bouge", "tu": "bouges", "il/elle": "bouge", "nous": "bougeons", "vous": "bougez", "ils/elles": "bougent"},
    preterite: {"je": "ai bougé", "tu": "as bougé", "il/elle": "a bougé", "nous": "avons bougé", "vous": "avez bougé", "ils/elles": "ont bougé"},
    future: {"je": "bougerai", "tu": "bougeras", "il/elle": "bougera", "nous": "bougerons", "vous": "bougerez", "ils/elles": "bougeront"}
  },
  {
    id: 70, infinitive: "casser", translation: "ломать",
    transcription: "касэ́",
    example: {"greek": "J'ai cassé un verre, désolé.", "ru": "Я разбил стакан, извините."},
    present: {"je": "casse", "tu": "casses", "il/elle": "casse", "nous": "cassons", "vous": "cassez", "ils/elles": "cassent"},
    preterite: {"je": "ai cassé", "tu": "as cassé", "il/elle": "a cassé", "nous": "avons cassé", "vous": "avez cassé", "ils/elles": "ont cassé"},
    future: {"je": "casserai", "tu": "casseras", "il/elle": "cassera", "nous": "casserons", "vous": "casserez", "ils/elles": "casseront"}
  },
  {
    id: 71, infinitive: "chanter", translation: "петь",
    transcription: "шантэ́",
    example: {"greek": "Mes enfants chantent en français à l'école.", "ru": "Мои дети поют по-французски в школе."},
    present: {"je": "chante", "tu": "chantes", "il/elle": "chante", "nous": "chantons", "vous": "chantez", "ils/elles": "chantent"},
    preterite: {"je": "ai chanté", "tu": "as chanté", "il/elle": "a chanté", "nous": "avons chanté", "vous": "avez chanté", "ils/elles": "ont chanté"},
    future: {"je": "chanterai", "tu": "chanteras", "il/elle": "chantera", "nous": "chanterons", "vous": "chanterez", "ils/elles": "chanteront"}
  },
  {
    id: 72, infinitive: "chauffer", translation: "греть",
    transcription: "шофэ́",
    example: {"greek": "L'appartement chauffe mal en hiver.", "ru": "Квартира плохо прогревается зимой."},
    present: {"je": "chauffe", "tu": "chauffes", "il/elle": "chauffe", "nous": "chauffons", "vous": "chauffez", "ils/elles": "chauffent"},
    preterite: {"je": "ai chauffé", "tu": "as chauffé", "il/elle": "a chauffé", "nous": "avons chauffé", "vous": "avez chauffé", "ils/elles": "ont chauffé"},
    future: {"je": "chaufferai", "tu": "chaufferas", "il/elle": "chauffera", "nous": "chaufferons", "vous": "chaufferez", "ils/elles": "chaufferont"}
  },
  {
    id: 73, infinitive: "compter", translation: "считать",
    transcription: "контэ́",
    example: {"greek": "Je compte rester deux ans en France.", "ru": "Я рассчитываю пробыть во Франции два года."},
    present: {"je": "compte", "tu": "comptes", "il/elle": "compte", "nous": "comptons", "vous": "comptez", "ils/elles": "comptent"},
    preterite: {"je": "ai compté", "tu": "as compté", "il/elle": "a compté", "nous": "avons compté", "vous": "avez compté", "ils/elles": "ont compté"},
    future: {"je": "compterai", "tu": "compteras", "il/elle": "comptera", "nous": "compterons", "vous": "compterez", "ils/elles": "compteront"}
  },
  {
    id: 74, infinitive: "conseiller", translation: "советовать",
    transcription: "консэйе́",
    example: {"greek": "Qu'est-ce que vous me conseillez ?", "ru": "Что вы мне посоветуете?"},
    present: {"je": "conseille", "tu": "conseilles", "il/elle": "conseille", "nous": "conseillons", "vous": "conseillez", "ils/elles": "conseillent"},
    preterite: {"je": "ai conseillé", "tu": "as conseillé", "il/elle": "a conseillé", "nous": "avons conseillé", "vous": "avez conseillé", "ils/elles": "ont conseillé"},
    future: {"je": "conseillerai", "tu": "conseilleras", "il/elle": "conseillera", "nous": "conseillerons", "vous": "conseillerez", "ils/elles": "conseilleront"}
  },
  {
    id: 75, infinitive: "continuer", translation: "продолжать",
    transcription: "континюэ́",
    example: {"greek": "Continuez tout droit jusqu'au feu.", "ru": "Продолжайте прямо до светофора."},
    present: {"je": "continue", "tu": "continues", "il/elle": "continue", "nous": "continuons", "vous": "continuez", "ils/elles": "continuent"},
    preterite: {"je": "ai continué", "tu": "as continué", "il/elle": "a continué", "nous": "avons continué", "vous": "avez continué", "ils/elles": "ont continué"},
    future: {"je": "continuerai", "tu": "continueras", "il/elle": "continuera", "nous": "continuerons", "vous": "continuerez", "ils/elles": "continueront"}
  },
  {
    id: 76, infinitive: "couper", translation: "резать / отключать",
    transcription: "купэ́",
    example: {"greek": "Ils ont coupé l'eau ce matin.", "ru": "Сегодня утром отключили воду."},
    present: {"je": "coupe", "tu": "coupes", "il/elle": "coupe", "nous": "coupons", "vous": "coupez", "ils/elles": "coupent"},
    preterite: {"je": "ai coupé", "tu": "as coupé", "il/elle": "a coupé", "nous": "avons coupé", "vous": "avez coupé", "ils/elles": "ont coupé"},
    future: {"je": "couperai", "tu": "couperas", "il/elle": "coupera", "nous": "couperons", "vous": "couperez", "ils/elles": "couperont"}
  },
  {
    id: 77, infinitive: "coûter", translation: "стоить",
    transcription: "кутэ́",
    example: {"greek": "Ça coûte combien par mois ?", "ru": "Сколько это стоит в месяц?"},
    present: {"je": "coûte", "tu": "coûtes", "il/elle": "coûte", "nous": "coûtons", "vous": "coûtez", "ils/elles": "coûtent"},
    preterite: {"je": "ai coûté", "tu": "as coûté", "il/elle": "a coûté", "nous": "avons coûté", "vous": "avez coûté", "ils/elles": "ont coûté"},
    future: {"je": "coûterai", "tu": "coûteras", "il/elle": "coûtera", "nous": "coûterons", "vous": "coûterez", "ils/elles": "coûteront"}
  },
  {
    id: 78, infinitive: "créer", translation: "создавать",
    transcription: "креэ́",
    example: {"greek": "Je dois créer un compte sur le site.", "ru": "Мне нужно создать аккаунт на сайте."},
    present: {"je": "crée", "tu": "crées", "il/elle": "crée", "nous": "créons", "vous": "créez", "ils/elles": "créent"},
    preterite: {"je": "ai créé", "tu": "as créé", "il/elle": "a créé", "nous": "avons créé", "vous": "avez créé", "ils/elles": "ont créé"},
    future: {"je": "créerai", "tu": "créeras", "il/elle": "créera", "nous": "créerons", "vous": "créerez", "ils/elles": "créeront"}
  },
  {
    id: 79, infinitive: "danser", translation: "танцевать",
    transcription: "дансэ́",
    example: {"greek": "On danse au bal des pompiers le 14 juillet.", "ru": "Четырнадцатого июля танцуют на балу у пожарных."},
    present: {"je": "danse", "tu": "danses", "il/elle": "danse", "nous": "dansons", "vous": "dansez", "ils/elles": "dansent"},
    preterite: {"je": "ai dansé", "tu": "as dansé", "il/elle": "a dansé", "nous": "avons dansé", "vous": "avez dansé", "ils/elles": "ont dansé"},
    future: {"je": "danserai", "tu": "danseras", "il/elle": "dansera", "nous": "danserons", "vous": "danserez", "ils/elles": "danseront"}
  },
  {
    id: 80, infinitive: "décider", translation: "решать",
    transcription: "десидэ́",
    example: {"greek": "Nous avons décidé de déménager à Lyon.", "ru": "Мы решили переехать в Лион."},
    present: {"je": "décide", "tu": "décides", "il/elle": "décide", "nous": "décidons", "vous": "décidez", "ils/elles": "décident"},
    preterite: {"je": "ai décidé", "tu": "as décidé", "il/elle": "a décidé", "nous": "avons décidé", "vous": "avez décidé", "ils/elles": "ont décidé"},
    future: {"je": "déciderai", "tu": "décideras", "il/elle": "décidera", "nous": "déciderons", "vous": "déciderez", "ils/elles": "décideront"}
  },
  {
    id: 81, infinitive: "déclarer", translation: "заявлять / декларировать",
    transcription: "деклярэ́",
    example: {"greek": "Il faut déclarer tout changement à la CAF.", "ru": "О любом изменении нужно сообщить в CAF."},
    present: {"je": "déclare", "tu": "déclares", "il/elle": "déclare", "nous": "déclarons", "vous": "déclarez", "ils/elles": "déclarent"},
    preterite: {"je": "ai déclaré", "tu": "as déclaré", "il/elle": "a déclaré", "nous": "avons déclaré", "vous": "avez déclaré", "ils/elles": "ont déclaré"},
    future: {"je": "déclarerai", "tu": "déclareras", "il/elle": "déclarera", "nous": "déclarerons", "vous": "déclarerez", "ils/elles": "déclareront"}
  },
  {
    id: 82, infinitive: "déjeuner", translation: "обедать",
    transcription: "дежёнэ́",
    example: {"greek": "On déjeune ensemble à midi ?", "ru": "Пообедаем вместе в полдень?"},
    present: {"je": "déjeune", "tu": "déjeunes", "il/elle": "déjeune", "nous": "déjeunons", "vous": "déjeunez", "ils/elles": "déjeunent"},
    preterite: {"je": "ai déjeuné", "tu": "as déjeuné", "il/elle": "a déjeuné", "nous": "avons déjeuné", "vous": "avez déjeuné", "ils/elles": "ont déjeuné"},
    future: {"je": "déjeunerai", "tu": "déjeuneras", "il/elle": "déjeunera", "nous": "déjeunerons", "vous": "déjeunerez", "ils/elles": "déjeuneront"}
  },
  {
    id: 83, infinitive: "déménager", translation: "переезжать",
    transcription: "деменажэ́",
    example: {"greek": "Nous déménageons le mois prochain.", "ru": "Мы переезжаем в следующем месяце."},
    present: {"je": "déménage", "tu": "déménages", "il/elle": "déménage", "nous": "déménageons", "vous": "déménagez", "ils/elles": "déménagent"},
    preterite: {"je": "ai déménagé", "tu": "as déménagé", "il/elle": "a déménagé", "nous": "avons déménagé", "vous": "avez déménagé", "ils/elles": "ont déménagé"},
    future: {"je": "déménagerai", "tu": "déménageras", "il/elle": "déménagera", "nous": "déménagerons", "vous": "déménagerez", "ils/elles": "déménageront"}
  },
  {
    id: 84, infinitive: "dépenser", translation: "тратить",
    transcription: "депансэ́",
    example: {"greek": "Je dépense trop en courses.", "ru": "Я слишком много трачу на продукты."},
    present: {"je": "dépense", "tu": "dépenses", "il/elle": "dépense", "nous": "dépensons", "vous": "dépensez", "ils/elles": "dépensent"},
    preterite: {"je": "ai dépensé", "tu": "as dépensé", "il/elle": "a dépensé", "nous": "avons dépensé", "vous": "avez dépensé", "ils/elles": "ont dépensé"},
    future: {"je": "dépenserai", "tu": "dépenseras", "il/elle": "dépensera", "nous": "dépenserons", "vous": "dépenserez", "ils/elles": "dépenseront"}
  },
  {
    id: 85, infinitive: "dessiner", translation: "рисовать",
    transcription: "дэсинэ́",
    example: {"greek": "Ma fille dessine tous les soirs.", "ru": "Моя дочь рисует каждый вечер."},
    present: {"je": "dessine", "tu": "dessines", "il/elle": "dessine", "nous": "dessinons", "vous": "dessinez", "ils/elles": "dessinent"},
    preterite: {"je": "ai dessiné", "tu": "as dessiné", "il/elle": "a dessiné", "nous": "avons dessiné", "vous": "avez dessiné", "ils/elles": "ont dessiné"},
    future: {"je": "dessinerai", "tu": "dessineras", "il/elle": "dessinera", "nous": "dessinerons", "vous": "dessinerez", "ils/elles": "dessineront"}
  },
  {
    id: 86, infinitive: "discuter", translation: "обсуждать",
    transcription: "дискютэ́",
    example: {"greek": "On peut en discuter demain ?", "ru": "Можем обсудить это завтра?"},
    present: {"je": "discute", "tu": "discutes", "il/elle": "discute", "nous": "discutons", "vous": "discutez", "ils/elles": "discutent"},
    preterite: {"je": "ai discuté", "tu": "as discuté", "il/elle": "a discuté", "nous": "avons discuté", "vous": "avez discuté", "ils/elles": "ont discuté"},
    future: {"je": "discuterai", "tu": "discuteras", "il/elle": "discutera", "nous": "discuterons", "vous": "discuterez", "ils/elles": "discuteront"}
  },
  {
    id: 87, infinitive: "économiser", translation: "экономить",
    transcription: "экономизэ́",
    example: {"greek": "J'économise pour un appartement.", "ru": "Я коплю на квартиру."},
    present: {"je": "économise", "tu": "économises", "il/elle": "économise", "nous": "économisons", "vous": "économisez", "ils/elles": "économisent"},
    preterite: {"je": "ai économisé", "tu": "as économisé", "il/elle": "a économisé", "nous": "avons économisé", "vous": "avez économisé", "ils/elles": "ont économisé"},
    future: {"je": "économiserai", "tu": "économiseras", "il/elle": "économisera", "nous": "économiserons", "vous": "économiserez", "ils/elles": "économiseront"}
  },
  {
    id: 88, infinitive: "emmener", translation: "отводить / брать с собой",
    transcription: "амёнэ́",
    example: {"greek": "J'emmène les enfants à l'école à huit heures.", "ru": "Я отвожу детей в школу в восемь."},
    present: {"je": "emmène", "tu": "emmènes", "il/elle": "emmène", "nous": "emmenons", "vous": "emmenez", "ils/elles": "emmènent"},
    preterite: {"je": "ai emmené", "tu": "as emmené", "il/elle": "a emmené", "nous": "avons emmené", "vous": "avez emmené", "ils/elles": "ont emmené"},
    future: {"je": "emmènerai", "tu": "emmèneras", "il/elle": "emmènera", "nous": "emmènerons", "vous": "emmènerez", "ils/elles": "emmèneront"}
  },
  {
    id: 89, infinitive: "employer", translation: "нанимать / использовать",
    transcription: "амплуайе́",
    example: {"greek": "Cette entreprise emploie trente personnes.", "ru": "Эта компания нанимает тридцать человек."},
    present: {"je": "emploie", "tu": "emploies", "il/elle": "emploie", "nous": "employons", "vous": "employez", "ils/elles": "emploient"},
    preterite: {"je": "ai employé", "tu": "as employé", "il/elle": "a employé", "nous": "avons employé", "vous": "avez employé", "ils/elles": "ont employé"},
    future: {"je": "emploierai", "tu": "emploieras", "il/elle": "emploiera", "nous": "emploierons", "vous": "emploierez", "ils/elles": "emploieront"}
  },
  {
    id: 90, infinitive: "emprunter", translation: "брать взаймы",
    transcription: "ампрюнтэ́",
    example: {"greek": "J'ai emprunté un livre à la médiathèque.", "ru": "Я взял книгу в медиатеке."},
    present: {"je": "emprunte", "tu": "empruntes", "il/elle": "emprunte", "nous": "empruntons", "vous": "empruntez", "ils/elles": "empruntent"},
    preterite: {"je": "ai emprunté", "tu": "as emprunté", "il/elle": "a emprunté", "nous": "avons emprunté", "vous": "avez emprunté", "ils/elles": "ont emprunté"},
    future: {"je": "emprunterai", "tu": "emprunteras", "il/elle": "empruntera", "nous": "emprunterons", "vous": "emprunterez", "ils/elles": "emprunteront"}
  },
  {
    id: 91, infinitive: "enseigner", translation: "преподавать",
    transcription: "ансэнье́",
    example: {"greek": "Elle enseigne le français aux étrangers.", "ru": "Она преподаёт французский иностранцам."},
    present: {"je": "enseigne", "tu": "enseignes", "il/elle": "enseigne", "nous": "enseignons", "vous": "enseignez", "ils/elles": "enseignent"},
    preterite: {"je": "ai enseigné", "tu": "as enseigné", "il/elle": "a enseigné", "nous": "avons enseigné", "vous": "avez enseigné", "ils/elles": "ont enseigné"},
    future: {"je": "enseignerai", "tu": "enseigneras", "il/elle": "enseignera", "nous": "enseignerons", "vous": "enseignerez", "ils/elles": "enseigneront"}
  },
  {
    id: 92, infinitive: "étudier", translation: "учиться / изучать",
    transcription: "этюдье́",
    example: {"greek": "J'étudie le français depuis six mois.", "ru": "Я изучаю французский шесть месяцев."},
    present: {"je": "étudie", "tu": "étudies", "il/elle": "étudie", "nous": "étudions", "vous": "étudiez", "ils/elles": "étudient"},
    preterite: {"je": "ai étudié", "tu": "as étudié", "il/elle": "a étudié", "nous": "avons étudié", "vous": "avez étudié", "ils/elles": "ont étudié"},
    future: {"je": "étudierai", "tu": "étudieras", "il/elle": "étudiera", "nous": "étudierons", "vous": "étudierez", "ils/elles": "étudieront"}
  },
  {
    id: 93, infinitive: "éviter", translation: "избегать",
    transcription: "эвитэ́",
    example: {"greek": "Évitez le RER aux heures de pointe.", "ru": "Избегайте RER в час пик."},
    present: {"je": "évite", "tu": "évites", "il/elle": "évite", "nous": "évitons", "vous": "évitez", "ils/elles": "évitent"},
    preterite: {"je": "ai évité", "tu": "as évité", "il/elle": "a évité", "nous": "avons évité", "vous": "avez évité", "ils/elles": "ont évité"},
    future: {"je": "éviterai", "tu": "éviteras", "il/elle": "évitera", "nous": "éviterons", "vous": "éviterez", "ils/elles": "éviteront"}
  },
  {
    id: 94, infinitive: "exister", translation: "существовать",
    transcription: "эгзистэ́",
    example: {"greek": "Ce tarif n'existe plus.", "ru": "Этого тарифа больше нет."},
    present: {"je": "existe", "tu": "existes", "il/elle": "existe", "nous": "existons", "vous": "existez", "ils/elles": "existent"},
    preterite: {"je": "ai existé", "tu": "as existé", "il/elle": "a existé", "nous": "avons existé", "vous": "avez existé", "ils/elles": "ont existé"},
    future: {"je": "existerai", "tu": "existeras", "il/elle": "existera", "nous": "existerons", "vous": "existerez", "ils/elles": "existeront"}
  },
  {
    id: 95, infinitive: "garder", translation: "хранить / присматривать",
    transcription: "гардэ́",
    example: {"greek": "Gardez le ticket de caisse.", "ru": "Сохраните чек."},
    present: {"je": "garde", "tu": "gardes", "il/elle": "garde", "nous": "gardons", "vous": "gardez", "ils/elles": "gardent"},
    preterite: {"je": "ai gardé", "tu": "as gardé", "il/elle": "a gardé", "nous": "avons gardé", "vous": "avez gardé", "ils/elles": "ont gardé"},
    future: {"je": "garderai", "tu": "garderas", "il/elle": "gardera", "nous": "garderons", "vous": "garderez", "ils/elles": "garderont"}
  },
  {
    id: 96, infinitive: "gagner", translation: "зарабатывать / выигрывать",
    transcription: "ганьэ́",
    example: {"greek": "Je gagne moins qu'avant, mais je vis mieux.", "ru": "Я зарабатываю меньше, но живу лучше."},
    present: {"je": "gagne", "tu": "gagnes", "il/elle": "gagne", "nous": "gagnons", "vous": "gagnez", "ils/elles": "gagnent"},
    preterite: {"je": "ai gagné", "tu": "as gagné", "il/elle": "a gagné", "nous": "avons gagné", "vous": "avez gagné", "ils/elles": "ont gagné"},
    future: {"je": "gagnerai", "tu": "gagneras", "il/elle": "gagnera", "nous": "gagnerons", "vous": "gagnerez", "ils/elles": "gagneront"}
  },
  {
    id: 97, infinitive: "garer", translation: "парковать",
    transcription: "гарэ́",
    example: {"greek": "Où est-ce que je peux garer la voiture ?", "ru": "Где я могу припарковать машину?"},
    present: {"je": "gare", "tu": "gares", "il/elle": "gare", "nous": "garons", "vous": "garez", "ils/elles": "garent"},
    preterite: {"je": "ai garé", "tu": "as garé", "il/elle": "a garé", "nous": "avons garé", "vous": "avez garé", "ils/elles": "ont garé"},
    future: {"je": "garerai", "tu": "gareras", "il/elle": "garera", "nous": "garerons", "vous": "garerez", "ils/elles": "gareront"}
  },
  {
    id: 98, infinitive: "goûter", translation: "пробовать на вкус",
    transcription: "гутэ́",
    example: {"greek": "Je peux goûter ce fromage ?", "ru": "Можно попробовать этот сыр?"},
    present: {"je": "goûte", "tu": "goûtes", "il/elle": "goûte", "nous": "goûtons", "vous": "goûtez", "ils/elles": "goûtent"},
    preterite: {"je": "ai goûté", "tu": "as goûté", "il/elle": "a goûté", "nous": "avons goûté", "vous": "avez goûté", "ils/elles": "ont goûté"},
    future: {"je": "goûterai", "tu": "goûteras", "il/elle": "goûtera", "nous": "goûterons", "vous": "goûterez", "ils/elles": "goûteront"}
  },
  {
    id: 99, infinitive: "habiller", translation: "одевать",
    transcription: "абийе́",
    example: {"greek": "J'habille les enfants avant le petit-déjeuner.", "ru": "Я одеваю детей до завтрака."},
    present: {"je": "habille", "tu": "habilles", "il/elle": "habille", "nous": "habillons", "vous": "habillez", "ils/elles": "habillent"},
    preterite: {"je": "ai habillé", "tu": "as habillé", "il/elle": "a habillé", "nous": "avons habillé", "vous": "avez habillé", "ils/elles": "ont habillé"},
    future: {"je": "habillerai", "tu": "habilleras", "il/elle": "habillera", "nous": "habillerons", "vous": "habillerez", "ils/elles": "habilleront"}
  },
  {
    id: 100, infinitive: "hésiter", translation: "колебаться",
    transcription: "эзитэ́",
    example: {"greek": "N'hésitez pas à me contacter.", "ru": "Не стесняйтесь со мной связаться."},
    present: {"je": "hésite", "tu": "hésites", "il/elle": "hésite", "nous": "hésitons", "vous": "hésitez", "ils/elles": "hésitent"},
    preterite: {"je": "ai hésité", "tu": "as hésité", "il/elle": "a hésité", "nous": "avons hésité", "vous": "avez hésité", "ils/elles": "ont hésité"},
    future: {"je": "hésiterai", "tu": "hésiteras", "il/elle": "hésitera", "nous": "hésiterons", "vous": "hésiterez", "ils/elles": "hésiteront"}
  },
  {
    id: 101, infinitive: "indiquer", translation: "указывать",
    transcription: "эндикэ́",
    example: {"greek": "Pourriez-vous m'indiquer la sortie ?", "ru": "Не подскажете, где выход?"},
    present: {"je": "indique", "tu": "indiques", "il/elle": "indique", "nous": "indiquons", "vous": "indiquez", "ils/elles": "indiquent"},
    preterite: {"je": "ai indiqué", "tu": "as indiqué", "il/elle": "a indiqué", "nous": "avons indiqué", "vous": "avez indiqué", "ils/elles": "ont indiqué"},
    future: {"je": "indiquerai", "tu": "indiqueras", "il/elle": "indiquera", "nous": "indiquerons", "vous": "indiquerez", "ils/elles": "indiqueront"}
  },
  {
    id: 102, infinitive: "inscrire", translation: "записывать / регистрировать",
    transcription: "энскри́р",
    example: {"greek": "Je voudrais inscrire mon fils à la cantine.", "ru": "Я хотел бы записать сына в столовую."},
    present: {"je": "inscris", "tu": "inscris", "il/elle": "inscrit", "nous": "inscrivons", "vous": "inscrivez", "ils/elles": "inscrivent"},
    preterite: {"je": "ai inscrit", "tu": "as inscrit", "il/elle": "a inscrit", "nous": "avons inscrit", "vous": "avez inscrit", "ils/elles": "ont inscrit"},
    future: {"je": "inscrirai", "tu": "inscriras", "il/elle": "inscrira", "nous": "inscrirons", "vous": "inscrirez", "ils/elles": "inscriront"}
  },
  {
    id: 103, infinitive: "inviter", translation: "приглашать",
    transcription: "энвитэ́",
    example: {"greek": "Nos voisins nous ont invités à dîner.", "ru": "Соседи пригласили нас на ужин."},
    present: {"je": "invite", "tu": "invites", "il/elle": "invite", "nous": "invitons", "vous": "invitez", "ils/elles": "invitent"},
    preterite: {"je": "ai invité", "tu": "as invité", "il/elle": "a invité", "nous": "avons invité", "vous": "avez invité", "ils/elles": "ont invité"},
    future: {"je": "inviterai", "tu": "inviteras", "il/elle": "invitera", "nous": "inviterons", "vous": "inviterez", "ils/elles": "inviteront"}
  },
  {
    id: 104, infinitive: "jouer", translation: "играть",
    transcription: "жуэ́",
    example: {"greek": "Les enfants jouent au foot dans le parc.", "ru": "Дети играют в футбол в парке."},
    present: {"je": "joue", "tu": "joues", "il/elle": "joue", "nous": "jouons", "vous": "jouez", "ils/elles": "jouent"},
    preterite: {"je": "ai joué", "tu": "as joué", "il/elle": "a joué", "nous": "avons joué", "vous": "avez joué", "ils/elles": "ont joué"},
    future: {"je": "jouerai", "tu": "joueras", "il/elle": "jouera", "nous": "jouerons", "vous": "jouerez", "ils/elles": "joueront"}
  },
  {
    id: 105, infinitive: "laisser", translation: "оставлять / позволять",
    transcription: "лэсэ́",
    example: {"greek": "Laissez un message après le bip.", "ru": "Оставьте сообщение после сигнала."},
    present: {"je": "laisse", "tu": "laisses", "il/elle": "laisse", "nous": "laissons", "vous": "laissez", "ils/elles": "laissent"},
    preterite: {"je": "ai laissé", "tu": "as laissé", "il/elle": "a laissé", "nous": "avons laissé", "vous": "avez laissé", "ils/elles": "ont laissé"},
    future: {"je": "laisserai", "tu": "laisseras", "il/elle": "laissera", "nous": "laisserons", "vous": "laisserez", "ils/elles": "laisseront"}
  },
  {
    id: 106, infinitive: "laver", translation: "мыть / стирать",
    transcription: "лавэ́",
    example: {"greek": "Je lave le linge le dimanche.", "ru": "Я стираю бельё по воскресеньям."},
    present: {"je": "lave", "tu": "laves", "il/elle": "lave", "nous": "lavons", "vous": "lavez", "ils/elles": "lavent"},
    preterite: {"je": "ai lavé", "tu": "as lavé", "il/elle": "a lavé", "nous": "avons lavé", "vous": "avez lavé", "ils/elles": "ont lavé"},
    future: {"je": "laverai", "tu": "laveras", "il/elle": "lavera", "nous": "laverons", "vous": "laverez", "ils/elles": "laveront"}
  },
  {
    id: 107, infinitive: "lever", translation: "поднимать",
    transcription: "лёвэ́",
    example: {"greek": "Levez la main si vous avez une question.", "ru": "Поднимите руку, если есть вопрос."},
    present: {"je": "lève", "tu": "lèves", "il/elle": "lève", "nous": "levons", "vous": "levez", "ils/elles": "lèvent"},
    preterite: {"je": "ai levé", "tu": "as levé", "il/elle": "a levé", "nous": "avons levé", "vous": "avez levé", "ils/elles": "ont levé"},
    future: {"je": "lèverai", "tu": "lèveras", "il/elle": "lèvera", "nous": "lèverons", "vous": "lèverez", "ils/elles": "lèveront"}
  },
  {
    id: 108, infinitive: "marcher", translation: "ходить / работать (о технике)",
    transcription: "маршэ́",
    example: {"greek": "L'ascenseur ne marche pas depuis lundi.", "ru": "Лифт не работает с понедельника."},
    present: {"je": "marche", "tu": "marches", "il/elle": "marche", "nous": "marchons", "vous": "marchez", "ils/elles": "marchent"},
    preterite: {"je": "ai marché", "tu": "as marché", "il/elle": "a marché", "nous": "avons marché", "vous": "avez marché", "ils/elles": "ont marché"},
    future: {"je": "marcherai", "tu": "marcheras", "il/elle": "marchera", "nous": "marcherons", "vous": "marcherez", "ils/elles": "marcheront"}
  },
  {
    id: 109, infinitive: "montrer", translation: "показывать",
    transcription: "монтрэ́",
    example: {"greek": "Montrez-moi votre carte d'identité.", "ru": "Покажите мне ваше удостоверение личности."},
    present: {"je": "montre", "tu": "montres", "il/elle": "montre", "nous": "montrons", "vous": "montrez", "ils/elles": "montrent"},
    preterite: {"je": "ai montré", "tu": "as montré", "il/elle": "a montré", "nous": "avons montré", "vous": "avez montré", "ils/elles": "ont montré"},
    future: {"je": "montrerai", "tu": "montreras", "il/elle": "montrera", "nous": "montrerons", "vous": "montrerez", "ils/elles": "montreront"}
  },
  {
    id: 110, infinitive: "nettoyer", translation: "убирать / чистить",
    transcription: "нэтуайе́",
    example: {"greek": "Je nettoie l'appartement le samedi.", "ru": "Я убираю квартиру по субботам."},
    present: {"je": "nettoie", "tu": "nettoies", "il/elle": "nettoie", "nous": "nettoyons", "vous": "nettoyez", "ils/elles": "nettoient"},
    preterite: {"je": "ai nettoyé", "tu": "as nettoyé", "il/elle": "a nettoyé", "nous": "avons nettoyé", "vous": "avez nettoyé", "ils/elles": "ont nettoyé"},
    future: {"je": "nettoierai", "tu": "nettoieras", "il/elle": "nettoiera", "nous": "nettoierons", "vous": "nettoierez", "ils/elles": "nettoieront"}
  },
  {
    id: 111, infinitive: "noter", translation: "записывать / отмечать",
    transcription: "нотэ́",
    example: {"greek": "Notez bien la date du rendez-vous.", "ru": "Запишите дату приёма."},
    present: {"je": "note", "tu": "notes", "il/elle": "note", "nous": "notons", "vous": "notez", "ils/elles": "notent"},
    preterite: {"je": "ai noté", "tu": "as noté", "il/elle": "a noté", "nous": "avons noté", "vous": "avez noté", "ils/elles": "ont noté"},
    future: {"je": "noterai", "tu": "noteras", "il/elle": "notera", "nous": "noterons", "vous": "noterez", "ils/elles": "noteront"}
  },
  {
    id: 112, infinitive: "occuper", translation: "занимать",
    transcription: "окюпэ́",
    example: {"greek": "Cette place est occupée ?", "ru": "Это место занято?"},
    present: {"je": "occupe", "tu": "occupes", "il/elle": "occupe", "nous": "occupons", "vous": "occupez", "ils/elles": "occupent"},
    preterite: {"je": "ai occupé", "tu": "as occupé", "il/elle": "a occupé", "nous": "avons occupé", "vous": "avez occupé", "ils/elles": "ont occupé"},
    future: {"je": "occuperai", "tu": "occuperas", "il/elle": "occupera", "nous": "occuperons", "vous": "occuperez", "ils/elles": "occuperont"}
  },
  {
    id: 113, infinitive: "organiser", translation: "организовывать",
    transcription: "организэ́",
    example: {"greek": "On organise une fête pour les voisins.", "ru": "Мы организуем праздник для соседей."},
    present: {"je": "organise", "tu": "organises", "il/elle": "organise", "nous": "organisons", "vous": "organisez", "ils/elles": "organisent"},
    preterite: {"je": "ai organisé", "tu": "as organisé", "il/elle": "a organisé", "nous": "avons organisé", "vous": "avez organisé", "ils/elles": "ont organisé"},
    future: {"je": "organiserai", "tu": "organiseras", "il/elle": "organisera", "nous": "organiserons", "vous": "organiserez", "ils/elles": "organiseront"}
  },
  {
    id: 114, infinitive: "participer", translation: "участвовать",
    transcription: "партисипэ́",
    example: {"greek": "Je participe à un cours de français le soir.", "ru": "Я хожу на вечерние курсы французского."},
    present: {"je": "participe", "tu": "participes", "il/elle": "participe", "nous": "participons", "vous": "participez", "ils/elles": "participent"},
    preterite: {"je": "ai participé", "tu": "as participé", "il/elle": "a participé", "nous": "avons participé", "vous": "avez participé", "ils/elles": "ont participé"},
    future: {"je": "participerai", "tu": "participeras", "il/elle": "participera", "nous": "participerons", "vous": "participerez", "ils/elles": "participeront"}
  },
  {
    id: 115, infinitive: "passer", translation: "проходить / проводить время",
    transcription: "пасэ́",
    example: {"greek": "Je passe à la banque cet après-midi.", "ru": "Я зайду в банк во второй половине дня."},
    present: {"je": "passe", "tu": "passes", "il/elle": "passe", "nous": "passons", "vous": "passez", "ils/elles": "passent"},
    preterite: {"je": "suis passé(e)", "tu": "es passé(e)", "il/elle": "est passé(e)", "nous": "sommes passé(e)s", "vous": "êtes passé(e)(s)", "ils/elles": "sont passé(e)s"},
    future: {"je": "passerai", "tu": "passeras", "il/elle": "passera", "nous": "passerons", "vous": "passerez", "ils/elles": "passeront"}
  },
  {
    id: 116, infinitive: "porter", translation: "носить",
    transcription: "портэ́",
    example: {"greek": "Il porte un manteau noir.", "ru": "Он носит чёрное пальто."},
    present: {"je": "porte", "tu": "portes", "il/elle": "porte", "nous": "portons", "vous": "portez", "ils/elles": "portent"},
    preterite: {"je": "ai porté", "tu": "as porté", "il/elle": "a porté", "nous": "avons porté", "vous": "avez porté", "ils/elles": "ont porté"},
    future: {"je": "porterai", "tu": "porteras", "il/elle": "portera", "nous": "porterons", "vous": "porterez", "ils/elles": "porteront"}
  },
  {
    id: 117, infinitive: "poser", translation: "класть / задавать (вопрос)",
    transcription: "позэ́",
    example: {"greek": "Je peux vous poser une question ?", "ru": "Можно задать вам вопрос?"},
    present: {"je": "pose", "tu": "poses", "il/elle": "pose", "nous": "posons", "vous": "posez", "ils/elles": "posent"},
    preterite: {"je": "ai posé", "tu": "as posé", "il/elle": "a posé", "nous": "avons posé", "vous": "avez posé", "ils/elles": "ont posé"},
    future: {"je": "poserai", "tu": "poseras", "il/elle": "posera", "nous": "poserons", "vous": "poserez", "ils/elles": "poseront"}
  },
  {
    id: 118, infinitive: "pousser", translation: "толкать",
    transcription: "пусэ́",
    example: {"greek": "Poussez la porte, elle n'est pas fermée.", "ru": "Толкните дверь, она не заперта."},
    present: {"je": "pousse", "tu": "pousses", "il/elle": "pousse", "nous": "poussons", "vous": "poussez", "ils/elles": "poussent"},
    preterite: {"je": "ai poussé", "tu": "as poussé", "il/elle": "a poussé", "nous": "avons poussé", "vous": "avez poussé", "ils/elles": "ont poussé"},
    future: {"je": "pousserai", "tu": "pousseras", "il/elle": "poussera", "nous": "pousserons", "vous": "pousserez", "ils/elles": "pousseront"}
  },
  {
    id: 119, infinitive: "préparer", translation: "готовить",
    transcription: "препарэ́",
    example: {"greek": "Je prépare le dossier pour la préfecture.", "ru": "Я готовлю досье для префектуры."},
    present: {"je": "prépare", "tu": "prépares", "il/elle": "prépare", "nous": "préparons", "vous": "préparez", "ils/elles": "préparent"},
    preterite: {"je": "ai préparé", "tu": "as préparé", "il/elle": "a préparé", "nous": "avons préparé", "vous": "avez préparé", "ils/elles": "ont préparé"},
    future: {"je": "préparerai", "tu": "prépareras", "il/elle": "préparera", "nous": "préparerons", "vous": "préparerez", "ils/elles": "prépareront"}
  },
  {
    id: 120, infinitive: "présenter", translation: "представлять / предъявлять",
    transcription: "презантэ́",
    example: {"greek": "Présentez-vous au guichet numéro trois.", "ru": "Подойдите к окну номер три."},
    present: {"je": "présente", "tu": "présentes", "il/elle": "présente", "nous": "présentons", "vous": "présentez", "ils/elles": "présentent"},
    preterite: {"je": "ai présenté", "tu": "as présenté", "il/elle": "a présenté", "nous": "avons présenté", "vous": "avez présenté", "ils/elles": "ont présenté"},
    future: {"je": "présenterai", "tu": "présenteras", "il/elle": "présentera", "nous": "présenterons", "vous": "présenterez", "ils/elles": "présenteront"}
  },
  {
    id: 121, infinitive: "prêter", translation: "одалживать",
    transcription: "прэтэ́",
    example: {"greek": "Tu peux me prêter ton stylo ?", "ru": "Можешь одолжить мне ручку?"},
    present: {"je": "prête", "tu": "prêtes", "il/elle": "prête", "nous": "prêtons", "vous": "prêtez", "ils/elles": "prêtent"},
    preterite: {"je": "ai prêté", "tu": "as prêté", "il/elle": "a prêté", "nous": "avons prêté", "vous": "avez prêté", "ils/elles": "ont prêté"},
    future: {"je": "prêterai", "tu": "prêteras", "il/elle": "prêtera", "nous": "prêterons", "vous": "prêterez", "ils/elles": "prêteront"}
  },
  {
    id: 122, infinitive: "quitter", translation: "покидать",
    transcription: "китэ́",
    example: {"greek": "Je quitte le bureau à dix-huit heures.", "ru": "Я ухожу из офиса в шесть вечера."},
    present: {"je": "quitte", "tu": "quittes", "il/elle": "quitte", "nous": "quittons", "vous": "quittez", "ils/elles": "quittent"},
    preterite: {"je": "ai quitté", "tu": "as quitté", "il/elle": "a quitté", "nous": "avons quitté", "vous": "avez quitté", "ils/elles": "ont quitté"},
    future: {"je": "quitterai", "tu": "quitteras", "il/elle": "quittera", "nous": "quitterons", "vous": "quitterez", "ils/elles": "quitteront"}
  },
  {
    id: 123, infinitive: "raconter", translation: "рассказывать",
    transcription: "раконтэ́",
    example: {"greek": "Racontez-moi ce qui s'est passé.", "ru": "Расскажите мне, что произошло."},
    present: {"je": "raconte", "tu": "racontes", "il/elle": "raconte", "nous": "racontons", "vous": "racontez", "ils/elles": "racontent"},
    preterite: {"je": "ai raconté", "tu": "as raconté", "il/elle": "a raconté", "nous": "avons raconté", "vous": "avez raconté", "ils/elles": "ont raconté"},
    future: {"je": "raconterai", "tu": "raconteras", "il/elle": "racontera", "nous": "raconterons", "vous": "raconterez", "ils/elles": "raconteront"}
  },
  {
    id: 124, infinitive: "ranger", translation: "убирать / раскладывать",
    transcription: "ранжэ́",
    example: {"greek": "Range tes affaires avant de sortir.", "ru": "Убери свои вещи перед выходом."},
    present: {"je": "range", "tu": "ranges", "il/elle": "range", "nous": "rangeons", "vous": "rangez", "ils/elles": "rangent"},
    preterite: {"je": "ai rangé", "tu": "as rangé", "il/elle": "a rangé", "nous": "avons rangé", "vous": "avez rangé", "ils/elles": "ont rangé"},
    future: {"je": "rangerai", "tu": "rangeras", "il/elle": "rangera", "nous": "rangerons", "vous": "rangerez", "ils/elles": "rangeront"}
  },
  {
    id: 125, infinitive: "réfléchir", translation: "размышлять",
    transcription: "рефлеши́р",
    example: {"greek": "Je vais réfléchir et je vous rappelle.", "ru": "Я подумаю и перезвоню вам."},
    present: {"je": "réfléchis", "tu": "réfléchis", "il/elle": "réfléchit", "nous": "réfléchissons", "vous": "réfléchissez", "ils/elles": "réfléchissent"},
    preterite: {"je": "ai réfléchi", "tu": "as réfléchi", "il/elle": "a réfléchi", "nous": "avons réfléchi", "vous": "avez réfléchi", "ils/elles": "ont réfléchi"},
    future: {"je": "réfléchirai", "tu": "réfléchiras", "il/elle": "réfléchira", "nous": "réfléchirons", "vous": "réfléchirez", "ils/elles": "réfléchiront"}
  },
  {
    id: 126, infinitive: "refuser", translation: "отказывать",
    transcription: "рефюзэ́",
    example: {"greek": "La banque a refusé ma demande.", "ru": "Банк отказал в моей заявке."},
    present: {"je": "refuse", "tu": "refuses", "il/elle": "refuse", "nous": "refusons", "vous": "refusez", "ils/elles": "refusent"},
    preterite: {"je": "ai refusé", "tu": "as refusé", "il/elle": "a refusé", "nous": "avons refusé", "vous": "avez refusé", "ils/elles": "ont refusé"},
    future: {"je": "refuserai", "tu": "refuseras", "il/elle": "refusera", "nous": "refuserons", "vous": "refuserez", "ils/elles": "refuseront"}
  },
  {
    id: 127, infinitive: "regretter", translation: "сожалеть",
    transcription: "рёгрэтэ́",
    example: {"greek": "Je regrette, c'est complet.", "ru": "Сожалею, всё занято."},
    present: {"je": "regrette", "tu": "regrettes", "il/elle": "regrette", "nous": "regrettons", "vous": "regrettez", "ils/elles": "regrettent"},
    preterite: {"je": "ai regretté", "tu": "as regretté", "il/elle": "a regretté", "nous": "avons regretté", "vous": "avez regretté", "ils/elles": "ont regretté"},
    future: {"je": "regretterai", "tu": "regretteras", "il/elle": "regrettera", "nous": "regretterons", "vous": "regretterez", "ils/elles": "regretteront"}
  },
  {
    id: 128, infinitive: "remercier", translation: "благодарить",
    transcription: "рёмерсье́",
    example: {"greek": "Je vous remercie pour votre aide.", "ru": "Благодарю вас за помощь."},
    present: {"je": "remercie", "tu": "remercies", "il/elle": "remercie", "nous": "remercions", "vous": "remerciez", "ils/elles": "remercient"},
    preterite: {"je": "ai remercié", "tu": "as remercié", "il/elle": "a remercié", "nous": "avons remercié", "vous": "avez remercié", "ils/elles": "ont remercié"},
    future: {"je": "remercierai", "tu": "remercieras", "il/elle": "remerciera", "nous": "remercierons", "vous": "remercierez", "ils/elles": "remercieront"}
  },
  {
    id: 129, infinitive: "rencontrer", translation: "встречать",
    transcription: "ранконтрэ́",
    example: {"greek": "J'ai rencontré mes voisins hier.", "ru": "Вчера я познакомился с соседями."},
    present: {"je": "rencontre", "tu": "rencontres", "il/elle": "rencontre", "nous": "rencontrons", "vous": "rencontrez", "ils/elles": "rencontrent"},
    preterite: {"je": "ai rencontré", "tu": "as rencontré", "il/elle": "a rencontré", "nous": "avons rencontré", "vous": "avez rencontré", "ils/elles": "ont rencontré"},
    future: {"je": "rencontrerai", "tu": "rencontreras", "il/elle": "rencontrera", "nous": "rencontrerons", "vous": "rencontrerez", "ils/elles": "rencontreront"}
  },
  {
    id: 130, infinitive: "rentrer", translation: "возвращаться домой",
    transcription: "рантрэ́",
    example: {"greek": "Je rentre vers dix-neuf heures.", "ru": "Я возвращаюсь домой около семи."},
    present: {"je": "rentre", "tu": "rentres", "il/elle": "rentre", "nous": "rentrons", "vous": "rentrez", "ils/elles": "rentrent"},
    preterite: {"je": "suis rentré(e)", "tu": "es rentré(e)", "il/elle": "est rentré(e)", "nous": "sommes rentré(e)s", "vous": "êtes rentré(e)(s)", "ils/elles": "sont rentré(e)s"},
    future: {"je": "rentrerai", "tu": "rentreras", "il/elle": "rentrera", "nous": "rentrerons", "vous": "rentrerez", "ils/elles": "rentreront"}
  },
  {
    id: 131, infinitive: "réparer", translation: "чинить",
    transcription: "репарэ́",
    example: {"greek": "Le propriétaire doit réparer la chaudière.", "ru": "Владелец должен починить котёл."},
    present: {"je": "répare", "tu": "répares", "il/elle": "répare", "nous": "réparons", "vous": "réparez", "ils/elles": "réparent"},
    preterite: {"je": "ai réparé", "tu": "as réparé", "il/elle": "a réparé", "nous": "avons réparé", "vous": "avez réparé", "ils/elles": "ont réparé"},
    future: {"je": "réparerai", "tu": "répareras", "il/elle": "réparera", "nous": "réparerons", "vous": "réparerez", "ils/elles": "répareront"}
  },
  {
    id: 132, infinitive: "réserver", translation: "бронировать",
    transcription: "резервэ́",
    example: {"greek": "J'ai réservé une table pour deux.", "ru": "Я забронировал столик на двоих."},
    present: {"je": "réserve", "tu": "réserves", "il/elle": "réserve", "nous": "réservons", "vous": "réservez", "ils/elles": "réservent"},
    preterite: {"je": "ai réservé", "tu": "as réservé", "il/elle": "a réservé", "nous": "avons réservé", "vous": "avez réservé", "ils/elles": "ont réservé"},
    future: {"je": "réserverai", "tu": "réserveras", "il/elle": "réservera", "nous": "réserverons", "vous": "réserverez", "ils/elles": "réserveront"}
  },
  {
    id: 133, infinitive: "retourner", translation: "возвращаться",
    transcription: "рётурнэ́",
    example: {"greek": "Je dois retourner à la préfecture lundi.", "ru": "В понедельник мне нужно вернуться в префектуру."},
    present: {"je": "retourne", "tu": "retournes", "il/elle": "retourne", "nous": "retournons", "vous": "retournez", "ils/elles": "retournent"},
    preterite: {"je": "suis retourné(e)", "tu": "es retourné(e)", "il/elle": "est retourné(e)", "nous": "sommes retourné(e)s", "vous": "êtes retourné(e)(s)", "ils/elles": "sont retourné(e)s"},
    future: {"je": "retournerai", "tu": "retourneras", "il/elle": "retournera", "nous": "retournerons", "vous": "retournerez", "ils/elles": "retourneront"}
  },
  {
    id: 134, infinitive: "réussir", translation: "добиваться успеха",
    transcription: "реюси́р",
    example: {"greek": "J'ai réussi mon examen de français.", "ru": "Я сдал экзамен по французскому."},
    present: {"je": "réussis", "tu": "réussis", "il/elle": "réussit", "nous": "réussissons", "vous": "réussissez", "ils/elles": "réussissent"},
    preterite: {"je": "ai réussi", "tu": "as réussi", "il/elle": "a réussi", "nous": "avons réussi", "vous": "avez réussi", "ils/elles": "ont réussi"},
    future: {"je": "réussirai", "tu": "réussiras", "il/elle": "réussira", "nous": "réussirons", "vous": "réussirez", "ils/elles": "réussiront"}
  },
  {
    id: 135, infinitive: "sembler", translation: "казаться",
    transcription: "самблэ́",
    example: {"greek": "Ça me semble trop cher.", "ru": "Мне это кажется слишком дорогим."},
    present: {"je": "semble", "tu": "sembles", "il/elle": "semble", "nous": "semblons", "vous": "semblez", "ils/elles": "semblent"},
    preterite: {"je": "ai semblé", "tu": "as semblé", "il/elle": "a semblé", "nous": "avons semblé", "vous": "avez semblé", "ils/elles": "ont semblé"},
    future: {"je": "semblerai", "tu": "sembleras", "il/elle": "semblera", "nous": "semblerons", "vous": "semblerez", "ils/elles": "sembleront"}
  },
  {
    id: 136, infinitive: "souhaiter", translation: "желать",
    transcription: "суэтэ́",
    example: {"greek": "Je souhaite résilier mon abonnement.", "ru": "Я хочу расторгнуть абонемент."},
    present: {"je": "souhaite", "tu": "souhaites", "il/elle": "souhaite", "nous": "souhaitons", "vous": "souhaitez", "ils/elles": "souhaitent"},
    preterite: {"je": "ai souhaité", "tu": "as souhaité", "il/elle": "a souhaité", "nous": "avons souhaité", "vous": "avez souhaité", "ils/elles": "ont souhaité"},
    future: {"je": "souhaiterai", "tu": "souhaiteras", "il/elle": "souhaitera", "nous": "souhaiterons", "vous": "souhaiterez", "ils/elles": "souhaiteront"}
  },
  {
    id: 137, infinitive: "terminer", translation: "заканчивать",
    transcription: "терминэ́",
    example: {"greek": "Je termine le travail à seize heures.", "ru": "Я заканчиваю работу в четыре."},
    present: {"je": "termine", "tu": "termines", "il/elle": "termine", "nous": "terminons", "vous": "terminez", "ils/elles": "terminent"},
    preterite: {"je": "ai terminé", "tu": "as terminé", "il/elle": "a terminé", "nous": "avons terminé", "vous": "avez terminé", "ils/elles": "ont terminé"},
    future: {"je": "terminerai", "tu": "termineras", "il/elle": "terminera", "nous": "terminerons", "vous": "terminerez", "ils/elles": "termineront"}
  },
  {
    id: 138, infinitive: "tomber", translation: "падать",
    transcription: "томбэ́",
    example: {"greek": "Il est tombé dans l'escalier.", "ru": "Он упал на лестнице."},
    present: {"je": "tombe", "tu": "tombes", "il/elle": "tombe", "nous": "tombons", "vous": "tombez", "ils/elles": "tombent"},
    preterite: {"je": "suis tombé(e)", "tu": "es tombé(e)", "il/elle": "est tombé(e)", "nous": "sommes tombé(e)s", "vous": "êtes tombé(e)(s)", "ils/elles": "sont tombé(e)s"},
    future: {"je": "tomberai", "tu": "tomberas", "il/elle": "tombera", "nous": "tomberons", "vous": "tomberez", "ils/elles": "tomberont"}
  },
  {
    id: 139, infinitive: "toucher", translation: "трогать / получать деньги",
    transcription: "тушэ́",
    example: {"greek": "Je touche mon salaire le cinq du mois.", "ru": "Я получаю зарплату пятого числа."},
    present: {"je": "touche", "tu": "touches", "il/elle": "touche", "nous": "touchons", "vous": "touchez", "ils/elles": "touchent"},
    preterite: {"je": "ai touché", "tu": "as touché", "il/elle": "a touché", "nous": "avons touché", "vous": "avez touché", "ils/elles": "ont touché"},
    future: {"je": "toucherai", "tu": "toucheras", "il/elle": "touchera", "nous": "toucherons", "vous": "toucherez", "ils/elles": "toucheront"}
  },
  {
    id: 140, infinitive: "tourner", translation: "поворачивать",
    transcription: "турнэ́",
    example: {"greek": "Tournez à droite après la boulangerie.", "ru": "Поверните направо после булочной."},
    present: {"je": "tourne", "tu": "tournes", "il/elle": "tourne", "nous": "tournons", "vous": "tournez", "ils/elles": "tournent"},
    preterite: {"je": "ai tourné", "tu": "as tourné", "il/elle": "a tourné", "nous": "avons tourné", "vous": "avez tourné", "ils/elles": "ont tourné"},
    future: {"je": "tournerai", "tu": "tourneras", "il/elle": "tournera", "nous": "tournerons", "vous": "tournerez", "ils/elles": "tourneront"}
  },
  {
    id: 141, infinitive: "traverser", translation: "пересекать",
    transcription: "траверсэ́",
    example: {"greek": "Traversez au passage piéton.", "ru": "Переходите по пешеходному переходу."},
    present: {"je": "traverse", "tu": "traverses", "il/elle": "traverse", "nous": "traversons", "vous": "traversez", "ils/elles": "traversent"},
    preterite: {"je": "ai traversé", "tu": "as traversé", "il/elle": "a traversé", "nous": "avons traversé", "vous": "avez traversé", "ils/elles": "ont traversé"},
    future: {"je": "traverserai", "tu": "traverseras", "il/elle": "traversera", "nous": "traverserons", "vous": "traverserez", "ils/elles": "traverseront"}
  },
  {
    id: 142, infinitive: "utiliser", translation: "использовать",
    transcription: "ютилизэ́",
    example: {"greek": "J'utilise l'application tous les jours.", "ru": "Я пользуюсь приложением каждый день."},
    present: {"je": "utilise", "tu": "utilises", "il/elle": "utilise", "nous": "utilisons", "vous": "utilisez", "ils/elles": "utilisent"},
    preterite: {"je": "ai utilisé", "tu": "as utilisé", "il/elle": "a utilisé", "nous": "avons utilisé", "vous": "avez utilisé", "ils/elles": "ont utilisé"},
    future: {"je": "utiliserai", "tu": "utiliseras", "il/elle": "utilisera", "nous": "utiliserons", "vous": "utiliserez", "ils/elles": "utiliseront"}
  },
  {
    id: 143, infinitive: "visiter", translation: "осматривать / посещать",
    transcription: "визитэ́",
    example: {"greek": "Nous visitons l'appartement samedi.", "ru": "В субботу мы смотрим квартиру."},
    present: {"je": "visite", "tu": "visites", "il/elle": "visite", "nous": "visitons", "vous": "visitez", "ils/elles": "visitent"},
    preterite: {"je": "ai visité", "tu": "as visité", "il/elle": "a visité", "nous": "avons visité", "vous": "avez visité", "ils/elles": "ont visité"},
    future: {"je": "visiterai", "tu": "visiteras", "il/elle": "visitera", "nous": "visiterons", "vous": "visiterez", "ils/elles": "visiteront"}
  },
  {
    id: 144, infinitive: "voyager", translation: "путешествовать",
    transcription: "вуайажэ́",
    example: {"greek": "Je voyage souvent pour le travail.", "ru": "Я часто езжу в командировки."},
    present: {"je": "voyage", "tu": "voyages", "il/elle": "voyage", "nous": "voyageons", "vous": "voyagez", "ils/elles": "voyagent"},
    preterite: {"je": "ai voyagé", "tu": "as voyagé", "il/elle": "a voyagé", "nous": "avons voyagé", "vous": "avez voyagé", "ils/elles": "ont voyagé"},
    future: {"je": "voyagerai", "tu": "voyageras", "il/elle": "voyagera", "nous": "voyagerons", "vous": "voyagerez", "ils/elles": "voyageront"}
  },
  {
    id: 145, infinitive: "répéter", translation: "повторять",
    transcription: "репетэ́",
    example: {"greek": "Vous pouvez répéter plus lentement ?", "ru": "Можете повторить помедленнее?"},
    present: {"je": "répète", "tu": "répètes", "il/elle": "répète", "nous": "répétons", "vous": "répétez", "ils/elles": "répètent"},
    preterite: {"je": "ai répété", "tu": "as répété", "il/elle": "a répété", "nous": "avons répété", "vous": "avez répété", "ils/elles": "ont répété"},
    future: {"je": "répéterai", "tu": "répéteras", "il/elle": "répétera", "nous": "répéterons", "vous": "répéterez", "ils/elles": "répéteront"}
  },
  {
    id: 146, infinitive: "préférer", translation: "предпочитать",
    transcription: "преферэ́",
    example: {"greek": "Je préfère payer par carte.", "ru": "Я предпочитаю платить картой."},
    present: {"je": "préfère", "tu": "préfères", "il/elle": "préfère", "nous": "préférons", "vous": "préférez", "ils/elles": "préfèrent"},
    preterite: {"je": "ai préféré", "tu": "as préféré", "il/elle": "a préféré", "nous": "avons préféré", "vous": "avez préféré", "ils/elles": "ont préféré"},
    future: {"je": "préférerai", "tu": "préféreras", "il/elle": "préférera", "nous": "préférerons", "vous": "préférerez", "ils/elles": "préféreront"}
  },
  {
    id: 147, infinitive: "espérer", translation: "надеяться",
    transcription: "эсперэ́",
    example: {"greek": "J'espère recevoir une réponse cette semaine.", "ru": "Надеюсь получить ответ на этой неделе."},
    present: {"je": "espère", "tu": "espères", "il/elle": "espère", "nous": "espérons", "vous": "espérez", "ils/elles": "espèrent"},
    preterite: {"je": "ai espéré", "tu": "as espéré", "il/elle": "a espéré", "nous": "avons espéré", "vous": "avez espéré", "ils/elles": "ont espéré"},
    future: {"je": "espérerai", "tu": "espéreras", "il/elle": "espérera", "nous": "espérerons", "vous": "espérerez", "ils/elles": "espéreront"}
  },
  {
    id: 148, infinitive: "promettre", translation: "обещать",
    transcription: "промэ́тр",
    example: {"greek": "Il a promis de rappeler demain.", "ru": "Он обещал перезвонить завтра."},
    present: {"je": "promets", "tu": "promets", "il/elle": "promet", "nous": "promettons", "vous": "promettez", "ils/elles": "promettent"},
    preterite: {"je": "ai promis", "tu": "as promis", "il/elle": "a promis", "nous": "avons promis", "vous": "avez promis", "ils/elles": "ont promis"},
    future: {"je": "promettrai", "tu": "promettras", "il/elle": "promettra", "nous": "promettrons", "vous": "promettrez", "ils/elles": "promettront"}
  },
  {
    id: 149, infinitive: "reconnaître", translation: "узнавать / признавать",
    transcription: "рёконэ́тр",
    example: {"greek": "Je ne reconnais pas cette opération sur mon compte.", "ru": "Я не узнаю эту операцию на своём счёте."},
    present: {"je": "reconnais", "tu": "reconnais", "il/elle": "reconnaît", "nous": "reconnaissons", "vous": "reconnaissez", "ils/elles": "reconnaissent"},
    preterite: {"je": "ai reconnu", "tu": "as reconnu", "il/elle": "a reconnu", "nous": "avons reconnu", "vous": "avez reconnu", "ils/elles": "ont reconnu"},
    future: {"je": "reconnaîtrai", "tu": "reconnaîtras", "il/elle": "reconnaîtra", "nous": "reconnaîtrons", "vous": "reconnaîtrez", "ils/elles": "reconnaîtront"}
  },
  {
    id: 150, infinitive: "décrire", translation: "описывать",
    transcription: "декри́р",
    example: {"greek": "Décrivez la douleur, s'il vous plaît.", "ru": "Опишите боль, пожалуйста."},
    present: {"je": "décris", "tu": "décris", "il/elle": "décrit", "nous": "décrivons", "vous": "décrivez", "ils/elles": "décrivent"},
    preterite: {"je": "ai décrit", "tu": "as décrit", "il/elle": "a décrit", "nous": "avons décrit", "vous": "avez décrit", "ils/elles": "ont décrit"},
    future: {"je": "décrirai", "tu": "décriras", "il/elle": "décrira", "nous": "décrirons", "vous": "décrirez", "ils/elles": "décriront"}
  },
  {
    id: 151, infinitive: "traduire", translation: "переводить",
    transcription: "традюи́р",
    example: {"greek": "Il faut traduire l'acte de naissance.", "ru": "Свидетельство о рождении нужно перевести."},
    present: {"je": "traduis", "tu": "traduis", "il/elle": "traduit", "nous": "traduisons", "vous": "traduisez", "ils/elles": "traduisent"},
    preterite: {"je": "ai traduit", "tu": "as traduit", "il/elle": "a traduit", "nous": "avons traduit", "vous": "avez traduit", "ils/elles": "ont traduit"},
    future: {"je": "traduirai", "tu": "traduiras", "il/elle": "traduira", "nous": "traduirons", "vous": "traduirez", "ils/elles": "traduiront"}
  },
  {
    id: 152, infinitive: "prévenir", translation: "предупреждать",
    transcription: "превни́р",
    example: {"greek": "Prévenez le propriétaire avant les travaux.", "ru": "Предупредите владельца до начала ремонта."},
    present: {"je": "préviens", "tu": "préviens", "il/elle": "prévient", "nous": "prévenons", "vous": "prévenez", "ils/elles": "préviennent"},
    preterite: {"je": "ai prévenu", "tu": "as prévenu", "il/elle": "a prévenu", "nous": "avons prévenu", "vous": "avez prévenu", "ils/elles": "ont prévenu"},
    future: {"je": "préviendrai", "tu": "préviendras", "il/elle": "préviendra", "nous": "préviendrons", "vous": "préviendrez", "ils/elles": "préviendront"}
  },
  {
    id: 153, infinitive: "plaindre", translation: "жалеть",
    transcription: "плэ́ндр",
    example: {"greek": "Je ne me plains pas, ça va.", "ru": "Я не жалуюсь, всё нормально."},
    present: {"je": "plains", "tu": "plains", "il/elle": "plaint", "nous": "plaignons", "vous": "plaignez", "ils/elles": "plaignent"},
    preterite: {"je": "ai plaint", "tu": "as plaint", "il/elle": "a plaint", "nous": "avons plaint", "vous": "avez plaint", "ils/elles": "ont plaint"},
    future: {"je": "plaindrai", "tu": "plaindras", "il/elle": "plaindra", "nous": "plaindrons", "vous": "plaindrez", "ils/elles": "plaindront"}
  },
  {
    id: 154, infinitive: "rire", translation: "смеяться",
    transcription: "рир",
    example: {"greek": "On a beaucoup ri hier soir.", "ru": "Вчера вечером мы много смеялись."},
    present: {"je": "ris", "tu": "ris", "il/elle": "rit", "nous": "rions", "vous": "riez", "ils/elles": "rient"},
    preterite: {"je": "ai ri", "tu": "as ri", "il/elle": "a ri", "nous": "avons ri", "vous": "avez ri", "ils/elles": "ont ri"},
    future: {"je": "rirai", "tu": "riras", "il/elle": "rira", "nous": "rirons", "vous": "rirez", "ils/elles": "riront"}
  },
  {
    id: 155, infinitive: "sourire", translation: "улыбаться",
    transcription: "сури́р",
    example: {"greek": "Elle sourit toujours au client.", "ru": "Она всегда улыбается клиенту."},
    present: {"je": "souris", "tu": "souris", "il/elle": "sourit", "nous": "sourions", "vous": "souriez", "ils/elles": "sourient"},
    preterite: {"je": "ai souri", "tu": "as souri", "il/elle": "a souri", "nous": "avons souri", "vous": "avez souri", "ils/elles": "ont souri"},
    future: {"je": "sourirai", "tu": "souriras", "il/elle": "sourira", "nous": "sourirons", "vous": "sourirez", "ils/elles": "souriront"}
  },
  {
    id: 156, infinitive: "mentir", translation: "лгать",
    transcription: "манти́р",
    example: {"greek": "Ne mentez pas sur votre dossier.", "ru": "Не лгите в своём досье."},
    present: {"je": "mens", "tu": "mens", "il/elle": "ment", "nous": "mentons", "vous": "mentez", "ils/elles": "mentent"},
    preterite: {"je": "ai menti", "tu": "as menti", "il/elle": "a menti", "nous": "avons menti", "vous": "avez menti", "ils/elles": "ont menti"},
    future: {"je": "mentirai", "tu": "mentiras", "il/elle": "mentira", "nous": "mentirons", "vous": "mentirez", "ils/elles": "mentiront"}
  },
  {
    id: 157, infinitive: "plaire", translation: "нравиться",
    transcription: "плэр",
    example: {"greek": "Cet appartement me plaît beaucoup.", "ru": "Эта квартира мне очень нравится."},
    present: {"je": "plais", "tu": "plais", "il/elle": "plaît", "nous": "plaisons", "vous": "plaisez", "ils/elles": "plaisent"},
    preterite: {"je": "ai plu", "tu": "as plu", "il/elle": "a plu", "nous": "avons plu", "vous": "avez plu", "ils/elles": "ont plu"},
    future: {"je": "plairai", "tu": "plairas", "il/elle": "plaira", "nous": "plairons", "vous": "plairez", "ils/elles": "plairont"}
  },
  {
    id: 158, infinitive: "paraître", translation: "казаться",
    transcription: "парэ́тр",
    example: {"greek": "Le prix paraît correct.", "ru": "Цена кажется приемлемой."},
    present: {"je": "parais", "tu": "parais", "il/elle": "paraît", "nous": "paraissons", "vous": "paraissez", "ils/elles": "paraissent"},
    preterite: {"je": "ai paru", "tu": "as paru", "il/elle": "a paru", "nous": "avons paru", "vous": "avez paru", "ils/elles": "ont paru"},
    future: {"je": "paraîtrai", "tu": "paraîtras", "il/elle": "paraîtra", "nous": "paraîtrons", "vous": "paraîtrez", "ils/elles": "paraîtront"}
  },
  {
    id: 159, infinitive: "suffire", translation: "хватать / быть достаточным",
    transcription: "сюфи́р",
    example: {"greek": "Une pièce d'identité suffit.", "ru": "Достаточно удостоверения личности."},
    present: {"je": "suffis", "tu": "suffis", "il/elle": "suffit", "nous": "suffisons", "vous": "suffisez", "ils/elles": "suffisent"},
    preterite: {"je": "ai suffi", "tu": "as suffi", "il/elle": "a suffi", "nous": "avons suffi", "vous": "avez suffi", "ils/elles": "ont suffi"},
    future: {"je": "suffirai", "tu": "suffiras", "il/elle": "suffira", "nous": "suffirons", "vous": "suffirez", "ils/elles": "suffiront"}
  },
  {
    id: 161, infinitive: "corriger", translation: "исправлять",
    transcription: "коррижэ́",
    example: {"greek": "Corrigez-moi si je me trompe.", "ru": "Поправьте меня, если я ошибаюсь."},
    present: {"je": "corrige", "tu": "corriges", "il/elle": "corrige", "nous": "corrigeons", "vous": "corrigez", "ils/elles": "corrigent"},
    preterite: {"je": "ai corrigé", "tu": "as corrigé", "il/elle": "a corrigé", "nous": "avons corrigé", "vous": "avez corrigé", "ils/elles": "ont corrigé"},
    future: {"je": "corrigerai", "tu": "corrigeras", "il/elle": "corrigera", "nous": "corrigerons", "vous": "corrigerez", "ils/elles": "corrigeront"}
  },
  {
    id: 162, infinitive: "obtenir", translation: "получать / добиваться",
    transcription: "обтёни́р",
    example: {"greek": "J'ai obtenu mon titre de séjour.", "ru": "Я получил вид на жительство."},
    present: {"je": "obtiens", "tu": "obtiens", "il/elle": "obtient", "nous": "obtenons", "vous": "obtenez", "ils/elles": "obtiennent"},
    preterite: {"je": "ai obtenu", "tu": "as obtenu", "il/elle": "a obtenu", "nous": "avons obtenu", "vous": "avez obtenu", "ils/elles": "ont obtenu"},
    future: {"je": "obtiendrai", "tu": "obtiendras", "il/elle": "obtiendra", "nous": "obtiendrons", "vous": "obtiendrez", "ils/elles": "obtiendront"}
  },
  {
    id: 163, infinitive: "embaucher", translation: "нанимать на работу",
    transcription: "амбошэ́",
    example: {"greek": "Ils embauchent en CDI.", "ru": "Они нанимают по бессрочному договору."},
    present: {"je": "embauche", "tu": "embauches", "il/elle": "embauche", "nous": "embauchons", "vous": "embauchez", "ils/elles": "embauchent"},
    preterite: {"je": "ai embauché", "tu": "as embauché", "il/elle": "a embauché", "nous": "avons embauché", "vous": "avez embauché", "ils/elles": "ont embauché"},
    future: {"je": "embaucherai", "tu": "embaucheras", "il/elle": "embauchera", "nous": "embaucherons", "vous": "embaucherez", "ils/elles": "embaucheront"}
  },
  {
    id: 164, infinitive: "licencier", translation: "увольнять",
    transcription: "лисансье́",
    example: {"greek": "Il a été licencié en juin.", "ru": "Его уволили в июне."},
    present: {"je": "licencie", "tu": "licencies", "il/elle": "licencie", "nous": "licencions", "vous": "licenciez", "ils/elles": "licencient"},
    preterite: {"je": "ai licencié", "tu": "as licencié", "il/elle": "a licencié", "nous": "avons licencié", "vous": "avez licencié", "ils/elles": "ont licencié"},
    future: {"je": "licencierai", "tu": "licencieras", "il/elle": "licenciera", "nous": "licencierons", "vous": "licencierez", "ils/elles": "licencieront"}
  },
  {
    id: 165, infinitive: "démissionner", translation: "увольняться по своей воле",
    transcription: "демисьонэ́",
    example: {"greek": "J'ai démissionné le mois dernier.", "ru": "В прошлом месяце я уволился."},
    present: {"je": "démissionne", "tu": "démissionnes", "il/elle": "démissionne", "nous": "démissionnons", "vous": "démissionnez", "ils/elles": "démissionnent"},
    preterite: {"je": "ai démissionné", "tu": "as démissionné", "il/elle": "a démissionné", "nous": "avons démissionné", "vous": "avez démissionné", "ils/elles": "ont démissionné"},
    future: {"je": "démissionnerai", "tu": "démissionneras", "il/elle": "démissionnera", "nous": "démissionnerons", "vous": "démissionnerez", "ils/elles": "démissionneront"}
  },
  {
    id: 166, infinitive: "postuler", translation: "подавать заявку на работу",
    transcription: "постюлэ́",
    example: {"greek": "J'ai postulé à trois offres.", "ru": "Я откликнулся на три вакансии."},
    present: {"je": "postule", "tu": "postules", "il/elle": "postule", "nous": "postulons", "vous": "postulez", "ils/elles": "postulent"},
    preterite: {"je": "ai postulé", "tu": "as postulé", "il/elle": "a postulé", "nous": "avons postulé", "vous": "avez postulé", "ils/elles": "ont postulé"},
    future: {"je": "postulerai", "tu": "postuleras", "il/elle": "postulera", "nous": "postulerons", "vous": "postulerez", "ils/elles": "postuleront"}
  },
  {
    id: 167, infinitive: "gérer", translation: "управлять",
    transcription: "жерэ́",
    example: {"greek": "Je gère une équipe de cinq personnes.", "ru": "Я руковожу командой из пяти человек."},
    present: {"je": "gère", "tu": "gères", "il/elle": "gère", "nous": "gérons", "vous": "gérez", "ils/elles": "gèrent"},
    preterite: {"je": "ai géré", "tu": "as géré", "il/elle": "a géré", "nous": "avons géré", "vous": "avez géré", "ils/elles": "ont géré"},
    future: {"je": "gèrerai", "tu": "gèreras", "il/elle": "gèrera", "nous": "gèrerons", "vous": "gèrerez", "ils/elles": "gèreront"}
  },
  {
    id: 168, infinitive: "diriger", translation: "руководить",
    transcription: "дирижэ́",
    example: {"greek": "Elle dirige le service depuis deux ans.", "ru": "Она руководит отделом два года."},
    present: {"je": "dirige", "tu": "diriges", "il/elle": "dirige", "nous": "dirigeons", "vous": "dirigez", "ils/elles": "dirigent"},
    preterite: {"je": "ai dirigé", "tu": "as dirigé", "il/elle": "a dirigé", "nous": "avons dirigé", "vous": "avez dirigé", "ils/elles": "ont dirigé"},
    future: {"je": "dirigerai", "tu": "dirigeras", "il/elle": "dirigera", "nous": "dirigerons", "vous": "dirigerez", "ils/elles": "dirigeront"}
  },
  {
    id: 169, infinitive: "vérifier", translation: "проверять",
    transcription: "верифье́",
    example: {"greek": "Vérifiez bien la date sur le document.", "ru": "Внимательно проверьте дату в документе."},
    present: {"je": "vérifie", "tu": "vérifies", "il/elle": "vérifie", "nous": "vérifions", "vous": "vérifiez", "ils/elles": "vérifient"},
    preterite: {"je": "ai vérifié", "tu": "as vérifié", "il/elle": "a vérifié", "nous": "avons vérifié", "vous": "avez vérifié", "ils/elles": "ont vérifié"},
    future: {"je": "vérifierai", "tu": "vérifieras", "il/elle": "vérifiera", "nous": "vérifierons", "vous": "vérifierez", "ils/elles": "vérifieront"}
  },
  {
    id: 170, infinitive: "valider", translation: "подтверждать / компостировать",
    transcription: "валидэ́",
    example: {"greek": "N'oubliez pas de valider votre visa en ligne.", "ru": "Не забудьте подтвердить визу онлайн."},
    present: {"je": "valide", "tu": "valides", "il/elle": "valide", "nous": "validons", "vous": "validez", "ils/elles": "valident"},
    preterite: {"je": "ai validé", "tu": "as validé", "il/elle": "a validé", "nous": "avons validé", "vous": "avez validé", "ils/elles": "ont validé"},
    future: {"je": "validerai", "tu": "valideras", "il/elle": "validera", "nous": "validerons", "vous": "validerez", "ils/elles": "valideront"}
  },
  {
    id: 171, infinitive: "renouveler", translation: "продлевать",
    transcription: "рёнувлэ́",
    example: {"greek": "Je dois renouveler ma carte de séjour.", "ru": "Мне нужно продлить вид на жительство."},
    present: {"je": "renouvelle", "tu": "renouvelles", "il/elle": "renouvelle", "nous": "renouvelons", "vous": "renouvelez", "ils/elles": "renouvellent"},
    preterite: {"je": "ai renouvelé", "tu": "as renouvelé", "il/elle": "a renouvelé", "nous": "avons renouvelé", "vous": "avez renouvelé", "ils/elles": "ont renouvelé"},
    future: {"je": "renouvellerai", "tu": "renouvelleras", "il/elle": "renouvellera", "nous": "renouvellerons", "vous": "renouvellerez", "ils/elles": "renouvelleront"}
  },
  {
    id: 172, infinitive: "résilier", translation: "расторгать",
    transcription: "резилье́",
    example: {"greek": "Je souhaite résilier mon contrat.", "ru": "Я хочу расторгнуть договор."},
    present: {"je": "résilie", "tu": "résilies", "il/elle": "résilie", "nous": "résilions", "vous": "résiliez", "ils/elles": "résilient"},
    preterite: {"je": "ai résilié", "tu": "as résilié", "il/elle": "a résilié", "nous": "avons résilié", "vous": "avez résilié", "ils/elles": "ont résilié"},
    future: {"je": "résilierai", "tu": "résilieras", "il/elle": "résiliera", "nous": "résilierons", "vous": "résilierez", "ils/elles": "résilieront"}
  },
  {
    id: 173, infinitive: "annuler", translation: "отменять",
    transcription: "анюлэ́",
    example: {"greek": "Le train a été annulé à cause de la grève.", "ru": "Поезд отменили из-за забастовки."},
    present: {"je": "annule", "tu": "annules", "il/elle": "annule", "nous": "annulons", "vous": "annulez", "ils/elles": "annulent"},
    preterite: {"je": "ai annulé", "tu": "as annulé", "il/elle": "a annulé", "nous": "avons annulé", "vous": "avez annulé", "ils/elles": "ont annulé"},
    future: {"je": "annulerai", "tu": "annuleras", "il/elle": "annulera", "nous": "annulerons", "vous": "annulerez", "ils/elles": "annuleront"}
  },
  {
    id: 174, infinitive: "reporter", translation: "переносить (по срокам)",
    transcription: "рёпортэ́",
    example: {"greek": "On peut reporter le rendez-vous ?", "ru": "Можно перенести приём?"},
    present: {"je": "reporte", "tu": "reportes", "il/elle": "reporte", "nous": "reportons", "vous": "reportez", "ils/elles": "reportent"},
    preterite: {"je": "ai reporté", "tu": "as reporté", "il/elle": "a reporté", "nous": "avons reporté", "vous": "avez reporté", "ils/elles": "ont reporté"},
    future: {"je": "reporterai", "tu": "reporteras", "il/elle": "reportera", "nous": "reporterons", "vous": "reporterez", "ils/elles": "reporteront"}
  },
  {
    id: 175, infinitive: "convoquer", translation: "вызывать (официально)",
    transcription: "конвокэ́",
    example: {"greek": "La préfecture m'a convoqué pour lundi.", "ru": "Префектура вызвала меня на понедельник."},
    present: {"je": "convoque", "tu": "convoques", "il/elle": "convoque", "nous": "convoquons", "vous": "convoquez", "ils/elles": "convoquent"},
    preterite: {"je": "ai convoqué", "tu": "as convoqué", "il/elle": "a convoqué", "nous": "avons convoqué", "vous": "avez convoqué", "ils/elles": "ont convoqué"},
    future: {"je": "convoquerai", "tu": "convoqueras", "il/elle": "convoquera", "nous": "convoquerons", "vous": "convoquerez", "ils/elles": "convoqueront"}
  },
  {
    id: 176, infinitive: "déposer", translation: "подавать / вносить",
    transcription: "депозэ́",
    example: {"greek": "J'ai déposé mon dossier en ligne.", "ru": "Я подал досье онлайн."},
    present: {"je": "dépose", "tu": "déposes", "il/elle": "dépose", "nous": "déposons", "vous": "déposez", "ils/elles": "déposent"},
    preterite: {"je": "ai déposé", "tu": "as déposé", "il/elle": "a déposé", "nous": "avons déposé", "vous": "avez déposé", "ils/elles": "ont déposé"},
    future: {"je": "déposerai", "tu": "déposeras", "il/elle": "déposera", "nous": "déposerons", "vous": "déposerez", "ils/elles": "déposeront"}
  },
  {
    id: 177, infinitive: "joindre", translation: "прикладывать / дозвониться",
    transcription: "жуэ́ндр",
    example: {"greek": "Veuillez joindre une copie du bail.", "ru": "Пожалуйста, приложите копию договора аренды."},
    present: {"je": "joins", "tu": "joins", "il/elle": "joint", "nous": "joignons", "vous": "joignez", "ils/elles": "joignent"},
    preterite: {"je": "ai joint", "tu": "as joint", "il/elle": "a joint", "nous": "avons joint", "vous": "avez joint", "ils/elles": "ont joint"},
    future: {"je": "joindrai", "tu": "joindras", "il/elle": "joindra", "nous": "joindrons", "vous": "joindrez", "ils/elles": "joindront"}
  },
  {
    id: 178, infinitive: "traiter", translation: "обрабатывать / рассматривать",
    transcription: "трэтэ́",
    example: {"greek": "Le dossier est en cours de traitement.", "ru": "Досье находится на рассмотрении."},
    present: {"je": "traite", "tu": "traites", "il/elle": "traite", "nous": "traitons", "vous": "traitez", "ils/elles": "traitent"},
    preterite: {"je": "ai traité", "tu": "as traité", "il/elle": "a traité", "nous": "avons traité", "vous": "avez traité", "ils/elles": "ont traité"},
    future: {"je": "traiterai", "tu": "traiteras", "il/elle": "traitera", "nous": "traiterons", "vous": "traiterez", "ils/elles": "traiteront"}
  },
  {
    id: 179, infinitive: "exiger", translation: "требовать",
    transcription: "эгзижэ́",
    example: {"greek": "La banque exige un justificatif de domicile.", "ru": "Банк требует подтверждение адреса."},
    present: {"je": "exige", "tu": "exiges", "il/elle": "exige", "nous": "exigeons", "vous": "exigez", "ils/elles": "exigent"},
    preterite: {"je": "ai exigé", "tu": "as exigé", "il/elle": "a exigé", "nous": "avons exigé", "vous": "avez exigé", "ils/elles": "ont exigé"},
    future: {"je": "exigerai", "tu": "exigeras", "il/elle": "exigera", "nous": "exigerons", "vous": "exigerez", "ils/elles": "exigeront"}
  },
  {
    id: 180, infinitive: "prouver", translation: "доказывать",
    transcription: "прувэ́",
    example: {"greek": "Il faut prouver vos revenus.", "ru": "Нужно подтвердить свои доходы."},
    present: {"je": "prouve", "tu": "prouves", "il/elle": "prouve", "nous": "prouvons", "vous": "prouvez", "ils/elles": "prouvent"},
    preterite: {"je": "ai prouvé", "tu": "as prouvé", "il/elle": "a prouvé", "nous": "avons prouvé", "vous": "avez prouvé", "ils/elles": "ont prouvé"},
    future: {"je": "prouverai", "tu": "prouveras", "il/elle": "prouvera", "nous": "prouverons", "vous": "prouverez", "ils/elles": "prouveront"}
  },
  {
    id: 181, infinitive: "imprimer", translation: "печатать",
    transcription: "импримэ́",
    example: {"greek": "Imprimez l'attestation et gardez-la.", "ru": "Распечатайте справку и сохраните её."},
    present: {"je": "imprime", "tu": "imprimes", "il/elle": "imprime", "nous": "imprimons", "vous": "imprimez", "ils/elles": "impriment"},
    preterite: {"je": "ai imprimé", "tu": "as imprimé", "il/elle": "a imprimé", "nous": "avons imprimé", "vous": "avez imprimé", "ils/elles": "ont imprimé"},
    future: {"je": "imprimerai", "tu": "imprimeras", "il/elle": "imprimera", "nous": "imprimerons", "vous": "imprimerez", "ils/elles": "imprimeront"}
  },
  {
    id: 182, infinitive: "scanner", translation: "сканировать",
    transcription: "сканэ́",
    example: {"greek": "Scannez le document recto verso.", "ru": "Отсканируйте документ с двух сторон."},
    present: {"je": "scanne", "tu": "scannes", "il/elle": "scanne", "nous": "scannons", "vous": "scannez", "ils/elles": "scannent"},
    preterite: {"je": "ai scanné", "tu": "as scanné", "il/elle": "a scanné", "nous": "avons scanné", "vous": "avez scanné", "ils/elles": "ont scanné"},
    future: {"je": "scannerai", "tu": "scanneras", "il/elle": "scannera", "nous": "scannerons", "vous": "scannerez", "ils/elles": "scanneront"}
  },
  {
    id: 183, infinitive: "transférer", translation: "переводить (деньги, файлы)",
    transcription: "трансферэ́",
    example: {"greek": "J'ai transféré l'argent hier soir.", "ru": "Я перевёл деньги вчера вечером."},
    present: {"je": "transfère", "tu": "transfères", "il/elle": "transfère", "nous": "transférons", "vous": "transférez", "ils/elles": "transfèrent"},
    preterite: {"je": "ai transféré", "tu": "as transféré", "il/elle": "a transféré", "nous": "avons transféré", "vous": "avez transféré", "ils/elles": "ont transféré"},
    future: {"je": "transfèrerai", "tu": "transfèreras", "il/elle": "transfèrera", "nous": "transfèrerons", "vous": "transfèrerez", "ils/elles": "transfèreront"}
  },
  {
    id: 184, infinitive: "retirer", translation: "снимать (деньги) / забирать",
    transcription: "рётирэ́",
    example: {"greek": "Je vais retirer cent euros.", "ru": "Я сниму сто евро."},
    present: {"je": "retire", "tu": "retires", "il/elle": "retire", "nous": "retirons", "vous": "retirez", "ils/elles": "retirent"},
    preterite: {"je": "ai retiré", "tu": "as retiré", "il/elle": "a retiré", "nous": "avons retiré", "vous": "avez retiré", "ils/elles": "ont retiré"},
    future: {"je": "retirerai", "tu": "retireras", "il/elle": "retirera", "nous": "retirerons", "vous": "retirerez", "ils/elles": "retireront"}
  },
  {
    id: 185, infinitive: "virer", translation: "перечислять",
    transcription: "вирэ́",
    example: {"greek": "Le salaire est viré le 30 du mois.", "ru": "Зарплату перечисляют тридцатого числа."},
    present: {"je": "vire", "tu": "vires", "il/elle": "vire", "nous": "virons", "vous": "virez", "ils/elles": "virent"},
    preterite: {"je": "ai viré", "tu": "as viré", "il/elle": "a viré", "nous": "avons viré", "vous": "avez viré", "ils/elles": "ont viré"},
    future: {"je": "virerai", "tu": "vireras", "il/elle": "virera", "nous": "virerons", "vous": "virerez", "ils/elles": "vireront"}
  },
  {
    id: 186, infinitive: "rembourser", translation: "возмещать / возвращать долг",
    transcription: "рамбурсэ́",
    example: {"greek": "La sécu rembourse 70% de la consultation.", "ru": "Страховка возмещает 70% стоимости приёма."},
    present: {"je": "rembourse", "tu": "rembourses", "il/elle": "rembourse", "nous": "remboursons", "vous": "remboursez", "ils/elles": "remboursent"},
    preterite: {"je": "ai remboursé", "tu": "as remboursé", "il/elle": "a remboursé", "nous": "avons remboursé", "vous": "avez remboursé", "ils/elles": "ont remboursé"},
    future: {"je": "rembourserai", "tu": "rembourseras", "il/elle": "remboursera", "nous": "rembourserons", "vous": "rembourserez", "ils/elles": "rembourseront"}
  },
  {
    id: 187, infinitive: "allumer", translation: "включать / зажигать",
    transcription: "алюмэ́",
    example: {"greek": "Allume la lumière, s'il te plaît.", "ru": "Включи свет, пожалуйста."},
    present: {"je": "allume", "tu": "allumes", "il/elle": "allume", "nous": "allumons", "vous": "allumez", "ils/elles": "allument"},
    preterite: {"je": "ai allumé", "tu": "as allumé", "il/elle": "a allumé", "nous": "avons allumé", "vous": "avez allumé", "ils/elles": "ont allumé"},
    future: {"je": "allumerai", "tu": "allumeras", "il/elle": "allumera", "nous": "allumerons", "vous": "allumerez", "ils/elles": "allumeront"}
  },
  {
    id: 188, infinitive: "éteindre", translation: "выключать / тушить",
    transcription: "этэ́ндр",
    example: {"greek": "Éteignez la lumière en partant.", "ru": "Выключайте свет, когда уходите."},
    present: {"je": "éteins", "tu": "éteins", "il/elle": "éteint", "nous": "éteignons", "vous": "éteignez", "ils/elles": "éteignent"},
    preterite: {"je": "ai éteint", "tu": "as éteint", "il/elle": "a éteint", "nous": "avons éteint", "vous": "avez éteint", "ils/elles": "ont éteint"},
    future: {"je": "éteindrai", "tu": "éteindras", "il/elle": "éteindra", "nous": "éteindrons", "vous": "éteindrez", "ils/elles": "éteindront"}
  },
  {
    id: 189, infinitive: "brancher", translation: "подключать",
    transcription: "браншэ́",
    example: {"greek": "La machine n'est pas branchée.", "ru": "Машина не подключена."},
    present: {"je": "branche", "tu": "branches", "il/elle": "branche", "nous": "branchons", "vous": "branchez", "ils/elles": "branchent"},
    preterite: {"je": "ai branché", "tu": "as branché", "il/elle": "a branché", "nous": "avons branché", "vous": "avez branché", "ils/elles": "ont branché"},
    future: {"je": "brancherai", "tu": "brancheras", "il/elle": "branchera", "nous": "brancherons", "vous": "brancherez", "ils/elles": "brancheront"}
  },
  {
    id: 190, infinitive: "couvrir", translation: "покрывать",
    transcription: "куври́р",
    example: {"greek": "L'assurance couvre les dégâts des eaux.", "ru": "Страховка покрывает залив."},
    present: {"je": "couvre", "tu": "couvres", "il/elle": "couvre", "nous": "couvrons", "vous": "couvrez", "ils/elles": "couvrent"},
    preterite: {"je": "ai couvert", "tu": "as couvert", "il/elle": "a couvert", "nous": "avons couvert", "vous": "avez couvert", "ils/elles": "ont couvert"},
    future: {"je": "couvrirai", "tu": "couvriras", "il/elle": "couvrira", "nous": "couvrirons", "vous": "couvrirez", "ils/elles": "couvriront"}
  },
  {
    id: 191, infinitive: "découvrir", translation: "обнаруживать",
    transcription: "декуври́р",
    example: {"greek": "J'ai découvert une fuite ce matin.", "ru": "Сегодня утром я обнаружил протечку."},
    present: {"je": "découvre", "tu": "découvres", "il/elle": "découvre", "nous": "découvrons", "vous": "découvrez", "ils/elles": "découvrent"},
    preterite: {"je": "ai découvert", "tu": "as découvert", "il/elle": "a découvert", "nous": "avons découvert", "vous": "avez découvert", "ils/elles": "ont découvert"},
    future: {"je": "découvrirai", "tu": "découvriras", "il/elle": "découvrira", "nous": "découvrirons", "vous": "découvrirez", "ils/elles": "découvriront"}
  },
  {
    id: 192, infinitive: "construire", translation: "строить",
    transcription: "констрюи́р",
    example: {"greek": "Ils construisent un immeuble en face.", "ru": "Напротив строят дом."},
    present: {"je": "construis", "tu": "construis", "il/elle": "construit", "nous": "construisons", "vous": "construisez", "ils/elles": "construisent"},
    preterite: {"je": "ai construit", "tu": "as construit", "il/elle": "a construit", "nous": "avons construit", "vous": "avez construit", "ils/elles": "ont construit"},
    future: {"je": "construirai", "tu": "construiras", "il/elle": "construira", "nous": "construirons", "vous": "construirez", "ils/elles": "construiront"}
  },
  {
    id: 193, infinitive: "peindre", translation: "красить",
    transcription: "пэ́ндр",
    example: {"greek": "On a peint la cuisine en blanc.", "ru": "Мы покрасили кухню в белый."},
    present: {"je": "peins", "tu": "peins", "il/elle": "peint", "nous": "peignons", "vous": "peignez", "ils/elles": "peignent"},
    preterite: {"je": "ai peint", "tu": "as peint", "il/elle": "a peint", "nous": "avons peint", "vous": "avez peint", "ils/elles": "ont peint"},
    future: {"je": "peindrai", "tu": "peindras", "il/elle": "peindra", "nous": "peindrons", "vous": "peindrez", "ils/elles": "peindront"}
  },
  {
    id: 194, infinitive: "bricoler", translation: "мастерить",
    transcription: "бриколэ́",
    example: {"greek": "Il bricole le week-end.", "ru": "По выходным он мастерит."},
    present: {"je": "bricole", "tu": "bricoles", "il/elle": "bricole", "nous": "bricolons", "vous": "bricolez", "ils/elles": "bricolent"},
    preterite: {"je": "ai bricolé", "tu": "as bricolé", "il/elle": "a bricolé", "nous": "avons bricolé", "vous": "avez bricolé", "ils/elles": "ont bricolé"},
    future: {"je": "bricolerai", "tu": "bricoleras", "il/elle": "bricolera", "nous": "bricolerons", "vous": "bricolerez", "ils/elles": "bricoleront"}
  },
  {
    id: 195, infinitive: "jeter", translation: "выбрасывать",
    transcription: "жётэ́",
    example: {"greek": "Ne jetez pas le verre avec les ordures.", "ru": "Не выбрасывайте стекло с обычным мусором."},
    present: {"je": "jette", "tu": "jettes", "il/elle": "jette", "nous": "jetons", "vous": "jetez", "ils/elles": "jettent"},
    preterite: {"je": "ai jeté", "tu": "as jeté", "il/elle": "a jeté", "nous": "avons jeté", "vous": "avez jeté", "ils/elles": "ont jeté"},
    future: {"je": "jetterai", "tu": "jetteras", "il/elle": "jettera", "nous": "jetterons", "vous": "jetterez", "ils/elles": "jetteront"}
  },
  {
    id: 196, infinitive: "trier", translation: "сортировать",
    transcription: "трие́",
    example: {"greek": "Ici, on trie les déchets.", "ru": "Здесь сортируют мусор."},
    present: {"je": "trie", "tu": "tries", "il/elle": "trie", "nous": "trions", "vous": "triez", "ils/elles": "trient"},
    preterite: {"je": "ai trié", "tu": "as trié", "il/elle": "a trié", "nous": "avons trié", "vous": "avez trié", "ils/elles": "ont trié"},
    future: {"je": "trierai", "tu": "trieras", "il/elle": "triera", "nous": "trierons", "vous": "trierez", "ils/elles": "trieront"}
  },
  {
    id: 197, infinitive: "balayer", translation: "подметать",
    transcription: "балэйе́",
    example: {"greek": "Le gardien balaie la cour le lundi.", "ru": "Консьерж подметает двор по понедельникам."},
    present: {"je": "balaye", "tu": "balayes", "il/elle": "balaye", "nous": "balayons", "vous": "balayez", "ils/elles": "balayent"},
    preterite: {"je": "ai balayé", "tu": "as balayé", "il/elle": "a balayé", "nous": "avons balayé", "vous": "avez balayé", "ils/elles": "ont balayé"},
    future: {"je": "balayerai", "tu": "balayeras", "il/elle": "balayera", "nous": "balayerons", "vous": "balayerez", "ils/elles": "balayeront"}
  },
  {
    id: 198, infinitive: "repasser", translation: "гладить / зайти снова",
    transcription: "рёпасэ́",
    example: {"greek": "Je repasse mes chemises le dimanche.", "ru": "Я глажу рубашки по воскресеньям."},
    present: {"je": "repasse", "tu": "repasses", "il/elle": "repasse", "nous": "repassons", "vous": "repassez", "ils/elles": "repassent"},
    preterite: {"je": "ai repassé", "tu": "as repassé", "il/elle": "a repassé", "nous": "avons repassé", "vous": "avez repassé", "ils/elles": "ont repassé"},
    future: {"je": "repasserai", "tu": "repasseras", "il/elle": "repassera", "nous": "repasserons", "vous": "repasserez", "ils/elles": "repasseront"}
  },
  {
    id: 199, infinitive: "sécher", translation: "сушить",
    transcription: "сэшэ́",
    example: {"greek": "Le linge sèche sur le balcon.", "ru": "Бельё сохнет на балконе."},
    present: {"je": "sèche", "tu": "sèches", "il/elle": "sèche", "nous": "séchons", "vous": "séchez", "ils/elles": "sèchent"},
    preterite: {"je": "ai séché", "tu": "as séché", "il/elle": "a séché", "nous": "avons séché", "vous": "avez séché", "ils/elles": "ont séché"},
    future: {"je": "sècherai", "tu": "sècheras", "il/elle": "sèchera", "nous": "sècherons", "vous": "sècherez", "ils/elles": "sècheront"}
  },
  {
    id: 200, infinitive: "arroser", translation: "поливать",
    transcription: "арозэ́",
    example: {"greek": "Tu peux arroser les plantes ?", "ru": "Можешь полить растения?"},
    present: {"je": "arrose", "tu": "arroses", "il/elle": "arrose", "nous": "arrosons", "vous": "arrosez", "ils/elles": "arrosent"},
    preterite: {"je": "ai arrosé", "tu": "as arrosé", "il/elle": "a arrosé", "nous": "avons arrosé", "vous": "avez arrosé", "ils/elles": "ont arrosé"},
    future: {"je": "arroserai", "tu": "arroseras", "il/elle": "arrosera", "nous": "arroserons", "vous": "arroserez", "ils/elles": "arroseront"}
  },
  {
    id: 201, infinitive: "déranger", translation: "беспокоить",
    transcription: "деранжэ́",
    example: {"greek": "Excusez-moi de vous déranger.", "ru": "Извините за беспокойство."},
    present: {"je": "dérange", "tu": "déranges", "il/elle": "dérange", "nous": "dérangeons", "vous": "dérangez", "ils/elles": "dérangent"},
    preterite: {"je": "ai dérangé", "tu": "as dérangé", "il/elle": "a dérangé", "nous": "avons dérangé", "vous": "avez dérangé", "ils/elles": "ont dérangé"},
    future: {"je": "dérangerai", "tu": "dérangeras", "il/elle": "dérangera", "nous": "dérangerons", "vous": "dérangerez", "ils/elles": "dérangeront"}
  },
  {
    id: 202, infinitive: "sonner", translation: "звонить (в дверь)",
    transcription: "сонэ́",
    example: {"greek": "Quelqu'un a sonné à la porte.", "ru": "Кто-то позвонил в дверь."},
    present: {"je": "sonne", "tu": "sonnes", "il/elle": "sonne", "nous": "sonnons", "vous": "sonnez", "ils/elles": "sonnent"},
    preterite: {"je": "ai sonné", "tu": "as sonné", "il/elle": "a sonné", "nous": "avons sonné", "vous": "avez sonné", "ils/elles": "ont sonné"},
    future: {"je": "sonnerai", "tu": "sonneras", "il/elle": "sonnera", "nous": "sonnerons", "vous": "sonnerez", "ils/elles": "sonneront"}
  },
  {
    id: 203, infinitive: "frapper", translation: "стучать / бить",
    transcription: "фрапэ́",
    example: {"greek": "Frappez avant d'entrer.", "ru": "Стучите перед тем, как войти."},
    present: {"je": "frappe", "tu": "frappes", "il/elle": "frappe", "nous": "frappons", "vous": "frappez", "ils/elles": "frappent"},
    preterite: {"je": "ai frappé", "tu": "as frappé", "il/elle": "a frappé", "nous": "avons frappé", "vous": "avez frappé", "ils/elles": "ont frappé"},
    future: {"je": "frapperai", "tu": "frapperas", "il/elle": "frappera", "nous": "frapperons", "vous": "frapperez", "ils/elles": "frapperont"}
  },
  {
    id: 204, infinitive: "partager", translation: "делить / делиться",
    transcription: "партажэ́",
    example: {"greek": "On partage l'addition ?", "ru": "Разделим счёт?"},
    present: {"je": "partage", "tu": "partages", "il/elle": "partage", "nous": "partageons", "vous": "partagez", "ils/elles": "partagent"},
    preterite: {"je": "ai partagé", "tu": "as partagé", "il/elle": "a partagé", "nous": "avons partagé", "vous": "avez partagé", "ils/elles": "ont partagé"},
    future: {"je": "partagerai", "tu": "partageras", "il/elle": "partagera", "nous": "partagerons", "vous": "partagerez", "ils/elles": "partageront"}
  },
  {
    id: 205, infinitive: "accueillir", translation: "принимать / встречать",
    transcription: "акёйи́р",
    example: {"greek": "L'école accueille les nouveaux élèves lundi.", "ru": "Школа принимает новых учеников в понедельник."},
    present: {"je": "accueille", "tu": "accueilles", "il/elle": "accueille", "nous": "accueillons", "vous": "accueillez", "ils/elles": "accueillent"},
    preterite: {"je": "ai accueilli", "tu": "as accueilli", "il/elle": "a accueilli", "nous": "avons accueilli", "vous": "avez accueilli", "ils/elles": "ont accueilli"},
    future: {"je": "accueillirai", "tu": "accueilliras", "il/elle": "accueillira", "nous": "accueillirons", "vous": "accueillirez", "ils/elles": "accueilliront"}
  },
  {
    id: 206, infinitive: "amener", translation: "приводить",
    transcription: "амёнэ́",
    example: {"greek": "J'amène mon fils chez le médecin.", "ru": "Я веду сына к врачу."},
    present: {"je": "amène", "tu": "amènes", "il/elle": "amène", "nous": "amenons", "vous": "amenez", "ils/elles": "amènent"},
    preterite: {"je": "ai amené", "tu": "as amené", "il/elle": "a amené", "nous": "avons amené", "vous": "avez amené", "ils/elles": "ont amené"},
    future: {"je": "amènerai", "tu": "amèneras", "il/elle": "amènera", "nous": "amènerons", "vous": "amènerez", "ils/elles": "amèneront"}
  },
  {
    id: 207, infinitive: "promener", translation: "выгуливать",
    transcription: "промёнэ́",
    example: {"greek": "Je promène le chien tous les soirs.", "ru": "Я выгуливаю собаку каждый вечер."},
    present: {"je": "promène", "tu": "promènes", "il/elle": "promène", "nous": "promenons", "vous": "promenez", "ils/elles": "promènent"},
    preterite: {"je": "ai promené", "tu": "as promené", "il/elle": "a promené", "nous": "avons promené", "vous": "avez promené", "ils/elles": "ont promené"},
    future: {"je": "promènerai", "tu": "promèneras", "il/elle": "promènera", "nous": "promènerons", "vous": "promènerez", "ils/elles": "promèneront"}
  },
  {
    id: 208, infinitive: "ressembler", translation: "быть похожим",
    transcription: "рёсамблэ́",
    example: {"greek": "Il ressemble beaucoup à son père.", "ru": "Он очень похож на отца."},
    present: {"je": "ressemble", "tu": "ressembles", "il/elle": "ressemble", "nous": "ressemblons", "vous": "ressemblez", "ils/elles": "ressemblent"},
    preterite: {"je": "ai ressemblé", "tu": "as ressemblé", "il/elle": "a ressemblé", "nous": "avons ressemblé", "vous": "avez ressemblé", "ils/elles": "ont ressemblé"},
    future: {"je": "ressemblerai", "tu": "ressembleras", "il/elle": "ressemblera", "nous": "ressemblerons", "vous": "ressemblerez", "ils/elles": "ressembleront"}
  },
  {
    id: 209, infinitive: "appartenir", translation: "принадлежать",
    transcription: "апартёни́р",
    example: {"greek": "Cette place appartient au voisin.", "ru": "Это место принадлежит соседу."},
    present: {"je": "appartiens", "tu": "appartiens", "il/elle": "appartient", "nous": "appartenons", "vous": "appartenez", "ils/elles": "appartiennent"},
    preterite: {"je": "ai appartenu", "tu": "as appartenu", "il/elle": "a appartenu", "nous": "avons appartenu", "vous": "avez appartenu", "ils/elles": "ont appartenu"},
    future: {"je": "appartiendrai", "tu": "appartiendras", "il/elle": "appartiendra", "nous": "appartiendrons", "vous": "appartiendrez", "ils/elles": "appartiendront"}
  },
  {
    id: 210, infinitive: "remettre", translation: "передавать / откладывать",
    transcription: "рёмэ́тр",
    example: {"greek": "Remettez-moi le document au guichet.", "ru": "Передайте мне документ в окне."},
    present: {"je": "remets", "tu": "remets", "il/elle": "remet", "nous": "remettons", "vous": "remettez", "ils/elles": "remettent"},
    preterite: {"je": "ai remis", "tu": "as remis", "il/elle": "a remis", "nous": "avons remis", "vous": "avez remis", "ils/elles": "ont remis"},
    future: {"je": "remettrai", "tu": "remettras", "il/elle": "remettra", "nous": "remettrons", "vous": "remettrez", "ils/elles": "remettront"}
  },
  {
    id: 211, infinitive: "reprendre", translation: "забирать обратно / возобновлять",
    transcription: "рёпра́ндр",
    example: {"greek": "Le travail reprend en septembre.", "ru": "Работа возобновляется в сентябре."},
    present: {"je": "reprends", "tu": "reprends", "il/elle": "reprend", "nous": "reprenons", "vous": "reprenez", "ils/elles": "reprennent"},
    preterite: {"je": "ai repris", "tu": "as repris", "il/elle": "a repris", "nous": "avons repris", "vous": "avez repris", "ils/elles": "ont repris"},
    future: {"je": "reprendrai", "tu": "reprendras", "il/elle": "reprendra", "nous": "reprendrons", "vous": "reprendrez", "ils/elles": "reprendront"}
  },
  {
    id: 212, infinitive: "surprendre", translation: "удивлять / заставать врасплох",
    transcription: "сюрпра́ндр",
    example: {"greek": "Ça m'a beaucoup surpris.", "ru": "Это меня сильно удивило."},
    present: {"je": "surprends", "tu": "surprends", "il/elle": "surprend", "nous": "surprenons", "vous": "surprenez", "ils/elles": "surprennent"},
    preterite: {"je": "ai surpris", "tu": "as surpris", "il/elle": "a surpris", "nous": "avons surpris", "vous": "avez surpris", "ils/elles": "ont surpris"},
    future: {"je": "surprendrai", "tu": "surprendras", "il/elle": "surprendra", "nous": "surprendrons", "vous": "surprendrez", "ils/elles": "surprendront"}
  },
  {
    id: 213, infinitive: "maintenir", translation: "поддерживать / сохранять",
    transcription: "мэнтёни́р",
    example: {"greek": "Il faut maintenir la température à dix-neuf degrés.", "ru": "Нужно поддерживать температуру девятнадцать градусов."},
    present: {"je": "maintiens", "tu": "maintiens", "il/elle": "maintient", "nous": "maintenons", "vous": "maintenez", "ils/elles": "maintiennent"},
    preterite: {"je": "ai maintenu", "tu": "as maintenu", "il/elle": "a maintenu", "nous": "avons maintenu", "vous": "avez maintenu", "ils/elles": "ont maintenu"},
    future: {"je": "maintiendrai", "tu": "maintiendras", "il/elle": "maintiendra", "nous": "maintiendrons", "vous": "maintiendrez", "ils/elles": "maintiendront"}
  },
  {
    id: 214, infinitive: "placer", translation: "размещать",
    transcription: "пласэ́",
    example: {"greek": "Le serveur nous a placés près de la fenêtre.", "ru": "Официант посадил нас у окна."},
    present: {"je": "place", "tu": "places", "il/elle": "place", "nous": "plaçons", "vous": "placez", "ils/elles": "placent"},
    preterite: {"je": "ai placé", "tu": "as placé", "il/elle": "a placé", "nous": "avons placé", "vous": "avez placé", "ils/elles": "ont placé"},
    future: {"je": "placerai", "tu": "placeras", "il/elle": "placera", "nous": "placerons", "vous": "placerez", "ils/elles": "placeront"}
  },
  {
    id: 215, infinitive: "obliger", translation: "обязывать",
    transcription: "оближэ́",
    example: {"greek": "La loi oblige à assurer le logement.", "ru": "Закон обязывает страховать жильё."},
    present: {"je": "oblige", "tu": "obliges", "il/elle": "oblige", "nous": "obligeons", "vous": "obligez", "ils/elles": "obligent"},
    preterite: {"je": "ai obligé", "tu": "as obligé", "il/elle": "a obligé", "nous": "avons obligé", "vous": "avez obligé", "ils/elles": "ont obligé"},
    future: {"je": "obligerai", "tu": "obligeras", "il/elle": "obligera", "nous": "obligerons", "vous": "obligerez", "ils/elles": "obligeront"}
  },
  {
    id: 216, infinitive: "peser", translation: "весить / взвешивать",
    transcription: "пёзэ́",
    example: {"greek": "Le colis pèse deux kilos.", "ru": "Посылка весит два килограмма."},
    present: {"je": "pèse", "tu": "pèses", "il/elle": "pèse", "nous": "pesons", "vous": "pesez", "ils/elles": "pèsent"},
    preterite: {"je": "ai pesé", "tu": "as pesé", "il/elle": "a pesé", "nous": "avons pesé", "vous": "avez pesé", "ils/elles": "ont pesé"},
    future: {"je": "pèserai", "tu": "pèseras", "il/elle": "pèsera", "nous": "pèserons", "vous": "pèserez", "ils/elles": "pèseront"}
  },
  {
    id: 217, infinitive: "cuisiner", translation: "готовить (еду)",
    transcription: "кюизинэ́",
    example: {"greek": "Je cuisine français une fois par semaine.", "ru": "Раз в неделю я готовлю французское."},
    present: {"je": "cuisine", "tu": "cuisines", "il/elle": "cuisine", "nous": "cuisinons", "vous": "cuisinez", "ils/elles": "cuisinent"},
    preterite: {"je": "ai cuisiné", "tu": "as cuisiné", "il/elle": "a cuisiné", "nous": "avons cuisiné", "vous": "avez cuisiné", "ils/elles": "ont cuisiné"},
    future: {"je": "cuisinerai", "tu": "cuisineras", "il/elle": "cuisinera", "nous": "cuisinerons", "vous": "cuisinerez", "ils/elles": "cuisineront"}
  },
  {
    id: 218, infinitive: "cuire", translation: "варить / печь",
    transcription: "кюир",
    example: {"greek": "Faites cuire les pâtes dix minutes.", "ru": "Варите макароны десять минут."},
    present: {"je": "cuis", "tu": "cuis", "il/elle": "cuit", "nous": "cuisons", "vous": "cuisez", "ils/elles": "cuisent"},
    preterite: {"je": "ai cuit", "tu": "as cuit", "il/elle": "a cuit", "nous": "avons cuit", "vous": "avez cuit", "ils/elles": "ont cuit"},
    future: {"je": "cuirai", "tu": "cuiras", "il/elle": "cuira", "nous": "cuirons", "vous": "cuirez", "ils/elles": "cuiront"}
  },
  {
    id: 219, infinitive: "mélanger", translation: "смешивать",
    transcription: "меланжэ́",
    example: {"greek": "Mélangez bien avant de servir.", "ru": "Хорошо перемешайте перед подачей."},
    present: {"je": "mélange", "tu": "mélanges", "il/elle": "mélange", "nous": "mélangeons", "vous": "mélangez", "ils/elles": "mélangent"},
    preterite: {"je": "ai mélangé", "tu": "as mélangé", "il/elle": "a mélangé", "nous": "avons mélangé", "vous": "avez mélangé", "ils/elles": "ont mélangé"},
    future: {"je": "mélangerai", "tu": "mélangeras", "il/elle": "mélangera", "nous": "mélangerons", "vous": "mélangerez", "ils/elles": "mélangeront"}
  },
  {
    id: 220, infinitive: "verser", translation: "наливать",
    transcription: "версэ́",
    example: {"greek": "Versez l'eau dans la casserole.", "ru": "Налейте воду в кастрюлю."},
    present: {"je": "verse", "tu": "verses", "il/elle": "verse", "nous": "versons", "vous": "versez", "ils/elles": "versent"},
    preterite: {"je": "ai versé", "tu": "as versé", "il/elle": "a versé", "nous": "avons versé", "vous": "avez versé", "ils/elles": "ont versé"},
    future: {"je": "verserai", "tu": "verseras", "il/elle": "versera", "nous": "verserons", "vous": "verserez", "ils/elles": "verseront"}
  },
  {
    id: 221, infinitive: "ajouter", translation: "добавлять",
    transcription: "ажутэ́",
    example: {"greek": "Ajoutez une pincée de sel.", "ru": "Добавьте щепотку соли."},
    present: {"je": "ajoute", "tu": "ajoutes", "il/elle": "ajoute", "nous": "ajoutons", "vous": "ajoutez", "ils/elles": "ajoutent"},
    preterite: {"je": "ai ajouté", "tu": "as ajouté", "il/elle": "a ajouté", "nous": "avons ajouté", "vous": "avez ajouté", "ils/elles": "ont ajouté"},
    future: {"je": "ajouterai", "tu": "ajouteras", "il/elle": "ajoutera", "nous": "ajouterons", "vous": "ajouterez", "ils/elles": "ajouteront"}
  },
  {
    id: 222, infinitive: "éplucher", translation: "чистить (овощи)",
    transcription: "эплюшэ́",
    example: {"greek": "J'épluche les pommes de terre.", "ru": "Я чищу картошку."},
    present: {"je": "épluche", "tu": "épluches", "il/elle": "épluche", "nous": "épluchons", "vous": "épluchez", "ils/elles": "épluchent"},
    preterite: {"je": "ai épluché", "tu": "as épluché", "il/elle": "a épluché", "nous": "avons épluché", "vous": "avez épluché", "ils/elles": "ont épluché"},
    future: {"je": "éplucherai", "tu": "éplucheras", "il/elle": "épluchera", "nous": "éplucherons", "vous": "éplucherez", "ils/elles": "éplucheront"}
  },
  {
    id: 223, infinitive: "réchauffer", translation: "разогревать",
    transcription: "решофэ́",
    example: {"greek": "Réchauffez le plat deux minutes.", "ru": "Разогрейте блюдо две минуты."},
    present: {"je": "réchauffe", "tu": "réchauffes", "il/elle": "réchauffe", "nous": "réchauffons", "vous": "réchauffez", "ils/elles": "réchauffent"},
    preterite: {"je": "ai réchauffé", "tu": "as réchauffé", "il/elle": "a réchauffé", "nous": "avons réchauffé", "vous": "avez réchauffé", "ils/elles": "ont réchauffé"},
    future: {"je": "réchaufferai", "tu": "réchaufferas", "il/elle": "réchauffera", "nous": "réchaufferons", "vous": "réchaufferez", "ils/elles": "réchaufferont"}
  },
  {
    id: 224, infinitive: "congeler", translation: "замораживать",
    transcription: "конжёлэ́",
    example: {"greek": "On congèle le pain pour la semaine.", "ru": "Мы замораживаем хлеб на неделю."},
    present: {"je": "congèle", "tu": "congèles", "il/elle": "congèle", "nous": "congelons", "vous": "congelez", "ils/elles": "congèlent"},
    preterite: {"je": "ai congelé", "tu": "as congelé", "il/elle": "a congelé", "nous": "avons congelé", "vous": "avez congelé", "ils/elles": "ont congelé"},
    future: {"je": "congèlerai", "tu": "congèleras", "il/elle": "congèlera", "nous": "congèlerons", "vous": "congèlerez", "ils/elles": "congèleront"}
  },
  {
    id: 225, infinitive: "commander", translation: "заказывать",
    transcription: "командэ́",
    example: {"greek": "J'ai commandé le plat du jour.", "ru": "Я заказал блюдо дня."},
    present: {"je": "commande", "tu": "commandes", "il/elle": "commande", "nous": "commandons", "vous": "commandez", "ils/elles": "commandent"},
    preterite: {"je": "ai commandé", "tu": "as commandé", "il/elle": "a commandé", "nous": "avons commandé", "vous": "avez commandé", "ils/elles": "ont commandé"},
    future: {"je": "commanderai", "tu": "commanderas", "il/elle": "commandera", "nous": "commanderons", "vous": "commanderez", "ils/elles": "commanderont"}
  },
  {
    id: 226, infinitive: "avaler", translation: "глотать",
    transcription: "авалэ́",
    example: {"greek": "J'ai du mal à avaler.", "ru": "Мне трудно глотать."},
    present: {"je": "avale", "tu": "avales", "il/elle": "avale", "nous": "avalons", "vous": "avalez", "ils/elles": "avalent"},
    preterite: {"je": "ai avalé", "tu": "as avalé", "il/elle": "a avalé", "nous": "avons avalé", "vous": "avez avalé", "ils/elles": "ont avalé"},
    future: {"je": "avalerai", "tu": "avaleras", "il/elle": "avalera", "nous": "avalerons", "vous": "avalerez", "ils/elles": "avaleront"}
  },
  {
    id: 227, infinitive: "grignoter", translation: "перекусывать",
    transcription: "гриньотэ́",
    example: {"greek": "J'évite de grignoter entre les repas.", "ru": "Я стараюсь не перекусывать между приёмами пищи."},
    present: {"je": "grignote", "tu": "grignotes", "il/elle": "grignote", "nous": "grignotons", "vous": "grignotez", "ils/elles": "grignotent"},
    preterite: {"je": "ai grignoté", "tu": "as grignoté", "il/elle": "a grignoté", "nous": "avons grignoté", "vous": "avez grignoté", "ils/elles": "ont grignoté"},
    future: {"je": "grignoterai", "tu": "grignoteras", "il/elle": "grignotera", "nous": "grignoterons", "vous": "grignoterez", "ils/elles": "grignoteront"}
  },
  {
    id: 228, infinitive: "déguster", translation: "дегустировать",
    transcription: "дегюстэ́",
    example: {"greek": "On a dégusté trois fromages.", "ru": "Мы продегустировали три сыра."},
    present: {"je": "déguste", "tu": "dégustes", "il/elle": "déguste", "nous": "dégustons", "vous": "dégustez", "ils/elles": "dégustent"},
    preterite: {"je": "ai dégusté", "tu": "as dégusté", "il/elle": "a dégusté", "nous": "avons dégusté", "vous": "avez dégusté", "ils/elles": "ont dégusté"},
    future: {"je": "dégusterai", "tu": "dégusteras", "il/elle": "dégustera", "nous": "dégusterons", "vous": "dégusterez", "ils/elles": "dégusteront"}
  },
  {
    id: 229, infinitive: "soigner", translation: "лечить",
    transcription: "суаньэ́",
    example: {"greek": "Le médecin me soigne depuis un an.", "ru": "Этот врач лечит меня уже год."},
    present: {"je": "soigne", "tu": "soignes", "il/elle": "soigne", "nous": "soignons", "vous": "soignez", "ils/elles": "soignent"},
    preterite: {"je": "ai soigné", "tu": "as soigné", "il/elle": "a soigné", "nous": "avons soigné", "vous": "avez soigné", "ils/elles": "ont soigné"},
    future: {"je": "soignerai", "tu": "soigneras", "il/elle": "soignera", "nous": "soignerons", "vous": "soignerez", "ils/elles": "soigneront"}
  },
  {
    id: 230, infinitive: "guérir", translation: "выздоравливать",
    transcription: "гери́р",
    example: {"greek": "Il a guéri en une semaine.", "ru": "Он поправился за неделю."},
    present: {"je": "guéris", "tu": "guéris", "il/elle": "guérit", "nous": "guérissons", "vous": "guérissez", "ils/elles": "guérissent"},
    preterite: {"je": "ai guéri", "tu": "as guéri", "il/elle": "a guéri", "nous": "avons guéri", "vous": "avez guéri", "ils/elles": "ont guéri"},
    future: {"je": "guérirai", "tu": "guériras", "il/elle": "guérira", "nous": "guérirons", "vous": "guérirez", "ils/elles": "guériront"}
  },
  {
    id: 231, infinitive: "tousser", translation: "кашлять",
    transcription: "тусэ́",
    example: {"greek": "Je tousse depuis trois jours.", "ru": "Я кашляю три дня."},
    present: {"je": "tousse", "tu": "tousses", "il/elle": "tousse", "nous": "toussons", "vous": "toussez", "ils/elles": "toussent"},
    preterite: {"je": "ai toussé", "tu": "as toussé", "il/elle": "a toussé", "nous": "avons toussé", "vous": "avez toussé", "ils/elles": "ont toussé"},
    future: {"je": "tousserai", "tu": "tousseras", "il/elle": "toussera", "nous": "tousserons", "vous": "tousserez", "ils/elles": "tousseront"}
  },
  {
    id: 232, infinitive: "éternuer", translation: "чихать",
    transcription: "этернюэ́",
    example: {"greek": "J'éternue à cause du pollen.", "ru": "Я чихаю из-за пыльцы."},
    present: {"je": "éternue", "tu": "éternues", "il/elle": "éternue", "nous": "éternuons", "vous": "éternuez", "ils/elles": "éternuent"},
    preterite: {"je": "ai éternué", "tu": "as éternué", "il/elle": "a éternué", "nous": "avons éternué", "vous": "avez éternué", "ils/elles": "ont éternué"},
    future: {"je": "éternuerai", "tu": "éternueras", "il/elle": "éternuera", "nous": "éternuerons", "vous": "éternuerez", "ils/elles": "éternueront"}
  },
  {
    id: 233, infinitive: "saigner", translation: "кровоточить",
    transcription: "сэньэ́",
    example: {"greek": "Mon nez saigne.", "ru": "У меня идёт кровь из носа."},
    present: {"je": "saigne", "tu": "saignes", "il/elle": "saigne", "nous": "saignons", "vous": "saignez", "ils/elles": "saignent"},
    preterite: {"je": "ai saigné", "tu": "as saigné", "il/elle": "a saigné", "nous": "avons saigné", "vous": "avez saigné", "ils/elles": "ont saigné"},
    future: {"je": "saignerai", "tu": "saigneras", "il/elle": "saignera", "nous": "saignerons", "vous": "saignerez", "ils/elles": "saigneront"}
  },
  {
    id: 234, infinitive: "respirer", translation: "дышать",
    transcription: "респирэ́",
    example: {"greek": "Respirez profondément.", "ru": "Дышите глубоко."},
    present: {"je": "respire", "tu": "respires", "il/elle": "respire", "nous": "respirons", "vous": "respirez", "ils/elles": "respirent"},
    preterite: {"je": "ai respiré", "tu": "as respiré", "il/elle": "a respiré", "nous": "avons respiré", "vous": "avez respiré", "ils/elles": "ont respiré"},
    future: {"je": "respirerai", "tu": "respireras", "il/elle": "respirera", "nous": "respirerons", "vous": "respirerez", "ils/elles": "respireront"}
  },
  {
    id: 235, infinitive: "examiner", translation: "осматривать",
    transcription: "эгзаминэ́",
    example: {"greek": "Le médecin va vous examiner.", "ru": "Врач вас осмотрит."},
    present: {"je": "examine", "tu": "examines", "il/elle": "examine", "nous": "examinons", "vous": "examinez", "ils/elles": "examinent"},
    preterite: {"je": "ai examiné", "tu": "as examiné", "il/elle": "a examiné", "nous": "avons examiné", "vous": "avez examiné", "ils/elles": "ont examiné"},
    future: {"je": "examinerai", "tu": "examineras", "il/elle": "examinera", "nous": "examinerons", "vous": "examinerez", "ils/elles": "examineront"}
  },
  {
    id: 236, infinitive: "prescrire", translation: "выписывать (рецепт)",
    transcription: "прескри́р",
    example: {"greek": "Il m'a prescrit des antibiotiques.", "ru": "Он выписал мне антибиотики."},
    present: {"je": "prescris", "tu": "prescris", "il/elle": "prescrit", "nous": "prescrivons", "vous": "prescrivez", "ils/elles": "prescrivent"},
    preterite: {"je": "ai prescrit", "tu": "as prescrit", "il/elle": "a prescrit", "nous": "avons prescrit", "vous": "avez prescrit", "ils/elles": "ont prescrit"},
    future: {"je": "prescrirai", "tu": "prescriras", "il/elle": "prescrira", "nous": "prescrirons", "vous": "prescrirez", "ils/elles": "prescriront"}
  },
  {
    id: 237, infinitive: "opérer", translation: "оперировать",
    transcription: "оперэ́",
    example: {"greek": "On l'a opéré du genou.", "ru": "Ему сделали операцию на колене."},
    present: {"je": "opère", "tu": "opères", "il/elle": "opère", "nous": "opérons", "vous": "opérez", "ils/elles": "opèrent"},
    preterite: {"je": "ai opéré", "tu": "as opéré", "il/elle": "a opéré", "nous": "avons opéré", "vous": "avez opéré", "ils/elles": "ont opéré"},
    future: {"je": "opèrerai", "tu": "opèreras", "il/elle": "opèrera", "nous": "opèrerons", "vous": "opèrerez", "ils/elles": "opèreront"}
  },
  {
    id: 238, infinitive: "vacciner", translation: "прививать",
    transcription: "ваксинэ́",
    example: {"greek": "Les enfants sont vaccinés à l'école.", "ru": "Детей прививают в школе."},
    present: {"je": "vaccine", "tu": "vaccines", "il/elle": "vaccine", "nous": "vaccinons", "vous": "vaccinez", "ils/elles": "vaccinent"},
    preterite: {"je": "ai vacciné", "tu": "as vacciné", "il/elle": "a vacciné", "nous": "avons vacciné", "vous": "avez vacciné", "ils/elles": "ont vacciné"},
    future: {"je": "vaccinerai", "tu": "vaccineras", "il/elle": "vaccinera", "nous": "vaccinerons", "vous": "vaccinerez", "ils/elles": "vaccineront"}
  },
  {
    id: 239, infinitive: "consulter", translation: "обращаться к врачу / сверяться",
    transcription: "консюльтэ́",
    example: {"greek": "Consultez un médecin si ça continue.", "ru": "Обратитесь к врачу, если это продолжится."},
    present: {"je": "consulte", "tu": "consultes", "il/elle": "consulte", "nous": "consultons", "vous": "consultez", "ils/elles": "consultent"},
    preterite: {"je": "ai consulté", "tu": "as consulté", "il/elle": "a consulté", "nous": "avons consulté", "vous": "avez consulté", "ils/elles": "ont consulté"},
    future: {"je": "consulterai", "tu": "consulteras", "il/elle": "consultera", "nous": "consulterons", "vous": "consulterez", "ils/elles": "consulteront"}
  },
  {
    id: 240, infinitive: "protéger", translation: "защищать",
    transcription: "протежэ́",
    example: {"greek": "L'assurance vous protège en cas de sinistre.", "ru": "Страховка защищает вас при страховом случае."},
    present: {"je": "protège", "tu": "protèges", "il/elle": "protège", "nous": "protégeons", "vous": "protégez", "ils/elles": "protègent"},
    preterite: {"je": "ai protégé", "tu": "as protégé", "il/elle": "a protégé", "nous": "avons protégé", "vous": "avez protégé", "ils/elles": "ont protégé"},
    future: {"je": "protègerai", "tu": "protègeras", "il/elle": "protègera", "nous": "protègerons", "vous": "protègerez", "ils/elles": "protègeront"}
  },
  {
    id: 241, infinitive: "rouler", translation: "ехать (о машине)",
    transcription: "рулэ́",
    example: {"greek": "On roule à cinquante en ville.", "ru": "В городе едут пятьдесят."},
    present: {"je": "roule", "tu": "roules", "il/elle": "roule", "nous": "roulons", "vous": "roulez", "ils/elles": "roulent"},
    preterite: {"je": "ai roulé", "tu": "as roulé", "il/elle": "a roulé", "nous": "avons roulé", "vous": "avez roulé", "ils/elles": "ont roulé"},
    future: {"je": "roulerai", "tu": "rouleras", "il/elle": "roulera", "nous": "roulerons", "vous": "roulerez", "ils/elles": "rouleront"}
  },
  {
    id: 242, infinitive: "freiner", translation: "тормозить",
    transcription: "фрэнэ́",
    example: {"greek": "Freinez doucement sur le verglas.", "ru": "Тормозите плавно на гололёде."},
    present: {"je": "freine", "tu": "freines", "il/elle": "freine", "nous": "freinons", "vous": "freinez", "ils/elles": "freinent"},
    preterite: {"je": "ai freiné", "tu": "as freiné", "il/elle": "a freiné", "nous": "avons freiné", "vous": "avez freiné", "ils/elles": "ont freiné"},
    future: {"je": "freinerai", "tu": "freineras", "il/elle": "freinera", "nous": "freinerons", "vous": "freinerez", "ils/elles": "freineront"}
  },
  {
    id: 243, infinitive: "stationner", translation: "парковаться",
    transcription: "стасьонэ́",
    example: {"greek": "Il est interdit de stationner ici.", "ru": "Здесь запрещено парковаться."},
    present: {"je": "stationne", "tu": "stationnes", "il/elle": "stationne", "nous": "stationnons", "vous": "stationnez", "ils/elles": "stationnent"},
    preterite: {"je": "ai stationné", "tu": "as stationné", "il/elle": "a stationné", "nous": "avons stationné", "vous": "avez stationné", "ils/elles": "ont stationné"},
    future: {"je": "stationnerai", "tu": "stationneras", "il/elle": "stationnera", "nous": "stationnerons", "vous": "stationnerez", "ils/elles": "stationneront"}
  },
  {
    id: 244, infinitive: "circuler", translation: "передвигаться / ходить (о транспорте)",
    transcription: "сиркюлэ́",
    example: {"greek": "Les trains ne circulent pas aujourd'hui.", "ru": "Сегодня поезда не ходят."},
    present: {"je": "circule", "tu": "circules", "il/elle": "circule", "nous": "circulons", "vous": "circulez", "ils/elles": "circulent"},
    preterite: {"je": "ai circulé", "tu": "as circulé", "il/elle": "a circulé", "nous": "avons circulé", "vous": "avez circulé", "ils/elles": "ont circulé"},
    future: {"je": "circulerai", "tu": "circuleras", "il/elle": "circulera", "nous": "circulerons", "vous": "circulerez", "ils/elles": "circuleront"}
  },
  {
    id: 245, infinitive: "composter", translation: "компостировать",
    transcription: "компостэ́",
    example: {"greek": "Il faut composter le billet avant de monter.", "ru": "Билет нужно прокомпостировать до посадки."},
    present: {"je": "composte", "tu": "compostes", "il/elle": "composte", "nous": "compostons", "vous": "compostez", "ils/elles": "compostent"},
    preterite: {"je": "ai composté", "tu": "as composté", "il/elle": "a composté", "nous": "avons composté", "vous": "avez composté", "ils/elles": "ont composté"},
    future: {"je": "composterai", "tu": "composteras", "il/elle": "compostera", "nous": "composterons", "vous": "composterez", "ils/elles": "composteront"}
  },
  {
    id: 246, infinitive: "embarquer", translation: "садиться (в транспорт)",
    transcription: "амбаркэ́",
    example: {"greek": "On embarque dans dix minutes.", "ru": "Посадка через десять минут."},
    present: {"je": "embarque", "tu": "embarques", "il/elle": "embarque", "nous": "embarquons", "vous": "embarquez", "ils/elles": "embarquent"},
    preterite: {"je": "ai embarqué", "tu": "as embarqué", "il/elle": "a embarqué", "nous": "avons embarqué", "vous": "avez embarqué", "ils/elles": "ont embarqué"},
    future: {"je": "embarquerai", "tu": "embarqueras", "il/elle": "embarquera", "nous": "embarquerons", "vous": "embarquerez", "ils/elles": "embarqueront"}
  },
  {
    id: 247, infinitive: "atterrir", translation: "приземляться",
    transcription: "атери́р",
    example: {"greek": "L'avion atterrit à seize heures.", "ru": "Самолёт приземляется в четыре."},
    present: {"je": "atterris", "tu": "atterris", "il/elle": "atterrit", "nous": "atterrissons", "vous": "atterrissez", "ils/elles": "atterrissent"},
    preterite: {"je": "ai atterri", "tu": "as atterri", "il/elle": "a atterri", "nous": "avons atterri", "vous": "avez atterri", "ils/elles": "ont atterri"},
    future: {"je": "atterrirai", "tu": "atterriras", "il/elle": "atterrira", "nous": "atterrirons", "vous": "atterrirez", "ils/elles": "atterriront"}
  },
  {
    id: 248, infinitive: "rater", translation: "пропустить / не успеть",
    transcription: "ратэ́",
    example: {"greek": "J'ai raté mon train.", "ru": "Я опоздал на поезд."},
    present: {"je": "rate", "tu": "rates", "il/elle": "rate", "nous": "ratons", "vous": "ratez", "ils/elles": "ratent"},
    preterite: {"je": "ai raté", "tu": "as raté", "il/elle": "a raté", "nous": "avons raté", "vous": "avez raté", "ils/elles": "ont raté"},
    future: {"je": "raterai", "tu": "rateras", "il/elle": "ratera", "nous": "raterons", "vous": "raterez", "ils/elles": "rateront"}
  },
  {
    id: 249, infinitive: "manquer", translation: "не хватать / пропускать",
    transcription: "манкэ́",
    example: {"greek": "Il me manque un justificatif.", "ru": "Мне не хватает одной справки."},
    present: {"je": "manque", "tu": "manques", "il/elle": "manque", "nous": "manquons", "vous": "manquez", "ils/elles": "manquent"},
    preterite: {"je": "ai manqué", "tu": "as manqué", "il/elle": "a manqué", "nous": "avons manqué", "vous": "avez manqué", "ils/elles": "ont manqué"},
    future: {"je": "manquerai", "tu": "manqueras", "il/elle": "manquera", "nous": "manquerons", "vous": "manquerez", "ils/elles": "manqueront"}
  },
  {
    id: 250, infinitive: "attraper", translation: "ловить / успеть",
    transcription: "атрапэ́",
    example: {"greek": "J'ai attrapé le dernier métro.", "ru": "Я успел на последнее метро."},
    present: {"je": "attrape", "tu": "attrapes", "il/elle": "attrape", "nous": "attrapons", "vous": "attrapez", "ils/elles": "attrapent"},
    preterite: {"je": "ai attrapé", "tu": "as attrapé", "il/elle": "a attrapé", "nous": "avons attrapé", "vous": "avez attrapé", "ils/elles": "ont attrapé"},
    future: {"je": "attraperai", "tu": "attraperas", "il/elle": "attrapera", "nous": "attraperons", "vous": "attraperez", "ils/elles": "attraperont"}
  },
  {
    id: 251, infinitive: "télécharger", translation: "скачивать",
    transcription: "телешаржэ́",
    example: {"greek": "Téléchargez l'attestation en PDF.", "ru": "Скачайте справку в PDF."},
    present: {"je": "télécharge", "tu": "télécharges", "il/elle": "télécharge", "nous": "téléchargeons", "vous": "téléchargez", "ils/elles": "téléchargent"},
    preterite: {"je": "ai téléchargé", "tu": "as téléchargé", "il/elle": "a téléchargé", "nous": "avons téléchargé", "vous": "avez téléchargé", "ils/elles": "ont téléchargé"},
    future: {"je": "téléchargerai", "tu": "téléchargeras", "il/elle": "téléchargera", "nous": "téléchargerons", "vous": "téléchargerez", "ils/elles": "téléchargeront"}
  },
  {
    id: 252, infinitive: "cliquer", translation: "нажимать (мышью)",
    transcription: "кликэ́",
    example: {"greek": "Cliquez sur « valider ».", "ru": "Нажмите «подтвердить»."},
    present: {"je": "clique", "tu": "cliques", "il/elle": "clique", "nous": "cliquons", "vous": "cliquez", "ils/elles": "cliquent"},
    preterite: {"je": "ai cliqué", "tu": "as cliqué", "il/elle": "a cliqué", "nous": "avons cliqué", "vous": "avez cliqué", "ils/elles": "ont cliqué"},
    future: {"je": "cliquerai", "tu": "cliqueras", "il/elle": "cliquera", "nous": "cliquerons", "vous": "cliquerez", "ils/elles": "cliqueront"}
  },
  {
    id: 253, infinitive: "taper", translation: "набирать (текст, код)",
    transcription: "тапэ́",
    example: {"greek": "Tapez votre code à quatre chiffres.", "ru": "Введите свой четырёхзначный код."},
    present: {"je": "tape", "tu": "tapes", "il/elle": "tape", "nous": "tapons", "vous": "tapez", "ils/elles": "tapent"},
    preterite: {"je": "ai tapé", "tu": "as tapé", "il/elle": "a tapé", "nous": "avons tapé", "vous": "avez tapé", "ils/elles": "ont tapé"},
    future: {"je": "taperai", "tu": "taperas", "il/elle": "tapera", "nous": "taperons", "vous": "taperez", "ils/elles": "taperont"}
  },
  {
    id: 254, infinitive: "enregistrer", translation: "сохранять / записывать",
    transcription: "анрёжистрэ́",
    example: {"greek": "Enregistrez le document avant de fermer.", "ru": "Сохраните документ перед закрытием."},
    present: {"je": "enregistre", "tu": "enregistres", "il/elle": "enregistre", "nous": "enregistrons", "vous": "enregistrez", "ils/elles": "enregistrent"},
    preterite: {"je": "ai enregistré", "tu": "as enregistré", "il/elle": "a enregistré", "nous": "avons enregistré", "vous": "avez enregistré", "ils/elles": "ont enregistré"},
    future: {"je": "enregistrerai", "tu": "enregistreras", "il/elle": "enregistrera", "nous": "enregistrerons", "vous": "enregistrerez", "ils/elles": "enregistreront"}
  },
  {
    id: 255, infinitive: "supprimer", translation: "удалять",
    transcription: "сюпримэ́",
    example: {"greek": "J'ai supprimé le message par erreur.", "ru": "Я удалил сообщение по ошибке."},
    present: {"je": "supprime", "tu": "supprimes", "il/elle": "supprime", "nous": "supprimons", "vous": "supprimez", "ils/elles": "suppriment"},
    preterite: {"je": "ai supprimé", "tu": "as supprimé", "il/elle": "a supprimé", "nous": "avons supprimé", "vous": "avez supprimé", "ils/elles": "ont supprimé"},
    future: {"je": "supprimerai", "tu": "supprimeras", "il/elle": "supprimera", "nous": "supprimerons", "vous": "supprimerez", "ils/elles": "supprimeront"}
  },
  {
    id: 256, infinitive: "installer", translation: "устанавливать",
    transcription: "энсталэ́",
    example: {"greek": "Installez l'application sur votre téléphone.", "ru": "Установите приложение на телефон."},
    present: {"je": "installe", "tu": "installes", "il/elle": "installe", "nous": "installons", "vous": "installez", "ils/elles": "installent"},
    preterite: {"je": "ai installé", "tu": "as installé", "il/elle": "a installé", "nous": "avons installé", "vous": "avez installé", "ils/elles": "ont installé"},
    future: {"je": "installerai", "tu": "installeras", "il/elle": "installera", "nous": "installerons", "vous": "installerez", "ils/elles": "installeront"}
  },
  {
    id: 257, infinitive: "connecter", translation: "подключать",
    transcription: "конектэ́",
    example: {"greek": "Je n'arrive pas à me connecter au site.", "ru": "У меня не получается зайти на сайт."},
    present: {"je": "connecte", "tu": "connectes", "il/elle": "connecte", "nous": "connectons", "vous": "connectez", "ils/elles": "connectent"},
    preterite: {"je": "ai connecté", "tu": "as connecté", "il/elle": "a connecté", "nous": "avons connecté", "vous": "avez connecté", "ils/elles": "ont connecté"},
    future: {"je": "connecterai", "tu": "connecteras", "il/elle": "connectera", "nous": "connecterons", "vous": "connecterez", "ils/elles": "connecteront"}
  },
  {
    id: 258, infinitive: "recharger", translation: "пополнять / заряжать",
    transcription: "рёшаржэ́",
    example: {"greek": "Je dois recharger mon Navigo.", "ru": "Мне нужно пополнить Navigo."},
    present: {"je": "recharge", "tu": "recharges", "il/elle": "recharge", "nous": "rechargeons", "vous": "rechargez", "ils/elles": "rechargent"},
    preterite: {"je": "ai rechargé", "tu": "as rechargé", "il/elle": "a rechargé", "nous": "avons rechargé", "vous": "avez rechargé", "ils/elles": "ont rechargé"},
    future: {"je": "rechargerai", "tu": "rechargeras", "il/elle": "rechargera", "nous": "rechargerons", "vous": "rechargerez", "ils/elles": "rechargeront"}
  },
  {
    id: 259, infinitive: "adorer", translation: "обожать",
    transcription: "адорэ́",
    example: {"greek": "J'adore les marchés du dimanche.", "ru": "Обожаю воскресные рынки."},
    present: {"je": "adore", "tu": "adores", "il/elle": "adore", "nous": "adorons", "vous": "adorez", "ils/elles": "adorent"},
    preterite: {"je": "ai adoré", "tu": "as adoré", "il/elle": "a adoré", "nous": "avons adoré", "vous": "avez adoré", "ils/elles": "ont adoré"},
    future: {"je": "adorerai", "tu": "adoreras", "il/elle": "adorera", "nous": "adorerons", "vous": "adorerez", "ils/elles": "adoreront"}
  },
  {
    id: 260, infinitive: "détester", translation: "ненавидеть",
    transcription: "детэстэ́",
    example: {"greek": "Je déteste faire la queue.", "ru": "Ненавижу стоять в очереди."},
    present: {"je": "déteste", "tu": "détestes", "il/elle": "déteste", "nous": "détestons", "vous": "détestez", "ils/elles": "détestent"},
    preterite: {"je": "ai détesté", "tu": "as détesté", "il/elle": "a détesté", "nous": "avons détesté", "vous": "avez détesté", "ils/elles": "ont détesté"},
    future: {"je": "détesterai", "tu": "détesteras", "il/elle": "détestera", "nous": "détesterons", "vous": "détesterez", "ils/elles": "détesteront"}
  },
  {
    id: 261, infinitive: "apprécier", translation: "ценить",
    transcription: "апресье́",
    example: {"greek": "J'apprécie beaucoup votre aide.", "ru": "Я очень ценю вашу помощь."},
    present: {"je": "apprécie", "tu": "apprécies", "il/elle": "apprécie", "nous": "apprécions", "vous": "appréciez", "ils/elles": "apprécient"},
    preterite: {"je": "ai apprécié", "tu": "as apprécié", "il/elle": "a apprécié", "nous": "avons apprécié", "vous": "avez apprécié", "ils/elles": "ont apprécié"},
    future: {"je": "apprécierai", "tu": "apprécieras", "il/elle": "appréciera", "nous": "apprécierons", "vous": "apprécierez", "ils/elles": "apprécieront"}
  },
  {
    id: 262, infinitive: "inquiéter", translation: "беспокоить",
    transcription: "энкьетэ́",
    example: {"greek": "Ne vous inquiétez pas, tout est en ordre.", "ru": "Не беспокойтесь, всё в порядке."},
    present: {"je": "inquiète", "tu": "inquiètes", "il/elle": "inquiète", "nous": "inquiétons", "vous": "inquiétez", "ils/elles": "inquiètent"},
    preterite: {"je": "ai inquiété", "tu": "as inquiété", "il/elle": "a inquiété", "nous": "avons inquiété", "vous": "avez inquiété", "ils/elles": "ont inquiété"},
    future: {"je": "inquièterai", "tu": "inquièteras", "il/elle": "inquiètera", "nous": "inquièterons", "vous": "inquièterez", "ils/elles": "inquièteront"}
  },
  {
    id: 263, infinitive: "rassurer", translation: "успокаивать",
    transcription: "расюрэ́",
    example: {"greek": "Le médecin m'a rassuré.", "ru": "Врач меня успокоил."},
    present: {"je": "rassure", "tu": "rassures", "il/elle": "rassure", "nous": "rassurons", "vous": "rassurez", "ils/elles": "rassurent"},
    preterite: {"je": "ai rassuré", "tu": "as rassuré", "il/elle": "a rassuré", "nous": "avons rassuré", "vous": "avez rassuré", "ils/elles": "ont rassuré"},
    future: {"je": "rassurerai", "tu": "rassureras", "il/elle": "rassurera", "nous": "rassurerons", "vous": "rassurerez", "ils/elles": "rassureront"}
  },
  {
    id: 264, infinitive: "pleurer", translation: "плакать",
    transcription: "плёрэ́",
    example: {"greek": "Le bébé pleure toute la nuit.", "ru": "Малыш плачет всю ночь."},
    present: {"je": "pleure", "tu": "pleures", "il/elle": "pleure", "nous": "pleurons", "vous": "pleurez", "ils/elles": "pleurent"},
    preterite: {"je": "ai pleuré", "tu": "as pleuré", "il/elle": "a pleuré", "nous": "avons pleuré", "vous": "avez pleuré", "ils/elles": "ont pleuré"},
    future: {"je": "pleurerai", "tu": "pleureras", "il/elle": "pleurera", "nous": "pleurerons", "vous": "pleurerez", "ils/elles": "pleureront"}
  },
  {
    id: 265, infinitive: "féliciter", translation: "поздравлять",
    transcription: "фелиситэ́",
    example: {"greek": "Je vous félicite pour votre nouveau poste.", "ru": "Поздравляю вас с новой должностью."},
    present: {"je": "félicite", "tu": "félicites", "il/elle": "félicite", "nous": "félicitons", "vous": "félicitez", "ils/elles": "félicitent"},
    preterite: {"je": "ai félicité", "tu": "as félicité", "il/elle": "a félicité", "nous": "avons félicité", "vous": "avez félicité", "ils/elles": "ont félicité"},
    future: {"je": "féliciterai", "tu": "féliciteras", "il/elle": "félicitera", "nous": "féliciterons", "vous": "féliciterez", "ils/elles": "féliciteront"}
  },
  {
    id: 266, infinitive: "encourager", translation: "поддерживать / ободрять",
    transcription: "анкуражэ́",
    example: {"greek": "Mes collègues m'encouragent à parler français.", "ru": "Коллеги подбадривают меня говорить по-французски."},
    present: {"je": "encourage", "tu": "encourages", "il/elle": "encourage", "nous": "encourageons", "vous": "encouragez", "ils/elles": "encouragent"},
    preterite: {"je": "ai encouragé", "tu": "as encouragé", "il/elle": "a encouragé", "nous": "avons encouragé", "vous": "avez encouragé", "ils/elles": "ont encouragé"},
    future: {"je": "encouragerai", "tu": "encourageras", "il/elle": "encouragera", "nous": "encouragerons", "vous": "encouragerez", "ils/elles": "encourageront"}
  },
  {
    id: 267, infinitive: "oser", translation: "осмеливаться",
    transcription: "озэ́",
    example: {"greek": "Je n'ose pas encore téléphoner en français.", "ru": "Я пока не решаюсь звонить по-французски."},
    present: {"je": "ose", "tu": "oses", "il/elle": "ose", "nous": "osons", "vous": "osez", "ils/elles": "osent"},
    preterite: {"je": "ai osé", "tu": "as osé", "il/elle": "a osé", "nous": "avons osé", "vous": "avez osé", "ils/elles": "ont osé"},
    future: {"je": "oserai", "tu": "oseras", "il/elle": "osera", "nous": "oserons", "vous": "oserez", "ils/elles": "oseront"}
  },
  {
    id: 268, infinitive: "craindre", translation: "бояться / опасаться",
    transcription: "крэ́ндр",
    example: {"greek": "Je crains un refus.", "ru": "Я опасаюсь отказа."},
    present: {"je": "crains", "tu": "crains", "il/elle": "craint", "nous": "craignons", "vous": "craignez", "ils/elles": "craignent"},
    preterite: {"je": "ai craint", "tu": "as craint", "il/elle": "a craint", "nous": "avons craint", "vous": "avez craint", "ils/elles": "ont craint"},
    future: {"je": "craindrai", "tu": "craindras", "il/elle": "craindra", "nous": "craindrons", "vous": "craindrez", "ils/elles": "craindront"}
  },
  {
    id: 269, infinitive: "profiter", translation: "пользоваться / наслаждаться",
    transcription: "профитэ́",
    example: {"greek": "Profitez du beau temps.", "ru": "Пользуйтесь хорошей погодой."},
    present: {"je": "profite", "tu": "profites", "il/elle": "profite", "nous": "profitons", "vous": "profitez", "ils/elles": "profitent"},
    preterite: {"je": "ai profité", "tu": "as profité", "il/elle": "a profité", "nous": "avons profité", "vous": "avez profité", "ils/elles": "ont profité"},
    future: {"je": "profiterai", "tu": "profiteras", "il/elle": "profitera", "nous": "profiterons", "vous": "profiterez", "ils/elles": "profiteront"}
  },
  {
    id: 270, infinitive: "énerver", translation: "раздражать",
    transcription: "энервэ́",
    example: {"greek": "Ça m'énerve d'attendre si longtemps.", "ru": "Меня раздражает так долго ждать."},
    present: {"je": "énerve", "tu": "énerves", "il/elle": "énerve", "nous": "énervons", "vous": "énervez", "ils/elles": "énervent"},
    preterite: {"je": "ai énervé", "tu": "as énervé", "il/elle": "a énervé", "nous": "avons énervé", "vous": "avez énervé", "ils/elles": "ont énervé"},
    future: {"je": "énerverai", "tu": "énerveras", "il/elle": "énervera", "nous": "énerverons", "vous": "énerverez", "ils/elles": "énerveront"}
  },
  {
    id: 271, infinitive: "calmer", translation: "успокаивать",
    transcription: "кальмэ́",
    example: {"greek": "Calmez-vous, on va trouver une solution.", "ru": "Успокойтесь, мы найдём решение."},
    present: {"je": "calme", "tu": "calmes", "il/elle": "calme", "nous": "calmons", "vous": "calmez", "ils/elles": "calment"},
    preterite: {"je": "ai calmé", "tu": "as calmé", "il/elle": "a calmé", "nous": "avons calmé", "vous": "avez calmé", "ils/elles": "ont calmé"},
    future: {"je": "calmerai", "tu": "calmeras", "il/elle": "calmera", "nous": "calmerons", "vous": "calmerez", "ils/elles": "calmeront"}
  },
  {
    id: 272, infinitive: "réviser", translation: "повторять (материал)",
    transcription: "ревизэ́",
    example: {"greek": "Je révise le vocabulaire chaque soir.", "ru": "Каждый вечер я повторяю слова."},
    present: {"je": "révise", "tu": "révises", "il/elle": "révise", "nous": "révisons", "vous": "révisez", "ils/elles": "révisent"},
    preterite: {"je": "ai révisé", "tu": "as révisé", "il/elle": "a révisé", "nous": "avons révisé", "vous": "avez révisé", "ils/elles": "ont révisé"},
    future: {"je": "réviserai", "tu": "réviseras", "il/elle": "révisera", "nous": "réviserons", "vous": "réviserez", "ils/elles": "réviseront"}
  },
  {
    id: 273, infinitive: "calculer", translation: "считать / вычислять",
    transcription: "калькюлэ́",
    example: {"greek": "Calculez le total avec les charges.", "ru": "Посчитайте общую сумму с коммунальными."},
    present: {"je": "calcule", "tu": "calcules", "il/elle": "calcule", "nous": "calculons", "vous": "calculez", "ils/elles": "calculent"},
    preterite: {"je": "ai calculé", "tu": "as calculé", "il/elle": "a calculé", "nous": "avons calculé", "vous": "avez calculé", "ils/elles": "ont calculé"},
    future: {"je": "calculerai", "tu": "calculeras", "il/elle": "calculera", "nous": "calculerons", "vous": "calculerez", "ils/elles": "calculeront"}
  },
  {
    id: 274, infinitive: "échouer", translation: "проваливаться",
    transcription: "эшуэ́",
    example: {"greek": "J'ai échoué à l'examen la première fois.", "ru": "В первый раз я провалил экзамен."},
    present: {"je": "échoue", "tu": "échoues", "il/elle": "échoue", "nous": "échouons", "vous": "échouez", "ils/elles": "échouent"},
    preterite: {"je": "ai échoué", "tu": "as échoué", "il/elle": "a échoué", "nous": "avons échoué", "vous": "avez échoué", "ils/elles": "ont échoué"},
    future: {"je": "échouerai", "tu": "échoueras", "il/elle": "échouera", "nous": "échouerons", "vous": "échouerez", "ils/elles": "échoueront"}
  },
  {
    id: 275, infinitive: "redoubler", translation: "оставаться на второй год",
    transcription: "рёдублэ́",
    example: {"greek": "Il risque de redoubler cette année.", "ru": "Он рискует остаться на второй год."},
    present: {"je": "redouble", "tu": "redoubles", "il/elle": "redouble", "nous": "redoublons", "vous": "redoublez", "ils/elles": "redoublent"},
    preterite: {"je": "ai redoublé", "tu": "as redoublé", "il/elle": "a redoublé", "nous": "avons redoublé", "vous": "avez redoublé", "ils/elles": "ont redoublé"},
    future: {"je": "redoublerai", "tu": "redoubleras", "il/elle": "redoublera", "nous": "redoublerons", "vous": "redoublerez", "ils/elles": "redoubleront"}
  },
  {
    id: 276, infinitive: "colorier", translation: "раскрашивать",
    transcription: "колорье́",
    example: {"greek": "Les enfants colorient à la maternelle.", "ru": "В детском саду дети раскрашивают."},
    present: {"je": "colorie", "tu": "colories", "il/elle": "colorie", "nous": "colorions", "vous": "coloriez", "ils/elles": "colorient"},
    preterite: {"je": "ai colorié", "tu": "as colorié", "il/elle": "a colorié", "nous": "avons colorié", "vous": "avez colorié", "ils/elles": "ont colorié"},
    future: {"je": "colorierai", "tu": "colorieras", "il/elle": "coloriera", "nous": "colorierons", "vous": "colorierez", "ils/elles": "colorieront"}
  },
  {
    id: 277, infinitive: "grandir", translation: "расти",
    transcription: "гранди́р",
    example: {"greek": "Les enfants grandissent vite.", "ru": "Дети быстро растут."},
    present: {"je": "grandis", "tu": "grandis", "il/elle": "grandit", "nous": "grandissons", "vous": "grandissez", "ils/elles": "grandissent"},
    preterite: {"je": "ai grandi", "tu": "as grandi", "il/elle": "a grandi", "nous": "avons grandi", "vous": "avez grandi", "ils/elles": "ont grandi"},
    future: {"je": "grandirai", "tu": "grandiras", "il/elle": "grandira", "nous": "grandirons", "vous": "grandirez", "ils/elles": "grandiront"}
  },
  {
    id: 278, infinitive: "vieillir", translation: "стареть",
    transcription: "вьейи́р",
    example: {"greek": "Le bâtiment vieillit mal.", "ru": "Здание плохо стареет."},
    present: {"je": "vieillis", "tu": "vieillis", "il/elle": "vieillit", "nous": "vieillissons", "vous": "vieillissez", "ils/elles": "vieillissent"},
    preterite: {"je": "ai vieilli", "tu": "as vieilli", "il/elle": "a vieilli", "nous": "avons vieilli", "vous": "avez vieilli", "ils/elles": "ont vieilli"},
    future: {"je": "vieillirai", "tu": "vieilliras", "il/elle": "vieillira", "nous": "vieillirons", "vous": "vieillirez", "ils/elles": "vieilliront"}
  },
  {
    id: 279, infinitive: "maigrir", translation: "худеть",
    transcription: "мэгри́р",
    example: {"greek": "J'ai maigri de trois kilos.", "ru": "Я похудел на три килограмма."},
    present: {"je": "maigris", "tu": "maigris", "il/elle": "maigrit", "nous": "maigrissons", "vous": "maigrissez", "ils/elles": "maigrissent"},
    preterite: {"je": "ai maigri", "tu": "as maigri", "il/elle": "a maigri", "nous": "avons maigri", "vous": "avez maigri", "ils/elles": "ont maigri"},
    future: {"je": "maigrirai", "tu": "maigriras", "il/elle": "maigrira", "nous": "maigrirons", "vous": "maigrirez", "ils/elles": "maigriront"}
  },
  {
    id: 280, infinitive: "grossir", translation: "полнеть",
    transcription: "гроси́р",
    example: {"greek": "J'ai grossi cet hiver.", "ru": "Этой зимой я поправился."},
    present: {"je": "grossis", "tu": "grossis", "il/elle": "grossit", "nous": "grossissons", "vous": "grossissez", "ils/elles": "grossissent"},
    preterite: {"je": "ai grossi", "tu": "as grossi", "il/elle": "a grossi", "nous": "avons grossi", "vous": "avez grossi", "ils/elles": "ont grossi"},
    future: {"je": "grossirai", "tu": "grossiras", "il/elle": "grossira", "nous": "grossirons", "vous": "grossirez", "ils/elles": "grossiront"}
  },
  {
    id: 281, infinitive: "rougir", translation: "краснеть",
    transcription: "ружи́р",
    example: {"greek": "Elle rougit quand elle parle en public.", "ru": "Она краснеет, когда говорит на публике."},
    present: {"je": "rougis", "tu": "rougis", "il/elle": "rougit", "nous": "rougissons", "vous": "rougissez", "ils/elles": "rougissent"},
    preterite: {"je": "ai rougi", "tu": "as rougi", "il/elle": "a rougi", "nous": "avons rougi", "vous": "avez rougi", "ils/elles": "ont rougi"},
    future: {"je": "rougirai", "tu": "rougiras", "il/elle": "rougira", "nous": "rougirons", "vous": "rougirez", "ils/elles": "rougiront"}
  },
  {
    id: 282, infinitive: "agir", translation: "действовать",
    transcription: "ажи́р",
    example: {"greek": "Il faut agir avant la fin du délai.", "ru": "Действовать нужно до истечения срока."},
    present: {"je": "agis", "tu": "agis", "il/elle": "agit", "nous": "agissons", "vous": "agissez", "ils/elles": "agissent"},
    preterite: {"je": "ai agi", "tu": "as agi", "il/elle": "a agi", "nous": "avons agi", "vous": "avez agi", "ils/elles": "ont agi"},
    future: {"je": "agirai", "tu": "agiras", "il/elle": "agira", "nous": "agirons", "vous": "agirez", "ils/elles": "agiront"}
  },
  {
    id: 283, infinitive: "réagir", translation: "реагировать",
    transcription: "реажи́р",
    example: {"greek": "La banque n'a pas réagi à mon mail.", "ru": "Банк не отреагировал на моё письмо."},
    present: {"je": "réagis", "tu": "réagis", "il/elle": "réagit", "nous": "réagissons", "vous": "réagissez", "ils/elles": "réagissent"},
    preterite: {"je": "ai réagi", "tu": "as réagi", "il/elle": "a réagi", "nous": "avons réagi", "vous": "avez réagi", "ils/elles": "ont réagi"},
    future: {"je": "réagirai", "tu": "réagiras", "il/elle": "réagira", "nous": "réagirons", "vous": "réagirez", "ils/elles": "réagiront"}
  },
  {
    id: 284, infinitive: "saisir", translation: "хватать / вводить данные",
    transcription: "сэзи́р",
    example: {"greek": "Saisissez votre numéro allocataire.", "ru": "Введите ваш номер получателя пособия."},
    present: {"je": "saisis", "tu": "saisis", "il/elle": "saisit", "nous": "saisissons", "vous": "saisissez", "ils/elles": "saisissent"},
    preterite: {"je": "ai saisi", "tu": "as saisi", "il/elle": "a saisi", "nous": "avons saisi", "vous": "avez saisi", "ils/elles": "ont saisi"},
    future: {"je": "saisirai", "tu": "saisiras", "il/elle": "saisira", "nous": "saisirons", "vous": "saisirez", "ils/elles": "saisiront"}
  },
  {
    id: 285, infinitive: "fournir", translation: "предоставлять",
    transcription: "фурни́р",
    example: {"greek": "Vous devez fournir trois bulletins de salaire.", "ru": "Вы должны предоставить три зарплатные ведомости."},
    present: {"je": "fournis", "tu": "fournis", "il/elle": "fournit", "nous": "fournissons", "vous": "fournissez", "ils/elles": "fournissent"},
    preterite: {"je": "ai fourni", "tu": "as fourni", "il/elle": "a fourni", "nous": "avons fourni", "vous": "avez fourni", "ils/elles": "ont fourni"},
    future: {"je": "fournirai", "tu": "fourniras", "il/elle": "fournira", "nous": "fournirons", "vous": "fournirez", "ils/elles": "fourniront"}
  },
  {
    id: 286, infinitive: "établir", translation: "устанавливать / составлять",
    transcription: "этабли́р",
    example: {"greek": "Le notaire établit l'acte de vente.", "ru": "Нотариус составляет договор купли-продажи."},
    present: {"je": "établis", "tu": "établis", "il/elle": "établit", "nous": "établissons", "vous": "établissez", "ils/elles": "établissent"},
    preterite: {"je": "ai établi", "tu": "as établi", "il/elle": "a établi", "nous": "avons établi", "vous": "avez établi", "ils/elles": "ont établi"},
    future: {"je": "établirai", "tu": "établiras", "il/elle": "établira", "nous": "établirons", "vous": "établirez", "ils/elles": "établiront"}
  },
  {
    id: 287, infinitive: "définir", translation: "определять",
    transcription: "дефини́р",
    example: {"greek": "Définissons d'abord le budget.", "ru": "Давайте сначала определим бюджет."},
    present: {"je": "définis", "tu": "définis", "il/elle": "définit", "nous": "définissons", "vous": "définissez", "ils/elles": "définissent"},
    preterite: {"je": "ai défini", "tu": "as défini", "il/elle": "a défini", "nous": "avons défini", "vous": "avez défini", "ils/elles": "ont défini"},
    future: {"je": "définirai", "tu": "définiras", "il/elle": "définira", "nous": "définirons", "vous": "définirez", "ils/elles": "définiront"}
  },
  {
    id: 288, infinitive: "avertir", translation: "предупреждать",
    transcription: "аверти́р",
    example: {"greek": "Avertissez le syndic en cas de fuite.", "ru": "Предупредите управляющего при протечке."},
    present: {"je": "avertis", "tu": "avertis", "il/elle": "avertit", "nous": "avertissons", "vous": "avertissez", "ils/elles": "avertissent"},
    preterite: {"je": "ai averti", "tu": "as averti", "il/elle": "a averti", "nous": "avons averti", "vous": "avez averti", "ils/elles": "ont averti"},
    future: {"je": "avertirai", "tu": "avertiras", "il/elle": "avertira", "nous": "avertirons", "vous": "avertirez", "ils/elles": "avertiront"}
  },
  {
    id: 289, infinitive: "obéir", translation: "подчиняться",
    transcription: "обеи́р",
    example: {"greek": "Les enfants obéissent bien à la maîtresse.", "ru": "Дети хорошо слушаются учительницу."},
    present: {"je": "obéis", "tu": "obéis", "il/elle": "obéit", "nous": "obéissons", "vous": "obéissez", "ils/elles": "obéissent"},
    preterite: {"je": "ai obéi", "tu": "as obéi", "il/elle": "a obéi", "nous": "avons obéi", "vous": "avez obéi", "ils/elles": "ont obéi"},
    future: {"je": "obéirai", "tu": "obéiras", "il/elle": "obéira", "nous": "obéirons", "vous": "obéirez", "ils/elles": "obéiront"}
  },
  {
    id: 290, infinitive: "garantir", translation: "гарантировать",
    transcription: "гаранти́р",
    example: {"greek": "Visale garantit le loyer au propriétaire.", "ru": "Visale гарантирует владельцу оплату аренды."},
    present: {"je": "garantis", "tu": "garantis", "il/elle": "garantit", "nous": "garantissons", "vous": "garantissez", "ils/elles": "garantissent"},
    preterite: {"je": "ai garanti", "tu": "as garanti", "il/elle": "a garanti", "nous": "avons garanti", "vous": "avez garanti", "ils/elles": "ont garanti"},
    future: {"je": "garantirai", "tu": "garantiras", "il/elle": "garantira", "nous": "garantirons", "vous": "garantirez", "ils/elles": "garantiront"}
  },
  {
    id: 291, infinitive: "applaudir", translation: "аплодировать",
    transcription: "аплоди́р",
    example: {"greek": "La salle a applaudi longtemps.", "ru": "Зал долго аплодировал."},
    present: {"je": "applaudis", "tu": "applaudis", "il/elle": "applaudit", "nous": "applaudissons", "vous": "applaudissez", "ils/elles": "applaudissent"},
    preterite: {"je": "ai applaudi", "tu": "as applaudi", "il/elle": "a applaudi", "nous": "avons applaudi", "vous": "avez applaudi", "ils/elles": "ont applaudi"},
    future: {"je": "applaudirai", "tu": "applaudiras", "il/elle": "applaudira", "nous": "applaudirons", "vous": "applaudirez", "ils/elles": "applaudiront"}
  },
  {
    id: 292, infinitive: "cultiver", translation: "выращивать",
    transcription: "кюльтивэ́",
    example: {"greek": "Ils cultivent des légumes dans le jardin.", "ru": "Они выращивают овощи в саду."},
    present: {"je": "cultive", "tu": "cultives", "il/elle": "cultive", "nous": "cultivons", "vous": "cultivez", "ils/elles": "cultivent"},
    preterite: {"je": "ai cultivé", "tu": "as cultivé", "il/elle": "a cultivé", "nous": "avons cultivé", "vous": "avez cultivé", "ils/elles": "ont cultivé"},
    future: {"je": "cultiverai", "tu": "cultiveras", "il/elle": "cultivera", "nous": "cultiverons", "vous": "cultiverez", "ils/elles": "cultiveront"}
  },
  {
    id: 293, infinitive: "planter", translation: "сажать",
    transcription: "плантэ́",
    example: {"greek": "On plante les tomates en mai.", "ru": "Помидоры сажают в мае."},
    present: {"je": "plante", "tu": "plantes", "il/elle": "plante", "nous": "plantons", "vous": "plantez", "ils/elles": "plantent"},
    preterite: {"je": "ai planté", "tu": "as planté", "il/elle": "a planté", "nous": "avons planté", "vous": "avez planté", "ils/elles": "ont planté"},
    future: {"je": "planterai", "tu": "planteras", "il/elle": "plantera", "nous": "planterons", "vous": "planterez", "ils/elles": "planteront"}
  },
  {
    id: 294, infinitive: "ramasser", translation: "собирать / подбирать",
    transcription: "рамасэ́",
    example: {"greek": "On ramasse des champignons en automne.", "ru": "Осенью мы собираем грибы."},
    present: {"je": "ramasse", "tu": "ramasses", "il/elle": "ramasse", "nous": "ramassons", "vous": "ramassez", "ils/elles": "ramassent"},
    preterite: {"je": "ai ramassé", "tu": "as ramassé", "il/elle": "a ramassé", "nous": "avons ramassé", "vous": "avez ramassé", "ils/elles": "ont ramassé"},
    future: {"je": "ramasserai", "tu": "ramasseras", "il/elle": "ramassera", "nous": "ramasserons", "vous": "ramasserez", "ils/elles": "ramasseront"}
  },
  {
    id: 295, infinitive: "nager", translation: "плавать",
    transcription: "нажэ́",
    example: {"greek": "Je nage deux fois par semaine.", "ru": "Я плаваю два раза в неделю."},
    present: {"je": "nage", "tu": "nages", "il/elle": "nage", "nous": "nageons", "vous": "nagez", "ils/elles": "nagent"},
    preterite: {"je": "ai nagé", "tu": "as nagé", "il/elle": "a nagé", "nous": "avons nagé", "vous": "avez nagé", "ils/elles": "ont nagé"},
    future: {"je": "nagerai", "tu": "nageras", "il/elle": "nagera", "nous": "nagerons", "vous": "nagerez", "ils/elles": "nageront"}
  },
  {
    id: 296, infinitive: "courir", translation: "бегать",
    transcription: "кури́р",
    example: {"greek": "Je cours le long de la Seine.", "ru": "Я бегаю вдоль Сены."},
    present: {"je": "cours", "tu": "cours", "il/elle": "court", "nous": "courons", "vous": "courez", "ils/elles": "courent"},
    preterite: {"je": "ai couru", "tu": "as couru", "il/elle": "a couru", "nous": "avons couru", "vous": "avez couru", "ils/elles": "ont couru"},
    future: {"je": "courrai", "tu": "courras", "il/elle": "courra", "nous": "courrons", "vous": "courrez", "ils/elles": "courront"}
  },
  {
    id: 297, infinitive: "marquer", translation: "отмечать / забивать (гол)",
    transcription: "маркэ́",
    example: {"greek": "Il a marqué à la dernière minute.", "ru": "Он забил на последней минуте."},
    present: {"je": "marque", "tu": "marques", "il/elle": "marque", "nous": "marquons", "vous": "marquez", "ils/elles": "marquent"},
    preterite: {"je": "ai marqué", "tu": "as marqué", "il/elle": "a marqué", "nous": "avons marqué", "vous": "avez marqué", "ils/elles": "ont marqué"},
    future: {"je": "marquerai", "tu": "marqueras", "il/elle": "marquera", "nous": "marquerons", "vous": "marquerez", "ils/elles": "marqueront"}
  },
  {
    id: 298, infinitive: "perdre", translation: "терять / проигрывать",
    transcription: "пэрдр",
    example: {"greek": "J'ai perdu ma carte Vitale.", "ru": "Я потерял карту Vitale."},
    present: {"je": "perds", "tu": "perds", "il/elle": "perd", "nous": "perdons", "vous": "perdez", "ils/elles": "perdent"},
    preterite: {"je": "ai perdu", "tu": "as perdu", "il/elle": "a perdu", "nous": "avons perdu", "vous": "avez perdu", "ils/elles": "ont perdu"},
    future: {"je": "perdrai", "tu": "perdras", "il/elle": "perdra", "nous": "perdrons", "vous": "perdrez", "ils/elles": "perdront"}
  },
  {
    id: 299, infinitive: "appuyer", translation: "нажимать",
    transcription: "апюйе́",
    example: {"greek": "Appuyez sur le bouton vert.", "ru": "Нажмите на зелёную кнопку."},
    present: {"je": "appuie", "tu": "appuies", "il/elle": "appuie", "nous": "appuyons", "vous": "appuyez", "ils/elles": "appuient"},
    preterite: {"je": "ai appuyé", "tu": "as appuyé", "il/elle": "a appuyé", "nous": "avons appuyé", "vous": "avez appuyé", "ils/elles": "ont appuyé"},
    future: {"je": "appuierai", "tu": "appuieras", "il/elle": "appuiera", "nous": "appuierons", "vous": "appuierez", "ils/elles": "appuieront"}
  },
  {
    id: 300, infinitive: "lancer", translation: "запускать / бросать",
    transcription: "лансэ́",
    example: {"greek": "On lance le projet en septembre.", "ru": "Проект запускаем в сентябре."},
    present: {"je": "lance", "tu": "lances", "il/elle": "lance", "nous": "lançons", "vous": "lancez", "ils/elles": "lancent"},
    preterite: {"je": "ai lancé", "tu": "as lancé", "il/elle": "a lancé", "nous": "avons lancé", "vous": "avez lancé", "ils/elles": "ont lancé"},
    future: {"je": "lancerai", "tu": "lanceras", "il/elle": "lancera", "nous": "lancerons", "vous": "lancerez", "ils/elles": "lanceront"}
  },
  {
    id: 301, infinitive: "voler", translation: "летать / красть",
    transcription: "волэ́",
    example: {"greek": "On m'a volé mon téléphone dans le métro.", "ru": "У меня украли телефон в метро."},
    present: {"je": "vole", "tu": "voles", "il/elle": "vole", "nous": "volons", "vous": "volez", "ils/elles": "volent"},
    preterite: {"je": "ai volé", "tu": "as volé", "il/elle": "a volé", "nous": "avons volé", "vous": "avez volé", "ils/elles": "ont volé"},
    future: {"je": "volerai", "tu": "voleras", "il/elle": "volera", "nous": "volerons", "vous": "volerez", "ils/elles": "voleront"}
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
  {
    id: 'body', emoji: '🧍', title: 'Тело человека',
    words: [
      { greek: 'la tête', transcription: 'ля тэт', translation: 'голова', emoji: '🗣️' },
      { greek: 'le visage', transcription: 'лё виза́ж', translation: 'лицо', emoji: '😐' },
      { greek: 'les yeux', transcription: 'лез-йё', translation: 'глаза', emoji: '👀' },
      { greek: 'le nez', transcription: 'лё нэ', translation: 'нос', emoji: '👃' },
      { greek: 'la bouche', transcription: 'ля буш', translation: 'рот', emoji: '👄' },
      { greek: 'les dents', transcription: 'ле дан', translation: 'зубы', emoji: '🦷' },
      { greek: "l'oreille", transcription: 'лорэ́й', translation: 'ухо', emoji: '👂' },
      { greek: 'le cou', transcription: 'лё ку', translation: 'шея', emoji: '🧣' },
      { greek: 'le dos', transcription: 'лё до', translation: 'спина', emoji: '🔙' },
      { greek: 'le ventre', transcription: 'лё вантр', translation: 'живот', emoji: '🫃' },
      { greek: 'le bras', transcription: 'лё бра', translation: 'рука (до кисти)', emoji: '💪' },
      { greek: 'la main', transcription: 'ля мэн', translation: 'кисть руки', emoji: '✋' },
      { greek: 'la jambe', transcription: 'ля жамб', translation: 'нога', emoji: '🦵' },
      { greek: 'le pied', transcription: 'лё пье', translation: 'стопа', emoji: '🦶' },
      { greek: 'le cœur', transcription: 'лё кёр', translation: 'сердце', emoji: '❤️' },
    ]
  },
  {
    id: 'school', emoji: '🎒', title: 'Школа и учёба',
    words: [
      { greek: "l'école", transcription: 'леко́ль', translation: 'школа', emoji: '🏫' },
      { greek: 'la maternelle', transcription: 'ля матернэ́ль', translation: 'детский сад при школе', emoji: '🧸' },
      { greek: 'le collège', transcription: 'лё колле́ж', translation: 'средняя школа (11–15)', emoji: '📗' },
      { greek: 'le lycée', transcription: 'лё лисэ́', translation: 'старшая школа (15–18)', emoji: '📘' },
      { greek: "l'élève", transcription: 'леле́в', translation: 'ученик', emoji: '🧑‍🎓' },
      { greek: 'la maîtresse', transcription: 'ля мэтрэ́с', translation: 'учительница начальных классов', emoji: '👩‍🏫' },
      { greek: 'le directeur', transcription: 'лё директё́р', translation: 'директор школы', emoji: '👔' },
      { greek: 'la rentrée', transcription: 'ля рантрэ́', translation: 'начало учебного года', emoji: '📅' },
      { greek: "l'emploi du temps", transcription: 'лямплуа́ дю тан', translation: 'расписание', emoji: '🗓️' },
      { greek: 'les devoirs', transcription: 'ле дёвуа́р', translation: 'домашнее задание', emoji: '📝' },
      { greek: 'le carnet de liaison', transcription: 'лё карнэ́ дё льезо́н', translation: 'дневник связи со школой', emoji: '📓' },
      { greek: 'la cantine', transcription: 'ля кантин', translation: 'школьная столовая', emoji: '🍽️' },
      { greek: 'la récréation', transcription: 'ля рекреасьо́н', translation: 'перемена', emoji: '⏸️' },
      { greek: 'le bulletin', transcription: 'лё бюльтэ́н', translation: 'табель успеваемости', emoji: '📊' },
      { greek: 'le brevet', transcription: 'лё брёвэ́', translation: 'экзамен после коллежа', emoji: '🎓' },
    ]
  },
  {
    id: 'restaurant_menu', emoji: '🍽️', title: 'Ресторан и меню',
    words: [
      { greek: 'la carte', transcription: 'ля карт', translation: 'меню (список блюд)', emoji: '📜' },
      { greek: 'le menu', transcription: 'лё мёню́', translation: 'комплексный обед', emoji: '🍱' },
      { greek: 'la formule', transcription: 'ля формю́ль', translation: 'комплекс из двух блюд', emoji: '🎫' },
      { greek: "l'entrée", transcription: 'лантрэ́', translation: 'закуска', emoji: '🥗' },
      { greek: 'le plat', transcription: 'лё пла', translation: 'основное блюдо', emoji: '🍖' },
      { greek: 'le dessert', transcription: 'лё десэ́р', translation: 'десерт', emoji: '🍰' },
      { greek: 'le plat du jour', transcription: 'лё пла дю жур', translation: 'блюдо дня', emoji: '⭐' },
      { greek: "l'addition", transcription: 'лядисьо́н', translation: 'счёт', emoji: '🧾' },
      { greek: 'le serveur', transcription: 'лё сервё́р', translation: 'официант', emoji: '🤵' },
      { greek: 'le pourboire', transcription: 'лё пурбуа́р', translation: 'чаевые', emoji: '💶' },
      { greek: 'la carafe d’eau', transcription: 'ля кара́ф до', translation: 'графин воды (бесплатно)', emoji: '🚰' },
      { greek: 'saignant', transcription: 'сеньа́н', translation: 'с кровью (о мясе)', emoji: '🥩' },
      { greek: 'à point', transcription: 'а пуэ́н', translation: 'средней прожарки', emoji: '🍳' },
      { greek: 'bien cuit', transcription: 'бье́н кюи́', translation: 'хорошо прожаренный', emoji: '🔥' },
      { greek: 'la terrasse', transcription: 'ля терра́с', translation: 'терраса кафе', emoji: '☂️' },
    ]
  },
  {
    id: 'kitchen', emoji: '🍳', title: 'Кухня и посуда',
    words: [
      { greek: 'la cuisine', transcription: 'ля кюизи́н', translation: 'кухня', emoji: '🍳' },
      { greek: 'la casserole', transcription: 'ля касро́ль', translation: 'кастрюля', emoji: '🍲' },
      { greek: 'la poêle', transcription: 'ля пуа́ль', translation: 'сковорода', emoji: '🍳' },
      { greek: "l'assiette", transcription: 'лясье́т', translation: 'тарелка', emoji: '🍽️' },
      { greek: 'le verre', transcription: 'лё вэр', translation: 'стакан', emoji: '🥛' },
      { greek: 'la tasse', transcription: 'ля тас', translation: 'чашка', emoji: '☕' },
      { greek: 'la fourchette', transcription: 'ля фуршэ́т', translation: 'вилка', emoji: '🍴' },
      { greek: 'le couteau', transcription: 'лё куто́', translation: 'нож', emoji: '🔪' },
      { greek: 'la cuillère', transcription: 'ля кюйе́р', translation: 'ложка', emoji: '🥄' },
      { greek: 'le four', transcription: 'лё фур', translation: 'духовка', emoji: '🔥' },
      { greek: 'le frigo', transcription: 'лё фриго́', translation: 'холодильник', emoji: '🧊' },
      { greek: 'le lave-vaisselle', transcription: 'лё лав-вэсэ́ль', translation: 'посудомоечная машина', emoji: '🫧' },
      { greek: 'la plaque', transcription: 'ля пляк', translation: 'варочная панель', emoji: '♨️' },
      { greek: 'la recette', transcription: 'ля рёсэ́т', translation: 'рецепт', emoji: '📖' },
      { greek: 'le tablier', transcription: 'лё таблие́', translation: 'фартук', emoji: '🥻' },
    ]
  },
  {
    id: 'drinks', emoji: '🥤', title: 'Напитки',
    words: [
      { greek: "l'eau", transcription: 'ло', translation: 'вода', emoji: '💧' },
      { greek: 'le café', transcription: 'лё кафэ́', translation: 'кофе (эспрессо)', emoji: '☕' },
      { greek: 'le café crème', transcription: 'лё кафэ́ крэм', translation: 'кофе с молоком', emoji: '🥛' },
      { greek: 'le thé', transcription: 'лё тэ', translation: 'чай', emoji: '🍵' },
      { greek: 'le jus', transcription: 'лё жю', translation: 'сок', emoji: '🧃' },
      { greek: 'le vin rouge', transcription: 'лё вэн руж', translation: 'красное вино', emoji: '🍷' },
      { greek: 'le vin blanc', transcription: 'лё вэн блан', translation: 'белое вино', emoji: '🥂' },
      { greek: 'la bière', transcription: 'ля бье́р', translation: 'пиво', emoji: '🍺' },
      { greek: 'le demi', transcription: 'лё дёми́', translation: 'бокал пива 25 сл', emoji: '🍻' },
      { greek: 'le champagne', transcription: 'лё шампа́нь', translation: 'шампанское', emoji: '🍾' },
      { greek: 'le lait', transcription: 'лё лэ', translation: 'молоко', emoji: '🥛' },
      { greek: 'le chocolat chaud', transcription: 'лё шоколя́ шо', translation: 'горячий шоколад', emoji: '🍫' },
      { greek: 'le sirop', transcription: 'лё сиро́', translation: 'сироп для воды', emoji: '🧉' },
      { greek: 'gazeux', transcription: 'газё́', translation: 'газированный', emoji: '🫧' },
      { greek: 'la carafe', transcription: 'ля кара́ф', translation: 'графин', emoji: '🏺' },
    ]
  },
  {
    id: 'fruits_veg', emoji: '🍏', title: 'Фрукты и овощи',
    words: [
      { greek: 'la pomme', transcription: 'ля пом', translation: 'яблоко', emoji: '🍎' },
      { greek: 'la poire', transcription: 'ля пуа́р', translation: 'груша', emoji: '🍐' },
      { greek: 'la fraise', transcription: 'ля фрэз', translation: 'клубника', emoji: '🍓' },
      { greek: 'le raisin', transcription: 'лё рэзэ́н', translation: 'виноград', emoji: '🍇' },
      { greek: "l'orange", transcription: 'лёра́нж', translation: 'апельсин', emoji: '🍊' },
      { greek: 'la banane', transcription: 'ля бана́н', translation: 'банан', emoji: '🍌' },
      { greek: 'la pêche', transcription: 'ля пэш', translation: 'персик', emoji: '🍑' },
      { greek: 'la tomate', transcription: 'ля тома́т', translation: 'помидор', emoji: '🍅' },
      { greek: 'la pomme de terre', transcription: 'ля пом дё тэр', translation: 'картофель', emoji: '🥔' },
      { greek: 'la carotte', transcription: 'ля каро́т', translation: 'морковь', emoji: '🥕' },
      { greek: "l'oignon", transcription: 'лоньо́н', translation: 'лук', emoji: '🧅' },
      { greek: "l'ail", transcription: 'лай', translation: 'чеснок', emoji: '🧄' },
      { greek: 'la salade', transcription: 'ля саля́д', translation: 'салат (листовой)', emoji: '🥬' },
      { greek: 'le concombre', transcription: 'лё конко́мбр', translation: 'огурец', emoji: '🥒' },
      { greek: 'le champignon', transcription: 'лё шампиньо́н', translation: 'гриб', emoji: '🍄' },
    ]
  },
  {
    id: 'animals', emoji: '🐾', title: 'Животные',
    words: [
      { greek: 'le chien', transcription: 'лё шье́н', translation: 'собака', emoji: '🐕' },
      { greek: 'le chat', transcription: 'лё ша', translation: 'кошка', emoji: '🐈' },
      { greek: "l'oiseau", transcription: 'луазо́', translation: 'птица', emoji: '🐦' },
      { greek: 'le cheval', transcription: 'лё шёва́ль', translation: 'лошадь', emoji: '🐴' },
      { greek: 'la vache', transcription: 'ля ваш', translation: 'корова', emoji: '🐄' },
      { greek: 'le mouton', transcription: 'лё муто́н', translation: 'баран, овца', emoji: '🐑' },
      { greek: 'le cochon', transcription: 'лё кошо́н', translation: 'свинья', emoji: '🐖' },
      { greek: 'la poule', transcription: 'ля пуль', translation: 'курица', emoji: '🐔' },
      { greek: 'le poisson', transcription: 'лё пуасо́н', translation: 'рыба', emoji: '🐟' },
      { greek: 'la souris', transcription: 'ля сури́', translation: 'мышь', emoji: '🐭' },
      { greek: 'le lapin', transcription: 'лё ляпэ́н', translation: 'кролик', emoji: '🐇' },
      { greek: "l'abeille", transcription: 'лабэ́й', translation: 'пчела', emoji: '🐝' },
      { greek: 'le renard', transcription: 'лё рёна́р', translation: 'лиса', emoji: '🦊' },
      { greek: "l'ours", transcription: 'лурс', translation: 'медведь', emoji: '🐻' },
      { greek: 'le vétérinaire', transcription: 'лё ветерина́р', translation: 'ветеринар', emoji: '🩺' },
    ]
  },
  {
    id: 'nature', emoji: '🌳', title: 'Природа',
    words: [
      { greek: "l'arbre", transcription: 'лярбр', translation: 'дерево', emoji: '🌳' },
      { greek: 'la fleur', transcription: 'ля флёр', translation: 'цветок', emoji: '🌸' },
      { greek: "l'herbe", transcription: 'лерб', translation: 'трава', emoji: '🌿' },
      { greek: 'la forêt', transcription: 'ля форэ́', translation: 'лес', emoji: '🌲' },
      { greek: 'la montagne', transcription: 'ля монта́нь', translation: 'гора', emoji: '⛰️' },
      { greek: 'la mer', transcription: 'ля мэр', translation: 'море', emoji: '🌊' },
      { greek: 'la plage', transcription: 'ля пляж', translation: 'пляж', emoji: '🏖️' },
      { greek: 'le lac', transcription: 'лё ляк', translation: 'озеро', emoji: '🏞️' },
      { greek: 'la rivière', transcription: 'ля ривье́р', translation: 'река', emoji: '🏕️' },
      { greek: 'le ciel', transcription: 'лё сьель', translation: 'небо', emoji: '☁️' },
      { greek: 'le soleil', transcription: 'лё солэ́й', translation: 'солнце', emoji: '☀️' },
      { greek: 'la lune', transcription: 'ля люн', translation: 'луна', emoji: '🌙' },
      { greek: 'la pierre', transcription: 'ля пьер', translation: 'камень', emoji: '🪨' },
      { greek: 'le sable', transcription: 'лё сабль', translation: 'песок', emoji: '⏳' },
      { greek: 'la randonnée', transcription: 'ля рандонэ́', translation: 'поход, прогулка', emoji: '🥾' },
    ]
  },
  {
    id: 'bank_money', emoji: '🏦', title: 'Деньги и банк',
    words: [
      { greek: 'le compte', transcription: 'лё конт', translation: 'счёт', emoji: '🏦' },
      { greek: 'la carte bancaire', transcription: 'ля карт банкэ́р', translation: 'банковская карта', emoji: '💳' },
      { greek: 'le RIB', transcription: 'лё риб', translation: 'реквизиты счёта', emoji: '📄' },
      { greek: 'le virement', transcription: 'лё вирма́н', translation: 'перевод', emoji: '↗️' },
      { greek: 'le prélèvement', transcription: 'лё прелевма́н', translation: 'автосписание', emoji: '🔁' },
      { greek: 'le solde', transcription: 'лё сольд', translation: 'остаток на счёте', emoji: '📉' },
      { greek: 'le découvert', transcription: 'лё декувэ́р', translation: 'овердрафт', emoji: '⚠️' },
      { greek: 'le retrait', transcription: 'лё рётрэ́', translation: 'снятие наличных', emoji: '🏧' },
      { greek: 'les espèces', transcription: 'лез-эспэ́с', translation: 'наличные', emoji: '💵' },
      { greek: 'le chèque', transcription: 'лё шэк', translation: 'чек', emoji: '🧾' },
      { greek: 'les frais', transcription: 'ле фрэ', translation: 'комиссии', emoji: '💸' },
      { greek: 'le crédit', transcription: 'лё креди́', translation: 'кредит', emoji: '🏛️' },
      { greek: "l'assurance", transcription: 'лясюра́нс', translation: 'страховка', emoji: '🛡️' },
      { greek: 'le conseiller', transcription: 'лё консэйе́', translation: 'персональный консультант', emoji: '🧑‍💼' },
      { greek: "l'impôt", transcription: 'лэмпо́', translation: 'налог', emoji: '🧮' },
    ]
  },
  {
    id: 'internet_tech', emoji: '💻', title: 'Интернет и техника',
    words: [
      { greek: "l'ordinateur", transcription: 'лординатё́р', translation: 'компьютер', emoji: '💻' },
      { greek: 'le portable', transcription: 'лё порта́бль', translation: 'мобильный телефон', emoji: '📱' },
      { greek: 'le mot de passe', transcription: 'лё мо дё пас', translation: 'пароль', emoji: '🔑' },
      { greek: 'le compte en ligne', transcription: 'лё конт ан линь', translation: 'личный кабинет', emoji: '👤' },
      { greek: 'la boîte mail', transcription: 'ля буа́т мэйль', translation: 'электронная почта', emoji: '📧' },
      { greek: 'le fichier', transcription: 'лё фишье́', translation: 'файл', emoji: '📁' },
      { greek: 'la pièce jointe', transcription: 'ля пьес жуэ́нт', translation: 'вложение', emoji: '📎' },
      { greek: 'le lien', transcription: 'лё лье́н', translation: 'ссылка', emoji: '🔗' },
      { greek: 'la box', transcription: 'ля бокс', translation: 'домашний роутер', emoji: '📡' },
      { greek: 'la fibre', transcription: 'ля фибр', translation: 'оптоволокно', emoji: '🌐' },
      { greek: 'le forfait', transcription: 'лё форфэ́', translation: 'тарифный план', emoji: '📶' },
      { greek: 'le chargeur', transcription: 'лё шаржё́р', translation: 'зарядное устройство', emoji: '🔌' },
      { greek: "l'écran", transcription: 'лекра́н', translation: 'экран', emoji: '🖥️' },
      { greek: 'le clavier', transcription: 'лё клявье́', translation: 'клавиатура', emoji: '⌨️' },
      { greek: 'la mise à jour', transcription: 'ля миз-а-жур', translation: 'обновление', emoji: '🔄' },
    ]
  },
  {
    id: 'sport_cat', emoji: '🏃', title: 'Спорт и зал',
    words: [
      { greek: 'le sport', transcription: 'лё спор', translation: 'спорт', emoji: '🏅' },
      { greek: 'la salle de sport', transcription: 'ля саль дё спор', translation: 'спортзал', emoji: '🏋️' },
      { greek: "l'abonnement", transcription: 'лябонма́н', translation: 'абонемент', emoji: '🎟️' },
      { greek: 'le vestiaire', transcription: 'лё вестье́р', translation: 'раздевалка', emoji: '🚪' },
      { greek: 'la piscine', transcription: 'ля писи́н', translation: 'бассейн', emoji: '🏊' },
      { greek: 'le bonnet de bain', transcription: 'лё бонэ́ дё бэн', translation: 'шапочка для плавания', emoji: '🧢' },
      { greek: 'la course à pied', transcription: 'ля курс а пье', translation: 'бег', emoji: '🏃' },
      { greek: 'le vélo', transcription: 'лё вело́', translation: 'велосипед', emoji: '🚴' },
      { greek: 'le foot', transcription: 'лё фут', translation: 'футбол', emoji: '⚽' },
      { greek: 'le rugby', transcription: 'лё рюгби́', translation: 'регби', emoji: '🏉' },
      { greek: 'le ski', transcription: 'лё ски', translation: 'лыжи', emoji: '⛷️' },
      { greek: "l'échauffement", transcription: 'лешофма́н', translation: 'разминка', emoji: '🔥' },
      { greek: 'les étirements', transcription: 'лез-этирма́н', translation: 'растяжка', emoji: '🧘' },
      { greek: 'la séance', transcription: 'ля сеа́нс', translation: 'тренировка, занятие', emoji: '⏱️' },
      { greek: 'le certificat médical', transcription: 'лё сертифика́ медика́ль', translation: 'медицинская справка', emoji: '📋' },
    ]
  },
  {
    id: 'hobbies', emoji: '🎨', title: 'Хобби и досуг',
    words: [
      { greek: 'le loisir', transcription: 'лё луази́р', translation: 'досуг', emoji: '🎠' },
      { greek: 'le cinéma', transcription: 'лё синема́', translation: 'кино', emoji: '🎬' },
      { greek: 'le théâtre', transcription: 'лё теа́тр', translation: 'театр', emoji: '🎭' },
      { greek: 'le musée', transcription: 'лё мюзэ́', translation: 'музей', emoji: '🏛️' },
      { greek: 'le concert', transcription: 'лё консэ́р', translation: 'концерт', emoji: '🎤' },
      { greek: 'la lecture', transcription: 'ля лектю́р', translation: 'чтение', emoji: '📚' },
      { greek: 'la musique', transcription: 'ля мюзи́к', translation: 'музыка', emoji: '🎵' },
      { greek: 'la photo', transcription: 'ля фото́', translation: 'фотография', emoji: '📷' },
      { greek: 'le jardinage', transcription: 'лё жардина́ж', translation: 'садоводство', emoji: '🪴' },
      { greek: 'le bricolage', transcription: 'лё бриколя́ж', translation: 'мастерить своими руками', emoji: '🔧' },
      { greek: 'le jeu de société', transcription: 'лё жё дё сосьетэ́', translation: 'настольная игра', emoji: '🎲' },
      { greek: 'la médiathèque', transcription: 'ля медьятэ́к', translation: 'медиатека, библиотека', emoji: '📖' },
      { greek: "l'association", transcription: 'лясосьясьо́н', translation: 'клуб, объединение', emoji: '🤝' },
      { greek: 'le bénévolat', transcription: 'лё беневоля́', translation: 'волонтёрство', emoji: '💚' },
      { greek: 'la sortie', transcription: 'ля сорти́', translation: 'выход куда-либо, вылазка', emoji: '🚶' },
    ]
  },
  {
    id: 'emotions', emoji: '😊', title: 'Чувства и настроение',
    words: [
      { greek: 'content', transcription: 'конта́н', translation: 'довольный', emoji: '🙂' },
      { greek: 'heureux', transcription: 'ёрё́', translation: 'счастливый', emoji: '😄' },
      { greek: 'triste', transcription: 'трист', translation: 'грустный', emoji: '😢' },
      { greek: 'fatigué', transcription: 'фатигэ́', translation: 'уставший', emoji: '😴' },
      { greek: 'énervé', transcription: 'энервэ́', translation: 'раздражённый', emoji: '😠' },
      { greek: 'inquiet', transcription: 'энкье́', translation: 'встревоженный', emoji: '😟' },
      { greek: 'surpris', transcription: 'сюрпри́', translation: 'удивлённый', emoji: '😮' },
      { greek: 'déçu', transcription: 'десю́', translation: 'разочарованный', emoji: '😞' },
      { greek: 'stressé', transcription: 'стрэсэ́', translation: 'в стрессе', emoji: '😰' },
      { greek: 'soulagé', transcription: 'суляжэ́', translation: 'испытавший облегчение', emoji: '😌' },
      { greek: 'la peur', transcription: 'ля пёр', translation: 'страх', emoji: '😨' },
      { greek: 'la joie', transcription: 'ля жуа́', translation: 'радость', emoji: '🎉' },
      { greek: 'la colère', transcription: 'ля колэ́р', translation: 'гнев', emoji: '💢' },
      { greek: "l'ennui", transcription: 'лянюи́', translation: 'скука', emoji: '🥱' },
      { greek: 'avoir le cafard', transcription: 'авуа́р лё кафа́р', translation: 'хандрить', emoji: '🌧️' },
    ]
  },
  {
    id: 'character', emoji: '🧠', title: 'Характер и внешность',
    words: [
      { greek: 'gentil', transcription: 'жанти́', translation: 'добрый, милый', emoji: '😊' },
      { greek: 'sympa', transcription: 'сэмпа́', translation: 'приятный, славный', emoji: '👍' },
      { greek: 'sérieux', transcription: 'серьё́', translation: 'серьёзный', emoji: '🧐' },
      { greek: 'timide', transcription: 'тими́д', translation: 'застенчивый', emoji: '😳' },
      { greek: 'bavard', transcription: 'бава́р', translation: 'болтливый', emoji: '🗣️' },
      { greek: 'travailleur', transcription: 'травайё́р', translation: 'трудолюбивый', emoji: '💼' },
      { greek: 'paresseux', transcription: 'парэсё́', translation: 'ленивый', emoji: '🛋️' },
      { greek: 'patient', transcription: 'пасья́н', translation: 'терпеливый', emoji: '⏳' },
      { greek: 'drôle', transcription: 'дроль', translation: 'смешной', emoji: '😂' },
      { greek: 'grand', transcription: 'гран', translation: 'высокий', emoji: '📏' },
      { greek: 'petit', transcription: 'пёти́', translation: 'невысокий', emoji: '🐁' },
      { greek: 'mince', transcription: 'мэнс', translation: 'худой, стройный', emoji: '🎋' },
      { greek: 'blond', transcription: 'блон', translation: 'светловолосый', emoji: '👱' },
      { greek: 'brun', transcription: 'брён', translation: 'темноволосый', emoji: '👨' },
      { greek: 'les cheveux', transcription: 'ле шёвё́', translation: 'волосы', emoji: '💇' },
    ]
  },
  {
    id: 'holidays', emoji: '🎉', title: 'Праздники и традиции',
    words: [
      { greek: 'la fête', transcription: 'ля фэт', translation: 'праздник', emoji: '🎊' },
      { greek: 'le jour férié', transcription: 'лё жур ферье́', translation: 'нерабочий праздничный день', emoji: '📅' },
      { greek: 'Noël', transcription: 'ноэ́ль', translation: 'Рождество', emoji: '🎄' },
      { greek: 'le réveillon', transcription: 'лё ревэйо́н', translation: 'праздничный ночной ужин', emoji: '🌙' },
      { greek: 'le Nouvel An', transcription: 'лё нувэ́ль ан', translation: 'Новый год', emoji: '🎆' },
      { greek: 'Pâques', transcription: 'пак', translation: 'Пасха', emoji: '🐣' },
      { greek: 'la galette des rois', transcription: 'ля галэ́т де руа́', translation: 'пирог с сюрпризом в январе', emoji: '👑' },
      { greek: 'le muguet', transcription: 'лё мюгэ́', translation: 'ландыш (дарят 1 мая)', emoji: '🌱' },
      { greek: 'le feu d’artifice', transcription: 'лё фё дартифи́с', translation: 'фейерверк', emoji: '🎇' },
      { greek: 'le défilé', transcription: 'лё дефилэ́', translation: 'парад', emoji: '🎺' },
      { greek: 'le cadeau', transcription: 'лё кадо́', translation: 'подарок', emoji: '🎁' },
      { greek: 'la carte de vœux', transcription: 'ля карт дё вё', translation: 'поздравительная открытка', emoji: '💌' },
      { greek: 'trinquer', transcription: 'трэнкэ́', translation: 'чокаться', emoji: '🥂' },
      { greek: 'la Toussaint', transcription: 'ля тусэ́н', translation: 'День всех святых', emoji: '🕯️' },
      { greek: 'la fête des voisins', transcription: 'ля фэт де вуазэ́н', translation: 'праздник соседей', emoji: '🏘️' },
    ]
  },
  {
    id: 'professions', emoji: '👷', title: 'Профессии',
    words: [
      { greek: 'le médecin', transcription: 'лё медсэ́н', translation: 'врач', emoji: '🩺' },
      { greek: "l'infirmier", transcription: 'лэнфирмье́', translation: 'медбрат, медсестра', emoji: '💉' },
      { greek: 'le professeur', transcription: 'лё професё́р', translation: 'преподаватель', emoji: '👨‍🏫' },
      { greek: "l'ingénieur", transcription: 'лэнженьё́р', translation: 'инженер', emoji: '⚙️' },
      { greek: "l'avocat", transcription: 'лявока́', translation: 'адвокат', emoji: '⚖️' },
      { greek: 'le comptable', transcription: 'лё конта́бль', translation: 'бухгалтер', emoji: '🧮' },
      { greek: 'le vendeur', transcription: 'лё вандё́р', translation: 'продавец', emoji: '🛍️' },
      { greek: 'le cuisinier', transcription: 'лё кюизинье́', translation: 'повар', emoji: '👨‍🍳' },
      { greek: 'le boulanger', transcription: 'лё буланжэ́', translation: 'пекарь', emoji: '🥖' },
      { greek: 'le plombier', transcription: 'лё пломбье́', translation: 'сантехник', emoji: '🔧' },
      { greek: "l'électricien", transcription: 'лелектрисье́н', translation: 'электрик', emoji: '💡' },
      { greek: 'le chauffeur', transcription: 'лё шофё́р', translation: 'водитель', emoji: '🚗' },
      { greek: 'le facteur', transcription: 'лё фактё́р', translation: 'почтальон', emoji: '📮' },
      { greek: 'le coiffeur', transcription: 'лё куафё́р', translation: 'парикмахер', emoji: '💇' },
      { greek: "l'agent immobilier", transcription: 'ляжа́н имобилье́', translation: 'риелтор', emoji: '🏘️' },
    ]
  },
  {
    id: 'directions', emoji: '🧭', title: 'Направления и ориентиры',
    words: [
      { greek: 'à droite', transcription: 'а друа́т', translation: 'направо', emoji: '➡️' },
      { greek: 'à gauche', transcription: 'а гош', translation: 'налево', emoji: '⬅️' },
      { greek: 'tout droit', transcription: 'ту друа́', translation: 'прямо', emoji: '⬆️' },
      { greek: 'en face de', transcription: 'ан фас дё', translation: 'напротив', emoji: '↔️' },
      { greek: 'à côté de', transcription: 'а котэ́ дё', translation: 'рядом с', emoji: '🤝' },
      { greek: 'près de', transcription: 'прэ дё', translation: 'около', emoji: '📍' },
      { greek: 'loin de', transcription: 'луэ́н дё', translation: 'далеко от', emoji: '🛣️' },
      { greek: 'au coin', transcription: 'о куэ́н', translation: 'на углу', emoji: '📐' },
      { greek: 'le carrefour', transcription: 'лё карфу́р', translation: 'перекрёсток', emoji: '🚦' },
      { greek: 'le feu', transcription: 'лё фё', translation: 'светофор', emoji: '🚥' },
      { greek: 'le rond-point', transcription: 'лё рон-пуэ́н', translation: 'круговое движение', emoji: '🔄' },
      { greek: 'le trottoir', transcription: 'лё тротуа́р', translation: 'тротуар', emoji: '🚶' },
      { greek: 'le passage piéton', transcription: 'лё паса́ж пьето́н', translation: 'пешеходный переход', emoji: '🚸' },
      { greek: "l'entrée", transcription: 'лантрэ́', translation: 'вход', emoji: '🚪' },
      { greek: 'la sortie', transcription: 'ля сорти́', translation: 'выход', emoji: '🚪' },
    ]
  },
  {
    id: 'travel', emoji: '🧳', title: 'Путешествия и отпуск',
    words: [
      { greek: 'les vacances', transcription: 'ле вака́нс', translation: 'отпуск, каникулы', emoji: '🏖️' },
      { greek: 'le voyage', transcription: 'лё вуая́ж', translation: 'поездка', emoji: '✈️' },
      { greek: 'la valise', transcription: 'ля вали́з', translation: 'чемодан', emoji: '🧳' },
      { greek: 'le sac à dos', transcription: 'лё сак а до', translation: 'рюкзак', emoji: '🎒' },
      { greek: "l'hôtel", transcription: 'лотэ́ль', translation: 'отель', emoji: '🏨' },
      { greek: 'la chambre', transcription: 'ля шамбр', translation: 'номер, комната', emoji: '🛏️' },
      { greek: 'la réservation', transcription: 'ля резервасьо́н', translation: 'бронирование', emoji: '📆' },
      { greek: 'le gîte', transcription: 'лё жит', translation: 'домик в аренду', emoji: '🏡' },
      { greek: 'le camping', transcription: 'лё кампи́нг', translation: 'кемпинг', emoji: '⛺' },
      { greek: "l'aéroport", transcription: 'лаэропо́р', translation: 'аэропорт', emoji: '🛫' },
      { greek: "l'office de tourisme", transcription: 'лофи́с дё туризм', translation: 'туристический офис', emoji: 'ℹ️' },
      { greek: 'la visite guidée', transcription: 'ля визи́т гидэ́', translation: 'экскурсия с гидом', emoji: '🗺️' },
      { greek: 'la carte postale', transcription: 'ля карт постя́ль', translation: 'открытка', emoji: '📮' },
      { greek: 'le souvenir', transcription: 'лё сувни́р', translation: 'сувенир', emoji: '🎁' },
      { greek: 'le pont', transcription: 'лё пон', translation: 'длинные выходные вокруг праздника', emoji: '🌉' },
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
