const requireAll = (r) => r.keys().forEach(r);

requireAll(require.context('../../components/', true, /\.scss$/));

const Index = () => {
  // Register SW
  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker
  //       .register('/service-worker.js')
  //       .then((registration) => {
  //         console.log('SW registered: ', registration);
  //       })
  //       .catch((registrationError) => {
  //         console.log('SW registration failed: ', registrationError);
  //       });
  //   });
  // }

  console.log('Index page');
};

Index();
