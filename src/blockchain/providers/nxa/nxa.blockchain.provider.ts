import * as Neon from '@cityofzion/neon-js';
import * as NeonCore from '@cityofzion/neon-core';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BlockchainAssetDto } from '../../../assets/dto/blockchain.asset.dto';
import { DeploySmartContractDto } from '../../../blockchain/dto/deploy.smart.contract.dto';
import { DeploySmartContractItemDto } from '../../../blockchain/dto/deploy.smart.contract.item';
import { DeploySmartContractResultDto } from '../../../blockchain/dto/deploy.smart.contract.result.dto';
import { BlockchainProviderInterface } from '../../../blockchain/types/blockchain.provider.interface';
import { BlockchainBalanceDto } from '../../../wallet/dto/blockchain.balance.dto';
import { BlockchainNetwork } from '../../../blockchain/types/blockchain.network';
import { BlockchainBlock } from '../../../blockchain/types/blockchain.block';
import { BlockchainTransaction } from '../../../blockchain/types/blockchain.transaction';
import { BlockchainTransfer, BlockchainTransferType } from '../../../blockchain/types/blockchain.transfer';
import { BlockchainGovernanceMemberDto } from '../../../governance/dto/blockchain.governance.member.dto';
import { ArgumentOutOfRangeError } from 'rxjs';

//
// NxaBlockchainProvider
//
@Injectable()
export class NxaBlockchainProvider implements BlockchainProviderInterface {
    private readonly logger = new Logger(NxaBlockchainProvider.name);
    private static nonce = 1;

    private apiRpcClient: NeonCore.rpc.RPCClient;

    connect(network: BlockchainNetwork): void {
        const endpoint = network.rpcEndpoint;

        this.logger.debug(`Connectiong to: '${endpoint}'...`);
        
        this.apiRpcClient = new Neon.rpc.RPCClient(endpoint);
    }

    disconnect(): void {
        this.logger.debug(`Disconnectiong from node...`);
        this.apiRpcClient = undefined;
    }

    async testConnection(): Promise<void> {
        const pingNum = await this.apiRpcClient.ping();
        console.dir(pingNum);

        const version = await this.apiRpcClient.getVersion();
        console.dir(version);

        const net = await this.apiRpcClient.net;
        console.dir(net);

        const connections = await this.apiRpcClient.getConnectionCount();
        console.dir(connections);

        const peers = await this.apiRpcClient.getPeers();
        console.dir(peers);

        const lastSeenHeight = await this.apiRpcClient.lastSeenHeight;
        console.dir(lastSeenHeight);

        const blockCount = await this.apiRpcClient.getBlockCount();
        console.dir(blockCount);

        const block = await this.apiRpcClient.getBlock(blockCount - 1, 1);
        console.dir(block);

        const validatedAddress = await this.apiRpcClient.validateAddress('NVGLB1NDt49nChTZmYemYEx1hQrmcviu2k');
        console.dir(validatedAddress);

        const nep17Balances = await this.apiRpcClient.getNep17Balances('NVGLB1NDt49nChTZmYemYEx1hQrmcviu2k');
        console.dir(nep17Balances);
    }

    isAddressValid(address: string): boolean {
        return NeonCore.wallet.isAddress(address);
    }

