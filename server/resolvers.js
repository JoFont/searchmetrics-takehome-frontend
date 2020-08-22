const { findIndex, difference, isInteger, slice, map, sortBy } = require('lodash');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

let categories = [
  { id: 'swdfwdfsdf', name: 'Category 1', keywords: ['cat', 'dog', 'cenas'] },
  { id: 'ohmfnmnfk', name: 'Category 2', keywords: ['teste', 'teste 2'] }
];

const subscribers = [];
const onCategoryUpdates = fn => subscribers.push(fn);

module.exports = {
  Query: {
    categories: () => categories
  },
  Mutation: {
    addCategory: async (_, { name }) => {
      const id = uuidv4();
      let newKeywordArr = [];
      try {
        const word = name.toLowerCase().split(' ').join('+');
        const response = await axios.get(`https://api.datamuse.com/words?ml=${word}`);
        const { data } = response;
        newKeywordArr = map(
          slice(
            sortBy(data, o => -o.word),
            0,
            data.length <= 10 ? data.length : 10
          ),
          el => el.word
        );
      } catch (error) {
        console.log(error);
      }

      categories.unshift({
        id,
        name,
        keywords: newKeywordArr
      });

      subscribers.forEach(fn => fn());
      return id;
    },
    deleteCategory: (_, { id }) => {
      const categoryIndex = findIndex(categories, { id });
      if (isInteger(categoryIndex)) {
        const newCategories = [...categories];
        newCategories.splice(categoryIndex, 1);
        categories = [...newCategories];
      }
      subscribers.forEach(fn => fn());
      return id;
    },
    addKeyword: (_, { id, keyword }) => {
      const categoryIndex = findIndex(categories, { id });
      if (isInteger(categoryIndex)) {
        categories[categoryIndex].keywords.push(keyword);
      }
      subscribers.forEach(fn => fn());
      return id;
    },

    deleteKeyword: (_, { id, keyword }) => {
      const categoryIndex = findIndex(categories, { id });

      if (isInteger(categoryIndex)) {
        const newKeywords = difference([...categories[categoryIndex].keywords], [keyword]);
        categories[categoryIndex].keywords = newKeywords;
      }
      subscribers.forEach(fn => fn());
      return id;
    }
  },
  Subscription: {
    categories: {
      subscribe: (_, __, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onCategoryUpdates(() => pubsub.publish(channel, { categories }));
        setTimeout(() => pubsub.publish(channel, { categories }), 0);
        return pubsub.asyncIterator(channel);
      }
    }
  }
};