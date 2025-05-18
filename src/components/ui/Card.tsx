import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = '',
  actions,
  padding = 'md',
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        border border-gray-200
        transition-shadow duration-200 ease-in-out
        hover:shadow-lg
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="flex justify-between items-start border-b border-gray-200 p-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className={paddingClasses[padding]}>{children}</div>

      {footer && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">{footer}</div>
      )}
    </div>
  );
};