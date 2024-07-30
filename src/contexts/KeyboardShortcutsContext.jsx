import { createContext, useContext } from "react";

const KeyboardShortcutsContext = createContext();

export const useKeyboardShortcuts = () => useContext(KeyboardShortcutsContext);

export default KeyboardShortcutsContext;
