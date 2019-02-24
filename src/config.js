

const assetsFolder = `${__dirname}/assets`;

module.exports = {
  paths: {
    assets: assetsFolder,
    originalFile: `${assetsFolder}/original.txt`,
    sortedFile: `${assetsFolder}/sorted.txt`,
    logFile: `${assetsFolder}/log.txt`,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'top secret',
    maxAge: 3600,
  },
};
