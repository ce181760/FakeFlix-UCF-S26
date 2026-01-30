// Type augmentation for framer-motion to work with React 17
declare module 'framer-motion' {
  import * as React from 'react';
  
  export interface MotionProps {
    variants?: any;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (event: any) => void;
    children?: React.ReactNode;
  }
  
  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    header: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLElement>>;
    h1: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    p: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    [key: string]: any;
  };
}
