import React from 'react';

import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
import { styled } from '../styles';
import MuiButton, { ButtonProps as MuiButtonProps } from '../Button';
import { capitalize } from '../utils';

type ColorExt = MuiButtonProps['color'] | 'tertiary';

export interface ButtonExtClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="text"` and `color="tertiary"`. */
  textTertiary: string;
  /** Styles applied to the root element if `variant="outlined"` and `color="tertiary"`. */
  outlinedTertiary: string;
  /** Styles applied to the root element if `variant="contained"` and `color="tertiary"`. */
  containedTertiary: string;
}

export type ButtonClassKey = keyof ButtonExtClasses;

export function getButtonExtUtilityClass(slot: string): string {
  return generateUtilityClass('MuiButtonExt', slot);
}

export const buttonExtClasses: ButtonExtClasses = generateUtilityClasses('MuiButtonExt', [
  'root',
  'textTertiary',
  'outlinedTertiary',
  'containedTertiary',
]);

export interface ButtonExtProps extends Omit<MuiButtonProps, 'color'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonExtClasses>;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
   * @default 'primary'
   */
  color?: ColorExt;
}

interface StyledProps {
  ownerState: ButtonExtProps;
}

const StyledRoot = styled(MuiButton, {
  // Configure which props should be forwarded
  shouldForwardProp: (prop) => prop !== 'ownerState',
  name: 'MuiButtonExt',
  slot: 'Root',
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: ({ ownerState }: StyledProps, styles) => [
    styles.root,
    ownerState.color === 'tertiary' &&
      styles[`${ownerState.variant}${capitalize(ownerState.color)}`],
  ],
})<StyledProps>();
/**
 *
 * Demos:
 *
 * - [Buttons](https://mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [ButtonExt API](https://mui.com/material-ui/api/button-ext/)
 * - inherits [MuiButton API](https://mui.com/material-ui/api/mui-button/)
 */
const ButtonExt: React.FC<ButtonExtProps> = ({ color, ...props }: ButtonExtProps) => {
  const ownerState = {
    ...props,
    color,
  };
  return (
    <StyledRoot
      ownerState={ownerState}
      color={color === 'tertiary' ? 'primary' : color}
      {...props}
    />
  );
};

export default ButtonExt;
