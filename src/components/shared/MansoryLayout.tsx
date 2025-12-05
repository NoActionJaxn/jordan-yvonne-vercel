import classNames from "classnames";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Spinner from "../ui/Spinner";

export interface MansoryLayoutProps<P extends object> {
  Component: React.ComponentType<P>;
  data: P[];
  keyExtractor?: (item: P, index: number) => React.Key;
  leftClassName?: string;
  rightClassName?: string;
  containerClassName?: string;
  staggered?: boolean;
  animate?: boolean;
  isLoading?: boolean;
}

export default function MansoryLayout<P extends object>({
  Component,
  data,
  keyExtractor,
  leftClassName,
  rightClassName,
  containerClassName,
  staggered = true,
  animate = true,
  isLoading = false,
}: MansoryLayoutProps<P>) {
  const list = useMemo(() => data ?? [], [data]);
  const [left, setLeft] = useState<P[]>([]);
  const [right, setRight] = useState<P[]>([]);

  const sortLists = useCallback(() => {
    const l: typeof list = [];
    const r: typeof list = [];
    list.forEach((item, i) => ((i % 2 === 0 ? l : r).push(item)));
    setLeft(l);
    setRight(r);
  }, [list]);

  useEffect(() => {
    return () => sortLists();
  }, [list, sortLists]);

  const getDelay = useMemo(
    () => (item: P) => {
      const idx = list.findIndex((i) => i === item);
      return 0.08 * idx + 0.05;
    },
    [list]
  );

  return (
    <div className={classNames("grid grid-cols-2 gap-10", containerClassName)}>
      {/* Single column for smaller screens */}
      <div className="block lg:hidden col-span-2 py-20 space-y-5">
        {list.map((item, i) => {
          const key = keyExtractor ? keyExtractor(item, i) : i;
          return animate ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: getDelay(item) }}
            >
              <Component {...item} />
            </motion.div>
          ) : (
            <Component key={key} {...item} />
          );
        })}
      </div>

      {/* Mansory layout system */}
      <div className={classNames("col-span-1 space-y-5 hidden lg:block", leftClassName)}>
        {left.map((item, i) => {
          const key = keyExtractor ? keyExtractor(item, i) : i;
          return animate ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: getDelay(item) }}
            >
              <Component {...item} />
            </motion.div>
          ) : (
            <Component key={key} {...item} />
          );
        })}
        {isLoading && list.length % 2 === 1 && (
          <Spinner />
        )}
      </div>
      <div className={classNames("col-span-1 space-y-5 hidden lg:block", rightClassName)}>
        {staggered && <div className="h-16" />}
        {right.map((item, i) => {
          const key = keyExtractor ? keyExtractor(item, i) : i;
          return animate ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: getDelay(item) }}
            >
              <Component {...item} />
            </motion.div>
          ) : (
            <Component key={key} {...item} />
          );
        })}
        {isLoading && list.length % 2 === 0 && (
          <Spinner />
        )}
      </div>
    </div>
  );
}
