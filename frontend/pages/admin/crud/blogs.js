import Layout from "../../../components/Layout";
import Link from "next/link";
import Admin from "../../../components/auth/Admin";
import BlogRead from "../../../components/crud/BlogRead";

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pb-5 mt-5">
              <h2>Manage blogs</h2>
            </div>
            <div className="col-md-8">
              <BlogRead />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
