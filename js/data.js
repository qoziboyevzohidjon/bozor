export const STORAGE_KEYS = {
  users: 'gz_users',
  currentUser: 'gz_currentUser',
  games: 'gz_games',
  cart: 'gz_cart',
  wishlist: 'gz_wishlist',
  orders: 'gz_orders',
  sellerSettings: 'gz_sellerSettings'
};

export const demoUsers = [
  {
    id: 'u_buyer_1',
    firstName: 'Ariana',
    lastName: 'Cole',
    username: 'ariana',
    email: 'buyer@gamezone.demo',
    passwordHash: 'demo-password-hash',
    passwordSalt: 'demo-salt',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    createdAt: '2025-01-14'
  },
  {
    id: 'u_seller_1',
    firstName: 'Noah',
    lastName: 'Miller',
    username: 'novaplay',
    email: 'seller@gamezone.demo',
    passwordHash: 'demo-password-hash',
    passwordSalt: 'demo-salt',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2024-12-20'
  }
];

export const demoSellerSettings = {
  storeName: 'NovaPlay Store',
  bio: 'Premium indie hits and big action adventures for every gamer.',
  payoutMethod: 'PayPal / Stripe Demo',
  taxRate: 8.5
};

export const demoGames = [
  { id: 'G-1001', name: 'Neon Drift', description: 'A futuristic street racing title that mixes cinematic chases, custom tuning, and relentless night-city energy.', price: 29.99, oldPrice: 39.99, discount: 25, category: 'Racing', platform: 'PC', cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80', rating: 4.8, sales: 3560, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-08-12' },
  { id: 'G-1002', name: 'Shadow Rift', description: 'Lead a squad of elite hunters through cursed portals and ancient ruins in a dark fantasy co-op adventure.', price: 34.99, oldPrice: 49.99, discount: 30, category: 'Action', platform: 'PlayStation', cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80', rating: 4.7, sales: 4280, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-07-02' },
  { id: 'G-1003', name: 'Aether Legends', description: 'Explore floating kingdoms, master elemental spells, and build your own heroic legacy in this epic RPG.', price: 44.99, oldPrice: 59.99, discount: 25, category: 'RPG', platform: 'PC', cover: 'https://images.unsplash.com/photo-1528819622761-6bcf9d4d6ac9?auto=format&fit=crop&w=900&q=80', rating: 4.9, sales: 5260, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-06-09' },
  { id: 'G-1004', name: 'Last Signal', description: 'A tense cyberpunk survival shooter with smart stealth mechanics and rich atmospheric world-building.', price: 27.99, oldPrice: 34.99, discount: 20, category: 'Action', platform: 'Xbox', cover: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=900&q=80', rating: 4.6, sales: 2890, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'Low Stock', createdAt: '2025-09-15' },
  { id: 'G-1005', name: 'Titan Settlers', description: 'Build a frontier colony on a remote moon, manage resources, and survive hostile cosmic storms.', price: 21.99, oldPrice: 29.99, discount: 27, category: 'Simulation', platform: 'PC', cover: 'https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?auto=format&fit=crop&w=900&q=80', rating: 4.4, sales: 1980, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-04-22' },
  { id: 'G-1006', name: 'Echoes of Dawn', description: 'A cinematic narrative adventure where every choice reshapes the fate of a forgotten kingdom.', price: 18.99, oldPrice: 24.99, discount: 24, category: 'Adventure', platform: 'Nintendo Switch', cover: 'https://images.unsplash.com/photo-1526509867163-5c3b2e8d8ef6?auto=format&fit=crop&w=900&q=80', rating: 4.5, sales: 2490, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-03-28' },
  { id: 'G-1007', name: 'Iron Forge', description: 'Command mechanized armies and outsmart rival commanders in a fast, tactical strategy battlefront.', price: 39.99, oldPrice: 54.99, discount: 27, category: 'Strategy', platform: 'PC', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80', rating: 4.8, sales: 5340, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-09-01' },
  { id: 'G-1008', name: 'Silent Circuit', description: 'A tense hacking thriller that blends stealth missions, cyber infiltration, and moral decisions.', price: 24.99, oldPrice: 31.99, discount: 22, category: 'Indie', platform: 'PC', cover: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80', rating: 4.3, sales: 1645, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-02-10' },
  { id: 'G-1009', name: 'Crimson Vault', description: 'Uncover lost relics, survive trap-filled ruins, and crack the mystery behind an ancient vault.', price: 32.99, oldPrice: 42.99, discount: 23, category: 'Adventure', platform: 'PlayStation', cover: 'https://images.unsplash.com/photo-1525879000488-bff3b1c387cf?auto=format&fit=crop&w=900&q=80', rating: 4.7, sales: 3015, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'Pre-order', createdAt: '2025-08-24' },
  { id: 'G-1010', name: 'Midnight Grid', description: 'Build your dream sports empire through brutal competition, sponsorships, and tactical gameplay.', price: 26.99, oldPrice: 36.99, discount: 27, category: 'Sports', platform: 'Xbox', cover: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80', rating: 4.5, sales: 2430, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-05-16' },
  { id: 'G-1011', name: 'Feral Echo', description: 'An atmospheric survival adventure across a wild frontier, where every encounter matters.', price: 19.99, oldPrice: 26.99, discount: 26, category: 'Horror', platform: 'PC', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', rating: 4.2, sales: 1730, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-01-11' },
  { id: 'G-1012', name: 'Storm Oracle', description: 'A tactical battle strategy game with magical elements and unpredictable boss encounters.', price: 43.99, oldPrice: 56.99, discount: 23, category: 'Strategy', platform: 'PlayStation', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80', rating: 4.9, sales: 4985, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-10-09' },
  { id: 'G-1013', name: 'Vapor Run', description: 'Leave your mark in a neon-soaked racer packed with stylized tracks and custom upgrades.', price: 16.99, oldPrice: 22.99, discount: 26, category: 'Racing', platform: 'Nintendo Switch', cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80', rating: 4.1, sales: 1520, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-03-09' },
  { id: 'G-1014', name: 'Lunar Scribe', description: 'Craft your story in a beautifully hand-painted adventure with branching narratives.', price: 23.99, oldPrice: 31.99, discount: 25, category: 'Indie', platform: 'PC', cover: 'https://images.unsplash.com/photo-1517373116369-9bdb8cdc9f62?auto=format&fit=crop&w=900&q=80', rating: 4.6, sales: 1814, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-09-18' },
  { id: 'G-1015', name: 'Arena Prime', description: 'Dominate battle arenas with skill-based combat and deep team customization systems.', price: 28.99, oldPrice: 38.99, discount: 26, category: 'Action', platform: 'PC', cover: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=900&q=80', rating: 4.7, sales: 3130, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-02-16' },
  { id: 'G-1016', name: 'Vast Horizon', description: 'Lead a crew of explorers through distant planets and deep-space anomalies.', price: 25.99, oldPrice: 32.99, discount: 21, category: 'Adventure', platform: 'Xbox', cover: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80', rating: 4.4, sales: 1950, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'Low Stock', createdAt: '2025-08-05' },
  { id: 'G-1017', name: 'Skyline Tactics', description: 'Command a modern military force in tactical operations across futuristic megacities.', price: 37.99, oldPrice: 49.99, discount: 24, category: 'Strategy', platform: 'PC', cover: 'https://images.unsplash.com/photo-1519309621146-9a1d3f4f74d1?auto=format&fit=crop&w=900&q=80', rating: 4.8, sales: 3560, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-05-23' },
  { id: 'G-1018', name: 'Moss & Ember', description: 'Explore a living woodland with magical creatures and release your inner ranger.', price: 17.99, oldPrice: 24.99, discount: 28, category: 'Adventure', platform: 'Nintendo Switch', cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80', rating: 4.3, sales: 1260, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-07-05' },
  { id: 'G-1019', name: 'Hyperline', description: 'A high-speed arcade racer that rewards creative play and perfect timing in every turn.', price: 12.99, oldPrice: 18.99, discount: 32, category: 'Racing', platform: 'PC', cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80', rating: 4.0, sales: 1180, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-04-03' },
  { id: 'G-1020', name: 'Sable Keep', description: 'Build a fortress, manage resources, and defend your stronghold from relentless waves.', price: 29.99, oldPrice: 39.99, discount: 25, category: 'Simulation', platform: 'PlayStation', cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80', rating: 4.5, sales: 2145, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-10-12' },
  { id: 'G-1021', name: 'Night Watch', description: 'Solve supernatural crimes through deduction, stealth, and visible realism in a moody city.', price: 31.99, oldPrice: 43.99, discount: 27, category: 'Horror', platform: 'Xbox', cover: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', rating: 4.6, sales: 2310, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-06-20' },
  { id: 'G-1022', name: 'Warden Pact', description: 'Lead a team of heroes, gather legendary gear, and dominate a vast dungeon campaign.', price: 41.99, oldPrice: 56.99, discount: 26, category: 'RPG', platform: 'PC', cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80', rating: 4.9, sales: 4510, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-08-27' },
  { id: 'G-1023', name: 'Pixel Pioneers', description: 'A relaxing building sim that blends creative design, resource management, and cozy vibes.', price: 14.99, oldPrice: 22.99, discount: 35, category: 'Simulation', platform: 'Nintendo Switch', cover: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80', rating: 4.2, sales: 1340, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-01-25' },
  { id: 'G-1024', name: 'Tundra Reign', description: 'Defend your kingdom in a brutal survival strategy experience shaped by weather and morale.', price: 35.99, oldPrice: 44.99, discount: 20, category: 'Strategy', platform: 'PC', cover: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=900&q=80', rating: 4.7, sales: 2870, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-03-03' },
  { id: 'G-1025', name: 'Afterglow Kart', description: 'A colorful arcade racer with wild drift mechanics, power-ups, and local multiplayer chaos.', price: 18.99, oldPrice: 26.99, discount: 30, category: 'Racing', platform: 'Nintendo Switch', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80', rating: 4.4, sales: 1690, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-02-28' },
  { id: 'G-1026', name: 'Blackline', description: 'A tactical stealth action game where every mission can end with silence or chaos.', price: 33.99, oldPrice: 46.99, discount: 28, category: 'Action', platform: 'PlayStation', cover: 'https://images.unsplash.com/photo-1528819622761-6bcf9d4d6ac9?auto=format&fit=crop&w=900&q=80', rating: 4.8, sales: 3840, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-09-29' },
  { id: 'G-1027', name: 'Arcadia Play', description: 'A cozy collection management experience with quirky characters and handcrafted events.', price: 11.99, oldPrice: 15.99, discount: 25, category: 'Indie', platform: 'Nintendo Switch', cover: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80', rating: 4.1, sales: 980, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-05-08' },
  { id: 'G-1028', name: 'Dread Harbor', description: 'Hunt monsters and uncover a capital city’s haunted secret in an action-horror journey.', price: 22.99, oldPrice: 29.99, discount: 23, category: 'Horror', platform: 'PC', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', rating: 4.5, sales: 1910, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'Low Stock', createdAt: '2025-01-21' },
  { id: 'G-1029', name: 'Crown Circuit', description: 'A thrilling competitive football management sim with global clubs and real-time decisions.', price: 26.99, oldPrice: 35.99, discount: 25, category: 'Sports', platform: 'Xbox', cover: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80', rating: 4.5, sales: 2025, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-07-21' },
  { id: 'G-1030', name: 'Eclipse Vale', description: 'A moody fantasy adventure that mixes exploration, diplomacy, and combat in a living world.', price: 38.99, oldPrice: 49.99, discount: 22, category: 'RPG', platform: 'PlayStation', cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80', rating: 4.7, sales: 4280, sellerId: 'u_seller_1', sellerName: 'NovaPlay', availability: 'In Stock', createdAt: '2025-06-14' }
];
