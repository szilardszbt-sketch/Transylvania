import { InterestCategory } from '../types';
import { localImages } from '../assets/images';

export const categories: InterestCategory[] = [
  {
    id: 'historic-cities',
    name: 'Historic Cities',
    slug: 'historic-cities',
    description: 'Medieval merchant citadels, Habsburg plazas, and vibrant pedestrian centres.',
    iconName: 'Building2',
    image: localImages.sibiuGrandSquare,
    count: 12
  },
  {
    id: 'medieval-villages',
    name: 'Medieval Villages',
    slug: 'medieval-villages',
    description: 'Cobblestone lanes, pastoral Saxon homesteads, and preserved artisan traditions.',
    iconName: 'Home',
    image: localImages.viscriChurch,
    count: 18
  },
  {
    id: 'castles-fortresses',
    name: 'Castles & Fortresses',
    slug: 'castles-fortresses',
    description: 'Clifftop citadels, Gothic royal keeps, and hilltop medieval defence strongholds.',
    iconName: 'Shield',
    image: localImages.corvinCastle,
    count: 14
  },
  {
    id: 'churches-monasteries',
    name: 'Churches & Monasteries',
    slug: 'churches-monasteries',
    description: 'UNESCO fortified Saxon churches, wooden belfries, and frescoed sanctuaries.',
    iconName: 'Church',
    image: localImages.biertanChurch,
    count: 22
  },
  {
    id: 'mountains-nature',
    name: 'Mountains & Nature',
    slug: 'mountains-nature',
    description: 'High Carpathian alpine ridges, virgin beech forests, and dramatic limestone gorges.',
    iconName: 'Mountain',
    image: localImages.transfagarasan,
    count: 16
  },
  {
    id: 'food-culture',
    name: 'Food & Culture',
    slug: 'food-culture',
    description: 'Slow-food Saxon and Romanian farmhouse dining, wine regions, and artisan crafts.',
    iconName: 'Utensils',
    image: localImages.romanianFoodCollage,
    count: 9
  }
];
