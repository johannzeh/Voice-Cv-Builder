import React, { forwardRef } from 'react';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { useCV } from '../../context/CVContext';

interface CVPreviewProps {
  className?: string;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ className = '' }, ref) => {
    const { cv } = useCV();

    return (
      <div ref={ref} className={`h-full overflow-auto ${className}`}>
        <div className="mx-auto max-w-[800px] my-4 shadow-lg bg-white">
          {cv.template === 'modern' && <ModernTemplate cv={cv} />}
          {cv.template === 'classic' && <ClassicTemplate cv={cv} />}
          {cv.template === 'minimal' && <MinimalTemplate cv={cv} />}
        </div>
      </div>
    );
  }
);

CVPreview.displayName = 'CVPreview';