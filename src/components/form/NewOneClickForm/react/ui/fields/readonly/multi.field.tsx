import { useEffect, useRef, useState } from 'react';
import {
  Box,
  MenuItem,
  SxProps,
  TextField,
  TextFieldProps,
} from '@mui/material';

import { useFormField } from '../../../core/field.hook';
import { useForm } from '../../../core/form.context';
import { SingleField } from './single.field';

const styles = (): Record<string, SxProps> => ({
  menuStyle: {
    maxWidth: '100%',
    whiteSpace: 'pre-wrap',
    flexWrap: 'wrap',
    // Increase image and it loader in menu item.
    '& *': {
      display: 'inline-flex',
    },
    '& div': {
      width: 'fit-content',
      height: 'fit-content',
    },
    '& img.MuiBox-root, & .image-encoded-skeleton-container, & .MuiSkeleton-root':
      {
        display: 'inline-flex',
        width: '100px',
        height: '100px',
      },
  },
  fieldInputEnabledStyle: {
    '& .MuiInputBase-root::before, & .MuiInputBase-root::after': {
      display: 'none !important',
    },
    '& .MuiSelect-icon': {
      display: 'none',
    },
  },
  fieldInputDisabledStyle: {
    pointerEvents: 'auto',
  },
  blockStyle: {
    display: 'inline-flex',
  },
  fieldInputReadonlyStyle: {
    '& .MuiInputBase-readOnly': {
      p: 0,
      userSelect: 'auto',
      cursor: 'text',
      lineHeight: 1.5,
    },
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      border: 'none!important',
    },
    '& svg.MuiSvgIcon-root': {
      display: 'none',
    },
  },
});

export function MultiField({ fieldKey }: { fieldKey: string }) {
  const { field, fieldProps } = useFormField({ key: fieldKey });
  const { replaceFieldWithVariant } = useForm();
  const _styles = styles();

  const variants =
    field?.variants ?? [field].filter((field) => field !== undefined);
  const hasVariants = variants.length > 1;

  const inputRef = useRef<HTMLDivElement | undefined>(undefined);
  const [inputWidth, setInputWidth] = useState<string | undefined>(undefined);

  const textFieldProps: TextFieldProps = {
    ref: (ref) => {
      ref && (inputRef.current = ref);
    },
    select: true,
    variant: 'outlined',
    size: 'small',
    'aria-label': !hasVariants
      ? `Current ${field?.schema?.characteristics?.label}`
      : `Select ${field?.schema?.characteristics?.label}`,
    value: field?.id,
    helperText: field?.description,
    onChange: (e) => {
      if (field?.isDisabled) return;

      // Prevent the event to propagate to the parent.
      e.stopPropagation();
      e.preventDefault();

      // Handle variant selection
      const selectedVariantId = e.target.value;
      if (selectedVariantId && selectedVariantId !== field?.id) {
        replaceFieldWithVariant(fieldKey, selectedVariantId);
      }
    },
    InputProps: {
      tabIndex: !hasVariants ? -1 : 0,
      readOnly: !hasVariants || fieldProps.disabled,
    },
    SelectProps: {
      size: 'small',
      onClose: (e) => {
        // Prevent the event to propagate to the parent.
        e.stopPropagation();
        e.preventDefault();
      },
      MenuProps: {
        slotProps: {
          paper: {
            sx: {
              width: inputWidth,
            },
          },
        },
      },
    },
    sx: {
      width: '100%',
      ..._styles.fieldInputDisabledStyle,
      ...(!hasVariants && (_styles.fieldInputReadonlyStyle as any)),
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
      '& .MuiFormHelperText-root': {
        ml: !hasVariants ? 0 : undefined,
      },
    },
  };

  // Observe the input width to set the menu width.
  useEffect(() => {
    const input = inputRef.current;

    if (!input) return;

    // Create a new instance of ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Set the new width whenever it changes
        setInputWidth(`${entry.contentRect.width}px`);
      }
    });

    // Start observing the target element
    resizeObserver.observe(input);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // If the field does not contain an id, don't render the multi field.
  if (!field?.id) {
    return <SingleField fieldKey={fieldKey} />;
  }

  return (
    <Box width='100%'>
      <TextField {...textFieldProps}>
        {variants.map((variant) => (
          <MenuItem
            key={variant.id}
            value={variant.id}
            onClick={(e) => {
              e.stopPropagation();
            }}
            sx={_styles.menuStyle}
          >
            {variant.displayValue ?? (variant.isRequired ? '-' : null)}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
