export function formatCurrency(amount, currency) {
    const currency = localStorage.getItem("currency") || "USD";

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(Number(amount));
}