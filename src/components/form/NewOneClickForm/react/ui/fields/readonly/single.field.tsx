import { FieldValue, FieldDescription } from '../style';

export function SingleField({ fieldKey }: { fieldKey: string }) {
  return (
    <>
      <FieldValue fieldKey={fieldKey} />
      <FieldDescription fieldKey={fieldKey} />
    </>
  );
}
