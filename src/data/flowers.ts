import rosesImg from '../assets/images/flower_roses_summer_1794093012721.jpg';
import peoniesImg from '../assets/images/flower_peonies_summer_1794093025667.jpg';
import carnationsImg from '../assets/images/flower_carnations_autumn_1794093025527.jpg';
import irisImg from '../assets/images/flower_iris_winter_1794093025877.jpg';
import tulipsImg from '../assets/images/flower_tulips_spring_1794093027502.jpg';
import lilyValleyImg from '../assets/images/flower_lily_valley_1794093026901.jpg';

export interface FlowerData {
  id: string;
  order: number;
  monthNumber: number;
  name: string;
  scientificName: string;
  season: 'Verano' | 'Otoño' | 'Invierno' | 'Primavera';
  seasonBadge: string;
  seasonIcon: string;
  seasonDescription: string;
  flowerMeaning: string;
  image: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    bgGradient: string;
    cardBg: string;
    border: string;
    glow: string;
    petalColor: string;
  };
  song: {
    title: string;
    artist: string;
    tagline: string;
    youtubeId: string;
    youtubeUrl: string;
    connectionNote: string;
  };
  diaryLetter: {
    chapter: string;
    subtitle: string;
    text: string;
    highlightPhrase?: string;
  };
  stardewNote?: string;
  isGrandFinale?: boolean;
}

