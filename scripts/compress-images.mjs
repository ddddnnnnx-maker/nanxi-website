// One-off image compressor for public/. Re-encodes in place, keeping filenames
// (so all code references stay valid). Caps the longest edge and re-compresses.
//   node scripts/compress-images.mjs
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("../public", import.meta.url));
const MAX_EDGE = 2000; // longest side cap
const JPG_Q = 78;
const PNG_Q = 80;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let before = 0, after = 0, count = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const orig = (await stat(file)).size;
  try {
    let img = sharp(file, { failOn: "none" }).rotate(); // respect EXIF orientation
    const meta = await img.metadata();
    if (meta.width && meta.height && Math.max(meta.width, meta.height) > MAX_EDGE) {
      img = img.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });
    }
    if (ext === ".png") {
      img = img.png({ compressionLevel: 9, quality: PNG_Q, palette: true });
    } else {
      img = img.jpeg({ quality: JPG_Q, mozjpeg: true });
    }
    const tmp = file + ".tmp";
    await img.toFile(tmp);
    const newSize = (await stat(tmp)).size;
    if (newSize < orig) {
      await unlink(file);
      await rename(tmp, file);
    } else {
      await unlink(tmp); // keep original if compression didn't help
    }
    const finalSize = (await stat(file)).size;
    before += orig; after += finalSize; count++;
    const tag = file.replace(ROOT, "");
    if (orig - finalSize > 200 * 1024)
      console.log(`${(orig / 1e6).toFixed(2)}MB -> ${(finalSize / 1e6).toFixed(2)}MB  ${tag}`);
  } catch (err) {
    console.log("SKIP", file, err.message);
  }
}

console.log(`\nDone. ${count} files. ${(before / 1e6).toFixed(0)}MB -> ${(after / 1e6).toFixed(0)}MB`);
