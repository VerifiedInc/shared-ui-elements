import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Box, Button, Typography, Paper } from '@mui/material';

import { Tunnel } from '../../contexts/tunnel';

export default {
  title: 'Contexts/Tunnel',
  parameters: {
    docs: {
      description: {
        component:
          'A context that enables portal-based rendering, allowing content to be rendered in different parts of the component tree through tunnels. Useful for modals, tooltips, and complex layouts.',
      },
    },
  },
} as Meta;

const BasicTunnelDemo = () => {
  const [showContent, setShowContent] = useState(false);
  const [message, setMessage] = useState('Hello from the tunnel!');

  return (
    <Tunnel.Provider>
      <Box sx={{ padding: 3 }}>
        <Typography variant='h5' gutterBottom>
          Basic Tunnel Demo
        </Typography>

        <Paper sx={{ padding: 2, marginBottom: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant='h6' gutterBottom>
            Source Area (where content originates)
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <Button
              variant='contained'
              onClick={() => setShowContent(!showContent)}
            >
              {showContent ? 'Hide' : 'Show'} Content in Tunnel
            </Button>

            <Button
              variant='outlined'
              onClick={() =>
                setMessage(`Updated at ${new Date().toLocaleTimeString()}`)
              }
            >
              Update Message
            </Button>
          </Box>

          {showContent && (
            <Tunnel.Source id='demo-tunnel'>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: '#e3f2fd',
                  border: '2px dashed #2196f3',
                }}
              >
                <Typography variant='body1' color='primary'>
                  📡 {message}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  This content is rendered through a tunnel!
                </Typography>
              </Paper>
            </Tunnel.Source>
          )}
        </Paper>

        <Paper sx={{ padding: 2, backgroundColor: '#fff3e0' }}>
          <Typography variant='h6' gutterBottom>
            Target Area (where content appears)
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ marginBottom: 2 }}
          >
            Content from the source will appear below:
          </Typography>

          <Box sx={{ border: '2px dashed #ff9800', padding: 2 }}>
            <Tunnel.Target
              id='demo-tunnel'
              sx={{
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                borderRadius: 1,
                padding: 1,
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Tunnel.Provider>
  );
};

