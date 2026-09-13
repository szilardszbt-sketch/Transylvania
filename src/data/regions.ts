import { Region } from '../types';
import { localImages } from '../assets/images';

export const regions: Region[] = [
  {
    id: 'transylvania',
    name: 'Transylvania',
    romanianName: 'Transilvania / Ardeal',
    slug: 'transylvania',
    tagline: 'The historic highland basin ringed by the Carpathian Mountains',
    description: 'A land of rolling hills, ancient oak forests, and fortified medieval citadels settled by Saxons, Hungarians, and Romanians over a millennium. Transylvania is the cultural and geographical heart of Romania.',
    heroImage: localImages.sighisoara,
    status: 'active',
    character: 'Fortified churches, Saxon villages, alpine massifs, and vibrant university cities.'
  },
  {
    id: 'banat',
    name: 'Banat & Danube Gorges',
    romanianName: 'Banat & Cazanele Dunării',
    slug: 'banat',
    tagline: 'Cosmopolitan Central European elegance, Habsburg heritage, and the dramatic Danube Gorges',
    description: 'Centred around Timișoara—the 2023 European Capital of Culture—and extending south to the monumental Iron Gates and Decebalus rock sculpture on the Danube.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Rock_Sculpture_of_Decebalus_%2826845769043%29.jpg',
    status: 'active',
    character: 'Art Nouveau plazas, leafy canal walks, Habsburg coffeehouses, and the colossal Danube limestone canyons.'
  },
  {
    id: 'crisana',
    name: 'Crișana & Western Gate',
    romanianName: 'Crișana',
    slug: 'crisana',
    tagline: 'Secessionist architectural gems, healing thermal springs, and Apuseni Karst caves',
    description: 'Bordering Hungary, Crișana is anchored by Oradea—Romania’s Art Nouveau capital—and the mineral-rich thermal spa waters of Băile Felix and Western Apuseni peaks.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Palatul_Vulturul_Negru_Oradea.jpg/1280px-Palatul_Vulturul_Negru_Oradea.jpg',
    status: 'active',
    character: 'Secessionist palaces, thermal bath resorts, medieval star citadels, and Karst gorge approaches.'
  },
  {
    id: 'dobrogea',
    name: 'Dobrogea & Danube Delta',
    romanianName: 'Dobrogea & Delta Dunării',
    slug: 'dobrogea',
    tagline: 'The UNESCO Danube Delta Biosphere Reserve and Black Sea coastline',
    description: 'A vast natural biosphere where the Danube River branches into thousands of bird-filled waterways, wild pelican sanctuaries, and ancient oak forests before reaching the Black Sea port of Constanța.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cazinoul_din_Constanta_la_rasarit_HDR.jpg/1280px-Cazinoul_din_Constanta_la_rasarit_HDR.jpg',
    status: 'active',
    character: 'Waterways, wild pelican colonies, reed labyrinths, Letea wild horses, and seaside heritage.'
  },
  {
    id: 'wallachia',
    name: 'Wallachia & Southern Romania',
    romanianName: 'Muntenia & Oltenia',
    slug: 'wallachia',
    tagline: 'The historic southern principality, royal mountain castles, and capital gateway',
    description: 'Home to the national capital Bucharest, the royal summer palace of Peleș in Sinaia, the southern approaches to the Transfăgărășan, and the Oltenian gateway to the Danube.',
    heroImage: localImages.pelesCastle,
    status: 'active',
    character: 'Neo-Romanian architecture, royal mountain estates, bustling urban hubs, and Oltenian monasteries.'
  },
  {
    id: 'moldavia',
    name: 'Moldavia',
    romanianName: 'Moldova',
    slug: 'moldavia',
    tagline: 'Historic princely capitals, grand neo-Gothic palaces, and university culture',
    description: 'The eastern cultural heartland anchored by Iași, filled with neo-Gothic palaces, historic universities, and some of Eastern Europe’s oldest wine regions.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Palatul_Culturii_Iasi_-_Aerial.jpg/1280px-Palatul_Culturii_Iasi_-_Aerial.jpg',
    status: 'active',
    character: 'Palaces, ancient princely seats, rolling vineyards, and university culture.'
  },
  {
    id: 'maramures',
    name: 'Maramureș',
    romanianName: 'Maramureș',
    slug: 'maramures',
    tagline: 'Living wooden architecture and untouched rural pastoral traditions',
    description: 'Tucked into Romania’s northern border, Maramureș is celebrated for its towering Gothic-influenced wooden churches, hand-carved oak gates, and timeless village rhythms.',
    heroImage: localImages.maramuresChurch,
    status: 'active',
    character: 'Tall wooden belfries, traditional wool crafts, and deep mountain valleys.'
  },
  {
    id: 'bucovina',
    name: 'Bucovina',
    romanianName: 'Bucovina',
    slug: 'bucovina',
    tagline: 'World-famous 15th-century exterior frescoed monasteries',
    description: 'A tranquil northern region famed for its UNESCO-listed painted monasteries including Voroneț, Moldovița, and Sucevița, where brilliant Byzantine murals have weathered centuries outdoors.',
    heroImage: localImages.bucovinaMonastery,
    status: 'active',
    character: 'Painted monastery walls, rolling fir hills, and quiet monastic retreats.'
  }
];
