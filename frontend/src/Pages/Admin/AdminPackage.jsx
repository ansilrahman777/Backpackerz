import Header from '../../Components/Admin/Header'
import AsideBar from '../../Components/Admin/AsideBar'
import kashmir from '../../assets/Images/home_bg.jpg'
import test1 from '../../assets/imageAdmin/test1.jpg'
import test2 from '../../assets/imageAdmin/test2.jpg'
import test3 from '../../assets/imageAdmin/test3.jpg'


function AdminPackage() {

  const packages = [

      { name: "Kashmir", image: kashmir },
      { name: "Kerala", image: test3},
      { name: "Kerala", image: kashmir},
      { name: "Kerala", image: test1},
      { name: "Kerala", image: test2},
      { name: "Kerala", image: test1},

  ]
    
  return (
    
    <div >
      <Header />
      <div className="flex">
        <AsideBar />
        
        <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {packages.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[256px] w-[256px] object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
        

      </div>  
    </div>

  )
}

export default AdminPackage