const getRemaining = (value: number): number =>
  value % 11 < 2 ? 0 : 11 - (value % 11);

type CheckSums = [number, number];

const generateCheckSums = (
  numbers: Array<number>,
  validators: Array<number>
): CheckSums => {
  const initialCheckSums: CheckSums = [0, 0];

  return validators.reduce(
    ([checkerA, checkerB], validator, index) =>
      [
        index === 0 ? 0 : checkerA + numbers[index - 1] * validator,
        checkerB + numbers[index] * validator,
      ] as CheckSums,
    initialCheckSums
  );
};

const isRepeatedArray = <T>(items: Array<T>): boolean =>
  items.every((item) => items[0] === item);

const mapToNumeric = (value: string): string => value.replace(/\D/g, "");

const mapToNumbers = (value: string): Array<number> =>
  mapToNumeric(value).split("").map(Number);

export const isCNPJ = (value: string): boolean => {
  if (!/^(\d{14}|\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/.test(value)) return false;
  const numbers = mapToNumbers(value);
  if (isRepeatedArray(numbers)) return false;
  const validators = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const checkers = generateCheckSums(numbers, validators);
  return (
    numbers[12] === getRemaining(checkers[0]) &&
    numbers[13] === getRemaining(checkers[1])
  );
};
