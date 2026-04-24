export interface Product {
  id: number
  name: string
  description: string
  price: number
  emoji: string
  tag: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Dev Conference Tee',
    description: 'Premium 100% organic cotton tee. Soft, breathable, and perfect for hacking away at your next project.',
    price: 29,
    emoji: '👕',
    tag: 'Best seller',
  },
  {
    id: 2,
    name: 'Hacker Hoodie',
    description: 'Heavyweight fleece hoodie with a kangaroo pocket. Because real devs stay warm and cozy.',
    price: 59,
    emoji: '🧥',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Sticker Pack',
    description: '10 premium vinyl stickers. Laptop-grade adhesive. Show the world your stack.',
    price: 9,
    emoji: '🎨',
    tag: 'Fan favourite',
  },
]
