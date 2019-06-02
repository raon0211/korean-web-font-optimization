const fontRanger = require('font-ranger/lib/font-ranger');
const path = require('path');
const fetchUnicodeRangeGroups = require('./download');
const aggregateCSSFiles = require('./aggregate');

const fontFile = process.env.FONT_FILE;
const fontFamily = process.env.FONT_FAMILY || 'font';
const fontWeight = Number(process.env.FONT_WEIGHT) || 400;
const fontDisplay = process.env.FONT_DISPLAY || 'swap';
const skipCss = process.env.SKIP_CSS || false;
const addWoff = process.env.ADD_WOFF === 'false' || true;
const urlPrefix = process.env.URL_PREFIX || '/fonts/';
const outputFolder = process.env.OUTPUT_FOLDER || path.join('.', urlPrefix);
const locals = process.env.LOCALS
  ? process.env.LOCALS.split(',')
  : [fontFamily];

(async () => {
  const unicodeRangeGroups = await fetchUnicodeRangeGroups();

  console.log('> Creating font files');
  const jobs = unicodeRangeGroups.map(async (ranges, index) => {
    try {
      await fontRanger({
        fontFile,
        fontFamily,
        fontWeight,
        fontDisplay,
        skipCss,
        addWoff,
        urlPrefix,
        outputFolder,
        locals,
        ranges,
        fontName: `${fontFamily.toLowerCase()}.${index}`
      });
    } catch (e) {
      console.error(e);
    }
  });
  await Promise.all(jobs);

  const dest = path.join(outputFolder, `${fontFamily}.css`);
  console.log(`> Aggregating CSS Files to ${dest}`);
  await aggregateCSSFiles(outputFolder, dest);

  console.log('> Complete');
})();
