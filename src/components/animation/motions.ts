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

export const MotionBox = motion(Box as any, {
  forwardMotionProps: false,
});

export const MotionStack = motion(Stack as any, {
  forwardMotionProps: false,
});

export const MotionTbody = motion(TableBody as any, {
  forwardMotionProps: false,
});

export const MotionTableRow = motion(TableRow as any, {
  forwardMotionProps: false,
});

export const MotionTableCell = motion(TableCell as any, {
  forwardMotionProps: false,
});

export const MotionTypography = motion(Typography as any, {
  forwardMotionProps: false,
});

export const MotionButton = motion(Button as any, {
  forwardMotionProps: false,
});
