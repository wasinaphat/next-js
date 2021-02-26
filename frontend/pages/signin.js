import SigninComponent from "../components/auth/SigninComponent";
import Layout from "../components/Layout";


const Signin = () => {
  return (

     <Layout>
      <h2 className="text-center">Signin</h2>
      <div className="row pb-4 pt-4">
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};
export default Signin;
