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

export const MotionBox = motion.create(Box as any, {
  forwardMotionProps: false,
});

export const MotionStack = motion.create(Stack as any, {
  forwardMotionProps: false,
});

export const MotionTbody = motion.create(TableBody as any, {
  forwardMotionProps: false,
});

export const MotionTableRow = motion.create(TableRow as any, {
  forwardMotionProps: false,
});

export const MotionTableCell = motion.create(TableCell as any, {
  forwardMotionProps: false,
});

export const MotionTypography = motion.create(Typography as any, {
  forwardMotionProps: false,
});

export const MotionButton = motion.create(Button as any, {
  forwardMotionProps: false,
});
