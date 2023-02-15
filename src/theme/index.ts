import * as React from 'react';
import {Provider, Consumer} from '../context';
import {h} from '../util';
import faccToHocc from '../util/faccToHoc';

export interface IThemeProps {
  name?: string;
  value: object;
}

export const Theme: React.FunctionComponent<IThemeProps> = (props) => {
  let {name = 'theme', value, children} = props;

  return h(Provider as any, {name, value}, children);
};

export interface IThemedProps {
  name?: string;
}

export const Themed: React.FunctionComponent<IThemedProps> = (props) => {
  let {name = 'theme', children} = props;

  return h(Consumer, {name}, children);
};

export const withTheme = faccToHocc(Themed, 'theme');
