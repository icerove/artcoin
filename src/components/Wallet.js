import React, {useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import { formatNearAmount } from "near-api-js/lib/utils/format";

const Account = ({contract, accountId, ausdContract}) => {

    const [assetB, setAssetB] = useState({'aNEAR':'0', 'aBTC':'0', 'aGOLD':'0', 'aSPY':'0', 'aEUR':'0'})

    const loadAssetBalance = async (a) => {
        return await contract.get_asset_balance({account_id: accountId, asset: a})
    }

    const [aUSDBalnce, setAusdBalance] = useState('')

    const loadAUSDBalance = () => {
        ausdContract.get_balance({owner_id: accountId})
        .then((ausd) => setAusdBalance(ausd))
    }

    useEffect(() => {
        async function loadBalance() {
            let aBTC = await loadAssetBalance('aBTC')
            let aNEAR = await loadAssetBalance('aNEAR')
            let aGOLD = await loadAssetBalance('aGOLD')
            let aSPY = await loadAssetBalance('aSPY')
            let aEUR =await loadAssetBalance('aEUR')
            setAssetB({aBTC, aNEAR, aGOLD, aSPY, aEUR})
        }
        loadAUSDBalance()
        loadBalance()
    }, [])
    
    return <div className="trade-card">
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Token</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>0</th>
                <td>aUSD</td>
                <td>{formatNearAmount(aUSDBalnce,5)}</td>
            </tr>
            <tr>
                <th>1</th>
                <td>aBTC</td>
                <td>{formatNearAmount(assetB['aBTC'], 5)}</td>
            </tr>
            <tr>
                <th>2</th>
                <td>aNEAR</td>
                <td>{assetB['aNEAR']}</td>
            </tr>
            <tr>
                <th>3</th>
                <td>aGOLD</td>
                <td>{formatNearAmount(assetB['aGOLD'],5)}</td>
            </tr>            
            <tr>
                <th>4</th>
                <td>aEUR</td>
                <td>{formatNearAmount(assetB['aEUR'],5)}</td>
            </tr>
            <tr>
                <th>5</th>
                <td>aSPY</td>
                <td>{formatNearAmount(assetB['aSPY'],5)}</td>
            </tr>
        </tbody>
    </Table>
    </div>
}

export default Account

