import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

interface DialogBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'danger' | 'warning';
  outlined?: boolean;
  label: string;
  loading?: boolean;
  loadingLabel?: string;
}

const DialogBtn: React.FC<DialogBtnProps> = (props) => {
  const { className, loading, loadingLabel, outlined, ...other } = props;
  const color = props.color ? props.color : 'primary';

  return (
    <button
      {...other}
      className={clsx(
        className,
        'btn',
        `btn${outlined ? '-outline' : ''}-${color}`,
      )}
    >
      {loading ?
        <div className="d-flex align-items-center">
          <div className="spinner-border spinner-border-sm me-1" role="status">
          </div>
          <span>{loadingLabel}</span>
        </div>
        :
        <span>{props.label}</span>}
    </button>
  );
};

export default DialogBtn;
