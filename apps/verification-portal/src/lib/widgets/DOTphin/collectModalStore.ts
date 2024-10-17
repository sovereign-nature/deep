// collectModalStore.ts
import { writable } from 'svelte/store';

// Define the store with an object containing open state and action type
export const formModal = writable<{
  open: boolean;
  action: 'claim' | 'evolve';
}>({
  open: false,
  action: 'claim',
});

// Function to open the modal with a specific action
export function openModal(action: 'claim' | 'evolve') {
  formModal.set({ open: true, action });
}

// Function to close the modal and reset the action
export function closeModal() {
  formModal.set({ open: false, action: 'claim' });
}
