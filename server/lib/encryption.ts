import { decodeBase64 } from '@oslojs/encoding';
import { DynamicBuffer } from '@oslojs/binary';

export async function encrypt(
    data: Uint8Array,
): Promise<Uint8Array<ArrayBufferLike>> {
    const keyBuffer = decodeBase64(process.env.ENCRYPTION_KEY ?? '');

    if (keyBuffer.length != 16) {
        throw new Error('Key must be 16 bytes');
    }

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        {
            name: 'AES-GCM',
            length: 128,
        },
        false,
        ['encrypt'],
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = new DynamicBuffer(0);

    encryptedBuffer.write(iv);
    encryptedBuffer.write(
        new Uint8Array(
            await crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv,
                },
                cryptoKey,
                data,
            ),
        ),
    );

    return encryptedBuffer.bytes();

    // const iv = new Uint8Array(16);
    // crypto.getRandomValues(iv);
    //
    // const cipher = createCipheriv('aes-128-gcm', key, iv);
    // const encrypted = new DynamicBuffer(0);
    // encrypted.write(iv);
    // encrypted.write(new Uint8Array(cipher.update(data)));
    // encrypted.write(new Uint8Array(cipher.getAuthTag()));
    //
    // return encrypted.bytes();
}

export async function encryptString(
    data: string,
): Promise<Uint8Array<ArrayBufferLike>> {
    return await encrypt(new TextEncoder().encode(data));
}

export async function decrypt(
    encrypted: Uint8Array,
): Promise<Uint8Array<ArrayBufferLike>> {
    const keyBuffer = decodeBase64(process.env.ENCRYPTION_KEY ?? '');

    if (keyBuffer.length != 16) {
        throw new Error('Key must be 16 bytes');
    }

    if (encrypted.byteLength < 12 + 16) {
        throw new Error('Invalid data: Too short');
    }

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        {
            name: 'AES-GCM',
            length: 128,
        },
        false,
        ['decrypt'],
    );

    const iv = encrypted.slice(0, 12);
    const ciphertext = encrypted.slice(12);

    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        ciphertext,
    );

    return new Uint8Array(decrypted);

    // if (encrypted.byteLength < 33) {
    //     throw new Error('Invalid data');
    // }
    //
    // const decipher = createDecipheriv(
    //     'aes-128-gcm',
    //     key,
    //     encrypted.slice(0, 16),
    // );
    //
    // decipher.setAuthTag(encrypted.slice(encrypted.byteLength - 16));
    // const decrypted = new DynamicBuffer(0);
    // decrypted.write(
    //     new Uint8Array(
    //         decipher.update(encrypted.slice(16, encrypted.byteLength - 16)),
    //     ),
    // );
    // decrypted.write(new Uint8Array(decipher.final()));
    //
    // return decrypted.bytes();
}

export async function decryptToString(data: Uint8Array): Promise<string> {
    return new TextDecoder().decode(await decrypt(data));
}
