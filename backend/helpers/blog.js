exports.smartTrim = (str, length, delim, appendix) => {
  if (str.length <= length) return str;
  var trimmedStr = str.substr(0, length + delim.length);
  var lastedDelimIndex = trimmedStr.lastIndexOf(delim);
  if (lastedDelimIndex >= 0)
    trimmedStr = trimmedStr.substr(0, lastedDelimIndex);

  if (trimmedStr) trimmedStr += appendix;
  return trimmedStr;
};
