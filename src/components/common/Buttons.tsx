import classNames from "classnames";
import { Link, type LinkProps } from "react-router";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const getBaseClasses = `
  inline-flex items-center justify-center rounded-lg font-bold
  uppercase focus:outline-none focus:ring-4
  transition-colors disabled:opacity-50 disabled:pointer-events-none 
  cursor-pointer space-x-2
`;

const getVariantClasses = (variant: ButtonVariant) => {
  return {
    primary: "border-2 border-black text-black bg-amber-300 hover:bg-amber-400 focus:ring-amber-400",
    secondary: "border-2 border-black text-black bg-white hover:bg-gray-300 focus:ring-gray-300",
    tertiary: "border-2 border-amber-500 bg-transparent text-amber-500 hover:bg-amber-100 focus:ring-amber-300",
  }[variant];
};

const getSizeClasses = (size: ButtonSize) => {
  return {
    small: "px-5 py-1.5 text-sm",
    medium: "px-5.5 py-2 text-base",
    large: "px-6 py-2.5 text-lg",
  }[size];
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  className,
  children,
  ...rest
}) => {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const baseClasses = getBaseClasses;

  return (
    <button
      className={classNames(
        baseClasses,
        variantClasses,
        sizeClasses,
        fullWidth ? "w-full" : "",
        className
      )}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <span className="loader mr-2" aria-label="Loading" /> : null}
      {children}
    </button>
  );
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  className,
  children,
  ...rest
}) => {
  const baseClasses = getBaseClasses;
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);

  return (
    <Link
      className={classNames(
        baseClasses,
        variantClasses,
        sizeClasses,
        fullWidth ? "w-full" : "",
        className
      )}
      aria-disabled={loading || rest['aria-disabled']}
      {...rest}
    >
      {loading ? <span className="loader mr-2" aria-label="Loading" /> : null}
      {children}
    </Link>
  );
}