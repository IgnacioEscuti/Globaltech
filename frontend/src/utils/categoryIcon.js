const icons = {
    electronica: "📱",
    computacion: "💻",
    audio: "🎧",
    hogar: "🏠",
    deportes: "⚽",
};

export function categoryIcon(category = "") {
    return icons[category.toLowerCase()] ?? "🛍";
}
