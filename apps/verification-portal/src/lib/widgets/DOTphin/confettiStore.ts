import { writable } from 'svelte/store';

// Create a writable store for showConfetti
export const showConfetti = writable(false);

// Function to trigger confetti
export function triggerConfetti() {
  showConfetti.set(true);
}

// Function to reset confetti
export function resetConfetti() {
  showConfetti.set(false);
}
