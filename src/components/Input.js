import React, { useState } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Input() {
  const [data, setData] = useState({
    Power: "",
    TimeHorizon: "",
    Price: "",
    TotalUsers: "383",
    UsersSpendingPower: "",
    AveragePowerSpentByUsers: "",
  });

  function changedataInfo(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  // variables
  const totalPower = data.TotalUsers * 1000;
  const globalPowerRegen = 5 / 3;
  const powerCap = totalPower / data.TotalUsers;
  const staticMiningEfficiency = 0.75;
  const powerToNineum = data.Power / 200;

  // formulas
  const totalAvailablePower = Math.round(
    globalPowerRegen * (data.TimeHorizon * 1440)
  );
  const minedNineumTotal = Math.round(
    totalAvailablePower * staticMiningEfficiency * powerToNineum
  );
  const earnedNineumCalc =
    ((data.UsersSpendingPower * (data.AveragePowerSpentByUsers - 200)) / 200) *
    data.TimeHorizon;
  // no negative values for earned nineum
  const earnedNineum = earnedNineumCalc < 0 ? 0 : earnedNineumCalc;
  const totalNineum = minedNineumTotal + earnedNineum;

  // nineum rarity probability
  const commonProb = 0.272;
  const nineProb = 0.243;
  const uncommonProb = 0.205;
  const rareProb = 0.15;
  const epicProb = 0.084;
  const legendaryProb = 0.038;
  const mythicalProb = 0.008;

  // nineum rarity distribution
  const common = Math.round(commonProb * totalNineum);
  const nine = Math.round(nineProb * totalNineum);
  const uncommon = Math.round(uncommonProb * totalNineum);
  const rare = Math.round(rareProb * totalNineum);
  const epic = Math.round(epicProb * totalNineum);
  const legendary = Math.round(legendaryProb * totalNineum);
  const mythical = Math.round(mythicalProb * totalNineum);

  // odds liklihood common/x
  const commonOdds = commonProb / (1 - commonProb);
  const nineOdds = nineProb / (1 - nineProb);
  const uncommonOdds = uncommonProb / (1 - uncommonProb);
  const rareOdds = rareProb / (1 - rareProb);
  const epicOdds = epicProb / (1 - epicProb);
  const legendaryOdds = legendaryProb / (1 - legendaryProb);
  const mythicalOdds = mythicalProb / (1 - mythicalProb);

  // nineum value by rarity
  // currently this is value where the value of a common nineum is equal to the price of nineum.
  const commonValue = (data.Price * (commonOdds / commonOdds)).toFixed(2);
  const nineValue = (data.Price * (commonOdds / nineOdds)).toFixed(2);
  const uncommonValue = (data.Price * (commonOdds / uncommonOdds)).toFixed(2);
  const rareValue = (data.Price * (commonOdds / rareOdds)).toFixed(2);
  const epicValue = (data.Price * (commonOdds / epicOdds)).toFixed(2);
  const legendaryValue = (data.Price * (commonOdds / legendaryOdds)).toFixed(2);
  const mythicalValue = (data.Price * (commonOdds / mythicalOdds)).toFixed(2);

  // Total $ earned by rarity
  const commonEarned = parseFloat((commonValue * common).toFixed(2));
  const nineEarned = parseFloat((nineValue * nine).toFixed(2));
  const uncommonEarned = parseFloat((uncommonValue * uncommon).toFixed(2));
  const rareEarned = parseFloat((rareValue * rare).toFixed(2));
  const epicEarned = parseFloat((epicValue * epic).toFixed(2));
  const legendaryEarned = parseFloat((legendaryValue * legendary).toFixed(2));
  const mythicalEarned = parseFloat((mythicalValue * mythical).toFixed(2));

  // Total Earned
  const totalEarned = (
    commonEarned +
      nineEarned +
      uncommonEarned +
      rareEarned +
      epicEarned +
      legendaryEarned +
      mythicalEarned
  )

  return (
    <Container style={{ color: "aqua", fontFamily: "Orbitron" }}>
      <Row>
        <Col>
          <h2>Please Input Values</h2>
          {/* This functionality is currently disabled */}
          {/* <p>
            <label>Power spent :</label>
            <br />
            <input
              type="number"
              name="Power"
              value={data.Power}
              step="200"
              min="0"
              onChange={changedataInfo}
              id="power"
            ></input>
          </p> */}
          <p>
            <label>Time Horizon (in days):</label>
            <br />
            <input
              type="number"
              name="TimeHorizon"
              value={data.TimeHorizon}
              min="0"
              onChange={changedataInfo}
            ></input>
          </p>
          <p>
            <label>Price for one common :</label>
            <br />
            <input
              type="number"
              name="Price"
              value={data.Price}
              min="0"
              onChange={changedataInfo}
            ></input>
          </p>
          <p>
            <label>Total Users :</label>
            <br />
            <input
              type="number"
              name="TotalUsers"
              value={data.TotalUsers}
              onChange={changedataInfo}
              placeholder="383"
              min="383"
            ></input>
          </p>
          <p>
            <label>Users Spending Power :</label>
            <br />
            <input
              type="number"
              name="UsersSpendingPower"
              value={data.UsersSpendingPower}
              onChange={changedataInfo}
            ></input>
          </p>
          <p>
            <label>Average Power Spent by Users (per day):</label>
            <br />
            <input
              type="number"
              name="AveragePowerSpentByUsers"
              value={data.AveragePowerSpentByUsers}
              step="100"
              onChange={changedataInfo}
            ></input>
          </p>
        </Col>
        <Col>
          <h2>Calculated Results</h2>
          <p>Power Cap: {powerCap}</p>
          <p>Total Available Power: {totalAvailablePower}</p>
          {/* <p>Mined Nineum Total: {minedNineumTotal}</p> */}
          <p>Earned Nineum: {earnedNineum}</p>
          <p>Total Nineum: {totalNineum}</p>
          {/* 
          <p>Power to Nineum Ratio: {powerToNineum}</p> */}
          <p>Total Power: {totalPower}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Rarity Distribution</h1>

          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th></th>
                <th>Common</th>
                <th>Nine</th>
                <th>Uncommon</th>
                <th>Rare</th>
                <th>Epic</th>
                <th>Legendary</th>
                <th>Mythical</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nineum Earned</td>
                <td>{common}</td>
                <td>{nine}</td>
                <td>{uncommon}</td>
                <td>{rare}</td>
                <td>{epic}</td>
                <td>{legendary}</td>
                <td>{mythical}</td>
              </tr>
              <tr>
                <td>Value Per Nineum</td>
                <td>{commonValue}</td>
                <td>{nineValue}</td>
                <td>{uncommonValue}</td>
                <td>{rareValue}</td>
                <td>{epicValue}</td>
                <td>{legendaryValue}</td>
                <td>{mythicalValue}</td>
              </tr>
              <tr>
                <td>Total Value</td>
                <td>{commonEarned}</td>
                <td>{nineEarned}</td>
                <td>{uncommonEarned}</td>
                <td>{rareEarned}</td>
                <td>{epicEarned}</td>
                <td>{legendaryEarned}</td>
                <td>{mythicalEarned}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Total Earned: ${totalEarned}</h1>
        </Col>
      </Row>
    </Container>
  );
}
