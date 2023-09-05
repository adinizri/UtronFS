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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(props.openModal);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Trade Modal'>
        <h2>Trade ticket</h2>
        <div>
          you can't park using your ticket but we can offer you to trade your
          ticket
        </div>
        <div>
          {props.tickets.map((ticket) => {
            // let text = `${ticket.type} ticket for ${
            //   ticket.Price - props.paidTicketPrice
            // }$`;

            return (
              <Button
                key={ticket.type}
                // onClick={() => {
                //   props.handleTicketTypeTrade();
                //   props.insertVehicle();
                // }}
              >
                {ticket.type}
              </Button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
