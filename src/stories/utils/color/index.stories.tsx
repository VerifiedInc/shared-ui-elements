import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { lighten, darken, contrastColor } from '../../../utils/color';

// Component to display color utilities
const ColorDemo = ({
  color,
  lightenAmount = 20,
  darkenAmount = 20,
  contrastAlpha = 1,
}) => {
  const lightened = lighten(color, lightenAmount);
  const darkened = darken(color, darkenAmount);
  const contrast = contrastColor(color, contrastAlpha);

  const boxStyle = {
    display: 'inline-block',
    width: '100px',
    height: '100px',
    margin: '10px',
    textAlign: 'center' as const,
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    padding: '8px',
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>Color Utility Demo</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ ...boxStyle, backgroundColor: color }}>
          <span style={{ color: contrastColor(color) }}>Original</span>
          <code style={{ color: contrastColor(color) }}>{color}</code>
        </div>

        <div style={{ ...boxStyle, backgroundColor: lightened }}>
          <span style={{ color: contrastColor(lightened) }}>Lightened</span>
          <code style={{ color: contrastColor(lightened) }}>{lightened}</code>
          <small style={{ color: contrastColor(lightened) }}>
            {lightenAmount}%
          </small>
        </div>

        <div style={{ ...boxStyle, backgroundColor: darkened }}>
          <span style={{ color: contrastColor(darkened) }}>Darkened</span>
          <code style={{ color: contrastColor(darkened) }}>{darkened}</code>
          <small style={{ color: contrastColor(darkened) }}>
            {darkenAmount}%
          </small>
        </div>

        <div
          style={{
            ...boxStyle,
            backgroundColor: color,
            border: '1px solid #ddd',
          }}
        >
          <span style={{ color: contrast }}>Contrast Text</span>
          <code style={{ color: contrast }}>{contrast}</code>
          <small style={{ color: contrast }}>Alpha: {contrastAlpha}</small>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Utils/Color',
  component: ColorDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    lightenAmount: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'The amount to lighten the color (percentage)',
    },
    darkenAmount: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'The amount to darken the color (percentage)',
    },
    contrastAlpha: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'The alpha value for contrast color',
    },
  },
} satisfies Meta<typeof ColorDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: '#007bff',
    lightenAmount: 20,
    darkenAmount: 20,
    contrastAlpha: 1,
  },
};

export const Secondary: Story = {
  args: {
    color: '#6c757d',
    lightenAmount: 15,
    darkenAmount: 15,
    contrastAlpha: 1,
  },
};

export const Warning: Story = {
  args: {
    color: '#ffc107',
    lightenAmount: 25,
    darkenAmount: 25,
    contrastAlpha: 1,
  },
};

export const Error: Story = {
  args: {
    color: '#dc3545',
    lightenAmount: 20,
    darkenAmount: 20,
    contrastAlpha: 0.9,
  },
};

export const Success: Story = {
  args: {
    color: '#28a745',
    lightenAmount: 30,
    darkenAmount: 30,
    contrastAlpha: 1,
  },
};

export const CustomAlpha: Story = {
  args: {
    color: '#6f42c1',
    lightenAmount: 20,
    darkenAmount: 20,
    contrastAlpha: 0.5,
  },
};
