import {validateSplits} from './utils';

// The string below is a marker and will be replaced by the real version number. DO NOT CHANGE
export const VERSION: string = 'react-' + 'REACT_SDK_VERSION_NUMBER';

// Treatments
export const ON: SplitIO.Treatment = 'on';

export const OFF: SplitIO.Treatment = 'off';

export const CONTROL: SplitIO.Treatment = 'control'; // SplitIO default value

export const CONTROL_WITH_CONFIG: SplitIO.TreatmentWithConfig = {
  treatment: 'control', // SplitIO default value
  config: null,
};

export const getControlTreatmentsWithConfig = (
  splitNames: unknown,
): SplitIO.TreatmentsWithConfig => {
  // validate split Names
  const validatedSplitNames = validateSplits(splitNames);

  // return empty object if the returned value is false
  if (!validatedSplitNames) {
    return {};
  }

  // return control treatments for each validated split name
  return validatedSplitNames.reduce(
    (pValue: SplitIO.TreatmentsWithConfig, cValue: string) => {
      pValue[cValue] = CONTROL_WITH_CONFIG;
      return pValue;
    },
    {},
  );
};

// Warning and error messages
export const WARN_SF_CONFIG_AND_FACTORY: string =
  '[WARN] Both a config and factory props were provided to SplitFactory. Config prop will be ignored.';

export const ERROR_SF_NO_CONFIG_AND_FACTORY: string =
  '[ERROR] SplitFactory must receive either a Split config or a Split factory as props.';

export const ERROR_SC_NO_FACTORY: string =
  '[ERROR] SplitClient does not have access to a Split factory. This is because it is not inside the scope of a SplitFactory component or SplitFactory was not properly instantiated.';

export const WARN_ST_NO_CLIENT: string =
  '[WARN] SplitTreatments does not have access to a Split client. This is because it is not inside the scope of a SplitFactory component or SplitFactory was not properly instantiated.';

export const EXCEPTION_NO_REACT_OR_CREATECONTEXT: string =
  'React library is not available or its version is not supported. Check that it is properly installed or imported. Split SDK requires version 16.3.0+ of React.';
