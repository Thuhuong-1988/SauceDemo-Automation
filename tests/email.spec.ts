import { test, expect } from '../fixtures/page-fixtures';
import { validateEmails } from '../utils/emailValidator';
test.describe('Email Validation Utility Tests', () => {

    test('Should correctly categorize a mixed array of emails', () => {
        // Prepare Data
        const inputEmails = [
            "valid.email@example.com",     // Valid
            "invalid-email",               // Invalid (Missing @ and domain)
            "valid.email@example.com",     // Duplicate (Valid form)
            "UPPERCASE@DOMAIN.COM",        // Invalid (Uppercase not allowed)
            "space in@email.com",          // Invalid (Space not allowed)
            "hello@world",                 // Invalid (Missing .tld)
            "another_valid@test.co",       // Valid
            "invalid-email"                // Duplicate (Invalid form)
        ];

        // Execute
        const result = validateEmails(inputEmails);

        // Assert - Valid Emails
        expect(result.validEmails).toEqual([
            "valid.email@example.com",
            "another_valid@test.co"
        ]);

        // Assert - Invalid Emails
        expect(result.invalidEmails).toEqual([
            "invalid-email",
            "UPPERCASE@DOMAIN.COM",
            "space in@email.com",
            "hello@world"
        ]);

        // Assert - Duplicate Emails 
        expect(result.duplicateEmails).toEqual([
            "valid.email@example.com",
            "invalid-email"
        ]);
    });

    test('Should handle strictly lowercase rule (Reject Uppercase/CamelCase)', () => {
        const result = validateEmails([
            "admin@Test.com",     // Uppercase in domain
            "Admin@test.com",     // Uppercase in username
            "admin@test.COM"      // Uppercase in TLD
        ]);
        
        expect(result.validEmails).toHaveLength(0);
        expect(result.invalidEmails).toHaveLength(3);
    });

    test('Should reject any emails containing spaces', () => {
        const result = validateEmails([
            " test@email.com",    // Leading space
            "test@email.com ",    // Trailing space
            "te st@email.com"     // Inline space
        ]);
        
        expect(result.validEmails).toHaveLength(0);
        expect(result.invalidEmails).toHaveLength(3);
    });

    test('Should handle empty array input without errors', () => {
        const result = validateEmails([]);
        
        expect(result).toEqual({
            validEmails: [],
            invalidEmails: [],
            duplicateEmails: []
        });
    });

    test('Should push to duplicates every time an email repeats more than once', () => {
        const result = validateEmails([
            "a@b.co", 
            "a@b.co", 
            "a@b.co"
        ]);
        
        // Lần 1 vào valid, lần 2 và 3 vào duplicate
        expect(result.validEmails).toEqual(["a@b.co"]);
        expect(result.duplicateEmails).toEqual(["a@b.co", "a@b.co"]);
    });
});