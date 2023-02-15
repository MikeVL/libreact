import React, { createElement as h } from 'react';

export interface IMock<TProps> extends React.Component<TProps, any> {}

export interface IMockComponent<TProps> {
  new (props: TProps, context): IMock<TProps>;
  implement(Implementation: React.Component<TProps, any> | React.FC<TProps>);
}

export interface IMockParams<TProps> {
  loading?: ((props) => (React.ReactElement<any> | React.FC<TProps>)) | React.ReactElement<any> | React.FC<TProps> | React.ReactChild;
}

export type TMock = <TProps>(params?: IMockParams<TProps>) => IMockComponent<TProps>;

export const mock: TMock = <TProps>({loading = null}: IMockParams<TProps> = {}) => {
  let Comp;
  let cnt = 0;
  const instances: {[cnt: number]: React.Component<TProps, any>} = {};

  const Mock: IMockComponent<TProps> = class Mock extends React.Component<TProps, any> {
    mockId = cnt++;

    constructor (props, context) {
      super(props, context);

      instances[this.mockId] = this;
    }

    componentWillUnmount () {
      delete instances[this.mockId];
    }

    render () {
      return Comp ? h(Comp, this.props) : (typeof loading === 'function' ? h(loading as any, this.props) : loading);
    }
  } as any as IMockComponent<TProps>;

  Mock.implement = (Implementation) => {
    Comp = Implementation;
    for (const id in instances) {
      instances[id].forceUpdate();
    }
  };

  return Mock;
};
