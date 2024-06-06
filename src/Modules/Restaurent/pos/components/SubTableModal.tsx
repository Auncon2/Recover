import { useEffect } from "react";
import { OCCUPIED } from "../utils/pos-constant";

import { useDispatch } from "react-redux";
import { addDineInSubTable } from "../api/posSlice";
import { Button, Col, Drawer, Empty, Row, Typography } from "antd";
import { useAddSubDineInMutation } from "../api/posEndPoints";
const { Text } = Typography;

const SubTableModal = ({ open, setOpen, dineIn }: any) => {
  const [addSubDineIn, { data }] = useAddSubDineInMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(addDineInSubTable(data.data));
      setOpen(false);
    }
  }, [data, dispatch, setOpen]);

  const occupiedTable = dineIn?.data.filter(
    (e: any) => e.rest_table_status === OCCUPIED
  );

  return (
    <Drawer title="Select Sub Table" onClose={() => setOpen(false)} open={open}>
      <Row gutter={[10, 10]}>
        {occupiedTable?.map(({ rest_table_name, rest_table_id }: any) => (
          <Col
            span={12}
            key={rest_table_id}
            onClick={() =>
              addSubDineIn({
                table_name: rest_table_name,
              })
            }
          >
            <Button
              size="large"
              style={{
                height: "8rem",
                textAlign: "center",
                cursor: "pointer",
                fontWeight: 700,
                width: "100%",
                border: "2px solid #0079FF",
              }}
            >
              <Text strong>{rest_table_name}</Text>
            </Button>
          </Col>
        ))}
      </Row>
      {occupiedTable?.length === 0 && <Empty />}
    </Drawer>
  );
};

export default SubTableModal;
