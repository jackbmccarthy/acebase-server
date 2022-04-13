export declare const createPublicAccessToken: (uid: string, ip: string, dbToken: string, password: string) => string;
export declare const decodePublicAccessToken: (accessToken: string, password: string) => {
    access_token: string;
    uid: string;
    created: number;
    ip: string;
};
/**
 * Sign objects with an md5 hash. An attacker might base4 decode it and see the content and generated checksum hash,
 * but will need to guess the password used to generate the hash to manipulate it. This is  not impossible but will take
 * a very long time when using a large password
 * @param obj data object to sign
 * @param password password to use as salt for the generated md5 hash
 * @returns base64 encoded signed token
 */
export declare const createSignedPublicToken: (obj: any, password: string) => string;
/**
 * Parses and validates a signed token that was previouslt generated by `createSignedPublicToken`
 * @param str token previously generated by `createSignedPublicToken`
 * @param password the same password used to create the token with
 * @returns the original data object
 */
export declare const parseSignedPublicToken: (str: string, password: string) => any;