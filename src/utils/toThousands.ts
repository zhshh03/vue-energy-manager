export const formatNumberToThousands = (num: number): string => {
  if (isNaN(num)) {
    throw new Error("必须是一个有效数字");
  }
  const [integerPart, decimalPart] = num.toString().split("."); //["1", "2", "3"]

  let formatterInteger = "";

  for (let i = integerPart.length - 1; i >= 0; i--) {
    formatterInteger = integerPart[i] + formatterInteger;
    //实例：1,234,567   7-6 7-5 7-4 ,  7-3 7-2 7-1
    if ((integerPart.length - i) % 3 === 0 && i !== 0) {
      formatterInteger = "," + formatterInteger;
    }
  }
  formatterInteger = decimalPart
    ? `${formatterInteger}.${decimalPart}`
    : formatterInteger;

  return formatterInteger;
};
