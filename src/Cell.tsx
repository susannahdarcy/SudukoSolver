import React from 'react';
import PropTypes from 'prop-types';
import ICell from './types/ICell';

function Cell({
  value, index, prefilled, handleSetTable,
}: ICell) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/[1-9]/.test(event.currentTarget.value)) {
      handleSetTable?.(index, +(event.target.value));
    } else if (value !== 0) {
      // Restore cell to empty state.
      handleSetTable?.(index, +(0));
    }
  };

  const getStateValue = () => {
    if (value !== 0) {
      return value.toString();
    }
    return '';
  };

  const cellElement = prefilled ? (<div>{value}</div>)
    : (
      <input
        className="shadow border rounded"
        maxLength={1}
        onChange={onChange}
        value={getStateValue() || ''}
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
