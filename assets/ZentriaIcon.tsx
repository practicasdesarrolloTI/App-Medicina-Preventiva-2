// assets/ZentriaIcon.tsx
import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface Props {
  style?: ImageStyle;
}

const ZentriaIcon: React.FC<Props> = ({ style }) => {
  return (
    <Image
      source={require('./zentria_logo_transparent.png')}
      style={[{ width: 80, height: 80, opacity: 0.1 }, style]}
      resizeMode="contain"
    />
  );
};

export default ZentriaIcon;
