import React from 'react';

export function usePageVisible() {
  const [visible, setVisible] = React.useState<boolean>(
    typeof document !== 'undefined'
      ? document.visibilityState === 'visible'
      : true,
  );

  React.useEffect(() => {
    const handleVisibilityChange = () => {
      setVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { visible };
}
