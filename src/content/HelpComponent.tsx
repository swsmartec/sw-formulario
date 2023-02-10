import React from 'react';
import { HelpText } from '../../constants/help';
import { Box, Modal } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  p: 4
};

interface HelpProps {
  code: string;
}

export const HelpComponent = (props: HelpProps) => {
  const { code } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const help: any = HelpText as any;
  return (
    <>
      <span className={'label-help'} onClick={handleOpen}>
        ?
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{help[code]}</Box>
      </Modal>
    </>
  );
};

export default HelpComponent;
