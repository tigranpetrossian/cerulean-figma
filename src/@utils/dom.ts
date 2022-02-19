type FocusableTarget = HTMLElement | { focus(): void };

export function isSelectableInput(
  element: any
): element is FocusableTarget & { select: () => void } {
  return (
    (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) &&
    'select' in element
  );
}

export function focus(element?: FocusableTarget | null, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;

  if (element && element.focus) {
    element.focus();
  }

  if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
    element.select();
  }
}

export function selectInputContents(element: HTMLElement | null) {
  if (isSelectableInput(element)) {
    element.select();
  }
}

export function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);

    if (!checkForDefaultPrevented || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
