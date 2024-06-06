/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { Card, Col, Row } from "antd";

const ChartData = () => {
  // Dummy data for the pie chart
  // const data = [
  //   { name: "March", value: 300 },
  //   { name: "April", value: 500 },
  //   { name: "May", value: 700 },
  //   { name: "June", value: 200 },
  //   { name: "July", value: 900 },
  //   { name: "August", value: 600 },
  // ];
  const data2 = [
    { label: "January", sales: 21, leads: 41 },
    { label: "February", sales: 35, leads: 79 },
    { label: "March", sales: 75, leads: 57 },
    { label: "April", sales: 51, leads: 47 },
    { label: "May", sales: 41, leads: 63 },
    { label: "June", sales: 47, leads: 71 },
  ];
  const linedata = [
    {
      name: "Jan",
      value1: 100,
      value2: 150,
      value3: 200,
    },
    {
      name: "Feb",
      value1: 120,
      value2: 160,
      value3: 220,
    },
    {
      name: "Mar",
      value1: 90,
      value2: 140,
      value3: 180,
    },
    {
      name: "Apr",
      value1: 110,
      value2: 170,
      value3: 210,
    },
    {
      name: "May",
      value1: 130,
      value2: 180,
      value3: 230,
    },
    {
      name: "Jun",
      value1: 150,
      value2: 190,
      value3: 250,
    },
    // Add more data points as needed
  ];
  // Colors for the pie chart segments
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9966",
  ];

  return (
    <Row gutter={24}>
      {/* <Col xs={24} md={6}>
        <Card title="New Applications (Last 6 Months)">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((_entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col> */}
      <Col xs={24} md={12}>

        <Card title="Expense(Last 6 Months)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data2}
              margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
            >
              <XAxis dataKey="label" />
              <YAxis />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#FB8833" />
              <Bar dataKey="leads" fill="#17A8F5" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} md={6}>
        <Card title="Invoice (Last 6 Months)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={linedata}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value1"
                stroke={colors[0]}
                dot={false}
                name="Members"
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke={colors[1]}
                dot={false}
                name="Invoices"
              />
              <Line
                type="monotone"
                dataKey="value3"
                stroke={colors[2]}
                dot={false}
                name="Expences"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default ChartData;
