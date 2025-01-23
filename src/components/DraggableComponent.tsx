import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { FormComponent } from '../types/form';

interface DraggableComponentProps {
  component: FormComponent;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DraggableComponent = memo(({ component, onEdit, onDelete }: DraggableComponentProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-2"
    >
      <button
        className="cursor-move text-gray-500 hover:text-gray-700"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </button>
      <div className="flex-1">
        <h3 className="font-medium">{component.label}</h3>
        <p className="text-sm text-gray-500">{component.type}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(component.id)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(component.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
});