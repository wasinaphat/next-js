import Link from "next/link";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { getCategories } from "../../services/category";
import { getTags } from "../../services/tag";
import { createBlog } from "../../services/blog";
import { getCookie } from "../../services/auth";
import {QuillFormats,QuillModules} from '../../helpers/quill'
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
  const token =  getCookie('token')

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
    createBlog(formData,token).then(data=>{
      if(data.error){
        alert(data.error)
        setValues({...values,error:data.error})
      }else{
        setValues({...values,title:'',error:'',success:`A new blog title ${data.title} is created`,})
        setBody('')
        setCategories([])
        setTags([])
      }
    })
    // console.log(e.target.value);
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
  const showError =()=>(
    <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
  )
  const showSuccess=()=>(
    <div className="alert alert-success" style={{display:success?'':'none'}}>{success}</div>
  )
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
            modules={QuillModules}
            formats={QuillFormats}
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
     <div className="pt-3">
     {showError()}
          {showSuccess()}
     </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group">
              <h5>Featured image</h5>
              <hr/>
              <small className="text-muted">Max size: 1mb</small>
              <hr/>
              <label className="btn btn-outline-info">Upload featured image
              <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/>
              </label>
            </div>
          </div>
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

export default withRouter(CreateBlog);
