import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { concat, includes, range } from 'lodash-es';
import { ICellConponent } from './types/ICell';

function Cell({
  value, index, prefilled, handleSetTable, isInError,
}: ICellConponent) {
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

  // Grouping Border Logic
  const topBorderCells = concat(range(0, 9), range(27, 36), range(54, 63));
  const isTopBorder = includes(topBorderCells, index);

  const bottomBorderCells = concat(range(18, 27), range(45, 54), range(72, 81));
  const isBottomBorder = includes(bottomBorderCells, index);

  const isLeftBorder = index % 3 === 0;

  const isRightBorder = index % 3 === 2;

  const styles = clsx(
    'border',
    'h-16',
    'w-16',
    'text-2xl',
    'text-center',
    prefilled && ['font-bold', 'flex', 'justify-center', 'items-center'],
    isInError && 'bg-red-600/50',
    isTopBorder && 'border-t-3',
    isBottomBorder && 'border-b-3',
    isLeftBorder && 'border-l-3',
    isRightBorder && 'border-r-3',
  );

  const cellElement = prefilled ? (
    <div className={styles}>
      {value}
    </div>
  )
    : (
      <input
        id={index.toString()}
        className={styles}
        maxLength={1}
        onChange={onChange}
        value={displayValue}
      />
    );

  return (
    <div className="">
      {cellElement}
    </div>
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
