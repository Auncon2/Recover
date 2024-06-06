import { Typography, theme } from 'antd';
import { AiFillCloseCircle } from 'react-icons/ai';
interface IProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConvoBox = ({ setShow }: IProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
        bottom: '10px',
      }}
    >
      <div
        style={{
          height: '450px',
          width: '310px',
          border: '1px solid gray',
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#5cbc85',
            padding: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <img
              src='https://embed.tawk.to/_s/v4/assets/images/default-profile.svg'
              alt='Atab Admin'
              width={40}
            />
            <Typography.Title level={5} style={{ color: 'white' }}>
              TOAB Admin
            </Typography.Title>
          </div>
          <div>
            <AiFillCloseCircle
              size={20}
              onClick={() => setShow(false)}
              style={{ color: 'white', cursor: 'pointer', marginRight: '5px' }}
            />
          </div>
        </div>
        <div>afijaifagjfghg</div>
        <div></div>
      </div>
    </div>
  );
};

export default ConvoBox;
