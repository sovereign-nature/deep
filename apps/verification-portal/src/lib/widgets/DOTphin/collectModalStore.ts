// modalStore.ts
import { writable } from 'svelte/store';

export const formModal = writable(false);

export function openModal() {
  formModal.set(true);
}

export function closeModal() {
  formModal.set(false);
}
