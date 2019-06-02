const fetch = require('node-fetch');

async function fetchUnicodeRangeGroups() {
  const cssContent = await fetchCSSFile(
    'https://fonts.googleapis.com/css?family=Noto+Sans+KR'
  );
  const unicodeRanges = parseUnicodeRanges(cssContent);

  return unicodeRanges;
}

module.exports = fetchUnicodeRangeGroups;

async function fetchCSSFile(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        // unicode-range가 포함된 CSS는
        // 상대적으로 새 브라우저의 User-Agent가 제공되었을 경우에만
        // Google이 서빙하기 때문에,
        // 커스텀 User-Agent를 헤더에 포함해 줌
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
    }
  });

  return response.text();
}

function parseUnicodeRanges(content) {
  const rangeRegex = /unicode-range: (.+?);/g;
  const rangeGroups = [];

  let matches;
  while ((matches = rangeRegex.exec(content)) !== null) {
    const ranges = matches[1].split(', ');
    rangeGroups.push(ranges);
  }

  return rangeGroups;
}
