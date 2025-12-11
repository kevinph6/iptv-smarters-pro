/**
 * Generates a strong random password with configurable options
 * @param length - Length of the password (default: 16)
 * @param options - Options to include/exclude character types
 * @returns A randomly generated strong password
 */
export function generateStrongPassword(
  length: number = 16,
  options: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  } = {}
): string {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
  } = options;

  const uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Removed I and O for clarity
  const lowercaseChars = 'abcdefghijkmnopqrstuvwxyz'; // Removed l for clarity
  const numberChars = '23456789'; // Removed 0 and 1 for clarity
  const symbolChars = '!@#$%^&*-_+=';

  let charset = '';
  let password = '';

  // Build charset based on options
  if (uppercase) charset += uppercaseChars;
  if (lowercase) charset += lowercaseChars;
  if (numbers) charset += numberChars;
  if (symbols) charset += symbolChars;

  if (charset.length === 0) {
    throw new Error('At least one character type must be selected');
  }

  // Ensure at least one character from each selected type
  if (uppercase && uppercaseChars) {
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  }
  if (lowercase && lowercaseChars) {
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  }
  if (numbers && numberChars) {
    password += numberChars[Math.floor(Math.random() * numberChars.length)];
  }
  if (symbols && symbolChars) {
    password += symbolChars[Math.floor(Math.random() * symbolChars.length)];
  }

  // Fill the rest with random characters from the full charset
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Calculates password strength score
 * @param password - Password to evaluate
 * @returns Object with strength score (0-4) and feedback
 */
export function calculatePasswordStrength(password: string): {
  score: number;
  feedback: string;
  color: string;
} {
  let score = 0;
  
  if (!password) {
    return { score: 0, feedback: 'Aucun mot de passe', color: 'gray' };
  }

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Cap at 4
  score = Math.min(score, 4);

  const feedbackMap: Record<number, { feedback: string; color: string }> = {
    0: { feedback: 'Très faible', color: 'red' },
    1: { feedback: 'Faible', color: 'orange' },
    2: { feedback: 'Moyen', color: 'yellow' },
    3: { feedback: 'Fort', color: 'lime' },
    4: { feedback: 'Très fort', color: 'green' },
  };

  return { score, ...feedbackMap[score] };
}
