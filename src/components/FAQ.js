
const FAQ = () => (
    <div style={{ textAlign: 'left' }}>
        <h5>Q: What is the liquidation point? </h5>
        <p>A: From entering/exiting the system, total artificial assets in liquid is 20% of usd value of total ART staked. Within the system between artificial asset liquidity is infinite.</p>
        <h5>Q: What is trading fee? </h5>
        <p>A: None, as of now, plan is 0.1%-0.3%, votable and given to ART stakers</p>
        <h5>Q: What is the tokenomics for staking? </h5>
        <p>A: It's not yet enabled: but this week is going to add a staking reward from inflation. Assume when ART price in NEAR is relative stable, this staking reward is also similar to stake NEAR, but, because you can mint 20% of aUSD while you stake and get staking reward, and sell these aUSD immediately, this equivalent to you stake 80% amount of NEAR and get reward as if you stake 100%</p>    
        <h5>Q: I cannot see my portolio CDP ratio </h5>
        <p>A: We're working in process to add it</p>
        <h5>Q: Where is asset price from?</h5>
        <p>A: Some prices are from chainlink oracle, however, which does not has NEAR price and SPY price, which are getting from a centralized oracle as a temp solution, which fetch price from Coingecko and Yahoo Finance. ART is only on testnet and doesn't have a real value. So ART price is simulated.</p>
        <h5>Q: But if oracle is centralized, the entire ARTIFICIAL EXCHANGE is not decentralized</h5>
        <p>A: Yes, so a decentralized oracle system is work in progress, once done, allow ART stakers to submit price and only when majority stakes submit less than 0.5% difference in price will the price been updated</p>
        <h5>Q: Where/how do I add margin?</h5>
        <p>A: Advantage of ART system design is there's no margin, you'll instantly exchange for the rate showing. If you'd like a limit order instead of market order that's not in a short term plan, because this design doesn't have an order book, therefore no place to put limit order</p>
        <h5>Q: Fixed $5 of ART to mint $1 sUSD sounds not very friendly</h5>
        <p>A: A fixed rate is quite common approach as in DAI and Synthetix; You may feel 20% is too low, but in actually have to be conservative on this to ensure stability of aUSD. For example, Synthetix use even a higher number: stake 7.5$ of SNX to mint 1 sUSD</p>
        <h5>More Questions? <a href="https://github.com/icerove/artcoin/issues/new">Submit an issue!</a></h5>
    </div>
)

export default FAQ