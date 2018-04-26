export const maxOcurrance = array => {

  const counts = {};

  let compare = 0,
    mostOccured = null;

  array.forEach(word => {

    if (counts[word] === undefined) {

      counts[word] = 1;

    } else {

      counts[word] += 1;

    }

    if (counts[word] > compare) {

      compare = counts[word];
      mostOccured = word;

    }

  });

  return mostOccured;

};
