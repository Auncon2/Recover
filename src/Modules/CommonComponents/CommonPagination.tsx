import { Pagination } from "antd";

const CommonPagination = ({ total, onChange }: any) => {
  const handlePaginationChange = (page: any, pageSize: any) => {
    const skip = (page - 1) * pageSize;

    onChange(skip, pageSize);
  };
  return (
    <>
      <Pagination
        defaultCurrent={1}
        defaultPageSize={30}
        total={total}
        pageSizeOptions={["10", "20", "30", "50", "100"]}
        showSizeChanger={true}
        onChange={handlePaginationChange}
        onShowSizeChange={handlePaginationChange}
      />
    </>
  );
};

export default CommonPagination;
