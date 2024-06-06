import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ margin: '5% auto' }}>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Link to='/'>
            <Button type='primary' style={{ height: '100%', width: '150px' }}>
              Back Home
            </Button>
          </Link>
        }
      />
    </div>
  );
}
export default NotFound;
