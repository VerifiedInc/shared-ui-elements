import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import cloneDeep from 'lodash/cloneDeep';

import {
  MetricsInterval,
  type MetricsIntervalType,
} from '../../constants/metrics';
import { usePersistedReducer } from '../../hooks/usePersistedReducer';

import { type BrandFilter } from '../../components/BrandFilterInput';

export type InternalMetricsReducer = {
  brands: Record<string, BrandFilter[]>;
  brand: Record<string, BrandFilter | undefined>;
  monthlyBillableBrands: Record<string, BrandFilter[]>;
  interval: MetricsIntervalType;
  timezone: string;
  startDate: number; //  timestamp Date
  endDate: number; //  timestamp Date
};

export type MetricsReducer = {
  brands: BrandFilter[];
  brand: BrandFilter | undefined;
  monthlyBillableBrands: BrandFilter[];
  interval: MetricsIntervalType;
  timezone: string;
  startDate: number; //  timestamp Date
  endDate: number; //  timestamp Date
};

type MetricsContext = {
  filter: MetricsReducer & {
    setInterval: (interval: MetricsIntervalType) => void;
    setDateRange: (startDate: number, endDate: number) => void;
    setBrands: (brands: BrandFilter[]) => void;
    setBrand: (brands: BrandFilter | undefined) => void;
    setMonthlyBillableBrands: (brands: BrandFilter[]) => void;
    setTimezone: (timezone: string) => void;
  };
};

type MetricsContextProps = PropsWithChildren & {
  products: string[];
  product: string;
};

const Context = createContext<MetricsContext | null>(null);

export function MetricsProvider(props: MetricsContextProps) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const mapBrandFilterByProduct = () => {
    const stateObject = {
      brands: [],
      brand: undefined,
      monthlyBillableBrands: [],
    };

    return Object.entries(stateObject).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: Object.entries(props.products).reduce(
          (innerAcc, [, productType]) => {
            return {
              ...innerAcc,
              [productType]: cloneDeep(value),
            };
          },
          {},
        ),
      };
    }, {}) as Pick<
      InternalMetricsReducer,
      'brands' | 'brand' | 'monthlyBillableBrands'
    >;
  };

  const STORAGE_KEY = `metrics-filter-v1`;
  const [state, dispatch] = usePersistedReducer(
    STORAGE_KEY,
    (
      prevState: InternalMetricsReducer,
      action: Partial<InternalMetricsReducer>,
    ) =>
      // Immutability: Create a new object with the previous state and the new action
      Object.assign(cloneDeep(prevState), action),
    {
      ...mapBrandFilterByProduct(),
      interval: MetricsInterval.DAY,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      startDate: +startDate,
      endDate: +endDate,
    },
  );

  const setInterval = useCallback(
    (interval: MetricsIntervalType) => {
      dispatch({ interval });
    },
    [dispatch],
  );

  const setDateRange = useCallback(
    (startDate: number, endDate: number) => {
      dispatch({ startDate, endDate });
    },
    [dispatch],
  );

  const setBrands = useCallback(
    (brands: BrandFilter[]) => {
      dispatch({
        brands: { ...state.brands, [props.product]: brands },
      });
    },
    [state.brands, props.product, dispatch],
  );

  const setBrand = useCallback(
    (brand: BrandFilter | undefined) => {
      dispatch({
        brand: { ...state.brand, [props.product]: brand },
      });
    },
    [state.brand, props.product, dispatch],
  );

  const setMonthlyBillableBrands = useCallback(
    (monthlyBillableBrands: BrandFilter[]) => {
      dispatch({
        monthlyBillableBrands: {
          ...state.monthlyBillableBrands,
          [props.product]: monthlyBillableBrands,
        },
      });
    },
    [state.monthlyBillableBrands, props.product, dispatch],
  );

  const setTimezone = useCallback(
    (timezone: string) => {
      dispatch({ timezone });
    },
    [dispatch],
  );

  const stateMemo = useMemo(() => {
    if (!state) return state;
    return {
      ...state,
      brands: state.brands[props.product],
      brand: state.brand[props.product],
      monthlyBillableBrands: state.monthlyBillableBrands[props.product],
    };
  }, [state, props.product]);

  const value = useMemo(
    () => ({
      filter: {
        ...stateMemo,
        setInterval,
        setDateRange,
        setBrands,
        setBrand,
        setMonthlyBillableBrands,
        setTimezone,
      },
    }),
    [
      stateMemo,
      setInterval,
      setDateRange,
      setBrands,
      setBrand,
      setMonthlyBillableBrands,
      setTimezone,
    ],
  );

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export function useMetrics() {
  const context = useContext<MetricsContext | null>(Context);
  if (context === null) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
}
