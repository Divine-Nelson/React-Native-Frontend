export function identifierValidator(identifier) {
    if (!identifier) return "Username or Email can't be empty.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier) && identifier.length < 3) {
      return 'Enter a valid email or username.';
    }
    return '';
  }
  