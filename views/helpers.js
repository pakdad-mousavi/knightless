import Handlebars from 'handlebars';

const helper = {
  makeParagraphs(str) {
    const data = Handlebars.Utils.escapeExpression(str);

    const result = [];
    const paragraphs = data.split('\n');
    paragraphs.forEach((paragraph) => {
      paragraph = paragraph.trim();
      if (paragraph.length) {
        result.push(`<p>${paragraph}</p>`);
      }
    });

    return result.join(' ');
  },

  sub(minuend, subtrahend) {
    if (minuend && subtrahend) {
      return minuend - subtrahend;
    }

    return '';
  },

  add(value, addend) {
    return value + addend;
  },

  isEven(value) {
    return value % 2 === 0;
  },

  getOddOrderFromIndex(index) {
    return 2 * index + 1;
  },

  getEvenOrderFromIndex(index) {
    return 2 * index + 2;
  },

  getMoveNumberFromIndex(index) {
    return Math.floor(index / 2);
  },

  eq(value, comparee) {
    return value === comparee;
  },

  neq(value, comparee) {
    return value !== comparee;
  },

};

export default helper;
