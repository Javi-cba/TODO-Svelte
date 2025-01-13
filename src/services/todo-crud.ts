import type { Todo } from '../types/todo';

const getData = async (): Promise<Todo[]> => {
	try {
		const response = await fetch('http://localhost:5173/api/todo', {
			method: 'GET'
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error al obtener los datos:', error);
		return [];
	}
};

export { getData };
