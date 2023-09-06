import { Card, Col, Row } from "antd";
import "./CardGrid.css";
const CardGrid = (props) => {
  return (
    <Row gutter={16}>
      {props.data.map((item, index) => (
        <Col
          span={4}
          key={index}>
          <Card className='vehicle-card'>
            {Object.keys(item).map((key) => (
              <div key={key}>
                <strong>{key}:</strong> {item[key]}
              </div>
            ))}
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default CardGrid;
