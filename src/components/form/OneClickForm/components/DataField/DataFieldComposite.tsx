import { ReactElement, ReactNode, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  SxProps,
} from '@mui/material';

import { When } from '../../components/shared/When';

import { hasSomeRequiredEmptyCredential } from './utils';
import { useCredentialsDisplayItem } from '../CredentialsDisplay/CredentialsDisplayItemContext';

import { DataFieldHeader } from './DataFieldHeader';
import { DataFieldInputModeHeader } from './DataFieldInputModeHeader';
import { DataFieldStack } from './DataFieldStack';
import { DataFieldLegend } from './DataFieldLegend';
import { DataFieldLeftSide } from './DataFieldLeftSide';

type DataFieldCompositeProps = {
  children?: ReactNode | ReactNode[] | undefined;
};

/**
 * This component renders a composite level credential, followed by child of atomic/composite credentials.
 * @param props
 * @constructor
 */
export function DataFieldComposite(
  props: DataFieldCompositeProps,
): ReactElement {
  const { children } = props;
  const { credentialDisplayInfo, isRoot } = useCredentialsDisplayItem();
  const isEditMode = credentialDisplayInfo.uiState.isEditMode;

  const [expanded, setExpanded] = useState<boolean>(
    hasSomeRequiredEmptyCredential(credentialDisplayInfo),
  );

  // HACK alert:
  // This style width will subtract the left side size to fit in between,
  // some spans in select component does not respect parent when the width is relative like auto or 100%,
  // so we take advantage of calc function to subtract the space for us.
  const leftSideFixStyle: SxProps = {
    width: '100%',
  };
  const leftSideRightSideFixStyle: SxProps = {};
  const middleSideStyle: SxProps = {
    ...leftSideFixStyle,
    '&:not(:last-child)': leftSideRightSideFixStyle,
  };

  // Effect to auto expand when in edit mode.
  useEffect(() => {
    if (expanded) return;

    setExpanded(isEditMode);
  }, [expanded, isEditMode]);

  return (
    <DataFieldStack
      data-testid='data-field-composite'
      data-credentialid={credentialDisplayInfo.id}
    >
      <Box width='100%'>
        <Accordion
          expanded
          slotProps={{
            transition: {
              unmountOnExit: false,
            },
          }}
          sx={{
            width: '100%',
            boxShadow: 'none',
            '& .MuiAccordionSummary-root': {
              p: 0,
              m: '0px!important',
              minHeight: 'auto!important',
              background: 'transparent!important',
              userSelect: 'auto',
              display: 'grid',
              gridTemplateColumns: '100%',
              alignItems: 'center',
            },
            '& .MuiAccordionSummary-content': {
              ...leftSideFixStyle,
              m: '0px!important',
              cursor: 'default',
            },
            '& .MuiAccordionDetails-root': {
              px: '0px!important',
              pt: 2,
              pb: 0,
            },
          }}
        >
          <AccordionSummary
            aria-controls='panel1a-content'
            expandIcon={null}
            sx={{ flex: 1, flexShrink: 1 }}
          >
            <Stack direction='row' alignItems='center' sx={{ width: '100%' }}>
              <DataFieldLeftSide />
              <Box sx={middleSideStyle}>
                <When value={isRoot && !isEditMode}>
                  <DataFieldHeader block />
                </When>
                <When value={(isRoot && isEditMode) || !isRoot}>
                  <DataFieldInputModeHeader sx={{ mb: 0 }} />
                </When>
                <When
                  value={credentialDisplayInfo.credentialRequest?.description}
                >
                  {(description) => (
                    <Box sx={{ px: 1.75 }}>
                      <DataFieldLegend sx={{ mt: 0.5 }}>
                        {description}
                      </DataFieldLegend>
                    </Box>
                  )}
                </When>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </Box>
    </DataFieldStack>
  );
}
