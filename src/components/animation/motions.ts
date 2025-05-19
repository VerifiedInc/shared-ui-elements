import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';

export const MotionBox = motion(Box as React.ComponentType<any>, {
  forwardMotionProps: false,
});

export const MotionStack = motion(Stack as React.ComponentType<any>, {
  forwardMotionProps: false,
});

export const MotionTbody = motion(TableBody as React.ComponentType<any>, {
  forwardMotionProps: false,
});

export const MotionTableRow = motion(TableRow as React.ComponentType<any>, {
  forwardMotionProps: false,
});

export const MotionTableCell = motion(TableCell as React.ComponentType<any>, {
  forwardMotionProps: false,
});

export const MotionTypography = motion(Typography as React.ComponentType<any>, {
  forwardMotionProps: false,
});

export const MotionButton = motion(Button as React.ComponentType<any>, {
  forwardMotionProps: false,
});
