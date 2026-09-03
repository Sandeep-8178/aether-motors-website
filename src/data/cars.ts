import { CarModel, ShowroomLocation, CustomerReview, PaintColor, WheelOption, InteriorOption, OptionPackage, AmbientLightingOption } from '../types';

export const GLOBAL_COLORS: PaintColor[] = [
  { id: 'obsidian', name: 'Obsidian Midnight Carbon', hex: '#0B0F19', secondaryHex: '#1E293B', finish: 'metallic', price: 0 },
  { id: 'cyan-pulse', name: 'Electric Hyper-Cyan', hex: '#00D2FF', secondaryHex: '#00F0FF', finish: 'metallic', price: 2500 },
  { id: 'nebula-crimson', name: 'Crimson Nebula Pearl', hex: '#E11D48', secondaryHex: '#FB7185', finish: 'pearlescent', price: 3200 },
  { id: 'liquid-quicksilver', name: 'Liquid Titanium Quicksilver', hex: '#94A3B8', secondaryHex: '#CBD5E1', finish: 'metallic', price: 1800 },
  { id: 'ghost-white', name: 'Satin Ghost White Matte', hex: '#F8FAFC', secondaryHex: '#E2E8F0', finish: 'matte', price: 3800 },
  { id: 'emerald-speed', name: 'Emerald Hyperion Green', hex: '#059669', secondaryHex: '#34D399', finish: 'pearlescent', price: 2800 },
];

export const GLOBAL_WHEELS: WheelOption[] = [
  { id: 'aero-22', name: '22" Cyber-Aero Carbon Blades', size: '22 inch', finish: 'Forged Carbon Fiber & Tungsten Lip', price: 0 },
  { id: 'v-spoke-21', name: '21" Forged V-Matrix Lightweight', size: '21 inch', finish: 'Gloss Satin Bronze-Titanium', price: 3500 },
  { id: 'stealth-20', name: '20" Monoblock Stealth Track Rim', size: '20 inch', finish: 'Matte Obsidian Shadow', price: 4200 },
];

export const GLOBAL_INTERIORS: InteriorOption[] = [
  { id: 'stealth-alcantara', name: 'Stealth Carbon Alcantara', material: 'Recycled Micro-Alcantara & Matte Forged Carbon', hex: '#1E293B', accentHex: '#00F0FF', price: 0 },
  { id: 'tuscan-leather', name: 'Imperial Tuscan Saddle Leather', material: 'Full-Grain Italian Aniline Leather & Open-Pore Walnut', hex: '#92400E', accentHex: '#F59E0B', price: 4500 },
  { id: 'arctic-ceramic', name: 'Arctic Ceramic Pure Minimalist', material: 'Stain-Resistant Bio-Leather & White Ceramic Trim', hex: '#F1F5F9', accentHex: '#8B5CF6', price: 3800 },
];

export const AMBIENT_LIGHTING: AmbientLightingOption[] = [
  { id: 'cyan', name: 'Cyber Neon Cyan', hex: '#00F0FF' },
  { id: 'violet', name: 'Nebula Violet', hex: '#A855F7' },
  { id: 'amber', name: 'Solaris Gold', hex: '#F59E0B' },
  { id: 'crimson', name: 'Apex Track Crimson', hex: '#FF2E63' },
  { id: 'emerald', name: 'Bio-Matrix Green', hex: '#10B981' },
];

