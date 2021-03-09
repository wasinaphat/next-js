import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { getCategories } from "../../services/category";
import { getTags } from "../../services/tag";
import { singleBlog, updateBlog } from "../../services/blog";
import { getCookie } from "../../services/auth";
import { QuillFormats, QuillModules } from "../../helpers/quill";
const BlogUpdate = ({ router }) => {

  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    title:"",
    error: "",
    success: "",
    formData: "",
    title: "",
  });
  const {error,success,formData,title} = values
  useEffect(() => {
      setValues({...values,formData: new FormData()})
    initBlog();
  }, [router]);
  const initBlog = () => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({...values,title:data.title});
          setBody(data.body)
        }
      });
    }
  };
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };
  const handleBody = e =>{
      setBody(e)
      formData.set('body',e)
  }
  const editBlog = ()=>{
      console.log('update blog')
  }
  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            value={title}
            className="form-control"
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="write something amazing...."
            onChange={handleBody}
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
      
    {updateBlogForm()}
          <div className="pt-3">show success and error message</div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group">
              <h5>Featured image</h5>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
