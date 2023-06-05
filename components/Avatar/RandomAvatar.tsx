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

// Créer une fonction pour choisir un élément aléatoire d'un tableau
function getRandomElement<T>(array: readonly T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const generateRandomAvatar = () => {
  return {
    accessory: getRandomElement(accessories),
    body: getRandomElement(bodies),
    circleColor: getRandomElement(circleColors),
    clothing: getRandomElement(clothes),
    clothingColor: getRandomElement(clothesColors),
    eyebrows: getRandomElement(eyebrows),
    eyes: getRandomElement(eyes),
    facialHair: getRandomElement(facialHairs),
    graphic: getRandomElement(graphics),
    hair: getRandomElement(hairs),
    hairColor: getRandomElement(hairColors),
    hat: getRandomElement(hats),
    hatColor: getRandomElement(hatColors),
    lipColor: getRandomElement(lipColors),
    mouth: getRandomElement(mouths),
    skinTone: getRandomElement(skinTones),
    lashes: Math.random() > 0.5,
    mask: Math.random() > 0.5,
    faceMask: Math.random() > 0.5,
  };
};
