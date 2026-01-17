export const MadeWithScalix = () => {
  return (
    <footer className="flex items-center justify-center gap-2 py-6 text-sm text-gray-600 dark:text-gray-400">
      <span>Made with</span>
      <a
        href="https://www.scalix.world/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        aria-label="Visit Scalix website"
      >
        <img 
          src="/logo.svg" 
          alt="Scalix" 
          className="h-3 w-3"
        />
        <span className="font-medium">Scalix</span>
      </a>
    </footer>
  );
};