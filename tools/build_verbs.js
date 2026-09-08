#!/usr/bin/env node
/*
 * Генератор спряжений глаголов IziFrench.
 *
 * Читает VERBS из data.js и достраивает три времени:
 *   present    — présent de l'indicatif
 *   preterite  — passé composé (в UI подписан именно так)
 *   future     — futur simple
 *
 * Правильные -er / -ir (тип finir) / -re (тип vendre) считаются по правилам,
 * неправильные берутся из таблиц ниже. Всё, что уже задано в data.js вручную,
 * НЕ перетирается: явная форма всегда сильнее сгенерированной.
 *
 * Наращивание словаря: добавляй в data.js глагол с полями infinitive/translation/
 * transcription/example — времена достроятся сами. Если глагол неправильный и его
 * нет в таблицах — скрипт упадёт с именем глагола, это намеренно.
 *
 *   node tools/build_verbs.js          # переписать блок VERBS в data.js
 *   node tools/build_verbs.js --check  # только проверить, ничего не писать
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DATA = path.join(__dirname, '..', 'data.js');
const PRON = ["je", "tu", "il/elle", "nous", "vous", "ils/elles"];

// ---------------------------------------------------------------- présent
const PRES_END = {
  er: ["e", "es", "e", "ons", "ez", "ent"],
  ir: ["is", "is", "it", "issons", "issez", "issent"],   // тип finir
  re: ["s", "s", "", "ons", "ez", "ent"],                // тип vendre
};

// Неправильные в présent — шесть форм подряд.
const PRES_IRREGULAR = {
  être:    ["suis", "es", "est", "sommes", "êtes", "sont"],
  avoir:   ["ai", "as", "a", "avons", "avez", "ont"],
  aller:   ["vais", "vas", "va", "allons", "allez", "vont"],
  faire:   ["fais", "fais", "fait", "faisons", "faites", "font"],
  dire:    ["dis", "dis", "dit", "disons", "dites", "disent"],
  pouvoir: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
  vouloir: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
  devoir:  ["dois", "dois", "doit", "devons", "devez", "doivent"],
  savoir:  ["sais", "sais", "sait", "savons", "savez", "savent"],
  voir:    ["vois", "vois", "voit", "voyons", "voyez", "voient"],
  venir:   ["viens", "viens", "vient", "venons", "venez", "viennent"],
  revenir: ["reviens", "reviens", "revient", "revenons", "revenez", "reviennent"],
  devenir: ["deviens", "deviens", "devient", "devenons", "devenez", "deviennent"],
  tenir:   ["tiens", "tiens", "tient", "tenons", "tenez", "tiennent"],
  prendre: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
  apprendre: ["apprends", "apprends", "apprend", "apprenons", "apprenez", "apprennent"],
  comprendre: ["comprends", "comprends", "comprend", "comprenons", "comprenez", "comprennent"],
  mettre:  ["mets", "mets", "met", "mettons", "mettez", "mettent"],
  permettre: ["permets", "permets", "permet", "permettons", "permettez", "permettent"],
  écrire:  ["écris", "écris", "écrit", "écrivons", "écrivez", "écrivent"],
  lire:    ["lis", "lis", "lit", "lisons", "lisez", "lisent"],
  boire:   ["bois", "bois", "boit", "buvons", "buvez", "boivent"],
  croire:  ["crois", "crois", "croit", "croyons", "croyez", "croient"],
  recevoir: ["reçois", "reçois", "reçoit", "recevons", "recevez", "reçoivent"],
  connaître: ["connais", "connais", "connaît", "connaissons", "connaissez", "connaissent"],
  partir:  ["pars", "pars", "part", "partons", "partez", "partent"],
  sortir:  ["sors", "sors", "sort", "sortons", "sortez", "sortent"],
  dormir:  ["dors", "dors", "dort", "dormons", "dormez", "dorment"],
  servir:  ["sers", "sers", "sert", "servons", "servez", "servent"],
  sentir:  ["sens", "sens", "sent", "sentons", "sentez", "sentent"],
  ouvrir:  ["ouvre", "ouvres", "ouvre", "ouvrons", "ouvrez", "ouvrent"],
  offrir:  ["offre", "offres", "offre", "offrons", "offrez", "offrent"],
  souffrir: ["souffre", "souffres", "souffre", "souffrons", "souffrez", "souffrent"],
  courir:  ["cours", "cours", "court", "courons", "courez", "courent"],
  mourir:  ["meurs", "meurs", "meurt", "mourons", "mourez", "meurent"],
  vivre:   ["vis", "vis", "vit", "vivons", "vivez", "vivent"],
  suivre:  ["suis", "suis", "suit", "suivons", "suivez", "suivent"],
  conduire: ["conduis", "conduis", "conduit", "conduisons", "conduisez", "conduisent"],
  produire: ["produis", "produis", "produit", "produisons", "produisez", "produisent"],
  traduire: ["traduis", "traduis", "traduit", "traduisons", "traduisez", "traduisent"],
  attendre: ["attends", "attends", "attend", "attendons", "attendez", "attendent"],
  descendre: ["descends", "descends", "descend", "descendons", "descendez", "descendent"],
  répondre: ["réponds", "réponds", "répond", "répondons", "répondez", "répondent"],
  entendre: ["entends", "entends", "entend", "entendons", "entendez", "entendent"],
  perdre:  ["perds", "perds", "perd", "perdons", "perdez", "perdent"],
  rendre:  ["rends", "rends", "rend", "rendons", "rendez", "rendent"],
  vendre:  ["vends", "vends", "vend", "vendons", "vendez", "vendent"],
  appeler: ["appelle", "appelles", "appelle", "appelons", "appelez", "appellent"],
  acheter: ["achète", "achètes", "achète", "achetons", "achetez", "achètent"],
  préférer: ["préfère", "préfères", "préfère", "préférons", "préférez", "préfèrent"],
  espérer: ["espère", "espères", "espère", "espérons", "espérez", "espèrent"],
  répéter: ["répète", "répètes", "répète", "répétons", "répétez", "répètent"],
  payer:   ["paie", "paies", "paie", "payons", "payez", "paient"],
  essayer: ["essaie", "essaies", "essaie", "essayons", "essayez", "essaient"],
  envoyer: ["envoie", "envoies", "envoie", "envoyons", "envoyez", "envoient"],
  nettoyer: ["nettoie", "nettoies", "nettoie", "nettoyons", "nettoyez", "nettoient"],
  manger:  ["mange", "manges", "mange", "mangeons", "mangez", "mangent"],
  voyager: ["voyage", "voyages", "voyage", "voyageons", "voyagez", "voyagent"],
  ranger:  ["range", "ranges", "range", "rangeons", "rangez", "rangent"],
  changer: ["change", "changes", "change", "changeons", "changez", "changent"],
  commencer: ["commence", "commences", "commence", "commençons", "commencez", "commencent"],
  avancer: ["avance", "avances", "avance", "avançons", "avancez", "avancent"],
  placer:  ["place", "places", "place", "plaçons", "placez", "placent"],
  lancer:  ["lance", "lances", "lance", "lançons", "lancez", "lancent"],
  bouger:  ["bouge", "bouges", "bouge", "bougeons", "bougez", "bougent"],
  déménager: ["déménage", "déménages", "déménage", "déménageons", "déménagez", "déménagent"],
  partager: ["partage", "partages", "partage", "partageons", "partagez", "partagent"],
  nager:   ["nage", "nages", "nage", "nageons", "nagez", "nagent"],
  corriger: ["corrige", "corriges", "corrige", "corrigeons", "corrigez", "corrigent"],
  obliger: ["oblige", "obliges", "oblige", "obligeons", "obligez", "obligent"],
  emmener: ["emmène", "emmènes", "emmène", "emmenons", "emmenez", "emmènent"],
  amener:  ["amène", "amènes", "amène", "amenons", "amenez", "amènent"],
  lever:   ["lève", "lèves", "lève", "levons", "levez", "lèvent"],
  promener: ["promène", "promènes", "promène", "promenons", "promenez", "promènent"],
  peser:   ["pèse", "pèses", "pèse", "pesons", "pesez", "pèsent"],
  jeter:   ["jette", "jettes", "jette", "jetons", "jetez", "jettent"],
  employer: ["emploie", "emploies", "emploie", "employons", "employez", "emploient"],
  ennuyer: ["ennuie", "ennuies", "ennuie", "ennuyons", "ennuyez", "ennuient"],
  appuyer: ["appuie", "appuies", "appuie", "appuyons", "appuyez", "appuient"],
  inscrire: ["inscris", "inscris", "inscrit", "inscrivons", "inscrivez", "inscrivent"],
  décrire: ["décris", "décris", "décrit", "décrivons", "décrivez", "décrivent"],
  construire: ["construis", "construis", "construit", "construisons", "construisez", "construisent"],
  détruire: ["détruis", "détruis", "détruit", "détruisons", "détruisez", "détruisent"],
  éteindre: ["éteins", "éteins", "éteint", "éteignons", "éteignez", "éteignent"],
  peindre: ["peins", "peins", "peint", "peignons", "peignez", "peignent"],
  craindre: ["crains", "crains", "craint", "craignons", "craignez", "craignent"],
  plaindre: ["plains", "plains", "plaint", "plaignons", "plaignez", "plaignent"],
  gérer:   ["gère", "gères", "gère", "gérons", "gérez", "gèrent"],
  sécher:  ["sèche", "sèches", "sèche", "séchons", "séchez", "sèchent"],
  transférer: ["transfère", "transfères", "transfère", "transférons", "transférez", "transfèrent"],
  compléter: ["complète", "complètes", "complète", "complétons", "complétez", "complètent"],
  diriger: ["dirige", "diriges", "dirige", "dirigeons", "dirigez", "dirigent"],
  exiger:  ["exige", "exiges", "exige", "exigeons", "exigez", "exigent"],
  déranger: ["dérange", "déranges", "dérange", "dérangeons", "dérangez", "dérangent"],
  renouveler: ["renouvelle", "renouvelles", "renouvelle", "renouvelons", "renouvelez", "renouvellent"],
  couvrir: ["couvre", "couvres", "couvre", "couvrons", "couvrez", "couvrent"],
  cuire:   ["cuis", "cuis", "cuit", "cuisons", "cuisez", "cuisent"],
  mélanger: ["mélange", "mélanges", "mélange", "mélangeons", "mélangez", "mélangent"],
  télécharger: ["télécharge", "télécharges", "télécharge", "téléchargeons", "téléchargez", "téléchargent"],
  recharger: ["recharge", "recharges", "recharge", "rechargeons", "rechargez", "rechargent"],
  encourager: ["encourage", "encourages", "encourage", "encourageons", "encouragez", "encouragent"],
  congeler: ["congèle", "congèles", "congèle", "congelons", "congelez", "congèlent"],
  opérer:  ["opère", "opères", "opère", "opérons", "opérez", "opèrent"],
  inquiéter: ["inquiète", "inquiètes", "inquiète", "inquiétons", "inquiétez", "inquiètent"],
  protéger: ["protège", "protèges", "protège", "protégeons", "protégez", "protègent"],
  prescrire: ["prescris", "prescris", "prescrit", "prescrivons", "prescrivez", "prescrivent"],
  joindre: ["joins", "joins", "joint", "joignons", "joignez", "joignent"],
  rejoindre: ["rejoins", "rejoins", "rejoint", "rejoignons", "rejoignez", "rejoignent"],
  battre:  ["bats", "bats", "bat", "battons", "battez", "battent"],
  promettre: ["promets", "promets", "promet", "promettons", "promettez", "promettent"],
  remettre: ["remets", "remets", "remet", "remettons", "remettez", "remettent"],
  reprendre: ["reprends", "reprends", "reprend", "reprenons", "reprenez", "reprennent"],
  surprendre: ["surprends", "surprends", "surprend", "surprenons", "surprenez", "surprennent"],
  obtenir: ["obtiens", "obtiens", "obtient", "obtenons", "obtenez", "obtiennent"],
  maintenir: ["maintiens", "maintiens", "maintient", "maintenons", "maintenez", "maintiennent"],
  appartenir: ["appartiens", "appartiens", "appartient", "appartenons", "appartenez", "appartiennent"],
  prévenir: ["préviens", "préviens", "prévient", "prévenons", "prévenez", "préviennent"],
  souvenir: ["souviens", "souviens", "souvient", "souvenons", "souvenez", "souviennent"],
  apercevoir: ["aperçois", "aperçois", "aperçoit", "apercevons", "apercevez", "aperçoivent"],
  décevoir: ["déçois", "déçois", "déçoit", "décevons", "décevez", "déçoivent"],
  reconnaître: ["reconnais", "reconnais", "reconnaît", "reconnaissons", "reconnaissez", "reconnaissent"],
  paraître: ["parais", "parais", "paraît", "paraissons", "paraissez", "paraissent"],
  disparaître: ["disparais", "disparais", "disparaît", "disparaissons", "disparaissez", "disparaissent"],
  plaire:  ["plais", "plais", "plaît", "plaisons", "plaisez", "plaisent"],
  rire:    ["ris", "ris", "rit", "rions", "riez", "rient"],
  sourire: ["souris", "souris", "sourit", "sourions", "souriez", "sourient"],
  suffire: ["suffis", "suffis", "suffit", "suffisons", "suffisez", "suffisent"],
  résoudre: ["résous", "résous", "résout", "résolvons", "résolvez", "résolvent"],
  repartir: ["repars", "repars", "repart", "repartons", "repartez", "repartent"],
  ressentir: ["ressens", "ressens", "ressent", "ressentons", "ressentez", "ressentent"],
  mentir:  ["mens", "mens", "ment", "mentons", "mentez", "mentent"],
  découvrir: ["découvre", "découvres", "découvre", "découvrons", "découvrez", "découvrent"],
  cueillir: ["cueille", "cueilles", "cueille", "cueillons", "cueillez", "cueillent"],
  accueillir: ["accueille", "accueilles", "accueille", "accueillons", "accueillez", "accueillent"],
  fuir:    ["fuis", "fuis", "fuit", "fuyons", "fuyez", "fuient"],
  falloir: ["—", "—", "faut", "—", "—", "—"],
  pleuvoir: ["—", "—", "pleut", "—", "—", "—"],
  s_appeler: ["m'appelle", "t'appelles", "s'appelle", "nous appelons", "vous appelez", "s'appellent"],
};

// ---------------------------------------------------------------- futur simple
const FUT_END = ["ai", "as", "a", "ons", "ez", "ont"];
const FUT_STEM = {
  être: "ser", avoir: "aur", aller: "ir", faire: "fer", savoir: "saur",
  pouvoir: "pourr", vouloir: "voudr", devoir: "devr", voir: "verr",
  venir: "viendr", revenir: "reviendr", devenir: "deviendr", tenir: "tiendr",
  recevoir: "recevr", courir: "courr", mourir: "mourr", envoyer: "enverr",
  acheter: "achèter", appeler: "appeller", payer: "paier", essayer: "essaier",
  nettoyer: "nettoier", falloir: "faudr",
  employer: "emploier", ennuyer: "ennuier", appuyer: "appuier",
  emmener: "emmèner", amener: "amèner", lever: "lèver", promener: "promèner",
  peser: "pèser", jeter: "jetter", pleuvoir: "pleuvr",
  obtenir: "obtiendr", maintenir: "maintiendr", appartenir: "appartiendr",
  prévenir: "préviendr", souvenir: "souviendr",
  apercevoir: "apercevr", décevoir: "décevr",
  renouveler: "renouveller", gérer: "gèrer", sécher: "sècher", transférer: "transfèrer", compléter: "complèter",
  congeler: "congèler", opérer: "opèrer", inquiéter: "inquièter", protéger: "protèger",
};

// ---------------------------------------------------------------- participes
const PART_IRREGULAR = {
  être: "été", avoir: "eu", faire: "fait", dire: "dit", prendre: "pris",
  apprendre: "appris", comprendre: "compris", mettre: "mis", permettre: "permis",
  pouvoir: "pu", vouloir: "voulu", devoir: "dû", savoir: "su", voir: "vu",
  boire: "bu", croire: "cru", lire: "lu", écrire: "écrit", recevoir: "reçu",
  connaître: "connu", vivre: "vécu", suivre: "suivi", conduire: "conduit",
  produire: "produit", traduire: "traduit", ouvrir: "ouvert", offrir: "offert",
  souffrir: "souffert", courir: "couru", mourir: "mort", venir: "venu",
  revenir: "revenu", devenir: "devenu", tenir: "tenu", attendre: "attendu",
  descendre: "descendu", répondre: "répondu", entendre: "entendu",
  perdre: "perdu", rendre: "rendu", vendre: "vendu", partir: "parti",
  sortir: "sorti", dormir: "dormi", servir: "servi", sentir: "senti",
  naître: "né", aller: "allé", falloir: "fallu", pleuvoir: "plu",
  inscrire: "inscrit", décrire: "décrit", construire: "construit", détruire: "détruit",
  éteindre: "éteint", peindre: "peint", craindre: "craint", joindre: "joint",
  rejoindre: "rejoint", battre: "battu", promettre: "promis", remettre: "remis",
  reprendre: "repris", surprendre: "surpris", obtenir: "obtenu", maintenir: "maintenu",
  appartenir: "appartenu", prévenir: "prévenu", souvenir: "souvenu",
  apercevoir: "aperçu", décevoir: "déçu", reconnaître: "reconnu", paraître: "paru",
  disparaître: "disparu", plaire: "plu", rire: "ri", sourire: "souri",
  suffire: "suffi", résoudre: "résolu", repartir: "reparti", ressentir: "ressenti",
  mentir: "menti", découvrir: "découvert", cueillir: "cueilli", accueillir: "accueilli",
  fuir: "fui", rentrer: "rentré", retourner: "retourné", plaindre: "plaint", couvrir: "couvert",
  cuire: "cuit", prescrire: "prescrit",
};

// Глаголы, спрягающиеся в passé composé с être (дом Ван Дер Трамп).
const ETRE_VERBS = new Set([
  "aller", "venir", "revenir", "devenir", "arriver", "partir", "entrer",
  "rentrer", "sortir", "monter", "descendre", "rester", "tomber", "naître",
  "mourir", "retourner", "passer",
]);

const AUX_AVOIR = ["ai", "as", "a", "avons", "avez", "ont"];
const AUX_ETRE = ["suis", "es", "est", "sommes", "êtes", "sont"];

const VOWELS = "aeiouyâàéèêîôûù";
const elide = (form) => (VOWELS.includes(form[0].toLowerCase()) || form[0] === "h");

function type(inf) {
  if (inf.endsWith("er")) return "er";
  if (inf.endsWith("ir")) return "ir";
  if (inf.endsWith("re")) return "re";
  return null;
}

function present(inf) {
  const irr = PRES_IRREGULAR[inf];
  const forms = irr || (() => {
    const t = type(inf);
    if (!t) throw new Error(`не -er/-ir/-re и нет в таблице présent: ${inf}`);
    const stem = inf.slice(0, -2);
    return PRES_END[t].map((e) => stem + e);
  })();
  const o = {};
  PRON.forEach((p, i) => (o[p] = forms[i]));
  return o;
}

function future(inf) {
  let stem = FUT_STEM[inf];
  if (!stem) {
    if (!type(inf)) throw new Error(`не знаю основу futur: ${inf}`);
    stem = inf.endsWith("re") ? inf.slice(0, -1) : inf;   // vendre -> vendr
  }
  const o = {};
  PRON.forEach((p, i) => (o[p] = stem + FUT_END[i]));
  return o;
}

function participle(inf) {
  if (PART_IRREGULAR[inf]) return PART_IRREGULAR[inf];
  const t = type(inf);
  if (t === "er") return inf.slice(0, -2) + "é";
  if (t === "ir") return inf.slice(0, -2) + "i";
  if (t === "re") return inf.slice(0, -2) + "u";
  throw new Error(`не знаю причастие: ${inf}`);
}

function passeCompose(inf) {
  // Храним форму БЕЗ местоимения: «ai mangé», «suis allé(e)».
  // Местоимение подставляет UI, он же делает элизию je -> j'.
  const part = participle(inf);
  const withEtre = ETRE_VERBS.has(inf);
  const aux = withEtre ? AUX_ETRE : AUX_AVOIR;
  const AGREE = {                       // с être причастие согласуется
    "je": "(e)", "tu": "(e)", "il/elle": "(e)",
    "nous": "(e)s", "vous": "(e)(s)", "ils/elles": "(e)s",
  };
  const o = {};
  PRON.forEach((p, i) => {
    o[p] = `${aux[i]} ${part}${withEtre ? AGREE[p] : ""}`;
  });
  return o;
}

// ---------------------------------------------------------------- сборка
function build(verbs) {
  const problems = [];
  verbs.forEach((v) => {
    if (!v.infinitive) return;
    try {
      v.present = v.present || present(v.infinitive);
      v.preterite = v.preterite || passeCompose(v.infinitive);
      v.future = v.future || future(v.infinitive);
    } catch (e) {
      problems.push(e.message);
    }
  });
  if (problems.length) {
    console.error("НЕ СПРЯГЛОСЬ:\n  " + problems.join("\n  "));
    process.exit(1);
  }
  return verbs;
}

function dump(verbs) {
  const lines = verbs.map((v) => {
    const j = (o) => JSON.stringify(o, null, 0).replace(/","/g, '", "').replace(/":"/g, '": "');
    return `  {
    id: ${v.id}, infinitive: ${JSON.stringify(v.infinitive)}, translation: ${JSON.stringify(v.translation)},
    transcription: ${JSON.stringify(v.transcription)}${v.note ? `, note: ${JSON.stringify(v.note)}` : ""},
    example: ${j(v.example)},
    present: ${j(v.present)},
    preterite: ${j(v.preterite)},
    future: ${j(v.future)}
  }`;
  });
  return "const VERBS = [\n" + lines.join(",\n") + "\n];\n";
}

const src = fs.readFileSync(DATA, "utf8");
const ctx = vm.runInNewContext(src + "\n;({VERBS});");
const verbs = build(ctx.VERBS);

if (process.argv.includes("--check")) {
  console.log(`проверено глаголов: ${verbs.filter((v) => v.infinitive).length} — все спряглись`);
  process.exit(0);
}

const start = src.indexOf("const VERBS = [");
const end = src.indexOf("\n];\n", start) + "\n];\n".length;
fs.writeFileSync(DATA, src.slice(0, start) + dump(verbs) + src.slice(end));
console.log(`спряжения записаны: ${verbs.filter((v) => v.infinitive).length} глаголов`);
