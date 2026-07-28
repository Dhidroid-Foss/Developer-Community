import cat01 from "./cat01.jpg";
import cat02 from "./cat02.jpg";
import cat03 from "./cat03.jpg";

export const DevCats1 = typeof cat01 === "string" ? cat01 : (cat01 as { src: string }).src;
export const DevCats2 = typeof cat02 === "string" ? cat02 : (cat02 as { src: string }).src;
export const DevCats3 = typeof cat03 === "string" ? cat03 : (cat03 as { src: string }).src;

export default DevCats1;

