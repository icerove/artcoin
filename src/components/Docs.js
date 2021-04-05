const Doc = () => (
    <div>
    <h2 marginBottom="100px">Welcome to ARTIFICIAL EXCHANGE!</h2>
        {/* <ul style={{ textAlign: 'left' }}> */}
        <h4>Getting Started</h4>
    <p className="left">If you want staking art, start with "Buy art with NEAR token"
    For every $5 value of art staked, you will mint 1 aUSD. In reverse, after burning 1 aUSD, you will get $5 value of art back.
    In future, staking reward and governance will be enabled for art stakers.
    </p>
    <p className="left">If you just want trading with stable coin, start with "Buy aUSD with NEAR token"
    </p>
        {/* </ul> */}

        <h4>Features of ARTIFICIAL EXCHANGE</h4>
        <p className="left">
            It's the first decentralized native stable coin on NEAR. Decentralized means is not backed by a central reserve of USD like USDT or USDC. Instead, it's backed by all art token stakers. Native means is contract built on NEAR, not ethereum contract bridged to NEAR

        </p>
        <p className="left">
            (Not yet enabled) art token defi staking, that allows defi farmers to lock, stake art and earn more staking reward than NEAR in theoretical case, because art gives a similar inflation as NEAR, but when you stake you can mint some aUSD, and you can sell or invest aUSD and this part is additional to NEAR staking.

        </p>
        <p className="left">
            Zero-slip, infinite liquidity and instantly exchange between any kind of cryptocurrency, commodity, stock and foreign currency. There's a few available on testnet to proof of concept, and more assets will be available soon. Thanks to NEAR's high efficiency and performance, art only takes seconds to finish any exchange and almost neglectable transaction fee. Unlike Synthetix, exchange transaction is delayed many minutes or hours due to Ethereum's nature. Both transaction delay and tens of dollars transaction fee make trading impractical and unprofitable
        </p>
        </div>
)

export default Doc