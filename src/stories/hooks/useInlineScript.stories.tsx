import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useInlineScript } from '../../hooks/useInlineScript';

const meta: Meta = {
  title: 'Hooks/useInlineScript',
  parameters: {
    docs: {
      description: {
        component:
          'A React hook for loading and executing inline JavaScript within a component.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const ScriptExample = ({
  name,
  script,
  removeOnUnmount = false,
}: {
  name: string;
  script: string;
  removeOnUnmount?: boolean;
}) => {
  const status = useInlineScript(name, script, {
    removeOnUnmount,
    addToHead: true,
  });
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Check if the window object has our custom property after script loads
    if ((window as any)[name]) {
      setMessage(`Script function "${name}" is ready and has been executed!`);
    }
  }, [status, name]);

  return (
    <div
      style={{ padding: '20px', border: '1px solid #eee', borderRadius: '4px' }}
    >
      {message && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#e6f7ff',
            borderRadius: '4px',
          }}
        >
          {message}
        </div>
      )}
      <div style={{ marginTop: '15px' }}>
        <button
          onClick={() => {
            if ((window as any)[name]) {
              (window as any)[name]();
            } else {
              alert('Script function not available yet');
            }
          }}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Execute Script Function
        </button>
      </div>
      <div style={{ marginTop: '15px' }}>
        <h4>Script Source:</h4>
        <pre
          style={{
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto',
          }}
        >
          {script}
        </pre>
      </div>
    </div>
  );
};

/**
 * Simple example of using the useInlineScript hook to load and execute a basic
 * JavaScript function that will be available globally.
 */
export const Basic: Story = {
  render: () => {
    const scriptName = 'helloWorld';
    const scriptContent = `
      window.helloWorld = function() {
        alert('Hello from inline script!');
        console.log('Inline script executed at: ' + new Date().toISOString());
      };
    `;

    return <ScriptExample name={scriptName} script={scriptContent} />;
  },
};

/**
 * Example demonstrating how to remove the script when the component unmounts.
 */
export const RemoveOnUnmount: Story = {
  render: () => {
    const scriptName = 'countVisits';
    const scriptContent = `
      window.countVisits = (function() {
        let count = 0;
        
        return function() {
          count++;
          alert('This component has been visited ' + count + ' time(s)');
        };
      })();
    `;

    return (
      <div>
        <ScriptExample
          name={scriptName}
          script={scriptContent}
          removeOnUnmount={true}
        />
        <p style={{ marginTop: '20px', color: '#666' }}>
          When this component unmounts, the script will be removed from the DOM.
          Try navigating away and back to see the counter reset.
        </p>
      </div>
    );
  },
};

/**
 * Example showing how to handle loading an external API via inline script.
 */
export const LoadingExternalAPI: Story = {
  render: () => {
    const scriptName = 'fakeApiLoader';
    const scriptContent = `
      window.fakeApiLoader = (function() {
        // Simulate loading an external API
        console.log('Started loading fake API...');
        
        // Simulate slow API load with timeout
        setTimeout(() => {
          console.log('Fake API loaded successfully');
          window.fakeApiReady = true;
          
          // Dispatch a custom event that components can listen for
          const event = new CustomEvent('fakeApiReady');
          document.dispatchEvent(event);
        }, 2000);
        
        return function checkStatus() {
          alert('API Ready: ' + (window.fakeApiReady ? 'Yes' : 'Still loading...'));
        };
      })();
    `;

    return (
      <div>
        <ScriptExample name={scriptName} script={scriptContent} />
        <p style={{ marginTop: '20px', color: '#666' }}>
          This example simulates loading an external API with a 2-second delay.
          Check the console for loading messages.
        </p>
      </div>
    );
  },
};
