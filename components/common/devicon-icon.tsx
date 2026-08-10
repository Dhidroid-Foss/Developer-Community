"use client";

import React from "react";

interface DeviconIconProps {
  /** Full devicon CSS class string, e.g. "devicon-react-original colored" */
  iconClass: string;
  className?: string;
}

/**
 * Renders a single icon from the devicon icon font.
 * The devicon CSS is imported globally in app/globals.css from node_modules.
 */
export function DeviconIcon({ iconClass, className }: DeviconIconProps) {
  return (
    <i
      className={`${iconClass}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}

/**
 * Factory that returns a React FC wrapping DeviconIcon with a fixed iconClass.
 *
 * This keeps a component-as-value interface — the returned FC can be stored in
 * arrays/maps and rendered as <Icon className="text-2xl" />.
 *
 * @example
 * const ReactIcon = makeIcon("devicon-react-original colored");
 * // <ReactIcon className="text-2xl" />
 */
export function makeIcon(iconClass: string): React.FC<{ className?: string }> {
  function DevIcon({ className }: { className?: string }) {
    return <DeviconIcon iconClass={iconClass} className={className} />;
  }
  DevIcon.displayName = `DevIcon(${iconClass})`;
  return DevIcon;
}
