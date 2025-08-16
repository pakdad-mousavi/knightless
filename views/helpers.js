import Handlebars from 'handlebars';

const helper = {
  makeParagraphs(str, classStr) {
    const data = Handlebars.Utils.escapeExpression(str);

    const result = [];
    const paragraphs = data.split('\n');
    paragraphs.forEach((paragraph) => {
      paragraph = paragraph.trim();
      if (paragraph.length) {
        result.push(`<p${' class="' + classStr + '"'}>${paragraph}</p>`);
      }
    });

    return result.join(' ');
  },

  getCssClass(str, value, yes, no) {
    return str === value ? yes : no;
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

  getRatingRange(rating) {
    switch (true) {
      case rating >= 2850 && rating <= 2900:
        return '2850 - 2900';

      case rating >= 2800 && rating < 2850:
        return '2800 - 2850';

      case rating >= 2750 && rating < 2800:
        return '2750 - 2800';

      case rating >= 2700 && rating < 2750:
        return '2700 - 2750';

      case rating >= 2650 && rating < 2700:
        return '2650 - 2700';

      case rating >= 2600 && rating < 2650:
        return '2600 - 2650';

      case rating >= 2550 && rating < 2600:
        return '2550 - 2600';

      case rating >= 2500 && rating < 2550:
        return '2500 - 2550';

      default:
        return '2500 - 2900';
    }
  },

  eq(value, comparee) {
    if (typeof value === 'string') {
      value = value.trim();
    }
    if (typeof comparee === 'string') {
      comparee = comparee.trim();
    }
    return value === comparee;
  },

  neq(value, comparee) {
    return value !== comparee;
  },

  mod(value, divisor) {
    return value % divisor;
  },

  getDifficulty(rating) {
    
    const star = `<span class="icon-star"></span> `;
    if (rating > 2500) {
      return star.repeat(5);
    } else if (rating >= 2000) {
      return star.repeat(4);
    } else if (rating >= 1600) {
      return star.repeat(3);
    } else if (rating >= 1200) {
      return star.repeat(2);
    } else {
      return star.repeat(1);
    }
  },

  generateUUID() {
    return crypto.randomUUID();
  },
};

export default helper;
