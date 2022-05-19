export default async function getBasketItems() {
    const response = await fetch(`http://localhost:5000/api/basket`)
    const data = await response.json()
    return data.data
}
