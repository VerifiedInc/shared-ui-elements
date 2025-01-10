import {
  type FC,
  type ReactElement,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { Box, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import pickerCSS from './react-datepicker.css?inline=true';

import { useStyle } from './style';
import { useOnClickOutside } from '../../../hooks';

const Input = forwardRef(function RenderInput(props, ref) {
  return (
    <TextField
      inputRef={ref}
      {...props}
      label='Range'
      fullWidth
      sx={{
        flex: 1,
        '& input': {
          boxShadow: 'none!important',
          border: 'none!important',
        },
      }}
    />
  );
});

interface DateRangeInputProps {
  startDate?: Date | number;
  endDate?: Date | number;
  onChange: (startDate: number, endDate: number) => void;
}

export const DateRangeInput: FC<DateRangeInputProps> = (
  props: DateRangeInputProps,
): ReactElement => {
  const styles = useStyle();
  const initialDate = (): [Date | null, Date | null] => {
    const { startDate, endDate } = props;
    if (!startDate || !endDate) return [null, null];
    return [new Date(startDate), new Date(endDate)];
  };
  const [dateRange, setDateRange] = useState(
    initialDate() as [Date | null, Date | null],
  );
  const [startDate, endDate] = dateRange;

  // Close on outside click and show on focus
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <Box ref={ref} sx={styles.wrapper}>
      <style>{pickerCSS}</style>
      <DatePicker
        open={open}
        onFocus={() => {
          setOpen(true);
        }}
        placeholderText='MM/DD/YYYY - MM/DD/YYYY'
        showPopperArrow={false}
        swapRange
        selectsRange
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown={false}
        dateFormat='MM/dd/yyyy HH:mm'
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        // Set the minimum date to the 2023
        minDate={new Date(2023, 0, 1)}
        // Set the maximum date to the current date
        maxDate={new Date()}
        onChange={([start, end], event) => {
          // Update local state to allow to change the date range
          setDateRange([start, end]);
          // Update the global state to allow to filter the data
          if (!start || !end) return;

          // If the date range is changed by the picker, set the start and end date to the beginning and end of the day.
          if ((event?.target as HTMLElement)?.tagName !== 'INPUT') {
            // Set the start date to the beginning of the day
            start.setHours(0, 0, 0, 0);
            // Set the end date to the end of the day
            end.setHours(23, 59, 59, 999);
          }

          props.onChange(+start, +end);
        }}
        customInput={<Input />}
      />
    </Box>
  );
};
