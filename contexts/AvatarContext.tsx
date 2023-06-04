import { createContext } from 'react';
import { AvatarProps } from '@bigheads/core';

export const AvatarContext = createContext<{
    avatarProps: AvatarProps;
    setAvatarProps: React.Dispatch<React.SetStateAction<AvatarProps>>;
}>({ avatarProps: {}, setAvatarProps: () => { } });
