/**
 * components/common/DeviconIcon.tsx
 *
 * Renders a single icon from the devicon icon font (devicon npm package).
 * The devicon CSS is imported globally in app/globals.css.
 *
 * Usage:
 *   <DeviconIcon iconClass="devicon-react-original colored" />
 *
 * Use makeIcon() to create a React.FC wrapper with a fixed iconClass,
 * compatible with the tech-grid component interface.
 *
 *   const ReactIcon = makeIcon("devicon-react-original colored");
 *   <ReactIcon className="text-2xl" />
 */

/** Raw icon renderer — pass the full devicon class string. */
export function DeviconIcon({
  iconClass,
  className,
}: {
  iconClass: string;
  className?: string;
}) {
  return (
    <i
      className={`${iconClass}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    />
  );
}

/**
 * Factory: returns a React FC that renders a DeviconIcon with a fixed
 * iconClass. This keeps the same component-as-value interface expected
 * by FlipCard / TechGrid so they need zero changes.
 */
export function makeIcon(iconClass: string): React.FC<{ className?: string }> {
  return function DevIcon({ className }) {
    return <DeviconIcon iconClass={iconClass} className={className} />;
  };
}
