import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getAllDeals } from "./requests";
import Card from "react-bootstrap/Card";
import "./ResultsPage.css";
function ResultsPage({ match: { params } }) {
  const [deals, setDeals] = useState([]);
  const [name, setName] = useState("");
  const [initialized, setInitialized] = useState(false);
  const getDeals = async () => {
    const id = params.id;
    const response = await getAllDeals(id);
    setDeals(response.data.content);
    setName(response.data.name);
  };
  useEffect(() => {
    if (!initialized) {
      getDeals();
      setInitialized(true);
    }
  });
  return (
    <div className="results-page">
      <h1 className="center">Deals Results: {name}</h1>
      {deals.map((d, i) => {
        return (
          <Card key={i}>
            <Card.Title className="title">{d.dealer}</Card.Title>
            <Card.Body>
              {d.title}
              <br />
              <a className="btn btn-primary" href={d.link}>
                Go
              </a>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
export default withRouter(ResultsPage);