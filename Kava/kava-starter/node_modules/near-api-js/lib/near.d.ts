import { Account } from './account';
import { Connection } from './connection';
import { Signer } from './signer';
import { PublicKey } from './utils/key_pair';
import { AccountCreator } from './account_creator';
import { KeyStore } from './key_stores';
export interface NearConfig {
    /** Holds {@link utils/key_pair!KeyPair | KeyPairs} for signing transactions */
    keyStore?: KeyStore;
    /** @hidden */
    signer?: Signer;
    /**
     * [NEAR Contract Helper](https://github.com/near/near-contract-helper) url used to create accounts if no master account is provided
     * @see {@link account_creator!UrlAccountCreator}
     */
    helperUrl?: string;
    /**
     * The balance transferred from the {@link masterAccount} to a created account
     * @see {@link account_creator!LocalAccountCreator}
     */
    initialBalance?: string;
    /**
     * The account to use when creating new accounts
     * @see {@link account_creator!LocalAccountCreator}
     */
    masterAccount?: string;
    /**
     * {@link utils/key_pair!KeyPair | KeyPairs} are stored in a {@link key_stores/keystore!KeyStore} under the `networkId` namespace.
     */
    networkId: string;
    /**
     * NEAR RPC API url. used to make JSON RPC calls to interact with NEAR.
     * @see {@link providers/json-rpc-provider!JsonRpcProvider}
     */
    nodeUrl: string;
    /**
     * NEAR RPC API headers. Can be used to pass API KEY and other parameters.
     * @see {@link providers/json-rpc-provider!JsonRpcProvider}
     */
    headers?: {
        [key: string]: string | number;
    };
    /**
     * NEAR wallet url used to redirect users to their wallet in browser applications.
     * @see [https://wallet.near.org/](https://wallet.near.org/)
     */
    walletUrl?: string;
    /**
     * JVSM account ID for NEAR JS SDK
     */
    jsvmAccountId?: string;
}
/**
 * This is the main class developers should use to interact with NEAR.
 * @example
 * ```js
 * const near = new Near(config);
 * ```
 */
export declare class Near {
    readonly config: any;
    readonly connection: Connection;
    readonly accountCreator: AccountCreator;
    constructor(config: NearConfig);
    /**
     * @param accountId near accountId used to interact with the network.
     */
    account(accountId: string): Promise<Account>;
    /**
     * Create an account using the {@link account_creator!AccountCreator}. Either:
     * * using a masterAccount with {@link account_creator!LocalAccountCreator}
     * * using the helperUrl with {@link account_creator!UrlAccountCreator}
     * @see {@link NearConfig.masterAccount} and {@link NearConfig.helperUrl}
     *
     * @param accountId
     * @param publicKey
     */
    createAccount(accountId: string, publicKey: PublicKey): Promise<Account>;
}
