import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useDisclosure } from '../../hooks/useDisclosure';

const meta: Meta = {
  title: 'Hooks/useDisclosure',
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
    {children}
  </div>
);

const Example = () => {
  // Basic Usage
  const basicDisclosure = useDisclosure();

  // With Callbacks
  const callbackDisclosure = useDisclosure({
    onOpen: () => console.log('Opening...'),
    onClose: () => console.log('Closing...'),
  });

  // Controlled Mode
  const [isOpen, setIsOpen] = React.useState(false);
  const controlledDisclosure = useDisclosure({
    open: isOpen,
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true),
  });

  // Default Open
  const defaultOpenDisclosure = useDisclosure({
    defaultOpen: true,
  });

  const contentStyle = {
    marginTop: '1rem',
    padding: '1rem',
    border: '1px solid #ccc',
  };

  return (
    <div>
      <Section title='Basic Usage'>
        <button {...basicDisclosure.getButtonProps()}>
          {basicDisclosure.open ? 'Close' : 'Open'} Content
        </button>
        <div {...basicDisclosure.getDisclosureProps()} style={contentStyle}>
          This content is {basicDisclosure.open ? 'visible' : 'hidden'}!
        </div>
      </Section>

      <Section title='With Callbacks'>
        <p style={{ marginBottom: '1rem' }}>
          Check the console for open/close logs
        </p>
        <button {...callbackDisclosure.getButtonProps()}>
          {callbackDisclosure.open ? 'Close' : 'Open'} Content
        </button>
        <div {...callbackDisclosure.getDisclosureProps()} style={contentStyle}>
          This content has logging callbacks!
        </div>
      </Section>

      <Section title='Controlled Mode'>
        <div style={{ marginBottom: '1rem' }}>
          <strong>External Control:</strong>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ marginLeft: '1rem' }}
          >
            Toggle from Outside
          </button>
        </div>

        <button {...controlledDisclosure.getButtonProps()}>
          {controlledDisclosure.open ? 'Close' : 'Open'} Content
        </button>
        <div
          {...controlledDisclosure.getDisclosureProps()}
          style={contentStyle}
        >
          This content is controlled externally!
        </div>
      </Section>

      <Section title='Default Open'>
        <button {...defaultOpenDisclosure.getButtonProps()}>
          {defaultOpenDisclosure.open ? 'Close' : 'Open'} Content
        </button>
        <div
          {...defaultOpenDisclosure.getDisclosureProps()}
          style={contentStyle}
        >
          This content starts open by default!
        </div>
      </Section>
    </div>
  );
};

export const Default: StoryFn = () => <Example />;

Default.parameters = {
  title: 'Hooks/useDisclosure',
  docs: {
    description: {
      component: `A hook that provides a simple and flexible way to manage the open and close state of a component.`,
    },
  },
};
