import { Destination, POI } from '../types';
import { localImages } from '../assets/images';
import { getCanonicalLocationMedia } from './canonicalLocations';

const rawDestinations: Destination[] = [
  {
    id: 'sighisoara',
    name: 'Sighișoara',
    romanianName: 'Sighișoara',
    germanName: 'Schäßburg',
    hungarianName: 'Segesvár',
    slug: 'sighisoara',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'sibiu',
    gatewayCityName: 'Sibiu / Târgu Mureș',
    tagline: 'One of Europe’s last continuously inhabited medieval fortified citadels',
    shortDescription: 'Perched upon a green hilltop above the Târnava Mare river, Sighișoara is an extraordinary UNESCO World Heritage medieval citadel of pastel merchant homes, artisan defence towers, and cobbled alleys.',
    fullIntroduction: 'Founded in the 12th century by Transylvanian Saxon settlers invited by the King of Hungary to guard the southeastern borders of the realm, Sighișoara grew into one of the most prosperous trading and craft citadels in Eastern Europe. Today, it remains one of the rarest sights on the continent: a fully preserved, living, inhabited medieval hilltop fortress where residents still live in 500-year-old painted houses within the original defensive walls.',
    heroImage: localImages.sighisoara,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Panoramic view of Sighișoara medieval citadel and Clock Tower rising above terracotta rooftops',
    gallery: [
      {
        url: localImages.sighisoara,
        caption: 'The iconic 14th-century Clock Tower guarding the main gateway into the Upper Citadel.',
        alt: 'Sighișoara Clock Tower exterior view'
      },
      {
        url: localImages.sighisoara,
        caption: 'Cobbled pastel merchant lanes in Citadel Square during early morning light.',
        alt: 'Pastel coloured historic houses along cobbled street in Sighișoara'
      }
    ],
    goodToKnow: {
      location: 'Mureș County, Central Transylvania',
      region: 'Transylvania',
      bestFor: ['Medieval History', 'Architecture', 'Photography', 'Saxon Heritage', 'Atmospheric Walks'],
      recommendedTime: '1 Full Day or 1 Overnight Stay (Recommended for evening atmosphere)',
      bestTime: 'May to October for pleasant weather and open courtyards; December for quiet winter charm',
      gettingThere: 'Direct daily CFR trains from Cluj-Napoca, Brașov, Sibiu, and Bucharest; scenic drive via DN14',
      carNeeded: 'Not Needed in Citadel (Upper town is pedestrian-only; a car is helpful for visiting nearby Saxon villages)',
      familyFriendly: true,
      nearestGatewayCity: 'Târgu Mureș (55 km / 50m) or Sibiu (90 km / 1h 20m)',
      elevation: '380 m above sea level',
      languagesSpoken: ['Romanian', 'English (widely in hospitality)', 'German', 'Hungarian'],
      currency: 'Romanian Leu (RON) — Cards widely accepted in restaurants and hotels',
      unescoStatus: 'UNESCO World Heritage Site since 1999 (Historic Centre of Sighișoara)'
    },
    categoryIds: ['historic-cities', 'medieval-villages', 'castles-fortresses', 'churches-monasteries'],
    coordinates: {
      lat: 46.2197,
      lng: 24.7928,
      xPercent: 51.5,
      yPercent: 44.5
    },
    featured: true,
    nearbyDestinationIds: ['biertan', 'viscri', 'brasov', 'sibiu'],
    relatedArticleIds: ['saxons-of-transylvania', 'fortified-churches-transylvania', 'story-of-dracula', 'transylvania-road-trip'],
    questions: [
      {
        id: 'q1',
        question: 'What is Sighișoara famous for?',
        answer: 'Sighișoara is internationally celebrated as one of the best-preserved and continuously inhabited medieval citadels in Europe. Its 14th-century defensive towers—each built and maintained by a specific artisan guild—still line the fortification walls. It is also famous as the birthplace of Vlad III Dracula (Vlad the Impaler), the historical 15th-century Prince of Wallachia who lived here in exile with his father between 1431 and 1435.',
        tips: ['Visit early in the morning before day-tripper tour buses arrive to experience the authentic quietude of the cobblestone alleys.']
      },
      {
        id: 'q2',
        question: 'Where is Sighișoara located in Romania?',
        answer: 'Sighișoara is situated right in the geographical centre of Romania in the historic Transylvanian plateau, along the Târnava Mare River in Mureș County. It lies approximately 90 km northeast of Sibiu, 115 km northwest of Brașov, and 150 km southeast of Cluj-Napoca, making it an ideal central waypoint on any Transylvanian itinerary.',
        tips: ['Its central location makes it the perfect base for exploring the surrounding UNESCO Saxon fortified church circuit (Viscri, Biertan, Saschiz).']
      },
      {
        id: 'q3',
        question: 'Is Sighișoara worth visiting?',
        answer: 'Yes, absolutely. Unlike open-air museum villages or restored ruins, Sighișoara is a living, breathing community. You will walk across genuine 15th-century cobblestones, climb a 300-year-old enclosed timber staircase built so school children could reach class during winter blizzards, and see craft workshops operating in ancient cellars. It offers an atmospheric density rarely found elsewhere in Europe.',
        tips: ['Staying overnight transforms the experience: when dusk falls and day tourists leave, the lanterns illuminate quiet pastel facades with an enchanting fairytale atmosphere.']
      },
      {
        id: 'q4',
        question: 'What are the main things to see in Sighișoara?',
        answer: 'The essential sights are concentrated within the hilltop Citadel (Cetate) and can easily be explored on foot: 1) The iconic 64-metre Clock Tower (Turnul cu Ceas) housing the History Museum and a balcony with 360-degree views; 2) The Covered Scholars’ Staircase (Scara Acoperită) with 175 wooden steps; 3) The Gothic Church on the Hill (Biserica din Deal) with rare 15th-century frescoes and crypt; 4) The surrounding Guild Towers (Tinsmiths’, Tailors’, Cobblers’, and Butchers’ Towers); 5) Citadel Square (Piața Cetății) with its vibrant cafe courtyards.',
        tips: ['Check the mechanical figurine clock on the Clock Tower as the figures change position at midnight and throughout the day.']
      }
    ],
    pois: [
      {
        id: 'poi-clock-tower',
        name: 'The Clock Tower',
        romanianName: 'Turnul cu Ceas',
        slug: 'clock-tower',
        destinationId: 'sighisoara',
        coordinates: { lat: 46.2198, lng: 24.7933 },
        category: 'Tower & Defense',
        shortDescription: 'The 64-metre symbol of Sighișoara, built in the 14th century to defend the primary entrance gate.',
        whyInteresting: 'Houses the Sighișoara History Museum, intricate wooden baroque clock mechanism with moving mythological figurines, and an open panoramic balcony offering the best view over the citadel rooftops and green valleys.',
        heroImage: localImages.sighisoara,
        imageAlt: 'Sighișoara Clock Tower with multi-coloured tiled roof and baroque spire',
        practicalInfo: 'Open for visitors year-round, with panoramic access to tower levels and the high rooftop balcony.',
        visitDuration: '45 - 60 minutes',
        admissionNotes: 'Ticket required for museum and tower access'
      },
      {
        id: 'poi-covered-staircase',
        name: 'The Covered Scholars’ Staircase',
        romanianName: 'Scara Acoperită / Scara Școlarilor',
        slug: 'covered-staircase',
        destinationId: 'sighisoara',
        coordinates: { lat: 46.2185, lng: 24.7915 },
        category: 'Architecture',
        shortDescription: 'An atmospheric timber tunnel of 175 steps climbing up the steep hill to the school and church.',
        whyInteresting: 'Built in 1642 with a heavy wooden roof to shelter schoolchildren and churchgoers from heavy winter snows and autumn rains. Walking through its filtered shafts of light feels like stepping into the 17th century.',
        heroImage: localImages.sighisoara,
        imageAlt: 'Interior of the ancient wooden covered stairway in Sighișoara',
        practicalInfo: 'Free public access. Connects Citadel Square directly to the School and Church on the Hill.',
        visitDuration: '15 - 20 minutes',
        admissionNotes: 'Free entry'
      },
      {
        id: 'poi-church-on-the-hill',
        name: 'The Church on the Hill',
        romanianName: 'Biserica din Deal',
        slug: 'church-on-the-hill',
        destinationId: 'sighisoara',
        coordinates: { lat: 46.2178, lng: 24.7912 },
        category: 'Church & Religion',
        shortDescription: 'Transylvania’s prominent 14th-century Gothic hall church crowned at the citadel’s highest point.',
        whyInteresting: 'Houses fragments of 500-year-old pre-Reformation Catholic murals, an impressive wooden altarpiece, and the only underground crypt with Saxon stone tombs in Transylvania, surrounded by a peaceful, leafy Saxon cemetery.',
        heroImage: localImages.sighisoara,
        imageAlt: 'Gothic Church on the Hill and historic Saxon cemetery in Sighișoara',
        practicalInfo: 'Accessible to visitors throughout the week, covering the historic interior nave and atmospheric crypt.',
        visitDuration: '30 - 45 minutes',
        admissionNotes: 'Small entrance fee for church and crypt'
      },
      {
        id: 'poi-citadel-square',
        name: 'Citadel Square',
        romanianName: 'Piața Cetății',
        slug: 'citadel-square',
        destinationId: 'sighisoara',
        coordinates: { lat: 46.2192, lng: 24.7925 },
        category: 'Square & Street',
        shortDescription: 'The heart of medieval civil life, encircled by colourful 16th and 17th-century merchant residences.',
        whyInteresting: 'Historically hosted city fairs, trials, and public executions. Today it is a peaceful cobbled square with shade trees, quiet cafe terraces, and artisan stalls selling handmade Transylvanian crafts and ceramics.',
        heroImage: localImages.sighisoara,
        imageAlt: 'Pastel historic houses enclosing the cobbled Citadel Square in Sighișoara',
        practicalInfo: 'Always accessible. Excellent spot for morning coffee or evening wine.',
        visitDuration: '30 minutes to 1 hour',
        admissionNotes: 'Free public square'
      },
      {
        id: 'poi-tinsmiths-tower',
        name: 'Tinsmiths’ Tower',
        romanianName: 'Turnul Cositorarilor',
        slug: 'tinsmiths-tower',
        destinationId: 'sighisoara',
        coordinates: { lat: 46.2182, lng: 24.7932 },
        category: 'Tower & Defense',
        shortDescription: 'A 25-metre octagonal fortification tower perched atop a square base, reflecting mixed defensive eras.',
        whyInteresting: 'One of the most architecturally unique defence structures in the citadel, designed with arrow slits, cannon embrasures, and firing galleries that repelled numerous Ottoman and Tartar sieges.',
        heroImage: localImages.sighisoara,
        imageAlt: 'Tinsmiths medieval defensive guild tower along fortification wall',
        practicalInfo: 'Viewable from the exterior rampart path that connects the upper towers.',
        visitDuration: '15 minutes',
        admissionNotes: 'Exterior viewing / part of citadel trail'
      },
      {
        id: 'poi-tailors-tower',
        name: 'Tailors’ Tower',
        romanianName: 'Turnul Croitorilor',
        slug: 'tailors-tower',
        destinationId: 'sighisoara',
        coordinates: { lat: 46.2195, lng: 24.7905 },
        category: 'Tower & Defense',
        shortDescription: 'A massive 14th-century gate tower guarding the western portal of the citadel fortifications.',
        whyInteresting: 'Once stored vast amounts of grain and gunpowder during sieges. Its double barrel-vaulted entryway with iron portcullises served as the citadel’s secondary secure entrance opposite the Clock Tower.',
        heroImage: localImages.sighisoara,
        imageAlt: 'Tailors gate tower with stone arches and medieval tiled roof',
        practicalInfo: 'Walk directly through its arched stone portal to enter the western citadel.',
        visitDuration: '15 minutes',
        admissionNotes: 'Free public passage'
      }
    ]
  },
  {
    id: 'brasov',
    name: 'Brașov',
    romanianName: 'Brașov',
    germanName: 'Kronstadt',
    hungarianName: 'Brassó',
    slug: 'brasov',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'brasov',
    gatewayCityName: 'Brașov',
    tagline: 'The Crown City cradled by the forested peaks of the Carpathians',
    shortDescription: 'A dramatic medieval city combining grand German Gothic architecture, the iconic Black Church, winding cobbled streets, and immediate access to alpine hiking trails on Mount Tâmpa.',
    fullIntroduction: 'Founded by Teutonic Knights in 1211 and developed by Saxon merchants into the crown jewel of southeastern Transylvania, Kronstadt (Brașov) controlled the primary trade routes crossing into Wallachia and the Levant. Today, its bustling pedestrian Council Square, surrounding defensive bastions, and forested mountain backdrop make it one of Romania’s most popular bases.',
    heroImage: localImages.brasovBlackChurch,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'View over Brașov Council Square and Black Church with Mount Tâmpa behind',
    gallery: [
      {
        url: localImages.brasovBlackChurch,
        caption: 'The vast Black Church (Biserica Neagră) rising above Council Square (Piața Sfatului).',
        alt: 'Black Church Brașov'
      }
    ],
    goodToKnow: {
      location: 'Brașov County, Southern Transylvania',
      region: 'Transylvania',
      bestFor: ['Alpine Scenery', 'Medieval Architecture', 'Day Trips', 'Hiking', 'Gastronomy'],
      recommendedTime: '2 to 3 Days',
      bestTime: 'May to October for hiking and terrace cafes; December to March for winter skiing in Poiana Brașov',
      gettingThere: '2h 15m direct express train from Bucharest; 2h from Sibiu; direct airport at Brașov-Ghimbav',
      carNeeded: 'Not Needed in city (pedestrian centre); helpful for surrounding mountain castles and national parks',
      familyFriendly: true,
      nearestGatewayCity: 'Brașov (on-site)',
      elevation: '625 m above sea level',
      languagesSpoken: ['Romanian', 'English', 'German', 'Hungarian'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'Historic preservation core with nearby UNESCO sites'
    },
    categoryIds: ['historic-cities', 'castles-fortresses', 'mountains-nature', 'food-culture'],
    coordinates: {
      lat: 45.6579,
      lng: 25.6012,
      xPercent: 57.0,
      yPercent: 58.0
    },
    featured: true,
    nearbyDestinationIds: ['bran', 'sinaia', 'sighisoara', 'viscri'],
    relatedArticleIds: ['story-of-dracula', 'transylvania-road-trip', 'why-transylvania-is-more-than-dracula'],
    questions: [
      {
        id: 'bq1',
        question: 'What is the Black Church in Brașov?',
        answer: 'The Black Church (Biserica Neagră) is the largest Gothic hall church between Vienna and Istanbul, constructed between 1383 and 1477. It earned its name after the Great Fire of 1689 blackened its exterior stone walls. Inside, it houses Europe’s largest collection of 17th-century Anatolian prayer rugs outside Turkey and a legendary 4,000-pipe Buchholz organ.',
        tips: ['Attend an organ concert during summer evenings for an unforgettable acoustic experience.']
      },
      {
        id: 'bq2',
        question: 'What is Rope Street (Strada Sforii)?',
        answer: 'Strada Sforii is one of the narrowest streets in Europe, measuring between 111 and 135 cm in width. Originally built in the 17th century as a quick passage for firefighters between the city’s defence sectors, it is now an atmospheric photographic spot connecting Cerbului and Poarta Șchei.',
        tips: ['Walk through it early in the morning when it is quiet and uncrowded.']
      }
    ],
    pois: [
      {
        id: 'poi-black-church',
        name: 'The Black Church',
        romanianName: 'Biserica Neagră',
        slug: 'black-church',
        destinationId: 'brasov',
        coordinates: { lat: 45.6412, lng: 25.5878 },
        category: 'Church & Religion',
        shortDescription: 'The monumental Gothic cathedral of southeastern Transylvania, celebrated for its organ and Ottoman carpets.',
        whyInteresting: 'Largest Gothic church in Eastern Europe with centuries of history surviving the 1689 great fire.',
        heroImage: localImages.brasovBlackChurch,
        imageAlt: 'Black Church in Brașov',
        visitDuration: '45 mins'
      },
      {
        id: 'poi-council-square',
        name: 'Council Square',
        romanianName: 'Piața Sfatului',
        slug: 'council-square',
        destinationId: 'brasov',
        coordinates: { lat: 45.6425, lng: 25.5892 },
        category: 'Square & Street',
        shortDescription: 'The central pedestrian square anchored by the old Council Hall (Casa Sfatului).',
        whyInteresting: 'Lined with pastel baroque merchant homes, vibrant outdoor cafes, and central fountain.',
        heroImage: localImages.brasovBlackChurch,
        imageAlt: 'Council Square Brașov',
        visitDuration: '1 hour'
      },
      {
        id: 'poi-mount-tampa',
        name: 'Mount Tâmpa Viewpoint & Cable Car',
        romanianName: 'Muntele Tâmpa',
        slug: 'mount-tampa',
        destinationId: 'brasov',
        coordinates: { lat: 45.6369, lng: 25.5947 },
        category: 'Nature & Viewpoint',
        shortDescription: 'The forested mountain peak rising 400m directly over Brașov historic core.',
        whyInteresting: 'Offers panoramic 360-degree vistas over the red roofs, Carpathian valleys, and ancient fortress walls.',
        heroImage: localImages.bucinPeakWinter,
        imageAlt: 'View from Mount Tâmpa',
        visitDuration: '1.5 hours'
      },
      {
        id: 'poi-rope-street',
        name: 'Rope Street',
        romanianName: 'Strada Sforii',
        slug: 'rope-street',
        destinationId: 'brasov',
        coordinates: { lat: 45.6401, lng: 25.5899 },
        category: 'Square & Street',
        shortDescription: 'One of the narrowest alleys in Europe, measuring only 1.11 to 1.35 metres wide.',
        whyInteresting: '17th-century corridor constructed for firefighter rapid transit between guild neighbourhoods.',
        heroImage: localImages.brasovBlackChurch,
        imageAlt: 'Strada Sforii Rope Street',
        visitDuration: '15 mins'
      }
    ]
  },
  {
    id: 'sibiu',
    name: 'Sibiu',
    romanianName: 'Sibiu',
    germanName: 'Hermannstadt',
    hungarianName: 'Nagyszeben',
    slug: 'sibiu',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'sibiu',
    gatewayCityName: 'Sibiu',
    tagline: 'The European Capital of Culture where the historic houses have eyes',
    shortDescription: 'Transylvania’s premier cultural capital, known for the iconic eye-shaped dormer windows in its terracotta roofs, the Bridge of Lies, and the grand Brukenthal Art Museum.',
    fullIntroduction: 'Established in the 12th century as Hermannstadt, Sibiu served as the chief administrative and cultural stronghold of the Transylvanian Saxons for centuries. Its tiered historic centre—divided into the Upper Town (historic wealth and civic power) and the Lower Town (artisan workshops and market alleys)—is linked by romantic stone stairways and passages.',
    heroImage: localImages.sibiuGrandSquare,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Sibiu Grand Square and Council Tower with traditional eye roof windows',
    gallery: [
      {
        url: localImages.sibiuGrandSquare,
        caption: 'The Grand Square (Piața Mare) anchored by the Council Tower and Brukenthal Palace.',
        alt: 'Sibiu Grand Square'
      }
    ],
    goodToKnow: {
      location: 'Sibiu County, Central Transylvania',
      region: 'Transylvania',
      bestFor: ['Museums', 'Gastronomy', 'Saxon Culture', 'Walking Tours', 'Festivals'],
      recommendedTime: '2 Days',
      bestTime: 'May to October for theatre festivals, outdoor dining, and Transfăgărășan driving access',
      gettingThere: 'Sibiu International Airport; direct trains from Cluj, Brașov, and Bucharest; A1 highway',
      carNeeded: 'Not Needed within the city; useful for mountain excursions to Păltiniș or the Transfăgărășan',
      familyFriendly: true,
      nearestGatewayCity: 'Sibiu (on-site)',
      elevation: '415 m above sea level',
      languagesSpoken: ['Romanian', 'German', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'Historic Centre preserved; former European Capital of Culture (2007)'
    },
    categoryIds: ['historic-cities', 'food-culture', 'churches-monasteries', 'medieval-villages'],
    coordinates: {
      lat: 45.7983,
      lng: 24.1256,
      xPercent: 44.0,
      yPercent: 55.0
    },
    featured: true,
    nearbyDestinationIds: ['sighisoara', 'brasov', 'transfagarasan', 'corvin-castle'],
    relatedArticleIds: ['saxons-of-transylvania', 'traditional-romanian-food', 'transylvania-road-trip'],
    questions: [
      {
        id: 'sq1',
        question: 'Why do the houses in Sibiu look like they have eyes?',
        answer: 'The famous "Eyes of Sibiu" (Ochii Sibiului) are eyebrow-shaped dormer ventilation openings built into the steep terracotta tile roofs during the 15th to 19th centuries. Originally designed to allow air circulation for drying meats, grains, and cheeses stored in the attics, they give the uncanny impression that the buildings are watching you.',
        tips: ['Look up when walking through Piața Mică (Lesser Square) for the highest density of expressive roof eyes.']
      },
      {
        id: 'sq2',
        question: 'What is the legend of the Bridge of Lies?',
        answer: 'The Bridge of Lies (Podul Minciunilor) was cast in 1859 in Friedrichshütte, making it the oldest cast-iron bridge in present-day Romania. According to folklore, the bridge has ears and will creak or collapse if someone tells a lie while standing on it. Lovers, merchants, and cadets all have popular legends tied to the bridge.',
        tips: ['The view looking under the bridge from the lower street is one of Sibiu’s quintessential photo spots.']
      }
    ],
    pois: [
      {
        id: 'poi-grand-square',
        name: 'The Grand Square',
        romanianName: 'Piața Mare',
        slug: 'grand-square-sibiu',
        destinationId: 'sibiu',
        coordinates: { lat: 45.7967, lng: 24.1518 },
        category: 'Square & Street',
        shortDescription: 'One of the largest medieval squares in Transylvania, ringed by prestigious baroque and Gothic buildings.',
        whyInteresting: 'Civic heart of Sibiu since 1366, featuring the Brukenthal National Museum, Council Tower, and Holy Trinity Church.',
        heroImage: localImages.sibiuGrandSquare,
        imageAlt: 'Sibiu Grand Square',
        visitDuration: '1 hour'
      },
      {
        id: 'poi-bridge-of-lies',
        name: 'The Bridge of Lies',
        romanianName: 'Podul Minciunilor',
        slug: 'bridge-of-lies',
        destinationId: 'sibiu',
        coordinates: { lat: 45.7981, lng: 24.1504 },
        category: 'Architecture',
        shortDescription: 'Romania’s oldest forged cast-iron pedestrian bridge linking Upper and Lower Sibiu.',
        whyInteresting: 'Fabled in Transylvanian folklore to groan or collapse whenever an untruth is spoken upon its span.',
        heroImage: localImages.sibiuGrandSquare,
        imageAlt: 'Bridge of Lies in Sibiu',
        visitDuration: '20 mins'
      },
      {
        id: 'poi-brukenthal-museum',
        name: 'Brukenthal National Museum',
        romanianName: 'Muzeul Național Brukenthal',
        slug: 'brukenthal-museum',
        destinationId: 'sibiu',
        coordinates: { lat: 45.7964, lng: 24.1509 },
        category: 'Museum',
        shortDescription: 'Late 18th-century Austrian Baroque palace housing Romania’s oldest public art collection.',
        whyInteresting: 'Founded by Baron Samuel von Brukenthal, displaying masterpieces of Flemish, Dutch, and Italian Renaissance art.',
        heroImage: localImages.sibiuGrandSquare,
        imageAlt: 'Brukenthal Museum Palace',
        visitDuration: '2 hours'
      }
    ]
  },
  {
    id: 'bran',
    name: 'Bran & Rucăr-Bran Pass',
    romanianName: 'Castelul Bran',
    slug: 'bran',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'brasov',
    gatewayCityName: 'Brașov',
    tagline: 'The iconic 14th-century clifftop fortress commanding the mountain pass',
    shortDescription: 'Perched dramatically upon a 60-metre limestone crag on the historic border between Transylvania and Wallachia, Bran Castle is famed worldwide through its literary link to Bram Stoker’s Dracula, yet holds a fascinating genuine history as a royal summer residence of Queen Marie of Romania.',
    fullIntroduction: 'Built by the Saxons of Brașov in 1377 to defend the mountain trade gorge against Ottoman incursions, Bran Castle features steep spiral staircases, secret escape tunnels, timber-beamed rooms, and an inner stone courtyard well. In 1920, the citizens of Brașov gifted the fortress to Queen Marie of Romania, who transformed the austere garrison into a beloved royal mountain home.',
    heroImage: localImages.branCastle,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Bran Castle on rocky crag surrounded by autumn forest',
    gallery: [
      {
        url: localImages.branCastle,
        caption: 'The dramatic clifftop profile of Bran Castle towering above the pass.',
        alt: 'Bran Castle profile'
      }
    ],
    goodToKnow: {
      location: 'Brașov County, Rucăr-Bran Pass',
      region: 'Transylvania',
      bestFor: ['Castles & Fortresses', 'Royal Heritage', 'Mountain Views', 'Photography'],
      recommendedTime: '2 to 3 Hours for castle; Full Day if exploring the surrounding mountain villages (Moieciu, Măgura, Peștera)',
      bestTime: 'Morning or late afternoon year-round to avoid peak midday tour coaches; stunning in autumn foliage and winter snow',
      gettingThere: '30 km southwest of Brașov (approx. 35 mins by car or regular direct bus from Brașov Bartolomeu terminal)',
      carNeeded: 'Recommended (public buses run from Brașov, but a car lets you explore spectacular neighbouring mountain villages)',
      familyFriendly: true,
      nearestGatewayCity: 'Brașov (30 km)',
      elevation: '750 m above sea level',
      languagesSpoken: ['Romanian', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'National Historic Monument'
    },
    categoryIds: ['castles-fortresses', 'mountains-nature', 'historic-cities'],
    coordinates: {
      lat: 45.5152,
      lng: 25.3672,
      xPercent: 55.0,
      yPercent: 62.0
    },
    featured: true,
    nearbyDestinationIds: ['brasov', 'sinaia', 'viscri'],
    relatedArticleIds: ['story-of-dracula', 'why-transylvania-is-more-than-dracula'],
    questions: [
      {
        id: 'bran-q1',
        question: 'Did Dracula actually live in Bran Castle?',
        answer: 'No. Bram Stoker never visited Romania and only drew inspiration from travel logs describing dramatic Transylvanian fortresses on jagged rocks. The historical Prince Vlad the Impaler (Vlad Țepeș) had only tenuous connections to Bran—he may have passed through or been imprisoned briefly here for a few days in 1462 after being captured by Hungarian King Matthias Corvinus.',
        tips: ['Focus on the genuine medieval defensive engineering and Queen Marie’s 1920s interior redesign to truly appreciate the castle.']
      }
    ],
    pois: [
      {
        id: 'poi-bran-fortress',
        name: 'Bran Castle Keep & Courtyard',
        romanianName: 'Castelul Bran',
        slug: 'bran-castle-keep',
        destinationId: 'bran',
        coordinates: { lat: 45.5152, lng: 25.3672 },
        category: 'Castles & Fortresses',
        shortDescription: 'The stone keep, timber galleries, inner well, and Queen Marie collection rooms.',
        whyInteresting: 'Intricate medieval layout with a hidden staircase concealed inside a fireplace leading to upper towers.',
        heroImage: localImages.branCastle,
        imageAlt: 'Bran Castle courtyard and tower',
        visitDuration: '1.5 - 2 hours'
      },
      {
        id: 'poi-queen-marie-park',
        name: 'Queen Marie Royal Tea House & Park',
        romanianName: 'Casa de Ceai a Reginei Maria',
        slug: 'queen-marie-tea-house',
        destinationId: 'bran',
        coordinates: { lat: 45.5142, lng: 25.3685 },
        category: 'Food & Drink',
        shortDescription: 'The charming royal pavilion set amidst weeping willows and park ponds below Bran Castle.',
        whyInteresting: 'Restored royal wooden lodge serving aromatic herbal teas, pastries, and fine Romanian wines.',
        heroImage: localImages.branCastle,
        imageAlt: 'Queen Marie Tea House',
        visitDuration: '45 mins'
      }
    ]
  },
  {
    id: 'viscri',
    name: 'Viscri',
    romanianName: 'Viscri',
    germanName: 'Deutschweißkirch',
    slug: 'viscri',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'brasov',
    gatewayCityName: 'Brașov / Sighișoara',
    tagline: 'The quintessential Saxon village of pastel barns and UNESCO fortified church',
    shortDescription: 'A peaceful, unpaved rural sanctuary where horses and carts still navigate dusty main lanes lined by wide pastel-blue Saxon homesteads and a gleaming white 12th-century fortified church.',
    fullIntroduction: 'Viscri (Weisskirch — "White Church") is one of the most celebrated rural conservation triumphs in Europe. Protected by UNESCO and championed for decades by the Mihai Eminescu Trust and HM King Charles III, the village has preserved its centuries-old traditional artisan life, wool-knitting guilds, tile-making kilns, and communal pastoral rhythms.',
    heroImage: localImages.viscriChurch,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Viscri white fortified church on hill above village houses',
    gallery: [
      {
        url: localImages.viscriChurch,
        caption: 'The 12th-century white fortified church rising over the orchards.',
        alt: 'Viscri fortified church'
      }
    ],
    goodToKnow: {
      location: 'Brașov County, between Sighișoara and Rupea',
      region: 'Transylvania',
      bestFor: ['Rural Tranquility', 'UNESCO Saxon Heritage', 'Slow Food', 'Biking & Walking'],
      recommendedTime: 'Half Day to Overnight Saxon Guesthouse Stay',
      bestTime: 'May to October',
      gettingThere: '45 mins drive from Sighișoara or 1h 15m from Brașov; accessible via paved country roads',
      carNeeded: 'Essential (no direct train access)',
      familyFriendly: true,
      nearestGatewayCity: 'Brașov or Sibiu',
      elevation: '490 m above sea level',
      languagesSpoken: ['Romanian', 'German', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'UNESCO World Heritage Village & Fortified Church (1993)'
    },
    categoryIds: ['medieval-villages', 'churches-monasteries', 'food-culture'],
    coordinates: {
      lat: 46.0558,
      lng: 25.0931,
      xPercent: 53.0,
      yPercent: 49.0
    },
    featured: true,
    nearbyDestinationIds: ['biertan', 'sighisoara', 'brasov'],
    relatedArticleIds: ['saxons-of-transylvania', 'fortified-churches-transylvania'],
    questions: [
      {
        id: 'vq1',
        question: 'Why did King Charles III buy a house in Viscri?',
        answer: 'King Charles III first visited Transylvania in 1998 and fell in love with the pristine biodiversity, traditional farming methods, and harmonious Saxon architecture. He bought an 18th-century Saxon house in Viscri (House No. 163) to support local heritage conservation and eco-tourism.',
        tips: ['Visit the royal property in the village centre to see traditional botanical watercolors and craft workshops.']
      }
    ],
    pois: [
      {
        id: 'poi-viscri-church',
        name: 'Viscri Fortified Church',
        romanianName: 'Biserica Fortificată Viscri',
        slug: 'viscri-fortified-church',
        destinationId: 'viscri',
        coordinates: { lat: 46.0558, lng: 25.0931 },
        category: 'Church & Religion',
        shortDescription: '12th-century white Romanesque chapel expanded into a heavy Saxon defence redoubt.',
        whyInteresting: 'UNESCO World Heritage sanctuary containing a village museum with folk costumes and panoramic tower view.',
        heroImage: localImages.viscriChurch,
        imageAlt: 'Viscri fortified church white stone walls',
        visitDuration: '1 hour'
      },
      {
        id: 'poi-king-charles-house',
        name: 'King Charles III Heritage House',
        romanianName: 'Casa Regelui Charles III Viscri',
        slug: 'king-charles-house-viscri',
        destinationId: 'viscri',
        coordinates: { lat: 46.0535, lng: 25.0910 },
        category: 'Museum',
        shortDescription: 'Restored 18th-century traditional blue Saxon farmstead owned by HM King Charles III.',
        whyInteresting: 'Exhibits Transylvanian wildflower art, traditional carpentry, and sustainable rural crafts.',
        heroImage: localImages.viscriChurch,
        imageAlt: 'King Charles house Viscri',
        visitDuration: '45 mins'
      }
    ]
  },
  {
    id: 'biertan',
    name: 'Biertan',
    romanianName: 'Biertan',
    germanName: 'Birthälm',
    slug: 'biertan',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'sibiu',
    gatewayCityName: 'Sibiu / Sighișoara',
    tagline: 'The monumental seat of the Saxon Lutheran Bishop with triple ring defensive walls',
    shortDescription: 'Set in a rolling vine-covered valley, Biertan boasts Transylvania’s most formidable fortified church complex, featuring triple concentric defensive walls, six towers, and the famous marital reconciliation prison.',
    fullIntroduction: 'For nearly 300 years (1572–1867), Biertan served as the spiritual headquarters of the Evangelical Lutheran Church of Transylvanian Saxons. Built atop a central hill, its towering Late Gothic hall church was protected against Ottoman sieges by three rings of masonry walls, fortified gatehouses, and drawbridges.',
    heroImage: localImages.biertanChurch,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Biertan fortified church complex on hill surrounded by village houses and vineyards',
    gallery: [
      {
        url: localImages.biertanChurch,
        caption: 'The majestic triple ring fortification walls of Biertan.',
        alt: 'Biertan fortified church'
      }
    ],
    goodToKnow: {
      location: 'Sibiu County, 30 km from Sighișoara',
      region: 'Transylvania',
      bestFor: ['UNESCO Heritage', 'Fortified Churches', 'Saxon History', 'Wine Region'],
      recommendedTime: 'Half Day',
      bestTime: 'May to October',
      gettingThere: '30 mins drive from Sighișoara or 1h 15m from Sibiu via DN14',
      carNeeded: 'Recommended (local taxi from Mediaș or Sighișoara also possible)',
      familyFriendly: true,
      nearestGatewayCity: 'Sibiu or Sighișoara',
      elevation: '390 m above sea level',
      languagesSpoken: ['Romanian', 'German', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'UNESCO World Heritage Site since 1993'
    },
    categoryIds: ['churches-monasteries', 'medieval-villages', 'castles-fortresses'],
    coordinates: {
      lat: 46.1352,
      lng: 24.5222,
      xPercent: 49.0,
      yPercent: 47.0
    },
    featured: true,
    nearbyDestinationIds: ['sighisoara', 'sibiu', 'viscri'],
    relatedArticleIds: ['fortified-churches-transylvania', 'saxons-of-transylvania'],
    questions: [
      {
        id: 'biertan-q1',
        question: 'What was the marital reconciliation prison in Biertan?',
        answer: 'Couples requesting a divorce were locked by the Saxon Lutheran community into a small prison room in the church tower for several weeks with only one single bed, one chair, one plate, and one spoon. They had to share everything. Legend says that over 300 years, only a single couple proceeded with divorce after their release.',
        tips: ['You can inspect the original reconciliation cell inside the outer fortification tower.']
      }
    ],
    pois: [
      {
        id: 'poi-biertan-church',
        name: 'Biertan Fortified Church & Ring Walls',
        romanianName: 'Biserica Fortificată Biertan',
        slug: 'biertan-fortified-church',
        destinationId: 'biertan',
        coordinates: { lat: 46.1352, lng: 24.5222 },
        category: 'Church & Religion',
        shortDescription: 'The magnificent Late Gothic hall church fortified with triple concentric defensive rings.',
        whyInteresting: 'Features an intricate 1515 multi-locking sacristy door mechanism and the historic marital prison tower.',
        heroImage: localImages.biertanChurch,
        imageAlt: 'Biertan fortified church',
        visitDuration: '1.5 hours'
      }
    ]
  },
  {
    id: 'corvin-castle',
    name: 'Corvin Castle (Hunedoara)',
    romanianName: 'Castelul Corvinilor / Castelul Huniazilor',
    slug: 'corvin-castle',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'sibiu',
    gatewayCityName: 'Sibiu / Timișoara',
    tagline: 'One of the greatest and most dramatic Gothic-Renaissance fortresses in Europe',
    shortDescription: 'Approached by a high wooden drawbridge across the Zlaști river canyon, Corvin Castle is a colossal medieval castle of soaring towers, Knights’ banquet halls, and deep legends.',
    fullIntroduction: 'Erected by the legendary military commander John Hunyadi in 1440 atop an older fortification, Corvin Castle was built to withstand the heaviest Ottoman artillery. Featuring the imposing Capistrano Tower, the Hall of the Diet, and the Knights’ Hall, it is widely regarded as one of the Seven Wonders of Romania.',
    heroImage: localImages.corvinCastle,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Corvin Castle with its long wooden drawbridge and Gothic spires',
    gallery: [
      {
        url: localImages.corvinCastle,
        caption: 'The dramatic approach over the river canyon via the wooden drawbridge.',
        alt: 'Corvin Castle bridge'
      }
    ],
    goodToKnow: {
      location: 'Hunedoara County, Western Transylvania',
      region: 'Transylvania',
      bestFor: ['Gothic Architecture', 'Castles', 'Military History', 'Photography'],
      recommendedTime: '2 to 3 Hours',
      bestTime: 'Year-round; spectacular in morning sunlight',
      gettingThere: '1h 30m drive from Sibiu via A1 motorway, or 2h from Timișoara / Cluj',
      carNeeded: 'Recommended',
      familyFriendly: true,
      nearestGatewayCity: 'Deva / Sibiu',
      elevation: '280 m above sea level',
      languagesSpoken: ['Romanian', 'English', 'Hungarian'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'National Monument of Romania'
    },
    categoryIds: ['castles-fortresses', 'historic-cities'],
    coordinates: {
      lat: 45.7494,
      lng: 22.8883,
      xPercent: 32.0,
      yPercent: 57.0
    },
    featured: true,
    nearbyDestinationIds: ['sibiu', 'alba-iulia'],
    relatedArticleIds: ['transylvania-road-trip', 'why-transylvania-is-more-than-dracula'],
    questions: [
      {
        id: 'corvin-q1',
        question: 'Why is it called Corvin Castle?',
        answer: 'The name comes from John Hunyadi’s son, Matthias Corvinus, who became King of Hungary in 1458. The family crest features a raven (Latin: Corvus) holding a golden ring in its beak, commemorating a royal legend of bravery.',
        tips: ['Look for the raven holding the ring carved in stone across the castle portals and frescoes.']
      }
    ],
    pois: [
      {
        id: 'poi-corvin-knights-hall',
        name: 'The Knights’ Hall & Drawbridge',
        romanianName: 'Sala Cavalerilor & Podul de Acces',
        slug: 'corvin-knights-hall',
        destinationId: 'corvin-castle',
        coordinates: { lat: 45.7494, lng: 22.8883 },
        category: 'Castles & Fortresses',
        shortDescription: 'The monumental vaulted Gothic banquet chamber and soaring exterior drawbridge.',
        whyInteresting: 'Supported by central marble pillars bearing coats of arms, setting for legendary medieval feasts and military war councils.',
        heroImage: localImages.corvinCastle,
        imageAlt: 'Corvin Castle interior and towers',
        visitDuration: '2 hours'
      }
    ]
  },
  {
    id: 'transfagarasan',
    name: 'Transfăgărășan & Bâlea Lake',
    romanianName: 'Transfăgărășan / Lacul Bâlea',
    slug: 'transfagarasan',
    regionId: 'transylvania',
    regionName: 'Transylvania / Făgăraș Mountains',
    gatewayCityId: 'sibiu',
    gatewayCityName: 'Sibiu / Brașov',
    tagline: 'The dramatic alpine highway carving through the highest peaks of the Carpathians',
    shortDescription: 'Celebrated as one of the world’s most scenic mountain roads, the Transfăgărășan climbs to 2,042m elevation past rushing waterfalls to the pristine glacial Bâlea Lake.',
    fullIntroduction: 'Constructed in the 1970s through sheer dynamite carving in the Făgăraș mountain range (the "Transylvanian Alps"), the 90-km DN7C highway links Transylvania with Wallachia. At its summit lies Bâlea Lac, a mirror-clear glacial lake surrounded by craggy mountain peaks.',
    heroImage: localImages.transfagarasan,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Transfagarasan serpentine hairpin road climbing towards Balea Lake',
    gallery: [
      {
        url: localImages.transfagarasan,
        caption: 'The dramatic hairpin curves descending into the northern glacial valley.',
        alt: 'Transfagarasan hairpins'
      }
    ],
    goodToKnow: {
      location: 'Făgăraș Mountains (Sibiu & Argeș Counties)',
      region: 'Carpathian Mountains',
      bestFor: ['Alpine Drives', 'Glacial Lakes', 'Hiking', 'Photography', 'Epic Views'],
      recommendedTime: '1 Full Day',
      bestTime: 'July to October (The high pass is open during summer and autumn; cable car operates in winter)',
      gettingThere: '1h drive south of Sibiu; accessible from Brașov via Făgăraș town',
      carNeeded: 'Essential (or private tour / shuttle bus)',
      familyFriendly: true,
      nearestGatewayCity: 'Sibiu (75 km)',
      elevation: '2,042 m at Bâlea Lake tunnel summit',
      languagesSpoken: ['Romanian', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'Nature Reserve & Alpine Biosphere'
    },
    categoryIds: ['mountains-nature'],
    coordinates: {
      lat: 45.6042,
      lng: 24.6158,
      xPercent: 49.0,
      yPercent: 64.0
    },
    featured: true,
    nearbyDestinationIds: ['sibiu', 'brasov'],
    relatedArticleIds: ['transylvania-road-trip', 'why-transylvania-is-more-than-dracula'],
    questions: [
      {
        id: 'tf-q1',
        question: 'When is the Transfăgărășan road open?',
        answer: 'The high alpine section between Bâlea Cascadă and Piscu Negru is officially open to motor vehicles from late June or early July until late October or early November, depending on snowfall. Outside this window, you can still take the scenic cable car (Telecabina) from Bâlea Waterfall up to Bâlea Lake.',
        tips: ['Start early in the morning on summer weekends to avoid queueing on the high hairpins.']
      }
    ],
    pois: [
      {
        id: 'poi-balea-lake',
        name: 'Bâlea Glacial Lake & Summit Pass',
        romanianName: 'Lacul Bâlea',
        slug: 'balea-lake',
        destinationId: 'transfagarasan',
        coordinates: { lat: 45.6042, lng: 24.6158 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Glacial lake perched at 2,042m surrounded by jagged Carpathian ridges and alpine chalets.',
        whyInteresting: 'Highest point of the pass with the famous mountain tunnel crossing from Transylvania into Wallachia.',
        heroImage: localImages.transfagarasan,
        imageAlt: 'Balea Glacial Lake',
        visitDuration: '2 hours'
      },
      {
        id: 'poi-vidraru-dam',
        name: 'Vidraru Dam & Lake',
        romanianName: 'Barajul Vidraru',
        slug: 'vidraru-dam',
        destinationId: 'transfagarasan',
        coordinates: { lat: 45.3658, lng: 24.6308 },
        category: 'Architecture',
        shortDescription: 'Monumental 166-metre-high curved concrete hydroelectric dam framing Lake Vidraru.',
        whyInteresting: 'Colossal engineering marvel crowned by the Prometheus statue of electricity and lakeside boat tours.',
        heroImage: localImages.transfagarasan,
        imageAlt: 'Vidraru dam',
        visitDuration: '45 mins'
      }
    ]
  },
  {
    id: 'cluj-napoca',
    name: 'Cluj-Napoca',
    romanianName: 'Cluj-Napoca',
    germanName: 'Klausenburg',
    hungarianName: 'Kolozsvár',
    slug: 'cluj-napoca',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'cluj-napoca',
    gatewayCityName: 'Cluj-Napoca',
    tagline: 'The vibrant academic, technological, and cultural metropolis of Transylvania',
    shortDescription: 'A dynamic university city blending Bohemian cafe culture, imposing Gothic monuments like St. Michael’s Church, the leafy Central Park, and contemporary European art spaces.',
    fullIntroduction: 'As the unofficial capital of historical Transylvania, Cluj-Napoca combines a grand 14th-century Saxon and Hungarian heritage with the creative energy of over 100,000 university students. Its broad Union Square, bustling pedestrian avenues, and thriving culinary scene make it the gateway into northern and western Transylvania.',
    heroImage: localImages.clujStMichael,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Cluj-Napoca Union Square and St Michael Church spire',
    gallery: [
      {
        url: localImages.clujStMichael,
        caption: 'St. Michael’s Gothic Cathedral towering over Union Square.',
        alt: 'St Michael church Cluj'
      }
    ],
    goodToKnow: {
      location: 'Cluj County, Northwestern Transylvania',
      region: 'Transylvania',
      bestFor: ['Urban Culture', 'Coffee & Dining', 'Art Galleries', 'Nightlife', 'Day Trips to Turda'],
      recommendedTime: '2 Days',
      bestTime: 'May to October for festivals (TIFF, Electric Castle, Untold) and outdoor terraces',
      gettingThere: 'Cluj International Airport (CLJ) with direct flights across Europe; major rail hub',
      carNeeded: 'Not Needed in city; useful for Apuseni Mountains and Turda Salt Mine',
      familyFriendly: true,
      nearestGatewayCity: 'Cluj-Napoca (on-site)',
      elevation: '360 m above sea level',
      languagesSpoken: ['Romanian', 'Hungarian', 'English (very widely)'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'Historic Urban Core'
    },
    categoryIds: ['historic-cities', 'food-culture'],
    coordinates: {
      lat: 46.7712,
      lng: 23.6236,
      xPercent: 40.0,
      yPercent: 37.0
    },
    featured: true,
    nearbyDestinationIds: ['salina-turda', 'alba-iulia', 'sighisoara'],
    relatedArticleIds: ['transylvania-road-trip', 'traditional-romanian-food'],
    questions: [
      {
        id: 'cluj-q1',
        question: 'What is the most famous sight in Cluj-Napoca?',
        answer: 'St. Michael’s Church (Biserica Sfântul Mihail) in Piața Unirii is the second-largest Gothic church in Romania after Brașov’s Black Church. Its 80-metre neo-Gothic clock tower offers a sweeping vista across the city and surrounding hills.',
        tips: ['Climb the church tower during late afternoon for golden hour over the square.']
      }
    ],
    pois: [
      {
        id: 'poi-st-michael-cluj',
        name: 'St. Michael’s Church & Union Square',
        romanianName: 'Biserica Sfântul Mihail & Piața Unirii',
        slug: 'st-michael-cluj',
        destinationId: 'cluj-napoca',
        coordinates: { lat: 46.7694, lng: 23.5898 },
        category: 'Church & Religion',
        shortDescription: 'Magnificent 14th-century Gothic church anchored beside the equestrian statue of King Matthias Corvinus.',
        whyInteresting: 'Historic hall church with towering 80-metre spire overlooking Cluj’s liveliest pedestrian café quarter.',
        heroImage: localImages.clujStMichael,
        imageAlt: 'St Michael church Cluj',
        visitDuration: '1 hour'
      },
      {
        id: 'poi-cluj-botanical-garden',
        name: 'Alexandru Borza Botanical Garden',
        romanianName: 'Grădina Botanică Alexandru Borza',
        slug: 'cluj-botanical-garden',
        destinationId: 'cluj-napoca',
        coordinates: { lat: 46.7602, lng: 23.5867 },
        category: 'Nature & Viewpoint',
        shortDescription: '14-hectare serene sanctuary with Japanese Garden, giant Amazon water lilies, and Roman garden.',
        whyInteresting: 'One of the most comprehensive botanical collections in Southeastern Europe, founded in 1920.',
        heroImage: localImages.clujStMichael,
        imageAlt: 'Cluj Botanical Garden',
        visitDuration: '1.5 hours'
      }
    ]
  },
  {
    id: 'salina-turda',
    name: 'Turda Salt Mine & Gorge',
    romanianName: 'Salina Turda & Cheile Turzii',
    slug: 'salina-turda',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'cluj-napoca',
    gatewayCityName: 'Cluj-Napoca',
    tagline: 'An otherworldly subterranean marvel and deep limestone canyon',
    shortDescription: 'Descend 120 metres underground into a colossal science-fiction wonderland carved out of ancient salt beds, featuring an underground lake with rowboats and a subterranean Ferris wheel.',
    fullIntroduction: 'Mined since Roman antiquity and continuously excavated until 1932, Salina Turda has been transformed into one of the world’s most unique subterranean spaces. The massive Rudolf Mine chamber echoes with vast acoustics, while the underground lake at the bottom of the Terezia mine invites quiet paddle boating under illuminated salt stalactites.',
    heroImage: localImages.salinaTurda,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Salina Turda subterranean illuminated salt cavern with underground lake',
    gallery: [
      {
        url: localImages.salinaTurda,
        caption: 'The vast Rudolf Mine chamber viewed from the high wooden balcony.',
        alt: 'Salina Turda cavern'
      }
    ],
    goodToKnow: {
      location: 'Cluj County, 30 km south of Cluj-Napoca',
      region: 'Transylvania',
      bestFor: ['Subterranean Wonders', 'Health & Halotherapy', 'Unique Architecture', 'Day Trips'],
      recommendedTime: '2 to 3 Hours',
      bestTime: 'Year-round (constant pleasant subterranean temperature of 11–12°C)',
      gettingThere: '35 mins by car or regular minibus from Cluj-Napoca',
      carNeeded: 'Optional (regular buses connect Cluj and Turda)',
      familyFriendly: true,
      nearestGatewayCity: 'Cluj-Napoca (30 km)',
      elevation: 'Underground: -120 m depth',
      languagesSpoken: ['Romanian', 'English', 'Hungarian'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'Historic Industrial Heritage Monument'
    },
    categoryIds: ['mountains-nature', 'historic-cities'],
    coordinates: {
      lat: 46.5878,
      lng: 23.7872,
      xPercent: 42.0,
      yPercent: 41.0
    },
    featured: true,
    nearbyDestinationIds: ['cluj-napoca', 'alba-iulia', 'sighisoara'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'turda-q1',
        question: 'What should I wear when visiting Salina Turda?',
        answer: 'Bring a warm fleece or light jacket and comfortable walking shoes. The temperature inside the salt mine remains constant at 11–12°C (52–54°F) year-round with 80% humidity, regardless of whether it is 35°C outside in summer.',
        tips: ['Take the panoramic glass elevator down into the Rudolf Mine for unforgettable views.']
      }
    ],
    pois: [
      {
        id: 'poi-salina-turda-lake',
        name: 'Salina Turda Subterranean Lake & Wheel',
        romanianName: 'Lacul Subteran & Mina Rudolf',
        slug: 'salina-turda-lake',
        destinationId: 'salina-turda',
        coordinates: { lat: 46.5878, lng: 23.7872 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Colossal illuminated 120-metre deep salt cavern with an underground salt lake and rowboats.',
        whyInteresting: 'Microclimate rich in curative salt aerosols, subterranean amphitheatre, and illuminated timber platforms.',
        heroImage: localImages.salinaTurda,
        imageAlt: 'Salina Turda underground lake',
        visitDuration: '2.5 hours'
      },
      {
        id: 'poi-cheile-turzii',
        name: 'Cheile Turzii Limestone Gorge',
        romanianName: 'Rezervația Naturală Cheile Turzii',
        slug: 'cheile-turzii-gorge',
        destinationId: 'salina-turda',
        coordinates: { lat: 46.5647, lng: 23.6811 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Spectacular 3-kilometre karst canyon with 300-metre cliffs and wooden suspension bridges.',
        whyInteresting: 'Over 1,000 rare plant species, dramatic rock climbing walls, and easy family hiking paths along the river.',
        heroImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Cheile Turzii gorge cliffs',
        visitDuration: '2 hours'
      }
    ]
  },
  {
    id: 'alba-iulia',
    name: 'Alba Iulia & Vauban Fortress',
    romanianName: 'Alba Iulia / Cetatea Alba Carolina',
    slug: 'alba-iulia',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'sibiu',
    gatewayCityName: 'Sibiu / Cluj-Napoca',
    tagline: 'The monumental star-shaped Vauban fortress and heart of Romanian National Unity',
    shortDescription: 'The largest star-shaped citadel in Southeastern Europe, featuring seven bastions, ornate Baroque gates, Roman ruins, and two imposing cathedrals standing side-by-side.',
    fullIntroduction: 'Built between 1715 and 1738 by Austrian military architects as a Vauban-style fortress, Alba Carolina has served as a pivotal stage of Central European history: from the ancient Roman legionary fortress of Apulum, to the Renaissance court of the Principality of Transylvania, to the historic 1918 Great Union of Romania.',
    heroImage: localImages.albaCarolina,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Alba Carolina Vauban star fortress gates and cathedrals',
    gallery: [
      {
        url: localImages.albaCarolina,
        caption: 'The ornate Baroque 3rd Citadel Gate crowned by Emperor Charles VI.',
        alt: 'Alba Carolina gate'
      }
    ],
    goodToKnow: {
      location: 'Alba County, Central Transylvania',
      region: 'Transylvania',
      bestFor: ['Vauban Fortresses', 'Baroque Gates', 'Roman History', 'Walking & Biking'],
      recommendedTime: '1 Full Day',
      bestTime: 'May to October',
      gettingThere: '45 mins from Sibiu or 1h 15m from Cluj via the A1 / A10 motorways',
      carNeeded: 'Not Needed inside citadel (vast pedestrian zone)',
      familyFriendly: true,
      nearestGatewayCity: 'Sibiu (70 km) or Cluj (100 km)',
      elevation: '230 m above sea level',
      languagesSpoken: ['Romanian', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'National Heritage Landmark'
    },
    categoryIds: ['historic-cities', 'castles-fortresses', 'churches-monasteries'],
    coordinates: {
      lat: 46.0689,
      lng: 23.5714,
      xPercent: 39.0,
      yPercent: 49.0
    },
    featured: true,
    nearbyDestinationIds: ['sibiu', 'corvin-castle', 'cluj-napoca'],
    relatedArticleIds: ['transylvania-road-trip', 'why-transylvania-is-more-than-dracula'],
    questions: [
      {
        id: 'alba-q1',
        question: 'What is the daily Changing of the Guard at Alba Carolina?',
        answer: 'Austrian imperial guard reenactors in 18th-century uniforms with cavalry horses, fifes, drums, and black powder cannons perform a ceremonial changing of the guard at the 3rd and 4th Citadel Gates daily around midday.',
        tips: ['Arrive at the 3rd Gate shortly before midday on Saturdays for the full cannon salute.']
      }
    ],
    pois: [
      {
        id: 'poi-alba-carolina-gate',
        name: 'The 3rd Citadel Gate & Ramparts',
        romanianName: 'Poarta a III-a a Cetății Alba Carolina',
        slug: 'alba-carolina-gate-3',
        destinationId: 'alba-iulia',
        coordinates: { lat: 46.0695, lng: 23.5732 },
        category: 'Tower & Defense',
        shortDescription: 'Spectacular Austrian Baroque triumphal gate adorned with relief sculptures of Hercules and Emperor Charles VI.',
        whyInteresting: 'Main monumental entrance to the star citadel with internal cell where peasant hero Horea was imprisoned.',
        heroImage: localImages.albaCarolina,
        imageAlt: 'Alba Carolina gate 3',
        visitDuration: '45 mins'
      },
      {
        id: 'poi-coronation-cathedral',
        name: 'Coronation Cathedral & St. Michael Catholic Cathedral',
        romanianName: 'Catedrala Încoronării & Catedrala Romano-Catolică',
        slug: 'coronation-cathedral-alba',
        destinationId: 'alba-iulia',
        coordinates: { lat: 46.0678, lng: 23.5689 },
        category: 'Church & Religion',
        shortDescription: 'Two monumental cathedrals: the 1,000-year-old Romanesque Catholic cathedral and the Byzantine Coronation Cathedral.',
        whyInteresting: 'King Ferdinand and Queen Marie were crowned monarchs of Unified Greater Romania here in 1922.',
        heroImage: localImages.albaCarolina,
        imageAlt: 'Coronation Cathedral Alba Iulia',
        visitDuration: '1 hour'
      }
    ]
  },
  {
    id: 'sinaia',
    name: 'Sinaia & Peleș Castle',
    romanianName: 'Sinaia / Castelul Peleș',
    slug: 'sinaia',
    regionId: 'wallachia',
    regionName: 'Wallachia (Carpathian Gate)',
    gatewayCityId: 'bucharest',
    gatewayCityName: 'Bucharest / Brașov',
    tagline: 'The royal alpine retreat and fairy-tale Neo-Renaissance masterpiece',
    shortDescription: 'Nestled in the lush fir forests of the Bucegi Mountains, Sinaia is celebrated for Peleș Castle—the magnificent 160-room royal summer palace of King Carol I of Romania.',
    fullIntroduction: 'Chosen by King Carol I in 1873 as the royal summer retreat, Sinaia blossomed from a secluded monastic valley into the "Pearl of the Carpathians." Peleș Castle represents one of the crowning achievements of late 19th-century European architecture, integrating German Neo-Renaissance carved timberwork with early innovations like central heating, electricity, and a private theatre.',
    heroImage: localImages.pelesCastle,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Peleș Castle with fairytale spires against Bucegi mountains in Sinaia',
    gallery: [
      {
        url: localImages.pelesCastle,
        caption: 'The majestic exterior of Peleș Castle surrounded by royal gardens and mountain peaks.',
        alt: 'Peles Castle Sinaia'
      }
    ],
    goodToKnow: {
      location: 'Prahova County, Prahova Valley (South of Transylvanian border)',
      region: 'Wallachia / Carpathian Pass',
      bestFor: ['Royal Architecture', 'Alpine Scenery', 'Art Collections', 'Mountain Hikes'],
      recommendedTime: '1 Full Day',
      bestTime: 'Year-round; lush green in summer, spectacular golden foliage in autumn, magical in winter snow',
      gettingThere: 'Direct express train from Bucharest (1h 30m) or Brașov (50m) to Sinaia station',
      carNeeded: 'Not Needed (easy walk or short taxi from Sinaia railway station)',
      familyFriendly: true,
      nearestGatewayCity: 'Bucharest (120 km) or Brașov (45 km)',
      elevation: '860 m above sea level',
      languagesSpoken: ['Romanian', 'English', 'French', 'German'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'National Heritage Landmark & Royal Estate'
    },
    categoryIds: ['castles-fortresses', 'mountains-nature', 'historic-cities'],
    coordinates: {
      lat: 45.3598,
      lng: 25.5427,
      xPercent: 57.5,
      yPercent: 67.0
    },
    featured: true,
    nearbyDestinationIds: ['brasov', 'bran'],
    relatedArticleIds: ['transylvania-road-trip', 'why-transylvania-is-more-than-dracula'],
    questions: [
      {
        id: 'sin-q1',
        question: 'Is Peleș Castle different from Bran Castle?',
        answer: 'Yes, completely. While Bran is a rugged 14th-century military defence fortress built of simple stone with austere barracks, Peleș is an opulent 19th-century royal palace of supreme luxury, filled with Murano crystal chandeliers, hand-carved walnut panelling, stained glass, and 4,000 pieces of royal armor.',
        tips: ['Visiting both gives you the full spectrum of Romanian history—from medieval frontier defence to 19th-century European royal grandeur.']
      }
    ],
    pois: [
      {
        id: 'poi-peles-palace',
        name: 'Peleș Castle',
        romanianName: 'Castelul Peleș',
        slug: 'peles-castle',
        destinationId: 'sinaia',
        coordinates: { lat: 45.3598, lng: 25.5427 },
        category: 'Castles & Fortresses',
        shortDescription: 'The magnificent summer palace of King Carol I of Romania.',
        whyInteresting: 'Exquisite craftsmanship, royal armory, Gustav Klimt ceiling murals, and royal forest terraces.',
        heroImage: localImages.pelesCastle,
        imageAlt: 'Peles Castle Sinaia',
        visitDuration: '2 hours'
      },
      {
        id: 'poi-pelisor-castle',
        name: 'Pelișor Castle & Royal Park',
        romanianName: 'Castelul Pelișor',
        slug: 'pelisor-castle',
        destinationId: 'sinaia',
        coordinates: { lat: 45.3608, lng: 25.5412 },
        category: 'Architecture',
        shortDescription: 'Art Nouveau royal residence built for King Ferdinand and Queen Marie of Romania.',
        whyInteresting: 'Intimate Viennese Secessionist interiors designed by Queen Marie herself, including the Golden Bedroom.',
        heroImage: localImages.pelesCastle,
        imageAlt: 'Pelișor Castle Sinaia',
        visitDuration: '1 hour'
      }
    ]
  },
  {
    id: 'maramures',
    name: 'Maramureș Wooden Churches & Heritage',
    romanianName: 'Maramureș',
    slug: 'maramures',
    regionId: 'maramures',
    regionName: 'Maramureș',
    gatewayCityId: 'cluj-napoca',
    gatewayCityName: 'Cluj-Napoca / Baia Mare',
    tagline: 'The living wooden civilization of soaring timber spires and carved oak gates',
    shortDescription: 'Romania’s northern sanctuary of preserved rural civilization, celebrated for UNESCO wooden Gothic churches, monumental carved wooden gateways, and the colourful Merry Cemetery.',
    fullIntroduction: 'Protected by high mountain ridges, Maramureș is celebrated as Europe’s last living medieval peasant culture. Here, master woodcarvers still sculpt monumental oak gates with ancient sun motifs, and centuries-old shingled wooden churches reach skyward like needles.',
    heroImage: localImages.maramuresChurch,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Maramureș wooden church and traditional green meadows',
    gallery: [
      {
        url: localImages.maramuresChurch,
        caption: 'Bârsana Monastery timber church complex.',
        alt: 'Barsana wooden monastery'
      }
    ],
    goodToKnow: {
      location: 'Maramureș County, Northern Romania',
      region: 'Maramureș',
      bestFor: ['Wooden Architecture', 'Folk Traditions', 'Pastoral Landscapes', 'Handicrafts'],
      recommendedTime: '2 to 3 Days',
      bestTime: 'May to October for village festivals; Easter and Christmas for ancient folk customs',
      gettingThere: '3h drive north of Cluj-Napoca or direct train to Sighetu Marmației',
      carNeeded: 'Essential to explore scattered rural valleys',
      familyFriendly: true,
      nearestGatewayCity: 'Baia Mare (60 km) or Cluj (150 km)',
      elevation: '350 - 700 m',
      languagesSpoken: ['Romanian', 'English (in pensions)'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: '8 UNESCO World Heritage Wooden Churches'
    },
    categoryIds: ['churches-monasteries', 'medieval-villages'],
    coordinates: {
      lat: 47.6583,
      lng: 23.9583,
      xPercent: 44.0,
      yPercent: 18.0
    },
    featured: true,
    nearbyDestinationIds: ['cluj-napoca', 'bucovina'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'mm-q1',
        question: 'What is the Merry Cemetery in Săpânța?',
        answer: 'The Merry Cemetery (Cimitirul Vesel) is world-renowned for its bright blue painted oak crosses featuring naive portraits and satirical, humorous poetic epitaphs written from the first-person perspective of the deceased describing their honest lives and quirks.',
        tips: ['Visit early in the morning when the sun illuminates the vibrant hand-carved blue crosses.']
      }
    ],
    pois: [
      {
        id: 'poi-merry-cemetery',
        name: 'The Merry Cemetery of Săpânța',
        romanianName: 'Cimitirul Vesel din Săpânța',
        slug: 'merry-cemetery-sapanta',
        destinationId: 'maramures',
        coordinates: { lat: 47.9719, lng: 23.6953 },
        category: 'Church & Religion',
        shortDescription: 'World-famous cemetery of vibrant blue oak crosses with painted folk scenes and witty epitaphs.',
        whyInteresting: 'Celebrates life with humorous storytelling poetry founded by folk artisan Stan Ioan Pătraș in 1935.',
        heroImage: localImages.maramuresChurch,
        imageAlt: 'Merry Cemetery Sapanta',
        visitDuration: '1.5 hours'
      },
      {
        id: 'poi-barsana-monastery',
        name: 'Bârsana Wooden Monastery',
        romanianName: 'Mănăstirea Bârsana',
        slug: 'barsana-monastery',
        destinationId: 'maramures',
        coordinates: { lat: 47.8183, lng: 24.0611 },
        category: 'Church & Religion',
        shortDescription: 'Spectacular complex of hand-hewn oak timber monasteries with a 57-metre wooden spire.',
        whyInteresting: 'One of the tallest wooden structures in Europe, set in serene landscaped flower gardens.',
        heroImage: localImages.maramuresChurch,
        imageAlt: 'Barsana wooden monastery',
        visitDuration: '1.5 hours'
      }
    ]
  },
  {
    id: 'bucovina',
    name: 'Bucovina Painted Monasteries',
    romanianName: 'Bucovina / Mănăstirile Pictate',
    slug: 'bucovina',
    regionId: 'bucovina',
    regionName: 'Bucovina',
    gatewayCityId: 'cluj-napoca',
    gatewayCityName: 'Suceava / Iași',
    tagline: 'The UNESCO painted sanctuaries adorned with 500-year-old outdoor frescoes',
    shortDescription: 'Nestled in green beech forests, Bucovina’s painted monasteries feature breathtaking 15th and 16th-century exterior Byzantine murals that have miraculously withstood centuries of Carpathian weather.',
    fullIntroduction: 'Commissioned by Moldavian Prince Stephen the Great and his successors to celebrate victories and educate the faithful, the painted monasteries of Bucovina are unique artistic masterworks. Their exterior stone walls are completely adorned with vibrant mineral frescoes, including the world-famous "Voroneț Blue" Last Judgment.',
    heroImage: localImages.bucovinaMonastery,
    heroImageCredit: 'Independent Travel Reference Archive',
    heroImageAlt: 'Voronet painted monastery exterior frescoes in Bucovina',
    gallery: [
      {
        url: localImages.bucovinaMonastery,
        caption: 'The UNESCO exterior murals of Voroneț Monastery.',
        alt: 'Voronet Monastery'
      }
    ],
    goodToKnow: {
      location: 'Suceava County, Northeastern Romania',
      region: 'Bucovina',
      bestFor: ['Byzantine Art', 'UNESCO Monasteries', 'Forest Hikes', 'Peaceful Countryside'],
      recommendedTime: '2 Days',
      bestTime: 'May to October',
      gettingThere: 'Suceava Airport (SCV) or 4h drive northeast of Cluj through the scenic Tihuța Pass',
      carNeeded: 'Essential for monastery circuit',
      familyFriendly: true,
      nearestGatewayCity: 'Suceava',
      elevation: '450 - 650 m',
      languagesSpoken: ['Romanian', 'English', 'French'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: '8 UNESCO Painted Churches of Moldavia'
    },
    categoryIds: ['churches-monasteries'],
    coordinates: {
      lat: 47.5183,
      lng: 25.8647,
      xPercent: 63.0,
      yPercent: 21.0
    },
    featured: true,
    nearbyDestinationIds: ['maramures', 'cluj-napoca'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'buc-q1',
        question: 'What is unique about the Voroneț Blue pigment?',
        answer: 'Voroneț Monastery is known as the "Sistine Chapel of the East" due to its monumental exterior fresco of the Last Judgment. The intense blue pigment—known as "Voroneț Blue"—was created using a secret lapis lazuli and mineral recipe that has remained brilliantly vibrant for over 500 years.',
        tips: ['Examine the western exterior wall in morning or late afternoon light when colours glow brightest.']
      }
    ],
    pois: [
      {
        id: 'poi-voronet-monastery',
        name: 'Voroneț Monastery ("The Sistine Chapel of the East")',
        romanianName: 'Mănăstirea Voroneț',
        slug: 'voronet-monastery',
        destinationId: 'bucovina',
        coordinates: { lat: 47.5183, lng: 25.8647 },
        category: 'Church & Religion',
        shortDescription: '15th-century UNESCO monastery renowned for its brilliant Voroneț Blue Last Judgment fresco.',
        whyInteresting: 'Founded by Stephen the Great in 1488, built in just 3 months and 3 weeks.',
        heroImage: localImages.bucovinaMonastery,
        imageAlt: 'Voronet Monastery',
        visitDuration: '1.5 hours'
      },
      {
        id: 'poi-sucevita-monastery',
        name: 'Sucevița Fortified Monastery',
        romanianName: 'Mănăstirea Sucevița',
        slug: 'sucevita-monastery',
        destinationId: 'bucovina',
        coordinates: { lat: 47.7783, lng: 25.7119 },
        category: 'Church & Religion',
        shortDescription: 'Massive fortress-monastery with heavy defensive towers and the famous "Ladder of Virtues" mural.',
        whyInteresting: 'The last and largest painted church in Bucovina, surrounded by 6-metre-high stone defence walls.',
        heroImage: localImages.bucovinaMonastery,
        imageAlt: 'Sucevita monastery',
        visitDuration: '1.5 hours'
      }
    ]
  },
  {
    id: 'cazanele-dunarii',
    name: 'Cazanele Dunării & Chipul lui Decebal',
    romanianName: 'Cazanele Dunării & Statuia lui Decebal',
    slug: 'cazanele-dunarii',
    regionId: 'banat',
    regionName: 'Banat & Danube Gorges',
    gatewayCityId: 'timisoara',
    gatewayCityName: 'Timișoara / Craiova',
    tagline: 'Europe’s deepest river gorge where the Danube carves through the Carpathian limestone',
    shortDescription: 'A dramatic 134-kilometre river gorge along the Romanian-Serbian border, home to the 55-metre rock sculpture of King Decebalus (the tallest rock sculpture in Europe), waterside Mraconia Monastery, and spectacular limestone canyon boat tours.',
    fullIntroduction: 'Where the mighty Danube River breaches the southern arc of the Carpathian Mountains, it forms the Cazanele Dunării (The Danube Boilers or Iron Gates). Here, the river narrows to just 150 metres while plunging to depths over 70 metres between towering vertical limestone walls. Carved directly into the cliff overlooking the water stands the colossal 55-metre-high rock relief of Dacian King Decebalus, created between 1994 and 2004. Boating through the limestone narrows reveals waterside monasteries, ancient Roman military paths, and prehistoric caves reachable only from the water.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    heroImageCredit: 'Danube Gorges Reference Archive',
    heroImageAlt: 'Danube Gorges limestone canyon with boat and Decebal rock sculpture in Romania',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Decebalus Rock Sculpture and Mraconia Gulf on the Danube River.',
        alt: 'Decebal Rock Sculpture'
      },
      {
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panoramic view over Cazanele Mari from the Ciucaru Mare cliff viewpoint.',
        alt: 'Ciucaru Mare Danube View'
      }
    ],
    goodToKnow: {
      location: 'Mehedinți & Caraș-Severin Counties, Southwestern Romania (Orșova / Eșelnița / Dubova)',
      region: 'Banat & Danube Gorges',
      bestFor: ['Speedboat Tours', 'Karst Geology', 'Ancient Roman & Dacian History', 'Dramatic Cliff Hiking', 'Riverside Dining'],
      recommendedTime: '2 Days / 1 Night (Base in Eșelnița or Dubova along the water)',
      bestTime: 'May to October for calm river cruising, speedboat excursions, and warm evening sunsets over Serbia',
      gettingThere: '2.5h drive south from Timișoara Airport (TSR) via Caransebeș-Orșova, or 2h west from Craiova Airport (CRA) via Drobeta-Turnu Severin',
      carNeeded: 'Highly Recommended (DN57 scenic road runs right along the gorge edge with numerous boat launches)',
      familyFriendly: true,
      nearestGatewayCity: 'Timișoara (TSR Airport, 215 km) or Craiova (CRA Airport, 160 km)',
      elevation: '40 - 350 m above sea level',
      languagesSpoken: ['Romanian', 'English', 'Serbian', 'German'],
      currency: 'Romanian Leu (RON) — Cash helpful for small local boat skippers',
      unescoStatus: 'Part of Iron Gates Natural Park & UNESCO Biosphere candidate'
    },
    categoryIds: ['mountains-nature', 'historic-cities', 'churches-monasteries'],
    coordinates: {
      lat: 44.6425,
      lng: 22.2592,
      xPercent: 32.5,
      yPercent: 84.5
    },
    featured: true,
    nearbyDestinationIds: ['timisoara', 'baile-herculane'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'caz-q1',
        question: 'What is the Decebalus Rock Sculpture (Chipul lui Decebal)?',
        answer: 'The Decebalus Rock Sculpture is a monumental 55-metre-high (180 ft) and 25-metre-wide stone relief carved into the rocky mountain face in Mraconia Bay on the Danube. Commissioned by Romanian businessman Iosif Constantin Drăgan and carved by a team of 12 sculptors over 10 years (1994-2004), it is the tallest rock relief in Europe and honours the last king of Dacia who fought Roman Emperor Trajan.',
        tips: ['Take a speedboat tour right to the base of the statue to appreciate its monumental scale from water level.']
      },
      {
        id: 'caz-q2',
        question: 'How do you explore Cazanele Dunării?',
        answer: 'The best way is by combining a 1-hour to 2-hour speedboat tour from Dubova or Eșelnița (which enters Cazanele Mari and Cazanele Mici, Ponicova Cave, and stops at Decebal and Mraconia Monastery) with a hike up Ciucaru Mare (a scenic 2-hour loop trail with vertiginous clifftop viewpoints looking down onto the Danube river bend).',
        tips: ['Boat captains share fascinating stories of the submerged old villages of Ada Kaleh and old Orșova flooded during the 1970s dam construction.']
      },
      {
        id: 'caz-q3',
        question: 'What is Mraconia Monastery?',
        answer: 'Mraconia Monastery is an Orthodox monastery built directly on a rocky outcrop at the water’s edge in the Mraconia Gulf. The original 15th-century monastery was submerged during the construction of the Iron Gates hydroelectric dam, and this serene white-walled sanctuary was rebuilt in the 1990s as a "monastery rising from the water."',
        tips: ['Its golden domes reflect brilliantly against the deep green waters of the Danube in the late afternoon sun.']
      }
    ],
    pois: [
      {
        id: 'poi-decebal-rock',
        name: 'Decebalus Rock Sculpture',
        romanianName: 'Chipul lui Decebal / Statuia Regelui Decebal',
        slug: 'decebal-rock-sculpture',
        destinationId: 'cazanele-dunarii',
        coordinates: { lat: 44.6409, lng: 22.2597 },
        category: 'Historic Landmark',
        shortDescription: 'The 55-metre-tall cliff-carved Colossus of Dacian King Decebalus overlooking the Danube.',
        whyInteresting: 'The tallest stone rock sculpture in Europe (6 metres taller than Rio’s Christ the Redeemer), carved over a decade into solid cliff granite.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Decebalus Rock Carving on the Danube cliff',
        practicalInfo: 'Viewable from the bridge on DN57 or up-close via speedboat from the nearby pontoon docks.',
        visitDuration: '45 minutes',
        admissionNotes: 'Free from viewpoint bridge; Speedboat tours available locally'
      },
      {
        id: 'poi-mraconia-monastery',
        name: 'Mraconia Monastery',
        romanianName: 'Mănăstirea Mraconia',
        slug: 'mraconia-monastery',
        destinationId: 'cazanele-dunarii',
        coordinates: { lat: 44.6436, lng: 22.2692 },
        category: 'Church & Religion',
        shortDescription: 'Serene Orthodox sanctuary rising directly from the waters of the Danube Boilers.',
        whyInteresting: 'Nicknamed the "Monastery under water" because its historic predecessor was submerged when the Iron Gates reservoir was flooded in 1970.',
        heroImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Mraconia monastery on the Danube shore',
        practicalInfo: 'Open daily. Respectful attire required. Pier access allows boat pickups.',
        visitDuration: '30 minutes',
        admissionNotes: 'Free entry / donations welcome'
      },
      {
        id: 'poi-cazanele-mari-mici',
        name: 'Cazanele Mari & Cazanele Mici',
        romanianName: 'Cazanele Mari și Cazanele Mici ale Dunării',
        slug: 'cazanele-mari-mici',
        destinationId: 'cazanele-dunarii',
        coordinates: { lat: 44.6050, lng: 22.2530 },
        category: 'Nature & Viewpoint',
        shortDescription: 'The dramatic limestone narrows of the Danube with vertical 300-metre cliffs.',
        whyInteresting: 'Where the Danube compresses to a narrow 150-metre channel and reaches depths of over 70 metres, creating swift whirlpool currents.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Limestone cliffs of Cazanele Dunarii',
        visitDuration: '1.5 - 2 hours (boat tour)'
      },
      {
        id: 'poi-ciucaru-mare',
        name: 'Ciucaru Mare Panoramic Trail',
        romanianName: 'Traseul Panoramic Ciucaru Mare',
        slug: 'ciucaru-mare-trail',
        destinationId: 'cazanele-dunarii',
        coordinates: { lat: 44.6025, lng: 22.2610 },
        category: 'Nature & Viewpoint',
        shortDescription: 'A 2-hour clifftop hike providing breathtaking vertiginous vistas over the Danube loop and Serbia.',
        whyInteresting: 'Offers the single best aerial panorama over the entire Cazanele canyon system, yellow wildflowers, and soaring raptors.',
        heroImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'View from Ciucaru Mare clifftop',
        visitDuration: '2 hours',
        practicalInfo: 'Moderate hike starting from Dubova village. Bring sturdy shoes and water.'
      },
      {
        id: 'poi-ponicova-cave',
        name: 'Ponicova Cave',
        romanianName: 'Peștera Ponicova',
        slug: 'ponicova-cave',
        destinationId: 'cazanele-dunarii',
        coordinates: { lat: 44.6070, lng: 22.2470 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Extensive multi-level limestone cavern connecting terrestrial sinkholes directly into the Danube River.',
        whyInteresting: 'Boats can navigate directly into the flooded river entrance hall with stalactites hanging overhead.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Ponicova cave entrance on the Danube',
        visitDuration: '45 minutes'
      }
    ]
  },
  {
    id: 'danube-delta',
    name: 'Danube Delta (Delta Dunării)',
    romanianName: 'Delta Dunării & Tulcea',
    slug: 'danube-delta',
    regionId: 'dobrogea',
    regionName: 'Dobrogea & Danube Delta',
    gatewayCityId: 'constanta',
    gatewayCityName: 'Constanța / Bucharest',
    tagline: 'The best-preserved river delta in Europe and UNESCO Biosphere Reserve',
    shortDescription: 'A sprawling 5,800-square-kilometre aquatic labyrinth of reed-fringed canals, wild white water lilies, 300+ migratory bird species, the ancient subtropical oak forest and wild horses of Letea, and traditional Lipovan fishing villages.',
    fullIntroduction: 'Formed at the terminus of Europe’s second-longest river before it empties into the Black Sea, the Danube Delta is the youngest land in Europe and one of the world’s greatest wetland sanctuaries. Recognized as a UNESCO World Heritage site and Biosphere Reserve, the Delta is divided into three main river arms—Chilia, Sulina, and Sfântu Gheorghe. Within its web of waterways thrive Europe’s largest white pelican breeding colonies, pygmy cormorants, and sea eagles. At Letea, century-old oak trees are draped with Mediterranean lianas on desert sand dunes where herds of wild horses roam freely.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    heroImageCredit: 'Danube Delta Biosphere Archive',
    heroImageAlt: 'Danube Delta waterways with water lilies, reeds and pelicans at sunrise',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pelicans taking flight over peaceful reed waterways in the Danube Delta.',
        alt: 'Danube Delta Pelicans'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Wild horses running across the sand dunes of Letea Subtropical Forest.',
        alt: 'Letea Wild Horses'
      }
    ],
    goodToKnow: {
      location: 'Tulcea County, Dobrogea, Eastern Romania',
      region: 'Dobrogea & Danube Delta',
      bestFor: ['Birdwatching & Wildlife Photography', 'Boat & Kayak Safaris', 'Letea Wild Horses', 'Traditional Fish Soups (Borș de Pește)', 'Black Sea Beaches'],
      recommendedTime: '3 - 4 Days (Stay in a traditional thatch-roof guesthouse in Crișan, Mila 23, or Sulina)',
      bestTime: 'April to June for bird migration and nesting; September to October for golden autumn foliage and calm waterways',
      gettingThere: 'Tulcea is the gateway port (1.5h drive from Constanța Airport CND or 3.5h from Bucharest OTP). From Tulcea, passenger catamarans and water taxis reach the remote villages.',
      carNeeded: 'Not inside the Delta! Vehicles are parked in Tulcea or Murighiol; all interior travel is strictly by boat.',
      familyFriendly: true,
      nearestGatewayCity: 'Constanța (CND Airport, 125 km) or Bucharest (OTP Airport, 280 km)',
      elevation: '0 - 12 m (Sea level)',
      languagesSpoken: ['Romanian', 'Russian (Lipovan community)', 'English', 'Ukrainian'],
      currency: 'Romanian Leu (RON) — Bring adequate cash for boat skippers and village meals',
      unescoStatus: 'UNESCO World Heritage Site & Biosphere Reserve since 1991'
    },
    categoryIds: ['mountains-nature', 'historic-cities'],
    coordinates: {
      lat: 45.1833,
      lng: 29.2500,
      xPercent: 94.0,
      yPercent: 62.0
    },
    featured: true,
    nearbyDestinationIds: ['bucharest'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'del-q1',
        question: 'How do you get into and explore the Danube Delta?',
        answer: 'All Danube Delta journeys begin in the port city of Tulcea (or Murighiol / Mahmudia). Since no roads cross the wetland interior, you board either scheduled Navrom passenger catamarans or private motorboat transfers to reach island villages like Crișan, Mila 23, Sulina, or Sfântu Gheorghe. From your village base, local boatmen guide small electric or motor skiffs through narrow canals carpeted with water lilies.',
        tips: ['Book an early morning sunrise boat excursion to witness thousands of birds feeding in complete silence.']
      },
      {
        id: 'del-q2',
        question: 'What is special about the Letea Forest (Pădurea Letea)?',
        answer: 'Letea is the northernmost subtropical forest in Europe. Located on sand dunes formed from ancient Black Sea banks, 500-year-old oak trees are entwined with wild Greek lianas and vines. It is also famous for its population of hundreds of wild horses that have roamed the dunes and oak groves freely for generations.',
        tips: ['Safari jeeps with local guides take visitors from Letea village into the protected forest reserve.']
      },
      {
        id: 'del-q3',
        question: 'What is authentic Danube Delta cuisine?',
        answer: 'The culinary soul of the Delta is Lipovan fish gastronomy. The signature dish is Borș de Pește (Fish Soup) cooked in large cast-iron cauldrons over open wood fires using 4 to 6 varieties of fresh freshwater fish (carp, catfish, pike, zander), seasoned with vinegar, lovage, and served with pungent garlic sauce (mujdei) and hot polenta (mămăligă).',
        tips: ['Try freshly prepared pike roe salad (salată de icre de știucă) and stuffed baked carp with onion and tomatoes.']
      }
    ],
    pois: [
      {
        id: 'poi-letea-forest',
        name: 'Letea Subtropical Forest & Wild Horses',
        romanianName: 'Pădurea Letea & Caii Sălbatici',
        slug: 'letea-forest',
        destinationId: 'danube-delta',
        coordinates: { lat: 45.2833, lng: 29.5333 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Europe’s northernmost subtropical oak forest growing on maritime sand dunes with wild horses.',
        whyInteresting: 'Ancient 500-year-old oaks intertwined with exotic Mediterranean lianas alongside free-roaming wild horse herds.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Letea Forest sand dunes and ancient oaks',
        visitDuration: 'Half Day (4 hours)',
        practicalInfo: 'Reached by boat from Sulina or Crișan to Letea village, followed by authorized 4x4 safari vehicle.'
      },
      {
        id: 'poi-pelican-sanctuary',
        name: 'Roșca-Buhaiova Pelican Sanctuary',
        romanianName: 'Rezervația de Pelicani Roșca-Buhaiova',
        slug: 'pelican-sanctuary-danube-delta',
        destinationId: 'danube-delta',
        coordinates: { lat: 45.3500, lng: 29.3800 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Europe’s largest breeding colony of Great White Pelicans (Pelecanus onocrotalus).',
        whyInteresting: 'Over 2,500 breeding pairs gather here each spring, creating awe-inspiring feeding formations across the water.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Pelicans swimming in Danube Delta',
        visitDuration: '2 - 3 hours'
      },
      {
        id: 'poi-sulina-port',
        name: 'Sulina Historic Port & Black Sea Beach',
        romanianName: 'Orașul Sulina & Plaja Sălbatică Sulina',
        slug: 'sulina-port-beach',
        destinationId: 'danube-delta',
        coordinates: { lat: 45.1550, lng: 29.6600 },
        category: 'Historic Landmark',
        shortDescription: 'The easternmost town in the European Union where the Danube river directly meets the Black Sea.',
        whyInteresting: 'Former 19th-century cosmopolitan free port (Europolis), featuring the historic European Danube Commission lighthouse and pristine white sand beaches.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Sulina lighthouse and Black Sea meeting point',
        visitDuration: '1 Full Day'
      },
      {
        id: 'poi-mila-23',
        name: 'Mila 23 Traditional Lipovan Village',
        romanianName: 'Satul Tradițional Mila 23',
        slug: 'mila-23-village',
        destinationId: 'danube-delta',
        coordinates: { lat: 45.2280, lng: 29.2450 },
        category: 'Historic Landmark',
        shortDescription: 'Authentic Russian Lipovan fishermen settlement of blue-and-white reed-thatched houses.',
        whyInteresting: 'Birthplace of Romania’s Olympic rowing legend Ivan Patzaichin and heart of authentic Delta canoeing culture.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Traditional reed thatched houses at Mila 23',
        visitDuration: '2 - 3 hours'
      }
    ]
  },
  {
    id: 'timisoara',
    name: 'Timișoara',
    romanianName: 'Timișoara',
    slug: 'timisoara',
    regionId: 'banat',
    regionName: 'Banat & Danube Gorges',
    gatewayCityId: 'timisoara',
    gatewayCityName: 'Timișoara (TSR Airport)',
    tagline: 'The "Little Vienna" of Eastern Europe and European Capital of Culture',
    shortDescription: 'A cosmopolitan cultural jewel of Secessionist palaces, grand pedestrian plazas, the monumental Orthodox Metropolitan Cathedral, and the historic birthplace of the December 1989 Romanian Revolution.',
    fullIntroduction: 'Nicknamed "Little Vienna" for its sweeping Habsburg architecture and tree-lined Bega canal, Timișoara has historically been a trailblazer: it was the first European city to introduce electric street lamps in 1884 and the first Romanian city to rise up against the Ceaușescu dictatorship in December 1989. In 2023, Timișoara shone on the world stage as the European Capital of Culture. Its three interconnected plazas—Union Square, Liberty Square, and Victory Square—form one of the largest continuous pedestrian historic districts on the continent.',
    heroImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1600&q=80',
    heroImageCredit: 'Timișoara Heritage Archive',
    heroImageAlt: 'Timisoara Orthodox Metropolitan Cathedral and Victory Square gardens',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
        caption: 'The towering multi-coloured tile spires of the Metropolitan Cathedral in Victory Square.',
        alt: 'Timisoara Cathedral'
      },
      {
        url: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Baroque pastel facades and Catholic Dome in Union Square (Piața Unirii).',
        alt: 'Timisoara Union Square'
      }
    ],
    goodToKnow: {
      location: 'Timiș County, Banat, Western Romania',
      region: 'Banat & Danube Gorges',
      bestFor: ['Secessionist & Baroque Architecture', 'European History & 1989 Revolution', 'Cafe Terraces', 'Bega River Walks', 'Gateway to Danube Gorges'],
      recommendedTime: '2 Days (Ideal weekend city break & hub for exploring Banat & Danube Gorges)',
      bestTime: 'April to October for open-air cafe culture, rose garden blooms, and cultural music festivals',
      gettingThere: 'Traian Vuia International Airport (TSR) with high-frequency direct flights from Germany, UK, Italy, Spain, and France; A1 motorway links directly to Hungary',
      carNeeded: 'Not Needed in City (Vast pedestrianised center and trams; car recommended for Danube Gorges excursions)',
      familyFriendly: true,
      nearestGatewayCity: 'Timișoara (Traian Vuia Airport TSR right in city limits, 12 km)',
      elevation: '90 m',
      languagesSpoken: ['Romanian', 'German', 'Hungarian', 'English', 'Serbian'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'European Capital of Culture 2023'
    },
    categoryIds: ['historic-cities', 'churches-monasteries', 'castles-fortresses'],
    coordinates: {
      lat: 45.7537,
      lng: 21.2257,
      xPercent: 12.5,
      yPercent: 57.5
    },
    featured: true,
    nearbyDestinationIds: ['cazanele-dunarii', 'oradea', 'baile-herculane'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'tim-q1',
        question: 'What is Timișoara famous for in modern history?',
        answer: 'Timișoara is revered as the cradle of the December 1989 Romanian Revolution that ended 42 years of communist rule. On December 16, 1989, citizens of all ethnicities gathered in Maria Square to protect Pastor László Tőkés, igniting mass demonstrations in Victory Square that proclaimed Timișoara as the first free city in Romania.',
        tips: ['Visit the Memorial of the 1989 Revolution to see original video footage, bullet-marked artifacts, and a section of the Berlin Wall gifted to the city.']
      },
      {
        id: 'tim-q2',
        question: 'Why is Union Square (Piața Unirii) in Timișoara special?',
        answer: 'Piața Unirii is Romania’s finest Baroque square. It showcases harmonious pastel buildings alongside both the Roman Catholic Dome (built by Viennese architect Emanuel Fischer von Erlach) and the Serbian Orthodox Cathedral facing each other in a celebration of multi-confessional peace.',
        tips: ['Enjoy a Viennese coffee and Esterhazy cake at one of the sunny outdoor terrace cafes lining the square.']
      }
    ],
    pois: [
      {
        id: 'poi-timisoara-cathedral',
        name: 'Timișoara Orthodox Metropolitan Cathedral',
        romanianName: 'Catedrala Mitropolitană Ortodoxă',
        slug: 'timisoara-orthodox-cathedral',
        destinationId: 'timisoara',
        coordinates: { lat: 45.7508, lng: 21.2242 },
        category: 'Church & Religion',
        shortDescription: 'Spectacular 90-metre Neo-Moldavian cathedral with green-and-red mosaic tile spires.',
        whyInteresting: 'The tallest church in Romania outside Bucharest, crowned with 11 towers and an exquisite gilded iconostasis.',
        heroImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Timisoara Cathedral spires and facade',
        visitDuration: '45 minutes',
        admissionNotes: 'Free entry'
      },
      {
        id: 'poi-piata-unirii-timisoara',
        name: 'Union Square (Piața Unirii)',
        romanianName: 'Piața Unirii din Timișoara',
        slug: 'piata-unirii-timisoara',
        destinationId: 'timisoara',
        coordinates: { lat: 45.7578, lng: 21.2289 },
        category: 'Square & Street',
        shortDescription: 'The grand Baroque jewel of Timișoara surrounded by colourful 18th-century palaces.',
        whyInteresting: 'Encircled by the Catholic Dome, Serbian Orthodox Church, Baroque Palace (Art Museum), and the Holy Trinity Plague Column.',
        heroImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Union Square Timisoara pastel buildings',
        visitDuration: '1 hour'
      },
      {
        id: 'poi-piata-victoriei-timisoara',
        name: 'Victory Square & Romanian Opera',
        romanianName: 'Piața Victoriei & Opera Națională',
        slug: 'piata-victoriei-timisoara',
        destinationId: 'timisoara',
        coordinates: { lat: 45.7530, lng: 21.2256 },
        category: 'Square & Street',
        shortDescription: 'The monumental pedestrian promenade connecting the National Opera House with the Cathedral.',
        whyInteresting: 'Epicenter of the December 1989 Revolution where tens of thousands shouted "Liberty!" from the Opera balcony.',
        heroImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Victory Square Timisoara',
        visitDuration: '45 minutes'
      }
    ]
  },
  {
    id: 'targu-mures',
    name: 'Târgu Mureș',
    romanianName: 'Târgu Mureș',
    hungarianName: 'Marosvásárhely',
    germanName: 'Neumarkt am Mieresch',
    slug: 'targu-mures',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'targu-mures',
    gatewayCityName: 'Târgu Mureș (TGM Airport)',
    tagline: 'Art Nouveau masterworks and the cultural capital of Szeklerland',
    shortDescription: 'A refined Transylvanian city celebrated for its showpiece Palace of Culture with the Stained Glass Mirror Hall, 15th-century fortified citadel, historic Teleki Library, and direct flight gateway located just 50 minutes from Sighișoara.',
    fullIntroduction: 'Situated on the Mureș River at the crossroads of Romanian and Hungarian cultures, Târgu Mureș boasts some of Central Europe’s most dazzling Secessionist architecture. Commissioned in the early 20th century under Mayor György Bernády, the Palace of Culture is an architectural marvel featuring colourful Zsolnay ceramic tiles, bronze reliefs, and a world-renowned Hall of Mirrors with 12 stained-glass windows illustrating Transylvanian legends. Its Transylvania International Airport serves as a vital low-cost gateway into central Transylvania.',
    heroImage: localImages.targuMuresFortress,
    heroImageCredit: {
      type: 'owner',
      name: 'The Traveller'
    },
    heroImageAlt: 'Târgu Mureș Medieval Fortress ramparts, stone bastions, and the Gothic Reformed Citadel Church',
    gallery: [
      {
        url: localImages.targuMuresFortress,
        caption: 'The medieval fortress ramparts and green park in central Târgu Mureș.',
        alt: 'Târgu Mureș Citadel'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Palatul_Culturii_din_T%C3%A2rgu_Mure%C8%99_01.jpg',
        caption: 'The Art Nouveau Palace of Culture in central Târgu Mureș.',
        alt: 'Palace of Culture Târgu Mureș'
      }
    ],
    goodToKnow: {
      location: 'Mureș County, Central Transylvania',
      region: 'Transylvania',
      bestFor: ['Secessionist Stained Glass Art', 'Medieval Citadel Walks', 'Rare Historic Books', 'Proximity to Sighișoara & Sovata'],
      recommendedTime: '1 - 2 Days (Ideal base to fly in and explore Central Transylvania)',
      bestTime: 'May to October for vibrant garden terraces in Roses Square',
      gettingThere: 'Transylvania Târgu Mureș Airport (TGM) with direct flights from London, Dortmund, Memmingen, and Budapest; 50 min drive to Sighișoara',
      carNeeded: 'Not inside city; car recommended for visiting nearby Sovata Bear Lake or Saschiz',
      familyFriendly: true,
      nearestGatewayCity: 'Târgu Mureș (TGM Airport is 14 km southwest of city centre)',
      elevation: '320 m',
      languagesSpoken: ['Romanian', 'Hungarian', 'English', 'German'],
      currency: 'Romanian Leu (RON)'
    },
    categoryIds: ['historic-cities', 'churches-monasteries', 'castles-fortresses'],
    coordinates: {
      lat: 46.5425,
      lng: 24.5575,
      xPercent: 48.0,
      yPercent: 38.0
    },
    featured: true,
    nearbyDestinationIds: ['sighisoara', 'praid-salt-mine', 'biertan', 'cluj-napoca'],
    relatedArticleIds: ['saxons-of-transylvania', 'transylvania-road-trip'],
    questions: [
      {
        id: 'tgm-q1',
        question: 'What makes the Palace of Culture (Palatul Culturii) so famous?',
        answer: 'The Palace of Culture (1911-1913) is a Hungarian Secessionist masterpiece designed by Marcell Komor and Dezső Jakab. Its highlight is the Mirror Hall (Sala Oglinzilor) featuring 12 monumental stained-glass windows by Sándor Nagy depicting Transylvanian folk ballads and fairy tales, paired with Carrara marble mirrors and Venetian crystal chandeliers.',
        tips: ['Take time to inspect the intricate details in the stained glass depicting the ballad of Master Manole and Beautiful Ilona.']
      },
      {
        id: 'tgm-q2',
        question: 'What is the Teleki-Bolyai Library?',
        answer: 'Founded in 1802 by Count Sámuel Teleki, it is one of the richest historic book collections in Eastern Europe, housing over 200,000 rare volumes, incunabula, original manuscripts, and the mathematical heritage of János Bolyai (co-founder of non-Euclidean geometry).',
        tips: ['The library maintains its original 19th-century polished oak bookcases and reading desks.']
      }
    ],
    pois: [
      {
        id: 'poi-palace-of-culture-tgm',
        name: 'Palace of Culture & Mirror Hall',
        romanianName: 'Palatul Culturii & Sala Oglinzilor',
        slug: 'palace-of-culture-targu-mures',
        destinationId: 'targu-mures',
        coordinates: { lat: 46.5428, lng: 24.5583 },
        category: 'Architecture',
        shortDescription: 'Art Nouveau triumph featuring the famous Stained Glass Mirror Hall and Zsolnay mosaics.',
        whyInteresting: 'One of the finest Secessionist interiors in Europe, with 12 handcrafted stained-glass allegorical masterworks.',
        heroImage: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Palatul_Culturii_din_T%C3%A2rgu_Mure%C8%99_01.jpg',
        imageAlt: 'Palace of Culture Targu Mures',
        visitDuration: '1.5 hours',
        admissionNotes: 'Ticket required for palace interior'
      },
      {
        id: 'poi-medieval-fortress-tgm',
        name: 'Târgu Mureș Medieval Fortress',
        romanianName: 'Cetatea Medievală Târgu Mureș',
        slug: 'medieval-fortress-targu-mures',
        destinationId: 'targu-mures',
        coordinates: { lat: 46.5467, lng: 24.5658 },
        category: 'Castles & Fortresses',
        shortDescription: '17th-century bastion fortress enclosing the Gothic Reformed Church and peaceful gardens.',
        whyInteresting: 'Preserved stone guild bastions (Butchers’, Tanners’, and Locksmiths’ bastions) set within a vibrant cultural park.',
        heroImage: localImages.targuMuresFortress,
        imageAlt: 'Medieval Fortress Targu Mures',
        visitDuration: '1 hour',
        admissionNotes: 'Free park entry; museum exhibits small fee'
      },
      {
        id: 'poi-teleki-library',
        name: 'Teleki-Bolyai Historic Library',
        romanianName: 'Biblioteca Teleki-Bolyai',
        slug: 'teleki-bolyai-library',
        destinationId: 'targu-mures',
        coordinates: { lat: 46.5414, lng: 24.5642 },
        category: 'Museum',
        shortDescription: 'One of Eastern Europe’s oldest public libraries holding over 200,000 rare volumes and incunabula.',
        whyInteresting: 'Founded in 1802, housing original 15th-century Gutenberg-era prints and mathematician Bolyai’s manuscripts.',
        heroImage: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Palatul_Culturii_din_T%C3%A2rgu_Mure%C8%99_01.jpg',
        imageAlt: 'Teleki Library interior',
        visitDuration: '45 minutes'
      }
    ]
  },
  {
    id: 'oradea',
    name: 'Oradea',
    romanianName: 'Oradea',
    hungarianName: 'Nagyvárad',
    germanName: 'Großwardein',
    slug: 'oradea',
    regionId: 'crisana',
    regionName: 'Crișana & Western Gate',
    gatewayCityId: 'oradea',
    gatewayCityName: 'Oradea (OMR Airport)',
    tagline: 'The Art Nouveau capital of Romania and geothermal wellness gateway',
    shortDescription: 'A stunning Western Romanian city on the Crișul Repede river, renowned for the iconic Black Eagle Palace passage, star-shaped Renaissance fortress, and nearby natural geothermal lotus waters of Băile Felix.',
    fullIntroduction: 'Bordering Central Europe, Oradea is an open-air museum of Secessionist, Baroque, and Eclectic architecture. The city’s centrepiece is Union Square (Piața Unirii), anchored by the Black Eagle Palace (Palatul Vulturul Negru) with its curved glass-vaulted gallery reminiscent of Milan’s Galleria Vittorio Emanuele. Just 8 kilometres away lies Băile Felix, Romania’s most famous thermal spa resort powered by natural 49°C mineral springs where rare thermal water lilies (Nymphaea lotus thermalis) have bloomed continuously since the Ice Age.',
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Palatul_Vulturul_Negru_Oradea.jpg/1280px-Palatul_Vulturul_Negru_Oradea.jpg',
    heroImageCredit: {
      type: 'sourced',
      name: 'Dan Cristian Pădureț / Wikimedia Commons',
      license: 'CC BY-SA 4.0'
    },
    heroImageAlt: 'Oradea Union Square Black Eagle Palace and river promenade',
    gallery: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Palatul_Vulturul_Negru_Oradea.jpg/1280px-Palatul_Vulturul_Negru_Oradea.jpg',
        caption: 'The stained-glass black eagle emblem inside the glass arcade of Vulturul Negru Palace.',
        alt: 'Black Eagle Palace Oradea'
      },
      {
        url: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1200&q=80',
        caption: 'The pentagonal bastions of Oradea Fortress during golden hour.',
        alt: 'Oradea Fortress'
      }
    ],
    goodToKnow: {
      location: 'Bihor County, Crișana, Western Romania',
      region: 'Crișana & Western Gate',
      bestFor: ['Art Nouveau & Secession Architecture', 'Thermal Spa Baths (Băile Felix)', 'Star Citadel Exploration', 'Riverbank Cafes', 'Apuseni Mountain Caves'],
      recommendedTime: '2 Days (Combine city architecture with a relaxing day at Băile Felix thermal baths)',
      bestTime: 'Year-round (Thermal outdoor mineral pools remain wonderfully warm even during winter snows)',
      gettingThere: 'Oradea International Airport (OMR) with LOT Polish Airlines connections via Warsaw, HiSky, and Wizz Air; direct A3 / A1 motorway links to Hungary (10 km to border)',
      carNeeded: 'Not inside city (trams link center to Băile Felix); car is useful for Apuseni karst cave trips',
      familyFriendly: true,
      nearestGatewayCity: 'Oradea (OMR Airport is 5 km south of city centre)',
      elevation: '140 m',
      languagesSpoken: ['Romanian', 'Hungarian', 'English', 'German'],
      currency: 'Romanian Leu (RON)'
    },
    categoryIds: ['historic-cities', 'castles-fortresses', 'architecture', 'mountains-nature'],
    coordinates: {
      lat: 47.0560,
      lng: 21.9378,
      xPercent: 18.0,
      yPercent: 27.5
    },
    featured: true,
    nearbyDestinationIds: ['cluj-napoca', 'timisoara'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'ora-q1',
        question: 'What makes Oradea the Art Nouveau capital of Romania?',
        answer: 'Oradea belongs to the prestigious Réseau Art Nouveau Network alongside Barcelona, Vienna, and Brussels. Over 80 protected Art Nouveau buildings grace its riverfront and squares, marked by organic floral curves, wrought-iron balconies, stained glass, and colourful ceramic tilework.',
        tips: ['Visit the Darvas-La Roche House, Romania’s only museum dedicated entirely to the Art Nouveau lifestyle.']
      },
      {
        id: 'ora-q2',
        question: 'What is Băile Felix and the Thermal Lotus Lake?',
        answer: 'Băile Felix is Romania’s premier thermal resort just 8 km from Oradea. Its healing geothermal mineral waters (32°C - 49°C) supply modern aquaparks and wellness hotels. In the centre of the resort lies the natural thermal lake where the rare thermal water lily (Nymphaea lotus var. thermalis) grows naturally in open water all year.',
        tips: ['Swimming outdoors in the heated thermal mineral pools surrounded by winter snow is an unforgettable experience.']
      }
    ],
    pois: [
      {
        id: 'poi-black-eagle-palace',
        name: 'Black Eagle Palace & Passage',
        romanianName: 'Palatul & Pasajul Vulturul Negru',
        slug: 'black-eagle-palace-oradea',
        destinationId: 'oradea',
        coordinates: { lat: 47.0544, lng: 21.9286 },
        category: 'Architecture',
        shortDescription: 'Spectacular Secessionist shopping arcade crowned with a stained-glass black eagle skylight.',
        whyInteresting: 'Designed by architects Komor and Jakab in 1908, it features a grand Y-shaped glass-roofed pedestrian galleria lined with lively cafes.',
        heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Palatul_Vulturul_Negru_Oradea.jpg/1280px-Palatul_Vulturul_Negru_Oradea.jpg',
        imageAlt: 'Black Eagle Palace passage Oradea',
        visitDuration: '1 hour',
        admissionNotes: 'Free public passage'
      },
      {
        id: 'poi-oradea-fortress',
        name: 'Oradea Star Fortress',
        romanianName: 'Cetatea Oradea',
        slug: 'oradea-fortress',
        destinationId: 'oradea',
        coordinates: { lat: 47.0514, lng: 21.9422 },
        category: 'Castles & Fortresses',
        shortDescription: 'Monumental 5-bastion Italian Renaissance star-shaped fortress with moat and artisan courtyards.',
        whyInteresting: 'Served as the meridian zero of medieval Europe between 1445 and 1667; recently restored into a vibrant cultural and museum hub.',
        heroImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Oradea star fortress walls and bastion',
        visitDuration: '1.5 hours',
        admissionNotes: 'Free courtyard access; City Museum ticket required'
      },
      {
        id: 'poi-baile-felix',
        name: 'Băile Felix Thermal Springs & Lotus Reserve',
        romanianName: 'Stațiunea Băile Felix & Lacul cu Nuferi',
        slug: 'baile-felix-thermal-springs',
        destinationId: 'oradea',
        coordinates: { lat: 46.9880, lng: 21.9820 },
        category: 'Nature & Viewpoint',
        shortDescription: 'World-renowned geothermal spa resort and natural thermal lotus lake with 49°C mineral springs.',
        whyInteresting: 'Natural habitat of the Tertiary relic thermal water lily, offering modern outdoor thermal pools open 365 days a year.',
        heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Baile Felix thermal pool and water lilies',
        visitDuration: 'Half to Full Day',
        practicalInfo: 'Direct 15-minute bus or taxi from Oradea center.'
      }
    ]
  },
  {
    id: 'bucharest',
    name: 'Bucharest (București)',
    romanianName: 'București',
    slug: 'bucharest',
    regionId: 'wallachia',
    regionName: 'Wallachia & Southern Romania',
    gatewayCityId: 'bucharest',
    gatewayCityName: 'Bucharest (OTP / BBU Airports)',
    tagline: 'The historic capital, "Little Paris" belle époque boulevards, and colossal landmarks',
    shortDescription: 'Romania’s bustling metropolis where Belle Époque French mansions, the gargantuan Palace of the Parliament, peaceful 18th-century Eastern Orthodox monasteries, and the vibrant Old Town Lipscani converge.',
    fullIntroduction: 'First documented in 1459 by Vlad the Impaler, Bucharest earned the moniker "Little Paris of the East" (Micul Paris) around 1900 for its wide tree-lined boulevards, neoclassical palaces, and bohemian cafe lifestyle. Today, it presents a fascinating architectural contrast: the monumental Palace of the Parliament (the second-largest administrative building on Earth after the Pentagon) stands just minutes away from intimate Brâncovenesc-style monasteries like Stavropoleos and the verdant 15-hectare open-air Dimitrie Gusti National Village Museum.',
    heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=80',
    heroImageCredit: 'Bucharest Architecture Archive',
    heroImageAlt: 'Romanian Athenaeum and Bucharest historic boulevards',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Romanian Athenaeum concert hall on Calea Victoriei.',
        alt: 'Romanian Athenaeum'
      },
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
        caption: 'The monumental Palace of the Parliament and Bucharest grand boulevards.',
        alt: 'Palace of the Parliament'
      }
    ],
    goodToKnow: {
      location: 'Bucharest Municipality, Southern Romania',
      region: 'Wallachia & Southern Romania',
      bestFor: ['Grand Neoclassical & Belle Époque Architecture', 'Palace of Parliament Tour', 'Lively Old Town Dining', 'Open-Air Village Museum', 'Railway Hub for Transylvania'],
      recommendedTime: '2 - 3 Days',
      bestTime: 'April to June and September to October for lovely park strolls along Calea Victoriei',
      gettingThere: 'Henri Coandă International Airport (OTP) with non-stop 20-minute train to Gara de Nord; high-speed trains to Brașov (2h 15m) and Constanța (2h)',
      carNeeded: 'Not Needed (Metro network and rideshares are fast and inexpensive)',
      familyFriendly: true,
      nearestGatewayCity: 'Bucharest (OTP Airport, 18 km north of city centre)',
      elevation: '70 m',
      languagesSpoken: ['Romanian', 'English (fluent in hotels & restaurants)', 'French', 'Italian'],
      currency: 'Romanian Leu (RON)'
    },
    categoryIds: ['historic-cities', 'churches-monasteries', 'castles-fortresses'],
    coordinates: {
      lat: 44.4268,
      lng: 26.1025,
      xPercent: 67.0,
      yPercent: 83.0
    },
    featured: true,
    nearbyDestinationIds: ['brasov', 'danube-delta', 'cazanele-dunarii'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'buc-q1',
        question: 'What is inside the Palace of the Parliament (Palatul Parlamentului)?',
        answer: 'Commissioned by Nicolae Ceaușescu in 1984, this colossal 365,000 sq metre building contains 1,100 rooms crafted entirely from Romanian marble, solid crystal chandeliers, oak panelling, and massive hand-woven carpets. Guided tours take visitors through the monumental marble galleries and rooftop terrace.',
        tips: ['Pre-booking your guided tour online and bringing your physical passport/national ID is mandatory for entry.']
      },
      {
        id: 'buc-q2',
        question: 'What is Stavropoleos Monastery in Old Town?',
        answer: 'Built in 1724 in the heart of the Lipscani Old Town, Stavropoleos is an architectural masterpiece of the Brâncovenesc style—a synthesis of Byzantine, Ottoman, and Western Renaissance elements featuring delicate stone lacework columns, Byzantine interior frescoes, and an enchanting cloister garden.',
        tips: ['Visit during vespers to hear the resident nuns chanting authentic Byzantine choral hymns.']
      }
    ],
    pois: [
      {
        id: 'poi-palace-of-parliament',
        name: 'Palace of the Parliament',
        romanianName: 'Palatul Parlamentului (Casa Poporului)',
        slug: 'palace-of-parliament-bucharest',
        destinationId: 'bucharest',
        coordinates: { lat: 44.4275, lng: 26.0875 },
        category: 'Historic Landmark',
        shortDescription: 'The 2nd largest administrative building in the world, built from solid Romanian marble and crystal.',
        whyInteresting: 'An unbelievable monument of 20th-century megalomania with 12 above-ground floors, nuclear bunkers, and 3,500 tonnes of crystal.',
        heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Palace of the Parliament Bucharest',
        visitDuration: '1.5 - 2 hours (Guided tour)',
        admissionNotes: 'Guided tour ticket required. Passport required.'
      },
      {
        id: 'poi-romanian-athenaeum',
        name: 'The Romanian Athenaeum',
        romanianName: 'Ateneul Român',
        slug: 'romanian-athenaeum-bucharest',
        destinationId: 'bucharest',
        coordinates: { lat: 44.4414, lng: 26.0972 },
        category: 'Architecture',
        shortDescription: 'Neoclassical concert hall on Calea Victoriei featuring a 75-metre circular historical fresco.',
        whyInteresting: 'Home of the George Enescu Philharmonic and national symbol of Romanian culture, built by public subscription in 1888.',
        heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Romanian Athenaeum concert hall',
        visitDuration: '45 minutes',
        admissionNotes: 'Modest entrance fee for daytime viewing when no rehearsals are active'
      },
      {
        id: 'poi-stavropoleos-monastery',
        name: 'Stavropoleos Monastery',
        romanianName: 'Mănăstirea Stavropoleos',
        slug: 'stavropoleos-monastery',
        destinationId: 'bucharest',
        coordinates: { lat: 44.4319, lng: 26.0989 },
        category: 'Church & Religion',
        shortDescription: '18th-century Brâncovenesc architectural jewel in the heart of Old Town Lipscani.',
        whyInteresting: 'Exquisite stone-carved portico, peaceful cloister garden lined with 300-year-old tombstones, and Byzantine chanting.',
        heroImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Stavropoleos Monastery courtyard',
        visitDuration: '30 minutes',
        admissionNotes: 'Free entry'
      },
      {
        id: 'poi-village-museum-bucharest',
        name: 'Dimitrie Gusti National Village Museum',
        romanianName: 'Muzeul Național al Satului „Dimitrie Gusti”',
        slug: 'village-museum-bucharest',
        destinationId: 'bucharest',
        coordinates: { lat: 44.4719, lng: 26.0764 },
        category: 'Museum',
        shortDescription: 'Sprawling lakeside open-air museum preserving over 300 authentic historic peasant homesteads.',
        whyInteresting: 'Transports visitors across centuries of Romanian rural life with authentic wooden windmills, watermills, and thatch cottages.',
        heroImage: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Village Museum Bucharest traditional houses',
        visitDuration: '2 - 3 hours',
        admissionNotes: 'Ticket required for museum entry'
      }
    ]
  },
  {
    id: 'iasi',
    name: 'Iași',
    romanianName: 'Iași',
    slug: 'iasi',
    regionId: 'moldavia',
    regionName: 'Moldavia',
    gatewayCityId: 'iasi',
    gatewayCityName: 'Iași (IAS Airport)',
    tagline: 'The cultural soul of Moldavia and city of monumental palaces',
    shortDescription: 'The eastern capital of Romania, famous for the breathtaking Neo-Gothic Palace of Culture, the Metropolitan Cathedral of Saint Parascheva, Romania’s oldest university, and centuries of literary heritage.',
    fullIntroduction: 'Serving as the historic capital of the Principality of Moldavia from 1564 to 1859 and as the wartime capital of Romania during World War I, Iași is steeped in culture and prestige. The monumental Palace of Culture dominates the city with 298 rooms housing four major national museums. Known as the "City of 100 Churches," Iași is also home to the 17th-century Trei Ierarhi Church with its unique intricately carved stone lacework facade where no two decorative stone bands are identical.',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80',
    heroImageCredit: 'Iași Palace Archive',
    heroImageAlt: 'Palace of Culture in Iasi with gardens and clock tower',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Neo-Gothic spires of the Palace of Culture in central Iași.',
        alt: 'Palace of Culture Iasi'
      }
    ],
    goodToKnow: {
      location: 'Iași County, Moldavia, Eastern Romania',
      region: 'Moldavia',
      bestFor: ['Palace of Culture & Museums', 'Orthodox Spiritual Heritage', 'University Culture & Parks', 'Moldavian Wine Routes'],
      recommendedTime: '2 Days',
      bestTime: 'May to October for mild weather and lively student cafe terraces',
      gettingThere: 'Iași International Airport (IAS) with flights from Vienna, Rome, London, Paris, and Milan; direct daily express trains from Bucharest',
      carNeeded: 'Not inside city; useful for Cotnari vineyard day trips',
      familyFriendly: true,
      nearestGatewayCity: 'Iași (IAS Airport is 8 km from city centre)',
      elevation: '75 m',
      languagesSpoken: ['Romanian', 'English', 'French'],
      currency: 'Romanian Leu (RON)'
    },
    categoryIds: ['historic-cities', 'churches-monasteries', 'castles-fortresses'],
    coordinates: {
      lat: 47.1585,
      lng: 27.6014,
      xPercent: 82.5,
      yPercent: 23.5
    },
    featured: true,
    nearbyDestinationIds: ['bucovina'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'ias-q1',
        question: 'What is the Palace of Culture in Iași?',
        answer: 'Completed in 1925 in flamboyant Neo-Gothic style on the ruins of the medieval Princely Court, the Palace of Culture is an architectural triumph with a 55-metre clock tower with carillon chimes. It houses the Art Museum, History Museum of Moldavia, Ethnographic Museum, and Science Museum.',
        tips: ['Climb the Clock Tower for panoramic vistas over Iași and the Moldavian rolling hills.']
      },
      {
        id: 'ias-q2',
        question: 'What is unique about the Three Holy Hierarchs Monastery (Mănăstirea Sfinții Trei Ierarhi)?',
        answer: 'Erected between 1637 and 1639 by Prince Vasile Lupu, this church is completely wrapped in intricate stone reliefs combining Byzantine, Gothic, Armenian, and Persian decorative motifs. Legend states the entire exterior was originally gilded in pure gold.',
        tips: ['Examine the 30 continuous horizontal friezes carved into the white stone facade.']
      }
    ],
    pois: [
      {
        id: 'poi-palace-of-culture-iasi',
        name: 'Palace of Culture Iași',
        romanianName: 'Palatul Culturii din Iași',
        slug: 'palace-of-culture-iasi',
        destinationId: 'iasi',
        coordinates: { lat: 47.1572, lng: 27.5869 },
        category: 'Architecture',
        shortDescription: 'Monumental 298-room Neo-Gothic palace housing four national museums.',
        whyInteresting: 'Masterwork of Romanian architect I.D. Berindey with clock carillon playing the Romanian national union anthem.',
        heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Palace of Culture Iasi',
        visitDuration: '2 hours',
        admissionNotes: 'Ticket required for museum complex'
      },
      {
        id: 'poi-trei-ierarhi-church',
        name: 'Three Holy Hierarchs Monastery',
        romanianName: 'Mănăstirea Sfinții Trei Ierarhi',
        slug: 'trei-ierarhi-monastery',
        destinationId: 'iasi',
        coordinates: { lat: 47.1594, lng: 27.5853 },
        category: 'Church & Religion',
        shortDescription: '17th-century church completely wrapped in stone lacework reliefs.',
        whyInteresting: 'Famous for its 30 horizontal bands of non-repeating carved stone filigree combining Persian, Byzantine, and Gothic motifs.',
        heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Trei Ierarhi monastery facade',
        visitDuration: '45 minutes'
      }
    ]
  },
  {
    id: 'praid-salt-mine',
    name: 'Praid Salt Mine & Salt Country',
    romanianName: 'Salina Praid & Ținutul Sării',
    hungarianName: 'Parajdi Sóbánya & Sóvidék',
    slug: 'praid-salt-mine',
    regionId: 'transylvania',
    regionName: 'Transylvania',
    gatewayCityId: 'targu-mures',
    gatewayCityName: 'Târgu Mureș (TGM Airport - 55 km)',
    tagline: 'Colossal subterranean healing salt city, underground chapel & salt canyon',
    shortDescription: 'One of Europe’s largest subterranean salt bodies, featuring a vast subterranean world 120 metres underground with an ecumenical salt-carved church, high-ionization halotherapy chambers, wine tasting cellars, and the unique outdoor Praid Salt Canyon.',
    fullIntroduction: 'Nestled in the heart of Transylvania’s "Salt Country" (Ținutul Sării / Sóvidék) at the base of the Gurghiu Mountains, Salina Praid sits atop an immense diapiric salt body extending nearly 3 kilometres deep into the earth. Mined since Roman antiquity, Praid transformed its subterranean horizons into an expansive underground wellness haven. Visitors travel by dedicated electric buses deep into the mountain, stepping out into colossal 14-metre-high chambers where the ionized microclimate offers renowned respiratory relief. Down below lies Saint John of Nepomuk ecumenical church carved directly into solid rock salt, an underground adventure park, museum, and cafe.',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
    heroImageCredit: 'Salina Praid Archive',
    heroImageAlt: 'Salina Praid subterranean salt cavern and illuminated chamber',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
        caption: 'The vast subterranean halls of Salina Praid 120 metres underground.',
        alt: 'Salina Praid subterranean hall'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'The dramatic white salt ridges and karst spires of Praid Salt Canyon.',
        alt: 'Praid Salt Canyon'
      }
    ],
    goodToKnow: {
      location: 'Praid (Parajd), Harghita County, Central Transylvania',
      region: 'Transylvania',
      bestFor: ['Subterranean Halotherapy', 'Respiratory Health', 'Underground Salt Church', 'Salt Canyon Hiking', 'Family Outings'],
      recommendedTime: '3 to 5 Hours (Combine underground halotherapy with Salt Canyon hike and Sovata Bear Lake)',
      bestTime: 'Year-round (Constant 15–16°C pleasant temperature underground in all seasons)',
      gettingThere: '55 km east of Târgu Mureș (1 hour drive); 10 km from Sovata spa resort; regular buses link Târgu Mureș and Praid',
      carNeeded: 'Recommended for exploring Salt Country and Sovata; buses connect from Târgu Mureș',
      familyFriendly: true,
      nearestGatewayCity: 'Târgu Mureș (Transylvania Airport TGM, 58 km)',
      elevation: 'Ground: 520 m / Subterranean horizon: -120 m',
      languagesSpoken: ['Hungarian', 'Romanian', 'English'],
      currency: 'Romanian Leu (RON)',
      unescoStatus: 'National Geological & Speleological Reserve'
    },
    categoryIds: ['mountains-nature', 'historic-cities'],
    coordinates: {
      lat: 46.5542,
      lng: 25.1278,
      xPercent: 52.5,
      yPercent: 37.0
    },
    featured: true,
    nearbyDestinationIds: ['targu-mures', 'sighisoara', 'cluj-napoca'],
    relatedArticleIds: ['transylvania-road-trip'],
    questions: [
      {
        id: 'praid-q1',
        question: 'How do you enter the Praid Salt Mine?',
        answer: 'Visitors board specialised transport buses at the main surface entrance that drive 1.25 kilometres through a winding subterranean tunnel down to the Horizon 50 level, where visitors descend a comfortable flight of wooden stairs into the vast main chambers 120 metres underground.',
        tips: ['The underground temperature is a constant 15–16°C (59–61°F), so bring a light fleece or sweater even during mid-summer heat.']
      },
      {
        id: 'praid-q2',
        question: 'What are the health benefits of visiting Salina Praid?',
        answer: 'The subterranean air in Praid is rich in ionised sodium chloride aerosols, virtually free of atmospheric pollutants, allergens, and dust, with a constant high relative humidity (approx. 70%). It is widely prescribed by European pulmonologists for treating asthma, chronic bronchitis, and allergic rhinitis.',
        tips: ['A recommended halotherapy session is 2 to 4 hours of relaxed walking or resting in the underground chambers.']
      }
    ],
    pois: [
      {
        id: 'poi-salina-praid-mine',
        name: 'Salina Praid Subterranean City & Salt Church',
        romanianName: 'Salina Praid & Capela Ecumenică',
        hungarianName: 'Parajdi Sóbánya & Ökumenikus Kápolna',
        slug: 'salina-praid-mine',
        destinationId: 'praid-salt-mine',
        coordinates: { lat: 46.5542, lng: 25.1278 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Colossal subterranean wellness world 120 metres underground with an ecumenical church carved into rock salt, adventure rope park, and halotherapy halls.',
        whyInteresting: 'Carved inside an ancient salt mountain with 14-metre-high vaulted chambers, featuring the underground Saint John of Nepomuk Chapel where services in Romanian, Hungarian, and German are held.',
        heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Salina Praid underground church and salt chambers',
        visitDuration: '2.5 - 3.5 hours',
        admissionNotes: 'Admission includes bus transfer down into the mine'
      },
      {
        id: 'poi-praid-salt-canyon',
        name: 'Praid Salt Canyon & Salt Mountain Nature Reserve',
        romanianName: 'Canionul de Sare & Muntele de Sare Praid',
        hungarianName: 'Sószoros & Sóbérc Természetvédelmi Terület',
        slug: 'praid-salt-canyon',
        destinationId: 'praid-salt-mine',
        coordinates: { lat: 46.5572, lng: 25.1311 },
        category: 'Nature & Viewpoint',
        shortDescription: 'Unique geological nature reserve showcasing gleaming white salt spires, saline springs, and mud bathing pools along the Corund stream.',
        whyInteresting: 'One of the world’s rare outdoor salt karst landscapes where pure salt crystals surface directly on the ground, creating white cliffs and therapeutic brine baths.',
        heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Praid Salt Canyon white cliffs and stream',
        visitDuration: '1.5 - 2 hours',
        admissionNotes: 'Modest eco-trail entry fee'
      }
    ]
  }
];

