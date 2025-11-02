export interface TextCorpus {
  id: string;
  name: string;
  words: string;
}

export const corpora: TextCorpus[] = [
  {
    id: 'latin',
    name: 'Latin (Classic)',
    words:
      'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum',
  },
  {
    id: 'raven',
    name: 'The Raven (English)',
    words:
      'once upon midnight dreary while pondered weak and weary over many quaint curious volume forgotten lore nodded nearly napping suddenly there came tapping as of someone gently rapping at my chamber door tis visitor muttered only this nothing more distinctly remember it was bleak December each separate dying ember wrought its ghost the floor eagerly wished morrow vainly had sought to borrow from books surcease sorrow for lost Lenore rare radiant maiden whom angels name nameless here forevermore',
  },
  {
    id: 'french',
    name: 'French',
    words:
      'le la les un une des et ou mais donc car dans sur avec pour sans sous par entre chez vers être avoir faire dire pouvoir vouloir aller venir voir savoir prendre donner trouver penser croire aimer parler demander chercher regarder rester porter jouer vivre changer écrire lire marcher courir temps jour vie monde homme femme enfant œil main chose histoire question raison force lumière ombre silence bruit cœur âme esprit',
  },
  {
    id: 'german',
    name: 'German',
    words:
      'der die das ein eine und oder aber denn sondern in an auf mit für von zu bei aus nach über unter durch sein haben werden können müssen sollen wollen mögen dürfen machen sagen geben kommen gehen sehen wissen nehmen denken sprechen fragen suchen finden bleiben stehen schreiben lesen spielen leben arbeiten Zeit Tag Jahr Leben Welt Mensch Mann Frau Kind Hand Auge Haus Stadt Land Ding Geschichte Frage Recht Kraft Licht Schatten',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    words:
      'el la los las un una unos unas y o pero porque en a de con para por sin sobre bajo entre desde hasta ser estar haber tener hacer decir poder querer ir venir ver saber dar tomar hablar pensar creer buscar encontrar vivir trabajar escribir leer jugar caminar correr tiempo día año vida mundo hombre mujer niño casa ciudad país cosa mano ojo historia pregunta razón fuerza luz sombra corazón',
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

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateLoremIpsum(
  corpus: TextCorpus,
  length: LengthOption
): string {
  const config = lengthOptions.find((opt) => opt.id === length);
  if (config === undefined) {
    throw new Error(`Invalid length option: ${length}`);
  }

  const words = corpus.words.split(' ');

  if (config.paragraphs === 0) {
    return generateSentence(words);
  }

  const paragraphs: string[] = [];
  for (let i = 0; i < config.paragraphs; i++) {
    paragraphs.push(generateParagraph(words));
  }

  return paragraphs.join('\n\n');
}

function generateSentence(words: string[]): string {
  const sentenceLength = getRandomInt(8, 16);
  const sentenceWords: string[] = [];

  for (let i = 0; i < sentenceLength; i++) {
    sentenceWords.push(pickRandom(words));
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
