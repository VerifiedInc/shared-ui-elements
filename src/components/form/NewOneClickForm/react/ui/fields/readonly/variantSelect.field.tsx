import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { SelectProps, TextField, Typography } from '@mui/material';

import { useFormField } from '../../../core/field.hook';
import { useForm } from '../../../core/form.context';

interface VariantSelectFieldProps {
  fieldKey: string;
  testId: string;
  renderValue: () => React.ReactNode;
  children: React.ReactNode;
}

export function VariantSelectField({
  fieldKey,
  testId,
  renderValue,
  children,
}: VariantSelectFieldProps) {
  const { field } = useFormField({ key: fieldKey });
  const { replaceFieldWithVariant } = useForm();

  const inputRef = useRef<HTMLDivElement | undefined>(undefined);
  const [inputWidth, setInputWidth] = useState<string | undefined>(undefined);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setInputWidth(`${entry.contentRect.width}px`);
      }
    });

    resizeObserver.observe(input);
    return () => resizeObserver.disconnect();
  }, []);

  if (!field) return null;

  return (
    <TextField
      ref={(ref) => {
        ref && (inputRef.current = ref);
      }}
      select
      fullWidth
      variant='outlined'
      size='small'
      aria-label={`Select ${field.schema.characteristics.label}`}
      value={field.id}
      onChange={(e) => {
        e.stopPropagation();
        e.preventDefault();

        const chosenId = e.target.value;
        if (chosenId !== field.id) {
          replaceFieldWithVariant(fieldKey, chosenId);
        }
      }}
      label={
        <>
          {field.schema.characteristics.label}
          {field.isRequired && (
            <Typography
              data-asterisk
              component='span'
              color='error'
              variant='subtitle2'
              sx={{ fontSize: 'inherit' }}
            >
              {' '}
              *
            </Typography>
          )}
        </>
      }
      helperText={field.description}
      InputProps={{
        tabIndex: 0,
        readOnly: field.isDisabled,
      }}
      SelectProps={
        {
          'data-mask-me': true,
          'data-testid': testId,
          size: 'small',
          renderValue,
          onClose: (e: SyntheticEvent) => {
            e.stopPropagation();
            e.preventDefault();
          },
          MenuProps: {
            'data-mask-me': true,
            slotProps: {
              paper: {
                sx: { width: inputWidth },
              },
            },
          },
        } as unknown as SelectProps
      }
      sx={{
        width: '100%',
        pointerEvents: 'auto',
        '& div[role="combobox"]': {
          width: '100%',
          height: 'auto',
          overflow: 'hidden',
          whiteSpace: 'break-spaces!important',
        },
        '& .MuiSelect-select': {
          display: 'block',
          alignItems: 'center',
          whiteSpace: 'break-spaces!important',
        },
        '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .Mui-disabled.MuiSelect-icon': {
          display: 'none',
        },
        '& .Mui-disabled': {
          color: (theme) => `${theme.palette.text.primary}`,
          WebkitTextFillColor: (theme) => `${theme.palette.text.primary}`,
        },
      }}
    >
      {children}
    </TextField>
  );
}
