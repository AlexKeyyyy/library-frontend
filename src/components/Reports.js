import TopBooks from "./TopBooks";
import TopClientsFines from "./TopClientsFines";
import ReportsExtra from "./BooksOnHand";

const Reports = () => (
  <div>
    <h1>Отчеты</h1>
    <div>
      <TopBooks />
    </div>
    <div>
      <TopClientsFines />
    </div>
    <div>
      <ReportsExtra />
    </div>
  </div>
);

export default Reports;