export const FLOWERS: FlowerData[] = [
  {
    id: 'rosas',
    order: 1,
    monthNumber: 1,
    name: 'Rosas',
    scientificName: 'Rosa gallica / Rosa canina',
    season: 'Verano',
    seasonBadge: 'Floración de Verano',
    seasonIcon: '☀️',
    seasonDescription: 'Florecen en el calor radiante del verano, cuando el sol despierta su aroma más intenso.',
    flowerMeaning: 'La rosa es el símbolo universal de la devoción incondicional, la pasión sincera y la promesa viva de quien entrega el alma sin reservas. Sus pétalos aterciopelados abrazan con fuerza cada espina superada.',
    image: rosesImg,
    palette: {
      primary: '#e11d48',
      secondary: '#fb7185',
      accent: '#f43f5e',
      bgGradient: 'from-rose-950/90 via-stone-900 to-red-950/80',
      cardBg: 'bg-rose-950/40 backdrop-blur-xl',
      border: 'border-rose-500/20',
      glow: 'rgba(244, 63, 94, 0.25)',
      petalColor: 'rgba(244, 63, 94, 0.65)',
    },
    song: {
      title: 'At The Beginning',
      artist: 'Richard Marx & Donna Lewis (Anastasia)',
      tagline: '«Un largo viaje que apenas comienza...»',
      youtubeId: 'r0SocbXEal8',
      youtubeUrl: 'https://www.youtube.com/watch?v=r0SocbXEal8',
      connectionNote: 'El primer paso de un camino eterno donde prometimos estar juntos sin importar la distancia ni las tormentas.',
    },
    diaryLetter: {
      chapter: 'Diario Mes 1 · El Inicio de Todo',
      subtitle: 'La promesa sincera',
      text: 'Antes que nada... Verás canciones que van a su correspondiente diario pero como no lo tenés no las conoces (sí, cada canción y flor pertenece a un diario). Amor, sí, esto está hecho con IA y sé que te debo los diarios. Espero encontrar algún momento para hacer los diarios como corresponden porque sé que son especiales para vos pero por el momento no quiero dejarte sin algo, aunque esté hecho con IA esto tiene mi esencia que es lo importante.',
      highlightPhrase: 'Aunque esté hecho con IA esto tiene mi esencia que es lo importante.',
    },
  },
  {
    id: 'peonias',
    order: 2,
    monthNumber: 2,
    name: 'Peonías',
    scientificName: 'Paeonia suffruticosa',
    season: 'Verano',
    seasonBadge: 'Plenitud del Verano',
    seasonIcon: '🌸',
    seasonDescription: 'Abren sus capas exuberantes bajo la luz tibia del solsticio, colmando el aire de dulzura.',
    flowerMeaning: 'La peonía encarna la prosperidad del corazón, la timidez dulce que florece en confianza mutua y la nobleza de un afecto que se vuelve más pleno con cada nuevo día compartido.',
    image: peoniesImg,
    palette: {
      primary: '#ec4899',
      secondary: '#f472b6',
      accent: '#fbcfe8',
      bgGradient: 'from-pink-950/90 via-stone-900 to-rose-950/80',
      cardBg: 'bg-pink-950/40 backdrop-blur-xl',
      border: 'border-pink-500/20',
      glow: 'rgba(236, 72, 153, 0.25)',
      petalColor: 'rgba(244, 114, 182, 0.6)',
    },
    song: {
      title: 'Boku wa...',
      artist: 'Boku no Kokoro no Yabai Yatsu (Season 2 OP)',
      tagline: '«Cómo late mi corazón al verte...»',
      youtubeId: '1aaZbO7PgQw',
      youtubeUrl: 'https://www.youtube.com/watch?v=1aaZbO7PgQw',
      connectionNote: 'Ese sentimiento puro y sincero que floreció en nosotros, tímido al principio, pero imparable.',
    },
    diaryLetter: {
      chapter: 'Diario Mes 2 · 6 Meses y Cada Día',
      subtitle: 'Nuestro camino recorrido',
      text: '6 flores ¿Curioso, no? ¡Claro! Son 6 flores de los 6 meses que hemos afrontado juntos, muchos momentos románticos, muchas peleas pero sobre todo... Amándonos día tras día.',
      highlightPhrase: 'Son 6 flores de los 6 meses que hemos afrontado juntos...',
    },
  },
  {
    id: 'claveles',
    order: 3,
    monthNumber: 3,
    name: 'Claveles',
    scientificName: 'Dianthus caryophyllus',
    season: 'Otoño',
    seasonBadge: 'Resistencia Otoñal',
    seasonIcon: '🍂',
    seasonDescription: 'Florecen extendiéndose con valentía hasta el otoño, desafiando vientos y hojas caídas sin perder su fragancia.',
    flowerMeaning: 'El clavel simboliza la devoción inquebrantable, la admiración profunda y la lealtad que se sostiene firme aun cuando el entorno se torna frío y turbulento.',
    image: carnationsImg,
    palette: {
      primary: '#d97706',
      secondary: '#f59e0b',
      accent: '#fbbf24',
      bgGradient: 'from-amber-950/90 via-stone-900 to-orange-950/80',
      cardBg: 'bg-amber-950/40 backdrop-blur-xl',
      border: 'border-amber-500/20',
      glow: 'rgba(217, 119, 6, 0.25)',
      petalColor: 'rgba(245, 158, 11, 0.65)',
    },
    song: {
      title: 'Romeo (ロメオ)',
      artist: 'HoneyWorks feat. Kotaro & Ken',
      tagline: '«Lucharé por vos ante cualquier obstáculo...»',
      youtubeId: 'HLBYylAvz8Y',
      youtubeUrl: 'https://www.youtube.com/watch?v=HLBYylAvz8Y',
      connectionNote: 'Ese subliminal deseo de proteger siempre lo nuestro contra todo lo que se interponga.',
    },
    diaryLetter: {
      chapter: 'Diario Mes 3 · La Flor ante el Vendaval',
      subtitle: 'Nuestra fuerza invencible',
      text: 'Es increíble cómo podemos pelear muchas veces y aún así reponernos cual flor es atacada por un vendaval muy poderoso. Eso demuestra algo, que nuestro amor es único a su manera y resiliente ante cualquier adversidad que aparezca.',
      highlightPhrase: 'Cual flor es atacada por un vendaval muy poderoso... resiliente ante cualquier adversidad.',
    },
  },
  {
    id: 'iris',
    order: 4,
    monthNumber: 4,
    name: 'Iris (Flor)',
    scientificName: 'Iris unguicularis (Winter Iris)',
    season: 'Invierno',
    seasonBadge: 'Luz en Pleno Invierno',
    seasonIcon: '❄️',
    seasonDescription: 'Una flor extraordinaria que desafía la escarcha y el frío invernal, trayendo un destello de luz cuando todo reposa en silencio.',
    flowerMeaning: 'El iris de invierno es el emblema de la esperanza invulnerable, la elocuencia de las almas que se entienden sin palabras y la fe inamovible de que después de la noche más fría siempre sale el sol.',
    image: irisImg,
    palette: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#c084fc',
      bgGradient: 'from-indigo-950/95 via-slate-900 to-purple-950/85',
      cardBg: 'bg-indigo-950/40 backdrop-blur-xl',
      border: 'border-indigo-500/25',
      glow: 'rgba(124, 58, 237, 0.3)',
      petalColor: 'rgba(168, 85, 247, 0.6)',
    },
    song: {
      title: 'We Are Family',
      artist: 'Keke Palmer (Ice Age / Letra en Español)',
      tagline: '«Nuestra unión es para siempre...»',
      youtubeId: 'WJMQJSHjx8o',
      youtubeUrl: 'https://www.youtube.com/watch?v=WJMQJSHjx8o',
      connectionNote: 'Porque no somos solo pareja: somos un equipo, un hogar, una familia que se cuida.',
    },
    diaryLetter: {
      chapter: 'Diario Mes 4 · Mi Amor de la Vida',
      subtitle: 'La certeza de mi corazón',
      text: 'Sinceramente soy muy feliz a tu lado y puedo decirte que después de todo esto para mí, sos el amor de mi vida; no, no son vagas ilusiones, lo digo en serio, así como espero algún día poder cumplir lo del Stardew Valley.',
      highlightPhrase: 'Sos el amor de mi vida; no son vagas ilusiones, lo digo en serio.',
    },
    stardewNote: '«...así como espero algún día poder cumplir lo del Stardew Valley.» (El Anillo de Pedida / Wedding Ring 💍)',
  },
  {
    id: 'tulipanes',
    order: 5,
    monthNumber: 5,
    name: 'Tulipanes',
    scientificName: 'Tulipa gesneriana',
    season: 'Primavera',
    seasonBadge: 'Despertar de Primavera',
    seasonIcon: '🌷',
    seasonDescription: 'Emerge con los primeros rayos de la primavera, inundando el campo de color, alegría y juventud renovada.',
    flowerMeaning: 'El tulipán es el emblema del amor puro, apasionado y sincero. Representa el latido desbordado del pecho y el lazo sagrado e invisible que nunca se corta ni se desgasta con el tiempo.',
    image: tulipsImg,
    palette: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      accent: '#fda4af',
      bgGradient: 'from-emerald-950/90 via-stone-900 to-rose-950/80',
      cardBg: 'bg-rose-950/40 backdrop-blur-xl',
      border: 'border-rose-400/25',
      glow: 'rgba(251, 113, 133, 0.3)',
      petalColor: 'rgba(253, 164, 175, 0.65)',
    },
    song: {
      title: 'DAN DAN Kokoro Hikareteku',
      artist: 'Dragon Ball GT OP (Sub. Español)',
      tagline: '«Poco a poco, mi corazón se va enamorando más...»',
      youtubeId: 'eQgVcvQs7_E',
      youtubeUrl: 'https://www.youtube.com/watch?v=eQgVcvQs7_E',
      connectionNote: 'Un himno de cómo me tenés atrapado desde el primer segundo hasta el fin de los tiempos.',
    },
    diaryLetter: {
      chapter: 'Diario Mes 5 · El Lazo Rojo del Destino',
      subtitle: 'La unión de nuestras almas',
      text: 'Peleamos mucho pero aún así nos amamos como 2 enfermos que no pueden vivir el uno sin el otro. Algunos dirán dependencia emocional, yo lo llamo unión espiritual, amor verdadero, mi media naranja o el lazo rojo del destino que nos une por siempre.',
      highlightPhrase: 'Yo lo llamo unión espiritual, amor verdadero, mi media naranja o el lazo rojo del destino...',
    },
  },
  {
    id: 'lirio-del-valle',
    order: 6,
    monthNumber: 6,
    name: 'Lirio del Valle',
    scientificName: 'Convallaria majalis',
    season: 'Primavera',
    seasonBadge: 'La Flor Más Noble · Clímax Primaveral',
    seasonIcon: '✨',
    seasonDescription: 'Florece en mayo con delicadas campanas blancas y un perfume celestial, llamada tradicionalmente el retorno definitivo de la felicidad.',
    flowerMeaning: 'El lirio del valle simboliza la nobleza del alma, la pureza intacta de los sentimientos más profundos y la gracia de quien ilumina la vida de quien la rodea. Es la "Noble Flor" que florece con dignidad inquebrantable.',
    image: lilyValleyImg,
    palette: {
      primary: '#10b981',
      secondary: '#34d399',
      accent: '#fef08a',
      bgGradient: 'from-emerald-950/95 via-teal-950 to-amber-950/80',
      cardBg: 'bg-emerald-950/45 backdrop-blur-2xl',
      border: 'border-amber-400/35',
      glow: 'rgba(254, 240, 138, 0.35)',
      petalColor: 'rgba(254, 254, 254, 0.85)',
    },
    song: {
      title: 'Manazashi wa Hikari (Noble Flor)',
      artist: 'Kaoru Hana wa Rin to Saku OP (Sub. Español)',
      tagline: '«Porque para mí sos una noble flor, digna y resplandeciente...»',
      youtubeId: '6d6jjwMSxSo',
      youtubeUrl: 'https://www.youtube.com/watch?v=6d6jjwMSxSo',
      connectionNote: 'La canción de nuestra historia: donde la flor más hermosa y noble florece con dignidad, amada incondicionalmente.',
    },
    diaryLetter: {
      chapter: 'Diario Mes 6 · Para Mi Noble Flor, Andrea',
      subtitle: 'El remate de mi corazón',
      text: 'Te amo Andrea, de verdad lo digo, de corazón; da igual cuanto peleemos, quiero permanecer a tu lado por siempre y cada juramento que hice lo quiero seguir cumpliendo hasta que me muera como vengo haciendo hasta ahora.\n\nSos una persona fantástica y quiero que lo entiendas de una vez... Porque para mí, sos mí "noble flor" como esta canción.',
      highlightPhrase: 'Sos una persona fantástica y quiero que lo entiendas de una vez... Porque para mí, sos mí "noble flor" como esta canción.',
    },
    isGrandFinale: true,
  },
];

