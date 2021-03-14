// Extract global styles
import '/src/styles/global.scss';

const requireAll = (r) => r.keys().forEach(r);

// Extract all fonts
requireAll(
  require.context('/src/assets/fonts/', true, /\.(eot|otf|ttf|woff|woff2)$/i)
);

/**
 * Extract all global images, if any
 * You can use them as regular strings in pug instead of require statement
 */
requireAll(
  require.context('/src/assets/images/', true, /\.(png|svg|jpg|jpeg|gif)$/i)
);

// Extract all scss modules
requireAll(require.context('/src/components/', true, /\.scss$/));

const Index = () => {
  /**
   * Register SW
   * service-worker.js file is generated on `npm run build`
   */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.warn('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.error('SW registration failed: ', registrationError);
        });
    });
  }
};

// Index();
