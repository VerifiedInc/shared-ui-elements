import React, { CSSProperties } from 'react';

type StyleableElement = React.ReactElement<{ style?: CSSProperties }>;

export const InvisibleWhen = ({
  value,
  children,
}: {
  value: boolean;
  children: React.ReactNode;
}) => {
  const style: CSSProperties = {
    visibility: value ? 'hidden' : 'visible',
    position: value ? 'absolute' : 'static',
    pointerEvents: value ? 'none' : 'auto',
  };

  // Function to safely apply styles to a child element
  const applyStyleToChild = (child: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(child)) {
      return child;
    }

    // Check if the child can accept style props
    const childElement = child as StyleableElement;
    if (childElement.props && 'style' in childElement.props) {
      return React.cloneElement(childElement, {
        style: { ...(childElement.props.style || {}), ...style },
      });
    }

    return child;
  };

  // Handle single child case
  if (React.Children.count(children) === 1) {
    return applyStyleToChild(children);
  }

  // Handle multiple children case
  return <>{React.Children.map(children, applyStyleToChild)}</>;
};
