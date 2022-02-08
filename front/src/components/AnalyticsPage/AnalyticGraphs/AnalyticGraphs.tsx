import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BarSentiment from "./BarSentiment/BarSentiment";
import BarUploadPost from "./BarUploadPosts/BarUploadPosts";
import "./analyticGraphs.css";

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
    </Container>
  );
}

//
