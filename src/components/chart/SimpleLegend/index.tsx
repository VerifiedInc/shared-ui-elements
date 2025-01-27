import { type ReactElement } from 'react';
import { Box } from '@mui/material';

/**
 * Generic payload interface for legend items.
 * Represents the data structure of each legend entry's payload.
 */
export interface Payload {
  /** Unique identifier for the legend item */
  name: string;
  /** Additional dynamic properties */
  [key: string]: any;
}

/**
 * Represents a single entry in the legend.
 */
interface LegendEntry {
  /** Display value for the legend item */
  value: string;
  /** Data payload associated with the legend item */
  payload: Payload;
  /** Color to be used for the legend item's marker and text */
  color: string;
}

/**
 * Props for the SimpleLegend component
 */
interface CustomLegendProps {
  /** Array of legend entries to be displayed */
  payload?: LegendEntry[];
  /** Set of item names that are currently hidden */
  hiddenItems: Set<string>;
  /** Optional callback function triggered when a legend item is clicked */
  onToggle?: (payload: Payload) => void;
  /** Optional label prefix for legend items */
  legendLabel?: string;
}

/**
 * A reusable legend component for charts that supports item toggling and custom styling.
 *
 * This component renders a horizontal list of legend items, each with a colored square marker
 * and associated text. Items can be clicked to toggle their visibility in the associated chart.
 *
 * Features:
 * - Customizable colors for markers and text
 * - Click to toggle visibility
 * - Visual feedback for hidden items (reduced opacity)
 * - Optional label prefix for all items
 * - Centered layout with consistent spacing
 *
 * @example
 * ```tsx
 * <SimpleLegend
 *   hiddenItems={new Set(["A"])}
 *   onToggle={(payload) => console.log("Toggled:", payload.name)}
 *   legendLabel="Type"
 * />
 * ```
 */
export function SimpleLegend({
  payload = [],
  hiddenItems,
  onToggle,
  legendLabel,
}: CustomLegendProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        paddingTop: '20px',
      }}
    >
      {payload.map((entry, index) => {
        const isHidden = hiddenItems.has(entry.payload.name);
        return (
          <div
            key={`legend-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              opacity: isHidden ? 0.4 : 1,
            }}
            onClick={() => {
              onToggle?.(entry.payload);
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                marginRight: '8px',
                borderRadius: '2px',
              }}
            />
            <span style={{ color: entry.color }}>
              {legendLabel ? `${legendLabel}: ${entry.value}` : entry.value}
            </span>
          </div>
        );
      })}
    </Box>
  );
}
