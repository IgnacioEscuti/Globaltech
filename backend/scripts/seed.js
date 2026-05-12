// Poblar la base de datos con productos de ejemplo
// Uso: node scripts/seed.js (desde la carpeta backend/)
import "dotenv/config";
import mongoose from "mongoose";
import Product from "../src/models/product.model.js";

await mongoose.connect(process.env.MONGODB_URI);

const products = [
    { title: "iPhone 15 Pro",            description: "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.1 pulgadas.", price: 1299, category: "electronica", stock: 25 },
    { title: "Samsung Galaxy S24 Ultra",  description: "Pantalla Dynamic AMOLED 2X de 6.8\", cámara de 200MP, S Pen integrado y 12GB de RAM.", price: 1199, category: "electronica", stock: 18 },
    { title: "GoPro Hero 12 Black",       description: "Cámara de acción 5.3K, estabilización HyperSmooth 6.0, resistente al agua hasta 10m.", price: 399,  category: "electronica", stock: 40 },
    { title: "Apple Watch Series 9",      description: "Smartwatch con chip S9, pantalla Always-On Retina, sensor de oxígeno en sangre y GPS.", price: 499,  category: "electronica", stock: 30 },
    { title: "MacBook Air M3",            description: "Laptop ultradelgada con chip Apple M3, 8GB RAM, SSD 256GB y batería de hasta 18 horas.", price: 1299, category: "computacion", stock: 15 },
    { title: "Dell XPS 15",              description: "Intel Core i9 de 13a gen, pantalla OLED 4K de 15.6\", 32GB RAM y RTX 4060.", price: 1999, category: "computacion", stock: 10 },
    { title: "iPad Pro 12.9\"",           description: "Chip M2, pantalla Liquid Retina XDR, compatible con Apple Pencil y Magic Keyboard.", price: 1099, category: "computacion", stock: 20 },
    { title: "Logitech MX Master 3S",    description: "Mouse inalámbrico de alta precisión, 8000 DPI, carga USB-C y scroll electromagnético.", price: 99,   category: "computacion", stock: 60 },
    { title: "Monitor LG UltraWide 34\"", description: "Panel IPS 34 pulgadas, resolución 3440×1440, 144Hz, compatible con HDR10 y USB-C.", price: 699,  category: "computacion", stock: 12 },
    { title: "AirPods Pro 2da Gen",       description: "Cancelación activa de ruido, audio espacial personalizado, hasta 30 horas de batería con el estuche.", price: 249, category: "audio", stock: 50 },
    { title: "Sony WH-1000XM5",          description: "Los mejores auriculares con cancelación de ruido del mercado. Sonido Hi-Res, 30hs de batería.", price: 349, category: "audio", stock: 35 },
    { title: "JBL Flip 6",               description: "Parlante Bluetooth portátil, resistente al agua IP67, sonido potente en 360°, 12hs de batería.", price: 129, category: "audio", stock: 45 },
    { title: "Bose QuietComfort 45",      description: "Auriculares over-ear con cancelación de ruido líder en la industria y 24 horas de batería.", price: 279, category: "audio", stock: 22 },
    { title: "Smart TV Samsung 55\" 4K",  description: "Pantalla QLED 4K, sistema Tizen OS, compatible con Alexa y Google Assistant, 120Hz.", price: 799, category: "hogar", stock: 8  },
    { title: "Amazon Echo Dot 5ta Gen",   description: "Parlante inteligente compacto con Alexa, sonido mejorado y hub de hogar inteligente.", price: 49,  category: "hogar", stock: 80 },
    { title: "Philips Hue Starter Kit",   description: "3 focos LED inteligentes con hub, 16 millones de colores, control por app y voz.", price: 129, category: "hogar", stock: 30 },
    { title: "Garmin Forerunner 265",     description: "Reloj GPS para corredores con pantalla AMOLED, métricas avanzadas y batería de 15 días.", price: 449, category: "deportes", stock: 20 },
    { title: "Polar H10 Monitor Cardíaco", description: "Sensor de frecuencia cardíaca para pecho, la referencia en precisión para entrenamientos.", price: 89, category: "deportes", stock: 35 },
];

await Product.insertMany(products);
console.log(`✓ ${products.length} productos insertados correctamente`);
await mongoose.disconnect();
