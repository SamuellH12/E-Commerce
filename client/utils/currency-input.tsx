import { NumericFormat } from "react-number-format";

type CurrencyInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function CurrencyInput({ value, onChange }: CurrencyInputProps) {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => onChange(values.floatValue || 0)}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      className="border p-2 rounded-md w-full"
    />
  );
}
