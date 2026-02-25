export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "wraps" | "platters" | "sides" | "drinks";
  image: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export const menuItems: MenuItem[] = [
  // Falafel Wraps
  {
    id: "w1",
    name: "Classic Falafel Wrap",
    description:
      "Crispy falafel balls with fresh salad, pickles, and creamy tahini sauce in warm pita bread",
    price: 22,
    category: "wraps",
    image: "/images/falafel-wrap.jpg",
    popular: true,
  },
  {
    id: "w2",
    name: "Spicy Falafel Wrap",
    description:
      "Our signature falafel with harissa sauce, roasted peppers, and fresh herbs",
    price: 25,
    category: "wraps",
    image: "/images/falafel-wrap.jpg",
  },
  {
    id: "w3",
    name: "Hummus Falafel Wrap",
    description:
      "Generous portion of creamy hummus with falafel, cucumber, and tomatoes",
    price: 26,
    category: "wraps",
    image: "/images/falafel-wrap.jpg",
    popular: true,
  },
  {
    id: "w4",
    name: "Mediterranean Wrap",
    description:
      "Falafel with feta cheese, olives, sun-dried tomatoes, and mixed greens",
    price: 28,
    category: "wraps",
    image: "/images/falafel-wrap.jpg",
  },
  // Platters & Combos
  {
    id: "p1",
    name: "Falafel Platter",
    description:
      "6 falafel balls with hummus, tabbouleh, fresh salad, pickles, and warm pita",
    price: 35,
    category: "platters",
    image: "/images/falafel-platter.jpg",
    popular: true,
  },
  {
    id: "p2",
    name: "Family Combo",
    description:
      "12 falafel balls, large hummus, tabbouleh, salad, and 4 pita breads. Perfect for sharing!",
    price: 65,
    category: "platters",
    image: "/images/falafel-platter.jpg",
  },
  {
    id: "p3",
    name: "Mixed Platter",
    description:
      "Falafel, hummus, baba ganoush, tabbouleh, and fresh pita bread",
    price: 40,
    category: "platters",
    image: "/images/falafel-platter.jpg",
    popular: true,
  },
  // Sides & Salads
  {
    id: "s1",
    name: "Creamy Hummus",
    description:
      "House-made chickpea hummus with olive oil and paprika, served with pita",
    price: 15,
    category: "sides",
    image: "/images/hummus.jpg",
    popular: true,
  },
  {
    id: "s2",
    name: "Fresh Garden Salad",
    description:
      "Mixed greens, cherry tomatoes, cucumber, olives, and lemon vinaigrette",
    price: 18,
    category: "sides",
    image: "/images/salad.jpg",
  },
  {
    id: "s3",
    name: "Tabbouleh",
    description:
      "Traditional parsley salad with bulgur wheat, tomatoes, and lemon dressing",
    price: 16,
    category: "sides",
    image: "/images/salad.jpg",
  },
  {
    id: "s4",
    name: "Baba Ganoush",
    description:
      "Smoky roasted eggplant dip with tahini, garlic, and olive oil",
    price: 16,
    category: "sides",
    image: "/images/hummus.jpg",
  },
  // Drinks
  {
    id: "d1",
    name: "Fresh Lemonade",
    description:
      "House-made lemonade with fresh mint leaves and a touch of honey",
    price: 12,
    category: "drinks",
    image: "/images/drinks.jpg",
    popular: true,
  },
  {
    id: "d2",
    name: "Ayran",
    description: "Traditional yogurt drink, perfectly salted and refreshing",
    price: 10,
    category: "drinks",
    image: "/images/drinks.jpg",
  },
  {
    id: "d3",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice, no added sugar",
    price: 14,
    category: "drinks",
    image: "/images/drinks.jpg",
  },
  {
    id: "d4",
    name: "Turkish Tea",
    description: "Authentic Turkish black tea served in traditional glass",
    price: 8,
    category: "drinks",
    image: "/images/drinks.jpg",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Maria Ionescu",
    rating: 5,
    text: "Best falafel in Bucharest! The wraps are always fresh and the tahini sauce is incredible. I come here at least twice a week.",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    name: "Alexandru Popescu",
    rating: 5,
    text: "Amazing food at great prices. The family combo is perfect for our weekend lunches. Kids love the falafel too!",
    date: "1 month ago",
  },
  {
    id: "r3",
    name: "Sophie Laurent",
    rating: 4,
    text: "I was visiting Bucharest and this was a wonderful find! Fresh, healthy, and delicious. The hummus is top-notch.",
    date: "3 weeks ago",
  },
  {
    id: "r4",
    name: "Andrei Dragomir",
    rating: 5,
    text: "The spicy falafel wrap is my go-to lunch. Fast service, friendly staff, and consistently excellent quality.",
    date: "1 week ago",
  },
  {
    id: "r5",
    name: "Elena Vasilescu",
    rating: 5,
    text: "Finally a healthy fast-food option that actually tastes amazing! The Mediterranean wrap is my favorite.",
    date: "2 months ago",
  },
  {
    id: "r6",
    name: "Radu Mihailescu",
    rating: 4,
    text: "Great vegetarian options and the delivery is always on time. Highly recommend the mixed platter!",
    date: "1 month ago",
  },
];

export const categories = [
  { id: "wraps", label: "Falafel Wraps", icon: "🌯" },
  { id: "platters", label: "Platters & Combos", icon: "🍽" },
  { id: "sides", label: "Sides & Salads", icon: "🥗" },
  { id: "drinks", label: "Drinks", icon: "🥤" },
] as const;

export const businessInfo = {
  name: "Falafilo Food",
  fullName: "Falafilo Husni Food",
  address: "Soseaua Andronache 3, 022521 Bucuresti",
  phone: "0779 302 308",
  rating: 4.6,
  reviewCount: 293,
  priceRange: "20-40 lei",
  hours: "Open daily until 10 PM",
  googleMapsCode: "F49V+RM Bucharest",
  services: ["Dine-in", "Takeaway", "No-contact delivery"],
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2847.5!2d26.14!3d44.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI4JzEyLjAiTiAyNsKwMDgnMjQuMCJF!5e0!3m2!1sen!2sro!4v1234567890",
};
