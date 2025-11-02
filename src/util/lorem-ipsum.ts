export interface TextCorpus {
  id: string;
  name: string;
  words: string[];
}

// Each corpus is an array of words or short phrases that should stay together.
// All words should be lower case, except the words that should be always
// capitalized should be capitalized. Duplicated words should be removed.
export const corpora: TextCorpus[] = [
  {
    // European Hipster Ipsum (Berliner Hipster)
    // Based on https://github.com/pbojinov/lorem-hipsum
    // with some words removed, and some added
    // https://github.com/sapegin/dotfiles/blob/master/alfred/scripts/hipster-ipsum.mjs
    id: 'hipsum',
    name: 'Berliner Hipster (English)',
    words: [
      'actually',
      'aesthetic',
      'art party',
      'artisan',
      'asymmetrical',
      'authentic',
      'banh mi',
      'banjo',
      'Banksy',
      'beard',
      'before they sold out',
      'bespoke',
      'bicycle rights',
      'biodiesel',
      'bitters',
      'blog',
      'Blue Bottle',
      'Brooklyn',
      'brunch',
      'butcher',
      'cardigan',
      'chambray',
      'chia',
      'chillwave',
      'church-key',
      'cliche',
      'cornhole',
      'Cosby sweater',
      'craft beer',
      'cray',
      'cred',
      'crucifix',
      'deep v',
      'direct trade ',
      'disrupt',
      'distillery',
      'DIY',
      'dreamcatcher',
      'drinking vinegar',
      'ennui',
      'ethical',
      'ethnic',
      'fanny pack',
      'farm-to-table',
      'fashion axe',
      'fingerstache',
      'fixie',
      'flannel',
      'flexitarian',
      'food truck',
      'forage',
      'four loko',
      'freegan',
      'gastropub',
      'gentrify',
      'gluten-free',
      'Godard',
      'hashtag',
      'hella',
      'Helvetica',
      'High Life',
      'hoodie',
      'Intelligentsia',
      'iPhone',
      'irony',
      'jean shorts',
      'kale chips',
      'keffiyeh',
      'keytar',
      'Kickstarter',
      'kitsch',
      'kogi',
      'leggings',
      'letterpress',
      'literally',
      'lo-fi',
      'locavore',
      'lomo',
      'master cleanse',
      'meggings',
      'meh',
      'messenger bag',
      'mixtape',
      'mlkshk',
      'mumblecore',
      'mustache',
      'narwhal',
      'next level',
      'normcore',
      'occupy',
      'organic',
      'paleo',
      'photo booth',
      'pickled',
      'plaid',
      'polaroid',
      'pop-up',
      'pork belly',
      'post-ironic',
      'pour-over',
      'pug',
      'put a bird on it',
      'quinoa',
      'raw denim',
      'readymade',
      'retro',
      'roof party',
      'salvia',
      'sartorial',
      'scenester',
      'Schlitz',
      'seitan',
      'selfies',
      'selvage',
      'semiotics',
      'shabby chic',
      'single-origin coffee',
      'skateboard',
      'slow-carb',
      'small batch',
      'squid',
      'sriracha',
      'street art',
      'stumptown',
      'sustainable',
      'swag',
      'synth',
      'tattooed',
      'tofu',
      'tote bag',
      'tousled',
      'trust fund',
      'try-hard',
      'twee',
      'typewriter',
      'ugh',
      'umami',
      'vegan',
      'VHS',
      'vinyl',
      'viral',
      'wayfarers',
      'whatever',
      'wolf',
      'XOXO',
      'YOLO',
      'you probably haven’t heard of them',
      // My additions
      'X-berg',
      'Neukölln',
      'Prenzlauer Berg',
      'Mauerpark',
      'Berghain',
      'döner',
      'bagel',
      'ramen',
      'taco',
      'poke bowl',
      'pumpkin spice latte',
      'matcha',
      'wet cappuccino',
      'oat milk',
      'veggies',
      'keto',
      'underconsuption',
      'no buy year',
      'flea market',
      'vintage',
      'cottagecore',
      'instagrammable',
      'späti',
      'TikTok',
      'MacBook',
      'Leica',
      'the Barn',
    ],
  },
  {
    // The classic Lorem Ipsum
    // https://www.lipsum.com/
    id: 'latin',
    name: 'Lorem Ipsum (Latin)',
    words: [
      'lorem',
      'ipsum',
      'dolor',
      'sit',
      'amet',
      'consectetur',
      'adipiscing',
      'elit',
      'sed',
      'do',
      'eiusmod',
      'tempor',
      'incididunt',
      'ut',
      'labore',
      'et',
      'dolore',
      'magna',
      'aliqua',
      'enim',
      'ad',
      'minim',
      'veniam',
      'quis',
      'nostrud',
      'exercitation',
      'ullamco',
      'laboris',
      'nisi',
      'aliquip',
      'ex',
      'ea',
      'commodo',
      'consequat',
      'duis',
      'aute',
      'irure',
      'in',
      'reprehenderit',
      'voluptate',
      'velit',
      'esse',
      'cillum',
      'fugiat',
      'nulla',
      'pariatur',
      'excepteur',
      'sint',
      'occaecat',
      'cupidatat',
      'non',
      'proident',
      'sunt',
      'culpa',
      'qui',
      'officia',
      'deserunt',
      'mollit',
      'anim',
      'id',
      'est',
      'laborum',
    ],
  },
  {
    // The Raven by Edgar Allan Poe
    // https://www.poetryfoundation.org/poems/48860/the-raven
    id: 'raven',
    name: 'The Raven (English)',
    words: [
      'once',
      'upon',
      'a',
      'midnight',
      'dreary',
      'while',
      'I',
      'pondered',
      'weak',
      'and',
      'weary',
      'over',
      'many',
      'quaint',
      'curious',
      'volume',
      'of',
      'forgotten',
      'lore',
      'nodded',
      'nearly',
      'napping',
      'suddenly',
      'there',
      'came',
      'tapping',
      'as',
      'some one',
      'gently',
      'rapping',
      'at',
      'my chamber door.',
      '’tis',
      'some',
      'visitor',
      'muttered',
      'only',
      'this',
      'nothing more',
      'ah',
      'distinctly',
      'remember',
      'it',
      'was',
      'in',
      'the',
      'bleak',
      'December',
      'each',
      'separate',
      'dying',
      'ember',
      'wrought',
      'its',
      'ghost',
      'floor',
      'eagerly',
      'wished',
      'morrow',
      'vainly',
      'had',
      'sought',
      'to',
      'borrow',
      'from',
      'books',
      'surcease',
      'sorrow',
      'for the lost Lenore',
      'rare',
      'radiant',
      'maiden',
      'whom',
      'angels',
      'name',
      'nameless',
      'here',
      'for evermore',
    ],
  },
  {
    // Pedro Páramo by Juan Rulfo
    // https://archive.org/details/pedro-paramo-juan-rulfo-z-lib.org
    id: 'pedro',
    name: 'Pedro Páramo (Spanish)',
    words: [
      'me',
      'llamo',
      'Juan',
      'Nepomuceno',
      'Pérez',
      'Rulfo',
      'apilaron',
      'todos',
      'los',
      'de',
      'mis',
      'antepasados',
      'maternos',
      'y',
      'paternos',
      'si',
      'fuera',
      'el',
      'vástago',
      'un',
      'racimo',
      'plátanos',
      'aunque',
      'sienta',
      'preferencia',
      'por',
      'arracimar',
      'hubiera',
      'gustado',
      'nombre',
      'más',
      'sencillo',
      'la',
      'familia',
      'nunca',
      'mucha',
      'paz',
      'morían',
      'temprano',
      'a',
      'edad',
      '33 años',
      'todos',
      'eran',
      'asesinados',
      'espalda',
      'solo',
      'último',
      'víctima',
      'afición',
      'mató',
      'caballo',
      'enraizar',
      'melómano',
      'Guadalajara',
      'Comala',
      'pueblo',
    ],
  },
  {
    // Eins, Zwei, Polizei; song by Mo-Do; 1995
    // https://genius.com/Mo-do-eins-zwei-polizei-lyrics
    id: 'polizei',
    name: 'Eins, Zwei, Polizei (German)',
    words: [
      'eins',
      'zwei',
      'Polizei',
      'drei',
      'vier',
      'Grenadier',
      'fünf',
      'sechs',
      'alte Hex',
      'sieben',
      'acht',
      'gute Nacht',
      'ja, ja, ja',
      'was ist los',
      'was ist das',
      'oh-oh',
    ],
  },
  {
    // Срезают лазером сосули by Pavel Shapchitz
    // https://amok1.livejournal.com/1534461.html
    id: 'sosuli',
    name: 'Srezayut lazerom (Russian)',
    words: [
      'срезают',
      'лазером',
      'сосули',
      'в',
      'лицо',
      'впиваются',
      'снежины',
      'до',
      'остановы',
      'добегу',
      'ли',
      'снегу',
      'не',
      'утопив',
      'ботины',
      'а',
      'дома',
      'ждет',
      'меня',
      'тарела',
      'гречи',
      'с',
      'белой',
      'булой',
      'ногах',
      'резиновая',
      'грела',
      'и',
      'тапы',
      'мягкие',
      'под',
      'стулом',
      'железной',
      'бане',
      'две',
      'селёды',
      'торчат',
      'оттуда',
      'ложа',
      'вилой',
      'есть',
      'рюма',
      'бутыла',
      'водой',
      'она',
      'обед',
      'мой',
      'завершила',
      'я',
      'кружу',
      'положу',
      'завары',
      'раскрою',
      '«Кобзаря» Шевчены',
      'поэта',
      'уровня',
      'Петрары',
      'Валентины Матвиены',
    ],
  },
];

