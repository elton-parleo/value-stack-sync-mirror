// Convert generated PNGs to web sizes (webp + jpg fallback)
import sharp from 'sharp';
import { mkdirSync } from 'fs';
const SRC='/mnt/user-data/uploads/Cowork/03_outputs/website/assets/generated/final/';
const OUT='public/img/'; mkdirSync(OUT,{recursive:true});
const jobs=[
 ['20261022_hero_specimen_opt1_v1.png','hero-specimen',[2560,1600,1024]],
 ['20261022_aisle_signal_opt2_v1.png','aisle',[2200,1400,900]],
 ['20261022_close_plinth_opt1_v1.png','plinth',[2200,1400,900]],
 ['20261022_brand_shelf_opt1_v1.png','brand-shelf',[1800,1200,800]],
 ['20261022_retail_rail_opt2_v1.png','retail-rail',[1800,1200,800]],
 ['20261022_audit_hands_opt1_v1.png','audit-hands',[2000,1400,900]],
 ['20261022_overhead_grid_opt1_v1.png','overhead-grid',[2200,1400,900]],
];
for (const [file,name,sizes] of jobs){
  for (const w of sizes){
    await sharp(SRC+file).resize({width:w}).webp({quality:82}).toFile(`${OUT}${name}-${w}.webp`);
  }
  await sharp(SRC+file).resize({width:sizes[1]}).jpeg({quality:84,mozjpeg:true}).toFile(`${OUT}${name}.jpg`);
  console.log('done',name);
}
