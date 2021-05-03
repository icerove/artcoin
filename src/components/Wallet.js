import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { formatNearAmount } from "near-api-js/lib/utils/format";
import tokenIcon from "./tokenIcon";

import { coinList, initialState_zero } from "./State/state";

const Account = ({ contract, accountId, ausdContract }) => {
  const _coinList = coinList.filter((coin) => coin !== "art");

  const [assetB, setAssetB] = useState(initialState_zero);

  const loadAssetBalance = async (a) => {
    return await contract.get_asset_balance({
      account_id: accountId,
      asset: a,
    });
  };

  const [aUSDBalnce, setAusdBalance] = useState("");

  const loadAUSDBalance = () => {
    ausdContract
      .get_balance({ owner_id: accountId })
      .then((ausd) => setAusdBalance(ausd));
  };

  useEffect(() => {
    async function loadBalance() {
      let asset = initialState_zero;

      for (const p in asset) {
        let ass = await loadAssetBalance(p);
        console.log(ass);
        asset[p] = ass;
      }

      setAssetB(asset);
    }
    loadAUSDBalance();
    loadBalance();
  }, []);

  const Tr = ({ asset, index }) => (
    <tr>
      <th>{index + 1}</th>
      <td>
        <img src={tokenIcon[asset]} alt="icon" className="icon" />
        {asset}
      </td>
      <td>{formatNearAmount(assetB[asset], 5)}</td>
    </tr>
  );

  return (
    <div className="trade-card">
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
            <td>
              <img src={tokenIcon.aUSD} alt="icon" className="icon" />
              aUSD
            </td>
            <td>{formatNearAmount(aUSDBalnce, 5)}</td>
          </tr>
          {_coinList.map((coin, index) => (
            <Tr asset={coin} index={index} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Account;
