export type CarCategory = 'all' | 'hypercar' | 'sedan' | 'suv' | 'roadster';
export type ViewAngle = 'front34' | 'side' | 'rear' | 'interior' | 'aerodynamics';
export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  finish: 'metallic' | 'matte' | 'pearlescent' | 'carbon';
  price: number;
}
export interface WheelOption {
  id: string;
  name: string;
  size: string;
  finish: string;
  price: number;
  image?: string;
}
export interface InteriorOption {
  id: string;
  name: string;
  material: string;
  hex: string;
  accentHex: string;
  price: number;
}
export interface AmbientLightingOption {
  id: string;
  name: string;
  hex: string;
}
export interface OptionPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
}
export interface CarSpecs {
  acceleration: string; // e.g. "1.78s"
  accelerationNum: number; // 1.78
  topSpeed: string; // "250 mph"
  topSpeedNum: number; // 250
  range: string; // "620 mi"
  rangeNum: number; // 620
  power: string; // "1,450 HP"
  powerNum: number; // 1450
  torque: string; // "1,600 Nm"
  batteryCapacity: string; // "130 kWh"
  chargingSpeed: string; // "12 min (10-80%)"
  driveType: string; // "Tri-Motor All-Wheel Drive"
  dragCoefficient: string; // "0.19 Cd"
  curbWeight: string; // "4,380 lbs"
  cargoVolume: string; // "26.4 cu ft"
  seating: number;
}
export interface CarModel {
  id: string;
  name: string;
  series: string;
  tagline: string;
  category: CarCategory;
  basePrice: number;
  image: string;
  heroImage: string;
  description: string;
  specs: CarSpecs;
  colors: PaintColor[];
  wheels: WheelOption[];
  interiors: InteriorOption[];
  packages: OptionPackage[];
  blueprintPoints: { title: string; desc: string; x: number; y: number }[];
  highlights: string[];
}
export interface TestDriveBooking {
  modelId: string;
  modelName: string;
  experienceType: 'track' | 'vip-showroom' | 'concierge-delivery';
  locationCity: string;
  date: string;
  timeSlot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  driversLicense: string;
  bookingRef: string;
}
export interface ShowroomLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  type: 'flagship' | 'experience-center' | 'megacharger-hub';
  stallsAvailable: number;
  totalStalls: number;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  amenities: string[];
}
export interface CustomerReview {
  id: string;
  author: string;
  title: string;
  rating: number;
  model: string;
  comment: string;
  outlet?: string;
  verifiedOwner: boolean;
  date: string;
}
