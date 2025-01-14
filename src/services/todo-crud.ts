// ACA EN SERVICES ESTAN TODAS LAS CONSULTAS AL BACKEND (/api/todo)
// MENOS EL POST Y EL PUT QUE LO HACEMOS DESDE LAS SERVER ACTIONS DEL FORMULARIO

import type { Todo } from '../types/todo';

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';

const getData = async (): Promise<Todo[]> => {
	try {
		const response = await fetch(`${baseURL}/api/todo`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error al obtener los datos:', error);
		return [];
	}
};

const getTodoById = async (id: string): Promise<Todo[]> => {
	try {
		const response = await fetch(`${baseURL}/api/todo/find-byid?id=${id}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error al obtener los datos:', error);
		return [];
	}
};

const putStatusById = async (id: string): Promise<Todo[]> => {
	try {
		const response = await fetch(`${baseURL}/api/todo/status?id=${id}`, {
			method: 'PUT'
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error al modificar el estado:', error);
		return [];
	}
};

export { getData, getTodoById, putStatusById };