    async getFoundationMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        // TODO: Align to RPC Ext
        const rpcQuery = new NeonCore.rpc.Query({ method: 'getcommittee' });
        const publicKeys = await this.apiRpcClient.execute<string[]>(rpcQuery);
        const foundationMembers = publicKeys.map(pk => new BlockchainGovernanceMemberDto(pk, '', true, true));
        return foundationMembers;
    }

    async getCouncilMembers(): Promise<BlockchainGovernanceMemberDto[]> {
        // TODO: Align to RPC Ext
        const rpcQuery = new NeonCore.rpc.Query({ method: 'getcommittee' });
        const publicKeys = await this.apiRpcClient.execute<string[]>(rpcQuery);
        const councilMembers = publicKeys.map(pk => new BlockchainGovernanceMemberDto(pk, '', true, true));
        return councilMembers;
    }

    async getCandidates(): Promise<BlockchainGovernanceMemberDto[]> {
        // TODO: Align to RPC Ext
        const rpcQuery = new NeonCore.rpc.Query({ method: 'getcommittee' });
        const publicKeys = await this.apiRpcClient.execute<string[]>(rpcQuery);
        const candidates = publicKeys.map(pk => new BlockchainGovernanceMemberDto(pk, '', true, true));
        return candidates;
    }

    async getGenesisBlock(): Promise<BlockchainBlock> {
        const block = await this.apiRpcClient.getBlock(0, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getLastBlock(): Promise<BlockchainBlock> {
        const blockCount = await this.apiRpcClient.getBlockCount();
        const block = await this.apiRpcClient.getBlock(blockCount - 1, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getBlockByNumber(num: string | number): Promise<BlockchainBlock> {
        const numId = Number.parseInt(num.toString());
        const block = await this.apiRpcClient.getBlock(numId, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getBlockByHash(hash: string): Promise<BlockchainBlock> {
        const block = await this.apiRpcClient.getBlock(hash, 1);
        const blockchainBlock = BlockchainBlock.fromRaw(block);
        return blockchainBlock;
    }

    async getBlocksRange(from: number, limit: number, order: 'ascending' | 'descending'): Promise<BlockchainBlock[]> {
        if (from < 0) {
            throw new ArgumentOutOfRangeError();
        }

        if (limit < 0 && limit > 100) {
            throw new ArgumentOutOfRangeError();
        }

        let blocks: BlockchainBlock[] = [];

        const latsBlock = await this.getLastBlock();
        const latsBlockIndex = Number(latsBlock.index);

        if (order === 'ascending') {
            // E.g: (99, 10, ascending) -> [99 - 108]
            const to = from + limit - 1;
            for (let num = from; num <= to; num++) {
                if (num > latsBlockIndex) {
                    break;
                }
                const block = await this.getBlockByNumber(num);
                blocks.push(block);
            }
        }

        if (order === 'descending') {
            // E.g: (99, 10, descending) -> [99 - 90]
            const to = from - limit + 1;
            for (let num = from; num >= to; num--) {
                if (num < 0) {
                    break;
                }
                const block = await this.getBlockByNumber(num);
                blocks.push(block);
            }
        }

        return blocks;
    }

    async balanceOf(address: string): Promise<BlockchainBalanceDto[]> {
        const nep17Balances = await this.apiRpcClient.getNep17Balances(address);
        const balances = BlockchainBalanceDto.fromRpcBalances(nep17Balances);
        return balances;
    }

    async balanceByAssetOf(asset: string, address: string): Promise<BlockchainBalanceDto> {
        const assetFromCodeOrHash = BlockchainAssetDto.fromCodeOrHash(asset);
        const nep17Balances = await this.apiRpcClient.getNep17Balances(address);
        const balances = BlockchainBalanceDto.fromRpcBalances(nep17Balances);
        const balance = balances.find(b => b.asset.hash === assetFromCodeOrHash.hash || b.asset.code === assetFromCodeOrHash.code);
        return balance;
    }

    async deploy(...params: any): Promise<any> {
        return {};
    }

    async deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        return new DeploySmartContractResultDto(undefined, undefined, undefined ,undefined);
    }

    async getTransfersByAddress(address: string): Promise<BlockchainTransfer[]> {
        const startDateTimestamp = (+new Date(2021, 0, 1, 0, 0, 0, 0)).toString();
        const endDateTimestamp = Date.now().toString();
        const nep17Transfers = await this.apiRpcClient.getNep17Transfers(address, startDateTimestamp, endDateTimestamp);
        const sent = nep17Transfers.sent.map(s => new BlockchainTransfer(
            BlockchainTransferType.SENT,
            s.blockindex.toString(),
            s.txhash,
            nep17Transfers.address,
            s.transferaddress,
            s.amount,
            s.timestamp,
            BlockchainAssetDto.fromCodeOrHash(s.assethash)
        ));
        const received = nep17Transfers.received.map(s => new BlockchainTransfer(
            BlockchainTransferType.RECEIVED,
            s.blockindex.toString(),
            s.txhash,
            s.transferaddress,
            nep17Transfers.address,
            s.amount,
            s.timestamp,
            BlockchainAssetDto.fromCodeOrHash(s.assethash)
        ));
        return [...sent, ...received];
    }

    async getTransaction(txHash: string): Promise<BlockchainTransaction> {
        const rawTx = await this.apiRpcClient.getRawTransaction(txHash, true);
        const txBlock = rawTx?.blockhash ? await this.apiRpcClient.getBlock(rawTx.blockhash, true) : undefined;
        const tx = BlockchainTransaction.fromRaw(rawTx.blockhash, txBlock?.index.toString(), rawTx.blocktime, rawTx);
        return tx;
    }

    async broadcastTransaction(tx: string): Promise<string> {
        const hex = Neon.u.HexString.fromHex(tx);
        this.logger.debug(`Broadcasting: '${hex.toString()}'`);
        const txhash = await this.apiRpcClient.sendRawTransaction(hex);
        this.logger.debug(`Broadcasted: '${hex.toString()}',\nTX hash: '${txhash}'`);
        return txhash;
    }

    async transferFromSystem(asset: BlockchainAssetDto, address: string, amount: string): Promise<string> {
        const networkMagic = 199;
        const systemFaucetWif = 'L26KYxNcUjcWUAic8UoX9GKuVAZRmuJvbaCjQbULRN8mLCX6tft5';

        const systemFaucetAccount = new Neon.wallet.Account(systemFaucetWif);
        const receiveAccount = new Neon.wallet.Account(address);

        const inputs = {
            fromAccount: systemFaucetAccount,
            toAccount: receiveAccount,
            tokenScriptHash: asset.hash,
            amountToTransfer: Neon.u.BigInteger.fromNumber(amount),
            networkMagic: networkMagic,
        };

        this.logger.debug(`Transfering from system: ${amount} (${inputs.amountToTransfer.toString()}) of ${asset.code} (${asset.hash}) from ${inputs.fromAccount.address} to ${inputs.toAccount.address}`);

        // See https://dojo.coz.io/neo3/neon-js/docs/en/guides/basic/transfer.html
        const script = Neon.sc.createScript({
            scriptHash: inputs.tokenScriptHash,
            operation: 'transfer',
            args: [
                Neon.sc.ContractParam.hash160(inputs.fromAccount.address),
                Neon.sc.ContractParam.hash160(inputs.toAccount.address),
                Neon.sc.ContractParam.integer(inputs.amountToTransfer),
                Neon.sc.ContractParam.any('')
            ],
        });

        // Get block num aka height for the expiration
        const currentHeight = await this.apiRpcClient.getBlockCount();

        // Create RAW TX
        const rawTx = new Neon.tx.Transaction({
            nonce: NxaBlockchainProvider.nonce++,
            signers: [
              {
                account: inputs.fromAccount.scriptHash,
                scopes: Neon.tx.WitnessScope.CalledByEntry,
              },
            ],
            validUntilBlock: currentHeight + 10,
            systemFee: Neon.u.BigInteger.fromNumber(0),
            networkFee: Neon.u.BigInteger.fromNumber(0),
            script: script,
        });

        // Calculate & update network fee
        const networkFee = await this.getNetworkFee(rawTx.serialize().length);
        rawTx.networkFee = networkFee;

        // Calculate & update system fee
        const systemFee = await this.getSystemFee(rawTx.script, rawTx.signers);
        rawTx.systemFee = systemFee;

        // Sign & convert
        const signedTx = rawTx.sign(inputs.fromAccount, inputs.networkMagic);
        console.dir(signedTx.toJson());
        console.dir(signedTx.script.toString());
        const serializedTx = signedTx.serialize(true);
        const serializedTxHex = Neon.u.HexString.fromHex(serializedTx);

        this.logger.debug(`Signed TX:\n${JSON.stringify(signedTx.toJson())}`);
        this.logger.debug(`Serialized TX hex:\n${serializedTxHex.toString()}`);

        // Send raw TX
        const txhash = await this.apiRpcClient.sendRawTransaction(serializedTxHex);

        this.logger.debug(`TX hash:\n${txhash}`);

        return txhash;
    }

    async getSystemFeeForScript(script: string): Promise<string> {
        const systemFaucetWif = 'L26KYxNcUjcWUAic8UoX9GKuVAZRmuJvbaCjQbULRN8mLCX6tft5';
        const systemFaucetAccount = new Neon.wallet.Account(systemFaucetWif);

        const dummyTx = new Neon.tx.Transaction({
            signers: [
              {
                account: systemFaucetAccount.scriptHash,
                scopes: Neon.tx.WitnessScope.CalledByEntry,
              },
            ],
            systemFee: Neon.u.BigInteger.fromNumber(0),
            networkFee: Neon.u.BigInteger.fromNumber(0),
            script: script,
        });

        const systemFee = await this.getSystemFee(dummyTx.script, dummyTx.signers);
        return systemFee.toString();
    }

    async getNetworkFeeForLength(length: number): Promise<string> {
        const networkFee = await this.getNetworkFee(length);
        return networkFee.toString();
    }

    private async getNetworkFee(txLength: number): Promise<NeonCore.u.BigInteger> {
        const feePerByteInvokeResponse = await this.apiRpcClient.invokeFunction(
            Neon.CONST.NATIVE_CONTRACT_HASH.PolicyContract,
            "getFeePerByte"
        );
        
        if (feePerByteInvokeResponse.state !== "HALT") {
            throw new Error(`Unable to retrieve data to calculate network fee. State: ${feePerByteInvokeResponse.state}, Exception: ${feePerByteInvokeResponse.exception}`);
        }

        const feePerByte = Neon.u.BigInteger.fromNumber(feePerByteInvokeResponse.stack[0].value.toString());

        // Account for witness size
        const transactionByteSize = Math.ceil(txLength / 2) + 109;

        // Hardcoded. Running a witness is always the same cost for the basic account.
        const witnessProcessingFee = Neon.u.BigInteger.fromNumber(1_000_390);
        const networkFeeEstimate = feePerByte
            .mul(transactionByteSize)
            .add(witnessProcessingFee);

          return networkFeeEstimate;
    }

    private async getSystemFee(script: NeonCore.u.HexString, signers: NeonCore.tx.Signer[]): Promise<NeonCore.u.BigInteger> {
        const invokeFunctionResponse = await this.apiRpcClient.invokeScript(
            Neon.u.HexString.fromHex(script),
            signers
        );

        if (invokeFunctionResponse.state !== "HALT") {
            throw new Error(`Transfer script errored out! State: ${invokeFunctionResponse.state}, Exception: ${invokeFunctionResponse.exception}`);
        }

        const requiredSystemFee = Neon.u.BigInteger.fromNumber(invokeFunctionResponse.gasconsumed);

        return requiredSystemFee;
    }
}
