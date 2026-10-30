/* ==========================================================
   DATA.JS - Enterprise Admin Settings & Master Database
   ----------------------------------------------------------
   PHOTOS: every dish uses  images/<dish id>.jpg  automatically.
   Example: Paneer Butter Masala (id 'p1')  ->  images/p1.jpg
   Until that file exists the dish shows a clean placeholder with
   its own name (never a wrong photo).
   To use a different link/file for one dish, add  img: 'your-link'
   to that dish line.
   SPICE: needsSpice:true shows the 🟢 Mild / 🟡 Medium / 🔴 Extra Spicy
   selector. Breads, rice, rolls, biryani, dals, noodles and fried rice
   are OFF on purpose.
   ========================================================== */

// 👑 ADMIN SETTINGS
const APP_CONFIG = {
    restaurant_name: "Kavya Family Restaurant",
    upi_id: 'merchant@upi',       // <--- ENTER YOUR UPI ID HERE (payments will not reach you until you change this)
    gst_rate: 0.05,
    free_delivery_threshold: 199,
    delivery_fee: 30,
    admin_phone: '+919999999999',
    instagram_url: 'https://www.instagram.com/kavyafamilyrestaurant?stkn=MWNxZ3hjMzR1eGJ0eQ==',
    coin_reward_min: 10,
    coin_reward_max: 50,
    max_discount_percentage: 0.10,
    order_tracking_enabled: true
};

// 📂 HORIZONTAL MENU ICONS (emoji icons always match; add img:'...' to use a photo instead)
const categories = [
    { id: 'All',       name: 'All',                emoji: '🍽️' },
    { id: 'Biryani',   name: 'Biryani',            emoji: '🍛' },
    { id: 'Rolls',     name: 'Rolls',              emoji: '🌯' },
    { id: 'Chinese',   name: 'Chowmein & Chilli',  emoji: '🍜' },
    { id: 'Starters',  name: 'Starters',           emoji: '🍢' },
    { id: 'Chicken',   name: 'Chicken',            emoji: '🍗' },
    { id: 'Kebab',     name: 'Kebab',              emoji: '🍖' },
    { id: 'Veg',       name: 'Paneer & Veg',       emoji: '🧀' },
    { id: 'Veg Curry', name: 'Mushroom',           emoji: '🍄' },
    { id: 'Dal',       name: 'Dal',                emoji: '🥣' },
    { id: 'RotiRice',  name: 'Roti & Rice',        emoji: '🫓' }
];

