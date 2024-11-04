import { Box } from '@mui/material';

import { useQRCode } from '../../hooks';

export interface QRCodeDisplayProps {
  data: string;
  asset?: string;
  svgSize?: number;
  logoSize?: number;
  fill?: string;
}

export function QRCodeDisplay({
  data,
  asset,
  svgSize = 300,
  logoSize = 0,
  fill = '#000000',
}: QRCodeDisplayProps) {
  const svg = useQRCode({
    data: data,
    size: svgSize,
    imageSize: logoSize,
    fill,
  });

  return (
    <Box position='relative'>
      <Box
        display='flex'
        sx={{ '& svg': { width: '100%', height: 'auto', aspectRatio: 1 } }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <Box
        component='img'
        src={asset}
        sx={{
          position: 'absolute',
          width: (logoSize / svgSize) * 100 + '%',
          maxWidth: logoSize + 'px',
          height: 'auto',
          inset: 0,
          aspectRatio: 1,
          m: 'auto',
          p: 0.5,
        }}
      />
    </Box>
  );
}
