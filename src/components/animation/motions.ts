import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Stack,
} from '@mui/material';
import type {
  BoxProps,
  ButtonProps,
  TableBodyProps,
  TableCellProps,
  TableRowProps,
  TypographyProps,
  StackProps,
} from '@mui/material';
import { motion } from 'framer-motion';

export const MotionBox = motion.create(
  Box as React.ForwardRefExoticComponent<BoxProps>,
);

export const MotionStack = motion.create(
  Stack as React.ForwardRefExoticComponent<StackProps>,
);

export const MotionTbody = motion.create(
  TableBody as React.ForwardRefExoticComponent<TableBodyProps>,
  {
    forwardMotionProps: false,
  },
);

export const MotionTableRow = motion.create(
  TableRow as React.ForwardRefExoticComponent<TableRowProps>,
  {
    forwardMotionProps: false,
  },
);

export const MotionTableCell = motion.create(
  TableCell as React.ForwardRefExoticComponent<TableCellProps>,
  {
    forwardMotionProps: false,
  },
);

export const MotionTypography = motion.create(
  Typography as React.ForwardRefExoticComponent<TypographyProps>,
  {
    forwardMotionProps: false,
  },
);

export const MotionButton = motion.create(
  Button as React.ForwardRefExoticComponent<ButtonProps>,
  {
    forwardMotionProps: false,
  },
);
