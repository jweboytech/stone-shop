type EncodedVariantField =
  | Product['encodedVariantAvailability']
  // eslint-disable-next-line @typescript-eslint/no-duplicate-type-constituents
  | Product['encodedVariantExistence'];
type DecodedOptionValues = number[][];

const V1_CONTROL_CHARS = {
  OPTION: ':',
  END_OF_PREFIX: ',',
  SEQUENCE_GAP: ' ',
  RANGE: '-',
};

export function decodeEncodedVariant(
  encodedVariantField: EncodedVariantField,
): DecodedOptionValues {
  if (!encodedVariantField) return [];

  if (encodedVariantField.startsWith('v1_')) {
    return v1Decoder(stripVersion(encodedVariantField));
  }

  throw new Error('Unsupported option value encoding');
}

const stripVersion: (encodedVariantField: string) => string = (
  encodedVariantField: string,
) => encodedVariantField.replace(/^v1_/, '');

function v1Decoder(encodedVariantField: string): number[][] {
  const tokenizer = /[ :,-]/g;
  let index = 0;
  let token: RegExpExecArray | null;
  const options: number[][] = [];
  const currentOptionValue: number[] = [];
  let depth = 0;
  let rangeStart: number | null = null;

  // iterate over control characters
  while ((token = tokenizer.exec(encodedVariantField))) {
    const operation = token[0];
    const optionValueIndex =
      Number.parseInt(encodedVariantField.slice(index, token.index)) || 0;

    if (rangeStart !== null) {
      // If a range has been started, iterate over the range and add each option value to the list of options
      // - `rangeStart` is set if the last control char was a dash, e.g. `0` for 0-2. It represents the numeric option value position for the start of the range.
      // - `optionValueIndex` is the numeric option value position for the end of the range
      for (; rangeStart < optionValueIndex; rangeStart++) {
        currentOptionValue[depth] = rangeStart;
        options.push([...currentOptionValue]);
      }
      // indicates the range has been processed
      rangeStart = null;
    }

    currentOptionValue[depth] = optionValueIndex;

    if (operation === V1_CONTROL_CHARS.RANGE) {
      // dash operation indicates we are in a range. e.g. 0-2 means option values 0, 1, 2
      rangeStart = optionValueIndex;
    } else if (operation === V1_CONTROL_CHARS.OPTION) {
      // colon operation indicates that we are moving down to the next layer of option values. e.g. 0:0:0-2 means we traverse down from option1 to option3 and represents [[0,0,0], [0,0,1], [0,0,2]]
      depth++;
    } else {
      if (
        operation === V1_CONTROL_CHARS.SEQUENCE_GAP ||
        (operation === V1_CONTROL_CHARS.END_OF_PREFIX &&
          encodedVariantField[token.index - 1] !==
            V1_CONTROL_CHARS.END_OF_PREFIX)
      ) {
        // add the current option value to the list of options if we hit a gap in our sequence or we are at the end of our depth and need to move back up
        options.push([...currentOptionValue]);
      }
      if (operation === V1_CONTROL_CHARS.END_OF_PREFIX) {
        // go up an option level, trash the last item in currentOptionValue
        currentOptionValue.pop();
        depth--;
      }
    }
    index = tokenizer.lastIndex;
  }

  // The while loop only iterates control characters, meaning if an encoded string ends with an index it will not be processed.
  const encodingEndsWithIndex = encodedVariantField.match(/\d+$/g);

  if (encodingEndsWithIndex) {
    const finalValueIndex = parseInt(encodingEndsWithIndex[0]);

    if (rangeStart != null) {
      // process final range
      for (; rangeStart <= finalValueIndex; rangeStart++) {
        currentOptionValue[depth] = rangeStart;
        options.push([...currentOptionValue]);
      }
    } else {
      // process final index
      options.push([finalValueIndex]);
    }
  }

  return options;
}
