export const index = (req, res) => {
  const model = {
    title: 'Chessless',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/index', model);
};

export const pieces = (req, res) => {
  const model = {
    title: 'The Pieces',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces', model);
};

export const king = (req, res) => {
  const model = {
    title: 'The King',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces/king', model);
};

export const queen = (req, res) => {
  const model = {
    title: 'The Queen',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces/queen', model);
};

export const rook = (req, res) => {
  const model = {
    title: 'The Rook',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces/rook', model);
};

export const bishop = (req, res) => {
  const model = {
    title: 'The Bishop',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces/bishop', model);
};

export const knight = (req, res) => {
  const model = {
    title: 'The Knight',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces/knight', model);
};

export const pawn = (req, res) => {
  const model = {
    title: 'The Pawn',
    pageCategory: 'home',
    user: req.user ? req.user : null,
  };

  res.render('learn/pieces/pawn', model);
};
