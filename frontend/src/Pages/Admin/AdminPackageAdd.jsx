import AsideBar from '../../Components/Admin/AsideBar';
import Header from './../../Components/Admin/Header'; // Assuming you have a Header component
import kashmir from '../../assets/Images/home_bg.jpg'

function AdminPackageAdd() {
  return (
    <div>
        <Header/>
        <AsideBar/>
        <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="bg-white  rounded-lg shadow-md overflow-hidden">
                <a href="#" className="block">
                    <img src={kashmir} alt="Product" className="box-content h-32 w-32 p-4 border-4 " />
                </a>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <button className="btn btn-sm btn-brand rounded">
                            <i className="material-icons md-edit mr-1"></i>Edit
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#">Edit info</a>
                            <a className="dropdown-item text-danger" href="#">Delete</a>
                        </div>
                    </div>
                    <a href="#" className="block text-lg font-semibold mb-1">Just another product name</a>
                    <div className="text-gray-700">$179.00</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminPackageAdd;
