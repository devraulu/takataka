import { encodeBase32UpperCaseNoPadding } from '@oslojs/encoding';
import { constantTimeEqual } from '@oslojs/crypto/subtle';

export function generateRandomOTP(): string {
    const bytes = new Uint8Array(5);
    crypto.getRandomValues(bytes);
    const code = encodeBase32UpperCaseNoPadding(bytes);
    return code;
}

export function generateRandomRecoveryCode(): string {
    const bytes = new Uint8Array(10);
    crypto.getRandomValues(bytes);
    const recoveryCode = encodeBase32UpperCaseNoPadding(bytes);
    return recoveryCode;
}

export function constantTimeEqualString(a: string, b: string): boolean {
    if (a.length !== b.length) return false;

    const aBytes = new TextEncoder().encode(a);
    const bBytes = new TextEncoder().encode(b);

    const equal = constantTimeEqual(aBytes, bBytes);

    return equal;
}
