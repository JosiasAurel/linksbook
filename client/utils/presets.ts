
import { Deta } from "deta";

const deta = Deta(process.env.NEXT_PUBLIC_PROJECT_KEY);

const bgImages = deta.Drive("bg-images");

async function getBgImages() {
    const files: any = await bgImages.list();
    return files.map((file) => file.url);
}
const BgPresets: any = getBgImages();


export { BgPresets };