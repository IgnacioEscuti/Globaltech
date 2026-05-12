const icons = {
    electronica: "📱",
    computacion: "💻",
    audio: "🎧",
    hogar: "🏠",
    deportes: "⚽",
    ropa: "👕",
    libros: "📚",
    juguetes: "🧸",
};

export function categoryIcon(category = "") {
    return icons[category.toLowerCase()] ?? "🛍";
}