// 🍔 FULL ENTERPRISE MENU DATABASE (prices and variants unchanged)
const menuItems = [

    // ---------- BIRYANI (no spice selector) ----------
    { id: 'bir1', category: 'Biryani', name: 'Special Chicken Biryani', price: 180, strikePrice: 220, veg: false, needsSpice: false, variants: [{ size: 'Full', price: 180 }], meta: '⚡ 20 mins', rating: '4.9' },
    { id: 'bir2', category: 'Biryani', name: 'Special Veg Biryani', price: 200, strikePrice: 250, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 200 }], meta: '⚡ 20 mins | Paneer, Mushroom, Kaju', rating: '4.8' },
    { id: 'bir3', category: 'Biryani', name: 'Veg Biryani', price: 140, strikePrice: 180, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 140 }], meta: '⚡ 15-20 mins', rating: '4.6' },

    // ---------- ROLLS (no spice selector) ----------
    { id: 'rl1', category: 'Rolls', name: 'Double Egg Double Chicken Roll', price: 120, strikePrice: 150, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 120 }], meta: '⚡ 10-15 mins | Heavy', rating: '4.9' },
    { id: 'rl2', category: 'Rolls', name: 'Chicken Cheese Egg Roll', price: 140, strikePrice: 170, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 140 }], meta: '⚡ 15 mins', rating: '4.8' },
    { id: 'rl3', category: 'Rolls', name: 'Double Egg Chicken Roll', price: 100, strikePrice: 130, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 100 }], meta: '⚡ 10 mins', rating: '4.7' },
    { id: 'rl4', category: 'Rolls', name: 'Single Egg Chicken Roll', price: 90, strikePrice: 110, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 90 }], meta: '⚡ 10 mins', rating: '4.6' },
    { id: 'rl5', category: 'Rolls', name: 'Plain Chicken Roll', price: 80, strikePrice: 100, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 80 }], meta: '⚡ 10 mins', rating: '4.5' },
    { id: 'rl6', category: 'Rolls', name: 'Double Egg Paneer Roll', price: 90, strikePrice: 110, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 90 }], meta: '⚡ 10 mins', rating: '4.8' },
    { id: 'rl7', category: 'Rolls', name: 'Single Egg Paneer Roll', price: 80, strikePrice: 100, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 80 }], meta: '⚡ 10 mins', rating: '4.6' },
    { id: 'rl8', category: 'Rolls', name: 'Paneer Roll', price: 70, strikePrice: 90, veg: true, needsSpice: false, variants: [{ size: '1 Pc', price: 70 }], meta: '⚡ 10 mins', rating: '4.7' },
    { id: 'rl9', category: 'Rolls', name: 'Double Egg Roll', price: 70, strikePrice: 90, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 70 }], meta: '⚡ 10 mins', rating: '4.5' },
    { id: 'rl10', category: 'Rolls', name: 'Single Egg Roll', price: 60, strikePrice: 80, veg: false, needsSpice: false, variants: [{ size: '1 Pc', price: 60 }], meta: '⚡ 10 mins', rating: '4.4' },
    { id: 'rl11', category: 'Rolls', name: 'Veg Roll', price: 50, strikePrice: 70, veg: true, needsSpice: false, variants: [{ size: '1 Pc', price: 50 }], meta: '⚡ 10 mins', rating: '4.3' },
    { id: 'rl12', category: 'Rolls', name: 'Manchurian Roll', price: 70, strikePrice: 90, veg: true, needsSpice: false, variants: [{ size: '1 Pc', price: 70 }], meta: '⚡ 10 mins', rating: '4.5' },

    // ---------- CHOWMEIN (no spice selector) ----------
    { id: 'chw1', category: 'Chinese', name: 'Chicken Chowmein', price: 100, strikePrice: 130, veg: false, needsSpice: false, variants: [{ size: 'Half', price: 100 }, { size: 'Full', price: 200 }], meta: '⚡ Wok Tossed', rating: '4.8' },
    { id: 'chw2', category: 'Chinese', name: 'Mix Non-Veg Chowmein', price: 120, strikePrice: 150, veg: false, needsSpice: false, variants: [{ size: 'Half', price: 120 }, { size: 'Full', price: 240 }], meta: '⚡ Loaded with Egg & Chicken', rating: '4.9' },
    { id: 'chw3', category: 'Chinese', name: 'Egg Chowmein', price: 70, strikePrice: 100, veg: false, needsSpice: false, variants: [{ size: 'Half', price: 70 }, { size: 'Full', price: 140 }], meta: '⚡ Street Style', rating: '4.6' },
    { id: 'chw4', category: 'Chinese', name: 'Paneer Chowmein', price: 80, strikePrice: 110, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 80 }, { size: 'Full', price: 160 }], meta: '⚡ Wok Tossed', rating: '4.7' },
    { id: 'chw5', category: 'Chinese', name: 'Veg Chowmein', price: 60, strikePrice: 80, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 60 }, { size: 'Full', price: 120 }], meta: '⚡ Classic', rating: '4.5' },

    // ---------- CHILLI & MANCHURIAN (spice selector ON) ----------
    { id: 'chl1', category: 'Chinese', name: 'Chicken Chilli Boneless', price: 110, strikePrice: 150, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 110 }, { size: 'Full', price: 200 }], meta: '⚡ Sweet & Spicy', rating: '4.8' },
    { id: 'chl2', category: 'Chinese', name: 'Chicken Chilli Bone', price: 110, strikePrice: 150, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 110 }, { size: 'Full', price: 200 }], meta: '⚡ Desi Chinese', rating: '4.6' },
    { id: 'chl3', category: 'Chinese', name: 'Paneer Chilli', price: 100, strikePrice: 130, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 100 }, { size: 'Full', price: 190 }], meta: '⚡ Chef Special', rating: '4.7' },
    { id: 'chl4', category: 'Chinese', name: 'Mushroom Chilli', price: 120, strikePrice: 150, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 120 }, { size: 'Full', price: 220 }], meta: '⚡ Crispy Fried', rating: '4.6' },
    { id: 'chl5', category: 'Chinese', name: 'Veg Manchurian', price: 70, strikePrice: 100, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 70 }, { size: 'Full', price: 140 }], meta: '⚡ Tangy Gravy', rating: '4.5' },

    // ---------- FRIED RICE (no spice selector) ----------
    { id: 'fr1', category: 'Chinese', name: 'Chicken Fried Rice', price: 100, strikePrice: 140, veg: false, needsSpice: false, variants: [{ size: 'Half', price: 100 }, { size: 'Full', price: 200 }], meta: '⚡ Wok Tossed', rating: '4.8' },
    { id: 'fr2', category: 'Chinese', name: 'Mix Non-Veg Fried Rice', price: 120, strikePrice: 160, veg: false, needsSpice: false, variants: [{ size: 'Half', price: 120 }, { size: 'Full', price: 200 }], meta: '⚡ Loaded', rating: '4.9' },
    { id: 'fr3', category: 'Chinese', name: 'Egg Fried Rice', price: 100, strikePrice: 130, veg: false, needsSpice: false, variants: [{ size: 'Half', price: 100 }, { size: 'Full', price: 180 }], meta: '⚡ Quick Bite', rating: '4.6' },
    { id: 'fr4', category: 'Chinese', name: 'Paneer Fried Rice', price: 90, strikePrice: 120, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 90 }, { size: 'Full', price: 180 }], meta: '⚡ Soft Paneer Chunks', rating: '4.7' },
    { id: 'fr5', category: 'Chinese', name: 'Mix Veg Fried Rice', price: 100, strikePrice: 130, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 100 }, { size: 'Full', price: 200 }], meta: '⚡ Healthy', rating: '4.5' },
    { id: 'fr6', category: 'Chinese', name: 'Veg Fried Rice', price: 80, strikePrice: 110, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 80 }, { size: 'Full', price: 160 }], meta: '⚡ Classic', rating: '4.4' },

    // ---------- STARTERS ----------
    { id: 'st1', category: 'Starters', name: 'Chicken Lollypop', price: 260, strikePrice: 320, veg: false, needsSpice: true, variants: [{ size: '6 Pcs', price: 260 }], meta: '⚡ Deep Fried Crispy', rating: '4.9' },
    { id: 'st2', category: 'Starters', name: 'Chicken Chilli Dry', price: 260, strikePrice: 300, veg: false, needsSpice: true, variants: [{ size: 'Full', price: 260 }], meta: '⚡ Perfect Snack', rating: '4.8' },
    { id: 'st3', category: 'Starters', name: 'Baby Corn', price: 200, strikePrice: 240, veg: true, needsSpice: true, variants: [{ size: 'Full', price: 200 }], meta: '⚡ Crispy', rating: '4.6' },
    { id: 'st4', category: 'Starters', name: 'Paneer Pakoda', price: 140, strikePrice: 180, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 140 }], meta: '⚡ Indian Classic', rating: '4.7' },
    { id: 'st5', category: 'Starters', name: 'Paneer Chilli Dry', price: 210, strikePrice: 250, veg: true, needsSpice: true, variants: [{ size: 'Full', price: 210 }], meta: '⚡ Spicy Tossed', rating: '4.8' },
    { id: 'st6', category: 'Starters', name: 'Mushroom Chilli Dry', price: 250, strikePrice: 290, veg: true, needsSpice: true, variants: [{ size: 'Full', price: 250 }], meta: '⚡ Wok Tossed', rating: '4.7' },
    { id: 'st7', category: 'Starters', name: 'Paneer Tikka (Dry)', price: 240, strikePrice: 280, veg: true, needsSpice: true, variants: [{ size: 'Full', price: 240 }], meta: '⚡ Tandoor Grilled', rating: '4.8' },

    // ---------- DAL (no spice selector) ----------
    { id: 'dl1', category: 'Dal', name: 'Dal Makhani', price: 200, strikePrice: 240, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 200 }], meta: '⚡ Creamy & Rich', rating: '4.9' },
    { id: 'dl2', category: 'Dal', name: 'Punjabi Dal', price: 160, strikePrice: 190, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 160 }], meta: '⚡ Authentic Dhaba Style', rating: '4.7' },
    { id: 'dl3', category: 'Dal', name: 'Dal Tadka', price: 120, strikePrice: 150, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 120 }], meta: '⚡ Desi Ghee Tadka', rating: '4.6' },
    { id: 'dl4', category: 'Dal', name: 'Dal Butter Fry', price: 120, strikePrice: 150, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 120 }], meta: '⚡ Amul Butter Roasted', rating: '4.5' },
    { id: 'dl5', category: 'Dal', name: 'Dal Fry', price: 100, strikePrice: 130, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 100 }], meta: '⚡ Simple & Tasty', rating: '4.4' },
    { id: 'dl6', category: 'Dal', name: 'Plain Dal', price: 80, strikePrice: 100, veg: true, needsSpice: false, variants: [{ size: 'Full', price: 80 }], meta: '⚡ Homestyle', rating: '4.2' },

    // ---------- CHICKEN CURRY (spice selector ON) ----------
    { id: 'c1', category: 'Chicken', name: 'Chicken Curry', price: 160, strikePrice: 220, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 280 }], meta: '⚡ 20 mins', rating: '4.5' },
    { id: 'c2', category: 'Chicken', name: 'Chicken Karahi', price: 180, strikePrice: 240, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 180 }, { size: 'Full', price: 330 }], meta: '⚡ 25 mins', rating: '4.6' },
    { id: 'c3', category: 'Chicken', name: 'Chicken Do Pyaza', price: 170, strikePrice: 230, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 170 }, { size: 'Full', price: 300 }], meta: '⚡ 20 mins', rating: '4.4' },
    { id: 'c4', category: 'Chicken', name: 'Chicken Handi', price: 190, strikePrice: 260, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 190 }, { size: 'Full', price: 350 }], meta: '⚡ 25 mins', rating: '4.7' },
    { id: 'c5', category: 'Chicken', name: 'Chicken Butter Masala', price: 180, strikePrice: 250, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 180 }, { size: 'Full', price: 330 }], meta: '⚡ 25 mins', rating: '4.8' },
    { id: 'c6', category: 'Chicken', name: 'Chicken Masala', price: 200, strikePrice: 280, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 200 }, { size: 'Full', price: 380 }], meta: '⚡ 30 mins', rating: '4.5' },
    { id: 'c7', category: 'Chicken', name: 'Chicken Tikka Masala', price: 190, strikePrice: 260, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 190 }, { size: 'Full', price: 350 }], meta: '⚡ 25 mins', rating: '4.7' },
    { id: 'c9', category: 'Chicken', name: 'Chicken Tikka Butter Masala', price: 200, strikePrice: 270, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 200 }, { size: 'Full', price: 370 }], meta: '⚡ 30 mins', rating: '4.8' },
    { id: 'c8', category: 'Chicken', name: 'Chicken Dehati', price: 480, strikePrice: 550, veg: false, needsSpice: true, variants: [{ size: 'Full', price: 480 }], meta: '⚡ Bestseller', rating: '4.9' },

    // ---------- KEBAB (spice selector ON) ----------
    { id: 'k1', category: 'Kebab', name: 'Chicken Tandoori', price: 180, strikePrice: 240, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 180 }, { size: 'Full', price: 350 }], meta: '⚡ Charcoal Grilled', rating: '4.8' },
    { id: 'k2', category: 'Kebab', name: 'Chicken Tikka', price: 130, strikePrice: 180, veg: false, needsSpice: true, variants: [{ size: 'Half', price: 130 }, { size: 'Full', price: 220 }], meta: '⚡ 15 mins', rating: '4.6' },
    { id: 'k3', category: 'Kebab', name: 'Chicken Leg Kabab', price: 270, strikePrice: 320, veg: false, needsSpice: true, variants: [{ size: 'Full', price: 270 }], meta: '⚡ 20 mins', rating: '4.7' },

    // ---------- PANEER & VEG CURRY (spice selector ON) ----------
    { id: 'v1', category: 'Veg', name: 'Mix Veg', price: 120, strikePrice: 160, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 120 }, { size: 'Full', price: 200 }], meta: '⚡ Healthy', rating: '4.2' },
    { id: 'p3', category: 'Veg', name: 'Paneer Karahi', price: 150, strikePrice: 200, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 150 }, { size: 'Full', price: 260 }], meta: '⚡ 20 mins', rating: '4.7' },
    { id: 'p6', category: 'Veg', name: 'Paneer Do Pyaza', price: 140, strikePrice: 190, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 140 }, { size: 'Full', price: 250 }], meta: '⚡ 20 mins', rating: '4.5' },
    { id: 'p4', category: 'Veg', name: 'Paneer Handi', price: 160, strikePrice: 210, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 280 }], meta: '⚡ 20 mins', rating: '4.5' },
    { id: 'p7', category: 'Veg', name: 'Paneer Masala', price: 140, strikePrice: 190, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 140 }, { size: 'Full', price: 240 }], meta: '⚡ 20 mins', rating: '4.4' },
    { id: 'p1', category: 'Veg', name: 'Paneer Butter Masala', price: 160, strikePrice: 220, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 280 }], meta: '⚡ Sweet & Rich', rating: '4.9' },
    { id: 'p5', category: 'Veg', name: 'Paneer Tikka Masala', price: 160, strikePrice: 220, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 280 }], meta: '⚡ 25 mins', rating: '4.8' },
    { id: 'p2', category: 'Veg', name: 'Mutter Paneer', price: 150, strikePrice: 200, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 150 }, { size: 'Full', price: 270 }], meta: '⚡ 20 mins', rating: '4.6' },

    // ---------- MUSHROOM CURRY (spice selector ON) ----------
    { id: 'v2', category: 'Veg Curry', name: 'Mushroom Masala', price: 160, strikePrice: 220, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 280 }], meta: '⚡ 20 mins', rating: '4.5' },
    { id: 'v3', category: 'Veg Curry', name: 'Mushroom Butter Masala', price: 170, strikePrice: 230, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 170 }, { size: 'Full', price: 290 }], meta: '⚡ 20 mins', rating: '4.6' },
    { id: 'v4', category: 'Veg Curry', name: 'Mushroom Mutter Masala', price: 180, strikePrice: 240, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 180 }, { size: 'Full', price: 300 }], meta: '⚡ 25 mins', rating: '4.4' },
    { id: 'v5', category: 'Veg Curry', name: 'Mushroom Karahi', price: 160, strikePrice: 220, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 300 }], meta: '⚡ 20 mins', rating: '4.3' },
    { id: 'v6', category: 'Veg Curry', name: 'Mushroom Handi', price: 170, strikePrice: 230, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 170 }, { size: 'Full', price: 300 }], meta: '⚡ 25 mins', rating: '4.5' },
    { id: 'v7', category: 'Veg Curry', name: 'Mushroom Do Pyaza', price: 160, strikePrice: 220, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 160 }, { size: 'Full', price: 280 }], meta: '⚡ 25 mins', rating: '4.4' },
    { id: 'v8', category: 'Veg Curry', name: 'Mushroom Tikka Masala', price: 180, strikePrice: 240, veg: true, needsSpice: true, variants: [{ size: 'Half', price: 180 }, { size: 'Full', price: 320 }], meta: '⚡ 25 mins', rating: '4.6' },

    // ---------- RICE & ROTI (no spice selector) ----------
    { id: 'r2', category: 'RotiRice', name: 'Steam Rice', price: 60, strikePrice: 80, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 60 }, { size: 'Full', price: 120 }], meta: '⚡ 10 mins', rating: '4.0' },
    { id: 'r1', category: 'RotiRice', name: 'Jeera Rice', price: 80, strikePrice: 100, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 80 }, { size: 'Full', price: 130 }], meta: '⚡ 10 mins', rating: '4.4' },
    { id: 'r5', category: 'RotiRice', name: 'Mutter Pulav', price: 70, strikePrice: 90, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 70 }, { size: 'Full', price: 140 }], meta: '⚡ 15 mins', rating: '4.2' },
    { id: 'r4', category: 'RotiRice', name: 'Veg Pulav', price: 90, strikePrice: 120, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 90 }, { size: 'Full', price: 140 }], meta: '⚡ 15 mins', rating: '4.3' },
    { id: 'r3', category: 'RotiRice', name: 'Paneer Pulav', price: 100, strikePrice: 130, veg: true, needsSpice: false, variants: [{ size: 'Half', price: 100 }, { size: 'Full', price: 160 }], meta: '⚡ 15 mins', rating: '4.6' },
    { id: 'b4', category: 'RotiRice', name: 'Lachha Paratha', price: 25, strikePrice: 35, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 25 }], meta: '⚡ 5-10 mins', rating: '4.7' },
    { id: 'b8', category: 'RotiRice', name: 'Tandoori Roti', price: 20, strikePrice: 30, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 20 }], meta: '⚡ 5 mins', rating: '4.3' },
    { id: 'b3', category: 'RotiRice', name: 'Tandoori Butter Roti', price: 25, strikePrice: 35, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 25 }], meta: '⚡ 5 mins', rating: '4.5' },
    { id: 'b7', category: 'RotiRice', name: 'Plain Naan', price: 30, strikePrice: 40, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 30 }], meta: '⚡ 5 mins', rating: '4.3' },
    { id: 'b1', category: 'RotiRice', name: 'Butter Naan', price: 35, strikePrice: 45, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 35 }], meta: '⚡ 5-10 mins', rating: '4.8' },
    { id: 'b2', category: 'RotiRice', name: 'Garlic Naan', price: 70, strikePrice: 90, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 70 }], meta: '⚡ 5-10 mins', rating: '4.9' },
    { id: 'b5', category: 'RotiRice', name: 'Paneer Kulcha', price: 80, strikePrice: 100, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 80 }], meta: '⚡ 10 mins', rating: '4.8' },
    { id: 'b6', category: 'RotiRice', name: 'Onion Kulcha', price: 50, strikePrice: 65, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 50 }], meta: '⚡ 10 mins', rating: '4.5' },
    { id: 'b9', category: 'RotiRice', name: 'Stuffed Naan', price: 60, strikePrice: 80, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 60 }], meta: '⚡ 10 mins', rating: '4.6' },
    { id: 'b10', category: 'RotiRice', name: 'Stuffed Paratha', price: 60, strikePrice: 80, veg: true, needsSpice: false, variants: [{ size: 'Per Piece', price: 60 }], meta: '⚡ 10 mins', rating: '4.6' }
];
