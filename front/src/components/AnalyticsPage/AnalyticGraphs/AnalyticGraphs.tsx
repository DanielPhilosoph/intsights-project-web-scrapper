import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BarSentiment from "./BarSentiment/BarSentiment";
import BarUploadPost from "./BarUploadPosts/BarUploadPosts";
import "./analyticGraphs.css";
import BarSentimentTotal from "./BarSentimentTotal/BarSentimentTotal";
import CakeSection from "./CakeSection/CakeSection";

export default function AnalyticGraphs() {
  const [dateForStatistic, setDateForStatistic] = useState(new Date());
  const date = useRef<HTMLInputElement>(null);

  const onDateSelected = () => {
    if (date && date.current instanceof HTMLInputElement) {
      setDateForStatistic(new Date(date.current.value));
    }
  };

  return (
    <Container>
      <Row>
        <div>
          <span>Choose date: </span>
          <input
            className="dateInputAnalytics"
            type="date"
            ref={date}
            onChange={onDateSelected}
          />
        </div>
        <Col>
          <BarUploadPost date={dateForStatistic} />
        </Col>
        <Col>
          <BarSentiment date={dateForStatistic} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BarSentimentTotal />
        </Col>
        <Col>
          <CakeSection />
        </Col>
      </Row>
    </Container>
  );
}

//
