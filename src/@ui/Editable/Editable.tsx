import React, { useEffect, useRef, useState } from 'react';
import TextareaAutoSize, {
  TextareaAutosizeProps as TextareaAutoSizeProps,
} from 'react-textarea-autosize';
import { createContext } from '@utils/react';
import { composeEventHandlers, focus } from '@utils/dom';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { usePrevious } from 'hooks/usePrevious';

const DEFAULT_ROOT_TAG = 'div';

type EditableContextType = {
  value: string;
  onSave: (value: string) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
};

const [EditableProvider, useEditableContext] = createContext<EditableContextType>('Editable');

type RootOwnProps = {
  value: string;
  onSave: (value: string) => void;
};

export type RootProps = RootOwnProps & React.ComponentPropsWithoutRef<typeof DEFAULT_ROOT_TAG>;

export const Root = (props: RootProps) => {
  const { value, onSave } = props;
  const [editing, setEditing] = useState(false);

  return (
    <div style={{ position: 'relative', ...props.style }}>
      <EditableProvider value={value} onSave={onSave} editing={editing} setEditing={setEditing}>
        {props.children}
      </EditableProvider>
    </div>
  );
};

const DEFAULT_DISPLAY_TAG = 'div';
type DisplayProps = React.ComponentPropsWithoutRef<typeof DEFAULT_DISPLAY_TAG>;

export const Display = React.forwardRef<HTMLDivElement, DisplayProps>((props, forwardedRef) => {
  const { value, editing, setEditing } = useEditableContext('Editable.Composer');
  const wasEditing = usePrevious(editing);
  const ref = useRef(null);

  useEffect(() => {
    if (wasEditing && !editing) {
      focus(ref.current);
    }
  }, [editing, wasEditing]);

  if (editing) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    setEditing(true);
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEditing(true);
    }
  };

  return (
    <div
      role="textbox"
      ref={composeRefs(forwardedRef, ref)}
      {...props}
      tabIndex={0}
      onClick={composeEventHandlers(props.onClick, handleClick)}
      onKeyDown={composeEventHandlers(props.onKeyDown, handleKeydown)}
      aria-readonly="false"
      style={{
        width: '100%',
        cursor: 'text',
        ...props.style,
      }}
    >
      {value}
    </div>
  );
});

// TODO: Figure out allowing multi-line (via maxRows or a special prop)
type ComposerProps = TextareaAutoSizeProps;

export const Composer = React.forwardRef<HTMLTextAreaElement, ComposerProps>(
  (props, forwardedRef) => {
    const { value, onSave, editing, setEditing } = useEditableContext('Editable.Composer');
    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (editing) {
        focus(ref.current, { select: true });
      }
    }, [editing]);

    if (!editing) {
      return null;
    }

    const save = () => {
      if (!ref.current) {
        return;
      }

      const newValue = ref.current.value;

      if (newValue.trim() === '' || newValue === value) {
        setEditing(false);
        return;
      }

      onSave(newValue);
      setEditing(false);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      save();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        save();
      }

      if (e.key === 'Escape') {
        setEditing(false);
      }
    };

    return (
      <TextareaAutoSize
        ref={composeRefs(forwardedRef, ref)}
        {...props}
        defaultValue={value}
        onBlur={composeEventHandlers(props.onBlur, handleBlur)}
        onKeyDown={composeEventHandlers(props.onKeyDown, handleKeyDown)}
        style={{
          display: 'block',
          width: '100%',
          resize: 'none',
          lineHeight: 'auto',
          fontSize: 'inherit',
          fontFamily: 'inherit',
          margin: 0,
          ...props.style,
        }}
      />
    );
  }
);
