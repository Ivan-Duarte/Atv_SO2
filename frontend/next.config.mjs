import chokidar from 'chokidar';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ];
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
            poll: 1000, // Intervalo de polling
            aggregateTimeout: 300, // Tempo para agregar mudanças antes de recompilar
        };

        // Use chokidar para assistir a mudanças nos arquivos
        const watcher = chokidar.watch('./pages', {
            ignored: /node_modules/, // Ignorar node_modules
            persistent: true,
        });

        watcher.on('ready', () => {
            watcher.on('all', () => {
                for (const id of Object.keys(require.cache)) {
                    if (id.includes('/pages/')) {
                        delete require.cache[id];
                    }
                }
            });
        });

        return config;
    },
};

export default nextConfig;
