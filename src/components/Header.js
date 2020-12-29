import React from "react";
import { FaPizzaSlice } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                aria-label="Quick add task"
                type="button"
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
