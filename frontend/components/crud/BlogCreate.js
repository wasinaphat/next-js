import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { getCategories } from "../../services/category";
import { getTags } from "../../services/tag";
const CreateBlog = ({ router }) => {
  const blogFormLS = () => {
    if (typeof window === "undefined") {
      return false;
    }
    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked,setChecked] =useState([])
  const [checkedTag,setCheckedTag] =useState([])

  const [body, setBody] = useState(blogFormLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });
  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }else{
        setCategories(data)
      }
    });
  };
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }else{
        setTags(data)
      }
    });
  };
  const publishBlog = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };
  const handleToggle =(c) =>()=>{
    setValues({...values,error:''})

    const clickedCategory = checked.indexOf(c)
    const all = [...checked]
    if(clickedCategory===-1){
    all.push(c)
    }else{
      all.splice(clickedCategory,1)
    }
    console.log(all)
    setChecked(all)
    formData.set('categories',all)
  }
  const handleTagToggle =(t) =>()=>{
    setValues({...values,error:''})

    const clickedTag = checked.indexOf(t)
    const all = [...checkedTag]
    if(clickedTag===-1){
    all.push(t)
    }else{
      all.splice(clickedTag,1)
    }
    console.log(all)
    setChecked(all)
    formData.set('tags',all)
  }
  const showCategories = ()=>{
    return (
      categories&&categories.map((c,i)=>(
        <li key={i}  className="list-unstyled">
          <input type="checkbox" className="mr-2" onChange={handleToggle(c._id)}/>
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  }
  const showTags = ()=>{
    return (
      tags&&tags.map((t,i)=>(
        <li key={i} className="list-unstyled">
          <input type="checkbox" className="mr-2" onChange={handleTagToggle(t._id)}/>
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  }
  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
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
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
            value={body}
            placeholder="write something amazing...."
            onChange={handleBody}
          />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            submit
          </button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
        </div>
        <div className="col-md-4">
          <div>
          <h5>Categories</h5>
          <hr/>
          <ul style={{maxHeight:'200px',overflowY:'scroll'}}>
          {showCategories()}
          </ul>
          <hr/>
          <h5>Tags</h5>
          <hr/>
          <ul  style={{maxHeight:'200px',overflowY:'scroll'}}>
          {showTags()}
          </ul>
         
          </div>
        </div>
      </div>

    </div>
  );
};
CreateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];
export default withRouter(CreateBlog);
