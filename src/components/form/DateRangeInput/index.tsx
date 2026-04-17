import {
  type FC,
  type ReactElement,
  forwardRef,
  useMemo,
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
  /**
   * CSP nonce applied to the inline <style> tag. Pass this from the server
   * (e.g. Next.js middleware/headers) so the style tag carries a nonce during
   * SSR. Falls back to reading `<meta property="csp-nonce">` on the client.
   */
  nonce?: string;
}

export const DateRangeInput: FC<DateRangeInputProps> = (
  props: DateRangeInputProps,
): ReactElement => {
  const styles = useStyle();
  const nonce = useMemo(() => {
    if (props.nonce) return props.nonce;
    if (typeof document === 'undefined') return undefined;
    return (
      document
        .querySelector('meta[property="csp-nonce"]')
        ?.getAttribute('content') ?? undefined
    );
  }, [props.nonce]);
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
      <style nonce={nonce}>{pickerCSS}</style>
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
        startDate={startDate ?? undefined}
        endDate={endDate ?? undefined}
        // Set the minimum date to the 2023
        minDate={new Date(2023, 0, 1)}
        // Set the maximum date to the current date
        // Set the maximum date to the current date based on the target timezone
        maxDate={
          props.timeZone ? toZonedTime(new Date(), props.timeZone) : new Date()
        }
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

          // Pass UTC timestamps to onChange handler
          props.onChange(+start, +end);

          if (props.timeZone && props.onChangeTz) {
            // Treat the selected wall-clock values as being in the target timezone
            const startUtc = fromZonedTime(start, props.timeZone);
            const endUtc = fromZonedTime(end, props.timeZone);

            props.onChangeTz(
              formatInTimeZone(startUtc, props.timeZone, ISO_TZ_FORMAT),
              formatInTimeZone(endUtc, props.timeZone, ISO_TZ_FORMAT),
            );
          }
        }}
        customInput={<Input />}
      />
    </Box>
  );
};
