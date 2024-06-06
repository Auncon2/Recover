import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { setCommonModal } from '../../app/slice/modalSlice';
import { useEffect } from 'react';

const CommonModal = () => {
  const { title, show, width, content } = useSelector(
    (state: RootState) => state.modalSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCommonModal());
    };
  }, [dispatch]);

  const handleCancel = () => {
    dispatch(setCommonModal());
  };

  return (
    <Drawer
      title={title}
      bodyStyle={{ paddingBottom: 80 }}
      open={show}
      onClose={handleCancel}
      width={window.innerWidth > 1200 ? width : 'auto'}
    >
      {content}
    </Drawer>
  );
};

export default CommonModal;
