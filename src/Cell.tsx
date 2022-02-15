import React from 'react';
import PropTypes from 'prop-types';
import { ICellComponent } from './types/ICell';

function Cell({
  value, index, prefilled, handleSetTable, isInError,
}: ICellComponent) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    // Restore cell to empty state.
    if (input === '') {
      handleSetTable(index, 0);
      return;
    }

    if (/[1-9]/.test(input)) {
      handleSetTable(index, parseInt(input, 10));
    }
  };

  const displayValue = (value !== 0) ? value.toString() : '';

  const buttonStyle = {
    backgroundColor: isInError ? '#FF0000' : 'transparent',
  };

  const cellElement = prefilled ? (<div>{value}</div>)
    : (
      <input
        id={index.toString()}
        className="shadow border rounded"
        maxLength={1}
        onChange={onChange}
        value={displayValue}
        style={buttonStyle}
      />
    );
  return (
    <>
      {cellElement}
    </>
  );
}

Cell.defaultProps = {
  value: 0,
  index: 0,
  prefilled: false,
  handleSetTable: () => { },
};

Cell.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  prefilled: PropTypes.bool,
  handleSetTable: PropTypes.func,
};

export default Cell;
