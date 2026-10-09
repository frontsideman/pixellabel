const sharp = require('/Users/aliaksandr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');

// ImageGen edits are kept separately; originals remain outside the public build.
(async () => {
  for (const name of ['hero', 'hero-subject', 'about', 'experience']) {
    const {width, height} = await sharp(`artwork-originals/2026-10-09/${name}.webp`).metadata();
    await sharp(`artwork-persona/${name}.png`).resize(width, height).webp({quality:90, alphaQuality:95}).toFile(`public/artwork/${name}.webp`);
  }
  await sharp('public/artwork/hero.webp').resize(750,1150,{fit:'cover',position:'right'}).webp({quality:84}).toFile('public/artwork/hero-mobile.webp');
  await sharp('public/artwork/hero.webp').resize(700,330,{fit:'cover',position:'bottom'}).webp({quality:84}).toFile('public/artwork/services.webp');
  const subject = 'public/artwork/hero-subject.webp';
  const {width, height} = await sharp(subject).metadata();
  await sharp(subject).extract({left:500,top:0,width:width-500,height}).resize({width:850}).webp({quality:87,alphaQuality:95}).toFile('public/artwork/hero-subject-mobile.webp');
  await sharp('public/artwork/about.webp').resize({width:400}).webp({quality:85}).toFile('public/artwork/about-small.webp');
  await sharp('public/artwork/hero.webp').resize(1200,630,{fit:'cover'}).jpeg({quality:90}).toFile('public/og-image.jpg');
})();
