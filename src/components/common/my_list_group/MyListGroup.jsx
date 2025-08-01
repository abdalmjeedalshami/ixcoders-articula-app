import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import "./MyListGroup.css"

const ItemList = () => {
  const items = [
    'Nulla tempor odio ut fringilla',
    'Donec malesuada',
    'Quisque',
    'Toquam, in accumsan',
    'Ut sed orci',
    'Nullam non ante',
    'Phasellus',
    'Etiam eu libero elementum',
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ListGroup>
      {items.map((item, index) => (
        <ListGroup.Item
          key={index}
          active={index === activeIndex}
          onClick={() => setActiveIndex(index)}
          style={{ cursor: 'pointer' }}
        >
          {item}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ItemList;
