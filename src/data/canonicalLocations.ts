import { localImages } from '../assets/images';
import { SITE_OWNER_NAME } from '../config/site';
import { PhotoCredit } from '../types';

export interface CanonicalLocationMedia {
  id: string;
  name: string;
  heroImage: string;
  heroImageAlt: string;
  credit: PhotoCredit;
  gallery?: Array<{
    url: string;
    caption: string;
    alt: string;
    credit?: PhotoCredit;
  }>;
}

/**
 * Single source of truth for canonical location photography across the entire application.
 * Every section (Explore guide cards, gateway hub cards, map POIs, detail pages, and blog previews)
 * references this unified registry to guarantee absolute consistency and verified imagery.
 */
export const canonicalLocations: Record<string, CanonicalLocationMedia> = {
  // -------------------------------------------------------------
  // 1. Core Transylvania & Saxon Heritage
  // -------------------------------------------------------------
  brasov: {
    id: 'brasov',
    name: 'Brașov',
    heroImage: localImages.brasovBlackChurch,
    heroImageAlt: 'Council Square (Piața Sfatului) and the historic Black Church with Mount Tâmpa in Brașov',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    },
    gallery: [
      {
        url: localImages.brasovBlackChurch,
        caption: 'The Gothic Black Church rising over Council Square in Brașov.',
        alt: 'Black Church Brașov',
        credit: { type: 'owner', name: SITE_OWNER_NAME }
      }
    ]
  },

  'cluj-napoca': {
    id: 'cluj-napoca',
    name: 'Cluj-Napoca',
    heroImage: localImages.clujStMichael,
    heroImageAlt: 'St. Michael Gothic Church and Union Square (Piața Unirii) in central Cluj-Napoca',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    },
    gallery: [
      {
        url: localImages.clujStMichael,
        caption: 'Piața Unirii with the grand Gothic Saint Michael Church in Cluj-Napoca.',
        alt: 'Saint Michael Church Cluj',
        credit: { type: 'owner', name: SITE_OWNER_NAME }
      }
    ]
  },

  sibiu: {
    id: 'sibiu',
    name: 'Sibiu',
    heroImage: localImages.sibiuGrandSquare,
    heroImageAlt: 'The Grand Square (Piața Mare) and Council Tower in historic Sibiu',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    },
    gallery: [
      {
        url: localImages.sibiuGrandSquare,
        caption: 'Grand Square (Piața Mare) bordered by historic pastel merchant houses and Council Tower in Sibiu.',
        alt: 'Sibiu Grand Square',
        credit: { type: 'owner', name: SITE_OWNER_NAME }
      }
    ]
  },

  sighisoara: {
    id: 'sighisoara',
    name: 'Sighișoara',
    heroImage: localImages.sighisoara,
    heroImageAlt: 'UNESCO Citadel of Sighișoara with the 14th-century Clock Tower',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    },
    gallery: [
      {
        url: localImages.sighisoara,
        caption: 'The UNESCO-inscribed medieval hilltop citadel and Clock Tower of Sighișoara.',
        alt: 'Sighișoara Clock Tower',
        credit: { type: 'owner', name: SITE_OWNER_NAME }
      }
    ]
  },

  'salina-turda': {
    id: 'salina-turda',
    name: 'Turda Salt Mine & Gorge',
    heroImage: localImages.salinaTurda,
    heroImageAlt: 'Salina Turda subterranean illuminated salt cavern with underground lake and rowboats',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    },
    gallery: [
      {
        url: localImages.salinaTurda,
        caption: 'The cavernous Rudolf Mine chamber viewed from the high wooden balcony at Salina Turda.',
        alt: 'Salina Turda cavern',
        credit: { type: 'owner', name: SITE_OWNER_NAME }
      }
    ]
  },

  'targu-mures': {
    id: 'targu-mures',
    name: 'Târgu Mureș',
    heroImage: localImages.targuMuresFortress,
    heroImageAlt: 'Târgu Mureș Medieval Fortress ramparts, stone bastions, and the Gothic Reformed Citadel Church',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    },
    gallery: [
      {
        url: localImages.targuMuresFortress,
        caption: 'The 15th-century medieval citadel fortress ramparts and green park in Târgu Mureș.',
        alt: 'Târgu Mureș Citadel',
        credit: { type: 'owner', name: SITE_OWNER_NAME }
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Palatul_Culturii_din_T%C3%A2rgu_Mure%C8%99_01.jpg',
        caption: 'The Art Nouveau Palace of Culture in central Târgu Mureș.',
        alt: 'Palace of Culture Târgu Mureș',
        credit: { type: 'sourced', name: 'Wikimedia Commons', license: 'CC BY-SA 3.0' }
      }
    ]
  },

  'alba-iulia': {
    id: 'alba-iulia',
    name: 'Alba Iulia',
    heroImage: localImages.albaCarolina,
    heroImageAlt: 'Alba Carolina Vauban star fortress 3rd Gate with equestrian monument in Alba Iulia',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  'bran-castle': {
    id: 'bran-castle',
    name: 'Bran Castle',
    heroImage: localImages.branCastle,
    heroImageAlt: 'Bran Castle perched on a dramatic limestone precipice near Brașov',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  'peles-castle': {
    id: 'peles-castle',
    name: 'Peleș Castle & Sinaia',
    heroImage: localImages.pelesCastle,
    heroImageAlt: 'Peleș Castle Neo-Renaissance royal palace framed by Carpathian pine forests in Sinaia',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  'corvin-castle': {
    id: 'corvin-castle',
    name: 'Corvin Castle (Hunedoara)',
    heroImage: localImages.corvinCastle,
    heroImageAlt: 'Corvin Castle Gothic towers and wooden drawbridge over the Zlaști river in Hunedoara',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  transfagarasan: {
    id: 'transfagarasan',
    name: 'Transfăgărășan Mountain Road',
    heroImage: localImages.transfagarasan,
    heroImageAlt: 'Transfăgărășan highway winding hairpins through the Făgăraș alpine peaks to Lake Bâlea',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  viscri: {
    id: 'viscri',
    name: 'Viscri Fortified Church & Village',
    heroImage: localImages.viscriChurch,
    heroImageAlt: 'UNESCO 12th-century white fortified church and Saxon village of Viscri',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  biertan: {
    id: 'biertan',
    name: 'Biertan Fortified Church',
    heroImage: localImages.biertanChurch,
    heroImageAlt: 'UNESCO Biertan fortified church with triple defensive rings set amidst rolling Transylvanian hills',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  maramures: {
    id: 'maramures',
    name: 'Maramureș Wooden Churches & Villages',
    heroImage: localImages.maramuresChurch,
    heroImageAlt: 'Bârsana monastery and soaring oak wooden church belfry in Maramureș',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  bucovina: {
    id: 'bucovina',
    name: 'Bucovina Painted Monasteries',
    heroImage: localImages.bucovinaMonastery,
    heroImageAlt: 'Voroneț Monastery with world-famous Voroneț Blue exterior frescoes in Bucovina',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  'bucin-peak': {
    id: 'bucin-peak',
    name: 'Harghita & Bucin Pass',
    heroImage: localImages.bucinPeakWinter,
    heroImageAlt: 'Winter snow-laden spruce forests and alpine ridgelines of Bucin Pass in the Gurghiu Mountains',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  // -------------------------------------------------------------
  // 2. Gateway Cities & Regional Hubs (Verified Authenticity)
  // -------------------------------------------------------------
  timisoara: {
    id: 'timisoara',
    name: 'Timișoara',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Catedrala_Mitropolitana_Timisoara_%28interior%29.JPG/1280px-Catedrala_Mitropolitana_Timisoara_%28interior%29.JPG',
    heroImageAlt: 'Timișoara Metropolitan Orthodox Cathedral rising over Victory Square (Piața Victoriei)',
    credit: {
      type: 'sourced',
      name: 'Timișoara Heritage / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Catedrala_Mitropolitana_Timisoara_(interior).JPG',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Catedrala_Mitropolitana_Timisoara_%28interior%29.JPG/1280px-Catedrala_Mitropolitana_Timisoara_%28interior%29.JPG',
        caption: 'The Orthodox Metropolitan Cathedral in central Victory Square, Timișoara.',
        alt: 'Timișoara Orthodox Cathedral',
        credit: { type: 'sourced', name: 'Timișoara Heritage / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  oradea: {
    id: 'oradea',
    name: 'Oradea',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Palatul_Vulturul_Negru_Oradea.jpg/1280px-Palatul_Vulturul_Negru_Oradea.jpg',
    heroImageAlt: 'Black Eagle Palace (Palatul Vulturul Negru) Art Nouveau masterpiece in Union Square, Oradea',
    credit: {
      type: 'sourced',
      name: 'Dan Cristian Pădureț / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Palatul_Vulturul_Negru_Oradea.jpg',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Palatul_Vulturul_Negru_Oradea.jpg/1280px-Palatul_Vulturul_Negru_Oradea.jpg',
        caption: 'The iconic stained-glass Black Eagle Palace arcade in central Union Square, Oradea.',
        alt: 'Black Eagle Palace Oradea',
        credit: { type: 'sourced', name: 'Dan Cristian Pădureț / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  iasi: {
    id: 'iasi',
    name: 'Iași',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Palatul_Culturii_Iasi_-_Aerial.jpg/1280px-Palatul_Culturii_Iasi_-_Aerial.jpg',
    heroImageAlt: 'The grand Neo-Gothic Palace of Culture (Palatul Culturii) and landscaped gardens in Iași',
    credit: {
      type: 'sourced',
      name: 'Iași Heritage / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Palatul_Culturii_Iasi_-_Aerial.jpg',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Palatul_Culturii_Iasi_-_Aerial.jpg/1280px-Palatul_Culturii_Iasi_-_Aerial.jpg',
        caption: 'Palace of Culture in Iași, holding four national museums within its monumental Gothic Revival walls.',
        alt: 'Iași Palace of Culture',
        credit: { type: 'sourced', name: 'Iași Heritage / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  bucharest: {
    id: 'bucharest',
    name: 'Bucharest',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ateneul_Rom%C3%A2n_1.jpg/1280px-Ateneul_Rom%C3%A2n_1.jpg',
    heroImageAlt: 'The neoclassical Romanian Athenaeum (Ateneul Român) concert hall on Calea Victoriei in Bucharest',
    credit: {
      type: 'sourced',
      name: 'Andrei Stroe / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ateneul_Rom%C3%A2n_1.jpg',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Ateneul_Rom%C3%A2n_1.jpg/1280px-Ateneul_Rom%C3%A2n_1.jpg',
        caption: 'The Romanian Athenaeum, Bucharest’s most prestigious cultural hall on Calea Victoriei.',
        alt: 'Romanian Athenaeum Bucharest',
        credit: { type: 'sourced', name: 'Andrei Stroe / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  craiova: {
    id: 'craiova',
    name: 'Craiova',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Palatul_Jean_Mihail_Craiova_-_exterior.JPG/1280px-Palatul_Jean_Mihail_Craiova_-_exterior.JPG',
    heroImageAlt: 'Jean Mihail Palace (Craiova Art Museum) Late-Baroque architectural palace designed by architect Paul Gottereau',
    credit: {
      type: 'sourced',
      name: 'Alexandra Daniela Ilie / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Palatul_Jean_Mihail_Craiova_-_exterior.JPG',
      license: 'CC BY-SA 3.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Palatul_Jean_Mihail_Craiova_-_exterior.JPG/1280px-Palatul_Jean_Mihail_Craiova_-_exterior.JPG',
        caption: 'Jean Mihail Palace in central Craiova, home to the prestigious Art Museum and Brâncuși sculpture collection.',
        alt: 'Jean Mihail Palace Craiova',
        credit: { type: 'sourced', name: 'Alexandra Daniela Ilie / Wikimedia Commons', license: 'CC BY-SA 3.0' }
      }
    ]
  },

  suceava: {
    id: 'suceava',
    name: 'Suceava & Bucovina Gateway',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Suceava_fortress_%28by_Pudelek%29.jpg/1280px-Suceava_fortress_%28by_Pudelek%29.jpg',
    heroImageAlt: 'The medieval royal Seat Fortress of Suceava (Cetatea de Scaun a Sucevei) in Moldavia',
    credit: {
      type: 'sourced',
      name: 'Pudelek (Marcin Szala) / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Suceava_fortress_(by_Pudelek).jpg',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Suceava_fortress_%28by_Pudelek%29.jpg/1280px-Suceava_fortress_%28by_Pudelek%29.jpg',
        caption: 'Panoramic view of the medieval Seat Fortress of Suceava (Cetatea de Scaun a Sucevei).',
        alt: 'Seat Fortress of Suceava',
        credit: { type: 'sourced', name: 'Pudelek / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  bacau: {
    id: 'bacau',
    name: 'Bacău',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/RO_BC_Precista_church.jpg/1280px-RO_BC_Precista_church.jpg',
    heroImageAlt: 'Precista Church (Church of the Assumption) in Bacău, 15th-century royal court monument founded by Alexandru, son of Stephen the Great',
    credit: {
      type: 'sourced',
      name: 'Andrei Stroe / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:RO_BC_Precista_church.jpg',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/RO_BC_Precista_church.jpg/1280px-RO_BC_Precista_church.jpg',
        caption: 'The historic 1491 Precista Church and Princely Court ensemble in Bacău.',
        alt: 'Precista Church Bacău',
        credit: { type: 'sourced', name: 'Andrei Stroe / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  constanta: {
    id: 'constanta',
    name: 'Constanța',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cazinoul_din_Constanta_la_rasarit_HDR.jpg/1280px-Cazinoul_din_Constanta_la_rasarit_HDR.jpg',
    heroImageAlt: 'The historic Art Nouveau Casino (Cazinoul) on the Black Sea waterfront promenade in Constanța',
    credit: {
      type: 'sourced',
      name: 'Constanța Heritage / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cazinoul_din_Constanta_la_rasarit_HDR.jpg',
      license: 'CC BY-SA 4.0'
    }
  },

  'baia-mare': {
    id: 'baia-mare',
    name: 'Baia Mare',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Turnul_%C8%98tefan_din_Baia_Mare_08.jpg/1280px-Turnul_%C8%98tefan_din_Baia_Mare_08.jpg',
    heroImageAlt: 'Stephen’s Tower (Turnul Ștefan) 15th-century Gothic stone belfry in Baia Mare Old Town',
    credit: {
      type: 'sourced',
      name: 'Nenea hartia / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Turnul_%C8%98tefan_din_Baia_Mare_08.jpg',
      license: 'CC BY-SA 4.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Turnul_%C8%98tefan_din_Baia_Mare_08.jpg/1280px-Turnul_%C8%98tefan_din_Baia_Mare_08.jpg',
        caption: 'Stephen’s Tower (Turnul Ștefan), the iconic 15th-century Gothic tower in Baia Mare.',
        alt: 'Turnul Ștefan Baia Mare',
        credit: { type: 'sourced', name: 'Nenea hartia / Wikimedia Commons', license: 'CC BY-SA 4.0' }
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. Iconic Romanian Natural Wonders & Special Landmarks
  // -------------------------------------------------------------
  'cazanele-dunarii': {
    id: 'cazanele-dunarii',
    name: 'Cazanele Dunării & Chipul lui Decebal',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Rock_Sculpture_of_Decebalus_%2826845769043%29.jpg',
    heroImageAlt: 'The colossal rock carving of Dacian King Decebalus on the sheer limestone cliffs over the Danube Gorge (Cazanele Dunării)',
    credit: {
      type: 'sourced',
      name: 'Danube Gorges National Park / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rock_Sculpture_of_Decebalus_(26845769043).jpg',
      license: 'CC BY 2.0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Rock_Sculpture_of_Decebalus_%2826845769043%29.jpg',
        caption: 'The 43-metre high rock sculpture of King Decebalus carved directly into the Carpathian cliffs above the Danube river.',
        alt: 'Decebal Rock Carving on the Danube',
        credit: { type: 'sourced', name: 'Danube Gorges National Park / Wikimedia Commons', license: 'CC BY 2.0' }
      }
    ]
  },

  'danube-delta': {
    id: 'danube-delta',
    name: 'Danube Delta Biosphere Reserve',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Danube_Delta_ESA23450088.jpeg/1280px-Danube_Delta_ESA23450088.jpeg',
    heroImageAlt: 'Danube Delta UNESCO Biosphere Reserve waterways, dense reed channels, water lilies, and traditional wooden rowboats',
    credit: {
      type: 'sourced',
      name: 'European Space Agency / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Danube_Delta_ESA23450088.jpeg',
      license: 'CC BY-SA 3.0 IGO'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Danube_Delta_ESA23450088.jpeg/1280px-Danube_Delta_ESA23450088.jpeg',
        caption: 'Narrow reed canals and wild water channels in the UNESCO Danube Delta Biosphere Reserve.',
        alt: 'Danube Delta water channels',
        credit: { type: 'sourced', name: 'European Space Agency / Wikimedia Commons', license: 'CC BY-SA 3.0 IGO' }
      }
    ]
  },

  'praid-salt-mine': {
    id: 'praid-salt-mine',
    name: 'Praid Salt Mine (Salina Praid)',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Salina_Praid_02.jpg',
    heroImageAlt: 'Subterranean illuminated cavern and playground 120 metres deep inside Praid Salt Mine (Salina Praid)',
    credit: {
      type: 'sourced',
      name: 'E.Coman / Wikimedia Commons',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Salina_Praid_02.jpg',
      license: 'CC0'
    },
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Salina_Praid_02.jpg',
        caption: 'The vast subterranean halls of Salina Praid featuring underground playgrounds, cafe, and halotherapy facilities.',
        alt: 'Salina Praid interior',
        credit: { type: 'sourced', name: 'E.Coman / Wikimedia Commons', license: 'CC0' }
      }
    ]
  },

  bran: {
    id: 'bran',
    name: 'Bran & Rucăr-Bran Pass',
    heroImage: localImages.branCastle,
    heroImageAlt: 'Bran Castle dramatic clifftop fortress keep with timber-framed balconies and turrets',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  },

  sinaia: {
    id: 'sinaia',
    name: 'Sinaia & Peleș Castle',
    heroImage: localImages.pelesCastle,
    heroImageAlt: 'Peleș Castle German Neo-Renaissance royal palace with clock tower and mountain spires',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  }
};

/**
 * Retrieve canonical media for a location by its ID or slug with robust fallback
 */
export function getCanonicalLocationMedia(locationId: string): CanonicalLocationMedia {
  const normalized = locationId?.toLowerCase().trim();
  if (normalized && canonicalLocations[normalized]) {
    return canonicalLocations[normalized];
  }

  // Common aliases and POI ID resolutions
  if (normalized === 'bran' || normalized?.startsWith('poi-bran')) {
    return canonicalLocations['bran-castle'];
  }
  if (normalized === 'sinaia' || normalized?.startsWith('poi-peles') || normalized?.startsWith('poi-pelisor')) {
    return canonicalLocations['peles-castle'];
  }
  if (normalized === 'cazanele-dunarii-decebal' || normalized === 'decebal' || normalized === 'danube-gorge' || normalized?.startsWith('poi-decebal') || normalized?.startsWith('poi-cazanele') || normalized?.startsWith('poi-mraconia') || normalized?.startsWith('poi-ciucaru') || normalized?.startsWith('poi-ponicova')) {
    return canonicalLocations['cazanele-dunarii'];
  }
  if (normalized === 'salina-praid' || normalized === 'praid' || normalized?.startsWith('poi-salina-praid') || normalized?.startsWith('poi-praid')) {
    return canonicalLocations['praid-salt-mine'];
  }
  if (normalized === 'turda' || normalized === 'salina_turda' || normalized?.startsWith('poi-salina-turda') || normalized?.startsWith('poi-cheile-turzii')) {
    return canonicalLocations['salina-turda'];
  }
  if (normalized === 'maramures-villages' || normalized?.startsWith('poi-merry-cemetery') || normalized?.startsWith('poi-barsana')) {
    return canonicalLocations['maramures'];
  }
  if (normalized === 'bucovina-monasteries' || normalized?.startsWith('poi-voronet') || normalized?.startsWith('poi-sucevita')) {
    return canonicalLocations['bucovina'];
  }
  if (normalized?.startsWith('poi-black-church') || normalized?.startsWith('poi-council-square') || normalized?.startsWith('poi-mount-tampa') || normalized?.startsWith('poi-rope-street')) {
    return canonicalLocations['brasov'];
  }
  if (normalized?.startsWith('poi-clock-tower') || normalized?.startsWith('poi-covered-staircase') || normalized?.startsWith('poi-church-on-the-hill') || normalized?.startsWith('poi-citadel-square') || normalized?.startsWith('poi-tinsmiths') || normalized?.startsWith('poi-tailors')) {
    return canonicalLocations['sighisoara'];
  }
  if (normalized?.startsWith('poi-grand-square') || normalized?.startsWith('poi-bridge-of-lies') || normalized?.startsWith('poi-brukenthal')) {
    return canonicalLocations['sibiu'];
  }
  if (normalized?.startsWith('poi-st-michael') || normalized?.startsWith('poi-cluj-botanical')) {
    return canonicalLocations['cluj-napoca'];
  }
  if (normalized?.startsWith('poi-alba-carolina') || normalized?.startsWith('poi-coronation-cathedral')) {
    return canonicalLocations['alba-iulia'];
  }
  if (normalized?.startsWith('poi-corvin')) {
    return canonicalLocations['corvin-castle'];
  }
  if (normalized?.startsWith('poi-balea') || normalized?.startsWith('poi-vidraru')) {
    return canonicalLocations['transfagarasan'];
  }
  if (normalized?.startsWith('poi-viscri')) {
    return canonicalLocations['viscri'];
  }
  if (normalized?.startsWith('poi-biertan')) {
    return canonicalLocations['biertan'];
  }
  if (normalized?.startsWith('poi-letea') || normalized?.startsWith('poi-pelican') || normalized?.startsWith('poi-sulina') || normalized?.startsWith('poi-mila-23')) {
    return canonicalLocations['danube-delta'];
  }
  if (normalized?.startsWith('poi-timisoara') || normalized?.startsWith('poi-piata-unirii-timisoara') || normalized?.startsWith('poi-piata-victoriei-timisoara')) {
    return canonicalLocations['timisoara'];
  }
  if (normalized?.startsWith('poi-palace-of-culture-tgm') || normalized?.startsWith('poi-medieval-fortress-tgm') || normalized?.startsWith('poi-teleki-library')) {
    return canonicalLocations['targu-mures'];
  }
  if (normalized?.startsWith('poi-black-eagle') || normalized?.startsWith('poi-oradea-fortress') || normalized?.startsWith('poi-baile-felix')) {
    return canonicalLocations['oradea'];
  }
  if (normalized?.startsWith('poi-palace-of-parliament') || normalized?.startsWith('poi-romanian-athenaeum') || normalized?.startsWith('poi-stavropoleos') || normalized?.startsWith('poi-village-museum')) {
    return canonicalLocations['bucharest'];
  }
  if (normalized?.startsWith('poi-palace-of-culture-iasi') || normalized?.startsWith('poi-trei-ierarhi')) {
    return canonicalLocations['iasi'];
  }

  // Safe default fallback
  return {
    id: locationId || 'romania',
    name: locationId || 'Romania Destination',
    heroImage: localImages.bucinPeakWinter,
    heroImageAlt: 'Scenic landscape in Romania',
    credit: {
      type: 'owner',
      name: SITE_OWNER_NAME
    }
  };
}
