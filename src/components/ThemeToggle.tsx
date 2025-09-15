import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // Default to light if no valid theme stored
      return 'light';
    }
    return 'light';
  });
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  useEffect(() => {
    // Apply the theme immediately on mount
    const root = document.documentElement;

    // Always remove both classes first
    root.classList.remove('dark', 'light');

    // Then add the appropriate class
    if (theme === 'dark') {
      root.classList.add('dark');
    }

    // Store the selection
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
      <div className="flex items-center gap-2">
        {['light', 'dark'].map((t) => (
          <div key={t} className="relative">
            <button
              onClick={() => handleThemeChange(t as Theme)}
              onMouseEnter={() => setTooltipVisible(t)}
              onMouseLeave={() => setTooltipVisible(null)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === t
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              aria-label={`${t} theme`}
            >
              {t === 'light' && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
              {t === 'dark' && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {tooltipVisible === t && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg whitespace-nowrap">
                {t.charAt(0).toUpperCase() + t.slice(1)} theme
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 