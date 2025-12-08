import { useSyncExternalStore } from 'react';

/**
 * Network connection type from the Network Information API.
 * Represents the type of connection used (bluetooth, cellular, ethernet, wifi, etc.).
 */
type NetworkType =
  | 'bluetooth'
  | 'cellular'
  | 'ethernet'
  | 'none'
  | 'wifi'
  | 'wimax'
  | 'other'
  | 'unknown';

/**
 * A React hook that tracks the network's connection type.
 * Uses the Navigator.connection.type property and change events for efficient tracking.
 * Implements useSyncExternalStore for React 18+ concurrent rendering compatibility.
 *
 * Features:
 * - SSR compatible (defaults to 'unknown' during server-side rendering)
 * - Updates automatically when network type changes
 * - Type-safe return value
 * - Zero dependencies
 *
 * Note: The Network Information API is not available in all browsers.
 * Check browser compatibility before relying on this hook.
 *
 * @returns {NetworkType} Current network connection type ('bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown')
 */
export function useNetworkType(): NetworkType {
  // Set up subscription to network connection change events
  const subscribe = (callback: () => void): (() => void) => {
    // Return no-op for server-side rendering
    if (typeof window === 'undefined') return () => {};

    // Check if the Network Information API is available
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (!connection) {
      // API not available, return no-op
      return () => {};
    }

    // Add event listener for connection change events
    connection.addEventListener('change', callback);

    // Cleanup function to remove event listener
    return () => {
      connection.removeEventListener('change', callback);
    };
  };

  // Get current network connection type
  const getSnapshot = (): NetworkType => {
    // Return 'unknown' for server-side rendering
    if (typeof navigator === 'undefined') return 'unknown';

    // Check if the Network Information API is available
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (!connection?.type) {
      // API not available, default to 'unknown'
      return 'unknown';
    }

    return connection.type as NetworkType;
  };

  // Server snapshot always returns 'unknown' as default
  const getServerSnapshot = (): NetworkType => {
    return 'unknown';
  };

  // Subscribe to network type changes using React 18's useSyncExternalStore
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
