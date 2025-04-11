import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  ChevronLeft,
  Close,
  Delete,
  Menu,
} from '@mui/icons-material';
import { useDrag, useDrop } from 'react-dnd';
import { useController, useFormContext } from 'react-hook-form';

import { RequiredLabel } from '../../RequiredLabel';

import { prettyField } from '../utils/prettyField';
import {
  type CredentialRequestsEditorForm,
  type CredentialRequestsWithNew,
} from '../types/form';
import { MandatoryEnum, SDKIntegrationType } from '@verifiedinc/constants';
import { useCredentialRequestField } from '../contexts/CredentialRequestFieldContext';
import { DataFieldOptionType } from './DataFieldOptionType';
import { DataFieldDescription } from './DataFieldDescription';
import { DataFieldMandatory } from './DataFieldMandatory';
import { DataFieldUserInput } from './DataFieldUserInput';
import { DataFieldDeleteModal } from './DataFieldDeleteModal';
import { DataFieldMulti } from './DataFieldMulti';

interface DataFieldAccordionProps {
  defaultExpanded?: boolean;
  integrationType: SDKIntegrationType;
}

export function DataFieldAccordion(
  props: DataFieldAccordionProps,
): React.JSX.Element {
  const { defaultExpanded, integrationType } = props;
  const credentialRequestField = useCredentialRequestField();
  const formContext = useFormContext<CredentialRequestsEditorForm>();
  const field = useController<CredentialRequestsEditorForm>({
    name: `${credentialRequestField?.path as any}` as any,
  });
  const credentialRequest = field.field.value as CredentialRequestsWithNew;
  const credentialRequests = formContext.watch('credentialRequests');
  const isNew: boolean = (credentialRequestField?.field as any).isNew;
  const [expanded, setOpen] = useState((defaultExpanded ?? isNew) || false);
  const [modalOpen, setModalOpen] = useState(false);

  const accordionRef = useRef<HTMLDivElement | null>(null);

  const fieldType = String(credentialRequestField?.field.type);
  const type = prettyField(fieldType || 'Choose a type...');

  const theme = useTheme();
  const chevronClassName = 'chevron';

  const fieldName = useMemo(() => {
    return (
      field.field.value && (field.field.value as CredentialRequestsWithNew).type
    );
  }, [field.field.value]);

  const canDrop = useCallback(
    (item: typeof credentialRequestField) => {
      const source = item;
      const target = credentialRequestField;

      if (!source || !target) return false;

      const getParentPath = (path: string): string =>
        path.split('.').slice(0, -2).join('.');

      const sourcePath = getParentPath(source?.path ?? '');
      const targetPath = getParentPath(target?.path ?? '');
      const isSameGroup = sourcePath === targetPath;

      const fromLevel = source.level;
      const fromIndex = source.index;
      const toLevel = target.level;
      const toIndex = target.index;

      // Allow to drop only on the same level and different index
      if (fromLevel !== toLevel || fromIndex === toIndex || !isSameGroup) {
        return false;
      }

      return true;
    },
    [credentialRequestField],
  );

  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: 'data-field-drag',
      item: () => credentialRequestField,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }),
    [credentialRequestField, credentialRequests],
  );

  const [{ opacity: dropOpacity }, drop] = useDrop(
    () => ({
      accept: 'data-field-drag',
      canDrop(item) {
        return canDrop(item as typeof credentialRequestField);
      },
      drop(item) {
        const source = item as typeof credentialRequestField;
        const target = credentialRequestField;

        if (!source || !target) return;
        if (!canDrop(source)) return;

        const fromIndex = source.index;
        const toIndex = target.index;

        credentialRequestField.fieldArray.move(fromIndex, toIndex);
      },
      collect: (monitor) => {
        if (monitor.isOver()) {
          return {
            opacity: monitor.canDrop() ? 0.4 : 1,
          };
        }
        return {
          opacity: 1,
        };
      },
    }),
    [credentialRequestField, credentialRequests],
  );

  const handleRemove = (): void => {
    if (!credentialRequestField) return;
    setModalOpen(false);

    // Delete parent when the last field was removed from the stack of form fields.
    // The validation should be against less or equal than 1 because is against a previous state check.
    if (credentialRequestField.fieldArray.fields.length <= 1) {
      credentialRequestField.onAllFieldsDelete();
      return;
    }

    credentialRequestField.fieldArray.remove(credentialRequestField.index);
  };

  const renderTitle = (): React.JSX.Element => {
    const typographyStyle = {
      fontStyle: fieldType ? 'normal' : 'italic',
      fontSize: '16px',
      fontWeight: '800',
      textAlign: 'left !important',
      alignSelf: 'flex-start',
    };

    return (
      <Typography variant='body1' sx={typographyStyle}>
        {credentialRequest.mandatory !== MandatoryEnum.NO ? (
          <RequiredLabel>{type}</RequiredLabel>
        ) : (
          type
        )}
      </Typography>
    );
  };

  const renderUserInput = (): React.JSX.Element => {
    const allowUserInput = credentialRequest.allowUserInput;

    return (
      <Stack direction='row' alignItems='center' spacing={0.5} pl={5.25}>
        {allowUserInput ? (
          <CheckCircle
            sx={{ fontSize: '12px', color: theme.palette.text.disabled }}
          />
        ) : (
          <Close
            sx={{ fontSize: '12px', color: theme.palette.text.disabled }}
          />
        )}
        <Typography
          variant='body1'
          color='text.disabled'
          sx={{
            fontSize: '12px',
            fontWeight: '400',
            alignSelf: 'flex-start',
            textAlign: 'left!important',
          }}
        >
          Allow User Input
        </Typography>
      </Stack>
    );
  };

  const renderDataFields = (): React.JSX.Element => {
    return (
      <Stack spacing={2}>
        <DataFieldOptionType />
        {integrationType !== SDKIntegrationType.NON_HOSTED && (
          <>
            <DataFieldDescription />
            <DataFieldMandatory />
            <DataFieldUserInput />
          </>
        )}
        {fieldName === 'AddressCredential' && <DataFieldMulti />}
      </Stack>
    );
  };

  useEffect(() => {
    if (!isNew) return;
    accordionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isNew]);

  return (
    <Stack
      ref={drop}
      sx={{ position: 'relative', width: '100%', opacity: dropOpacity }}
    >
      <Paper
        ref={(element) => preview(element)}
        sx={{
          p: '0!important',
          width: `calc(100% - ${
            (credentialRequestField?.level ?? 0) * 30
          }px)!important`,
          alignSelf: 'flex-end',
          opacity,
        }}
      >
        <Box>
          <Accordion
            defaultExpanded={isNew}
            expanded={expanded}
            sx={{
              boxShadow: 'none',
              '&::before': {
                display: 'none',
              },
              my: '0px !important',
              mt: 0,
              p: '8px !important',
            }}
            data-testid='custom-demo-dialog-data-field-accordion'
          >
            <AccordionSummary
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              expandIcon={
                <>
                  <IconButton
                    size='small'
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalOpen(true);
                    }}
                    data-testid='custom-demo-dialog-data-field-delete-button'
                  >
                    <Delete
                      fontSize='small'
                      sx={{
                        transform: 'rotate(0deg)',
                      }}
                    />
                  </IconButton>
                  <Stack
                    className={chevronClassName}
                    sx={{ ml: 1, alignSelf: 'center' }}
                  >
                    <ChevronLeft
                      fontSize='small'
                      sx={{
                        color: '#0dbc3d',
                        transform: 'rotate(0deg)',
                      }}
                    />
                  </Stack>
                </>
              }
              sx={{
                px: 0,
                minHeight: 'auto!important',
                '& .MuiAccordionSummary-content': {
                  my: '0px !important',
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  alignSelf: 'flex-start',
                  transform: 'rotate(0deg) !important',
                  [`& .${chevronClassName}`]: {
                    transition: 'transform .3s',
                  },
                  '&.Mui-expanded': {
                    [`& .${chevronClassName}`]: {
                      transform: 'rotate(-90deg)',
                    },
                  },
                },
              }}
            >
              <Stack sx={{ alignItems: 'flex-start', mr: 0.5 }}>
                <Stack direction='column' alignItems='flex-start' spacing={0}>
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <IconButton
                      ref={drag}
                      size='small'
                      color='success'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      sx={{ cursor: 'grab' }}
                    >
                      <Menu />
                    </IconButton>
                    {renderTitle()}
                  </Stack>
                  {renderUserInput()}
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 3 }}>
              {expanded && renderDataFields()}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
      <DataFieldDeleteModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onConfirm={handleRemove}
      />
    </Stack>
  );
}
