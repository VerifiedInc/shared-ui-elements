import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material';

import { MotionBox } from '../animation/motions';
import { AdaptativeBox } from './AdaptativeBox';

type ContentWithLoaderProps = {
  isLoading?: boolean;
  loadingContent?: ReactNode;
  children: ReactNode;
};

export function ContentWithLoader({
  isLoading,
  loadingContent,
  children,
}: ContentWithLoaderProps) {
  return (
    <AnimatePresence initial={false}>
      <AdaptativeBox>
        {isLoading ? (
          loadingContent
        ) : (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
          >
            {children}
          </MotionBox>
        )}
      </AdaptativeBox>
    </AnimatePresence>
  );
}