export const CAR_MODELS: CarModel[] = [
  {
    id: 'spectre-gt',
    name: 'SPECTRE GT',
    series: 'Apex Series 01',
    tagline: 'The Pinnacle of Pure Electric Hyper-Velocity',
    category: 'hypercar',
    basePrice: 189000,
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1800&q=85',
    description: 'Engineered without compromise. The Spectre GT combines a 1,450-horsepower tri-motor hyperdrive with quantum solid-state battery architecture to redefine physical performance limits.',
    specs: {
      acceleration: '1.78s',
      accelerationNum: 1.78,
      topSpeed: '250 mph',
      topSpeedNum: 250,
      range: '620 mi',
      rangeNum: 620,
      power: '1,450 HP',
      powerNum: 1450,
      torque: '1,680 Nm',
      batteryCapacity: '135 kWh Quantum Cell',
      chargingSpeed: '12 min (10-80%)',
      driveType: 'Tri-Motor Torque Vectoring AWD',
      dragCoefficient: '0.19 Cd',
      curbWeight: '4,150 lbs',
      cargoVolume: '18.2 cu ft',
      seating: 2,
    },
    colors: GLOBAL_COLORS,
    wheels: GLOBAL_WHEELS,
    interiors: GLOBAL_INTERIORS,
    packages: [
      { id: 'track-aero', name: 'Apex Track Aero Matrix', description: 'Active carbon rear wing, front splitter air ducting, and 420mm Carbon-Ceramic Brembo brakes.', price: 18500, badge: 'Track Ready' },
      { id: 'neural-autopilot', name: 'Aether Neural Pilot 4.0 Pro', description: 'Triple 360° Solid-State LiDAR, 12 HDR cameras, Level 4 Highway & Track Co-pilot.', price: 12000, badge: 'Autonomous L4' },
      { id: 'studio-audio', name: 'Acoustic Quantum 26-Speaker 3D Audio', description: '2,200W bespoke Bang & Olufsen spatial acoustics with active road noise cancellation.', price: 6500 },
    ],
    blueprintPoints: [
      { title: 'Active Ground Diffuser', desc: 'Underbody active venturi tunnels generating 1,200kg downforce at 180mph.', x: 80, y: 70 },
      { title: 'Quantum Cell Architecture', desc: 'Structural 800V battery pack integrated directly into the carbon monocoque.', x: 50, y: 80 },
      { title: 'Neural LiDAR Cluster', desc: 'Sub-millimeter solid-state sensor array seamlessly embedded above windshield.', x: 45, y: 25 },
      { title: 'Tri-Motor Inverter', desc: 'Silicon Carbide (SiC) microinverters operating at 99.4% peak thermal efficiency.', x: 25, y: 65 }
    ],
    highlights: [
      '0 to 60 mph in 1.78 seconds with launch control',
      'Structural carbon-fiber monocoque chassis with titanium subframes',
      '12-minute 800V Megawatt fast charging',
      'Track-optimized active downforce matrix (1,200 kg @ 180 mph)',
      'Holographic Head-Up Display with real-time racing telemetry'
    ]
  },
  {
    id: 'valkyrie',
    name: 'VALKYRIE',
    series: 'Grand Touring 02',
    tagline: 'Autonomous Grand Touring in Unrivaled Luxury',
    category: 'sedan',
    basePrice: 124000,
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1800&q=85',
    description: 'The executive grand sedan reimagined. Valkyrie merges lounge-level rear executive seating with a whisper-silent dual-motor drivetrain delivering 850 horsepower and 540 miles of range.',
    specs: {
      acceleration: '2.85s',
      accelerationNum: 2.85,
      topSpeed: '205 mph',
      topSpeedNum: 205,
      range: '540 mi',
      rangeNum: 540,
      power: '850 HP',
      powerNum: 850,
      torque: '1,120 Nm',
      batteryCapacity: '115 kWh Solid-State',
      chargingSpeed: '14 min (10-80%)',
      driveType: 'Dual-Motor Intelligent AWD',
      dragCoefficient: '0.20 Cd',
      curbWeight: '4,650 lbs',
      cargoVolume: '24.5 cu ft',
      seating: 5,
    },
    colors: GLOBAL_COLORS,
    wheels: GLOBAL_WHEELS,
    interiors: GLOBAL_INTERIORS,
    packages: [
      { id: 'executive-lounge', name: 'First-Class Executive Rear Suite', description: 'Reclining zero-gravity rear seats, heated massage stones, integrated champagne chiller, and dual 16" 4K OLED screens.', price: 14500, badge: 'Ultra Luxury' },
      { id: 'neural-autopilot', name: 'Aether Neural Pilot 4.0 Pro', description: 'Triple 360° Solid-State LiDAR, 12 HDR cameras, Level 4 Highway & City Co-pilot.', price: 12000, badge: 'Autonomous L4' },
      { id: 'panoramic-sky', name: 'Electrochromic Photovoltaic Glass Roof', description: 'Variable transparency glass roof that charges battery up to 15 miles/day under sun.', price: 4800 },
    ],
    blueprintPoints: [
      { title: 'Air Suspension Matrix', desc: 'Predictive active air suspension scanning road surface 1,000 times/second.', x: 30, y: 75 },
      { title: 'Executive Acoustic Pod', desc: 'Triple-laminated acoustic glass with anti-vibration cabin dampening.', x: 60, y: 40 },
      { title: 'Biometric Driver ID', desc: 'Facial and fingertip biometric profile setup with tailored climate and seating.', x: 45, y: 35 },
      { title: 'Dual Silicon Motors', desc: 'Dual permanent magnet motors with instant variable torque split.', x: 75, y: 70 }
    ],
    highlights: [
      'Lounge-class zero-gravity reclining seats with Shiatsu massage',
      '540 miles real-world highway range',
      'Active acoustic noise cancellation inside cabin (<38 dB at 70 mph)',
      'Predictive adaptive air suspension with front road LiDAR preview',
      'Dual 16-inch rear OLED theater displays'
    ]
  },
  {
    id: 'aegis',
    name: 'AEGIS',
    series: 'Expedition 03',
    tagline: 'Unstoppable Cyber Luxury All-Terrain SUV',
    category: 'suv',
    basePrice: 142000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85',
    description: 'Armored luxury meets hyper-performance. Aegis features quad-motor torque vectoring, 16 inches of adaptive ground clearance, 12,500 lbs towing, and titanium underbody armor.',
    specs: {
      acceleration: '2.95s',
      accelerationNum: 2.95,
      topSpeed: '185 mph',
      topSpeedNum: 185,
      range: '500 mi',
      rangeNum: 500,
      power: '1,020 HP',
      powerNum: 1020,
      torque: '1,500 Nm',
      batteryCapacity: '150 kWh Extreme Pack',
      chargingSpeed: '15 min (10-80%)',
      driveType: 'Quad-Motor 4-Wheel Steering AWD',
      dragCoefficient: '0.24 Cd',
      curbWeight: '5,400 lbs',
      cargoVolume: '88.5 cu ft',
      seating: 7,
    },
    colors: GLOBAL_COLORS,
    wheels: GLOBAL_WHEELS,
    interiors: GLOBAL_INTERIORS,
    packages: [
      { id: 'armored-spec', name: 'Ballistic Aegis Armor & Bio-Defense', description: 'Bullet-resistant composite glass, Kevlar reinforced floor panel, and hospital-grade HEPA bio-defense positive pressure system.', price: 24000, badge: 'Max Defense' },
      { id: 'expedition-offroad', name: 'Cyber Expedition Off-Road Pack', description: '37" All-terrain Kevlar tires, roof-mounted high-intensity laser lightbar, and integrated 12V campsite power hub.', price: 9500 },
      { id: 'neural-autopilot', name: 'Aether Neural Pilot 4.0 Pro', description: 'Off-road 3D topography radar, trail autopilot, and 360° underwater wading sonar.', price: 12000, badge: 'Autonomous L4' },
    ],
    blueprintPoints: [
      { title: '4-Wheel Independent Steering', desc: 'Up to 12° rear wheel angle for crab-walk maneuvers and 36-foot turning radius.', x: 20, y: 75 },
      { title: 'Titanium Underbody Shield', desc: 'Aerospace-grade titanium shielding protecting high-voltage battery on rough trails.', x: 50, y: 85 },
      { title: 'Quad-Motor Vectoring', desc: 'Millisecond-level torque distribution across all four individual wheels.', x: 78, y: 75 },
      { title: 'HEPA Bio-Defense Airflow', desc: 'Positive pressure cabin filtration removing 99.97% of airborne particles.', x: 38, y: 35 }
    ],
    highlights: [
      'Quad-motor drivetrain with Crab-Walk 4-wheel steering',
      '12,500 lbs towing capacity with automated trailer backup assist',
      '16 inches of adaptive ground clearance with water fording up to 3.5 ft',
      'Bioweapon Defense Mode with hospital-grade positive pressure filtration',
      'Generates 240V / 12kW onboard generator power for mobile camping'
    ]
  },
  {
    id: 'pulse',
    name: 'PULSE',
    series: 'Roadster 04',
    tagline: 'Pure Open-Air Electric Thrill',
    category: 'roadster',
    basePrice: 158000,
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=85',
    description: 'An open-top electric roadster with a carbon-fiber removable targa roof, rear-biased dual-motor dynamics, and active aerodynamic vortex generators.',
    specs: {
      acceleration: '2.05s',
      accelerationNum: 2.05,
      topSpeed: '220 mph',
      topSpeedNum: 220,
      range: '460 mi',
      rangeNum: 460,
      power: '980 HP',
      powerNum: 980,
      torque: '1,250 Nm',
      batteryCapacity: '105 kWh Light-Cell',
      chargingSpeed: '10 min (10-80%)',
      driveType: 'Dual-Motor Rear-Biased AWD',
      dragCoefficient: '0.21 Cd',
      curbWeight: '3,780 lbs',
      cargoVolume: '14.0 cu ft',
      seating: 2,
    },
    colors: GLOBAL_COLORS,
    wheels: GLOBAL_WHEELS,
    interiors: GLOBAL_INTERIORS,
    packages: [
      { id: 'targa-carbon', name: 'Electrochromic Smart Carbon Targa Roof', description: 'Dual lightweight removable carbon panels with instant tint adjustment.', price: 8500, badge: 'Lightweight' },
      { id: 'track-aero', name: 'Roadster Active Vortex Aero Kit', description: 'Carbon rear diffuser, active spoiler, and ventilated front fenders.', price: 12000 },
      { id: 'neural-autopilot', name: 'Aether Neural Pilot 4.0 Pro', description: 'Full autonomous cruising and automated valet parking.', price: 12000, badge: 'Autonomous L4' },
    ],
    blueprintPoints: [
      { title: 'Removable Carbon Targa', desc: 'Ultra-lightweight 8kg carbon roof panels store seamlessly in the front trunk.', x: 50, y: 30 },
      { title: 'Active Vortex Cannards', desc: 'Micro-ducted airflow channels routing turbulent air around open cockpit.', x: 18, y: 55 },
      { title: 'Rear-Biased Torque Vector', desc: 'Up to 90% power delivered to rear axle in Apex Sport+ track mode.', x: 80, y: 70 },
      { title: 'Titanium Pushrod Suspension', desc: 'Formula-inspired horizontal pushrod dampers for razor-sharp steering.', x: 30, y: 65 }
    ],
    highlights: [
      'Removable carbon-fiber Targa roof with integrated smart solar glass',
      'Razor-sharp Formula-inspired pushrod suspension',
      'Rear-biased electric drift mode with variable traction control',
      'Ultra-low curb weight of 3,780 lbs for agile canyon carving',
      'Immersive binaural exterior sound projection system'
    ]
  }
];

