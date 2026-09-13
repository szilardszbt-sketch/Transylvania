export interface SourcedPhotoItem {
  dish?: string;
  label: string;
  author: string;
  license: string;
  sourceUrl?: string;
}

export interface PhotoCredit {
  type: 'owner' | 'visitor' | 'sourced';
  name: string;
  sourceUrl?: string;
  license?: string;
  items?: SourcedPhotoItem[];
}

export function formatPhotoCredit(credit?: PhotoCredit | string | null): string {
  if (!credit) return '';
  if (typeof credit === 'string') return credit;
  if (credit.items && credit.items.length > 0) {
    return credit.items.map(i => `${i.label}: ${i.author} (${i.license})`).join(' · ');
  }
  if (credit.type === 'owner') {
    return `Photo: ${credit.name || 'The Traveller'}`;
  }
  if (credit.type === 'visitor') {
    return `Photo: ${credit.name}`;
  }
  if (credit.type === 'sourced') {
    const parts: string[] = [];
    if (credit.name) parts.push(credit.name);
    if (credit.license) parts.push(credit.license);
    if (parts.length > 0) return parts.join(' / ');
    return 'Wikimedia Commons';
  }
  return credit.name || '';
}

export interface Region {
  id: string;
  name: string;
  romanianName: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroImageCredit?: PhotoCredit | string;
  status: 'active' | 'coming-soon';
  character: string;
}

export interface GatewayCity {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  description: string;
  heroImage: string;
  heroImageAlt?: string;
  heroImageCredit?: PhotoCredit | string;
  hasAirport: boolean;
  airportName?: string;
  airportCode?: string;
  transportHighlights: string[];
  distanceToCore: string;
  coordinates?: Coordinates;
  airlines?: string[];
  internationalDestinations?: string[];
  connectedAttractions?: string[];
  itineraryRole?: string;
}

export interface InterestCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  count?: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
  xPercent?: number; // For responsive SVG Romania Map
  yPercent?: number;
}

export interface POI {
  id: string;
  name: string;
  romanianName?: string;
  hungarianName?: string;
  germanName?: string;
  slug: string;
  destinationId: string;
  coordinates: Coordinates;
  category: 'Historic Landmark' | 'Architecture' | 'Tower & Defense' | 'Church & Religion' | 'Square & Street' | 'Museum' | 'Nature & Viewpoint' | 'Food & Drink' | 'Castles & Fortresses' | string;
  shortDescription: string;
  whyInteresting: string;
  visitorTitle?: string;
  visitorExperience?: string;
  heroImage: string;
  imageAlt: string;
  imageCredit?: PhotoCredit | string;
  practicalInfo?: string;
  visitDuration?: string;
  admissionNotes?: string;
  isCommunityAdded?: boolean;
  approvalStatus?: 'approved' | 'pending' | 'rejected';
  submittedBy?: string;
  submittedAt?: string;
}

export interface POISubmission {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  submittedBy: string;
  poi: POI;
  destinationName: string;
  regionName: string;
  visitorTitle?: string;
  visitorExperience?: string;
  photoUrl?: string;
  aiResearched?: boolean;
  adminNotes?: string;
  emailNotificationSentTo: string;
  emailSent?: boolean;
  emailStatus?: 'delivered' | 'failed' | 'pending_config';
}

export interface EmailNotificationLog {
  id: string;
  to: string;
  subject: string;
  sentAt: string;
  submissionId: string;
  poiName: string;
  status: 'delivered' | 'opened' | 'actioned';
  previewText: string;
}

export interface DestinationQuestion {
  id: string;
  question: string;
  answer: string;
  image?: string;
  imageCaption?: string;
  tips?: string[];
}

export interface GoodToKnow {
  location: string;
  region: string;
  bestFor: string[];
  recommendedTime: string;
  bestTime: string;
  gettingThere: string;
  carNeeded: string;
  familyFriendly: boolean;
  nearestGatewayCity: string;
  elevation?: string;
  languagesSpoken: string[];
  currency: string;
  unescoStatus?: string;
}

export interface Destination {
  id: string;
  name: string;
  romanianName?: string;
  germanName?: string;
  hungarianName?: string;
  slug: string;
  regionId: string;
  regionName: string;
  gatewayCityId: string;
  gatewayCityName: string;
  tagline: string;
  shortDescription: string;
  fullIntroduction: string;
  heroImage: string;
  heroImageCredit?: PhotoCredit | string;
  heroImageAlt: string;
  gallery: Array<{
    url: string;
    caption: string;
    credit?: PhotoCredit | string;
    alt: string;
  }>;
  goodToKnow: GoodToKnow;
  questions: DestinationQuestion[];
  pois: POI[];
  nearbyDestinationIds: string[];
  relatedArticleIds: string[];
  categoryIds: string[];
  coordinates: Coordinates;
  featured?: boolean;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  bio: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  type: 'history' | 'culture' | 'blog' | 'itinerary' | 'practical';
  category: string;
  excerpt: string;
  content: string; // Markdown or structured blocks
  publishedDate: string;
  readTime: string;
  author: ArticleAuthor;
  heroImage: string;
  heroImageCredit?: PhotoCredit | string;
  heroImageAlt: string;
  relatedDestinationIds?: string[];
  relatedArticleIds?: string[];
  tags: string[];
  featured?: boolean;
}

export interface PracticalGuide {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  summary: string;
  content: string;
  readTime: string;
  keyTakeaways: string[];
  faqs?: Array<{ q: string; a: string }>;
}

export interface WordPressTag {
  id: number;
  count?: number;
  description?: string;
  link?: string;
  name: string;
  slug: string;
  taxonomy?: string;
}

export interface WordPressPost {
  id: number | string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml?: string;
  date: string;
  formattedDate: string;
  link: string;
  heroImage: string;
  heroImageAlt?: string;
  heroImageCredit?: PhotoCredit | string;
  authorName: string;
  categoryName?: string;
  tags: string[];
  tagIds?: number[];
  readTime: string;
}

