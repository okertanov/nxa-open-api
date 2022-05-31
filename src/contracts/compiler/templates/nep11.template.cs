using System;
using System.ComponentModel;
using System.Numerics;
using Neo;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Native;
using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework.Attributes;

namespace Dvita.SC.CaaS
{
    public class TokenState
    {
        public UInt160 Owner;
        public string Name;
        public string Description;
        public string TokenURI;
        public ulong CreatedTime;
        public UInt160 Creator;
    }

    [ManifestExtra("Author", "{{ContractAuthorName}}")]
    [ManifestExtra("Email", "{{ContractAuthorEmail}}")]
    [ManifestExtra("Description", "{{ContractDescription}}")]
    [ManifestExtra("Version", "1.0")]
    [SupportedStandards("NEP-11")]
	[ContractPermission("*", "*")]
    sealed public class {{ContractName}}Contract : Neo.SmartContract.Framework.SmartContract
    {
        private static readonly ByteString trueInByteString = (ByteString)new byte[] {0x01};
        private static readonly byte[] blockListPrefix = new byte[] { 0x01, 0x01 };
        private static readonly byte[] contractPrefix = new byte[] { 0x01, 0x02 };
        public static readonly StorageMap ContractMap = new StorageMap(Storage.CurrentContext, contractPrefix);
        public static readonly StorageMap BlocklistMap = new StorageMap(Storage.CurrentContext, blockListPrefix);
        private static readonly byte[] ownerKey = "owner".ToByteArray();
        private static readonly byte[] pausedKey = "paused".ToByteArray();
        private const byte prefixTotalSupply = 0x00;
        private const byte prefixBalance = 0x01;
        private const byte prefixTokenId = 0x02;
        private const byte prefixToken = 0x03;
        private const byte prefixAccountToken = 0x04;

        // events
        public delegate void OnTransferDelegate(UInt160 from, UInt160 to, BigInteger amount, ByteString tokenId);

        [DisplayName("Transfer")]
        public static event OnTransferDelegate OnTransfer;
    
        // OwnershipTransferred(oldOwner, newOwner)
        public static event Action<UInt160, UInt160> OwnershipTransferred;
       
        public static event Action<byte[], Boolean> isUserBlocked;
        public static event Action<Boolean> isContractPaused;

        private static bool IsOwner() => Runtime.CheckWitness(GetOwner());

        [Safe]
        [DisplayName("name")]
        public static string TokenName() => "{{ContractName}}";

        [Safe]
        public string Symbol() => "{{ContractSymbol}}";

        [Safe]
        public byte Decimals() => 0;

        [Safe]
        public static BigInteger TotalSupply() => (BigInteger)Storage.Get(Storage.CurrentContext, new byte[] { prefixTotalSupply });

        [Safe]
        public static BigInteger BalanceOf(UInt160 owner)
        {
            if (owner is null || !owner.IsValid)
            {
                throw new Exception("The argument \"owner\" is invalid.");
            }

            StorageMap balanceMap = new(Storage.CurrentContext, prefixBalance);
            
            return (BigInteger)balanceMap[owner];
        }

        [Safe]
        public static UInt160 OwnerOf(ByteString tokenId)
        {
            StorageMap tokenMap = new(Storage.CurrentContext, prefixToken);
            var token = (TokenState)StdLib.Deserialize(tokenMap[tokenId]);
            
            return token.Owner;
        }

        [Safe]
        public Map<string, object> Properties(ByteString tokenId)
        {
            StorageMap tokenMap = new(Storage.CurrentContext, prefixToken);
            var token = (TokenState)StdLib.Deserialize(tokenMap[tokenId]);
            Map<string, object> map = new();
            map["name"] = token.Name;
            map["description"] = token.Description;
            map["uri"] = token.TokenURI;
            map["image"] = token.TokenURI;
            map["owner"] = token.Owner;
            map["creator"] = token.Creator;
            map["createdTime"] = token.CreatedTime;
            
            return map;
        }

        [Safe]
        public static Iterator Tokens()
        {
            StorageMap tokenMap = new(Storage.CurrentContext, prefixToken);
            
            return tokenMap.Find(FindOptions.KeysOnly | FindOptions.RemovePrefix);
        }

