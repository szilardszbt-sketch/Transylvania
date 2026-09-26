import { GatewayCity } from '../types';
import { getCanonicalLocationMedia } from './canonicalLocations';

export const rawGatewayCities: Omit<GatewayCity, 'heroImage' | 'heroImageAlt' | 'heroImageCredit'>[] = [
  {
    id: 'cluj-napoca',
    name: 'Cluj-Napoca',
    slug: 'cluj-napoca',
    regionId: 'transylvania',
    description: 'The vibrant capital of Transylvania, renowned for its lively university atmosphere, thriving cafe culture, Gothic St. Michael’s Church, and high-frequency international airport connections across Europe.',
    hasAirport: true,
    airportName: 'Avram Iancu Cluj International Airport',
    airportCode: 'CLJ',
    airlines: ['Wizz Air', 'Ryanair', 'Lufthansa', 'Tarom', 'Swiss', 'Turkish Airlines', 'HiSky'],
    internationalDestinations: ['London', 'Munich', 'Frankfurt', 'Paris', 'Milan', 'Rome', 'Barcelona', 'Madrid', 'Zurich', 'Istanbul', 'Vienna', 'Dublin'],
    connectedAttractions: ['Salina Turda', 'Cheile Turzii', 'Rimetea', 'Maramureș Wooden Churches', 'Apuseni Mountains'],
    itineraryRole: 'Northern & Central Transylvania Primary Hub',
    coordinates: { lat: 46.7852, lng: 23.6862 },
    transportHighlights: [
      'Over 45 direct European international routes across budget and legacy carriers',
      'Direct rail links to Sighișoara, Oradea, Brașov, and Bucharest',
      'Gateway to Northern Transylvania, the Apuseni Karst, and Turda Salt Mine (35 min drive)'
    ],
    distanceToCore: 'Central & Northern Transylvania Hub'
  },
  {
    id: 'timisoara',
    name: 'Timișoara',
    slug: 'timisoara',
    regionId: 'banat',
    description: 'The "Little Vienna" of Eastern Europe and 2023 European Capital of Culture. Known for its Secessionist plazas, the 1989 Revolution square, and as the western gateway to Banat and the monumental Danube Gorges (Cazanele Dunării).',
    hasAirport: true,
    airportName: 'Traian Vuia Timișoara International Airport',
    airportCode: 'TSR',
    airlines: ['Wizz Air', 'Lufthansa', 'Tarom', 'HiSky', 'Eurowings'],
    internationalDestinations: ['Munich', 'Frankfurt', 'London Luton', 'Milan Bergamo', 'Rome Fiumicino', 'Paris Beauvais', 'Madrid', 'Barcelona', 'Valencia', 'Dortmund', 'Baden-Baden', 'Memmingen'],
    connectedAttractions: ['Cazanele Dunării & Chipul lui Decebal', 'Băile Herculane', 'Bigăr & Cheile Nerei', 'Semenic Mountains', 'Hunedoara Corvin Castle'],
    itineraryRole: 'Western Romania & Danube Gorges Hub',
    coordinates: { lat: 45.8099, lng: 21.3379 },
    transportHighlights: [
      'Direct international flights from Germany, UK, Italy, Spain, and France',
      'A1 Motorway connection straight to the Hungarian border (Nadlac) and Western Europe',
      'Prime gateway to the Iron Gates & Danube River Canyons (2.5h drive south via Orșova)'
    ],
    distanceToCore: 'Banat & Danube Gorges Western Gateway'
  },
  {
    id: 'targu-mures',
    name: 'Târgu Mureș',
    slug: 'targu-mures',
    regionId: 'transylvania',
    description: 'The cultural capital of Szeklerland and Mureș County, famous for its magnificent Art Nouveau Palace of Culture with the Stained Glass Mirror Hall, medieval fortress, and central position just 50 minutes from Sighișoara.',
    hasAirport: true,
    airportName: 'Transylvania Târgu Mureș Airport',
    airportCode: 'TGM',
    airlines: ['Wizz Air', 'Tarom'],
    internationalDestinations: ['London Luton', 'Budapest', 'Dortmund', 'Memmingen / Munich West', 'Rome'],
    connectedAttractions: ['Sighișoara Citadel', 'Sovata Bear Lake', 'Biertan Fortified Church', 'Praid Salt Mine', 'Saschiz Tower'],
    itineraryRole: 'Heart of Transylvania & Szeklerland Hub',
    coordinates: { lat: 46.4678, lng: 24.4214 },
    transportHighlights: [
      'Closest international airport to UNESCO Sighișoara (55 km / 50 min drive)',
      'Direct budget flights linking the UK, Germany, and Hungary to central Transylvania',
      'Central launchpad for the Salt Country (Sovata & Praid) and Saxon fortified villages'
    ],
    distanceToCore: '50 min to Sighișoara & Szeklerland'
  },
  {
    id: 'oradea',
    name: 'Oradea',
    slug: 'oradea',
    regionId: 'crisana',
    description: 'Romania’s Art Nouveau and Secessionist masterpiece city on the Crișul Repede river. Celebrated for the Black Eagle Palace, pentagonal fortress, and the therapeutic geothermal lotus springs of Băile Felix.',
    hasAirport: true,
    airportName: 'Oradea International Airport',
    airportCode: 'OMR',
    airlines: ['LOT Polish Airlines', 'HiSky', 'Wizz Air', 'Tarom'],
    internationalDestinations: ['Warsaw Chopin (global hub)', 'London Stansted', 'Memmingen', 'Bucharest Otopeni'],
    connectedAttractions: ['Băile Felix Thermal Spas', 'Oradea Fortress', 'Apuseni Natural Park & Bear Cave', 'Padiș Karst Plateau'],
    itineraryRole: 'North-Western Gateway & Thermal Wellness Hub',
    coordinates: { lat: 47.0253, lng: 21.9025 },
    transportHighlights: [
      'Star alliance global connectivity via LOT Polish Airlines hub at Warsaw',
      'Located 10 km from the Hungarian border with direct motorway and rail transit',
      'Just 8 km from Băile Felix thermal waters and prime route into Western Apuseni caves'
    ],
    distanceToCore: 'Crișana & Western Apuseni Gateway'
  },
  {
    id: 'sibiu',
    name: 'Sibiu',
    slug: 'sibiu',
    regionId: 'transylvania',
    description: 'An impeccably preserved Saxon jewel featuring the iconic "houses with eyes," the historic Grand Square, Brukenthal Palace Museum, and easy access to the Transfăgărășan mountain highway and Mărginimea Sibiului.',
    hasAirport: true,
    airportName: 'Sibiu International Airport',
    airportCode: 'SBZ',
    airlines: ['Lufthansa', 'Austrian Airlines', 'Wizz Air', 'Tarom'],
    internationalDestinations: ['Munich', 'Vienna', 'London Luton', 'Memmingen', 'Dortmund', 'Karlsruhe / Baden-Baden', 'Nuremberg'],
    connectedAttractions: ['Transfăgărășan Alpine Road', 'Biertan', 'Sighișoara', 'Astra Folk Museum', 'Cisnădie & Cisnădioara'],
    itineraryRole: 'Southern Transylvania & Saxon Heartland Hub',
    coordinates: { lat: 45.7892, lng: 24.0913 },
    transportHighlights: [
      'Direct flights from Germany, Austria, and UK with Lufthansa and Austrian Airlines',
      'Motorway A1 connection linking directly to Central and Western Europe',
      'Central position: 1h 30m drive to Sighișoara, 2h to Brașov, 45m to Transfăgărășan'
    ],
    distanceToCore: 'Southern Transylvania Hub'
  },
  {
    id: 'brasov',
    name: 'Brașov',
    slug: 'brasov',
    regionId: 'transylvania',
    description: 'Surrounded on three sides by the forested slopes of the Southern Carpathians, Brașov is the prime hub for visiting Bran Castle, Peleș Palace, Viscri, Râșnov Fortress, and the Piatra Craiului National Park.',
    hasAirport: true,
    airportName: 'Brașov-Ghimbav International Airport',
    airportCode: 'GHV',
    airlines: ['Wizz Air', 'Fly Lili'],
    internationalDestinations: ['London Luton', 'Dortmund', 'Budapest', 'Nuremberg', 'Munich', 'Stuttgart', 'Rome', 'Madrid', 'Barcelona'],
    connectedAttractions: ['Bran Castle ("Dracula’s Castle")', 'Peleș Palace Sinaia', 'Viscri UNESCO Village', 'Râșnov Fortress', 'Piatra Craiului Alps'],
    itineraryRole: 'Carpathian & Royal Castles Hub',
    coordinates: { lat: 45.7033, lng: 25.5292 },
    transportHighlights: [
      'Modern international airport (opened 2023) expanding direct European flights',
      'Major national railway junction connecting Bucharest (2h 15m) and Central Transylvania',
      'Prime base for Bran Castle (35m), Peleș Castle (45m), and Viscri (1h 15m)'
    ],
    distanceToCore: 'Southern Transylvania & Carpathian Gate'
  },
  {
    id: 'bucharest',
    name: 'Bucharest',
    slug: 'bucharest',
    regionId: 'wallachia',
    description: 'Romania’s national capital and largest transit gateway. Essential for travellers starting wide-ranging Romanian itineraries, offering high-frequency express trains directly into Transylvania through the Prahova Valley.',
    hasAirport: true,
    airportName: 'Henri Coandă International Airport (Otopeni)',
    airportCode: 'OTP',
    airlines: ['Air France', 'British Airways', 'KLM', 'Lufthansa', 'Qatar Airways', 'Turkish Airlines', 'Tarom', 'Wizz Air', 'Ryanair', 'Austrian', 'SWISS', 'HiSky'],
    internationalDestinations: ['London', 'Paris', 'Frankfurt', 'Amsterdam', 'Dubai', 'Doha', 'Istanbul', 'New York (seasonal/codeshare)', 'Rome', 'Madrid', 'Vienna', 'Over 100 Global Cities'],
    connectedAttractions: ['Palace of the Parliament', 'Old Town Lipscani', 'Peleș Castle (1.5h train)', 'Transfăgărășan South', 'Danube Delta (3.5h drive)'],
    itineraryRole: 'Romania Primary National & Global Gateway',
    coordinates: { lat: 44.5711, lng: 26.0858 },
    transportHighlights: [
      'Main national hub with worldwide flight connections from all major global airline alliances',
      'Non-stop 20-minute airport train to Bucharest North Station (Gara de Nord)',
      'Frequent express trains direct to Brașov (2h 15m), Sibiu, and Constanța'
    ],
    distanceToCore: 'National Capital & Global Arrival Point'
  },
  {
    id: 'constanta',
    name: 'Constanța',
    slug: 'constanta',
    regionId: 'dobrogea',
    description: 'Ancient Black Sea port city and primary coastal arrival hub. The official gateway for exploring the UNESCO Danube Delta biosphere reserve, Sulina river mouth, Letea wild forest, and Black Sea beaches.',
    hasAirport: true,
    airportName: 'Mihail Kogălniceanu International Airport',
    airportCode: 'CND',
    airlines: ['Turkish Airlines', 'Wizz Air', 'Tarom'],
    internationalDestinations: ['Istanbul (global Turkish Airlines hub)', 'London Luton', 'Rome'],
    connectedAttractions: ['Danube Delta UNESCO Biosphere', 'Letea Subtropical Forest & Wild Horses', 'Sulina Port & Beach', 'Constanța Art Nouveau Casino', 'Histria Ancient Greek Fortress'],
    itineraryRole: 'Danube Delta & Black Sea Coast Gateway',
    coordinates: { lat: 44.3622, lng: 28.4883 },
    transportHighlights: [
      'Turkish Airlines direct hub connection via Istanbul with global transfers',
      'Fast 1h 30m drive north to Tulcea (the departure port for Danube Delta river boats)',
      'A2 Sun Motorway direct from Bucharest (2 hours)'
    ],
    distanceToCore: '1h 30m to Danube Delta / Tulcea'
  },
  {
    id: 'craiova',
    name: 'Craiova',
    slug: 'craiova',
    regionId: 'wallachia',
    description: 'The historic capital of Oltenia with a splendid Art Museum in Jean Mihail Palace, Nicolae Romanescu Park, and direct southern access to the Danube Gorges (Cazanele Dunării) and Constantin Brâncuși’s monumental sculptures in Târgu Jiu.',
    hasAirport: true,
    airportName: 'Craiova International Airport',
    airportCode: 'CRA',
    airlines: ['Wizz Air'],
    internationalDestinations: ['London Luton', 'Milan Bergamo', 'Bologna', 'Rome', 'Madrid', 'Barcelona', 'Brussels Charleroi', 'Paris Beauvais', 'Dortmund', 'Cologne'],
    connectedAttractions: ['Cazanele Dunării & Chipul lui Decebal (2h drive)', 'Târgu Jiu Brâncuși Ensemble', 'Tismana Monastery', 'Romanescu Park'],
    itineraryRole: 'South-Western Gateway & Danube Approach',
    coordinates: { lat: 44.3181, lng: 23.8886 },
    transportHighlights: [
      'Comprehensive low-cost flight routes linking the UK, Italy, Spain, and Germany',
      'Direct highway and railway access to Orșova & the Danube Boilers (Cazanele)',
      'Launchpad for cultural trips to Brâncuși’s Endless Column in Târgu Jiu'
    ],
    distanceToCore: '2h drive to Danube Gorges / Cazanele'
  },
  {
    id: 'iasi',
    name: 'Iași',
    slug: 'iasi',
    regionId: 'moldavia',
    description: 'The cultural and academic capital of Moldavia, renowned for the Neo-Gothic Palace of Culture, Saint Parascheva Metropolitan Cathedral, centuries-old universities, and Moldavian wine routes.',
    hasAirport: true,
    airportName: 'Iași International Airport',
    airportCode: 'IAS',
    airlines: ['Wizz Air', 'Ryanair', 'Austrian Airlines', 'Tarom', 'HiSky'],
    internationalDestinations: ['Vienna', 'London Luton', 'Rome', 'Paris Beauvais', 'Milan', 'Berlin', 'Brussels', 'Madrid', 'Barcelona', 'Dublin', 'Eindhoven', 'Tel Aviv'],
    connectedAttractions: ['Palace of Culture Iași', 'Cotnari & Iași Vineyards', 'Bucovina Monasteries (2.5h drive)', 'Neamț Fortress & Monasteries'],
    itineraryRole: 'Eastern Romania & Moldavia Gateway',
    coordinates: { lat: 47.1785, lng: 27.6206 },
    transportHighlights: [
      'Second-busiest regional airport in Romania with over 25 international routes',
      'Modern new Terminal T4 opened in 2024 with world-class facilities',
      'Gateway to Eastern Romania, the Moldavian wine country, and Bucovina'
    ],
    distanceToCore: 'Moldavia & Eastern Romania Gateway'
  },
  {
    id: 'suceava',
    name: 'Suceava',
    slug: 'suceava',
    regionId: 'bucovina',
    description: 'The ancient princely fortress seat of Moldavian rulers and direct arrival hub for the UNESCO Painted Monasteries of Bucovina (Voroneț, Humor, Moldovița, Sucevița, Arbore).',
    hasAirport: true,
    airportName: 'Ștefan cel Mare Suceava International Airport',
    airportCode: 'SCV',
    airlines: ['Wizz Air', 'Tarom'],
    internationalDestinations: ['London Luton', 'Milan Bergamo', 'Rome Fiumicino', 'Memmingen / Munich West', 'Dortmund'],
    connectedAttractions: ['Voroneț Monastery', 'Sucevița Fortified Monastery', 'Suceava Princely Fortress', 'Marginea Black Pottery', 'Moldovița Steam Train (Mocănița)'],
    itineraryRole: 'Bucovina Painted Monasteries Gateway',
    coordinates: { lat: 47.6875, lng: 26.3542 },
    transportHighlights: [
      'Direct European flights placing travellers right at the foot of the Painted Monasteries',
      'Just 35 minutes drive to Voroneț and Humor monasteries',
      'Scenic mountain road connections across the Tihuța Pass directly into Transylvania'
    ],
    distanceToCore: '35 min to UNESCO Painted Monasteries'
  },
  {
    id: 'baia-mare',
    name: 'Baia Mare',
    slug: 'baia-mare',
    regionId: 'maramures',
    description: 'The gateway city to the magical land of Maramureș. Base for visiting the Merry Cemetery in Săpânța, monumental UNESCO wooden churches, and the steam train in Vaser Valley.',
    hasAirport: true,
    airportName: 'Maramureș Baia Mare Airport',
    airportCode: 'BAY',
    airlines: ['Tarom', 'HiSky'],
    internationalDestinations: ['Bucharest (Otopeni transfer connection)', 'Paris (seasonal charters)', 'Antalya (seasonal)'],
    connectedAttractions: ['Merry Cemetery Săpânța', 'Bârsana Wooden Monastery', 'Surdești & Plopiș Wooden Churches', 'Mocănița Vaser Valley Steam Train', 'Gutâi Mountains'],
    itineraryRole: 'Maramureș & Wooden Churches Gateway',
    coordinates: { lat: 47.6583, lng: 23.4700 },
    transportHighlights: [
      'Direct connections into the traditional northern heartland of Maramureș',
      'Short 20-minute drive to the UNESCO wooden churches of Surdești and Plopiș',
      '1h 15m scenic mountain pass drive to Sighetu Marmației and Săpânța'
    ],
    distanceToCore: 'Gateway to Maramureș Wooden Churches'
  },
  {
    id: 'bacau',
    name: 'Bacău',
    slug: 'bacau',
    regionId: 'moldavia',
    description: 'Central Moldavian transport crossroads on the Siret River, offering international flights for travellers visiting central Moldavia, the Trotuș Valley, and the eastern slopes of the Carpathian arc.',
    hasAirport: true,
    airportName: 'George Enescu Bacău International Airport',
    airportCode: 'BCM',
    airlines: ['Wizz Air', 'Dan Air'],
    internationalDestinations: ['London Luton', 'Rome Fiumicino', 'Milan Bergamo', 'Dublin', 'Brussels Charleroi', 'Madrid', 'Barcelona', 'Bologna'],
    connectedAttractions: ['Slănic Moldova Mineral Springs', 'Trotuș Valley & Ghimeș Pass', 'Bacău Astronomical Observatory'],
    itineraryRole: 'Central Moldavia & Carpathian Foothills Hub',
    coordinates: { lat: 46.5219, lng: 26.9103 },
    transportHighlights: [
      'Convenient low-cost air hub connecting Central Moldavia directly with Western Europe',
      'Mainline railway junction linking Bucharest, Suceava, and Iași',
      'Direct road passes westward across the Carpathians into Harghita & Transylvania'
    ],
    distanceToCore: 'Central Moldavia Transit Hub'
  }
];

/**
 * Unified gateway cities with canonical photography and verified photo credits
 */
export const gatewayCities: GatewayCity[] = rawGatewayCities.map((city) => {
  const media = getCanonicalLocationMedia(city.id);
  return {
    ...city,
    heroImage: media.heroImage,
    heroImageAlt: media.heroImageAlt || `${city.name} gateway city and transport hub`,
    heroImageCredit: media.credit
  };
});