const MultipleTunnelsDemo = () => {
  const [tunnel1Content, setTunnel1Content] = useState('Content A');
  const [tunnel2Content, setTunnel2Content] = useState('Content B');
  const [showTunnel1, setShowTunnel1] = useState(true);
  const [showTunnel2, setShowTunnel2] = useState(true);

  return (
    <Tunnel.Provider>
      <Box sx={{ padding: 3 }}>
        <Typography variant='h5' gutterBottom>
          Multiple Tunnels Demo
        </Typography>

        <Paper sx={{ padding: 2, marginBottom: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant='h6' gutterBottom>
            Control Panel
          </Typography>

          <Box
            sx={{ display: 'flex', gap: 2, marginBottom: 2, flexWrap: 'wrap' }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => setShowTunnel1(!showTunnel1)}
            >
              {showTunnel1 ? 'Hide' : 'Show'} Tunnel A
            </Button>

            <Button
              variant='contained'
              color='secondary'
              onClick={() => setShowTunnel2(!showTunnel2)}
            >
              {showTunnel2 ? 'Hide' : 'Show'} Tunnel B
            </Button>

            <Button
              variant='outlined'
              onClick={() =>
                setTunnel1Content(`A: ${Math.random().toFixed(3)}`)
              }
            >
              Update A
            </Button>

            <Button
              variant='outlined'
              onClick={() =>
                setTunnel2Content(`B: ${Math.random().toFixed(3)}`)
              }
            >
              Update B
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
            {showTunnel1 && (
              <Tunnel.Source id='tunnel-a'>
                <Paper
                  sx={{
                    padding: 1.5,
                    backgroundColor: '#e8f5e8',
                    border: '2px solid #4caf50',
                    m: 0,
                  }}
                >
                  <Typography variant='body2' color='success.dark'>
                    🟢 {tunnel1Content}
                  </Typography>
                </Paper>
              </Tunnel.Source>
            )}

            {showTunnel2 && (
              <Tunnel.Source id='tunnel-b'>
                <Paper
                  sx={{
                    padding: 1.5,
                    backgroundColor: '#f3e5f5',
                    border: '2px solid #9c27b0',
                    m: 0,
                  }}
                >
                  <Typography variant='body2' color='secondary.dark'>
                    🟣 {tunnel2Content}
                  </Typography>
                </Paper>
              </Tunnel.Source>
            )}
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Paper sx={{ flex: 1, padding: 2, backgroundColor: '#e8f5e8' }}>
            <Typography variant='h6' gutterBottom color='success.dark'>
              Target A
            </Typography>
            <Tunnel.Target
              id='tunnel-a'
              sx={{
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                border: '2px dashed #4caf50',
                borderRadius: 1,
                padding: 1,
              }}
            />
          </Paper>

          <Paper sx={{ flex: 1, padding: 2, backgroundColor: '#f3e5f5' }}>
            <Typography variant='h6' gutterBottom color='secondary.dark'>
              Target B
            </Typography>
            <Tunnel.Target
              id='tunnel-b'
              sx={{
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                border: '2px dashed #9c27b0',
                borderRadius: 1,
                padding: 1,
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Tunnel.Provider>
  );
};

const NestedTunnelDemo = () => {
  const [showOuter, setShowOuter] = useState(true);
  const [showInner, setShowInner] = useState(true);

  return (
    <Tunnel.Provider>
      <Box sx={{ padding: 3 }}>
        <Typography variant='h5' gutterBottom>
          Nested Tunnels Demo
        </Typography>

        <Paper sx={{ padding: 2, marginBottom: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant='h6' gutterBottom>
            Source Content
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <Button
              variant='contained'
              onClick={() => setShowOuter(!showOuter)}
            >
              {showOuter ? 'Hide' : 'Show'} Outer Content
            </Button>

            <Button variant='outlined' onClick={() => setShowInner(!showInner)}>
              {showInner ? 'Hide' : 'Show'} Inner Content
            </Button>
          </Box>

          {showOuter && (
            <Tunnel.Source id='outer-tunnel'>
              <Paper
                sx={{
                  padding: 2,
                  backgroundColor: '#e3f2fd',
                  border: '2px solid #2196f3',
                }}
              >
                <Typography variant='body1' color='primary' gutterBottom>
                  🔵 Outer tunnel content
                </Typography>

                {showInner && (
                  <Tunnel.Source id='inner-tunnel'>
                    <Paper
                      sx={{
                        padding: 1.5,
                        backgroundColor: '#fff3e0',
                        border: '2px solid #ff9800',
                      }}
                    >
                      <Typography variant='body2' color='warning.dark'>
                        🟠 Inner tunnel content (nested)
                      </Typography>
                    </Paper>
                  </Tunnel.Source>
                )}
              </Paper>
            </Tunnel.Source>
          )}
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
          <Paper sx={{ padding: 2, backgroundColor: '#e3f2fd' }}>
            <Typography variant='h6' gutterBottom color='primary'>
              Outer Target
            </Typography>
            <Tunnel.Target
              id='outer-tunnel'
              sx={{
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                border: '2px dashed #2196f3',
                borderRadius: 1,
                padding: 2,
              }}
            />
          </Paper>

          <Paper sx={{ padding: 2, backgroundColor: '#fff3e0' }}>
            <Typography variant='h6' gutterBottom color='warning.dark'>
              Inner Target
            </Typography>
            <Tunnel.Target
              id='inner-tunnel'
              sx={{
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                border: '2px dashed #ff9800',
                borderRadius: 1,
                padding: 1,
              }}
            />
          </Paper>
        </Box>
      </Box>
    </Tunnel.Provider>
  );
};

// Story exports
export const BasicTunnel: StoryFn = () => <BasicTunnelDemo />;
export const MultipleTunnels: StoryFn = () => <MultipleTunnelsDemo />;
export const NestedTunnels: StoryFn = () => <NestedTunnelDemo />;

BasicTunnel.storyName = 'Basic Tunnel';
BasicTunnel.parameters = {
  docs: {
    description: {
      story:
        'A basic example showing how to use the tunnel context to render content from one location to another.',
    },
  },
};

MultipleTunnels.storyName = 'Multiple Tunnels';
MultipleTunnels.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates how multiple tunnels can be used simultaneously with different IDs.',
    },
  },
};

NestedTunnels.storyName = 'Nested Tunnels';
NestedTunnels.parameters = {
  docs: {
    description: {
      story:
        'Shows how tunnels can be nested within each other for complex layout scenarios.',
    },
  },
};
