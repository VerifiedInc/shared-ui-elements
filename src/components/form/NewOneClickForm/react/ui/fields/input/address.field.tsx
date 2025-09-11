import { AddressInput } from '../../../../../AddressInput';

import { fieldInputTypes } from '../../../../core/fields';

import { useFormField } from '../../../core/field.hook';

import { useOneClickForm } from '../../form.context';

import { FieldLabel } from './label';
import { ClearFieldAdornment } from './clear-field-adornment';

export function AddressInputField({ fieldKey }: { fieldKey: string }) {
  const { options } = useOneClickForm();
  const { field, setChildValue } = useFormField({ key: fieldKey });

  if (field?.schema.characteristics.inputType !== fieldInputTypes.composite) {
    return null;
  }

  return (
    <AddressInput
      label={<FieldLabel fieldKey={fieldKey} />}
      helperText={field.errorMessage ?? field?.description}
      error={!!field.errors}
      defaultValue={{
        line1: field?.value?.line1,
        city: field?.value?.city,
        state: field?.value?.state,
        zipCode: field?.value?.zipCode,
        country: field?.value?.country,
      }}
      onChange={(value) => {
        if (typeof value === 'string') return;

        // Null value will clear all child values
        if (value === null) {
          Object.keys(field?.value ?? {}).forEach((key) => {
            if (key === 'line2') return;
            setChildValue(key, '');
          });
        }

        // Below we update the address parts if they are present in the field form
        if (typeof field?.value?.line1 === 'string') {
          setChildValue('line1', value?.line1 ?? '');
        }

        if (typeof field?.value?.city === 'string') {
          setChildValue('city', value?.city ?? '');
        }

        if (typeof field?.value?.state === 'string') {
          setChildValue('state', value?.state ?? '');
        }

        if (typeof field?.value?.zipCode === 'string') {
          setChildValue('zipCode', value?.zipCode ?? '');
        }

        if (typeof field?.value?.country === 'string') {
          setChildValue('country', value?.country ?? '');
        }
      }}
      ClearAdornment={function ClearAdornment({
        onClick,
      }: {
        onClick: () => void;
      }) {
        return <ClearFieldAdornment fieldKey={fieldKey} onClick={onClick} />;
      }}
      service={{
        googlePlacesAutocompletePlaces:
          options.servicePaths.googlePlacesAutocompletePlaces,
        googlePlacesGetPlace: options.servicePaths.googlePlacesGetPlace,
      }}
    />
  );
}
