const orderRec = (target, template) => {
  if (
    !(target instanceof Object)
    || Array.isArray(target)
    || !(template instanceof Object)
    || Array.isArray(template)
  ) {
    return target;
  }
  const templateKeys = Object.keys(template);
  return Object
    .entries(target)
    .sort(([a], [b]) => {
      const idxA = templateKeys.indexOf(a);
      const idxB = templateKeys.indexOf(b);
      if (idxA === -1 && idxB === -1) {
        return a.localeCompare(b);
      }
      if (idxA === -1 || idxB === -1) {
        return idxB - idxA;
      }
      return idxA - idxB;
    })
    .reduce((p, [k, v]) => Object.assign(p, { [k]: orderRec(v, template[k]) }), {});
};
module.exports = orderRec;
