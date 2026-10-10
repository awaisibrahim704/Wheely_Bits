export type RimScanMatch = {
  rank: number;
  label: string;
  score: number;
  cosine_similarity?: number;
  image_url: string;
};
