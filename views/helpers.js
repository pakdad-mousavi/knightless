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
};

export default helper;
