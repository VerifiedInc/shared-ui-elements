import { type ReactNode, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  type SxProps,
  Typography,
} from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

import { Tip } from '../../Tip';

interface SectionAccordionProps {
  children: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  title: string;
  description?: string;
  tip?: ReactNode;
  renderIcon?: boolean;
  sx?: SxProps;
  'data-testid'?: string;
}

export function SectionAccordion(
  props: SectionAccordionProps,
): React.JSX.Element {
  const {
    children,
    expanded: propExpanded,
    defaultExpanded,
    title,
    description,
    tip,
    renderIcon = true,
    'data-testid': dataTestId,
  } = props;
  const [expanded, setOpen] = useState(
    propExpanded ?? defaultExpanded ?? false,
  );

  return (
    <Accordion
      expanded={propExpanded ?? expanded}
      sx={{
        ...props.sx,
        boxShadow: 'none',
        '&::before': {
          display: 'none',
        },
        py: '0px !important',
        my: '0px !important',
        mt: 2,
      }}
      data-testid={dataTestId}
    >
      <AccordionSummary
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        expandIcon={
          renderIcon && (
            <ChevronLeft
              fontSize='large'
              sx={{
                color: '#0dbc3d',
                transform: 'rotate(0deg)',
              }}
            />
          )
        }
        sx={{
          minHeight: 'auto!important',
          '& .MuiAccordionSummary-content': {
            my: '0px !important',
            alignSelf: 'flex-start',
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            alignSelf: 'flex-start',
            '&.Mui-expanded': {
              transform: 'rotate(-90deg)',
            },
          },
        }}
      >
        <Stack sx={{ alignItems: 'flex-start', mr: 0.5 }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography
              variant='body1'
              sx={{
                fontSize: '20px',
                fontWeight: '800',
                textAlign: 'left !important',
              }}
            >
              {title}
            </Typography>
            <Tip>{tip}</Tip>
          </Stack>
          {description && (
            <Typography
              variant='body2'
              color='text.disabled'
              sx={{
                alignSelf: 'flex-start',
                textAlign: 'left!important',
                fontSize: '16px',
                fontWeight: '400',
              }}
            >
              {description}
            </Typography>
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 3 }}>{children}</AccordionDetails>
    </Accordion>
  );
}
