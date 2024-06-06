/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, DatePicker, Form, Input, InputNumber } from 'antd';
import { Rule } from 'antd/es/form';
import TextArea from 'antd/es/input/TextArea';
import { NamePath } from 'antd/lib/form/interface';

type Props = {
  value?: any;
  color?: 'green' | 'red' | 'gray';
  defaultValue?: string | number;
  dialCodeName?: NamePath;
  disabled?: boolean;
  help?: string;
  icon?: boolean;
  label?: string;
  loading?: boolean;
  maxAmount?: number;
  mdSize?: number;
  name?: NamePath;
  min?: string;
  max?: string | number;
  offset?: number;
  onChange?: React.Dispatch<React.SetStateAction<number | string>>;
  placeholder?: string;
  rangePicker?: boolean;
  readOnly?: boolean;
  required?: boolean;
  smSize?: number;
  size?: number;
  small?: boolean;
  style?: React.CSSProperties;
  setShowTable?: any;
  inputType?: 'text' | 'email' | 'tel';
  type?:
    | 'dashed'
    | 'default'
    | 'ghost'
    | 'link'
    | 'text'
    | 'primary'
    | undefined;
  validateStatus?: boolean;
  year?: boolean;
  rules?: Rule[] | undefined;
  className?: string;
  autoSize?: boolean;

  textAlign?: 'right' | 'left' | 'center' | 'start' | 'end';
  dependencies?: NamePath[];
};

// FORM DATE INPUT ITEM
export function DateInput({
  name,
  label,
  required,
  year,
  placeholder,
  disabled,
  rangePicker,
  dependencies,
  rules,
}: Props) {
  // const today = new Date().toISOString().slice(0, 10);
  const { RangePicker } = DatePicker;
  return (
    <Col xs={24}>
      <Form.Item
        dependencies={dependencies}
        rules={[
          {
            required: required,
            message: `${label} is required`,
            type: !rangePicker ? 'date' : 'array',
          },
          ...(rules || []),
        ]}
        name={name}
        label={label}
      >
        {!rangePicker ? (
          <DatePicker
            // defaultValue={dayjs()}
            picker={year ? 'year' : 'date'}
            format={year ? 'YYYY' : 'DD-MM-YYYY'}
            placeholder={placeholder || 'Select date'}
            style={{ width: '100%' }}
            disabled={disabled}
          />
        ) : (
          <RangePicker
            style={{ width: '100%' }}
            disabled={disabled}
            picker={year ? 'year' : 'date'}
            format={year ? 'YYYY' : 'DD-MM-YYYY'}
          />
        )}
      </Form.Item>
    </Col>
  );
}

// FORM INPUT ITEM
export const FormInputItem = ({
  name,
  label,
  required,
  size,
  placeholder,
  readOnly,
  onChange,
  help,
  offset,
  validateStatus,
  inputType,
  dependencies,
  rules,
}: Props) => {
  return (
    <Col xs={24} sm={12} md={8} lg={{ span: size || 8, offset: offset || 0 }}>
      <Form.Item
        dependencies={dependencies}
        rules={[
          {
            required: required || false,
            message: `${label} is required!`,
          },

          ...(rules || []),
        ]}
        name={name}
        label={label}
        validateStatus={validateStatus ? 'error' : 'validating'}
        help={validateStatus ? help : null}
      >
        <Input
          readOnly={readOnly}
          type={inputType || 'text'}
          placeholder={placeholder || label}
          onChange={(e) => {
            onChange && onChange(e.target.value);
          }}
        />
      </Form.Item>
    </Col>
  );
};

// TEXTAREA INPUT ITEM
export function TextAreaInput({ name, label, size, offset, autoSize }: Props) {
  return (
    <Col
      span={6}
      xs={24}
      sm={24}
      md={24}
      lg={size || 16}
      offset={offset ? offset : 0}
    >
      <Form.Item name={name} label={label}>
        <TextArea
          rows={3}
          placeholder='Note something'
          autoSize={autoSize}
          maxLength={255}
        />
      </Form.Item>
    </Col>
  );
}

export const NumberInput = ({
  name,
  label,
  mdSize,
  smSize,
  size,
  small,
  readOnly,
  color,
  placeholder,
  style,
  defaultValue,
  onChange,
  min,
  offset,
  max,
  rules,
}: Props) => {
  return (
    <Col
      xs={24}
      sm={smSize || 12}
      md={mdSize || 8}
      lg={{ span: size || 8 }}
      offset={offset ? offset : 0}
    >
      <Form.Item
        name={name}
        label={label}
        rules={
          readOnly
            ? [...(rules || [])]
            : [
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    if (getFieldValue('invoice_due') < value) {
                      return Promise.reject();
                    } else {
                      return Promise.resolve();
                    }
                  },
                  message: 'Error',
                }),
                ...(rules || []),
              ]
        }
      >
        <InputNumber
          size={small ? 'small' : 'middle'}
          placeholder={placeholder ? placeholder : label}
          style={{
            width: '100%',
            border: `1px solid ${color}`,
            color,
            ...style,
          }}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          min={min || undefined}
          max={max || undefined}
          // type={'number'}
          readOnly={readOnly || false}
          defaultValue={defaultValue ? defaultValue : undefined}
          onChange={(e) => onChange && onChange(Number(e))}
        />
      </Form.Item>
    </Col>
  );
};
