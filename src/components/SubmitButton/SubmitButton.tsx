import { SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

type Props = {
  loading?: boolean;
  label?: string;
  icon?: React.ReactNode;
  block?: boolean;
  onClick?: () => void;
};

const SubmitButton = ({ loading, label, icon }: Props) => {
  return (
    <Button
      htmlType="submit"
      loading={loading}
      icon={icon ?? <SendOutlined />}
      style={{
        backgroundColor: "#01adad",
        color: "white",
        borderRadius: "50px",
        width: "120px",
      }}
    >
      {label || "Submit"}
    </Button>
  );
};

export default SubmitButton;