export type LengthOption =
  | '1-sentence'
  | '1-paragraph'
  | '2-paragraphs'
  | '3-paragraphs'
  | '4-paragraphs'
  | '5-paragraphs';

export interface LengthConfig {
  id: LengthOption;
  name: string;
  paragraphs: number;
}

export const lengthOptions: LengthConfig[] = [
  { id: '1-sentence', name: '1 sentence', paragraphs: 0 },
  { id: '1-paragraph', name: '1 paragraph', paragraphs: 1 },
  { id: '2-paragraphs', name: '2 paragraphs', paragraphs: 2 },
  { id: '3-paragraphs', name: '3 paragraphs', paragraphs: 3 },
  { id: '4-paragraphs', name: '4 paragraphs', paragraphs: 4 },
  { id: '5-paragraphs', name: '5 paragraphs', paragraphs: 5 },
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Return non-repeating random item from an array factory
 * Source: https://stackoverflow.com/a/17891411/1973105
 */
function randomNoRepeats<T>(array: T[]) {
  let copy = [...array];
  return () => {
    if (copy.length === 0) {
      copy = [...array];
    }
    const index = Math.floor(Math.random() * copy.length);
    const item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}

export function generateLoremIpsum(
  corpus: TextCorpus,
  length: LengthOption
): string {
  const config = lengthOptions.find((opt) => opt.id === length);
  if (config === undefined) {
    throw new Error(`Invalid length option: ${length}`);
  }

  if (config.paragraphs === 0) {
    return generateSentence(corpus.words);
  }

  const paragraphs: string[] = [];
  for (let i = 0; i < config.paragraphs; i++) {
    paragraphs.push(generateParagraph(corpus.words));
  }

  return paragraphs.join('\n\n');
}

function generateSentence(words: string[]): string {
  const sentenceLength = getRandomInt(8, 16);
  const sentenceWords: string[] = [];
  const pick = randomNoRepeats(words);

  for (let i = 0; i < sentenceLength; i++) {
    sentenceWords.push(pick());
  }

  return capitalize(sentenceWords.join(' ')) + '.';
}

function generateParagraph(words: string[]): string {
  const sentenceCount = getRandomInt(3, 6);
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(words));
  }

  return sentences.join(' ');
}
