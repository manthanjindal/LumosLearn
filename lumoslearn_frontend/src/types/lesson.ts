export type InfoCard = {
	id: string;
	kind: 'info';
	title?: string;
	body: string; // plain text or lightweight markdown
};

export type QuizQuestion = {
	question: string;
	options: string[];
	answer: number; // index in options
};

export type QuizCard = {
	id: string;
	kind: 'quiz';
	title?: string;
	questions: QuizQuestion[]; // 1-2 questions
};

export type FlashCard = InfoCard | QuizCard;

export type FlashLesson = {
	id: string; // unique slug
	title: string;
	cards: FlashCard[];
	estMinutes?: number;
};

export type FlashTopic = {
	topic: string;
	lessons: FlashLesson[];
};

export type FlashCurriculum = Record<string, FlashLesson[]>; // key = topic

 