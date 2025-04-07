




module.exports = {
  // Disable redirects to prevent unwanted redirects
  redirects() {
    return [];
  },
  
  // Optional: Add headers if needed for cache control or other security settings
  async headers() {
    return [
      {
        source: '/(.*)',  // Apply this to all pages
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',  // Prevent caching of sensitive pages
          },
        ],
      },
    ];
  },

  // Optional: Add rewrites if you need custom routing behavior (currently not needed for your case)
  rewrites() {
    return [];
  },
};
