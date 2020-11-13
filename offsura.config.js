module.exports = {
  versionFilePath: '.offsura',
  replication: {
    hasura: {
      url: 'https://hasura.test.novitus.devticon.com',
    },
    entitiesDir: 'src/__generated__',
    tables: ['product_categories', 'products', 'products_product_categories'],
  },
  typeorm: {
    name: 'default',
    type: 'react-native',
    database: 'test3',
    location: 'default',
    synchronize: true,
    logging: true,
  },
};
