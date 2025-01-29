import { ReactNode, useEffect, useState } from 'react';
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

import { DataFieldToggleButton } from './DataFieldToggleButton';
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
export function DataFieldComposite(props: DataFieldCompositeProps) {
  const { children } = props;
  const { credentialDisplayInfo, isRoot } = useCredentialsDisplayItem();
  const isEditMode = credentialDisplayInfo.uiState.isEditMode;
  const instancesLength = credentialDisplayInfo.instances.length;

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

  const handleChange = () => setExpanded((prev) => !prev);

  const renderExpandIcon = () => {
    if (instancesLength <= 1 && isEditMode) return null;
    return <DataFieldToggleButton onClick={handleChange} />;
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
          expanded={expanded || isEditMode}
          TransitionProps={{ unmountOnExit: false }}
          sx={{
            width: '100%',
            boxShadow: 'none',
            '& .MuiAccordionSummary-root': {
              p: 0,
              m: '0px!important',
              minHeight: 'auto!important',
              background: 'transparent!important',
              userSelect: 'auto',
              // HACK alert: Calculate full width for the summary content and the button
              display: 'grid',
              gridTemplateColumns: 'calc(100% - 40px) 40px',
              alignItems: 'center',
            },
            '& .MuiAccordionSummary-content': {
              ...leftSideFixStyle,
              m: '0px!important',
              cursor: 'default',
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              width: '40px',
              height: '40px',
              aspectRatio: 1,
            },
            '& .MuiAccordionDetails-root': {
              px: '0px!important',
              pt: 2,
              pb: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={renderExpandIcon()}
            aria-controls='panel1a-content'
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
