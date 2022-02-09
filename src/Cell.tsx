import React from 'react';
import PropTypes from 'prop-types';
import ICell from './types/ICell';

function Cell({
  value, index, prefilled, alterTable,
}: ICell) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    alterTable?.(index, +(event.target.value));
  };

  const cellElement = prefilled ? (<div>{value}</div>)
    : (
      <input
        className="shadow border rounded"
        maxLength={1}
        onKeyPress={(event) => {
          if (!/[1-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        onChange={onChange}
      />
    );
  return (
    <div>
      {cellElement}
    </div>
  );
}

Cell.defaultProps = {
  value: 0,
  index: 0,
  prefilled: false,
  alterTable: () => { },
};

Cell.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  prefilled: PropTypes.bool,
  alterTable: PropTypes.func,
};

export default Cell;
