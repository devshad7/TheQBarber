import BUZZ_CUT from "../../public/assets/haircut/short/buzzcut.jpg";
import CREW_CUT from "../../public/assets/haircut/short/crewcut.jpg";
import IVY_LEAGUE from "../../public/assets/haircut/short/ivyleague.jpg";
import CEASAR_CUT from "../../public/assets/haircut/short/ceasarcut.jpg";
import HIGH_AND_TIGHT from "../../public/assets/haircut/short/high_and_tight.jpg";
import FLAT_TOP from "../../public/assets/haircut/short/flat_top.jpg";
import REGULATION_CUT from "../../public/assets/haircut/short/regulation_cut.jpg";
import BUTCH_CUT from "../../public/assets/haircut/short/butch_cut.jpg";

import LOW_FADE from "../../public/assets/haircut/fade/low_fade.jpg";
import MID_FADE from "../../public/assets/haircut/fade/mid_fade.jpg";
import HIGH_FADE from "../../public/assets/haircut/fade/high_fade.jpg";
import SKIN_FADE from "../../public/assets/haircut/fade/high_skin_fade.jpg";
import TAPER_FADE from "../../public/assets/haircut/fade/taper_fade.jpg";
import DROP_FADE from "../../public/assets/haircut/fade/drop_fade.jpg";
import BRUST_FADE from "../../public/assets/haircut/fade/brust_fade.jpg";
import TEMP_FADE from "../../public/assets/haircut/fade/temp_fade.jpg";

export const categories = [
  { name: "Short", category: "short_haircuts" },
  { name: "Fade", category: "fade_haircuts" },
  { name: "Medium", category: "medium_length_haircuts" },
  { name: "Long", category: "long_haircuts" },
  { name: "Curly", category: "curly_haircuts" },
  { name: "Edgy", category: "edgy_haircuts" },
  { name: "Cultural", category: "cultural_haircuts" },
];

export interface Haircut {
  name: string;
  category: string;
  imageUrl: string;
}

export const haircuts: Haircut[] = [
  // short haircuts
  {
    name: "Buzz Cut",
    category: categories[0].category,
    imageUrl: BUZZ_CUT.src,
  },
  {
    name: "Crew Cut",
    category: categories[0].category,
    imageUrl: CREW_CUT.src,
  },
  {
    name: "Ivy League",
    category: categories[0].category,
    imageUrl: IVY_LEAGUE.src,
  },
  {
    name: "Caesar Cut",
    category: categories[0].category,
    imageUrl: CEASAR_CUT.src,
  },
  {
    name: "High & Tight",
    category: categories[0].category,
    imageUrl: HIGH_AND_TIGHT.src,
  },
  {
    name: "Flat Top",
    category: categories[0].category,
    imageUrl: FLAT_TOP.src,
  },
  {
    name: "Regulation Cut",
    category: categories[0].category,
    imageUrl: REGULATION_CUT.src,
  },
  {
    name: "Butch Cut",
    category: categories[0].category,
    imageUrl: BUTCH_CUT.src,
  },

  // fade haircuts
  {
    name: "Low Fade",
    category: categories[1].category,
    imageUrl: LOW_FADE.src,
  },
  {
    name: "Mid Fade",
    category: categories[1].category,
    imageUrl: MID_FADE.src,
  },
  {
    name: "High Fade",
    category: categories[1].category,
    imageUrl: HIGH_FADE.src,
  },
  {
    name: "Skin (Bald) Fade",
    category: categories[1].category,
    imageUrl: SKIN_FADE.src,
  },
  {
    name: "Taper Fade",
    category: categories[1].category,
    imageUrl: TAPER_FADE.src,
  },
  {
    name: "Drop Fade",
    category: categories[1].category,
    imageUrl: DROP_FADE.src,
  },
  {
    name: "Burst Fade",
    category: categories[1].category,
    imageUrl: BRUST_FADE.src,
  },
  {
    name: "Temp Fade",
    category: categories[1].category,
    imageUrl: TEMP_FADE.src,
  },

  // medium length haircuts
  //   {
  //       name: "Side Part (Classic)",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Side Part (Modern / Hard Part)",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Pompadour",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Comb Over Fade",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Slick Back",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Quiff",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Brush Up",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Spiky Hair",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Curtains (90s Middle Part)",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "French Crop",
  //       category: categories[2].category,
  //       imageUrl: ""
  //   },

  //   // long haircuts
  //   {
  //       name: "Man Bun",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Top Knot",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Samurai Bun",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Ponytail",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Surfer Hair",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Layered Long Hair",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Viking Hairstyle",
  //       category: categories[3].category,
  //       imageUrl: ""
  //   },

  //   // curly haircuts
  //   {
  //       name: "Curly Fade",
  //       category: categories[4].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Curly Undercut",
  //       category: categories[4].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Curly Fringe",
  //       category: categories[4].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Afro",
  //       category: categories[4].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Temple Fade Afro",
  //       category: categories[4].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Wavy Slick Back",
  //       category: categories[4].category,
  //       imageUrl: ""
  //   },

  //   // edgy haircuts
  //   {
  //       name: "Mohawk",
  //       category: categories[5].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Burst Fade Mohawk",
  //       category: categories[5].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Faux Hawk",
  //       category: categories[5].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Mullet (Modern)",
  //       category: categories[5].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Bowl Cut (Mushroom)",
  //       category: categories[5].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "E-Boy Hairstyle",
  //       category: categories[5].category,
  //       imageUrl: ""
  //   },

  //   // cultural haircuts
  //   {
  //       name: "Cornrows",
  //       category: categories[6].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Box Braids",
  //       category: categories[6].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Dreadlocks",
  //       category: categories[6].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "High Top Fade",
  //       category: categories[6].category,
  //       imageUrl: ""
  //   },
  //   {
  //       name: "Hair Tattoo (Shaved Design / Patterns)",
  //       category: categories[6].category,
  //       imageUrl: ""
  //   },
];
