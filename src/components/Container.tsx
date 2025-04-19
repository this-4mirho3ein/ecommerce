interface IContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const Container = ({
  children,
  className = "",
  size = "xl",
}: IContainerProps) => {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`container mx-auto px-4 ${maxWidthClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
