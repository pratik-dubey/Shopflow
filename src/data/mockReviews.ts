export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

export const mockReviews: Review[] = [
  { id: 1, author: "Sarah M.", rating: 5, date: "2024-01-15", title: "Amazing product!", content: "Exceeded all my expectations. Quality is outstanding.", verified: true, helpful: 45 },
  { id: 2, author: "James K.", rating: 4, date: "2024-01-12", title: "Great value", content: "Works perfectly. Minor packaging issues but product is great.", verified: true, helpful: 32 },
  { id: 3, author: "Emily R.", rating: 5, date: "2024-01-10", title: "Love it!", content: "Best purchase this year. Highly recommend to everyone.", verified: true, helpful: 28 },
  { id: 4, author: "Michael D.", rating: 3, date: "2024-01-08", title: "Decent", content: "Does the job. Nothing special but fair price.", verified: false, helpful: 15 },
  { id: 5, author: "Lisa T.", rating: 5, date: "2024-01-05", title: "Perfect gift", content: "Bought as gift, recipient loved it!", verified: true, helpful: 22 },
];

export const getReviewsForProduct = (productId: number): Review[] => {
  const shuffled = [...mockReviews].sort(() => Math.sin(productId * 12345) - 0.5);
  return shuffled.slice(0, 3 + (productId % 3));
};

export const getAggregatedStats = (reviews: Review[]) => {
  if (!reviews.length) return { average: 0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => distribution[r.rating]++);
  return { average: parseFloat((sum / total).toFixed(1)), total, distribution };
};