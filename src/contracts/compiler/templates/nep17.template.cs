using System;
using System.Numerics;
using System.ComponentModel;
using Neo;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Native;
using Neo.SmartContract.Framework.Services;
using Neo.SmartContract.Framework.Attributes;

namespace Dvita.SC.CaaS
{
    public abstract class NXATokenContract : Neo.SmartContract.Framework.SmartContract
    {
        protected const byte Prefix_TotalSupply = 0x00;
        protected const byte Prefix_Balance = 0x01;

        [Safe]
        public static BigInteger TotalSupply() => (BigInteger)Storage.Get(Storage.CurrentContext, new byte[] { Prefix_TotalSupply });

        [Safe]
        public static BigInteger BalanceOf(UInt160 owner)
        {
            if (owner is null || !owner.IsValid)
                throw new Exception("BalanceOf: The argument 'owner' is invalid.");
            StorageMap balanceMap = new(Storage.CurrentContext, Prefix_Balance);
            return (BigInteger)balanceMap[owner];
        }

        protected static void UpdateTotalSupply(BigInteger increment)
        {
            StorageContext context = Storage.CurrentContext;
            byte[] key = new byte[] { Prefix_TotalSupply };
            BigInteger totalSupply = (BigInteger)Storage.Get(context, key);
            totalSupply += increment;
            Storage.Put(context, key, totalSupply);
        }

        protected static bool UpdateBalance(UInt160 owner, BigInteger increment)
        {
            StorageMap balanceMap = new(Storage.CurrentContext, Prefix_Balance);
            BigInteger balance = (BigInteger)balanceMap[owner];
            balance += increment;
            if (balance < 0) return false;
            if (balance.IsZero)
                balanceMap.Delete(owner);
            else
                balanceMap.Put(owner, balance);
            return true;
        }
    }

    [SupportedStandards("NEP-17")]
    [ContractPermission("*", "onNEP17Payment")]
    public abstract class NXANep17Token : NXATokenContract
    {
        public delegate void OnTransferDelegate(UInt160 from, UInt160 to, BigInteger amount);

        [DisplayName("Transfer")]
        public static event OnTransferDelegate OnTransfer;

        public static bool Transfer(UInt160 from, UInt160 to, BigInteger amount, object data)
        {
            if (from is null || !from.IsValid)
                throw new Exception("Transfer: The argument 'from' is invalid.");
            if (to is null || !to.IsValid)
                throw new Exception("Transfer: The argument 'to' is invalid.");
            if (amount < 0)
                throw new Exception("Transfer: The amount must be a positive number.");
            //if (!Runtime.CheckWitness(from)) return false;
            if (amount != 0)
            {
                if (!UpdateBalance(from, -amount))
                    return false;
                UpdateBalance(to, +amount);
            }
            PostTransfer(from, to, amount, data);
            return true;
        }

        protected static void MintImpl(UInt160 account, BigInteger amount)
        {
            if (amount.Sign < 0) throw new ArgumentOutOfRangeException(nameof(amount));
            if (amount.IsZero) return;
            UpdateBalance(account, +amount);
            UpdateTotalSupply(+amount);
            PostTransfer(null, account, amount, null);
        }

        protected static void BurnImpl(UInt160 account, BigInteger amount)
        {
            if (amount.Sign < 0) throw new ArgumentOutOfRangeException(nameof(amount));
            if (amount.IsZero) return;
            if (!UpdateBalance(account, -amount))
                throw new InvalidOperationException();
            UpdateTotalSupply(-amount);
            PostTransfer(account, null, amount, null);
        }

        protected static void PostTransfer(UInt160 from, UInt160 to, BigInteger amount, object data)
        {
            OnTransfer(from, to, amount);
            if (to is not null && ContractManagement.GetContract(to) is not null)
                Contract.Call(to, "onNEP17Payment", CallFlags.All, from, amount, data);
        }
    }

    [ManifestExtra("Author", "{{ContractAuthorName}}")]
    [ManifestExtra("Email", "{{ContractAuthorEmail}}")]
    [ManifestExtra("Description", "{{ContractDescription}}")]
    [ManifestExtra("Version", "1.0")]
    [SupportedStandards("NEP-17")]
    [ContractPermission("*", "onNEP17Payment")]
    public partial class {{ContractName}}Token : NXANep17Token
    {
        [InitialValue("{{ContractAuthorAddress}}", ContractParameterType.Hash160)]
        private static readonly UInt160 owner = default;
        [InitialValue("{{SystemOwnerAddress}}", ContractParameterType.Hash160)]
        private static readonly UInt160 deployer = default;

        private const byte Prefix_Contract = 0x02;
        public static readonly StorageMap ContractMap = new StorageMap(Storage.CurrentContext, Prefix_Contract);
        
        private static BigInteger InitialCoins => {{ContractInitialCoins}};
        private static readonly BigInteger Factor = BigInteger.Pow(10, Decimals());

        [Safe]
        [DisplayName("name")]
        public static string TokenName() => "{{ContractName}}";

        [Safe]
        [DisplayName("symbol")]
        public static string Symbol() => "{{ContractSymbol}}";

        [Safe]
        [DisplayName("decimals")]
        public static byte Decimals() => {{ContractDecimals}};
        
        public static void _deploy(object data, bool update)
        {
            if (update) return;
            if (InitialCoins > 0) {
                var scaledCoins = InitialCoins * Factor;
                Mint(owner, scaledCoins);
            }
        }

        public static new void Mint(UInt160 account, BigInteger amount)
        {
            //if (!IsOwner()) throw new InvalidOperationException($"Mint: No Authorization");
            MintImpl(account, amount);
        }

        public static new void Burn(UInt160 account, BigInteger amount)
        {
            //if (!IsOwner()) throw new InvalidOperationException($"Burn: No Authorization");
            BurnImpl(account, amount);
        }

        public static bool Update(ByteString nefFile, string manifest)
        {
            //if (!IsOwner()) throw new InvalidOperationException($"Update: No Authorization");
            ContractManagement.Update(nefFile, manifest, null);
            return true;
        }

        public static bool Destroy()
        {
            //if (!IsOwner()) throw new InvalidOperationException($"Destroy: No Authorization");
            ContractManagement.Destroy();
            return true;
        }

        private static bool IsOwner() {
            return Runtime.CheckWitness(owner) || Runtime.CheckWitness(deployer);
        }
    }
}
