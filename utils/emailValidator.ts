export interface EmailValidationResult {
    validEmails: string[];
    invalidEmails: string[];
    duplicateEmails: string[];
}

/**
 * @param emails Array of raw email strings
 * @returns Object categorizing emails into valid, invalid, and duplicates
 */
export function validateEmails(emails: string[]): EmailValidationResult {
    const validEmails: string[] = [];
    const invalidEmails: string[] = [];
    const duplicateEmails: string[] = [];
    const seenEmails = new Set<string>();

    const strictEmailRegex = /^[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}$/;

    for (const email of emails) {
        // 1. Check duplicate trước
        if (seenEmails.has(email)) {
            duplicateEmails.push(email);
            continue; // Bỏ qua việc validate lại, tống thẳng vào mảng duplicate
        }
        seenEmails.add(email);

        // 2. Validate format, lowercase, no spaces
        if (strictEmailRegex.test(email)) {
            validEmails.push(email);
        } else {
            invalidEmails.push(email);
        }
    }

    return {
        validEmails,
        invalidEmails,
        duplicateEmails
    };
}