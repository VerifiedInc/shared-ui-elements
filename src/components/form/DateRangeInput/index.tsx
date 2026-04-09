import {
  type FC,
  type ReactElement,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { Box, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import { formatInTimeZone, fromZonedTime, toZonedTime } from 'date-fns-tz';

import { reactDatepickerCss as pickerCSS } from '../../../styles/lib/react-datepicker';

import { useOnClickOutside } from '../../../hooks';

import { ISO_TZ_FORMAT } from '../../../constants/date';

import { useStyle } from './style';

function clampToDayBoundary(
  date: Date,
  boundary: 'start' | 'end',
  timeZone?: string,
): Date {
  const hours = boundary === 'start' ? [0, 0, 0, 0] : [23, 59, 59, 999];

  if (!timeZone) {
    date.setHours(...(hours as [number, number, number, number]));
    return date;
  }

  const zoned = toZonedTime(date, timeZone);
  zoned.setHours(...(hours as [number, number, number, number]));

  return fromZonedTime(zoned, timeZone);
}

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
  /** Optional: called with ISO strings formatted in the given timeZone */
  onChangeTz?: (startDate: string, endDate: string) => void;
  /** IANA time zone name (e.g. "America/New_York"). Omit for local time behavior. */
  timeZone?: string;
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
        dateFormat='MM/dd/yyyy HH:mm:ss'
        formatWeekDay={(day) => day.substring(0, 2)}
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        // Set the minimum date to the 2023
        minDate={new Date(2023, 0, 1)}
        // Set the maximum date to the current date
        maxDate={
          props.timeZone ? toZonedTime(new Date(), props.timeZone) : new Date()
        }
        // Pass timeZone to react-datepicker only when provided
        {...(props.timeZone ? { timeZone: props.timeZone } : {})}
        onChange={([start, end], event) => {
          // Update local state to allow to change the date range
          setDateRange([start, end]);
          // Update the global state to allow to filter the data
          if (!start || !end) return;

          // If the date range is changed by the picker, clamp to start/end of day
          if ((event?.target as HTMLElement)?.tagName !== 'INPUT') {
            start = clampToDayBoundary(start, 'start', props.timeZone);
            end = clampToDayBoundary(end, 'end', props.timeZone);
          }

          props.onChange(+start, +end);

          if (props.timeZone && props.onChangeTz) {
            props.onChangeTz(
              formatInTimeZone(start, props.timeZone, ISO_TZ_FORMAT),
              formatInTimeZone(end, props.timeZone, ISO_TZ_FORMAT),
            );
          }
        }}
        customInput={<Input />}
      />
    </Box>
  );
};
