import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button visual style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Additional className */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

/**
 * PUBLIC_INTERFACE
 * Reusable, accessible button component for KAVIA Contact Manager.
 * 
 * Props:
 * - variant: 'primary' | 'secondary' | 'danger' | 'ghost' (default: 'primary')
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - disabled: disables the button
 * - loading: shows loading spinner and disables the button
 * - onClick: click handler
 * - type: 'button' | 'submit' | 'reset'
 * - className: additional classes
 * - children: button content
 * 
 * Accessible: Handles ARIA, keyboard, disabled/focus states
 * 
 * @example
 * <Button variant="primary" size="md" onClick={() => alert('Clicked!')}>
 *   Save Contact
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        styles.btn,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        isDisabled && styles.disabled,
        loading && styles.loading,
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled ? true : undefined}
      aria-busy={loading ? true : undefined}
      tabIndex={isDisabled ? -1 : 0}
      {...rest}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true" />
      )}
      <span className={loading ? styles.loadingText : ''}>{children}</span>
    </button>
  );
});

export default Button;
