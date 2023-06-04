import React, { useState, useEffect, useContext } from "react";
import Avatar from "./Avatar";
import { AvatarProps } from "@bigheads/core";
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
import { AvatarContext } from "@/contexts/AvatarContext";

// Créer une fonction pour choisir un élément aléatoire d'un tableau
function getRandomElement<T>(array: readonly T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const AvatarGenerator = () => {
  const { avatarProps, setAvatarProps } = useContext(AvatarContext);

  const generateRandomAvatar = () => {
    setAvatarProps({
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
    });
  };
  useEffect(() => {
    if (Object.keys(avatarProps).length === 0) {
      generateRandomAvatar();
    }
  }, [avatarProps, setAvatarProps]);


  return (
    <div>
      <Avatar {...avatarProps} />
      <button onClick={generateRandomAvatar}>Generate Random Avatar</button>
    </div>
  );
};

export default AvatarGenerator;
