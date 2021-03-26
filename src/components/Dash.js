import React from 'react'

const Dash = ({contract, accountId}) => {

    return <div className="">
        <h3> aUSD, the first decentralized native stable coin on NEAR and a defi asset exchange like Synthetix, that can trade virtual assets like BTC, Gold, EUR and S&P500 Index </h3>
        <ul>
            <li>
                It's the first decentralized native stable coin on NEAR (Please correct me if i'm wrong). Decentralized means is not backed by a central reserve of USD like USDT or USDC. Instead, it's backed by all ART token stakers. Native means is contract built on NEAR, not ethereum contract bridged to NEAR
            </li>
            <li>
                It has defi staking, that allows defi farmers to lock, stake ART and earn more staking reward than NEAR in theoretical case, because ART gives a similar inflation as NEAR, but when you stake you can mint some aUSD, and you can sell or invest aUSD and this part is additional to NEAR staking.
            </li>
            <li>
            It provide a zero-slip, infinite liquidity and instantly exchange between any kind of cryptocurrency, commodity, stock and foreign currency. There's a few available on testnet to proof of concept, and more assets will be available soon. Thanks to NEAR's high efficiency and performance, ART only takes seconds to finish any exchange and almost neglectable transaction fee. Unlike Synthetix, exchange transaction is delayed many minutes or hours due to Ethereum's nature. And both transaction delay and tens of dollars transaction fee make trading impractical and unprofitable
            </li>
        </ul>
    </div>
}

export default Dash

