import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  // Seed menu items
  const menuItems = [
    { name: "Classic Falafel Wrap", description: "Crispy falafel balls with fresh salad, pickles, and creamy tahini sauce in warm pita bread", price: 22, category: "wraps", image: "/images/falafel-wrap.jpg", popular: true },
    { name: "Spicy Falafel Wrap", description: "Our signature falafel with harissa sauce, roasted peppers, and fresh herbs", price: 25, category: "wraps", image: "/images/falafel-wrap.jpg", popular: false },
    { name: "Hummus Falafel Wrap", description: "Generous portion of creamy hummus with falafel, cucumber, and tomatoes", price: 26, category: "wraps", image: "/images/falafel-wrap.jpg", popular: true },
    { name: "Mediterranean Wrap", description: "Falafel with feta cheese, olives, sun-dried tomatoes, and mixed greens", price: 28, category: "wraps", image: "/images/falafel-wrap.jpg", popular: false },
    { name: "Falafel Platter", description: "6 falafel balls with hummus, tabbouleh, fresh salad, pickles, and warm pita", price: 35, category: "platters", image: "/images/falafel-platter.jpg", popular: true },
    { name: "Family Combo", description: "12 falafel balls, large hummus, tabbouleh, salad, and 4 pita breads. Perfect for sharing!", price: 65, category: "platters", image: "/images/falafel-platter.jpg", popular: false },
    { name: "Mixed Platter", description: "Falafel, hummus, baba ganoush, tabbouleh, and fresh pita bread", price: 40, category: "platters", image: "/images/falafel-platter.jpg", popular: true },
    { name: "Creamy Hummus", description: "House-made chickpea hummus with olive oil and paprika, served with pita", price: 15, category: "sides", image: "/images/hummus.jpg", popular: true },
    { name: "Fresh Garden Salad", description: "Mixed greens, cherry tomatoes, cucumber, olives, and lemon vinaigrette", price: 18, category: "sides", image: "/images/salad.jpg", popular: false },
    { name: "Tabbouleh", description: "Traditional parsley salad with bulgur wheat, tomatoes, and lemon dressing", price: 16, category: "sides", image: "/images/salad.jpg", popular: false },
    { name: "Baba Ganoush", description: "Smoky roasted eggplant dip with tahini, garlic, and olive oil", price: 16, category: "sides", image: "/images/hummus.jpg", popular: false },
    { name: "Fresh Lemonade", description: "House-made lemonade with fresh mint leaves and a touch of honey", price: 12, category: "drinks", image: "/images/drinks.jpg", popular: true },
    { name: "Ayran", description: "Traditional yogurt drink, perfectly salted and refreshing", price: 10, category: "drinks", image: "/images/drinks.jpg", popular: false },
    { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice, no added sugar", price: 14, category: "drinks", image: "/images/drinks.jpg", popular: false },
    { name: "Turkish Tea", description: "Authentic Turkish black tea served in traditional glass", price: 8, category: "drinks", image: "/images/drinks.jpg", popular: false },
  ];

  for (const item of menuItems) {
    await sql`INSERT INTO menu_items (name, description, price, category, image, popular) VALUES (${item.name}, ${item.description}, ${item.price}, ${item.category}, ${item.image}, ${item.popular})`;
  }
  console.log(`Seeded ${menuItems.length} menu items`);

  // Seed reviews
  const reviews = [
    { name: "Maria Ionescu", rating: 5, text: "Best falafel in Bucharest! The wraps are always fresh and the tahini sauce is incredible. I come here at least twice a week.", date: "2025-02-10" },
    { name: "Alexandru Popescu", rating: 5, text: "Amazing food at great prices. The family combo is perfect for our weekend lunches. Kids love the falafel too!", date: "2025-01-25" },
    { name: "Sophie Laurent", rating: 4, text: "I was visiting Bucharest and this was a wonderful find! Fresh, healthy, and delicious. The hummus is top-notch.", date: "2025-02-03" },
    { name: "Andrei Dragomir", rating: 5, text: "The spicy falafel wrap is my go-to lunch. Fast service, friendly staff, and consistently excellent quality.", date: "2025-02-17" },
    { name: "Elena Vasilescu", rating: 5, text: "Finally a healthy fast-food option that actually tastes amazing! The Mediterranean wrap is my favorite.", date: "2024-12-25" },
    { name: "Radu Mihailescu", rating: 4, text: "Great vegetarian options and the delivery is always on time. Highly recommend the mixed platter!", date: "2025-01-25" },
  ];

  for (const review of reviews) {
    await sql`INSERT INTO reviews (name, rating, text, date, visible) VALUES (${review.name}, ${review.rating}, ${review.text}, ${review.date}, true)`;
  }
  console.log(`Seeded ${reviews.length} reviews`);

  // Seed a couple of sample orders
  const orders = [
    { customer_name: "Ion Barbu", customer_phone: "0722111222", items: JSON.stringify([{ name: "Classic Falafel Wrap", quantity: 2, price: 22 }, { name: "Fresh Lemonade", quantity: 2, price: 12 }]), total: 68, status: "delivered", notes: "" },
    { customer_name: "Ana Marin", customer_phone: "0733222333", items: JSON.stringify([{ name: "Falafel Platter", quantity: 1, price: 35 }, { name: "Creamy Hummus", quantity: 1, price: 15 }, { name: "Ayran", quantity: 1, price: 10 }]), total: 60, status: "delivered", notes: "Extra tahini please" },
    { customer_name: "Vlad Enescu", customer_phone: "0744333444", items: JSON.stringify([{ name: "Spicy Falafel Wrap", quantity: 1, price: 25 }, { name: "Turkish Tea", quantity: 1, price: 8 }]), total: 33, status: "preparing", notes: "" },
  ];

  for (const order of orders) {
    await sql`INSERT INTO orders (customer_name, customer_phone, items, total, status, notes) VALUES (${order.customer_name}, ${order.customer_phone}, ${order.items}, ${order.total}, ${order.status}, ${order.notes})`;
  }
  console.log(`Seeded ${orders.length} orders`);

  console.log("Seeding complete!");
}

seed().catch(console.error);
