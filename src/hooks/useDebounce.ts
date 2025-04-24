import { useMemo } from "react";
import { debounce, DebouncedFunc } from "lodash";

export function useDebounce<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
  delay: number
): DebouncedFunc<(...args: Args) => Return> {
  const debouncedFn = useMemo(
    () => debounce(callback, delay),
    [callback, delay]
  );

  return debouncedFn;
}
