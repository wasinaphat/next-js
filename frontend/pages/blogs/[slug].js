import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import React, { useState,useEffect } from "react";
import {
  listRelated,
  singleBlog,
} from "../../services/blog";
import SmallCard from "../../components/blog/SmallCard";
import { API, APP_NAME, DOMAIN } from "../../config";
import moment from "moment";
import renderHTML from "react-render-html";

const SingleBlog = ({ blog,query }) => {
    const [related,setRelated] = useState([])

    const loadRelated = ()=>{
        listRelated({blog}).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setRelated(data)
            }
        })
    }
    useEffect(()=>{
        loadRelated()
    },[])
    const head = () => {
        <Head>
          <title>{blog.title} |{APP_NAME}</title>
          <meta
            name="description"
            content={blog.mdesc}
          />
          <link ref="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
          <meta
            property="og:title"
            content={`${blog.title}| ${APP_NAME}`}
          />
          <meta
            name="og:description"
            content={blog.mdesc}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
          <meta property="og:site_name" content={`${APP_NAME}`} />
    
          <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}/>
          <meta
            property="og:image:secure_url"
            content={`${API}/blog/photo/${blog.slug}`}
          />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>;
      };
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

    const showRelatedBlog = ()=>{
        return related.map((blog,i)=>(
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog}/>
                </article>
            </div>
        ))
    }
  return (
    <React.Fragment>
        {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
            <div className="container">
            <h1 className="display-2 pb-3 text-center font-weight-bold">{blog.title}</h1>
                <p className="lead pt-1 pb-1">
                  Written by {blog.postedBy.name} | Published{" "}
                  {moment(blog.updatedAt).fromNow()}
                </p>
                <div className="pb-3">
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                  <br />
                </div>
            </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
              </section>
            </div>
            <div className="container pb-5">
                <h4 className="text-center pt-5 pb-5 h2">Related Blogs</h4>
           <hr/>
            <div  className="row">
            {showRelatedBlog()}
            </div>
            </div>
            <div className="container pb-5">
     
              <hr/>
                <p>show comments</p>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};
SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      console.log("GET INITIAL PROPS", data);
      return { blog: data,query };
    }
  });
};

export default withRouter(SingleBlog);
