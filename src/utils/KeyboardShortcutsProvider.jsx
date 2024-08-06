import React from "react";
import PropTypes from "prop-types";
import { HotKeys } from "react-hotkeys";
import KeyboardShortcutsContext from "../contexts/KeyboardShortcutsContext"; 

const KeyboardShortcutsProvider = ({ children }) => {
  const keyMap = {
    OPEN_MODAL: "ctrl+m",
    SUBMIT_FORM: "ctrl+enter",
    GO_HOME: "ctrl+h",
    // Add more shortcuts here
  };

  const handlers = {
    OPEN_MODAL: () => alert("Open Modal Shortcut Triggered"),
    SUBMIT_FORM: () => alert("Submit Form Shortcut Triggered"),
    GO_HOME: () => alert("Go Home Shortcut Triggered"),
    // Add handlers here
  };

  return (
    <KeyboardShortcutsContext.Provider value={{ keyMap, handlers }}>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        {children}
      </HotKeys>
    </KeyboardShortcutsContext.Provider>
  );
};

KeyboardShortcutsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeyboardShortcutsProvider;
