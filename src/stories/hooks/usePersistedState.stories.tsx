import * as React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  usePersistedState,
  type Persistor,
} from '../../hooks/usePersistedState';

const meta: Meta = {
  title: 'Hooks/usePersistedState',
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

const containerStyle = {
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  marginBottom: '1rem',
};

const valueStyle = {
  padding: '0.5rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  marginTop: '0.5rem',
  fontFamily: 'monospace' as const,
};

const badgeStyle = (color: string) => ({
  display: 'inline-block',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  backgroundColor: color,
  color: '#fff',
  fontSize: '0.75rem',
  marginLeft: '0.5rem',
});

// --- String example ---

const StringExample = () => {
  const storage = useLocalStorage('persisted-state-string-demo');
  const [value, setValue, ready] = usePersistedState('Hello, World!', storage);

  return (
    <Section title='String value'>
      <div style={containerStyle}>
        <p>
          Persists a string to <code>localStorage</code>. Reload the page — the
          value survives.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            disabled={!ready}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type something…'
            style={{ flex: 1, padding: '0.4rem' }}
          />
          <button onClick={() => setValue('Hello, World!')}>Reset</button>
          <span style={badgeStyle(ready ? '#2e7d32' : '#c62828')}>
            {ready ? 'ready' : 'loading'}
          </span>
        </div>
        <div style={valueStyle}>value: {JSON.stringify(value)}</div>
      </div>
    </Section>
  );
};

// --- Object example ---

interface UserPrefs {
  theme: 'light' | 'dark';
  fontSize: number;
}

const defaultPrefs: UserPrefs = { theme: 'light', fontSize: 14 };

const ObjectExample = () => {
  const storage = useLocalStorage('persisted-state-prefs-demo');
  const [prefs, setPrefs, ready] = usePersistedState<UserPrefs>(
    defaultPrefs,
    storage,
  );

  return (
    <Section title='Object value (user preferences)'>
      <div style={containerStyle}>
        <p>
          Persists a structured object. Changes are written to{' '}
          <code>localStorage</code> automatically on every update.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap' as const,
            marginBottom: '0.75rem',
          }}
        >
          <label>
            Theme:{' '}
            <select
              disabled={!ready}
              value={prefs?.theme ?? defaultPrefs.theme}
              onChange={(e) =>
                setPrefs((p) => ({
                  ...(p ?? defaultPrefs),
                  theme: e.target.value as UserPrefs['theme'],
                }))
              }
            >
              <option value='light'>light</option>
              <option value='dark'>dark</option>
            </select>
          </label>
          <label>
            Font size:{' '}
            <input
              type='number'
              disabled={!ready}
              value={prefs?.fontSize ?? defaultPrefs.fontSize}
              min={10}
              max={24}
              style={{ width: '4rem' }}
              onChange={(e) =>
                setPrefs((p) => ({
                  ...(p ?? defaultPrefs),
                  fontSize: Number(e.target.value),
                }))
              }
            />
          </label>
          <button onClick={() => setPrefs(defaultPrefs)}>Reset</button>
          <span style={badgeStyle(ready ? '#2e7d32' : '#c62828')}>
            {ready ? 'ready' : 'loading'}
          </span>
        </div>
        <div style={valueStyle}>{JSON.stringify(prefs, null, 2)}</div>
      </div>
    </Section>
  );
};

// --- Async persistor (simulates IndexedDB / remote storage) ---

const asyncStore: Record<string, string> = {};

function makeAsyncPersistor(key: string, delayMs = 800): Persistor<string> {
  return {
    get: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(asyncStore[key] ?? null), delayMs),
      ),
    set: (value) =>
      new Promise((resolve) =>
        setTimeout(() => {
          asyncStore[key] = value;
          resolve();
        }, delayMs),
      ),
  };
}

const AsyncExample = () => {
  const [value, setValue, ready] = usePersistedState(
    'async default',
    makeAsyncPersistor('async-demo'),
  );

  return (
    <Section title='Async persistor (simulated 800 ms delay)'>
      <div style={containerStyle}>
        <p>
          When <code>get</code> returns a <code>Promise</code>, the lazy
          initializer detects it and returns <code>null</code> immediately. The
          effect awaits the promise and sets <code>ready</code> once it
          resolves. Reload the story — the value is remembered in the simulated
          store for the session.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            disabled={!ready}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type something…'
            style={{ flex: 1, padding: '0.4rem' }}
          />
          <span style={badgeStyle(ready ? '#2e7d32' : '#c62828')}>
            {ready ? 'ready' : 'loading…'}
          </span>
        </div>
        <div style={valueStyle}>value: {JSON.stringify(value)}</div>
      </div>
    </Section>
  );
};

// --- Failing persistor (simulates SSR / unavailable storage) ---

function makeFailingPersistor<T>(): Persistor<T> {
  return {
    get: () => {
      throw new Error('Storage unavailable');
    },
    set: () => {
      throw new Error('Storage unavailable');
    },
  };
}

const FallbackExample = () => {
  const [value, setValue, ready] = usePersistedState(
    'fallback default',
    makeFailingPersistor<string>(),
  );

  return (
    <Section title='Failing persistor (SSR / unavailable storage)'>
      <div style={containerStyle}>
        <p>
          When the persistor throws (e.g. during SSR), <code>value</code> starts
          as <code>null</code> and <code>ready</code> is <code>false</code>. The
          effect recovers after mount, setting <code>value</code> to{' '}
          <code>initialState</code>.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            disabled={!ready}
            value={value ?? ''}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Type something…'
            style={{ flex: 1, padding: '0.4rem' }}
          />
          <span style={badgeStyle(ready ? '#2e7d32' : '#c62828')}>
            {ready ? 'ready' : 'loading'}
          </span>
        </div>
        <div style={valueStyle}>value: {JSON.stringify(value)}</div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
          Note: changes are not persisted here — the persistor always throws.
        </p>
      </div>
    </Section>
  );
};

// --- Stories ---

export const Default: StoryFn = () => (
  <div>
    <StringExample />
    <ObjectExample />
    <AsyncExample />
    <FallbackExample />
  </div>
);

Default.parameters = {
  docs: {
    description: {
      component: `
A hook that synchronises a state value with any \`Persistor<T>\` (e.g. \`useLocalStorage\`).

### Signature

\`\`\`tsx
function usePersistedState<T>(
  initialState: T,
  persistor: Persistor<T>,
): [T | null, Dispatch<SetStateAction<T | null>>, boolean]
\`\`\`

- **\`value\`** — \`null\` until the persistor is read; afterwards \`persistedValue ?? initialState\`.
- **\`setValue\`** — standard React setter; each call automatically writes back to the persistor.
- **\`ready\`** — \`true\` once the persisted value has been resolved. Guard renders on this.

### Basic usage

\`\`\`tsx
const storage = useLocalStorage('my-key');
const [value, setValue, ready] = usePersistedState('default', storage);

if (!ready) return <Skeleton />;
return <Input value={value} onChange={e => setValue(e.target.value)} />;
\`\`\`

### Custom persistor

\`\`\`tsx
const sessionPersistor: Persistor<string> = {
  get: () => sessionStorage.getItem('key'),
  set: (v) => sessionStorage.setItem('key', v),
};

const [value, setValue, ready] = usePersistedState('default', sessionPersistor);
\`\`\`
`,
    },
  },
};
