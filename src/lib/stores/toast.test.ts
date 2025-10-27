import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { toasts } from './toast';

describe('Toast Store', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		toasts.clear();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('starts with empty array', () => {
		const state = get(toasts);
		expect(state).toEqual([]);
	});

	it('adds a toast when show is called', () => {
		toasts.show('Test message', 'success');
		const state = get(toasts);
		expect(state).toHaveLength(1);
		expect(state[0]).toMatchObject({
			message: 'Test message',
			type: 'success'
		});
		expect(state[0].id).toBeDefined();
	});

	it('adds multiple toasts', () => {
		toasts.show('First', 'info');
		toasts.show('Second', 'error');
		const state = get(toasts);
		expect(state).toHaveLength(2);
	});

	it('removes toast after duration', () => {
		toasts.show('Test', 'info', 1000);
		expect(get(toasts)).toHaveLength(1);

		vi.advanceTimersByTime(1000);
		expect(get(toasts)).toHaveLength(0);
	});

	it('dismisses toast by id', () => {
		const id = toasts.show('Test', 'info', 0);
		expect(get(toasts)).toHaveLength(1);

		toasts.dismiss(id);
		expect(get(toasts)).toHaveLength(0);
	});

	it('clears all toasts', () => {
		toasts.show('First', 'info');
		toasts.show('Second', 'error');
		expect(get(toasts)).toHaveLength(2);

		toasts.clear();
		expect(get(toasts)).toHaveLength(0);
	});

	it('uses default type of info', () => {
		toasts.show('Test');
		const state = get(toasts);
		expect(state[0].type).toBe('info');
	});

	it('uses default duration of 3000ms', () => {
		toasts.show('Test', 'info');
		const state = get(toasts);
		expect(state[0].duration).toBe(3000);
	});
});
