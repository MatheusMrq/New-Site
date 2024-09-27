import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DateRangePicker.css';

function DateRangePicker({ saveDateRange, closeModal }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSave = () => {
    if (startDate && endDate) {
      const rangeData = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
      saveDateRange(rangeData);
      closeModal();
    } else {
      alert("Por favor, selecione um intervalo de datas válido.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Selecione a Data</h2>
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          dateFormat="yyyy/MM/dd"
        />
        <button className="save-button" onClick={handleSave}>Salvar</button>
        <button className="cancel-button" onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
}

export default DateRangePicker;
