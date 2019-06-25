exports.formatDate = list => {
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    newList.push({});
    Object.assign(newList[i], list[i]);
    newList[i].created_at = new Date(list[i].created_at);
  }
  return newList;
};

exports.makeRefObj = articles => {
  const result = {};
  for (let article of articles) {
    result[article.title] = article.article_id;
  }
  return result;
};

exports.formatComments = (comments, articleRef) => {
  const formattedComments = [];
  for (let i = 0; i < comments.length; i++) {
    formattedComments.push({});
    formattedComments[i].author = comments[i].created_by;
    formattedComments[i].article_id = articleRef[comments[i].belongs_to];
    formattedComments[i].votes = comments[i].votes;
    formattedComments[i].body = comments[i].body;
    formattedComments[i].created_at = new Date(comments[i].created_at);
  }

  return formattedComments;
};
