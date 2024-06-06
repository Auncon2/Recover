/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from 'antd/es/form';
import { NamePath } from 'antd/es/form/interface';
import { Dispatch, SetStateAction } from 'react';

export type commonProps = {
  accountSelectID?: number;
  setAccountDetails?: Dispatch<SetStateAction<any[]>>;
  handleClient?: any;
  handleStaff?: any;
  staffId?: any;
  selectedValue?: any;
  supplierId?: any;
  productId?: any;
  showAll?: boolean;
  name?: NamePath;
  label?: string;
  disabled?: boolean;
  initialValue?: string;
  defaultValue?: number | string;
  placeholder?: string;
  required?: boolean;
  size?: number;
  smSize?: number;
  xlSize?: number;
  mdSize?: number;
  xsSize?: number;
  small?: boolean;
  rules?: Rule[];
  dependencies?: NamePath[];
  mode?: 'multiple' | 'tags' | undefined;
  loading?: boolean;
  multiple?: boolean;
  value?: string;
  onChange?: (e: any) => any;
  handleMemberChange?: (value?: any) => void;
};

export type privateProps = {
  onSelectInvoiceHead: (amount: any) => void;
  name?: NamePath;
  label?: string;
  required?: boolean;
  size?: number;
};
