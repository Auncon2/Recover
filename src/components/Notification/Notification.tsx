import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Badge, Popover } from 'antd';

const Notifications = () => {
  const content = (
    <div>
      <p>Content</p>
    </div>
  );
  return (
    <Popover content={content} title='Notifications'>
      <Badge count={5}>
        <MdOutlineNotificationsActive size={30} style={{ cursor: 'pointer' }} />
      </Badge>
    </Popover>
  );
};

export default Notifications;