export const COMPLETE_LETTER = `Antes que nada... Verás canciones que van a su correspondiente diario pero como no lo tenés no las conoces (sí, cada canción y flor pertenece a un diario). Amor, sí, esto está hecho con IA y sé que te debo los diarios. Espero encontrar algún momento para hacer los diarios como corresponden porque sé que son especiales para vos pero por el momento no quiero dejarte sin algo, aunque esté hecho con IA esto tiene mi esencia que es lo importante.

6 flores ¿Curioso, no? ¡Claro! Son 6 flores de los 6 meses que hemos afrontado juntos, muchos momentos romanticos, muchas peleas pero sobre todo... Amandonos día tras día.

Es incréible como podemos pelear muchas veces y aún así reponernos cual flor es atacada por un vendaval muy poderoso. Eso demuestra algo, que nuestro amor es único a su manera y resiliente ante cualquier adversidad que aparezca.

Sinceramente soy muy feliz a tu lado y puedo decirte que después de todo esto para mí, sos el amor de mi vida; no, no son vagas ilusiones, lo digo en serio, así como espero algún día poder cumplir lo del Stardew Valley.

Peleamos mucho pero aún así nos amamos como 2 enfermos que no pueden vivir el uno sin el otro. Algunos dirán dependencia emocional, yo lo llamo unión espiritual, amor verdadero, mi media naranja o el lazo rojo del destino que nos une por siempre.

Te amo Andrea, de verdad lo digo, de corazón; da igual cuanto peleemos, quiero permanecer a tu lado por siempre y cada juramento que hice lo quiero seguir cumpliendo hasta que me muera como vengo haciendo hasta ahora.

Sos una persona fantástica y quiero que lo entiendas de una vez... Porque para mí, sos mí "noble flor" como esta canción.`;
