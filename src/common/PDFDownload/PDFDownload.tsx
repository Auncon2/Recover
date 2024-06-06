import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import moment from "moment";
import { Button } from "antd";
import { useGetProfileQuery } from "../../Modules/RoomModule/api/HotelRoomEndPoints";

interface Props {
  PDFFileName: string;
  fileHeader: string;
  PDFHeader: any[];
  PDFData: any;
}

const PDFDownload: React.FC<Props> = ({
  PDFFileName,
  fileHeader,
  PDFHeader,
  PDFData,
}) => {
  const date_time = moment().format("DD-MM-YYYY");

  const { data } = useGetProfileQuery();

  console.log("aa", data);

  //   const { restaurant_name, restaurant_address, restaurant_hotline } =
  //     data || {};

  const savePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      format: "a4",
    });

    doc.setFontSize(20);
    // doc.text(restaurant_name, doc.internal.pageSize.getWidth() / 2, 10, {
    //   align: "center",
    // });

    doc.setFontSize(11);
    // doc.text(restaurant_address, doc.internal.pageSize.getWidth() / 2, 16, {
    //   align: "center",
    // });

    doc.setFontSize(11);
    // doc.text(
    //   `Hotline: ${restaurant_hotline}`,
    //   doc.internal.pageSize.getWidth() / 2,
    //   22,
    //   {
    //     align: "center",
    //   }
    // );

    doc.setFontSize(11);
    doc.text(fileHeader, doc.internal.pageSize.getWidth() / 2, 28, {
      align: "center",
    });

    doc.setFontSize(11);
    doc.text(
      `Date: ${moment().format("DD MMMM, YYYY")}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: "center",
      }
    );

    const tableRows = PDFData.map((obj: any) => Object.values(obj));

    autoTable(doc, {
      styles: { halign: "center" },
      headStyles: { fillColor: "#F1573B" },
      startY: 38,
      head: [PDFHeader],
      body: tableRows,

      didDrawPage: ({ pageNumber }) => {
        doc.setFontSize(9);
        doc.text(
          `Page - ${pageNumber}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      },
    });

    doc.save(`${date_time}_${PDFFileName}.pdf`);
  };

  return (
    <Button
      onClick={savePDF}
      type="primary"
      style={{ backgroundColor: "#E74F5B" }}
      icon={<FaFilePdf />}
    >
      PDF Download
    </Button>
  );
};

export default PDFDownload;
