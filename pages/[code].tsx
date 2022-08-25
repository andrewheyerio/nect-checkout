import Layout from "../components/Layout";
import {useRouter} from "next/router";
import axios from 'axios';
import {useEffect, useState} from "react";
import constants from "../constants"

export default function Home() {
  const router = useRouter();
  const {code} = router.query;
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);



  useEffect( () =>  {
    if (code!= undefined) {
      (
          async () => {
            const {data} = await axios.get(`${constants.endpoint}/links/${code}`);
            setUser(data.user)
            console.log(data)
            setProducts(data.products)
            // Here we initialize an object based on the products we get from the API. From the API, we are storing
            // the product and quantity
            setQuantities(data.products.map(p => ({
                product_id: p.id,
                quantity: 0,
            })));
          }
      )()
    }
  }, [code])

  const updateTotal = (id: number, quantity: number) => {

    // Great example of how awesome the map function is. We call this function whenever changing the quantities in out
    // form. Because the form is created using the id, and becuase we know quantities solely based off that id, we can
    // map through until we find the matching id and modify the quantity. Not very intuitive I think, but clean. Java/
    // Python program tells me the way I should be doing it is by using find. Even with arrays we need to do shallow
    // clones.
    setQuantities(quantities.map(q => {
      if (q.product_id === id) {
          return {
            ...q,
            quantity
        }
      }
      return q;
    }))
  }

  // This function will calculate the total, updating accordingly when necessary.
  const total = () => {
    return quantities.reduce((s, q) => {
      const product = products.find(p => p.id === q.product_id);

      return s + product.price * q.quantity;
    }, 0)

  }

  return (
      <Layout>
        <main>
          <div className="py-5 text-center">
            <h2>Welcome</h2>
            <p className="lead">{user?.first_name} {user?.last_name} invited you to buy these products!</p>
          </div>

          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">

              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Products</span>
                <span className="badge bg-primary rounded-pill">3</span>
              </h4>

              <ul className="list-group mb-3">
                {products.map(product => {
                  return  (
                    <div key={product.id}>
                      <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 className="my-0">{product.title}</h6>
                          <small className="text-muted">{product.description}</small>
                        </div>
                        <span className="text-muted">${product.price}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                          <h6 className="my-0">Quantity</h6>
                        </div>
                        <input type="number" min="0" className="text-muted form-control" style={{width:'65px'}}
                               onChange={e => updateTotal(product.id, parseInt(e.target.value))}/>
                      </li>
                    </div>
                  )

                })}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${total()}</strong>
                </li>
              </ul>
            </div>

            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Personal Info</h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">

                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="First Name"
                           required/>
                    <div className="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Last Name"
                           required/>
                  </div>


                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email <span
                        className="text-muted">(Optional)</span></label>
                    <input type="email" className="form-control" id="email" placeholder="you@example.com" required/>
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/>
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input className="form-select" id="country" placeholder={"Country"} required/>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <input className="form-select" id="city" placeholder={"City"} required/>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="Zip"/>
                  </div>

                </div>


                <hr className="my-4"/>
                <button className="w-100 btn btn-primary btn-lg" type="submit">Checkout</button>
              </form>
            </div>
          </div>
        </main>
      </Layout>
  );
}