export const SHOWROOMS: ShowroomLocation[] = [
  {
    id: 'bh-la',
    name: 'Aether Experience Center - Beverly Hills',
    city: 'Los Angeles, CA',
    country: 'United States',
    address: '9600 Wilshire Blvd, Beverly Hills, CA 90212',
    type: 'flagship',
    stallsAvailable: 14,
    totalStalls: 16,
    phone: '+1 (310) 880-9200',
    hours: 'Mon - Sun: 9:00 AM - 8:00 PM',
    lat: 34.0669,
    lng: -118.4004,
    amenities: ['350kW Ultra Megachargers', 'VIP Configuration Lounge', 'Private Track Access', 'Barista & Champagne Bar', 'Certified Service Center']
  },
  {
    id: 'nyc-manhattan',
    name: 'Aether Gallery - Manhattan 5th Ave',
    city: 'New York, NY',
    country: 'United States',
    address: '767 5th Ave, New York, NY 10153',
    type: 'flagship',
    stallsAvailable: 8,
    totalStalls: 10,
    phone: '+1 (212) 550-1800',
    hours: 'Mon - Sun: 10:00 AM - 9:00 PM',
    lat: 40.7638,
    lng: -73.9729,
    amenities: ['Megacharger Hub', '3D VR Design Studio', 'VIP Delivery Suite', 'Executive Workspaces']
  },
  {
    id: 'lon-mayfair',
    name: 'Aether Atelier - Mayfair London',
    city: 'London',
    country: 'United Kingdom',
    address: '14 Berkeley Square, Mayfair, London W1J 6BL',
    type: 'experience-center',
    stallsAvailable: 10,
    totalStalls: 12,
    phone: '+44 20 7946 0992',
    hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
    lat: 51.5095,
    lng: -0.1472,
    amenities: ['High-Power Charging', 'Bespoke Tailoring Studio', 'Private Member Lounge', 'Concierge Service']
  },
  {
    id: 'tok-ginza',
    name: 'Aether Innovation Hub - Ginza Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    address: '6-10-1 Ginza, Chuo City, Tokyo 104-0061',
    type: 'flagship',
    stallsAvailable: 18,
    totalStalls: 20,
    phone: '+81 3 5555 0198',
    hours: 'Mon - Sun: 10:00 AM - 8:30 PM',
    lat: 35.6696,
    lng: 139.7645,
    amenities: ['Quantum Megachargers', 'Robotic Service Bay', 'Holographic Configurator', 'Japanese Tea Room']
  },
  {
    id: 'dxb-marina',
    name: 'Aether Oasis - Dubai Marina',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Al Marsa St, Dubai Marina, Dubai',
    type: 'flagship',
    stallsAvailable: 22,
    totalStalls: 24,
    phone: '+971 4 800 2384',
    hours: 'Mon - Sun: 10:00 AM - 11:00 PM',
    lat: 25.0772,
    lng: 55.1396,
    amenities: ['Climate-Controlled Megachargers', 'Private Supercar Track Booking', 'VIP Majlis Lounge', 'Helipad Access']
  },
  {
    id: 'zurich-bahn',
    name: 'Aether Alpine Studio - Zurich',
    city: 'Zurich',
    country: 'Switzerland',
    address: 'Bahnhofstrasse 45, 8001 Zürich',
    type: 'experience-center',
    stallsAvailable: 6,
    totalStalls: 8,
    phone: '+41 44 220 8900',
    hours: 'Mon - Sat: 9:00 AM - 6:30 PM',
    lat: 47.3717,
    lng: 8.5380,
    amenities: ['Alpine Test Route Launch', 'Winter Range Simulation Suite', 'Ultra-fast Charging']
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Julian Vance',
    title: 'An Engineering Triumph that Outclasses Everything',
    rating: 5,
    model: 'Spectre GT',
    comment: 'The instant torque of the Spectre GT takes your breath away. The 1.78s launch is intoxicating, but the refinement, silent cruising at 100mph, and the build quality make it a generational masterpiece.',
    verifiedOwner: true,
    date: 'August 14, 2026'
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    title: 'The Ultimate Long-Distance Grand Tourer',
    rating: 5,
    model: 'Valkyrie',
    comment: 'I drove my Valkyrie from Milan to Monaco on a single charge with 120 miles to spare. The rear executive massage suite and Neural Pilot autopilot make cross-continent journeys utterly effortless.',
    verifiedOwner: true,
    date: 'July 28, 2026'
  },
  {
    id: 'rev-3',
    author: 'Marcus Sterling',
    title: 'Armored Luxury Like Nothing Else on Earth',
    rating: 5,
    model: 'Aegis',
    comment: 'The 4-wheel steering crab walk in downtown parking is magic. We took the Aegis deep into the Rockies in snowstorms and it handled everything like a tank while keeping us in five-star luxury.',
    verifiedOwner: true,
    date: 'August 02, 2026'
  }
];

export const PRESS_ACCOLADES = [
  {
    outlet: 'TopGear',
    quote: 'Aether has done the impossible: created an electric hypercar with soul, staggering agility, and supersonic acceleration.',
    award: 'Hypercar of the Year 2026'
  },
  {
    outlet: 'MotorTrend',
    quote: 'The Spectre GT does not just compete with hypercars from Europe — it renders them obsolete in performance and tech.',
    award: 'Automotive Innovation Gold Trophy'
  },
  {
    outlet: 'Wired',
    quote: 'With 12-minute Megawatt fast charging and true Level 4 neural driving, Aether is building the future today.',
    award: 'Best Transportation Tech 2026'
  },
  {
    outlet: 'Robb Report',
    quote: 'The Valkyrie is the undisputed benchmark of modern electric grand touring and bespoke craftsmanship.',
    award: 'Best of the Best Luxury Luxury EV'
  }
];
