import React from "react";
import { BigHead } from "@bigheads/core";
import {
  accessories,
  bodies,
  circleColors,
  clothes,
  clothesColors,
  eyebrows,
  eyes,
  facialHairs,
  graphics,
  hairs,
  hairColors,
  hats,
  hatColors,
  lipColors,
  mouths,
  skinTones,
} from "./avatarOptions";

type Accessory = (typeof accessories)[number];
type Body = (typeof bodies)[number];
type CircleColor = (typeof circleColors)[number];
type Clothing = (typeof clothes)[number];
type ClothingColor = (typeof clothesColors)[number];
type Eyebrows = (typeof eyebrows)[number];
type Eyes = (typeof eyes)[number];
type FacialHair = (typeof facialHairs)[number];
type Graphic = (typeof graphics)[number];
type Hair = (typeof hairs)[number];
type HairColor = (typeof hairColors)[number];
type Hat = (typeof hats)[number];
type HatColor = (typeof hatColors)[number];
type LipColor = (typeof lipColors)[number];
type Mouth = (typeof mouths)[number];
type SkinTone = (typeof skinTones)[number];

interface AvatarProps {
  accessory?: Accessory;
  body?: Body;
  circleColor?: CircleColor;
  clothing?: Clothing;
  clothingColor?: ClothingColor;
  eyebrows?: Eyebrows;
  eyes?: Eyes;
  facialHair?: FacialHair;
  graphic?: Graphic;
  hair?: Hair;
  hairColor?: HairColor;
  hat?: Hat;
  hatColor?: HatColor;
  lashes?: boolean;
  lipColor?: LipColor;
  mask?: boolean;
  faceMask?: boolean;
  mouth?: Mouth;
  skinTone?: SkinTone;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return <BigHead {...props} />;
};

export default Avatar;
