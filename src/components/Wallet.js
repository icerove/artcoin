import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import tokenIcon from "./utils/tokenIcon";
import { formatNearWithDecimal } from "./utils/format";

import { coinList, initialState_zero_balance } from "./State/state";

const Account = ({ contract, accountId, ausdContract }) => {
  const _coinList = coinList.filter((coin) => coin !== "art");

  const [assetB, setAssetB] = useState(initialState_zero_balance);
  const [assetLoading, setLoading] = useState(false);

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
      let asset = initialState_zero_balance;

      for (const p in asset) {
        let ass = await loadAssetBalance(p);
        asset[p] = ass;
      }

      setAssetB(asset);
      setLoading(false);
    }
    setLoading(true);
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
      <td>
        {assetLoading ? (
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">...</span>
          </Spinner>
        ) : (
          formatNearWithDecimal(assetB[asset])
        )}
      </td>
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
            <td>{formatNearWithDecimal(aUSDBalnce)}</td>
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