        [Safe]
        public static Iterator TokensOf(UInt160 owner)
        {
            if (owner is null || !owner.IsValid)
            {
                throw new Exception("The argument \"owner\" is invalid.");
            }

            StorageMap accountMap = new(Storage.CurrentContext, prefixAccountToken);
            
            return accountMap.Find(owner, FindOptions.KeysOnly | FindOptions.RemovePrefix);
        }

        public static bool Transfer(UInt160 to, ByteString tokenId, object data)
        {
            if (Paused())
            {
                throw new Exception("Contract has been paused.");
            }
            
            var tx = (Transaction)Runtime.ScriptContainer;

            if (IsBlocked(tx.Sender))
            {
                throw new Exception("User has been blocked.");
            }

            if (to is null || !to.IsValid)
            {
                throw new Exception("The argument \"to\" is invalid.");
            }

            StorageMap tokenMap = new(Storage.CurrentContext, prefixToken);
            var token = (TokenState)StdLib.Deserialize(tokenMap[tokenId]);
            var from = token.Owner;
            
            if (!Runtime.CheckWitness(from)) 
            {
                return false;
            }

            if (from != to)
            {
                token.Owner = to;
                tokenMap[tokenId] = StdLib.Serialize(token);
                UpdateBalance(from, tokenId, -1);
                UpdateBalance(to, tokenId, +1);
            }

            PostTransfer(from, to, tokenId, data);

            return true;
        }

        public static ByteString CreateToken(UInt160 to, string data) 
        {
            if (Paused())
            {
                throw new Exception("Contract has been paused.");
            }
            
            var tx = (Transaction)Runtime.ScriptContainer;

            if (IsBlocked(tx.Sender))
            {
                throw new Exception("User has been blocked.");
            }

            Map<string, string> customData = (Map<string, string>)StdLib.JsonDeserialize(data);
            var tokenId = NewTokenId();
            
            Mint(tokenId, new TokenState
            {
                Name = customData["name"],
                Owner = to,
                Creator = tx.Sender,
                TokenURI = customData["uri"],
                Description = customData["desc"],
                CreatedTime = Runtime.Time
            });
            
            return tokenId;
        }

        public static ByteString[] CreateBatchTokens(UInt160[] receivers, string[] data)
        {
            if (receivers.Length != data.Length)
            {
                throw new Exception("Recievers array size is not equal data array size.");
            }
            
            List<ByteString> tokenIds = new();

            for (int i = 0; i < data.Length; i++)
            {
                tokenIds.Add(CreateToken(receivers[i], data[i]));
            }
            
            return tokenIds;
        }

        public static bool BatchTransfer(UInt160[] receivers, ByteString[] tokenIds) {
            if (receivers.Length != tokenIds.Length)
            {
                throw new Exception("Recievers array size is not equal data array size.");
            }

            for (int i = 0; i < tokenIds.Length; i++)
            {
                Transfer(receivers[i], tokenIds[i], String.Empty);
            }

            return true;
        }

        [Safe]
        public static UInt160 GetOwner()
        {
            return (UInt160)ContractMap.Get(ownerKey);
        }

        public static bool TransferOwnership(UInt160 newOwner)
        {
            if (!newOwner.IsValid)
            {
                throw new Exception("The new owner address is invalid.");
            }

            if (!IsOwner())
            {
                throw new Exception("Caller is not the owner.");
            }

            Transaction tx = (Transaction)Runtime.ScriptContainer;
            OwnershipTransferred(tx.Sender, newOwner);
            ContractMap.Put(ownerKey, newOwner);

            return true;
        }

        [DisplayName("block")]
        public static bool Block(byte[] userAddress)
        {
            if (!IsOwner())
            {
                throw new InvalidOperationException("Caller is not the owner.");
            }

            BlocklistMap.Put(userAddress, trueInByteString);
            isUserBlocked(userAddress, true);
            return true;
        }

        [DisplayName("unblock")]
        public static bool UnBlock(byte[] userAddress)
        {
            if (!IsOwner())
            {
                throw new InvalidOperationException("Caller is not the owner.");
            }

            BlocklistMap.Delete(userAddress);
            isUserBlocked(userAddress, false);

            return true;
        }

        [Safe]
        [DisplayName("isblocked")]
        public static bool IsBlocked(UInt160 userAddress)
        {
            var blocked = BlocklistMap.Get((byte[])userAddress);

            return blocked == trueInByteString;
        }

