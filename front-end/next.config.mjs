/** @type {import('next').NextConfig} */
const nextConfig = {
    // With docker volumes changes are not detected by the watcher
    webpack: (config, _) => ({
        ...config,
        watchOptions: {
            ...config.watchOptions,
            poll: 200,
            aggregateTimeout: 200,
        },
    }),
};

export default nextConfig;
