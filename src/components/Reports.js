import TopBooks from "./TopBooks";
import TopClientsFines from "./TopClientsFines";

const Reports = () => (
  <div>
    <h1>Отчеты</h1>
    <div>
      <h2>Популярные книги</h2>
      <TopBooks />
    </div>
    <div>
      <h2>Клиенты с наибольшими штрафами</h2>
      <TopClientsFines />
    </div>
  </div>
);

export default Reports;
