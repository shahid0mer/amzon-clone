export const ProductGridContainer = ({ children, columns = 4 }) => {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-4';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6 p-6`}>
      {children}
    </div>
  );
};