import { useSyncExternalStore } from 'react';

/**
 * A React hook that tracks the browser's online/offline status.
 * Uses the Navigator.onLine property and online/offline events for efficient status tracking.
 * Implements useSyncExternalStore for React 18+ concurrent rendering compatibility.
 *
 * Features:
 * - SSR compatible (defaults to online during server-side rendering)
 * - Updates automatically when network status changes
 * - Type-safe return value
 * - Zero dependencies
 *
 * @returns {boolean} Current online status of the browser
 */
export function useNavigatorOnline(): boolean {
  // Set up subscription to online/offline events
  const subscribe = (callback: () => void): (() => void) => {
    // Return no-op for server-side rendering
    if (typeof window === 'undefined') return () => {};

    // Add event listeners for online/offline events
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('online', callback);
      window.removeEventListener('offline', callback);
    };
  };

  // Get current online status
  const getSnapshot = (): boolean => {
    // Return true for server-side rendering
    if (typeof navigator === 'undefined') return true;
    return navigator.onLine;
  };

  // Server snapshot always returns online status
  const getServerSnapshot = (): boolean => {
    return true;
  };

  // Subscribe to online status changes using React 18's useSyncExternalStore
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
