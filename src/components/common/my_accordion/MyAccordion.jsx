import Accordion from "react-bootstrap/Accordion";
import { BsArrowDownShort } from "react-icons/bs";
const focusColor = "#1D2026";
import "./myAccordion.css";

function MyAccordion({ list }) {
  return (
    <Accordion defaultActiveKey="0">
      {list.map((item, index) => (
        <Accordion.Item
          key={index}
          eventKey={index}
          className="mb-4 border rounded-0 custom-item"
        >
          <Accordion.Header>
            {item.title}
            <BsArrowDownShort className="custom-icon" />
          </Accordion.Header>
          <Accordion.Body dangerouslySetInnerHTML={{ __html: item.body }} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default MyAccordion;
