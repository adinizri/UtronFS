import { Button } from "antd";
import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement(document.getElementById("root"));

export default function TradeModal(props) {
  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={props.openModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel='Trade Modal'>
        <h2>Trade ticket</h2>
        <div>
          you can't park using your ticket but we can offer you to trade your
          ticket
        </div>
        <div>
          {props.tickets.map((ticket) => {
            return (
              <Button
                key={ticket.type}
                onClick={() => {
                  props.handleTrade(ticket.type);
                }}>
                {`${ticket.type} ticket for ${
                  ticket.price - props.paidTicketPrice
                }$`}
              </Button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
