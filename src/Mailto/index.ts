// Original: https://github.com/jaredpalmer/react-fns/blob/master/src/Mailto.tsx
import * as React from 'react';
import {h} from '../util';
import {stringify} from 'qs';

export interface IMailtoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  email: string;
  subject?: string;
  cc?: string[];
  bcc?: string[];
  body?: string;
}

export const Mailto: React.FunctionComponent<IMailtoProps> = ({
  email,
  subject = '',
  cc,
  bcc,
  body = '',
  ...props
}) => {
  const query = stringify({
    subject,
    cc: cc && cc.join(', '),
    bcc: bcc && bcc.join(', '),
    body
  });

  return h('a', {
    href: `mailto:${email}?${query}`,
    ...props
  });
};
