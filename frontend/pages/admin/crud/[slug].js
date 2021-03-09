import Layout from "../../../components/Layout";
import Link from "next/link";
import Admin from "../../../components/auth/Admin";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pb-5 mt-5">
              <h2>Create a new blog</h2>
            </div>
            <div className="col-md-8">
              <BlogUpdate />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
