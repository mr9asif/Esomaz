interface LoaderProps {
  className?: string;
}

const Loader = ({ className = "" }: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
    </div>
  );
};

export default Loader;