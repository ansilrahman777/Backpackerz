import AsideBar from "../../Components/Admin/AsideBar";
import Header from "../../Components/Admin/Header";
function AdminDashboard() {
  
  return (
    <div >
      <Header />
      <div className="flex">
        <AsideBar />
        <div className="p-4 space-y-4">
          <h1>dashboard</h1>
        </div>
      </div>  
    </div>
  );
}

export default AdminDashboard;
