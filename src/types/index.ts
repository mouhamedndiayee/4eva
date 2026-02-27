export interface Weekend {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  start_date: string;
  sections: Array<{
    title: string;
    content: string;
    type: string;
  }>;
  created_at: string;
  created_by?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContemplationEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  verse_reference?: string;
  observation_type: string;
  images: string[];
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
  difficulty: string;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_date: string;
  score: number;
  total_questions: number;
  badges_earned: string[];
  created_at: string;
}