/**
 * Unified destinations with canonical photography and verified photo credits
 */
export const destinations: Destination[] = rawDestinations.map((d) => {
  const media = getCanonicalLocationMedia(d.id);
  const updatedPois = d.pois.map((p) => {
    const poiMedia = getCanonicalLocationMedia(p.id);
    return {
      ...p,
      heroImage: poiMedia.heroImage,
      imageAlt: poiMedia.heroImageAlt || p.imageAlt,
      imageCredit: poiMedia.credit || media.credit
    };
  });
  return {
    ...d,
    heroImage: media.heroImage,
    heroImageAlt: media.heroImageAlt || d.heroImageAlt,
    heroImageCredit: media.credit,
    gallery: media.gallery && media.gallery.length > 0 ? media.gallery : d.gallery,
    pois: updatedPois
  };
});

// Helper functions for easy cross-referencing
export const getAllDestinations = (): Destination[] => destinations;

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return destinations.find(d => d.slug === slug || d.id === slug);
};

export const getAllPOIs = (): POI[] => {
  return destinations.flatMap(d => d.pois);
};

export const getPOIById = (poiId: string): { poi: POI; destination: Destination } | undefined => {
  for (const dest of destinations) {
    const found = dest.pois.find(p => p.id === poiId || p.slug === poiId);
    if (found) return { poi: found, destination: dest };
  }
  return undefined;
};
