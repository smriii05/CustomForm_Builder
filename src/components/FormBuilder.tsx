import React, { useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, Eye } from 'lucide-react';
import { FormComponent, FormSchema } from '../types/form';
import { DraggableComponent } from './DraggableComponent';
import { FormPreview } from './FormPreview';

export const FormBuilder: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormSchema>({
    id: 'form-1',
    title: 'My Form',
    components: [],
  });
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const componentIds = useMemo(() => {
    return formSchema.components.map((component) => component.id);
  }, [formSchema.components]);

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFormSchema((prev) => {
        const oldIndex = prev.components.findIndex((c) => c.id === active.id);
        const newIndex = prev.components.findIndex((c) => c.id === over.id);
        return {
          ...prev,
          components: arrayMove(prev.components, oldIndex, newIndex),
        };
      });
    }
  }, []);

  const addComponent = useCallback((type: FormComponent['type']) => {
    const newComponent: FormComponent = {
      id: `component-${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      options: type === 'select' || type === 'radio' ? ['Option 1', 'Option 2'] : undefined,
    };

    setFormSchema((prev) => ({
      ...prev,
      components: [...prev.components, newComponent],
    }));
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setFormSchema((prev) => ({
      ...prev,
      components: prev.components.filter((c) => c.id !== id),
    }));
  }, []);

  if (showPreview) {
    return (
      <div className="container mx-auto p-6">
        <button
          onClick={() => setShowPreview(false)}
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Back to Editor
        </button>
        <FormPreview schema={formSchema} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Form Builder</h1>
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Eye size={20} />
          Preview Form
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Components</h2>
          <div className="space-y-2">
            {(['text', 'select', 'radio'] as const).map((type) => (
              <button
                key={type}
                onClick={() => addComponent(type)}
                className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded"
              >
                <Plus size={20} />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={componentIds} strategy={verticalListSortingStrategy}>
              {formSchema.components.map((component) => (
                <DraggableComponent
                  key={component.id}
                  component={component}
                  onEdit={() => {}}
                  onDelete={deleteComponent}
                />
              ))}
            </SortableContext>
          </DndContext>

          {formSchema.components.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
              <p className="text-gray-500">Drag and drop components here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};