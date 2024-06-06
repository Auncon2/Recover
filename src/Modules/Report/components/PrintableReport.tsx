const PrintableReport = ({ componentRef }: any) => {
  console.log("aaa", componentRef);
  return (
    <div ref={componentRef}>
      <h1>aaaa</h1>
    </div>
  );
};

export default PrintableReport;
