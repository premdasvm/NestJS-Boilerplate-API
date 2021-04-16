import { customAlphabet } from 'nanoid/non-secure';

export function userIdGenerator(role: number) {
  let prefix = '';

  switch (role) {
    case 1:
      prefix = 'TSI';
      break;

    case 2:
      prefix = 'TSM';
      break;

    case 3:
      prefix = 'ASM';
      break;

    case 4:
      prefix = 'RM';
      break;

    case 5:
      prefix = 'GM';
      break;

    default:
      break;
  }
  let nanoid = customAlphabet('1234567890', 5);
  let userId = `${prefix}_${nanoid()}`;

  return userId.toUpperCase();
}
