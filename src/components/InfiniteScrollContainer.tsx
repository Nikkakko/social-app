import * as React from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void;
  className?: string;
}

const InfiniteScrollContainer: React.FC<InfiniteScrollContainerProps> = ({
  onBottomReached,
  children,
  className,
}) => {
  const { ref } = useInView({
    threshold: 0.5,
    rootMargin: "200px",
    onChange: inView => {
      if (inView) {
        onBottomReached();
      }
    },
  });
  return (
    <div className={className}>
      {children}
      <div ref={ref}></div>
    </div>
  );
};

export default InfiniteScrollContainer;
