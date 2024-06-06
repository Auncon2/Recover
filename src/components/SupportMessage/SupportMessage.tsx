import { FloatButton, Tooltip } from 'antd';
import { BsWhatsapp } from 'react-icons/bs';
import { useState } from 'react';
import ConvoBox from './ConvoBox';

const SupportMessage = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {show ? (
        <ConvoBox setShow={setShow} />
      ) : (
        <Tooltip title='Message to admin'>
          <FloatButton
            icon={<BsWhatsapp size={22} />}
            onClick={() => setShow(true)}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default SupportMessage;
