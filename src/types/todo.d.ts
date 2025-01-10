export interface Todo {
	id: number;
	title: string;
	description: string | null;
	createdAt: string;
	updatedAt: string;
	isCompleted: boolean;
}