        [DisplayName("pause")]
        public static bool Pause()
        {
            if (!IsOwner())
            {
                throw new InvalidOperationException("Caller is not the owner.");
            }

            ContractMap.Put(pausedKey, trueInByteString);
            isContractPaused(true);

            return true;
        }

        [DisplayName("unpause")]
        public static bool Unpause()
        {
            if (!IsOwner())
            {
                throw new InvalidOperationException("Caller is not the owner.");
            }

            ContractMap.Delete(pausedKey);
            isContractPaused(false);

            return true;
        }

        [Safe]
        [DisplayName("paused")]
        public static bool Paused()
        {
            var paused = ContractMap.Get(pausedKey);

            return paused == trueInByteString;
        }

        [DisplayName("_deploy")]
        public static void Deploy(object data, bool update)
        {
            if (update)
            {
                return;
            }

            var tx = (Transaction)Runtime.ScriptContainer;
            ContractMap.Put(ownerKey, tx.Sender);

            if (data is not null) {
                Map<string, string> customData = (Map<string, string>)data;
                if (customData["to"] is not null &&
                    customData["uri"] is not null &&
                    customData["name"] is not null &&
                    customData["desc"] is not null) {
                    var owner = (UInt160)(ByteString)customData["to"];
                    
                    Mint(NewTokenId(), new TokenState
                    {
                        Owner = owner,
                        Creator = tx.Sender,
                        Name = customData["name"],
                        TokenURI = customData["uri"],
                        Description = customData["desc"],
                        CreatedTime = Runtime.Time
                    });
                } else {
                    throw new InvalidOperationException("Insufficient NFT creation payload data");
                }
            }
        }

        public static bool Update(ByteString nefFile, string manifest, object data = null)
        {
            if (!IsOwner())
            {
                throw new InvalidOperationException("Caller is not the owner.");
            }

            ContractManagement.Update(nefFile, manifest, data);

            return true;
        }

         private static ByteString NewTokenId()
        {
            var context = Storage.CurrentContext;
            byte[] key = new byte[] { prefixTokenId };
            var id = Storage.Get(context, key);
            Storage.Put(context, key, (BigInteger)id + 1);
            ByteString data = Runtime.ExecutingScriptHash;
            if (id is not null) data += id;

            return CryptoLib.Sha256(data);
        }

        private static void Mint(ByteString tokenId, TokenState token)
        {
            StorageMap tokenMap = new(Storage.CurrentContext, prefixToken);
            tokenMap[tokenId] = StdLib.Serialize(token);
            UpdateBalance(token.Owner, tokenId, +1);
            UpdateTotalSupply(+1);
            PostTransfer(null, token.Owner, tokenId, null);
        }

        private static void UpdateBalance(UInt160 owner, ByteString tokenId, int increment)
        {
            UpdateBalance(owner, increment);
            StorageMap accountMap = new(Storage.CurrentContext, prefixAccountToken);
            var key = owner + tokenId;

            if (increment > 0) 
            {
                accountMap.Put(key, 0);
            } else {
                accountMap.Delete(key);
            }
        }

        private static void PostTransfer(UInt160 from, UInt160 to, ByteString tokenId, object data)
        {
            OnTransfer(from, to, 1, tokenId);

            if (to is not null && ContractManagement.GetContract(to) is not null) {
                Contract.Call(to, "onNEP11Payment", CallFlags.All, from, 1, tokenId, data);
            }
        }

        private static void UpdateTotalSupply(BigInteger increment)
        {
            var context = Storage.CurrentContext;
            byte[] key = new byte[] { prefixTotalSupply };
            var totalSupply = (BigInteger)Storage.Get(context, key);
            totalSupply += increment;
            Storage.Put(context, key, totalSupply);
        }

        private static bool UpdateBalance(UInt160 owner, BigInteger increment)
        {
            StorageMap balanceMap = new(Storage.CurrentContext, prefixBalance);
            BigInteger balance = (BigInteger)balanceMap[owner];
            balance += increment;
            
            if (balance < 0)
            {
                return false;
            }
            
            if (balance.IsZero)
            {
                balanceMap.Delete(owner);
            } else {
                balanceMap.Put(owner, balance);
            }

            return true;
        }

    }
}

